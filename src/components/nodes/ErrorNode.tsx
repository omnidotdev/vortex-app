import { AlertTriangle } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface ErrorNodeData {
  label: string;
  description?: string;
  errorType?: string;
  message?: string;
  data?: unknown;
  fatal?: boolean;
  onNodeSelect?: (node: {
    id: string;
    data: ErrorNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const ErrorNode = memo(
  ({ data, id }: { data: ErrorNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "errorNode" });
    };

    // Truncate message for display.
    const truncatedMessage =
      data.message && data.message.length > 30
        ? `${data.message.slice(0, 30)}...`
        : data.message;

    return (
      <BaseNode
        id={id}
        theme="error"
        icon={AlertTriangle}
        label={data.label || "Error"}
        description={data.description}
        badge={data.fatal ? "Fatal" : data.errorType || "Error"}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow
          label="Type"
          value={data.errorType || "Not configured"}
        />
        <NodeInfoRow
          label="Message"
          value={truncatedMessage || "Not configured"}
        />
      </BaseNode>
    );
  },
);

ErrorNode.displayName = "ErrorNode";
