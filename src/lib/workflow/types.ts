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
} as const;

export type StepTypeValue = (typeof StepType)[keyof typeof StepType];

export const TriggerType = {
  WEBHOOK: "webhook",
  CRON: "cron",
  EVENT: "event",
  MANUAL: "manual",
} as const;

export type TriggerTypeValue = (typeof TriggerType)[keyof typeof TriggerType];

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

export type Step =
  | TriggerStep
  | ActionStep
  | ConditionStep
  | SwitchStep
  | LoopStep
  | GateStep
  | DelayStep
  | ParallelStep
  | PluginStep;

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
