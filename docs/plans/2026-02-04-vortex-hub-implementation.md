# Vortex Hub Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform Vortex into the central workflow hub for Omni products with event adapters, workflow composition, and new flow control nodes.

**Architecture:** Extend existing Hatchet/Temporal executors with event adapters that normalize external events. Add new DSL step types for sub-workflows, try/catch, race, and state management. GraphQL-first for Omni service integration.

**Tech Stack:** TypeScript, Hatchet, Temporal, GraphQL (Pothos), Drizzle ORM, Redis, React Flow

---

## Phase 1: Omni Event Trigger + Routing Rules

### Task 1.1: Event Routing Rule Schema

**Files:**
- Create: `vortex-api/src/lib/db/schema/eventRoutingRule.table.ts`
- Modify: `vortex-api/src/lib/db/schema/index.ts`

**Step 1: Create the routing rule table schema**

```typescript
// vortex-api/src/lib/db/schema/eventRoutingRule.table.ts
import { boolean, index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { workflow } from "./workflow.table";

export const eventRoutingRule = pgTable(
  "event_routing_rule",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id").notNull(),
    workflowId: text("workflow_id")
      .notNull()
      .references(() => workflow.id, { onDelete: "cascade" }),

    sourcePattern: text("source_pattern"),
    typePattern: text("type_pattern").notNull(),
    condition: text("condition"),
    transform: text("transform"),

    priority: integer("priority").notNull().default(0),
    enabled: boolean("enabled").notNull().default(true),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    orgIdx: index("event_routing_rule_org_idx").on(table.organizationId),
    workflowIdx: index("event_routing_rule_workflow_idx").on(table.workflowId),
    enabledIdx: index("event_routing_rule_enabled_idx").on(table.enabled),
  }),
);

export type EventRoutingRule = typeof eventRoutingRule.$inferSelect;
export type NewEventRoutingRule = typeof eventRoutingRule.$inferInsert;
```

**Step 2: Export from schema index**

Add to `vortex-api/src/lib/db/schema/index.ts`:

```typescript
export * from "./eventRoutingRule.table";
```

**Step 3: Generate migration**

Run: `cd /home/brian/projects/omni/vortex/services/vortex-api && bun db:generate`

**Step 4: Apply migration**

Run: `cd /home/brian/projects/omni/vortex/services/vortex-api && bun db:migrate`

**Step 5: Commit**

```bash
git add vortex-api/src/lib/db/schema/eventRoutingRule.table.ts vortex-api/src/lib/db/schema/index.ts vortex-api/drizzle/
git commit -m "feat(vortex): add event routing rule schema"
```

---

### Task 1.2: GraphQL Types for Event Routing

**Files:**
- Create: `vortex-api/src/graphql/types/eventRoutingRule.type.ts`
- Modify: `vortex-api/src/graphql/types/index.ts`

**Step 1: Create GraphQL type definitions**

```typescript
// vortex-api/src/graphql/types/eventRoutingRule.type.ts
import { builder } from "../builder";
import { eventRoutingRule as eventRoutingRuleTable } from "@/lib/db/schema";

export const EventRoutingRule = builder.node("EventRoutingRule", {
  id: { resolve: (rule) => rule.id },
  fields: (t) => ({
    rowId: t.exposeString("id"),
    organizationId: t.exposeString("organizationId"),
    workflowId: t.exposeString("workflowId"),
    sourcePattern: t.exposeString("sourcePattern", { nullable: true }),
    typePattern: t.exposeString("typePattern"),
    condition: t.exposeString("condition", { nullable: true }),
    transform: t.exposeString("transform", { nullable: true }),
    priority: t.exposeInt("priority"),
    enabled: t.exposeBoolean("enabled"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
  }),
});

// Connection type for pagination
export const EventRoutingRuleConnection = builder.connectionObject({
  type: EventRoutingRule,
  name: "EventRoutingRuleConnection",
});
```

**Step 2: Export from types index**

Add to `vortex-api/src/graphql/types/index.ts`:

```typescript
export * from "./eventRoutingRule.type";
```

**Step 3: Commit**

```bash
git add vortex-api/src/graphql/types/eventRoutingRule.type.ts vortex-api/src/graphql/types/index.ts
git commit -m "feat(vortex): add event routing rule GraphQL types"
```

---

### Task 1.3: GraphQL Queries for Event Routing Rules

**Files:**
- Create: `vortex-api/src/graphql/queries/eventRoutingRule.query.ts`
- Modify: `vortex-api/src/graphql/queries/index.ts`

**Step 1: Create query resolvers**

