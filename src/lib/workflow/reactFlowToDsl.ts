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
  // Extended core nodes
  mergeNode: "merge",
  splitNode: "split",
  filterNode: "filter",
  setNode: "set",
  errorNode: "error",
  retryNode: "retry",
  timeoutNode: "timeout",
  emailNode: "email",
  webhookResponseNode: "webhookResponse",
  fileNode: "file",
  queueNode: "queue",
  embeddingNode: "embedding",
  vectorSearchNode: "vectorSearch",
  logNode: "log",
  assertNode: "assert",
  sleepNode: "sleep",
  // Data transformation nodes
  mapNode: "map",
  reduceNode: "reduce",
  sortNode: "sort",
  uniqueNode: "unique",
  templateNode: "template",
  // AI nodes
  promptNode: "prompt",
  chatNode: "chat",
  summarizeNode: "summarize",
  classifyNode: "classify",
  // Human-in-the-loop nodes
  approvalNode: "approval",
  inputNode: "input",
  notificationNode: "notification",
  // Data processing nodes
  parseNode: "parse",
  validateNode: "validate",
  formatNode: "format",
  hashNode: "hash",
  // Advanced - Array Operations
  groupNode: "group",
  flattenNode: "flatten",
  chunkNode: "chunk",
  zipNode: "zip",
  // Advanced - Security
  encryptNode: "encrypt",
  decryptNode: "decrypt",
  signNode: "sign",
  jwtNode: "jwt",
  // Advanced - AI Extensions
  agentNode: "agent",
  ragNode: "rag",
  visionNode: "vision",
  audioNode: "audio",
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

// Convert merge node data to DSL step
function mergeNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "merge",
    name: data.label || "Merge",
    description: data.description,
    position: node.position,
    merge: {
      mode: data.mode || "object",
      sources: data.sources || [],
      conflictStrategy: data.conflictStrategy || "last",
      outputVariable: data.outputVariable || "merged",
    },
  };
}

// Convert split node data to DSL step
function splitNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "split",
    name: data.label || "Split",
    description: data.description,
    position: node.position,
    split: {
      input: data.input || "",
      delimiter: data.delimiter || ",",
      outputVariable: data.outputVariable || "items",
    },
  };
}

// Convert filter node data to DSL step
function filterNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "filter",
    name: data.label || "Filter",
    description: data.description,
    position: node.position,
    filter: {
      input: data.input || "",
      condition: data.condition || "true",
      outputVariable: data.outputVariable || "filtered",
    },
  };
}

// Convert set node data to DSL step
function setNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "set",
    name: data.label || "Set Variable",
    description: data.description,
    position: node.position,
    set: {
      variables: data.variables || {},
    },
  };
}

// Convert error node data to DSL step
function errorNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "error",
    name: data.label || "Error",
    description: data.description,
    position: node.position,
    error: {
      message: data.message || "An error occurred",
      code: data.code,
      details: data.details,
    },
  };
}

// Convert retry node data to DSL step
function retryNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "retry",
    name: data.label || "Retry",
    description: data.description,
    position: node.position,
    retry: {
      maxAttempts: data.maxAttempts || 3,
      backoffType: data.backoffType || "exponential",
      initialDelay: data.initialDelay || 1000,
      maxDelay: data.maxDelay || 30000,
    },
  };
}

// Convert timeout node data to DSL step
function timeoutNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "timeout",
    name: data.label || "Timeout",
    description: data.description,
    position: node.position,
    timeout: {
      duration: data.duration || 30,
      unit: data.unit || "seconds",
      onTimeout: data.onTimeout || "fail",
    },
  };
}

// Convert email node data to DSL step
function emailNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "email",
    name: data.label || "Send Email",
    description: data.description,
    position: node.position,
    email: {
      to: data.to || "",
      subject: data.subject || "",
      body: data.body || "",
      from: data.from,
      cc: data.cc,
      bcc: data.bcc,
      attachments: data.attachments,
    },
  };
}

