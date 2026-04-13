import { ArrowUpDown } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface SortNodeData {
  label: string;
  description?: string;
  source?: string;
  key?: string;
  direction?: "asc" | "desc";
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: SortNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const SortNode = memo(
  ({ data, id }: { data: SortNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "sortNode" });
    };

    const direction = data.direction || "asc";

    return (
      <BaseNode
        id={id}
        theme="sort"
        icon={ArrowUpDown}
        label={data.label || "Sort"}
        description={data.description}
        badge={direction === "asc" ? "Ascending" : "Descending"}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Key" value={data.key || "Not configured"} />
        <NodeInfoRow
          label="Direction"
          value={direction === "asc" ? "Ascending" : "Descending"}
        />
      </BaseNode>
    );
  },
);

SortNode.displayName = "SortNode";
