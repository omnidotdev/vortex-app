export { ActionNode } from "./ActionNode";
export { ConditionNode } from "./ConditionNode";
export { DelayNode } from "./DelayNode";
export { GateNode } from "./GateNode";
export { LoopNode } from "./LoopNode";
export { ParallelNode } from "./ParallelNode";
export { PluginNode } from "./PluginNode";
export { SwitchNode } from "./SwitchNode";
export { TriggerNode } from "./TriggerNode";

// Node types map for ReactFlow
export const nodeTypes = {
  triggerNode: () => import("./TriggerNode").then((m) => m.TriggerNode),
  actionNode: () => import("./ActionNode").then((m) => m.ActionNode),
  conditionNode: () => import("./ConditionNode").then((m) => m.ConditionNode),
  switchNode: () => import("./SwitchNode").then((m) => m.SwitchNode),
  loopNode: () => import("./LoopNode").then((m) => m.LoopNode),
  gateNode: () => import("./GateNode").then((m) => m.GateNode),
  delayNode: () => import("./DelayNode").then((m) => m.DelayNode),
  parallelNode: () => import("./ParallelNode").then((m) => m.ParallelNode),
  pluginNode: () => import("./PluginNode").then((m) => m.PluginNode),
};

// Static node types for direct use
import { ActionNode } from "./ActionNode";
import { ConditionNode } from "./ConditionNode";
import { DelayNode } from "./DelayNode";
import { GateNode } from "./GateNode";
import { LoopNode } from "./LoopNode";
import { ParallelNode } from "./ParallelNode";
import { PluginNode } from "./PluginNode";
import { SwitchNode } from "./SwitchNode";
import { TriggerNode } from "./TriggerNode";

export const staticNodeTypes = {
  triggerNode: TriggerNode,
  actionNode: ActionNode,
  conditionNode: ConditionNode,
  switchNode: SwitchNode,
  loopNode: LoopNode,
  gateNode: GateNode,
  delayNode: DelayNode,
  parallelNode: ParallelNode,
  pluginNode: PluginNode,
};
