import { Download } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface StateGetNodeData {
  label: string;
  description?: string;
  key?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: StateGetNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const StateGetNode = memo(
  ({ data, id }: { data: StateGetNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "stateGetNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="state"
        icon={Download}
        label={data.label || "State Get"}
        description={data.description}
        badge="State Get"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Key" value={data.key || "Not set"} />
        <NodeInfoRow label="Output" value={data.outputVariable || "Not set"} />
      </BaseNode>
    );
  },
);

StateGetNode.displayName = "StateGetNode";
