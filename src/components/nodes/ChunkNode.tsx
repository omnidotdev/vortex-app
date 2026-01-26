import { LayoutGrid } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface ChunkNodeData {
  label: string;
  description?: string;
  chunkSize?: number;
  sourceArray?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: ChunkNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const ChunkNode = memo(
  ({ data, id }: { data: ChunkNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "chunkNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="chunk"
        icon={LayoutGrid}
        label={data.label || "Chunk"}
        description={data.description}
        badge="Chunk"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow
          label="Size"
          value={data.chunkSize !== undefined ? String(data.chunkSize) : "Not configured"}
        />
        <NodeInfoRow
          label="Output"
          value={data.outputVariable || "Not configured"}
        />
      </BaseNode>
    );
  },
);

ChunkNode.displayName = "ChunkNode";