```typescript
// vortex-api/src/graphql/queries/eventRoutingRule.query.ts
import { and, eq } from "drizzle-orm";
import { builder } from "../builder";
import { db } from "@/lib/db";
import { eventRoutingRule } from "@/lib/db/schema";

builder.queryField("eventRoutingRules", (t) =>
  t.connection({
    type: "EventRoutingRule",
    args: {
      organizationId: t.arg.string({ required: true }),
      workflowId: t.arg.string(),
      enabled: t.arg.boolean(),
    },
    resolve: async (_parent, args, _ctx) => {
      const conditions = [eq(eventRoutingRule.organizationId, args.organizationId)];

      if (args.workflowId) {
        conditions.push(eq(eventRoutingRule.workflowId, args.workflowId));
      }
      if (args.enabled !== undefined && args.enabled !== null) {
        conditions.push(eq(eventRoutingRule.enabled, args.enabled));
      }

      const rules = await db
        .select()
        .from(eventRoutingRule)
        .where(and(...conditions))
        .orderBy(eventRoutingRule.priority);

      return {
        edges: rules.map((rule) => ({ cursor: rule.id, node: rule })),
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: rules[0]?.id,
          endCursor: rules[rules.length - 1]?.id,
        },
      };
    },
  }),
);

builder.queryField("eventRoutingRule", (t) =>
  t.field({
    type: "EventRoutingRule",
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_parent, args, _ctx) => {
      const [rule] = await db
        .select()
        .from(eventRoutingRule)
        .where(eq(eventRoutingRule.id, args.id))
        .limit(1);

      return rule ?? null;
    },
  }),
);
```

**Step 2: Export from queries index**

Add to `vortex-api/src/graphql/queries/index.ts`:

```typescript
import "./eventRoutingRule.query";
```

**Step 3: Commit**

```bash
git add vortex-api/src/graphql/queries/eventRoutingRule.query.ts vortex-api/src/graphql/queries/index.ts
git commit -m "feat(vortex): add event routing rule queries"
```

---

### Task 1.4: GraphQL Mutations for Event Routing Rules

**Files:**
- Create: `vortex-api/src/graphql/mutations/eventRoutingRule.mutation.ts`
- Modify: `vortex-api/src/graphql/mutations/index.ts`

**Step 1: Create mutation resolvers**

```typescript
// vortex-api/src/graphql/mutations/eventRoutingRule.mutation.ts
import { eq } from "drizzle-orm";
import { ulid } from "ulid";
import { builder } from "../builder";
import { db } from "@/lib/db";
import { eventRoutingRule } from "@/lib/db/schema";

// Input types
const CreateEventRoutingRuleInput = builder.inputType("CreateEventRoutingRuleInput", {
  fields: (t) => ({
    organizationId: t.string({ required: true }),
    workflowId: t.string({ required: true }),
    sourcePattern: t.string(),
    typePattern: t.string({ required: true }),
    condition: t.string(),
    transform: t.string(),
    priority: t.int({ defaultValue: 0 }),
    enabled: t.boolean({ defaultValue: true }),
  }),
});

const UpdateEventRoutingRuleInput = builder.inputType("UpdateEventRoutingRuleInput", {
  fields: (t) => ({
    id: t.string({ required: true }),
    sourcePattern: t.string(),
    typePattern: t.string(),
    condition: t.string(),
    transform: t.string(),
    priority: t.int(),
    enabled: t.boolean(),
  }),
});

// Mutations
builder.mutationField("createEventRoutingRule", (t) =>
  t.field({
    type: "EventRoutingRule",
    args: {
      input: t.arg({ type: CreateEventRoutingRuleInput, required: true }),
    },
    resolve: async (_parent, { input }, _ctx) => {
      const id = ulid();
      const [rule] = await db
        .insert(eventRoutingRule)
        .values({
          id,
          organizationId: input.organizationId,
          workflowId: input.workflowId,
          sourcePattern: input.sourcePattern,
          typePattern: input.typePattern,
          condition: input.condition,
          transform: input.transform,
          priority: input.priority ?? 0,
          enabled: input.enabled ?? true,
        })
        .returning();

      return rule;
    },
  }),
);

builder.mutationField("updateEventRoutingRule", (t) =>
  t.field({
    type: "EventRoutingRule",
    nullable: true,
    args: {
      input: t.arg({ type: UpdateEventRoutingRuleInput, required: true }),
    },
    resolve: async (_parent, { input }, _ctx) => {
      const updates: Record<string, unknown> = { updatedAt: new Date() };

      if (input.sourcePattern !== undefined) updates.sourcePattern = input.sourcePattern;
      if (input.typePattern !== undefined) updates.typePattern = input.typePattern;
      if (input.condition !== undefined) updates.condition = input.condition;
      if (input.transform !== undefined) updates.transform = input.transform;
      if (input.priority !== undefined) updates.priority = input.priority;
      if (input.enabled !== undefined) updates.enabled = input.enabled;

      const [rule] = await db
        .update(eventRoutingRule)
        .set(updates)
        .where(eq(eventRoutingRule.id, input.id))
        .returning();

      return rule ?? null;
    },
  }),
);

builder.mutationField("deleteEventRoutingRule", (t) =>
  t.field({
    type: "Boolean",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_parent, { id }, _ctx) => {
      const result = await db
        .delete(eventRoutingRule)
        .where(eq(eventRoutingRule.id, id));

      return result.rowCount > 0;
    },
  }),
);
```

