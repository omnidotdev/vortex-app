import { Fingerprint } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface UniqueNodeData {
  label: string;
  description?: string;
  source?: string;
  key?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: UniqueNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const UniqueNode = memo(
  ({ data, id }: { data: UniqueNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "uniqueNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="unique"
        icon={Fingerprint}
        label={data.label || "Unique"}
        description={data.description}
        badge="Unique"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Key" value={data.key || "Not configured"} />
        <NodeInfoRow
          label="Output"
          value={data.outputVariable || "Not configured"}
        />
      </BaseNode>
    );
  },
);

UniqueNode.displayName = "UniqueNode";
