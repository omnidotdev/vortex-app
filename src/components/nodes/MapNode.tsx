import { Repeat } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface MapNodeData {
  label: string;
  description?: string;
  source?: string;
  expression?: string;
  itemVariable?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: MapNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

/** Truncate expression for display. */
const truncateExpression = (expr: string, maxLength = 20): string => {
  if (expr.length <= maxLength) return expr;
  return `${expr.slice(0, maxLength)}...`;
};

export const MapNode = memo(
  ({ data, id }: { data: MapNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "mapNode" });
    };

    const expression = data.expression || "";

    return (
      <BaseNode
        id={id}
        theme="map"
        icon={Repeat}
        label={data.label || "Map"}
        description={data.description}
        badge="Map"
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

MapNode.displayName = "MapNode";