**Step 2: Export from mutations index**

Add to `vortex-api/src/graphql/mutations/index.ts`:

```typescript
import "./eventRoutingRule.mutation";
```

**Step 3: Commit**

```bash
git add vortex-api/src/graphql/mutations/eventRoutingRule.mutation.ts vortex-api/src/graphql/mutations/index.ts
git commit -m "feat(vortex): add event routing rule mutations"
```

---

### Task 1.5: PublishEvent GraphQL Mutation

**Files:**
- Create: `vortex-api/src/graphql/mutations/publishEvent.mutation.ts`
- Modify: `vortex-api/src/graphql/mutations/index.ts`

**Step 1: Create publishEvent mutation**

```typescript
// vortex-api/src/graphql/mutations/publishEvent.mutation.ts
import { and, eq, like } from "drizzle-orm";
import { ulid } from "ulid";
import { builder } from "../builder";
import { db } from "@/lib/db";
import { eventRoutingRule, workflow } from "@/lib/db/schema";
import { getHatchet } from "@/lib/hatchet";

// Input type
const PublishEventInput = builder.inputType("PublishEventInput", {
  fields: (t) => ({
    organizationId: t.string({ required: true }),
    type: t.string({ required: true }),
    subject: t.string(),
    data: t.field({ type: "JSON", required: true }),
    idempotencyKey: t.string(),
    correlationId: t.string(),
  }),
});

// Result types
const WorkflowTriggerResult = builder.simpleObject("WorkflowTriggerResult", {
  fields: (t) => ({
    workflowId: t.string(),
    workflowName: t.string(),
    runId: t.string(),
    status: t.string(),
  }),
});

const PublishEventPayload = builder.simpleObject("PublishEventPayload", {
  fields: (t) => ({
    eventId: t.string(),
    workflowsTriggered: t.field({ type: [WorkflowTriggerResult] }),
  }),
});

// Helper to match glob patterns
function matchesPattern(pattern: string | null, value: string): boolean {
  if (!pattern) return true;
  const regex = new RegExp("^" + pattern.replace(/\*/g, ".*") + "$");
  return regex.test(value);
}

builder.mutationField("publishEvent", (t) =>
  t.field({
    type: PublishEventPayload,
    args: {
      input: t.arg({ type: PublishEventInput, required: true }),
    },
    resolve: async (_parent, { input }, _ctx) => {
      const eventId = ulid();
      const source = "omni";
      const fullSource = `omni:${input.organizationId}`;

      // Find matching routing rules
      const rules = await db
        .select()
        .from(eventRoutingRule)
        .where(
          and(
            eq(eventRoutingRule.organizationId, input.organizationId),
            eq(eventRoutingRule.enabled, true),
          ),
        )
        .orderBy(eventRoutingRule.priority);

      const matchingRules = rules.filter(
        (rule) =>
          matchesPattern(rule.sourcePattern, fullSource) &&
          matchesPattern(rule.typePattern, input.type),
      );

      // Trigger workflows for matching rules
      const hatchet = getHatchet();
      const results: Array<{
        workflowId: string;
        workflowName: string;
        runId: string;
        status: string;
      }> = [];

      for (const rule of matchingRules) {
        // Get workflow name
        const [wf] = await db
          .select({ name: workflow.name })
          .from(workflow)
          .where(eq(workflow.id, rule.workflowId))
          .limit(1);

        if (!wf) continue;

        // Apply transform if specified (JSONata - simplified for now)
        let payload = input.data;
        // TODO: Apply JSONata transform from rule.transform

        // Trigger via Hatchet
        const runId = ulid();
        await hatchet.event.push(`event:${input.type}`, {
          workflowId: rule.workflowId,
          eventId,
          source: fullSource,
          type: input.type,
          subject: input.subject,
          data: payload,
          correlationId: input.correlationId,
          idempotencyKey: input.idempotencyKey,
        });

        results.push({
          workflowId: rule.workflowId,
          workflowName: wf.name,
          runId,
          status: "triggered",
        });
      }

      return {
        eventId,
        workflowsTriggered: results,
      };
    },
  }),
);
```

**Step 2: Export from mutations index**

Add to `vortex-api/src/graphql/mutations/index.ts`:

```typescript
import "./publishEvent.mutation";
```

**Step 3: Commit**

```bash
git add vortex-api/src/graphql/mutations/publishEvent.mutation.ts vortex-api/src/graphql/mutations/index.ts
git commit -m "feat(vortex): add publishEvent mutation for Omni services"
```

---

### Task 1.6: Omni Trigger Node Type

**Files:**
- Modify: `vortex-app/src/lib/workflow/types.ts`
- Modify: `vortex-app/src/lib/workflow/stepTypes.ts`

