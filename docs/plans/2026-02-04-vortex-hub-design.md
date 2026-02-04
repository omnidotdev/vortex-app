# Vortex Hub Design

**Date:** 2026-02-04
**Status:** Approved
**Goal:** Make Vortex THE workflow hub for Omni products, supporting any event-based use case

## Overview

Extend Vortex to be a central workflow hub by adding:
- Event adapters for external sources (Kafka, SQS, S3, CDC, Polling)
- Omni-native event triggers
- Workflow composition (sub-workflows)
- Cross-workflow state store
- New flow control nodes (Try/Catch, Race)
- Utility nodes (Comment)

Design leverages existing Hatchet/Temporal executors rather than building redundant infrastructure.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    EVENT ADAPTERS (new)                      │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────┐ │
│  │  Omni   │ │  Kafka  │ │   SQS   │ │  S3/GCS │ │  CDC   │ │
│  │ GraphQL │ │Consumer │ │Consumer │ │ Webhook │ │ Stream │ │
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └───┬────┘ │
└───────┼──────────┼──────────┼──────────┼───────────┼───────┘
        │          │          │          │           │
        ▼          ▼          ▼          ▼           ▼
┌─────────────────────────────────────────────────────────────┐
│               HATCHET / TEMPORAL (existing)                  │
│                                                              │
│  • Event routing           Already built                    │
│  • Persistence/replay      Already built                    │
│  • Idempotency             Already built                    │
│  • Dead letter             Already built                    │
└─────────────────────────────────────────────────────────────┘
```

## Component Designs

### 1. Event Adapters

Single ingestion point for all events, normalized into executor format.

#### Adapter Interface

```typescript
// vortex-worker/src/adapters/types.ts
interface EventAdapter {
  name: string
  source: string                    // "kafka", "sqs", "s3", "cdc", "omni"

  start(): Promise<void>
  stop(): Promise<void>
  onEvent(handler: (event: NormalizedEvent) => Promise<void>): void
}

interface NormalizedEvent {
  source: string                    // "kafka:orders-topic"
  type: string                      // "order.created"
  subject?: string                  // Resource ID
  data: unknown
  metadata: {
    idempotencyKey: string
    timestamp: Date
    raw?: unknown                   // Original event for debugging
  }
}
```

#### Dispatcher

```typescript
// vortex-worker/src/adapters/dispatcher.ts
async function dispatchEvent(event: NormalizedEvent, executor: Executor) {
  const matches = await findMatchingWorkflows(event)

  for (const match of matches) {
    if (executor.type === "hatchet") {
      await hatchet.event.push(`${event.source}:${event.type}`, {
        workflowId: match.workflowId,
        payload: match.transform ? transform(event.data, match.transform) : event.data,
      })
    } else if (executor.type === "temporal") {
      await temporal.workflow.signalWithStart(match.workflowId, {
        signal: "eventTrigger",
        signalArgs: [event],
      })
    }
  }
}
```

#### Adapters

| Adapter | Trigger Type | Implementation |
|---------|--------------|----------------|
| `KafkaAdapter` | kafka | `kafkajs` consumer |
| `SqsAdapter` | sqs | `@aws-sdk/client-sqs` polling |
| `S3Adapter` | s3 | S3 event notification webhook |
| `CdcAdapter` | cdc | Debezium webhook or PG logical replication |
| `PollingAdapter` | polling | HTTP polling with diff detection |
| `OmniAdapter` | omni | GraphQL mutation endpoint |

#### GraphQL API (Omni Services)

```graphql
type Mutation {
  publishEvent(input: PublishEventInput!): PublishEventPayload!
  publishEvents(input: PublishEventsInput!): PublishEventsPayload!
}

input PublishEventInput {
  type: String!                    # "user.created"
  subject: String                  # Resource ID
  data: JSON!
  idempotencyKey: String
  correlationId: String
}

type PublishEventPayload {
  event: VortexEvent!
  workflowsTriggered: [WorkflowTriggerResult!]!
}

