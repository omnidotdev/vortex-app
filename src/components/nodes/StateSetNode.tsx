import { Upload } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface StateSetNodeData {
  label: string;
  description?: string;
  key?: string;
  value?: string;
  ttl?: number;
  onNodeSelect?: (node: {
    id: string;
    data: StateSetNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const StateSetNode = memo(
  ({ data, id }: { data: StateSetNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "stateSetNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="state"
        icon={Upload}
        label={data.label || "State Set"}
        description={data.description}
        badge="State Set"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Key" value={data.key || "Not set"} />
        {data.ttl && <NodeInfoRow label="TTL" value={`${data.ttl}s`} />}
      </BaseNode>
    );
  },
);

StateSetNode.displayName = "StateSetNode";