**Step 1: Add Omni trigger type**

In `vortex-app/src/lib/workflow/types.ts`, add to TriggerConfig union:

```typescript
export interface OmniTriggerConfig {
  triggerType: "omni";
  omni: {
    source: string;      // "runa", "chronicle", "*"
    eventType: string;   // "user.created", "payment.*"
    filter?: string;     // JSONPath condition
  };
}
```

**Step 2: Register in stepTypes**

In `vortex-app/src/lib/workflow/stepTypes.ts`, add omni to trigger types array.

**Step 3: Commit**

```bash
git add vortex-app/src/lib/workflow/types.ts vortex-app/src/lib/workflow/stepTypes.ts
git commit -m "feat(vortex): add Omni event trigger type"
```

---

### Task 1.7: Omni Trigger Config UI

**Files:**
- Create: `vortex-app/src/components/workflow/NodeConfigSidebar/configs/OmniTriggerConfig.tsx`
- Modify: `vortex-app/src/components/workflow/NodeConfigSidebar/TriggerNodeConfig.tsx`

**Step 1: Create OmniTriggerConfig component**

```typescript
// vortex-app/src/components/workflow/NodeConfigSidebar/configs/OmniTriggerConfig.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface OmniTriggerConfigProps {
  config: {
    source?: string;
    eventType?: string;
    filter?: string;
  };
  onChange: (config: Record<string, unknown>) => void;
}

export function OmniTriggerConfig({ config, onChange }: OmniTriggerConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="source">Source</Label>
        <Input
          id="source"
          value={config.source ?? ""}
          onChange={(e) => onChange({ ...config, source: e.target.value })}
          placeholder="runa, chronicle, * (all)"
        />
        <p className="text-muted-foreground text-xs">
          Omni service name or * for all services
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="eventType">Event Type</Label>
        <Input
          id="eventType"
          value={config.eventType ?? ""}
          onChange={(e) => onChange({ ...config, eventType: e.target.value })}
          placeholder="user.created, payment.*"
        />
        <p className="text-muted-foreground text-xs">
          Event type pattern. Use * for wildcards.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="filter">Filter (optional)</Label>
        <Textarea
          id="filter"
          value={config.filter ?? ""}
          onChange={(e) => onChange({ ...config, filter: e.target.value })}
          placeholder="$.data.amount > 100"
          rows={3}
        />
        <p className="text-muted-foreground text-xs">
          JSONPath expression to filter events
        </p>
      </div>
    </div>
  );
}
```

**Step 2: Add to TriggerNodeConfig**

Import and render OmniTriggerConfig when triggerType is "omni".

**Step 3: Commit**

```bash
git add vortex-app/src/components/workflow/NodeConfigSidebar/configs/OmniTriggerConfig.tsx
git add vortex-app/src/components/workflow/NodeConfigSidebar/TriggerNodeConfig.tsx
git commit -m "feat(vortex): add Omni trigger config UI"
```

---

### Task 1.8: Add Omni Trigger to NodePicker

**Files:**
- Modify: `vortex-app/src/components/NodePicker.tsx`

**Step 1: Add Omni trigger to BUILTIN_NODES**

```typescript
{
  id: "trigger-omni",
  category: "triggers",
  label: "Omni Event",
  description: "Triggered by events from Omni services",
  icon: Zap,
  nodeType: NodeTypes.TRIGGER,
  config: { triggerType: "omni" },
},
```

**Step 2: Commit**

```bash
git add vortex-app/src/components/NodePicker.tsx
git commit -m "feat(vortex): add Omni trigger to node picker"
```

---

## Phase 2: Sub-Workflow Composition

### Task 2.1: Sub-Workflow Step Type

**Files:**
- Modify: `vortex-app/src/lib/workflow/types.ts`
- Modify: `vortex-app/src/lib/workflow/stepTypes.ts`

**Step 1: Add SubWorkflow step type**

```typescript
// In types.ts
export interface SubWorkflowStep {
  id: string;
  type: "subworkflow";
  name: string;
  subworkflow: {
    workflowId: string;
    version?: string;
    input: Record<string, unknown>;
    waitForCompletion: boolean;
    timeout?: string;
    onError?: "fail" | "continue";
  };
}
```

**Step 2: Add to NodeTypes enum and stepTypes**

**Step 3: Commit**

```bash
git add vortex-app/src/lib/workflow/types.ts vortex-app/src/lib/workflow/stepTypes.ts
git commit -m "feat(vortex): add sub-workflow step type"
```

---

### Task 2.2: Sub-Workflow Config UI

**Files:**
- Create: `vortex-app/src/components/workflow/NodeConfigSidebar/configs/SubWorkflowConfig.tsx`

**Step 1: Create component**

