import { Split } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface SplitNodeData {
  label: string;
  description?: string;
  source?: string;
  batchSize?: number;
  itemVariable?: string;
  indexVariable?: string;
  maxItems?: number;
  onNodeSelect?: (node: {
    id: string;
    data: SplitNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const SplitNode = memo(
  ({ data, id }: { data: SplitNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "splitNode" });
    };

    const batchSize = data.batchSize || 1;

    return (
      <BaseNode
        id={id}
        theme="split"
        icon={Split}
        label={data.label || "Split"}
        description={data.description}
        badge={String(batchSize)}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Source" value={data.source || "Not configured"} />
        <NodeInfoRow label="Batch Size" value={batchSize} />
      </BaseNode>
    );
  },
);

SplitNode.displayName = "SplitNode";
