import { Layers } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface FlattenNodeData {
  label: string;
  description?: string;
  depth?: number;
  sourceArray?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: FlattenNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const FlattenNode = memo(
  ({ data, id }: { data: FlattenNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "flattenNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="flatten"
        icon={Layers}
        label={data.label || "Flatten"}
        description={data.description}
        badge="Flatten"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow
          label="Depth"
          value={data.depth !== undefined ? String(data.depth) : "Infinity"}
        />
        <NodeInfoRow
          label="Output"
          value={data.outputVariable || "Not configured"}
        />
      </BaseNode>
    );
  },
);

FlattenNode.displayName = "FlattenNode";
