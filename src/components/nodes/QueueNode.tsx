import { ListOrdered } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

type QueueOperation = "push" | "pull" | "peek";

interface QueueNodeData {
  label: string;
  description?: string;
  operation?: QueueOperation;
  provider?: string;
  providerConfig?: Record<string, unknown>;
  queueName?: string;
  message?: string;
  priority?: number;
  delayMs?: number;
  outputVariable?: string;
  timeoutMs?: number;
  onNodeSelect?: (node: {
    id: string;
    data: QueueNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const QueueNode = memo(
  ({ data, id }: { data: QueueNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "queueNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="queue"
        icon={ListOrdered}
        label={data.label || "Queue Operation"}
        description={data.description}
        badge={data.operation || "push"}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Queue" value={data.queueName || "Not configured"} />
        <NodeInfoRow
          label="Operation"
          value={data.operation || "Not configured"}
        />
      </BaseNode>
    );
  },
);

QueueNode.displayName = "QueueNode";
