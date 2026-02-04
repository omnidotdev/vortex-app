# Workflow Execution Tracing Design

## Overview

Real-time workflow execution tracing with step-by-step visibility, competing with n8n/Zapier debugging experience.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   vortex-app    │────▶│   vortex-api    │◀────│  vortex-worker  │
│   (React UI)    │ SSE │   (API + SSE)   │     │   (Executor)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │                        │
                               ▼                        ▼
                        ┌─────────────────────────────────────┐
                        │           PostgreSQL                │
                        │  workflow_run + workflow_step_log   │
                        └─────────────────────────────────────┘
```

**Flow:**
1. Worker starts a run → inserts `workflow_run` (status: "running")
2. Worker starts each step → inserts `workflow_step_log` (status: "running")
3. Worker completes step → updates `workflow_step_log` with output/error
4. UI subscribes to SSE endpoint for a run ID
5. API polls DB and pushes updates via SSE

## Data Model

### workflow_run (existing table)

| Field | Value |
|-------|-------|
| `status` | `pending` → `running` → `completed` / `failed` / `cancelled` |
| `input` | Trigger data (webhook payload, schedule context, etc.) |
| `output` | Final workflow result (last step's output) |
| `error` | Top-level error message if workflow failed |
| `startedAt` / `completedAt` | Timing for duration calculations |

### workflow_step_log (existing table)

| Field | Value |
|-------|-------|
| `stepId` | Node ID from ReactFlow |
| `stepName` | Human-readable name (e.g., "Send Email", "HTTP Request") |
| `stepType` | Node type (e.g., `integration`, `builtin:http`, `condition`) |
| `status` | `pending` → `running` → `completed` / `failed` / `skipped` |
| `input` | Resolved inputs passed to the step (after expression evaluation) |
| `output` | Step result (API response, transformed data, etc.) |
| `error` | Error message + stack trace if step failed |
| `startedAt` / `completedAt` | Per-step timing |

## Sensitive Data Redaction

Always-on redaction before storing input/output to DB.

**Redaction targets:**
- Field names containing: `password`, `secret`, `token`, `apiKey`, `api_key`, `authorization`, `credential`, `private`, `key`
- Header values: `Authorization`, `X-Api-Key`, `Cookie`, `Set-Cookie`
- Known patterns: Bearer tokens, API key formats (sk-*, xoxb-*, ghp_*, etc.)

**Implementation:**
```typescript
function redactSensitive(obj: unknown): unknown {
  // Deep clone and replace sensitive values with "[REDACTED]"
}
```

Redaction happens in the worker before DB insert.

## Worker Implementation

### New files

- `vortex-worker/src/db/runLogger.ts` - Run/step logging functions

### Changes to dsl.workflow.ts

```typescript
import { createWorkflowRun, logStepStart, logStepComplete, logStepFailed, markRunComplete, markRunFailed } from "../db/runLogger";

// At workflow start
const dbRunId = await createWorkflowRun({
  workflowId,
  engineWorkflowId: "dsl-workflow",
  engineRunId: runId,
  input: redactSensitive(triggerData),
  status: "running",
});

// In the BFS loop
while (queue.length > 0) {
  const step = queue.shift()!;
  if (visited.has(step.id)) continue;
  visited.add(step.id);

  const stepInput = resolveStepInput(step, execCtx); // Get resolved inputs
  await logStepStart(dbRunId, {
    stepId: step.id,
    stepName: getStepName(step, stepNameToId),
    stepType: step.type,
    input: redactSensitive(stepInput),
  });

  try {
    const { nextSteps, result } = await executeStep(dslDef, step, execCtx);
    await logStepComplete(dbRunId, step.id, redactSensitive(result));
    queue.push(...nextSteps);
  } catch (error) {
    await logStepFailed(dbRunId, step.id, error);
    await markRunFailed(dbRunId, error);
    throw error;
  }
}

await markRunComplete(dbRunId, execCtx.stepResults);
```

### runLogger.ts functions

```typescript
export async function createWorkflowRun(params: {
  workflowId: string;
  engineWorkflowId: string;
  engineRunId: string;
  input: unknown;
  status: string;
}): Promise<string>;

