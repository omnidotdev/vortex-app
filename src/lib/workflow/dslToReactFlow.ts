/**
 * Convert Vortex Workflow DSL to ReactFlow nodes and edges
 */

import dagre from "dagre";

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

// Map DSL step types to ReactFlow node types (inverse of nodeTypeToStepType)
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
  // Additional types from nodeTypeMap in workflow route
  mcp: "mcpNode",
  llm: "llmNode",
  code: "codeNode",
  database: "databaseNode",
  subworkflow: "subworkflowNode",
  wait: "waitNode",
  event: "eventNode",
  aggregate: "aggregateNode",
  cache: "cacheNode",
  collect: "collectNode",
  comment: "commentNode",
  // Extended core nodes
  merge: "mergeNode",
  split: "splitNode",
  filter: "filterNode",
  set: "setNode",
  error: "errorNode",
  retry: "retryNode",
  timeout: "timeoutNode",
  email: "emailNode",
  webhookResponse: "webhookResponseNode",
  file: "fileNode",
  queue: "queueNode",
  embedding: "embeddingNode",
  vectorSearch: "vectorSearchNode",
  log: "logNode",
  assert: "assertNode",
  sleep: "sleepNode",
  // Data transformation nodes
  map: "mapNode",
  reduce: "reduceNode",
  sort: "sortNode",
  unique: "uniqueNode",
  template: "templateNode",
  // AI nodes
  prompt: "promptNode",
  chat: "chatNode",
  summarize: "summarizeNode",
  classify: "classifyNode",
  // Human-in-the-loop nodes
  approval: "approvalNode",
  input: "inputNode",
  notification: "notificationNode",
  // Data processing nodes
  parse: "parseNode",
  validate: "validateNode",
  format: "formatNode",
  hash: "hashNode",
  // Advanced - Array Operations
  group: "groupNode",
  flatten: "flattenNode",
  chunk: "chunkNode",
  zip: "zipNode",
  // Advanced - Security
  encrypt: "encryptNode",
  decrypt: "decryptNode",
  sign: "signNode",
  jwt: "jwtNode",
  // Advanced - AI Extensions
  agent: "agentNode",
  rag: "ragNode",
  vision: "visionNode",
  audio: "audioNode",
  // Distributed transactions
  saga: "sagaNode",
  // State management nodes
  state_get: "stateGetNode",
  state_set: "stateSetNode",
  state_wait: "stateWaitNode",
};

// Layout constants for dagre auto-layout
const NODE_WIDTH = 250;
const NODE_HEIGHT = 80;
const NODE_SEP = 50;
const RANK_SEP = 80;

// Convert trigger step to node data
function triggerStepToNodeData(step: TriggerStep): Record<string, unknown> {
  return {
    label: step.name,
    description: step.description,
    triggerType: step.trigger.type,
    config: step.trigger.config,
  };
}

// Convert action step to node data
function actionStepToNodeData(step: ActionStep): Record<string, unknown> {
  return {
    label: step.name,
    description: step.description,
    integrationId: step.action.integrationId,
    integrationDefinitionId: step.action.integrationId,
    pluginId: step.action.pluginId,
    operation: step.action.operation,
    inputs: step.action.inputs,
    outputs: step.action.outputs,
  };
}

// Convert condition step to node data
function conditionStepToNodeData(step: ConditionStep): Record<string, unknown> {
  return {
    label: step.name,
    description: step.description,
    expression: step.condition.expression,
  };
}

// Convert switch step to node data
function switchStepToNodeData(step: SwitchStep): Record<string, unknown> {
  // Strip the `next` field from cases since edges handle routing
  const cases = step.switch.cases.map((c) => ({
    value: c.value,
    label: c.label,
  }));

  return {
    label: step.name,
    description: step.description,
    expression: step.switch.expression,
    cases,
  };
}

