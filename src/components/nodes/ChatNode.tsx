import { MessagesSquare } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface ChatNodeData {
  label: string;
  description?: string;
  model?: string;
  messages?: Array<{ role: string; content: string }>;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: ChatNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const ChatNode = memo(
  ({ data, id }: { data: ChatNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "chatNode" });
    };

    const messageCount = data.messages?.length || 0;

    return (
      <BaseNode
        id={id}
        theme="chat"
        icon={MessagesSquare}
        label={data.label || "Chat"}
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
          label="Messages"
          value={messageCount > 0 ? `${messageCount} message(s)` : "None"}
        />
      </BaseNode>
    );
  },
);

ChatNode.displayName = "ChatNode";