```typescript
// vortex-app/src/components/workflow/NodeConfigSidebar/configs/SubWorkflowConfig.tsx
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { workflowsOptions } from "@/lib/options/workflows.options";

interface SubWorkflowConfigProps {
  organizationId: string;
  config: {
    workflowId?: string;
    input?: Record<string, unknown>;
    waitForCompletion?: boolean;
    timeout?: string;
    onError?: "fail" | "continue";
  };
  onChange: (config: Record<string, unknown>) => void;
}

export function SubWorkflowConfig({
  organizationId,
  config,
  onChange,
}: SubWorkflowConfigProps) {
  const { data: workflows } = useQuery({
    ...workflowsOptions({ organizationId }),
    select: (data) => data?.workflows?.nodes ?? [],
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Workflow</Label>
        <Select
          value={config.workflowId ?? ""}
          onValueChange={(value) => onChange({ ...config, workflowId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select workflow" />
          </SelectTrigger>
          <SelectContent>
            {workflows?.map((wf) => (
              <SelectItem key={wf.rowId} value={wf.rowId}>
                {wf.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Input (JSON)</Label>
        <Textarea
          value={JSON.stringify(config.input ?? {}, null, 2)}
          onChange={(e) => {
            try {
              const input = JSON.parse(e.target.value);
              onChange({ ...config, input });
            } catch {
              // Invalid JSON, don't update
            }
          }}
          placeholder='{"key": "{{steps.previous.output}}"}'
          rows={4}
          className="font-mono text-sm"
        />
        <p className="text-muted-foreground text-xs">
          Use templates like {"{{steps.name.output}}"} for dynamic values
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Label>Wait for completion</Label>
        <Switch
          checked={config.waitForCompletion ?? true}
          onCheckedChange={(checked) =>
            onChange({ ...config, waitForCompletion: checked })
          }
        />
      </div>

      {config.waitForCompletion && (
        <div className="space-y-2">
          <Label>Timeout</Label>
          <Input
            value={config.timeout ?? ""}
            onChange={(e) => onChange({ ...config, timeout: e.target.value })}
            placeholder="5m, 1h, 24h"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>On Error</Label>
        <Select
          value={config.onError ?? "fail"}
          onValueChange={(value) =>
            onChange({ ...config, onError: value as "fail" | "continue" })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fail">Fail workflow</SelectItem>
            <SelectItem value="continue">Continue execution</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add vortex-app/src/components/workflow/NodeConfigSidebar/configs/SubWorkflowConfig.tsx
git commit -m "feat(vortex): add sub-workflow config UI"
```

---

### Task 2.3: Sub-Workflow Execution (Hatchet)

**Files:**
- Create: `vortex-worker/src/steps/subworkflow.ts`
- Modify: `vortex-worker/src/workflows/dsl.workflow.ts`

**Step 1: Create subworkflow step executor**

```typescript
// vortex-worker/src/steps/subworkflow.ts
import { Context } from "@hatchet-dev/typescript-sdk";
import { db } from "@/lib/db";
import { workflow, workflowRun } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ulid } from "ulid";
import { resolveTemplates } from "../utils/templates";
import { getHatchet } from "@/lib/hatchet";

import type { SubWorkflowStep, StepContext } from "@/lib/workflow/types";

export async function executeSubWorkflow(
  step: SubWorkflowStep,
  context: StepContext,
  hatchetContext: Context,
): Promise<unknown> {
  const hatchet = getHatchet();

  // Resolve template variables in input
  const resolvedInput = resolveTemplates(step.subworkflow.input, context);

  // Get target workflow
  const [targetWorkflow] = await db
    .select()
    .from(workflow)
    .where(eq(workflow.id, step.subworkflow.workflowId))
    .limit(1);

  if (!targetWorkflow) {
    throw new Error(`Workflow not found: ${step.subworkflow.workflowId}`);
  }

  // Create child run record
  const childRunId = ulid();
  await db.insert(workflowRun).values({
    id: childRunId,
    workflowId: targetWorkflow.id,
    status: "pending",
    input: resolvedInput,
    parentRunId: context.runId,
  });

  // Trigger child workflow
  const childWorkflowRun = await hatchet.workflow.trigger(
    `dsl-workflow-${targetWorkflow.id}`,
    {
      workflowId: targetWorkflow.id,
      runId: childRunId,
      input: resolvedInput,
      parentRunId: context.runId,
    },
  );

  if (step.subworkflow.waitForCompletion) {
    // Wait for child to complete
    const result = await childWorkflowRun.result();
    return result;
  }

  // Fire and forget
  return {
    childRunId,
    childWorkflowId: targetWorkflow.id,
    status: "triggered",
  };
}
```

**Step 2: Register in dsl.workflow.ts**

Add case for "subworkflow" step type in the step execution switch.

**Step 3: Commit**

```bash
git add vortex-worker/src/steps/subworkflow.ts vortex-worker/src/workflows/dsl.workflow.ts
git commit -m "feat(vortex): add sub-workflow execution"
```

---

### Task 2.4: Add Sub-Workflow to NodePicker