// Convert loop step to node data
function loopStepToNodeData(step: LoopStep): Record<string, unknown> {
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

// Convert gate step to node data
function gateStepToNodeData(step: GateStep): Record<string, unknown> {
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

// Convert delay step to node data
function delayStepToNodeData(step: DelayStep): Record<string, unknown> {
  return {
    label: step.name,
    description: step.description,
    duration: step.delay.duration,
    unit: step.delay.unit,
  };
}

// Convert parallel step to node data
function parallelStepToNodeData(step: ParallelStep): Record<string, unknown> {
  return {
    label: step.name,
    description: step.description,
    branches: step.parallel.branches,
    waitFor: step.parallel.waitFor,
  };
}

// Convert plugin step to node data
function pluginStepToNodeData(step: PluginStep): Record<string, unknown> {
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

// Convert state_get step to node data
function stateGetStepToNodeData(step: Step): Record<string, unknown> {
  const s = step as unknown as { stateGet: Record<string, unknown> };
  return {
    label: step.name,
    description: step.description,
    ...s.stateGet,
  };
}

// Convert state_set step to node data
function stateSetStepToNodeData(step: Step): Record<string, unknown> {
  const s = step as unknown as { stateSet: Record<string, unknown> };
  return {
    label: step.name,
    description: step.description,
    ...s.stateSet,
  };
}

// Convert state_wait step to node data
function stateWaitStepToNodeData(step: Step): Record<string, unknown> {
  const s = step as unknown as { stateWait: Record<string, unknown> };
  return {
    label: step.name,
    description: step.description,
    ...s.stateWait,
  };
}

// Convert extended step types by spreading the nested type-specific object into data
function extendedStepToNodeData(step: Step): Record<string, unknown> {
  const data: Record<string, unknown> = {
    label: step.name,
    description: step.description,
  };

  // Find the nested type-specific object (e.g., step.merge, step.email)
  const typeProps = (step as unknown as Record<string, unknown>)[step.type];
  if (typeProps && typeof typeProps === "object") {
    Object.assign(data, typeProps);
  }

  return data;
}

// Convert a DSL step to a ReactFlow node
function stepToNode(step: Step): Node {
  const nodeType = stepTypeToNodeType[step.type] || `${step.type}Node`;

  let data: Record<string, unknown>;

  switch (step.type) {
    case "trigger":
      data = triggerStepToNodeData(step);
      break;
    case "action":
      data = actionStepToNodeData(step);
      break;
    case "condition":
      data = conditionStepToNodeData(step);
      break;
    case "switch":
      data = switchStepToNodeData(step);
      break;
    case "loop":
      data = loopStepToNodeData(step);
      break;
    case "gate":
      data = gateStepToNodeData(step);
      break;
    case "delay":
      data = delayStepToNodeData(step);
      break;
    case "parallel":
      data = parallelStepToNodeData(step);
      break;
    case "plugin":
      data = pluginStepToNodeData(step);
      break;
    case "state_get":
      data = stateGetStepToNodeData(step);
      break;
    case "state_set":
      data = stateSetStepToNodeData(step);
      break;
    case "state_wait":
      data = stateWaitStepToNodeData(step);
      break;
    default:
      // Handle all extended types generically
      data = extendedStepToNodeData(step);
      break;
  }

  return {
    id: step.id,
    type: nodeType,
    position: step.position,
    data,
  };
}

// Synthesize edges from condition step branch targets
function synthesizeConditionEdges(step: ConditionStep): Edge[] {
  const edges: Edge[] = [];

  if (step.condition.trueBranch) {
    edges.push({
      id: `${step.id}-true-${step.condition.trueBranch}`,
      source: step.id,
      target: step.condition.trueBranch,
      sourceHandle: "true",
    });
  }

  if (step.condition.falseBranch) {
    edges.push({
      id: `${step.id}-false-${step.condition.falseBranch}`,
      source: step.id,
      target: step.condition.falseBranch,
      sourceHandle: "false",
    });
  }

  return edges;
}

// Synthesize edges from switch step case and default targets
function synthesizeSwitchEdges(step: SwitchStep): Edge[] {
  const edges: Edge[] = [];

  for (let i = 0; i < step.switch.cases.length; i++) {
    const switchCase = step.switch.cases[i];
    if (switchCase.next) {
      edges.push({
        id: `${step.id}-case_${i}-${switchCase.next}`,
        source: step.id,
        target: switchCase.next,
        sourceHandle: `case_${i}`,
      });
    }
  }

  if (step.switch.default) {
    edges.push({
      id: `${step.id}-default-${step.switch.default}`,
      source: step.id,
      target: step.switch.default,
      sourceHandle: "default",
    });
  }

  return edges;
}

// Synthesize branch edges from condition and switch steps
function synthesizeBranchEdges(steps: Step[]): Edge[] {
  const edges: Edge[] = [];

  for (const step of steps) {
    if (step.type === "condition") {
      edges.push(...synthesizeConditionEdges(step));
    } else if (step.type === "switch") {
      edges.push(...synthesizeSwitchEdges(step));
    }
  }

  return edges;
}

// Convert a DSL edge definition to a ReactFlow edge
function dslEdgeToReactFlowEdge(edge: EdgeDefinition): Edge {
  return {
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.sourceHandle || null,
    label: edge.label,
  };
}

// Build a dedup key for an edge based on source, target, and sourceHandle
function edgeKey(edge: Edge): string {
  return `${edge.source}::${edge.target}::${edge.sourceHandle ?? ""}`;
}

// Merge synthesized branch edges with DSL edges, deduplicating on source+target+sourceHandle
function deduplicateEdges(dslEdges: Edge[], synthesizedEdges: Edge[]): Edge[] {
  const seen = new Set<string>();
  const result: Edge[] = [];

  // DSL edges take precedence
  for (const edge of dslEdges) {
    const key = edgeKey(edge);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(edge);
    }
  }

  // Add synthesized edges that are not already present
  for (const edge of synthesizedEdges) {
    const key = edgeKey(edge);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(edge);
    }
  }

  return result;
}

// Detect if all positions have y=0 (SDK-generated synthetic layout)
function hasSyntheticPositions(steps: Step[]): boolean {
  if (steps.length === 0) return false;
  return steps.every((step) => step.position.y === 0);
}

// Apply dagre auto-layout to nodes and edges
function applyDagreLayout(nodes: Node[], edges: Edge[]): Node[] {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: "TB",
    nodesep: NODE_SEP,
    ranksep: RANK_SEP,
  });

  for (const node of nodes) {
    g.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  }

  for (const edge of edges) {
    g.setEdge(edge.source, edge.target);
  }

  dagre.layout(g);

  return nodes.map((node) => {
    const dagreNode = g.node(node.id);
    // Center the node on the dagre position
    return {
      ...node,
      position: {
        x: dagreNode.x - NODE_WIDTH / 2,
        y: dagreNode.y - NODE_HEIGHT / 2,
      },
    };
  });
}

