import { Group } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface GroupNodeData {
  label: string;
  description?: string;
  keyExpression?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: GroupNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const GroupNode = memo(
  ({ data, id }: { data: GroupNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "groupNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="group"
        icon={Group}
        label={data.label || "Group"}
        description={data.description}
        badge="Group"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Key" value={data.keyExpression || "Not configured"} />
        <NodeInfoRow
          label="Output"
          value={data.outputVariable || "Not configured"}
        />
      </BaseNode>
    );
  },
);

GroupNode.displayName = "GroupNode";
