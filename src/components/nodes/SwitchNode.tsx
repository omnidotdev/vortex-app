import { Route } from "lucide-react";
import { memo } from "react";
import { Handle, Position } from "reactflow";

import { BaseNode, NodeCodeBlock, NodeInfoRow } from "./BaseNode";

interface SwitchCase {
  value: string | number | boolean;
  label?: string;
  next?: string;
}

interface SwitchNodeData {
  label: string;
  description?: string;
  expression?: string;
  config?: {
    expression?: string;
    cases?: SwitchCase[];
  };
  onNodeSelect?: (node: {
    id: string;
    data: SwitchNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const SwitchNode = memo(
  ({ data, id }: { data: SwitchNodeData; id: string }) => {
    const expression = data.config?.expression || data.expression;
    const cases = data.config?.cases || [];

    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "switchNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="switch"
        icon={Route}
        label={data.label || "Switch"}
        description={data.description}
        badge={`${cases.length} cases`}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          {
            type: "source",
            position: Position.Right,
            id: "default",
            className: "!bg-gray-500",
          },
        ]}
      >
        {expression && <NodeCodeBlock>{expression}</NodeCodeBlock>}
        {cases.length > 0 && (
          <NodeInfoRow
            label="Cases"
            value={cases.map((c) => c.label || String(c.value)).join(", ")}
          />
        )}

        {/* Dynamic case handles */}
        {cases.map((_c, index) => (
          <Handle
            key={`case_${index}`}
            type="source"
            position={Position.Bottom}
            id={`case_${index}`}
            className="h-3 w-3 bg-purple-500!"
            style={{ left: `${((index + 1) / (cases.length + 1)) * 100}%` }}
          />
        ))}
      </BaseNode>
    );
  },
);

SwitchNode.displayName = "SwitchNode";
