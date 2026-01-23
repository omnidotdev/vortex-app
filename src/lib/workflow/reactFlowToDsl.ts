/**
 * Convert ReactFlow nodes and edges to Vortex Workflow DSL
 */

import type { Edge, Node } from "reactflow";
import type {
  ActionStep,
  ConditionStep,
  DelayStep,
  EdgeDefinition,
  GateStep,
  LoopStep,
  ParallelStep,
  PluginStep,
  Step,
  SwitchStep,
  TriggerStep,
  WorkflowDefinition,
} from "./types";

// Map ReactFlow node types to DSL step types
const nodeTypeToStepType: Record<string, string> = {
  triggerNode: "trigger",
  actionNode: "action",
  conditionNode: "condition",
  switchNode: "switch",
  loopNode: "loop",
  gateNode: "gate",
  delayNode: "delay",
  parallelNode: "parallel",
  pluginNode: "plugin",
};

// Convert trigger node data to DSL step
function triggerNodeToStep(node: Node): TriggerStep {
  const data = node.data;
  return {
    id: node.id,
    type: "trigger",
    name: data.label || "Trigger",
    description: data.description,
    position: node.position,
    trigger: {
      type: data.triggerType || "manual",
      config: data.config || {},
    },
  };
}

// Convert action node data to DSL step
function actionNodeToStep(node: Node): ActionStep {
  const data = node.data;

  // Merge config and inputs - inputs override config values
  // This allows UI to store defaults in config and user-entered values in inputs
  const config = (data.config as Record<string, unknown>) || {};
  const inputs = (data.inputs as Record<string, unknown>) || {};
  const mergedInputs = { ...config, ...inputs };

  // Use integrationId if set, otherwise fall back to integrationDefinitionId
  // integrationDefinitionId is the integration type (e.g., "twilio")
  // integrationId may be set to the same value when a connected instance exists
  const integrationId = data.integrationId || data.integrationDefinitionId;

  return {
    id: node.id,
    type: "action",
    name: data.label || "Action",
    description: data.description,
    position: node.position,
    action: {
      integrationId,
      pluginId: data.pluginId,
      operation: data.operation || data.label || "execute",
      inputs: mergedInputs,
      outputs: data.outputs,
    },
  };
}

// Convert condition node data to DSL step
function conditionNodeToStep(node: Node, edges: Edge[]): ConditionStep {
  const data = node.data;

  // Find true and false branch targets
  const trueEdge = edges.find(
    (e) => e.source === node.id && e.sourceHandle === "true",
  );
  const falseEdge = edges.find(
    (e) => e.source === node.id && e.sourceHandle === "false",
  );

  return {
    id: node.id,
    type: "condition",
    name: data.label || "Condition",
    description: data.description,
    position: node.position,
    condition: {
      expression: data.expression || data.config?.expression || "true",
      trueBranch: trueEdge?.target || "",
      falseBranch: falseEdge?.target || "",
    },
  };
}

// Convert switch node data to DSL step
function switchNodeToStep(node: Node, edges: Edge[]): SwitchStep {
  const data = node.data;

  // Build cases from edges and node data
  const cases = (data.cases || []).map(
    (c: { value: string; label: string }, index: number) => {
      const caseEdge = edges.find(
        (e) => e.source === node.id && e.sourceHandle === `case_${index}`,
      );
      return {
        value: c.value,
        label: c.label,
        next: caseEdge?.target || "",
      };
    },
  );

  // Find default case
  const defaultEdge = edges.find(
    (e) => e.source === node.id && e.sourceHandle === "default",
  );

  return {
    id: node.id,
    type: "switch",
    name: data.label || "Switch",
    description: data.description,
    position: node.position,
    switch: {
      expression: data.expression || data.config?.expression || "",
      cases,
      default: defaultEdge?.target,
    },
  };
}

// Convert loop node data to DSL step
function loopNodeToStep(node: Node): LoopStep {
  const data = node.data;
  return {
    id: node.id,
    type: "loop",
    name: data.label || "Loop",
    description: data.description,
    position: node.position,
    loop: {
      type: data.loopType || "forEach",
      collection: data.collection,
      condition: data.condition,
      count: data.count,
      itemVariable: data.itemVariable || "item",
      indexVariable: data.indexVariable || "index",
      body: data.body || [],
      maxIterations: data.maxIterations,
    },
  };
}