// Convert webhookResponse node data to DSL step
function webhookResponseNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "webhookResponse",
    name: data.label || "Webhook Response",
    description: data.description,
    position: node.position,
    webhookResponse: {
      statusCode: data.statusCode || 200,
      body: data.body,
      headers: data.headers || {},
    },
  };
}

// Convert file node data to DSL step
function fileNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "file",
    name: data.label || "File Operation",
    description: data.description,
    position: node.position,
    file: {
      operation: data.operation || "read",
      path: data.path || "",
      content: data.content,
      encoding: data.encoding || "utf-8",
      outputVariable: data.outputVariable || "fileContent",
    },
  };
}

// Convert queue node data to DSL step
function queueNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "queue",
    name: data.label || "Queue",
    description: data.description,
    position: node.position,
    queue: {
      operation: data.operation || "push",
      queueName: data.queueName || "",
      message: data.message,
      outputVariable: data.outputVariable || "queueResult",
    },
  };
}

// Convert embedding node data to DSL step
function embeddingNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "embedding",
    name: data.label || "Generate Embedding",
    description: data.description,
    position: node.position,
    embedding: {
      input: data.input || "",
      model: data.model || "text-embedding-3-small",
      outputVariable: data.outputVariable || "embedding",
    },
  };
}

// Convert vectorSearch node data to DSL step
function vectorSearchNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "vectorSearch",
    name: data.label || "Vector Search",
    description: data.description,
    position: node.position,
    vectorSearch: {
      query: data.query || "",
      collection: data.collection || "",
      limit: data.limit || 10,
      minScore: data.minScore,
      outputVariable: data.outputVariable || "searchResults",
    },
  };
}

// Convert log node data to DSL step
function logNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "log",
    name: data.label || "Log",
    description: data.description,
    position: node.position,
    log: {
      level: data.level || "info",
      message: data.message || "",
      data: data.data,
    },
  };
}

// Convert assert node data to DSL step
function assertNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "assert",
    name: data.label || "Assert",
    description: data.description,
    position: node.position,
    assert: {
      condition: data.condition || "true",
      message: data.message || "Assertion failed",
    },
  };
}

// Convert sleep node data to DSL step
function sleepNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "sleep",
    name: data.label || "Sleep",
    description: data.description,
    position: node.position,
    sleep: {
      duration: data.duration || 1,
      unit: data.unit || "seconds",
    },
  };
}

// Convert map node data to DSL step
function mapNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "map",
    name: data.label || "Map",
    description: data.description,
    position: node.position,
    map: {
      source: data.source || "",
      expression: data.expression || "",
      itemVariable: data.itemVariable || "item",
      outputVariable: data.outputVariable || "mapped",
    },
  };
}

// Convert reduce node data to DSL step
function reduceNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "reduce",
    name: data.label || "Reduce",
    description: data.description,
    position: node.position,
    reduce: {
      source: data.source || "",
      expression: data.expression || "",
      initialValue: data.initialValue,
      accumulatorVariable: data.accumulatorVariable || "acc",
      itemVariable: data.itemVariable || "item",
      outputVariable: data.outputVariable || "reduced",
    },
  };
}

// Convert sort node data to DSL step
function sortNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "sort",
    name: data.label || "Sort",
    description: data.description,
    position: node.position,
    sort: {
      source: data.source || "",
      key: data.key,
      direction: data.direction || "asc",
      outputVariable: data.outputVariable || "sorted",
    },
  };
}

// Convert unique node data to DSL step
function uniqueNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "unique",
    name: data.label || "Unique",
    description: data.description,
    position: node.position,
    unique: {
      source: data.source || "",
      key: data.key,
      outputVariable: data.outputVariable || "unique",
    },
  };
}

// Convert template node data to DSL step
function templateNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "template",
    name: data.label || "Template",
    description: data.description,
    position: node.position,
    template: {
      content: data.content || "",
      outputVariable: data.outputVariable || "rendered",
    },
  };
}

