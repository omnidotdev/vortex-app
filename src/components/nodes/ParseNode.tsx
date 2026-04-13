import { FileJson } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface ParseNodeData {
  label: string;
  description?: string;
  format?: "json" | "yaml" | "xml" | "csv";
  source?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: ParseNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const ParseNode = memo(
  ({ data, id }: { data: ParseNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "parseNode" });
    };

    const format = data.format || "json";

    return (
      <BaseNode
        id={id}
        theme="parse"
        icon={FileJson}
        label={data.label || "Parse"}
        description={data.description}
        badge={format.toUpperCase()}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Format" value={format.toUpperCase()} />
        <NodeInfoRow
          label="Output"
          value={data.outputVariable || "Not configured"}
        />
      </BaseNode>
    );
  },
);

ParseNode.displayName = "ParseNode";
