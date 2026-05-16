import { RefreshCw } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface RetryNodeData {
  label: string;
  description?: string;
  stepId?: string;
  maxAttempts?: number;
  initialDelayMs?: number;
  backoff?: "fixed" | "linear" | "exponential";
  maxDelayMs?: number;
  retryOn?: string[];
  onNodeSelect?: (node: {
    id: string;
    data: RetryNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const RetryNode = memo(
  ({ data, id }: { data: RetryNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "retryNode" });
    };

    // Format backoff strategy for display
    const backoffDisplay = data.backoff
      ? data.backoff.charAt(0).toUpperCase() + data.backoff.slice(1)
      : "Not configured";

    return (
      <BaseNode
        id={id}
        theme="retry"
        icon={RefreshCw}
        label={data.label || "Retry"}
        description={data.description}
        badge={data.maxAttempts ? `${data.maxAttempts}x` : "Retry"}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow
          label="Max Attempts"
          value={data.maxAttempts ?? "Not configured"}
        />
        <NodeInfoRow label="Backoff" value={backoffDisplay} />
      </BaseNode>
    );
  },
);

RetryNode.displayName = "RetryNode";
