import { Timer } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface TimeoutNodeData {
  label: string;
  description?: string;
  stepId?: string;
  durationMs?: number;
  onTimeout?: "error" | "skip" | "fallback";
  fallbackStepId?: string;
  fallbackValue?: unknown;
  onNodeSelect?: (node: {
    id: string;
    data: TimeoutNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

/**
 * Format duration in milliseconds to a human-readable string.
 * @param ms - Duration in milliseconds.
 * @returns Formatted duration string (e.g., "30s", "1m 30s", "1h 5m").
 */
const formatDuration = (ms: number): string => {
  if (ms < 1000) {
    return `${ms}ms`;
  }

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  }

  if (minutes > 0) {
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0
      ? `${minutes}m ${remainingSeconds}s`
      : `${minutes}m`;
  }

  return `${seconds}s`;
};

export const TimeoutNode = memo(
  ({ data, id }: { data: TimeoutNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "timeoutNode" });
    };

    // Format duration for badge.
    const durationBadge = data.durationMs
      ? formatDuration(data.durationMs)
      : "Timeout";

    // Format onTimeout action for display.
    const onTimeoutDisplay = data.onTimeout
      ? data.onTimeout.charAt(0).toUpperCase() + data.onTimeout.slice(1)
      : "Not configured";

    return (
      <BaseNode
        id={id}
        theme="timeout"
        icon={Timer}
        label={data.label || "Timeout"}
        description={data.description}
        badge={durationBadge}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow
          label="Duration"
          value={data.durationMs ? formatDuration(data.durationMs) : "Not configured"}
        />
        <NodeInfoRow label="On Timeout" value={onTimeoutDisplay} />
      </BaseNode>
    );
  },
);

TimeoutNode.displayName = "TimeoutNode";