// Convert prompt node data to DSL step
function promptNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "prompt",
    name: data.label || "Prompt",
    description: data.description,
    position: node.position,
    prompt: {
      model: data.model || "",
      template: data.template || "",
      outputVariable: data.outputVariable || "response",
    },
  };
}

// Convert chat node data to DSL step
function chatNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "chat",
    name: data.label || "Chat",
    description: data.description,
    position: node.position,
    chat: {
      model: data.model || "",
      messages: data.messages || [],
      outputVariable: data.outputVariable || "response",
    },
  };
}

// Convert summarize node data to DSL step
function summarizeNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "summarize",
    name: data.label || "Summarize",
    description: data.description,
    position: node.position,
    summarize: {
      model: data.model || "",
      source: data.source || "",
      style: data.style || "brief",
      outputVariable: data.outputVariable || "summary",
    },
  };
}

// Convert classify node data to DSL step
function classifyNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "classify",
    name: data.label || "Classify",
    description: data.description,
    position: node.position,
    classify: {
      model: data.model || "",
      source: data.source || "",
      categories: data.categories || [],
      outputVariable: data.outputVariable || "classification",
    },
  };
}

// Convert approval node data to DSL step
function approvalNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "approval",
    name: data.label || "Approval",
    description: data.description,
    position: node.position,
    approval: {
      title: data.title || "",
      approvers: data.approvers || [],
      timeout: data.timeout,
    },
  };
}

// Convert input node data to DSL step
function inputNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "input",
    name: data.label || "Input",
    description: data.description,
    position: node.position,
    input: {
      title: data.title || "",
      fields: data.fields || [],
      timeout: data.timeout,
    },
  };
}

// Convert notification node data to DSL step
function notificationNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "notification",
    name: data.label || "Notification",
    description: data.description,
    position: node.position,
    notification: {
      channel: data.channel || "email",
      recipients: data.recipients || [],
      message: data.message || "",
    },
  };
}

// Convert parse node data to DSL step
function parseNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "parse",
    name: data.label || "Parse",
    description: data.description,
    position: node.position,
    parse: {
      format: data.format || "json",
      source: data.source || "",
      outputVariable: data.outputVariable || "parsed",
    },
  };
}

// Convert validate node data to DSL step
function validateNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "validate",
    name: data.label || "Validate",
    description: data.description,
    position: node.position,
    validate: {
      schema: data.schema || "",
      source: data.source || "",
    },
  };
}

// Convert format node data to DSL step
function formatNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "format",
    name: data.label || "Format",
    description: data.description,
    position: node.position,
    format: {
      type: data.type || "string",
      pattern: data.pattern,
      source: data.source || "",
      outputVariable: data.outputVariable || "formatted",
    },
  };
}

// Convert hash node data to DSL step
function hashNodeToStep(node: Node): Step {
  const data = node.data;
  return {
    id: node.id,
    type: "hash",
    name: data.label || "Hash",
    description: data.description,
    position: node.position,
    hash: {
      algorithm: data.algorithm || "sha256",
      encoding: data.encoding || "hex",
      source: data.source || "",
      outputVariable: data.outputVariable || "hashed",
    },
  };
}

// Convert group node data to DSL step
function groupNodeToStep(node: Node): Step {
  const data = node.data as Record<string, unknown>;
  return {
    id: node.id,
    type: "group",
    name: (data.label as string) || "Group",
    group: {
      source: (data.source as string) || "",
      keyExpression: (data.keyExpression as string) || "",
      itemVariable: (data.itemVariable as string) || "item",
      outputVariable: data.outputVariable as string | undefined,
    },
  };
}

// Convert flatten node data to DSL step
function flattenNodeToStep(node: Node): Step {
  const data = node.data as Record<string, unknown>;
  return {
    id: node.id,
    type: "flatten",
    name: (data.label as string) || "Flatten",
    flatten: {
      source: (data.source as string) || "",
      depth: (data.depth as number) || 1,
      outputVariable: data.outputVariable as string | undefined,
    },
  };
}

