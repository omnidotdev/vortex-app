import { BookOpen } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface RagNodeData {
  label: string;
  description?: string;
  indexSource?: string;
  topK?: number;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: RagNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const RagNode = memo(
  ({ data, id }: { data: RagNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "ragNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="rag"
        icon={BookOpen}
        label={data.label || "RAG"}
        description={data.description}
        badge="RAG"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow
          label="Index"
          value={data.indexSource || "Not configured"}
        />
        <NodeInfoRow
          label="Output"
          value={data.outputVariable || "Not configured"}
        />
      </BaseNode>
    );
  },
);

RagNode.displayName = "RagNode";
