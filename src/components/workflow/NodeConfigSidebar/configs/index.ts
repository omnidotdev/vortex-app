import { ActionNodeConfig } from "./ActionNodeConfig";
import { ConditionNodeConfig } from "./ConditionNodeConfig";
import { DelayNodeConfig } from "./DelayNodeConfig";
import { GateNodeConfig } from "./GateNodeConfig";
import { LoopNodeConfig } from "./LoopNodeConfig";
import { MCPNodeConfig } from "./MCPNodeConfig";
import { ParallelNodeConfig } from "./ParallelNodeConfig";
import { PluginNodeConfig } from "./PluginNodeConfig";
import { SwitchNodeConfig } from "./SwitchNodeConfig";
import { TriggerNodeConfig } from "./TriggerNodeConfig";

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
};

export type { NodeConfigProps } from "./types";
