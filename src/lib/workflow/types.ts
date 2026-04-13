/**
 * Vortex Workflow DSL Types (client-side mirror of vortex-api types)
 */

export const StepType = {
  TRIGGER: "trigger",
  ACTION: "action",
  CONDITION: "condition",
  SWITCH: "switch",
  LOOP: "loop",
  GATE: "gate",
  DELAY: "delay",
  PARALLEL: "parallel",
  PLUGIN: "plugin",
  // Extended core nodes
  MERGE: "merge",
  SPLIT: "split",
  FILTER: "filter",
  SET: "set",
  ERROR: "error",
  RETRY: "retry",
  TIMEOUT: "timeout",
  EMAIL: "email",
  WEBHOOK_RESPONSE: "webhookResponse",
  FILE: "file",
  QUEUE: "queue",
  EMBEDDING: "embedding",
  VECTOR_SEARCH: "vectorSearch",
  LOG: "log",
  ASSERT: "assert",
  SLEEP: "sleep",
  // Data transformation nodes
  MAP: "map",
  REDUCE: "reduce",
  SORT: "sort",
  UNIQUE: "unique",
  TEMPLATE: "template",
  // AI nodes
  PROMPT: "prompt",
  CHAT: "chat",
  SUMMARIZE: "summarize",
  CLASSIFY: "classify",
  // Human-in-the-loop nodes
  APPROVAL: "approval",
  INPUT: "input",
  NOTIFICATION: "notification",
  // Data processing nodes
  PARSE: "parse",
  VALIDATE: "validate",
  FORMAT: "format",
  HASH: "hash",
  // Advanced - Array Operations
  GROUP: "group",
  FLATTEN: "flatten",
  CHUNK: "chunk",
  ZIP: "zip",
  // Advanced - Security
  ENCRYPT: "encrypt",
  DECRYPT: "decrypt",
  SIGN: "sign",
  JWT: "jwt",
  // Advanced - AI Extensions
  AGENT: "agent",
  RAG: "rag",
  VISION: "vision",
  AUDIO: "audio",
  // Workflow composition
  SUBWORKFLOW: "subworkflow",
  // Flow control
  TRY_CATCH: "try_catch",
  RACE: "race",
  // Documentation
  COMMENT: "comment",
  // State management
  STATE_GET: "state_get",
  STATE_SET: "state_set",
  STATE_WAIT: "state_wait",
  // Workflow primitives
  STOP: "stop",
  NOOP: "noop",
  DEBOUNCE: "debounce",
  DIFF: "diff",
  CHANGE_DETECTOR: "change_detector",
  TIME_WINDOW: "time_window",
  AI_TRANSFORM: "ai_transform",
  AI_GUARDRAILS: "ai_guardrails",
  // Distributed transactions
  SAGA: "saga",
  // Cross-service event collection
  COLLECT: "collect",
} as const;

export type StepTypeValue = (typeof StepType)[keyof typeof StepType];

export const TriggerType = {
  WEBHOOK: "webhook",
  CRON: "cron",
  EVENT: "event",
  MANUAL: "manual",
  OMNI: "omni",
  POLLING: "polling",
  KAFKA: "kafka",
  SQS: "sqs",
  S3: "s3",
  CDC: "cdc",
  MQTT: "mqtt",
  WEBSOCKET: "websocket",
  REDIS: "redis",
  NATS: "nats",
  AMQP: "amqp",
  GRPC_STREAM: "grpc_stream",
} as const;

export type TriggerTypeValue = (typeof TriggerType)[keyof typeof TriggerType];

export interface OmniTriggerConfig {
  triggerType: "omni";
  omni: {
    source: string; // "runa", "chronicle", "*"
    eventType: string; // "user.created", "payment.*"
    filter?: string; // JSONPath condition
  };
}

export interface PollingTriggerConfig {
  triggerType: "polling";
  polling: {
    url: string;
    method: "GET" | "POST";
    headers?: Record<string, string>;
    body?: unknown;
    interval: string; // "30s", "5m", "1h"
    deduplication: "hash" | "field" | "none";
    deduplicationField?: string;
    credentials?: string; // Integration reference
  };
}

