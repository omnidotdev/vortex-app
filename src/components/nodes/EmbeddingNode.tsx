import { Binary } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface EmbeddingNodeData {
  label: string;
  description?: string;
  serverId?: string;
  model?: string;
  input?: string;
  dimensions?: number;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: EmbeddingNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

/** Truncate model name for badge display. */
const truncateModel = (model: string | undefined, maxLen = 12): string => {
  if (!model) return "Embedding";
  if (model.length <= maxLen) return model;
  return `${model.slice(0, maxLen)}...`;
};

export const EmbeddingNode = memo(
  ({ data, id }: { data: EmbeddingNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "embeddingNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="embedding"
        icon={Binary}
        label={data.label || "Generate Embedding"}
        description={data.description}
        badge={truncateModel(data.model)}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Model" value={data.model || "Not configured"} />
        {data.dimensions && (
          <NodeInfoRow label="Dimensions" value={data.dimensions} />
        )}
      </BaseNode>
    );
  },
);

EmbeddingNode.displayName = "EmbeddingNode";
