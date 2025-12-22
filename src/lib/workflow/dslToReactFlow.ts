/**
 * Convert Vortex Workflow DSL to ReactFlow nodes and edges
 */

import { MarkerType } from "reactflow";

import type { Edge, Node } from "reactflow";
import type {
  ActionStep,
  ConditionStep,
  DelayStep,
  GateStep,
  LoopStep,
  ParallelStep,
  PluginStep,
  Step,
  SwitchStep,
  TriggerStep,
  WorkflowDefinition,
} from "./types";

// Map DSL step types to ReactFlow node types
const stepTypeToNodeType: Record<string, string> = {
  trigger: "triggerNode",
  action: "actionNode",
  condition: "conditionNode",
  switch: "switchNode",
  loop: "loopNode",
  gate: "gateNode",
  delay: "delayNode",
  parallel: "parallelNode",
  plugin: "pluginNode",
};

// Convert a trigger step to ReactFlow node data
function triggerStepToNodeData(step: TriggerStep) {
  return {
    label: step.name,
    description: step.description,
    triggerType: step.trigger.type,
    config: step.trigger.config,
  };
}

// Convert an action step to ReactFlow node data
function actionStepToNodeData(step: ActionStep) {
  return {
    label: step.name,
    description: step.description,
    integrationId: step.action.integrationId,
    pluginId: step.action.pluginId,
    operation: step.action.operation,
    inputs: step.action.inputs,
    outputs: step.action.outputs,
  };
}

// Convert a condition step to ReactFlow node data
function conditionStepToNodeData(step: ConditionStep) {
  return {
    label: step.name,
    description: step.description,
    expression: step.condition.expression,
    trueBranch: step.condition.trueBranch,
    falseBranch: step.condition.falseBranch,
  };
}

// Convert a switch step to ReactFlow node data
function switchStepToNodeData(step: SwitchStep) {
  return {
    label: step.name,
    description: step.description,
    expression: step.switch.expression,
    cases: step.switch.cases,
    default: step.switch.default,
  };
}

// Convert a loop step to ReactFlow node data
function loopStepToNodeData(step: LoopStep) {
  return {
    label: step.name,
    description: step.description,
    loopType: step.loop.type,
    collection: step.loop.collection,
    condition: step.loop.condition,
    count: step.loop.count,
    itemVariable: step.loop.itemVariable,
    indexVariable: step.loop.indexVariable,
    body: step.loop.body,
    maxIterations: step.loop.maxIterations,
  };
}

// Convert a gate step to ReactFlow node data
function gateStepToNodeData(step: GateStep) {
  return {
    label: step.name,
    description: step.description,
    gateType: step.gate.type,
    approvers: step.gate.approvers,
    signalName: step.gate.signalName,
    timeout: step.gate.timeout,
    timeoutAction: step.gate.timeoutAction,
  };
}

// Convert a delay step to ReactFlow node data
function delayStepToNodeData(step: DelayStep) {
  return {
    label: step.name,
    description: step.description,
    duration: step.delay.duration,
    unit: step.delay.unit,
  };
}

// Convert a parallel step to ReactFlow node data
function parallelStepToNodeData(step: ParallelStep) {
  return {
    label: step.name,
    description: step.description,
    branches: step.parallel.branches,
    waitFor: step.parallel.waitFor,
  };
}

// Convert a plugin step to ReactFlow node data
function pluginStepToNodeData(step: PluginStep) {
  return {
    label: step.name,
    description: step.description,
    pluginId: step.plugin.pluginId,
    function: step.plugin.function,
    inputs: step.plugin.inputs,
    outputs: step.plugin.outputs,
    timeout: step.plugin.timeout,
    memoryLimit: step.plugin.memoryLimit,
  };
}

// Convert a DSL step to ReactFlow node data
function stepToNodeData(step: Step): Record<string, unknown> {
  switch (step.type) {
    case "trigger":
      return triggerStepToNodeData(step);
    case "action":
      return actionStepToNodeData(step);
    case "condition":
      return conditionStepToNodeData(step);
    case "switch":
      return switchStepToNodeData(step);
    case "loop":
      return loopStepToNodeData(step);
    case "gate":
      return gateStepToNodeData(step);
    case "delay":
      return delayStepToNodeData(step);
    case "parallel":
      return parallelStepToNodeData(step);
    case "plugin":
      return pluginStepToNodeData(step);
    default:
      return { label: (step as Step).name };
  }
}

// Get edge style based on source node type and handle
function getEdgeStyle(
  sourceStep: Step | undefined,
  sourceHandle: string | undefined,
): { stroke: string; label?: string } {
  if (!sourceStep) {
    return { stroke: "#2563eb" };
  }

  if (sourceStep.type === "condition") {
    if (sourceHandle === "true") {
      return { stroke: "#22c55e", label: "True" };
    }
    if (sourceHandle === "false") {
      return { stroke: "#ef4444", label: "False" };
    }
  }

  if (sourceStep.type === "switch") {
    return { stroke: "#f59e0b" };
  }

  return { stroke: "#2563eb" };
}

/**
 * Convert a workflow definition to ReactFlow nodes and edges
 */
export function dslToReactFlow(definition: WorkflowDefinition): {
  nodes: Node[];
  edges: Edge[];
} {
  const stepMap = new Map<string, Step>();
  definition.steps.forEach((step) => stepMap.set(step.id, step));

  // Convert steps to nodes
  const nodes: Node[] = definition.steps.map((step) => ({
    id: step.id,
    type: stepTypeToNodeType[step.type] || "default",
    position: step.position,
    data: stepToNodeData(step),
  }));

  // Convert edges
  const edges: Edge[] = definition.edges.map((edge) => {
    const sourceStep = stepMap.get(edge.source);
    const style = getEdgeStyle(sourceStep, edge.sourceHandle);

    return {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      label: edge.label || style.label,
      style: { stroke: style.stroke },
      markerEnd: { type: MarkerType.ArrowClosed },
    };
  });

  return { nodes, edges };
}

/**
 * Parse a workflow definition from JSON
 */
export function parseWorkflowDefinition(
  json: string | Record<string, unknown>,
): WorkflowDefinition | null {
  try {
    const data = typeof json === "string" ? JSON.parse(json) : json;

    if (data.version !== "1.0") {
      console.warn("Unknown workflow definition version:", data.version);
    }

    return data as WorkflowDefinition;
  } catch (error) {
    console.error("Failed to parse workflow definition:", error);
    return null;
  }
}