export interface KafkaTriggerConfig {
  triggerType: "kafka";
  kafka: {
    brokers: string[];
    topic: string;
    groupId: string;
    fromBeginning?: boolean;
  };
}

export interface SqsTriggerConfig {
  triggerType: "sqs";
  sqs: {
    queueUrl: string;
    region: string;
    credentials: string; // Integration reference
    batchSize?: number;
  };
}

export interface S3TriggerConfig {
  triggerType: "s3";
  s3: {
    bucket: string;
    prefix?: string;
    suffix?: string;
    events: ("s3:ObjectCreated:*" | "s3:ObjectRemoved:*")[];
    credentials: string; // Integration reference
  };
}

export interface CdcTriggerConfig {
  triggerType: "cdc";
  cdc: {
    connectionString: string; // Integration reference
    table: string;
    operations: ("INSERT" | "UPDATE" | "DELETE")[];
  };
}

export interface MqttTriggerConfig {
  triggerType: "mqtt";
  mqtt: {
    brokerUrl: string;
    topic: string;
    qos?: 0 | 1 | 2;
    username?: string;
    password?: string;
  };
}

export interface WebSocketTriggerConfig {
  triggerType: "websocket";
  websocket: {
    url: string;
    protocols?: string[];
    headers?: Record<string, string>;
  };
}

export interface RedisTriggerConfig {
  triggerType: "redis";
  redis: {
    url: string;
    channels: string[];
    pattern?: boolean;
  };
}

export interface NatsTriggerConfig {
  triggerType: "nats";
  nats: {
    servers: string;
    subject: string;
    queue?: string;
    token?: string;
  };
}

export interface AmqpTriggerConfig {
  triggerType: "amqp";
  amqp: {
    url: string;
    queue: string;
    exchange?: string;
    routingKey?: string;
    prefetch?: number;
    durable?: boolean;
  };
}

export interface GrpcStreamTriggerConfig {
  triggerType: "grpc_stream";
  grpcStream: {
    address: string;
    protoPath: string;
    service: string;
    method: string;
    tls?: boolean;
  };
}

export interface Position {
  x: number;
  y: number;
}

export interface ErrorHandler {
  action: "continue" | "stop" | "retry" | "goto";
  retryCount?: number;
  retryDelayMs?: number;
  retryBackoff?: "linear" | "exponential";
  gotoStepId?: string;
}

export interface StepBase {
  id: string;
  type: StepTypeValue;
  name: string;
  description?: string;
  position: Position;
  next?: string | string[];
  onError?: ErrorHandler;
}

export interface TriggerStep extends StepBase {
  type: "trigger";
  trigger: {
    type: TriggerTypeValue;
    config: Record<string, unknown>;
  };
}

export interface ActionStep extends StepBase {
  type: "action";
  action: {
    integrationId?: string;
    pluginId?: string;
    operation: string;
    inputs: Record<string, unknown>;
    outputs?: Record<string, string>;
  };
}

export interface ConditionStep extends StepBase {
  type: "condition";
  condition: {
    expression: string;
    trueBranch: string;
    falseBranch: string;
  };
}

export interface SwitchCase {
  value: string | number | boolean;
  label: string;
  next: string;
}

export interface SwitchStep extends StepBase {
  type: "switch";
  switch: {
    expression: string;
    cases: SwitchCase[];
    default?: string;
  };
}

export interface LoopStep extends StepBase {
  type: "loop";
  loop: {
    type: "forEach" | "while" | "times";
    collection?: string;
    condition?: string;
    count?: number;
    itemVariable?: string;
    indexVariable?: string;
    body: string[];
    maxIterations?: number;
  };
}

export interface GateStep extends StepBase {
  type: "gate";
  gate: {
    type: "approval" | "signal";
    approvers?: string[];
    signalName?: string;
    timeout?: string;
    timeoutAction?: "approve" | "reject" | "continue";
  };
}

export interface DelayStep extends StepBase {
  type: "delay";
  delay: {
    duration: number;
    unit: "seconds" | "minutes" | "hours" | "days";
  };
}

export interface ParallelStep extends StepBase {
  type: "parallel";
  parallel: {
    branches: string[][];
    waitFor: "all" | "any" | number;
  };
}