// Convert chunk node data to DSL step
function chunkNodeToStep(node: Node): Step {
  const data = node.data as Record<string, unknown>;
  return {
    id: node.id,
    type: "chunk",
    name: (data.label as string) || "Chunk",
    chunk: {
      source: (data.source as string) || "",
      size: (data.size as number) || 10,
      outputVariable: data.outputVariable as string | undefined,
    },
  };
}

// Convert zip node data to DSL step
function zipNodeToStep(node: Node): Step {
  const data = node.data as Record<string, unknown>;
  return {
    id: node.id,
    type: "zip",
    name: (data.label as string) || "Zip",
    zip: {
      sources: (data.sources as string[]) || [],
      outputVariable: data.outputVariable as string | undefined,
    },
  };
}

// Convert encrypt node data to DSL step
function encryptNodeToStep(node: Node): Step {
  const data = node.data as Record<string, unknown>;
  return {
    id: node.id,
    type: "encrypt",
    name: (data.label as string) || "Encrypt",
    encrypt: {
      input: (data.input as string) || "",
      key: (data.key as string) || "",
      algorithm: (data.algorithm as "AES-GCM" | "AES-CBC") || "AES-GCM",
      outputVariable: data.outputVariable as string | undefined,
    },
  };
}

// Convert decrypt node data to DSL step
function decryptNodeToStep(node: Node): Step {
  const data = node.data as Record<string, unknown>;
  return {
    id: node.id,
    type: "decrypt",
    name: (data.label as string) || "Decrypt",
    decrypt: {
      input: (data.input as string) || "",
      key: (data.key as string) || "",
      algorithm: (data.algorithm as "AES-GCM" | "AES-CBC") || "AES-GCM",
      outputVariable: data.outputVariable as string | undefined,
    },
  };
}

// Convert sign node data to DSL step
function signNodeToStep(node: Node): Step {
  const data = node.data as Record<string, unknown>;
  return {
    id: node.id,
    type: "sign",
    name: (data.label as string) || "Sign",
    sign: {
      input: (data.input as string) || "",
      key: (data.key as string) || "",
      algorithm:
        (data.algorithm as "SHA-256" | "SHA-384" | "SHA-512") || "SHA-256",
      encoding: (data.encoding as "hex" | "base64") || "hex",
      outputVariable: data.outputVariable as string | undefined,
    },
  };
}

// Convert jwt node data to DSL step
function jwtNodeToStep(node: Node): Step {
  const data = node.data as Record<string, unknown>;
  return {
    id: node.id,
    type: "jwt",
    name: (data.label as string) || "JWT",
    jwt: {
      operation: (data.operation as "create" | "verify" | "decode") || "create",
      input: (data.input as string) || "",
      secret: data.secret as string | undefined,
      algorithm: (data.algorithm as "HS256" | "HS384" | "HS512") || "HS256",
      expiresIn: data.expiresIn as number | undefined,
      outputVariable: data.outputVariable as string | undefined,
    },
  };
}

// Convert agent node data to DSL step
function agentNodeToStep(node: Node): Step {
  const data = node.data as Record<string, unknown>;
  return {
    id: node.id,
    type: "agent",
    name: (data.label as string) || "Agent",
    agent: {
      serverId: (data.serverId as string) || "",
      model: data.model as string | undefined,
      goal: (data.goal as string) || "",
      tools: data.tools as string[] | undefined,
      maxIterations: (data.maxIterations as number) || 10,
      outputVariable: data.outputVariable as string | undefined,
    },
  };
}

// Convert rag node data to DSL step
function ragNodeToStep(node: Node): Step {
  const data = node.data as Record<string, unknown>;
  return {
    id: node.id,
    type: "rag",
    name: (data.label as string) || "RAG",
    rag: {
      serverId: (data.serverId as string) || "",
      model: data.model as string | undefined,
      query: (data.query as string) || "",
      collection: (data.collection as string) || "",
      topK: (data.topK as number) || 5,
      promptTemplate: data.promptTemplate as string | undefined,
      outputVariable: data.outputVariable as string | undefined,
    },
  };
}

