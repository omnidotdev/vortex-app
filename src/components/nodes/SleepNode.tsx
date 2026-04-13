import { Moon } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

type TimeUnit = "ms" | "s" | "m" | "h";

interface SleepNodeData {
  label: string;
  description?: string;
  duration?: number;
  unit?: TimeUnit;
  onNodeSelect?: (node: {
    id: string;
    data: SleepNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

/** Format duration with unit for display. */
const formatDuration = (
  duration: number | undefined,
  unit: TimeUnit | undefined,
): string => {
  if (duration === undefined || duration === null) return "Not configured";
  const u = unit ?? "s";
  return `${duration}${u}`;
};

export const SleepNode = memo(
  ({ data, id }: { data: SleepNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "sleepNode" });
    };

    const formattedDuration = formatDuration(data.duration, data.unit);

    return (
      <BaseNode
        id={id}
        theme="sleep"
        icon={Moon}
        label={data.label || "Sleep"}
        description={data.description}
        badge={formattedDuration}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Duration" value={formattedDuration} />
      </BaseNode>
    );
  },
);

SleepNode.displayName = "SleepNode";
