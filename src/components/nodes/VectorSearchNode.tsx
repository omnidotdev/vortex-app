import { Search } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface VectorSearchNodeData {
  label: string;
  description?: string;
  provider?: string;
  providerConfig?: Record<string, unknown>;
  indexName?: string;
  queryVector?: string;
  topK?: number;
  minScore?: number;
  filter?: Record<string, unknown>;
  includeVectors?: boolean;
  includeMetadata?: boolean;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: VectorSearchNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const VectorSearchNode = memo(
  ({ data, id }: { data: VectorSearchNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "vectorSearchNode" });
    };

    const topK = data.topK ?? 10;

    return (
      <BaseNode
        id={id}
        theme="vectorSearch"
        icon={Search}
        label={data.label || "Vector Search"}
        description={data.description}
        badge={`Top ${topK}`}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow
          label="Index"
          value={data.indexName || "Not configured"}
        />
        <NodeInfoRow label="Top K" value={topK} />
      </BaseNode>
    );
  },
);

VectorSearchNode.displayName = "VectorSearchNode";