/**
 * Check whether a workflow definition is in DSL format (steps + edges)
 * rather than ReactFlow format (nodes + edges with node types)
 */
export function isDslFormat(definition: Record<string, unknown>): boolean {
  // DSL format has `steps` array; ReactFlow format has `nodes` array
  return Array.isArray(definition.steps) && !Array.isArray(definition.nodes);
}

/**
 * Convert a WorkflowDefinition (DSL steps + edges) to ReactFlow nodes and edges
 */
function dslToReactFlow(definition: WorkflowDefinition): {
  nodes: Node[];
  edges: Edge[];
} {
  // Build idToStepName map from the inverse of stepNameToId
  const idToStepName: Record<string, string> = {};
  if (definition.stepNameToId) {
    for (const [name, id] of Object.entries(definition.stepNameToId)) {
      idToStepName[id] = name;
    }
  }

  // Convert steps to nodes
  let nodes: Node[] = definition.steps.map((step) => {
    const node = stepToNode(step);

    // Assign stepName from the inverse mapping if available
    if (idToStepName[step.id]) {
      node.data.stepName = idToStepName[step.id];
    }

    return node;
  });

  // Convert DSL edges to ReactFlow edges
  const reactFlowEdges = definition.edges.map(dslEdgeToReactFlowEdge);

  // Synthesize branch edges from condition and switch steps
  const branchEdges = synthesizeBranchEdges(definition.steps);

  // Merge and deduplicate
  const edges = deduplicateEdges(reactFlowEdges, branchEdges);

  // Detect synthetic positions and apply auto-layout if needed
  if (hasSyntheticPositions(definition.steps)) {
    nodes = applyDagreLayout(nodes, edges);
  }

  return { nodes, edges };
}

export default dslToReactFlow;
