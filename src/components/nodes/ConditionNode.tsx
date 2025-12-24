"use client";

import { GitFork } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeCodeBlock } from "./BaseNode";

interface ConditionNodeData {
  label: string;
  description?: string;
  expression?: string;
  config?: {
    expression?: string;
  };
  onNodeSelect?: (node: {
    id: string;
    data: ConditionNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const ConditionNode = memo(
  ({ data, id }: { data: ConditionNodeData; id: string }) => {
    const expression = data.config?.expression || data.expression;

    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "conditionNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="condition"
        icon={GitFork}
        label={data.label || "Condition"}
        description={data.description}
        badge="If/Else"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          {
            type: "source",
            position: Position.Bottom,
            id: "true",
            className: "!bg-green-500",
          },
          {
            type: "source",
            position: Position.Right,
            id: "false",
            className: "!bg-red-500",
          },
        ]}
        handleLabels={{ left: "True", right: "False" }}
      >
        {expression && <NodeCodeBlock>{expression}</NodeCodeBlock>}
      </BaseNode>
    );
  },
);

ConditionNode.displayName = "ConditionNode";
