import { Tags } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface ClassifyNodeData {
  label: string;
  description?: string;
  model?: string;
  categories?: string[];
  source?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: ClassifyNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const ClassifyNode = memo(
  ({ data, id }: { data: ClassifyNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "classifyNode" });
    };

    const categoryCount = data.categories?.length || 0;

    return (
      <BaseNode
        id={id}
        theme="classify"
        icon={Tags}
        label={data.label || "Classify"}
        description={data.description}
        badge="AI"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Model" value={data.model || "Not configured"} />
        <NodeInfoRow
          label="Categories"
          value={categoryCount > 0 ? `${categoryCount} category(s)` : "None"}
        />
      </BaseNode>
    );
  },
);

ClassifyNode.displayName = "ClassifyNode";
