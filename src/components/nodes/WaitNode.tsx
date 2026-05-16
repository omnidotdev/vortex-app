import { Pause } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface WaitNodeData {
  label: string;
  description?: string;
  resumeOn?: "webhook" | "event" | "timeout";
  eventName?: string;
  timeout?: number;
  timeoutUnit?: "seconds" | "minutes" | "hours" | "days";
  onNodeSelect?: (node: {
    id: string;
    data: WaitNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const WaitNode = memo(
  ({ data, id }: { data: WaitNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "waitNode" });
    };

    const getResumeDisplay = () => {
      switch (data.resumeOn) {
        case "webhook":
          return "Webhook callback";
        case "event":
          return data.eventName ? `Event: ${data.eventName}` : "Event";
        case "timeout":
          return data.timeout
            ? `${data.timeout} ${data.timeoutUnit || "minutes"}`
            : "Timeout";
        default:
          return "Not configured";
      }
    };

    return (
      <BaseNode
        id={id}
        theme="wait"
        icon={Pause}
        label={data.label || "Wait"}
        description={data.description}
        badge="Pause"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Resume on" value={getResumeDisplay()} />
      </BaseNode>
    );
  },
);

WaitNode.displayName = "WaitNode";
