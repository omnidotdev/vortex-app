import { MessageSquare } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface PromptNodeData {
  label: string;
  description?: string;
  model?: string;
  template?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: PromptNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

/** Truncate template for display. */
const truncateTemplate = (template: string, maxLength = 25): string => {
  if (template.length <= maxLength) return template;
  return `${template.slice(0, maxLength)}...`;
};

export const PromptNode = memo(
  ({ data, id }: { data: PromptNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "promptNode" });
    };

    const template = data.template || "";

    return (
      <BaseNode
        id={id}
        theme="prompt"
        icon={MessageSquare}
        label={data.label || "Prompt"}
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
          label="Template"
          value={template ? truncateTemplate(template) : "Not configured"}
        />
      </BaseNode>
    );
  },
);

PromptNode.displayName = "PromptNode";
