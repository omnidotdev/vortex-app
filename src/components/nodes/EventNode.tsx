import { Radio } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface EventNodeData {
  label: string;
  description?: string;
  eventName?: string;
  onNodeSelect?: (node: {
    id: string;
    data: EventNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const EventNode = memo(
  ({ data, id }: { data: EventNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "eventNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="event"
        icon={Radio}
        label={data.label || "Emit Event"}
        description={data.description}
        badge="Emit"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow
          label="Event"
          value={data.eventName || "Not configured"}
        />
      </BaseNode>
    );
  },
);

EventNode.displayName = "EventNode";
