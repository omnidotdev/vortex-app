import { ActionNodeConfig } from "./ActionNodeConfig";
import { CollectNodeConfig } from "./CollectNodeConfig";
import { CommentConfig } from "./CommentConfig";
import { ConditionNodeConfig } from "./ConditionNodeConfig";
import { DelayNodeConfig } from "./DelayNodeConfig";
import { GateNodeConfig } from "./GateNodeConfig";
import { LoopNodeConfig } from "./LoopNodeConfig";
import { MCPNodeConfig } from "./MCPNodeConfig";
import { ParallelNodeConfig } from "./ParallelNodeConfig";
import { PluginNodeConfig } from "./PluginNodeConfig";
import { RaceConfig } from "./RaceConfig";
import { SagaNodeConfig } from "./SagaNodeConfig";
import { StateGetNodeConfig } from "./StateGetNodeConfig";
import { StateSetNodeConfig } from "./StateSetNodeConfig";
import { StateWaitNodeConfig } from "./StateWaitNodeConfig";
import { SubWorkflowConfig } from "./SubWorkflowConfig";
import { SwitchNodeConfig } from "./SwitchNodeConfig";
import { TriggerNodeConfig } from "./TriggerNodeConfig";
import { TryCatchConfig } from "./TryCatchConfig";

import type { ComponentType } from "react";
import type { NodeConfigProps } from "./types";

export const nodeConfigRegistry: Record<
  string,
  ComponentType<NodeConfigProps>
> = {
  triggerNode: TriggerNodeConfig,
  actionNode: ActionNodeConfig,
  conditionNode: ConditionNodeConfig,
  switchNode: SwitchNodeConfig,
  loopNode: LoopNodeConfig,
  gateNode: GateNodeConfig,
  delayNode: DelayNodeConfig,
  parallelNode: ParallelNodeConfig,
  pluginNode: PluginNodeConfig,
  mcpNode: MCPNodeConfig,
  subworkflowNode: SubWorkflowConfig,
  tryCatchNode: TryCatchConfig,
  raceNode: RaceConfig,
  commentNode: CommentConfig,
  sagaNode: SagaNodeConfig,
  collectNode: CollectNodeConfig,
  stateGetNode: StateGetNodeConfig,
  stateSetNode: StateSetNodeConfig,
  stateWaitNode: StateWaitNodeConfig,
};