**Files:**
- Modify: `vortex-app/src/components/NodePicker.tsx`

**Step 1: Add to BUILTIN_NODES**

```typescript
{
  id: "flow-subworkflow",
  category: "flow",
  label: "Sub-Workflow",
  description: "Call another workflow",
  icon: GitBranch,
  nodeType: NodeTypes.SUBWORKFLOW,
  pluginId: "builtin:subworkflow",
  operation: "call",
},
```

**Step 2: Commit**

```bash
git add vortex-app/src/components/NodePicker.tsx
git commit -m "feat(vortex): add sub-workflow to node picker"
```

---

## Phase 3: Try/Catch + Race Flow Nodes

### Task 3.1: Try/Catch Step Type

**Files:**
- Modify: `vortex-app/src/lib/workflow/types.ts`

**Step 1: Add TryCatch step type**

```typescript
export interface TryCatchStep {
  id: string;
  type: "try_catch";
  name: string;
  tryCatch: {
    tryBranch: string[];      // Step IDs
    catchBranch: string[];    // Step IDs
    errorOutput: string;      // Variable name
    retries?: number;
    retryDelay?: string;
  };
}
```

**Step 2: Commit**

```bash
git add vortex-app/src/lib/workflow/types.ts
git commit -m "feat(vortex): add try/catch step type"
```

---

### Task 3.2: Race Step Type

**Files:**
- Modify: `vortex-app/src/lib/workflow/types.ts`

**Step 1: Add Race step type**

```typescript
export interface RaceStep {
  id: string;
  type: "race";
  name: string;
  race: {
    branches: string[][];     // Array of step ID arrays
    timeout?: string;
    output: string;           // Variable for winning result
    winnerIndex: string;      // Variable for which branch won
  };
}
```

**Step 2: Commit**

```bash
git add vortex-app/src/lib/workflow/types.ts
git commit -m "feat(vortex): add race step type"
```

---

### Task 3.3: Try/Catch Execution

**Files:**
- Create: `vortex-worker/src/steps/tryCatch.ts`

**Step 1: Create executor**

```typescript
// vortex-worker/src/steps/tryCatch.ts
import type { TryCatchStep, StepContext } from "@/lib/workflow/types";

export async function executeTryCatch(
  step: TryCatchStep,
  context: StepContext,
  executeStep: (stepId: string, ctx: StepContext) => Promise<unknown>,
): Promise<{ success: boolean; handled?: boolean }> {
  const maxRetries = step.tryCatch.retries ?? 0;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      for (const stepId of step.tryCatch.tryBranch) {
        await executeStep(stepId, context);
      }
      return { success: true };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < maxRetries && step.tryCatch.retryDelay) {
        const delayMs = parseDelay(step.tryCatch.retryDelay);
        await sleep(delayMs);
      }
    }
  }

  // All retries exhausted, run catch branch
  context.variables[step.tryCatch.errorOutput] = {
    message: lastError?.message,
    name: lastError?.name,
    stack: lastError?.stack,
    attempts: maxRetries + 1,
  };

  for (const stepId of step.tryCatch.catchBranch) {
    await executeStep(stepId, context);
  }

  return { success: false, handled: true };
}

function parseDelay(delay: string): number {
  const match = delay.match(/^(\d+)(ms|s|m|h)$/);
  if (!match) return 1000;

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case "ms": return value;
    case "s": return value * 1000;
    case "m": return value * 60 * 1000;
    case "h": return value * 60 * 60 * 1000;
    default: return 1000;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

**Step 2: Commit**

```bash
git add vortex-worker/src/steps/tryCatch.ts
git commit -m "feat(vortex): add try/catch execution"
```

---

### Task 3.4: Race Execution

**Files:**
- Create: `vortex-worker/src/steps/race.ts`

**Step 1: Create executor**

```typescript
// vortex-worker/src/steps/race.ts
import type { RaceStep, StepContext } from "@/lib/workflow/types";

export async function executeRace(
  step: RaceStep,
  context: StepContext,
  executeStep: (stepId: string, ctx: StepContext) => Promise<unknown>,
): Promise<{ index: number; result: unknown }> {
  const branchPromises = step.race.branches.map(async (branch, index) => {
    // Create isolated context for each branch
    const branchContext = { ...context, variables: { ...context.variables } };

    for (const stepId of branch) {
      await executeStep(stepId, branchContext);
    }

    const lastStepId = branch[branch.length - 1];
    return {
      index,
      result: branchContext.stepOutputs[lastStepId],
    };
  });

  // Add timeout if specified
  let racePromises: Promise<{ index: number; result: unknown }>[] = branchPromises;

  if (step.race.timeout) {
    const timeoutMs = parseTimeout(step.race.timeout);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Race timeout")), timeoutMs),
    );
    racePromises = [...branchPromises, timeoutPromise as never];
  }

  const winner = await Promise.race(racePromises);

  context.variables[step.race.output] = winner.result;
  context.variables[step.race.winnerIndex] = winner.index;

  return winner;
}