// Convert gate node data to DSL step
function gateNodeToStep(node: Node): GateStep {
  const data = node.data;
  return {
    id: node.id,
    type: "gate",
    name: data.label || "Gate",
    description: data.description,
    position: node.position,
    gate: {
      type: data.gateType || "approval",
      approvers: data.approvers,
      signalName: data.signalName,
      timeout: data.timeout,
      timeoutAction: data.timeoutAction,
    },
  };
}

// Convert delay node data to DSL step
function delayNodeToStep(node: Node): DelayStep {
  const data = node.data;
  return {
    id: node.id,
    type: "delay",
    name: data.label || "Delay",
    description: data.description,
    position: node.position,
    delay: {
      duration: data.duration || 1,
      unit: data.unit || "minutes",
    },
  };
}

// Convert parallel node data to DSL step
function parallelNodeToStep(node: Node): ParallelStep {
  const data = node.data;
  return {
    id: node.id,
    type: "parallel",
    name: data.label || "Parallel",
    description: data.description,
    position: node.position,
    parallel: {
      branches: data.branches || [],
      waitFor: data.waitFor || "all",
    },
  };
}

// Convert plugin node data to DSL step
function pluginNodeToStep(node: Node): PluginStep {
  const data = node.data;
  return {
    id: node.id,
    type: "plugin",
    name: data.label || "Plugin",
    description: data.description,
    position: node.position,
    plugin: {
      pluginId: data.pluginId || "",
      function: data.function || "execute",
      inputs: data.inputs || {},
      outputs: data.outputs,
      timeout: data.timeout,
      memoryLimit: data.memoryLimit,
    },
  };
}

// Convert a ReactFlow node to a DSL step
function nodeToStep(node: Node, edges: Edge[]): Step | null {
  const stepType = nodeTypeToStepType[node.type || ""] || node.type;

  switch (stepType) {
    case "trigger":
      return triggerNodeToStep(node);
    case "action":
      return actionNodeToStep(node);
    case "condition":
      return conditionNodeToStep(node, edges);
    case "switch":
      return switchNodeToStep(node, edges);
    case "loop":
      return loopNodeToStep(node);
    case "gate":
      return gateNodeToStep(node);
    case "delay":
      return delayNodeToStep(node);
    case "parallel":
      return parallelNodeToStep(node);
    case "plugin":
      return pluginNodeToStep(node);
    default:
      console.warn("Unknown node type:", node.type);
      return null;
  }
}

// Convert ReactFlow edge to DSL edge
function edgeToDslEdge(edge: Edge): EdgeDefinition {
  return {
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.sourceHandle || undefined,
    label: typeof edge.label === "string" ? edge.label : undefined,
  };
}

/**
 * Generate a unique step name for a node
 */
function generateStepName(node: Node, usedNames: Set<string>): string {
  // Use existing stepName if present
  if (node.data?.stepName) {
    const name = node.data.stepName as string;
    usedNames.add(name);
    return name;
  }

  // Generate from label or integration type
  const baseName =
    (node.data?.label as string) ||
    (node.data?.integrationDefinitionId
      ? (node.data.integrationDefinitionId as string).charAt(0).toUpperCase() +
        (node.data.integrationDefinitionId as string).slice(1)
      : null) ||
    (node.data?.pluginId === "builtin:http" ? "HTTP Request" : null) ||
    node.type?.replace("Node", "") ||
    "Step";

  // Ensure uniqueness
  let stepName = baseName;
  let counter = 2;
  while (usedNames.has(stepName)) {
    stepName = `${baseName} ${counter}`;
    counter++;
  }

  usedNames.add(stepName);
  return stepName;
}

/**
 * Convert ReactFlow nodes and edges to a workflow definition
 */
export function reactFlowToDsl(
  nodes: Node[],
  edges: Edge[],
): WorkflowDefinition {
  const steps: Step[] = [];
  const stepNameToId: Record<string, string> = {};
  const usedNames = new Set<string>();

  for (const node of nodes) {
    // Generate step name mapping (skip trigger nodes - they don't produce outputs)
    if (node.type !== "triggerNode") {
      const stepName = generateStepName(node, usedNames);
      stepNameToId[stepName] = node.id;
    }

    const step = nodeToStep(node, edges);
    if (step) {
      steps.push(step);
    }
  }

  const dslEdges = edges.map(edgeToDslEdge);

  return {
    version: "1.0",
    steps,
    edges: dslEdges,
    stepNameToId,
  };
}
