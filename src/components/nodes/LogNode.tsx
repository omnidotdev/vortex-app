import { FileText } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogNodeData {
  label: string;
  description?: string;
  level?: LogLevel;
  message?: string;
  data?: Record<string, unknown>;
  tags?: string[];
  onNodeSelect?: (node: {
    id: string;
    data: LogNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

/** Truncate message for display. */
const truncateMessage = (message: string | undefined, maxLen = 30): string => {
  if (!message) return "No message";
  if (message.length <= maxLen) return message;
  return `${message.slice(0, maxLen)}...`;
};

/** Format log level for badge display. */
const formatLevel = (level: LogLevel | undefined): string => {
  if (!level) return "info";
  return level.charAt(0).toUpperCase() + level.slice(1);
};

export const LogNode = memo(
  ({ data, id }: { data: LogNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "logNode" });
    };

    const level = data.level ?? "info";

    return (
      <BaseNode
        id={id}
        theme="log"
        icon={FileText}
        label={data.label || "Log"}
        description={data.description}
        badge={formatLevel(level)}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Level" value={formatLevel(level)} />
        <NodeInfoRow label="Message" value={truncateMessage(data.message)} />
      </BaseNode>
    );
  },
);

LogNode.displayName = "LogNode";
