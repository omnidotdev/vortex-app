import { Layers } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface AggregateNodeData {
  label: string;
  description?: string;
  mode?: "collect" | "merge" | "concat" | "sum" | "first" | "last";
  source?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: AggregateNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const AggregateNode = memo(
  ({ data, id }: { data: AggregateNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "aggregateNode" });
    };

    const getModeDisplay = () => {
      const modes: Record<string, string> = {
        collect: "Collect all",
        merge: "Deep merge",
        concat: "Concatenate",
        sum: "Sum values",
        first: "First item",
        last: "Last item",
      };
      return modes[data.mode || "collect"] || "Collect all";
    };

    return (
      <BaseNode
        id={id}
        theme="aggregate"
        icon={Layers}
        label={data.label || "Aggregate"}
        description={data.description}
        badge="Merge"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Mode" value={getModeDisplay()} />
        {data.outputVariable && (
          <NodeInfoRow label="Output" value={data.outputVariable} />
        )}
      </BaseNode>
    );
  },
);

AggregateNode.displayName = "AggregateNode";