export interface PluginStep extends StepBase {
  type: "plugin";
  plugin: {
    pluginId: string;
    function: string;
    inputs: Record<string, unknown>;
    outputs?: Record<string, string>;
    timeout?: number;
    memoryLimit?: number;
  };
}

// Extended core step types
export interface MergeStep extends Omit<StepBase, "type"> {
  type: "merge";
  merge: {
    mode: "object" | "array";
    sources: string[];
    conflictStrategy: "first" | "last" | "error";
    outputVariable: string;
  };
}

export interface SplitStep extends Omit<StepBase, "type"> {
  type: "split";
  split: {
    input: string;
    delimiter: string;
    outputVariable: string;
  };
}

export interface FilterStep extends Omit<StepBase, "type"> {
  type: "filter";
  filter: {
    input: string;
    condition: string;
    outputVariable: string;
  };
}

export interface SetStep extends Omit<StepBase, "type"> {
  type: "set";
  set: {
    variables: Record<string, unknown>;
  };
}

export interface ErrorStep extends Omit<StepBase, "type"> {
  type: "error";
  error: {
    message: string;
    code?: string;
    details?: Record<string, unknown>;
  };
}

export interface RetryStep extends Omit<StepBase, "type"> {
  type: "retry";
  retry: {
    maxAttempts: number;
    backoffType: "fixed" | "linear" | "exponential";
    initialDelay: number;
    maxDelay: number;
  };
}

export interface TimeoutStep extends Omit<StepBase, "type"> {
  type: "timeout";
  timeout: {
    duration: number;
    unit: "seconds" | "minutes" | "hours";
    onTimeout: "fail" | "continue" | "fallback";
  };
}

export interface EmailStep extends Omit<StepBase, "type"> {
  type: "email";
  email: {
    to: string;
    subject: string;
    body: string;
    from?: string;
    cc?: string;
    bcc?: string;
    attachments?: Array<{ name: string; url: string }>;
  };
}

export interface WebhookResponseStep extends Omit<StepBase, "type"> {
  type: "webhookResponse";
  webhookResponse: {
    statusCode: number;
    body?: unknown;
    headers: Record<string, string>;
  };
}

export interface FileStep extends Omit<StepBase, "type"> {
  type: "file";
  file: {
    operation: "read" | "write" | "delete" | "copy" | "move";
    path: string;
    content?: string;
    encoding: string;
    outputVariable: string;
  };
}

export interface QueueStep extends Omit<StepBase, "type"> {
  type: "queue";
  queue: {
    operation: "push" | "pop" | "peek";
    queueName: string;
    message?: unknown;
    outputVariable: string;
  };
}

export interface EmbeddingStep extends Omit<StepBase, "type"> {
  type: "embedding";
  embedding: {
    input: string;
    model: string;
    outputVariable: string;
  };
}

export interface VectorSearchStep extends Omit<StepBase, "type"> {
  type: "vectorSearch";
  vectorSearch: {
    query: string;
    collection: string;
    limit: number;
    minScore?: number;
    outputVariable: string;
  };
}

export interface LogStep extends Omit<StepBase, "type"> {
  type: "log";
  log: {
    level: "debug" | "info" | "warn" | "error";
    message: string;
    data?: Record<string, unknown>;
  };
}

export interface AssertStep extends Omit<StepBase, "type"> {
  type: "assert";
  assert: {
    condition: string;
    message: string;
  };
}

export interface SleepStep extends Omit<StepBase, "type"> {
  type: "sleep";
  sleep: {
    duration: number;
    unit: "seconds" | "minutes" | "hours";
  };
}

// Data transformation step types
export interface MapStep extends Omit<StepBase, "type"> {
  type: "map";
  map: {
    source: string;
    expression: string;
    itemVariable: string;
    outputVariable: string;
  };
}

export interface ReduceStep extends Omit<StepBase, "type"> {
  type: "reduce";
  reduce: {
    source: string;
    expression: string;
    initialValue?: unknown;
    accumulatorVariable: string;
    itemVariable: string;
    outputVariable: string;
  };
}

export interface SortStep extends Omit<StepBase, "type"> {
  type: "sort";
  sort: {
    source: string;
    key?: string;
    direction: "asc" | "desc";
    outputVariable: string;
  };
}