function parseTimeout(timeout: string): number {
  const match = timeout.match(/^(\d+)(ms|s|m|h)$/);
  if (!match) return 30000;

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case "ms": return value;
    case "s": return value * 1000;
    case "m": return value * 60 * 1000;
    case "h": return value * 60 * 60 * 1000;
    default: return 30000;
  }
}
```

**Step 2: Commit**

```bash
git add vortex-worker/src/steps/race.ts
git commit -m "feat(vortex): add race execution"
```

---

### Task 3.5: Try/Catch + Race Config UIs

**Files:**
- Create: `vortex-app/src/components/workflow/NodeConfigSidebar/configs/TryCatchConfig.tsx`
- Create: `vortex-app/src/components/workflow/NodeConfigSidebar/configs/RaceConfig.tsx`

**Step 1: Create TryCatchConfig**

```typescript
// vortex-app/src/components/workflow/NodeConfigSidebar/configs/TryCatchConfig.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TryCatchConfigProps {
  config: {
    errorOutput?: string;
    retries?: number;
    retryDelay?: string;
  };
  onChange: (config: Record<string, unknown>) => void;
}

export function TryCatchConfig({ config, onChange }: TryCatchConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Error Variable Name</Label>
        <Input
          value={config.errorOutput ?? "error"}
          onChange={(e) => onChange({ ...config, errorOutput: e.target.value })}
          placeholder="error"
        />
        <p className="text-muted-foreground text-xs">
          Variable name to store error details
        </p>
      </div>

      <div className="space-y-2">
        <Label>Retries</Label>
        <Input
          type="number"
          min={0}
          max={10}
          value={config.retries ?? 0}
          onChange={(e) =>
            onChange({ ...config, retries: parseInt(e.target.value, 10) })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Retry Delay</Label>
        <Input
          value={config.retryDelay ?? ""}
          onChange={(e) => onChange({ ...config, retryDelay: e.target.value })}
          placeholder="1s, 5s, 1m"
        />
      </div>

      <p className="text-muted-foreground text-sm">
        Connect try steps to the green output. Connect catch steps to the red output.
      </p>
    </div>
  );
}
```

**Step 2: Create RaceConfig**

```typescript
// vortex-app/src/components/workflow/NodeConfigSidebar/configs/RaceConfig.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RaceConfigProps {
  config: {
    output?: string;
    winnerIndex?: string;
    timeout?: string;
  };
  onChange: (config: Record<string, unknown>) => void;
}

