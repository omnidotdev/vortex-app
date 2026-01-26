import { Mail } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface EmailNodeData {
  label: string;
  description?: string;
  serverId?: string;
  to?: string[];
  cc?: string[];
  bcc?: string[];
  subject?: string;
  body?: string;
  contentType?: "text" | "html";
  attachments?: string[];
  onNodeSelect?: (node: {
    id: string;
    data: EmailNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const EmailNode = memo(
  ({ data, id }: { data: EmailNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "emailNode" });
    };

    const recipientCount = data.to?.length ?? 0;
    const truncatedSubject = data.subject
      ? data.subject.length > 25
        ? `${data.subject.slice(0, 25)}...`
        : data.subject
      : "Not configured";

    return (
      <BaseNode
        id={id}
        theme="email"
        icon={Mail}
        label={data.label || "Send Email"}
        description={data.description}
        badge={data.contentType || "text"}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Subject" value={truncatedSubject} />
        <NodeInfoRow
          label="To"
          value={
            recipientCount > 0
              ? `${recipientCount} recipient${recipientCount > 1 ? "s" : ""}`
              : "Not configured"
          }
        />
      </BaseNode>
    );
  },
);

EmailNode.displayName = "EmailNode";
