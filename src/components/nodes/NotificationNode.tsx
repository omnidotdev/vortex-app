import { Bell } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface NotificationNodeData {
  label: string;
  description?: string;
  channel?: "email" | "slack" | "sms" | "webhook";
  recipients?: string[];
  message?: string;
  onNodeSelect?: (node: {
    id: string;
    data: NotificationNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const NotificationNode = memo(
  ({ data, id }: { data: NotificationNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "notificationNode" });
    };

    const channel = data.channel || "email";
    const recipientCount = data.recipients?.length || 0;

    return (
      <BaseNode
        id={id}
        theme="notification"
        icon={Bell}
        label={data.label || "Notification"}
        description={data.description}
        badge={channel}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Channel" value={channel} />
        <NodeInfoRow
          label="Recipients"
          value={recipientCount > 0 ? `${recipientCount} recipient(s)` : "None"}
        />
      </BaseNode>
    );
  },
);

NotificationNode.displayName = "NotificationNode";
