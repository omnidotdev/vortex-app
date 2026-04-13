import { ShieldCheck } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface AssertNodeData {
  label: string;
  description?: string;
  expression?: string;
  message?: string;
  softFail?: boolean;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: AssertNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

/** Truncate expression for display. */
const truncateExpression = (
  expression: string | undefined,
  maxLen = 30,
): string => {
  if (!expression) return "Not configured";
  if (expression.length <= maxLen) return expression;
  return `${expression.slice(0, maxLen)}...`;
};

export const AssertNode = memo(
  ({ data, id }: { data: AssertNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "assertNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="assert"
        icon={ShieldCheck}
        label={data.label || "Assert"}
        description={data.description}
        badge={data.softFail ? "Soft" : "Assert"}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow
          label="Expression"
          value={truncateExpression(data.expression)}
        />
      </BaseNode>
    );
  },
);

AssertNode.displayName = "AssertNode";