export interface UniqueStep extends Omit<StepBase, "type"> {
  type: "unique";
  unique: {
    source: string;
    key?: string;
    outputVariable: string;
  };
}

export interface TemplateStep extends Omit<StepBase, "type"> {
  type: "template";
  template: {
    content: string;
    outputVariable: string;
  };
}

// AI step types
export interface PromptStep extends Omit<StepBase, "type"> {
  type: "prompt";
  prompt: {
    model: string;
    template: string;
    outputVariable: string;
  };
}

export interface ChatStep extends Omit<StepBase, "type"> {
  type: "chat";
  chat: {
    model: string;
    messages: Array<{ role: string; content: string }>;
    outputVariable: string;
  };
}

export interface SummarizeStep extends Omit<StepBase, "type"> {
  type: "summarize";
  summarize: {
    model: string;
    source: string;
    style: "brief" | "detailed" | "bullets";
    outputVariable: string;
  };
}

export interface ClassifyStep extends Omit<StepBase, "type"> {
  type: "classify";
  classify: {
    model: string;
    source: string;
    categories: string[];
    outputVariable: string;
  };
}

// Human-in-the-loop step types
export interface ApprovalStep extends Omit<StepBase, "type"> {
  type: "approval";
  approval: {
    title: string;
    approvers: string[];
    timeout?: number;
  };
}

export interface InputStep extends Omit<StepBase, "type"> {
  type: "input";
  input: {
    title: string;
    fields: Array<{ name: string; type: string; required?: boolean }>;
    timeout?: number;
  };
}

export interface NotificationStep extends Omit<StepBase, "type"> {
  type: "notification";
  notification: {
    channel: "email" | "slack" | "sms" | "webhook";
    recipients: string[];
    message: string;
  };
}

// Data processing step types
export interface ParseStep extends Omit<StepBase, "type"> {
  type: "parse";
  parse: {
    format: "json" | "yaml" | "xml" | "csv";
    source: string;
    outputVariable: string;
  };
}

export interface ValidateStep extends Omit<StepBase, "type"> {
  type: "validate";
  validate: {
    schema: string;
    source: string;
  };
}

export interface FormatStep extends Omit<StepBase, "type"> {
  type: "format";
  format: {
    type: "string" | "number" | "date" | "currency";
    pattern?: string;
    source: string;
    outputVariable: string;
  };
}

export interface HashStep extends Omit<StepBase, "type"> {
  type: "hash";
  hash: {
    algorithm: "md5" | "sha1" | "sha256" | "sha512";
    encoding: "hex" | "base64";
    source: string;
    outputVariable: string;
  };
}

// Advanced - Array Operations
export interface GroupStep extends Omit<StepBase, "type"> {
  type: "group";
  group: {
    source: string;
    keyExpression: string;
    itemVariable: string;
    outputVariable?: string;
  };
}

export interface FlattenStep extends Omit<StepBase, "type"> {
  type: "flatten";
  flatten: {
    source: string;
    depth: number;
    outputVariable?: string;
  };
}

export interface ChunkStep extends Omit<StepBase, "type"> {
  type: "chunk";
  chunk: {
    source: string;
    size: number;
    outputVariable?: string;
  };
}

export interface ZipStep extends Omit<StepBase, "type"> {
  type: "zip";
  zip: {
    sources: string[];
    outputVariable?: string;
  };
}

// Advanced - Security
export interface EncryptStep extends Omit<StepBase, "type"> {
  type: "encrypt";
  encrypt: {
    input: string;
    key: string;
    algorithm: "AES-GCM" | "AES-CBC";
    outputVariable?: string;
  };
}

export interface DecryptStep extends Omit<StepBase, "type"> {
  type: "decrypt";
  decrypt: {
    input: string;
    key: string;
    algorithm: "AES-GCM" | "AES-CBC";
    outputVariable?: string;
  };
}

export interface SignStep extends Omit<StepBase, "type"> {
  type: "sign";
  sign: {
    input: string;
    key: string;
    algorithm: "SHA-256" | "SHA-384" | "SHA-512";
    encoding: "hex" | "base64";
    outputVariable?: string;
  };
}

