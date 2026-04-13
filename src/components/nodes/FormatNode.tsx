import { TextCursorInput } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface FormatNodeData {
  label: string;
  description?: string;
  type?: "string" | "number" | "date" | "currency";
  pattern?: string;
  source?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: FormatNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const FormatNode = memo(
  ({ data, id }: { data: FormatNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "formatNode" });
    };

    const formatType = data.type || "string";

    return (
      <BaseNode
        id={id}
        theme="format"
        icon={TextCursorInput}
        label={data.label || "Format"}
        description={data.description}
        badge={formatType}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Type" value={formatType} />
        <NodeInfoRow
          label="Output"
          value={data.outputVariable || "Not configured"}
        />
      </BaseNode>
    );
  },
);

FormatNode.displayName = "FormatNode";