export function RaceConfig({ config, onChange }: RaceConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Result Variable</Label>
        <Input
          value={config.output ?? "raceResult"}
          onChange={(e) => onChange({ ...config, output: e.target.value })}
          placeholder="raceResult"
        />
        <p className="text-muted-foreground text-xs">
          Variable to store the winning branch's result
        </p>
      </div>

      <div className="space-y-2">
        <Label>Winner Index Variable</Label>
        <Input
          value={config.winnerIndex ?? "winnerIndex"}
          onChange={(e) => onChange({ ...config, winnerIndex: e.target.value })}
          placeholder="winnerIndex"
        />
        <p className="text-muted-foreground text-xs">
          Variable to store which branch won (0-indexed)
        </p>
      </div>

      <div className="space-y-2">
        <Label>Timeout</Label>
        <Input
          value={config.timeout ?? ""}
          onChange={(e) => onChange({ ...config, timeout: e.target.value })}
          placeholder="30s, 5m"
        />
      </div>

      <p className="text-muted-foreground text-sm">
        Connect multiple branches. First branch to complete wins.
      </p>
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add vortex-app/src/components/workflow/NodeConfigSidebar/configs/TryCatchConfig.tsx
git add vortex-app/src/components/workflow/NodeConfigSidebar/configs/RaceConfig.tsx
git commit -m "feat(vortex): add try/catch and race config UIs"
```

---

### Task 3.6: Add Try/Catch + Race to NodePicker

**Files:**
- Modify: `vortex-app/src/components/NodePicker.tsx`

**Step 1: Add to BUILTIN_NODES**

```typescript
{
  id: "flow-trycatch",
  category: "flow",
  label: "Try/Catch",
  description: "Error boundary with retry support",
  icon: Shield,
  nodeType: NodeTypes.TRY_CATCH,
  pluginId: "builtin:trycatch",
  operation: "execute",
},
{
  id: "flow-race",
  category: "flow",
  label: "Race",
  description: "Run branches in parallel, use first result",
  icon: Zap,
  nodeType: NodeTypes.RACE,
  pluginId: "builtin:race",
  operation: "execute",
},
```

**Step 2: Import Shield icon from lucide-react**

**Step 3: Commit**

```bash
git add vortex-app/src/components/NodePicker.tsx
git commit -m "feat(vortex): add try/catch and race to node picker"
```

---

## Phase 4: Comment Node

### Task 4.1: Comment Step Type

**Files:**
- Modify: `vortex-app/src/lib/workflow/types.ts`

**Step 1: Add Comment step type**

```typescript
export interface CommentStep {
  id: string;
  type: "comment";
  name: string;
  comment: {
    text: string;
    color?: string;
  };
}
```

**Step 2: Commit**

```bash
git add vortex-app/src/lib/workflow/types.ts
git commit -m "feat(vortex): add comment step type"
```

---

### Task 4.2: Comment Node Component

**Files:**
- Create: `vortex-app/src/components/workflow/nodes/CommentNode.tsx`

**Step 1: Create component**

```typescript
// vortex-app/src/components/workflow/nodes/CommentNode.tsx
import { memo } from "react";
import { NodeProps } from "reactflow";
import { MessageSquare } from "lucide-react";

interface CommentNodeData {
  label: string;
  comment?: {
    text?: string;
    color?: string;
  };
}

function CommentNode({ data, selected }: NodeProps<CommentNodeData>) {
  const color = data.comment?.color ?? "#fef3c7"; // Default amber-100

  return (
    <div
      className={`min-w-[200px] rounded-lg border-2 border-dashed p-3 ${
        selected ? "ring-2 ring-primary" : ""
      }`}
      style={{ backgroundColor: color, borderColor: adjustColor(color, -20) }}
    >
      <div className="flex items-start gap-2">
        <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 opacity-50" />
        <div className="min-w-0 flex-1">
          <p className="font-medium text-sm">{data.label || "Note"}</p>
          {data.comment?.text && (
            <p className="mt-1 whitespace-pre-wrap text-muted-foreground text-xs">
              {data.comment.text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export default memo(CommentNode);
```

**Step 2: Register in nodeTypes**

**Step 3: Commit**

```bash
git add vortex-app/src/components/workflow/nodes/CommentNode.tsx
git commit -m "feat(vortex): add comment node component"
```

---

### Task 4.3: Comment Config UI

**Files:**
- Create: `vortex-app/src/components/workflow/NodeConfigSidebar/configs/CommentConfig.tsx`

**Step 1: Create component**

```typescript
// vortex-app/src/components/workflow/NodeConfigSidebar/configs/CommentConfig.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const COLORS = [
  { name: "Yellow", value: "#fef3c7" },
  { name: "Blue", value: "#dbeafe" },
  { name: "Green", value: "#dcfce7" },
  { name: "Pink", value: "#fce7f3" },
  { name: "Purple", value: "#f3e8ff" },
  { name: "Gray", value: "#f3f4f6" },
];

interface CommentConfigProps {
  config: {
    text?: string;
    color?: string;
  };
  onChange: (config: Record<string, unknown>) => void;
}

export function CommentConfig({ config, onChange }: CommentConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Note</Label>
        <Textarea
          value={config.text ?? ""}
          onChange={(e) => onChange({ ...config, text: e.target.value })}
          placeholder="Add documentation or notes..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Color</Label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => onChange({ ...config, color: color.value })}
              className={`h-8 w-8 rounded-md border-2 ${
                config.color === color.value
                  ? "border-primary"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add vortex-app/src/components/workflow/NodeConfigSidebar/configs/CommentConfig.tsx
git commit -m "feat(vortex): add comment config UI"
```

---

### Task 4.4: Add Comment to NodePicker

**Files:**
- Modify: `vortex-app/src/components/NodePicker.tsx`

**Step 1: Add to BUILTIN_NODES under a new "utility" category**

```typescript
{
  id: "utility-comment",
  category: "other",
  label: "Comment",
  description: "Add notes and documentation to canvas",
  icon: MessageSquare,
  nodeType: NodeTypes.COMMENT,
},
```

**Step 2: Commit**

```bash
git add vortex-app/src/components/NodePicker.tsx
git commit -m "feat(vortex): add comment to node picker"
```

---

### Task 4.5: Skip Comment in Execution

**Files:**
- Modify: `vortex-worker/src/workflows/dsl.workflow.ts`

**Step 1: Add early return for comment type**

```typescript
// In the step execution switch/if chain
if (step.type === "comment") {
  // No-op - comments are for documentation only
  return { skipped: true, type: "comment" };
}
```

**Step 2: Commit**

```bash
git add vortex-worker/src/workflows/dsl.workflow.ts
git commit -m "feat(vortex): skip comment nodes during execution"
```

---

## Summary

**Phase 1 (Omni Event Trigger):** 8 tasks
**Phase 2 (Sub-Workflow):** 4 tasks
**Phase 3 (Try/Catch + Race):** 6 tasks
**Phase 4 (Comment):** 5 tasks

**Total:** 23 tasks for Phases 1-4

Phases 5-10 (Polling, Kafka, SQS, S3, CDC, State Store) will be planned after these foundational phases are complete.
