import { Reply } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface WebhookResponseNodeData {
  label: string;
  description?: string;
  statusCode?: number;
  headers?: Record<string, string>;
  body?: string;
  contentType?: string;
  onNodeSelect?: (node: {
    id: string;
    data: WebhookResponseNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const WebhookResponseNode = memo(
  ({ data, id }: { data: WebhookResponseNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "webhookResponseNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="webhookResponse"
        icon={Reply}
        label={data.label || "Webhook Response"}
        description={data.description}
        badge={data.statusCode?.toString() || "200"}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow
          label="Status"
          value={data.statusCode?.toString() || "Not configured"}
        />
        <NodeInfoRow
          label="Content-Type"
          value={data.contentType || "Not configured"}
        />
      </BaseNode>
    );
  },
);

WebhookResponseNode.displayName = "WebhookResponseNode";