// Convert vision node data to DSL step
function visionNodeToStep(node: Node): Step {
  const data = node.data as Record<string, unknown>;
  return {
    id: node.id,
    type: "vision",
    name: (data.label as string) || "Vision",
    vision: {
      serverId: (data.serverId as string) || "",
      model: data.model as string | undefined,
      image: (data.image as string) || "",
      task:
        (data.task as "describe" | "ocr" | "detect" | "classify") || "describe",
      prompt: data.prompt as string | undefined,
      outputVariable: data.outputVariable as string | undefined,
    },
  };
}

// Convert audio node data to DSL step
function audioNodeToStep(node: Node): Step {
  const data = node.data as Record<string, unknown>;
  return {
    id: node.id,
    type: "audio",
    name: (data.label as string) || "Audio",
    audio: {
      serverId: (data.serverId as string) || "",
      model: data.model as string | undefined,
      task: (data.task as "transcribe" | "synthesize") || "transcribe",
      input: (data.input as string) || "",
      language: data.language as string | undefined,
      voice: data.voice as string | undefined,
      outputVariable: data.outputVariable as string | undefined,
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
    // Extended core nodes
    case "merge":
      return mergeNodeToStep(node);
    case "split":
      return splitNodeToStep(node);
    case "filter":
      return filterNodeToStep(node);
    case "set":
      return setNodeToStep(node);
    case "error":
      return errorNodeToStep(node);
    case "retry":
      return retryNodeToStep(node);
    case "timeout":
      return timeoutNodeToStep(node);
    case "email":
      return emailNodeToStep(node);
    case "webhookResponse":
      return webhookResponseNodeToStep(node);
    case "file":
      return fileNodeToStep(node);
    case "queue":
      return queueNodeToStep(node);
    case "embedding":
      return embeddingNodeToStep(node);
    case "vectorSearch":
      return vectorSearchNodeToStep(node);
    case "log":
      return logNodeToStep(node);
    case "assert":
      return assertNodeToStep(node);
    case "sleep":
      return sleepNodeToStep(node);
    // Data transformation nodes
    case "map":
      return mapNodeToStep(node);
    case "reduce":
      return reduceNodeToStep(node);
    case "sort":
      return sortNodeToStep(node);
    case "unique":
      return uniqueNodeToStep(node);
    case "template":
      return templateNodeToStep(node);
    // AI nodes
    case "prompt":
      return promptNodeToStep(node);
    case "chat":
      return chatNodeToStep(node);
    case "summarize":
      return summarizeNodeToStep(node);
    case "classify":
      return classifyNodeToStep(node);
    // Human-in-the-loop nodes
    case "approval":
      return approvalNodeToStep(node);
    case "input":
      return inputNodeToStep(node);
    case "notification":
      return notificationNodeToStep(node);
    // Data processing nodes
    case "parse":
      return parseNodeToStep(node);
    case "validate":
      return validateNodeToStep(node);
    case "format":
      return formatNodeToStep(node);
    case "hash":
      return hashNodeToStep(node);
    // Advanced - Array Operations
    case "group":
      return groupNodeToStep(node);
    case "flatten":
      return flattenNodeToStep(node);
    case "chunk":
      return chunkNodeToStep(node);
    case "zip":
      return zipNodeToStep(node);
    // Advanced - Security
    case "encrypt":
      return encryptNodeToStep(node);
    case "decrypt":
      return decryptNodeToStep(node);
    case "sign":
      return signNodeToStep(node);
    case "jwt":
      return jwtNodeToStep(node);
    // Advanced - AI Extensions
    case "agent":
      return agentNodeToStep(node);
    case "rag":
      return ragNodeToStep(node);
    case "vision":
      return visionNodeToStep(node);
    case "audio":
      return audioNodeToStep(node);
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