export async function logStepStart(runId: string, params: {
  stepId: string;
  stepName: string;
  stepType: string;
  input: unknown;
}): Promise<void>;

export async function logStepComplete(
  runId: string,
  stepId: string,
  output: unknown
): Promise<void>;

export async function logStepFailed(
  runId: string,
  stepId: string,
  error: Error
): Promise<void>;

export async function markRunComplete(
  runId: string,
  output: unknown
): Promise<void>;

export async function markRunFailed(
  runId: string,
  error: Error
): Promise<void>;
```

## SSE Implementation

### API endpoint

`GET /api/runs/:runId/stream` in vortex-api (or vortex-app API routes)

```typescript
export async function GET(req: Request) {
  const runId = getRunIdFromParams(req);

  // Verify user has access to this run's workflow
  await requireWorkflowAccess(runId);

  return new Response(
    new ReadableStream({
      async start(controller) {
        const sendUpdate = async () => {
          const run = await getRunWithSteps(runId);
          controller.enqueue(`data: ${JSON.stringify(run)}\n\n`);
          return run.status === "completed" || run.status === "failed";
        };

        // Send initial state
        const done = await sendUpdate();
        if (done) {
          controller.close();
          return;
        }

        // Poll for updates
        const interval = setInterval(async () => {
          const done = await sendUpdate();
          if (done) {
            clearInterval(interval);
            controller.close();
          }
        }, 500);
      }
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      }
    }
  );
}
```

### Frontend hook

```typescript
// hooks/useWorkflowRunStream.ts
export function useWorkflowRunStream(runId: string | null) {
  const [run, setRun] = useState<WorkflowRunWithSteps | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!runId) return;

    const source = new EventSource(`/api/runs/${runId}/stream`);

    source.onmessage = (event) => {
      setRun(JSON.parse(event.data));
    };

    source.onerror = () => {
      setError(new Error("Connection lost"));
      source.close();
    };

    return () => source.close();
  }, [runId]);

  return { run, error };
}
```

## UI Components

### Run History Panel

Sidebar panel in workflow editor showing recent runs:

- List of runs with status badge (green checkmark, red X, yellow spinner)
- Timestamp and duration
- Click to expand step-by-step breakdown
- Filter by status

### Step Detail View

Expandable panel when clicking a step in the run history:

```
┌─────────────────────────────────────────────┐
│ ● Send Email                    ✓ Completed │
│ Duration: 1.2s                              │
├─────────────────────────────────────────────┤
│ INPUT                                       │
│ {                                           │
│   "to": "user@example.com",                 │
│   "subject": "Welcome!",                    │
│   "apiKey": "[REDACTED]"                    │
│ }                                           │
├─────────────────────────────────────────────┤
│ OUTPUT                                      │
│ {                                           │
│   "messageId": "abc123",                    │
│   "status": "sent"                          │
│ }                                           │
└─────────────────────────────────────────────┘
```

### Canvas Integration

Real-time node highlighting during execution:

- **Pulsing border** - Step currently running
- **Green border** - Step completed successfully
- **Red border** - Step failed
- Reset when viewing a different run or closing the panel

## File Structure

```
vortex-worker/src/
  db/
    runLogger.ts        # NEW: Run/step logging functions
    redact.ts           # NEW: Sensitive data redaction
  workflows/
    dsl.workflow.ts     # MODIFY: Add logging calls

vortex-api/src/
  routes/
    runs/
      [runId]/
        stream.ts       # NEW: SSE endpoint

vortex-app/src/
  hooks/
    useWorkflowRunStream.ts  # NEW: SSE subscription hook
  components/
    workflow/
      RunHistoryPanel.tsx    # NEW: Run history sidebar
      StepDetailView.tsx     # NEW: Step input/output display
      useCanvasHighlight.ts  # NEW: Node highlighting hook
```

## Implementation Order

1. **Worker logging** - `runLogger.ts`, `redact.ts`, modify `dsl.workflow.ts`
2. **SSE endpoint** - API route with polling
3. **Frontend hook** - `useWorkflowRunStream`
4. **Run history panel** - Basic list with status
5. **Step detail view** - Input/output display
6. **Canvas highlighting** - Real-time node borders
