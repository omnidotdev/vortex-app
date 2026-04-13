import { FileText } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface SummarizeNodeData {
  label: string;
  description?: string;
  model?: string;
  style?: "brief" | "detailed" | "bullets";
  source?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: SummarizeNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const SummarizeNode = memo(
  ({ data, id }: { data: SummarizeNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "summarizeNode" });
    };

    const style = data.style || "brief";

    return (
      <BaseNode
        id={id}
        theme="summarize"
        icon={FileText}
        label={data.label || "Summarize"}
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
        <NodeInfoRow label="Style" value={style} />
      </BaseNode>
    );
  },
);

SummarizeNode.displayName = "SummarizeNode";
