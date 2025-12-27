import { Repeat } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeCodeBlock, NodeInfoRow } from "./BaseNode";

interface LoopNodeData {
  label: string;
  description?: string;
  loopType?: "forEach" | "while" | "times";
  collection?: string;
  condition?: string;
  count?: number;
  itemVariable?: string;
  maxIterations?: number;
  onNodeSelect?: (node: {
    id: string;
    data: LoopNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const LoopNode = memo(
  ({ data, id }: { data: LoopNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "loopNode" });
    };

    const getLoopTypeLabel = () => {
      switch (data.loopType) {
        case "forEach":
          return "For Each";
        case "while":
          return "While";
        case "times":
          return `${data.count || 0}x`;
        default:
          return "Loop";
      }
    };

    const getLoopExpression = () => {
      switch (data.loopType) {
        case "forEach":
          return data.collection
            ? `for ${data.itemVariable || "item"} in ${data.collection}`
            : null;
        case "while":
          return data.condition ? `while (${data.condition})` : null;
        case "times":
          return data.count ? `repeat ${data.count} times` : null;
        default:
          return null;
      }
    };

    const loopExpression = getLoopExpression();

    return (
      <BaseNode
        id={id}
        theme="loop"
        icon={Repeat}
        label={data.label || "Loop"}
        description={data.description}
        badge={getLoopTypeLabel()}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          {
            type: "source",
            position: Position.Bottom,
            id: "body",
            style: { left: "30%" },
          },
          {
            type: "source",
            position: Position.Bottom,
            id: "next",
            className: "!bg-gray-400",
            style: { left: "70%" },
          },
        ]}
        handleLabels={{ left: "Body", right: "Next" }}
      >
        {loopExpression && <NodeCodeBlock>{loopExpression}</NodeCodeBlock>}
        {data.maxIterations && (
          <NodeInfoRow label="Max Iterations" value={data.maxIterations} />
        )}
      </BaseNode>
    );
  },
);

LoopNode.displayName = "LoopNode";