export interface JwtStep extends Omit<StepBase, "type"> {
  type: "jwt";
  jwt: {
    operation: "create" | "verify" | "decode";
    input: string;
    secret?: string;
    algorithm: "HS256" | "HS384" | "HS512";
    expiresIn?: number;
    outputVariable?: string;
  };
}

// Advanced - AI Extensions
export interface AgentStep extends Omit<StepBase, "type"> {
  type: "agent";
  agent: {
    serverId: string;
    model?: string;
    goal: string;
    tools?: string[];
    maxIterations: number;
    outputVariable?: string;
  };
}

export interface RagStep extends Omit<StepBase, "type"> {
  type: "rag";
  rag: {
    serverId: string;
    model?: string;
    query: string;
    collection: string;
    topK: number;
    promptTemplate?: string;
    outputVariable?: string;
  };
}

export interface VisionStep extends Omit<StepBase, "type"> {
  type: "vision";
  vision: {
    serverId: string;
    model?: string;
    image: string;
    task: "describe" | "ocr" | "detect" | "classify";
    prompt?: string;
    outputVariable?: string;
  };
}

export interface AudioStep extends Omit<StepBase, "type"> {
  type: "audio";
  audio: {
    serverId: string;
    model?: string;
    task: "transcribe" | "synthesize";
    input: string;
    language?: string;
    voice?: string;
    outputVariable?: string;
  };
}

// Workflow composition
export interface SubWorkflowStep extends Omit<StepBase, "type"> {
  type: "subworkflow";
  subworkflow: {
    workflowId: string;
    version?: string;
    input: Record<string, unknown>;
    waitForCompletion: boolean;
    timeout?: string;
    onError?: "fail" | "continue";
    outputVariable?: string;
  };
}

// Distributed transactions
export interface SagaStepAction {
  type: "http" | "emit" | "action";
  url?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: unknown;
  event?: string;
  data?: Record<string, unknown>;
  integrationId?: string;
  operation?: string;
  config?: Record<string, unknown>;
}

export interface SagaStepDefinition {
  name: string;
  execute: SagaStepAction;
  compensate: SagaStepAction;
  timeout?: string;
  retries?: number;
}

export interface SagaStep extends Omit<StepBase, "type"> {
  type: "saga";
  saga: {
    steps: SagaStepDefinition[];
    parallel?: boolean;
  };
}

// Flow control
export interface TryCatchStep extends Omit<StepBase, "type"> {
  type: "try_catch";
  tryCatch: {
    tryBranch: string[];
    catchBranch: string[];
    errorOutput: string;
    retries?: number;
    retryDelay?: string;
  };
}

export interface RaceStep extends Omit<StepBase, "type"> {
  type: "race";
  race: {
    branches: string[][];
    timeout?: string;
    output: string;
    winnerIndex: string;
  };
}

// Documentation
export interface CommentStep extends Omit<StepBase, "type"> {
  type: "comment";
  comment: {
    text: string;
    color?: string;
  };
}

// State management
export interface StateGetStep extends Omit<StepBase, "type"> {
  type: "state_get";
  stateGet: {
    key: string;
    outputVariable: string;
  };
}

export interface StateSetStep extends Omit<StepBase, "type"> {
  type: "state_set";
  stateSet: {
    key: string;
    value: unknown;
    ttl?: number;
  };
}

export interface StateWaitStep extends Omit<StepBase, "type"> {
  type: "state_wait";
  stateWait: {
    key: string;
    condition: "exists" | "equals" | "changed";
    value?: unknown;
    timeout: string;
    outputVariable?: string;
  };
}

// Workflow primitives
export interface StopStep extends Omit<StepBase, "type"> {
  type: "stop";
  stop: {
    status: "success" | "failure" | "cancelled";
    reason?: string;
    output?: unknown;
  };
}

export interface NoopStep extends Omit<StepBase, "type"> {
  type: "noop";
}

export interface DebounceStep extends Omit<StepBase, "type"> {
  type: "debounce";
  debounce: {
    key: string;
    windowMs: number;
    strategy: "first" | "last";
    outputVariable?: string;
  };
}

export interface DiffStep extends Omit<StepBase, "type"> {
  type: "diff";
  diff: {
    left: string;
    right: string;
    key?: string;
    outputVariable: string;
  };
}

