"use client";

import { Clock } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface DelayNodeData {
  label: string;
  description?: string;
  duration?: number;
  unit?: "seconds" | "minutes" | "hours" | "days";
  onNodeSelect?: (node: {
    id: string;
    data: DelayNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const DelayNode = memo(
  ({ data, id }: { data: DelayNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "delayNode" });
    };

    const getDelayDisplay = () => {
      if (!data.duration) return "Not configured";
      const unit = data.unit || "minutes";
      return `${data.duration} ${unit}`;
    };

    return (
      <BaseNode
        id={id}
        theme="delay"
        icon={Clock}
        label={data.label || "Delay"}
        description={data.description}
        badge="Wait"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Duration" value={getDelayDisplay()} />
      </BaseNode>
    );
  },
);

DelayNode.displayName = "DelayNode";
