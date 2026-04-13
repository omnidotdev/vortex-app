import { Timer } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface StateWaitNodeData {
  label: string;
  description?: string;
  key?: string;
  condition?: string;
  expectedValue?: string;
  timeout?: string;
  onNodeSelect?: (node: {
    id: string;
    data: StateWaitNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const StateWaitNode = memo(
  ({ data, id }: { data: StateWaitNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "stateWaitNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="state"
        icon={Timer}
        label={data.label || "State Wait"}
        description={data.description}
        badge="State Wait"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Key" value={data.key || "Not set"} />
        <NodeInfoRow label="Condition" value={data.condition || "exists"} />
        <NodeInfoRow label="Timeout" value={data.timeout || "5m"} />
      </BaseNode>
    );
  },
);

StateWaitNode.displayName = "StateWaitNode";
