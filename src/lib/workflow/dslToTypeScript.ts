/**
 * Generate TypeScript SDK builder code from a WorkflowDefinition.
 * Used for exporting workflows from the UI as copy-pasteable TypeScript
 */

import type {
  ActionStep,
  ConditionStep,
  EdgeDefinition,
  Step,
  TriggerStep,
  WorkflowDefinition,
} from "@/lib/workflow/types";

// Mapping from step type to the property key holding step-specific data.
// Most step types use their type name directly, but some use camelCase variants
const stepDataKeyMap: Record<string, string> = {
  webhookResponse: "webhookResponse",
  vectorSearch: "vectorSearch",
  try_catch: "tryCatch",
  state_get: "stateGet",
  state_set: "stateSet",
  state_wait: "stateWait",
  change_detector: "changeDetector",
  time_window: "timeWindow",
  ai_transform: "aiTransform",
  ai_guardrails: "aiGuardrails",
};

/**
 * Topologically sort steps using edge definitions.
 * Start from root nodes (no incoming edges), then follow outgoing edges
 */
function topologicalSort(steps: Step[], edges: EdgeDefinition[]): Step[] {
  const stepMap = new Map<string, Step>();
  for (const step of steps) {
    stepMap.set(step.id, step);
  }

  // Build adjacency list and in-degree count
  const adjacency = new Map<string, string[]>();
  const inDegree = new Map<string, number>();

  for (const step of steps) {
    adjacency.set(step.id, []);
    inDegree.set(step.id, 0);
  }

  for (const edge of edges) {
    // Only include edges between known steps
    if (!stepMap.has(edge.source) || !stepMap.has(edge.target)) continue;

    const neighbors = adjacency.get(edge.source);
    if (neighbors) {
      neighbors.push(edge.target);
    }
    inDegree.set(edge.target, (inDegree.get(edge.target) ?? 0) + 1);
  }

  // Kahn's algorithm - BFS topological sort
  // Prioritize trigger steps first among roots
  const queue: string[] = [];
  for (const step of steps) {
    if ((inDegree.get(step.id) ?? 0) === 0) {
      if (step.type === "trigger") {
        queue.unshift(step.id);
      } else {
        queue.push(step.id);
      }
    }
  }

  const sorted: Step[] = [];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const id = queue.shift()!;
    if (visited.has(id)) continue;
    visited.add(id);

    const step = stepMap.get(id);
    if (step) {
      sorted.push(step);
    }

    const neighbors = adjacency.get(id) ?? [];
    for (const neighbor of neighbors) {
      const deg = (inDegree.get(neighbor) ?? 1) - 1;
      inDegree.set(neighbor, deg);
      if (deg === 0 && !visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }

  // Append any steps not reached by edges (isolated nodes)
  for (const step of steps) {
    if (!visited.has(step.id)) {
      sorted.push(step);
    }
  }

  return sorted;
}

/**
 * Serialize a value to pretty-printed JSON, then re-indent it for
 * embedding inside a template literal at the given base indentation
 */
function serializeValue(value: unknown, baseIndent: number): string {
  const json = JSON.stringify(value, null, 2);
  const lines = json.split("\n");

  // First line stays at current position, subsequent lines get base indent
  return lines
    .map((line, i) => (i === 0 ? line : `${" ".repeat(baseIndent)}${line}`))
    .join("\n");
}

/**
 * Escape a string value for use inside a TypeScript string literal
 */
function escapeString(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
}

/**
 * Convert a workflow name to a valid JS identifier in camelCase
 */
function toIdentifier(name: string): string {
  return (
    name
      .replace(/[^a-zA-Z0-9\s_-]/g, "")
      .replace(/[-_\s]+(.)?/g, (_, c: string | undefined) =>
        c ? c.toUpperCase() : "",
      )
      .replace(/^[A-Z]/, (c) => c.toLowerCase())
      .replace(/^[^a-zA-Z_$]/, "_$&") || "myWorkflow"
  );
}

/**
 * Generate the `.trigger(...)` builder call for a TriggerStep
 */
function generateTriggerCall(step: TriggerStep): string {
  const { type, config } = step.trigger;

  const hasConfig = Object.keys(config).length > 0;
  if (!hasConfig) {
    return `  .trigger("${escapeString(type)}")`;
  }

  return `  .trigger("${escapeString(type)}", ${serializeValue(config, 4)})`;
}

/**
 * Generate the `.action(...)` builder call for an ActionStep
 */
function generateActionCall(step: ActionStep): string {
  const { integrationId, operation, inputs, outputs } = step.action;

  const config: Record<string, unknown> = {};
  if (integrationId) config.integration = integrationId;
  if (operation) config.operation = operation;
  if (inputs && Object.keys(inputs).length > 0) config.inputs = inputs;
  if (outputs && Object.keys(outputs).length > 0) config.outputs = outputs;

  return `  .action("${escapeString(step.name)}", ${serializeValue(config, 4)})`;
}

/**
 * Generate the `.condition(...)` builder call for a ConditionStep
 */
function generateConditionCall(step: ConditionStep): string {
  const { expression, trueBranch, falseBranch } = step.condition;

  const config: Record<string, unknown> = { expression };
  if (trueBranch) config.trueBranch = trueBranch;
  if (falseBranch) config.falseBranch = falseBranch;

  return `  .condition("${escapeString(step.name)}", ${serializeValue(config, 4)})`;
}

/**
 * Generate a generic `.step(...)` builder call for any other step type
 */
function generateGenericStepCall(step: Step): string {
  // Determine the data key for this step type
  const dataKey = stepDataKeyMap[step.type] ?? step.type;
  const stepData = (step as unknown as Record<string, unknown>)[dataKey];

  const config: Record<string, unknown> = { type: step.type };
  if (stepData !== undefined) {
    config[dataKey] = stepData;
  }

  if (step.description) {
    config.description = step.description;
  }

  if (step.onError) {
    config.onError = step.onError;
  }

  return `  .step("${escapeString(step.name)}", ${serializeValue(config, 4)})`;
}

/**
 * Generate the builder call for a single step
 */
function generateStepCall(step: Step): string {
  // Skip comment steps in generated code
  if (step.type === "comment") return "";
  // Skip noop steps
  if (step.type === "noop") return "";

  switch (step.type) {
    case "trigger":
      return generateTriggerCall(step as TriggerStep);
    case "action":
      return generateActionCall(step as ActionStep);
    case "condition":
      return generateConditionCall(step as ConditionStep);
    default:
      return generateGenericStepCall(step);
  }
}

/**
 * Generate TypeScript SDK builder code from a WorkflowDefinition.
 * @param definition - The workflow DSL definition to convert
 * @param workflowName - Optional name for the workflow variable (defaults to "myWorkflow")
 * @returns Valid, copy-pasteable TypeScript source code
 */
function dslToTypeScript(
  definition: WorkflowDefinition,
  workflowName?: string,
): string {
  const name = workflowName ?? "myWorkflow";
  const identifier = toIdentifier(name);

  // Sort steps in execution order
  const sortedSteps = topologicalSort(definition.steps, definition.edges);

  // Build the code
  const lines: string[] = [];

  // Header comment
  lines.push("// Generated by Vortex \u2014 edit freely");
  lines.push("");

  // Import
  lines.push('import { workflow } from "@omnidotdev/vortex";');
  lines.push("");

  // Workflow builder
  lines.push(`const ${identifier} = workflow("${escapeString(name)}")`);

  // Variables (before steps)
  if (definition.variables && Object.keys(definition.variables).length > 0) {
    lines.push(`  .variables(${serializeValue(definition.variables, 4)})`);
  }

  // Settings
  if (definition.settings && Object.keys(definition.settings).length > 0) {
    lines.push(`  .settings(${serializeValue(definition.settings, 4)})`);
  }

  // Steps in topological order
  for (const step of sortedSteps) {
    const call = generateStepCall(step);
    if (call) {
      lines.push(call);
    }
  }

  // Build
  lines.push("  .build();");
  lines.push("");

  // Export
  lines.push(`export default ${identifier};`);
  lines.push("");

  return lines.join("\n");
}

export default dslToTypeScript;