type Query {
  events(filter: EventFilter, first: Int, after: String): EventConnection!
  event(id: ID!): VortexEvent
}
```

External webhooks (S3, Kafka callbacks) use REST adapter endpoints that normalize into the same internal event format.

### 2. Routing Rules

```typescript
// vortex-api/src/lib/db/schema/eventRoutingRule.table.ts
export const eventRoutingRule = pgTable("event_routing_rule", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id").notNull(),
  workflowId: text("workflow_id").notNull().references(() => workflow.id),

  sourcePattern: text("source_pattern"),     // Glob: "omni:*"
  typePattern: text("type_pattern").notNull(), // Glob: "user.*"
  condition: text("condition"),              // JSONPath filter
  transform: text("transform"),              // JSONata transform

  priority: integer("priority").notNull().default(0),
  enabled: boolean("enabled").notNull().default(true),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
```

### 3. Workflow Composition

Sub-workflow step type for calling workflows from workflows.

```typescript
interface SubWorkflowStep {
  id: string
  type: "subworkflow"
  name: string
  subworkflow: {
    workflowId: string
    version?: string
    input: Record<string, unknown>  // Supports templating
    waitForCompletion: boolean      // true = sync, false = fire-and-forget
    timeout?: string
    onError?: "fail" | "continue"
  }
}
```

#### Hatchet Execution

```typescript
async function executeSubWorkflow(step: SubWorkflowStep, context: StepContext) {
  const childRunId = await hatchet.workflow.trigger(step.subworkflow.workflowId, {
    input: resolveTemplates(step.subworkflow.input, context),
    parentRunId: context.runId,
  })

  if (step.subworkflow.waitForCompletion) {
    return await hatchet.workflow.waitFor(childRunId, step.subworkflow.timeout)
  }

  return { childRunId, status: "triggered" }
}
```

#### Temporal Execution

```typescript
async function executeSubWorkflow(step: SubWorkflowStep, context: StepContext) {
  if (step.subworkflow.waitForCompletion) {
    return await workflow.executeChild(step.subworkflow.workflowId, {
      args: [resolveTemplates(step.subworkflow.input, context)],
      parentClosePolicy: ParentClosePolicy.TERMINATE,
    })
  } else {
    const handle = await workflow.startChild(step.subworkflow.workflowId, {
      args: [resolveTemplates(step.subworkflow.input, context)],
    })
    return { childRunId: handle.workflowId, status: "triggered" }
  }
}
```

### 4. Cross-Workflow State Store

Redis-backed state for sharing data between workflows.

```typescript
// vortex-worker/src/state/store.ts
interface StateStore {
  get(orgId: string, key: string): Promise<unknown | null>
  set(orgId: string, key: string, value: unknown, ttl?: number): Promise<void>
  delete(orgId: string, key: string): Promise<void>

  increment(orgId: string, key: string, by?: number): Promise<number>
  append(orgId: string, key: string, value: unknown): Promise<void>

  publish(orgId: string, channel: string, message: unknown): Promise<void>
  subscribe(orgId: string, channel: string, handler: (msg: unknown) => void): () => void
}
```

#### DSL Steps

```typescript
interface StateGetStep {
  type: "state_get"
  state: { key: string, output: string }
}

interface StateSetStep {
  type: "state_set"
  state: { key: string, value: unknown, ttl?: number }
}

interface StateWaitStep {
  type: "state_wait"
  state: {
    key: string
    condition: "exists" | "equals" | "changed"
    value?: unknown
    timeout: string
  }
}
```

### 5. New Trigger Types

```typescript
interface TriggerConfig {
  triggerType:
    | "manual" | "webhook" | "cron" | "event"
    | "kafka" | "sqs" | "s3" | "cdc" | "polling" | "omni"
}

// Kafka
interface KafkaTriggerConfig extends TriggerConfig {
  triggerType: "kafka"
  kafka: {
    brokers: string[]
    topic: string
    groupId: string
    fromBeginning?: boolean
  }
}

// SQS
interface SqsTriggerConfig extends TriggerConfig {
  triggerType: "sqs"
  sqs: {
    queueUrl: string
    region: string
    credentials: string
    batchSize?: number
  }
}

// S3
interface S3TriggerConfig extends TriggerConfig {
  triggerType: "s3"
  s3: {
    bucket: string
    prefix?: string
    suffix?: string
    events: ("s3:ObjectCreated:*" | "s3:ObjectRemoved:*")[]
    credentials: string
  }
}

// CDC
interface CdcTriggerConfig extends TriggerConfig {
  triggerType: "cdc"
  cdc: {
    connectionString: string
    table: string
    operations: ("INSERT" | "UPDATE" | "DELETE")[]
  }
}

// Polling
interface PollingTriggerConfig extends TriggerConfig {
  triggerType: "polling"
  polling: {
    url: string
    method: "GET" | "POST"
    headers?: Record<string, string>
    body?: unknown
    interval: string
    deduplication: "hash" | "field" | "none"
    deduplicationField?: string
    credentials?: string
  }
}

// Omni
interface OmniTriggerConfig extends TriggerConfig {
  triggerType: "omni"
  omni: {
    source: string                // "runa", "chronicle", "*"
    eventType: string             // "user.created", "payment.*"
    filter?: string               // JSONPath condition
  }
}
```

### 6. New Flow Nodes

#### Try/Catch

```typescript
interface TryCatchStep {
  type: "try_catch"
  name: string
  tryCatch: {
    tryBranch: string[]
    catchBranch: string[]
    errorOutput: string
    retries?: number
    retryDelay?: string
  }
}
```

```typescript
async function executeTryCatch(step: TryCatchStep, context: StepContext) {
  try {
    for (const stepId of step.tryCatch.tryBranch) {
      await executeStep(stepId, context)
    }
    return { success: true }
  } catch (error) {
    context.variables[step.tryCatch.errorOutput] = {
      message: error.message,
      step: error.stepId,
      stack: error.stack,
    }
    for (const stepId of step.tryCatch.catchBranch) {
      await executeStep(stepId, context)
    }
    return { success: false, handled: true }
  }
}
```

#### Race

```typescript
interface RaceStep {
  type: "race"
  name: string
  race: {
    branches: string[][]
    timeout?: string
    output: string
    winnerIndex: string
  }
}
```

```typescript
async function executeRace(step: RaceStep, context: StepContext) {
  const branchPromises = step.race.branches.map(async (branch, index) => {
    for (const stepId of branch) {
      await executeStep(stepId, context)
    }
    return { index, result: context.stepOutputs[branch[branch.length - 1]] }
  })

  const winner = await Promise.race(branchPromises)
  context.variables[step.race.output] = winner.result
  context.variables[step.race.winnerIndex] = winner.index

  return winner
}
```

### 7. Utility Nodes

#### Comment

```typescript
interface CommentStep {
  type: "comment"
  name: string
  comment: {
    text: string
    color?: string
  }
}
```

Execution: No-op, skipped during workflow execution.

## Implementation Phases

| Phase | Scope | Dependencies |
|-------|-------|--------------|
| **1** | Omni event trigger + routing rules UI | None |
| **2** | Sub-workflow node + composition | Phase 1 |
| **3** | Try/Catch + Race flow nodes | None |
| **4** | Comment node | None |
| **5** | Polling trigger + adapter | None |
| **6** | Kafka adapter + trigger | Kafka infra |
| **7** | SQS adapter + trigger | AWS credentials |
| **8** | S3 adapter + trigger | AWS credentials |
| **9** | CDC adapter + trigger | Debezium or PG logical replication |
| **10** | Cross-workflow state store | Redis |

**Parallel tracks:**
- Phases 3, 4, 5 can run in parallel with Phases 1-2
- Phases 6-9 can run in parallel once adapter base is built

## File Changes

### New Files

```
vortex-worker/src/adapters/
├── types.ts
├── dispatcher.ts
├── kafka.adapter.ts
├── sqs.adapter.ts
├── s3.adapter.ts
├── cdc.adapter.ts
├── polling.adapter.ts
└── omni.adapter.ts

vortex-worker/src/steps/
├── subworkflow.ts
├── tryCatch.ts
├── race.ts
├── stateGet.ts
├── stateSet.ts
└── stateWait.ts

vortex-worker/src/state/
└── store.ts

vortex-api/src/lib/db/schema/
└── eventRoutingRule.table.ts

vortex-app/src/components/workflow/NodeConfigSidebar/configs/
├── KafkaTriggerConfig.tsx
├── SqsTriggerConfig.tsx
├── S3TriggerConfig.tsx
├── CdcTriggerConfig.tsx
├── PollingTriggerConfig.tsx
├── OmniTriggerConfig.tsx
├── SubWorkflowConfig.tsx
├── TryCatchConfig.tsx
├── RaceConfig.tsx
└── CommentConfig.tsx
```

### Modified Files

```
vortex-app/src/lib/workflow/types.ts
vortex-app/src/lib/workflow/stepTypes.ts
vortex-app/src/components/NodePicker.tsx
vortex-worker/src/workflows/dsl.workflow.ts
vortex-worker/src/workflows/temporal/workflow.ts
vortex-api/src/graphql/schema.graphql
```
