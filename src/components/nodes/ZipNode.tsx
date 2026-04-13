import { Merge } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface ZipNodeData {
  label: string;
  description?: string;
  sourceArrays?: string[];
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: ZipNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const ZipNode = memo(
  ({ data, id }: { data: ZipNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "zipNode" });
    };

    const sourcesDisplay =
      data.sourceArrays && data.sourceArrays.length > 0
        ? `${data.sourceArrays.length} arrays`
        : "Not configured";

    return (
      <BaseNode
        id={id}
        theme="zip"
        icon={Merge}
        label={data.label || "Zip"}
        description={data.description}
        badge="Zip"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Sources" value={sourcesDisplay} />
        <NodeInfoRow
          label="Output"
          value={data.outputVariable || "Not configured"}
        />
      </BaseNode>
    );
  },
);

ZipNode.displayName = "ZipNode";
