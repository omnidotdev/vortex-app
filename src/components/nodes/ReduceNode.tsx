import { Sigma } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface ReduceNodeData {
  label: string;
  description?: string;
  source?: string;
  expression?: string;
  initialValue?: string;
  accumulatorVariable?: string;
  itemVariable?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: ReduceNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

/** Truncate expression for display. */
const truncateExpression = (expr: string, maxLength = 20): string => {
  if (expr.length <= maxLength) return expr;
  return `${expr.slice(0, maxLength)}...`;
};

export const ReduceNode = memo(
  ({ data, id }: { data: ReduceNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "reduceNode" });
    };

    const expression = data.expression || "";

    return (
      <BaseNode
        id={id}
        theme="reduce"
        icon={Sigma}
        label={data.label || "Reduce"}
        description={data.description}
        badge="Reduce"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow
          label="Expression"
          value={expression ? truncateExpression(expression) : "Not configured"}
        />
        <NodeInfoRow
          label="Output"
          value={data.outputVariable || "Not configured"}
        />
      </BaseNode>
    );
  },
);

ReduceNode.displayName = "ReduceNode";
