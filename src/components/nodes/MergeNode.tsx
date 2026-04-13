import { Merge } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface MergeNodeData {
  label: string;
  description?: string;
  mode?: "object" | "array" | "deep";
  sources?: string[];
  conflictStrategy?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: MergeNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const MergeNode = memo(
  ({ data, id }: { data: MergeNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "mergeNode" });
    };

    const mode = data.mode || "object";
    const sourcesCount = data.sources?.length || 0;

    return (
      <BaseNode
        id={id}
        theme="merge"
        icon={Merge}
        label={data.label || "Merge"}
        description={data.description}
        badge={mode}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Mode" value={mode} />
        <NodeInfoRow
          label="Sources"
          value={sourcesCount > 0 ? `${sourcesCount} source(s)` : "None"}
        />
        <NodeInfoRow
          label="Output"
          value={data.outputVariable || "Not configured"}
        />
      </BaseNode>
    );
  },
);

MergeNode.displayName = "MergeNode";
