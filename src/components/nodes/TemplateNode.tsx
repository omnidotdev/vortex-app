import { FileCode2 } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface TemplateNodeData {
  label: string;
  description?: string;
  content?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: TemplateNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

/** Truncate content for display. */
const truncateContent = (content: string, maxLength = 25): string => {
  if (content.length <= maxLength) return content;
  return `${content.slice(0, maxLength)}...`;
};

export const TemplateNode = memo(
  ({ data, id }: { data: TemplateNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "templateNode" });
    };

    const content = data.content || "";

    return (
      <BaseNode
        id={id}
        theme="template"
        icon={FileCode2}
        label={data.label || "Template"}
        description={data.description}
        badge="Template"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow
          label="Content"
          value={content ? truncateContent(content) : "Not configured"}
        />
        <NodeInfoRow
          label="Output"
          value={data.outputVariable || "Not configured"}
        />
      </BaseNode>
    );
  },
);

TemplateNode.displayName = "TemplateNode";