export interface ChangeDetectorStep extends Omit<StepBase, "type"> {
  type: "change_detector";
  changeDetector: {
    key: string;
    value: string;
    strategy: "hash" | "deep_equal";
    outputVariable?: string;
  };
}

export interface TimeWindowStep extends Omit<StepBase, "type"> {
  type: "time_window";
  timeWindow: {
    startTime: string;
    endTime: string;
    timezone: string;
    daysOfWeek?: number[];
    onOutside: "skip" | "queue" | "fail";
  };
}

export interface AiTransformStep extends Omit<StepBase, "type"> {
  type: "ai_transform";
  aiTransform: {
    model: string;
    prompt: string;
    input: string;
    schema?: string;
    outputVariable: string;
  };
}

export interface AiGuardrailsStep extends Omit<StepBase, "type"> {
  type: "ai_guardrails";
  aiGuardrails: {
    input: string;
    rules: Array<{
      type:
        | "regex"
        | "contains"
        | "not_contains"
        | "max_length"
        | "json_schema";
      value: string;
    }>;
    onFail: "block" | "warn" | "sanitize";
    outputVariable?: string;
  };
}

export interface CollectEventMatcher {
  name: string;
  sourcePattern: string;
  typePattern: string;
}

export interface CollectStep extends Omit<StepBase, "type"> {
  type: "collect";
  collect: {
    events: CollectEventMatcher[];
    correlationKey: string;
    timeout: string;
    mode: "all" | "any" | "n_of_m";
    minRequired?: number;
  };
}

export type Step =
  | TriggerStep
  | ActionStep
  | ConditionStep
  | SwitchStep
  | LoopStep
  | GateStep
  | DelayStep
  | ParallelStep
  | PluginStep
  // Extended core steps
  | MergeStep
  | SplitStep
  | FilterStep
  | SetStep
  | ErrorStep
  | RetryStep
  | TimeoutStep
  | EmailStep
  | WebhookResponseStep
  | FileStep
  | QueueStep
  | EmbeddingStep
  | VectorSearchStep
  | LogStep
  | AssertStep
  | SleepStep
  // Data transformation steps
  | MapStep
  | ReduceStep
  | SortStep
  | UniqueStep
  | TemplateStep
  // AI steps
  | PromptStep
  | ChatStep
  | SummarizeStep
  | ClassifyStep
  // Human-in-the-loop steps
  | ApprovalStep
  | InputStep
  | NotificationStep
  // Data processing steps
  | ParseStep
  | ValidateStep
  | FormatStep
  | HashStep
  // Advanced - Array Operations
  | GroupStep
  | FlattenStep
  | ChunkStep
  | ZipStep
  // Advanced - Security
  | EncryptStep
  | DecryptStep
  | SignStep
  | JwtStep
  // Advanced - AI Extensions
  | AgentStep
  | RagStep
  | VisionStep
  | AudioStep
  // Workflow composition
  | SubWorkflowStep
  // Distributed transactions
  | SagaStep
  // Flow control
  | TryCatchStep
  | RaceStep
  // Documentation
  | CommentStep
  // State management
  | StateGetStep
  | StateSetStep
  | StateWaitStep
  // Workflow primitives
  | StopStep
  | NoopStep
  | DebounceStep
  | DiffStep
  | ChangeDetectorStep
  | TimeWindowStep
  | AiTransformStep
  | AiGuardrailsStep
  // Cross-service event collection
  | CollectStep;

export interface EdgeDefinition {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  label?: string;
}

export interface VariableDefinition {
  type: "string" | "number" | "boolean" | "object" | "array";
  default?: unknown;
  description?: string;
}

export interface WorkflowSettings {
  timeout?: string;
  retryPolicy?: {
    maxAttempts: number;
    backoffCoefficient: number;
    initialInterval: string;
    maxInterval: string;
  };
}

export interface WorkflowDefinition {
  version: "1.0";
  steps: Step[];
  edges: EdgeDefinition[];
  variables?: Record<string, VariableDefinition>;
  settings?: WorkflowSettings;
  /** Mapping from human-readable step names to step IDs for template resolution */
  stepNameToId?: Record<string, string>;
}
