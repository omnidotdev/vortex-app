import { Unlock } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface DecryptNodeData {
  label: string;
  description?: string;
  algorithm?: string;
  keySource?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: DecryptNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const DecryptNode = memo(
  ({ data, id }: { data: DecryptNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "decryptNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="decrypt"
        icon={Unlock}
        label={data.label || "Decrypt"}
        description={data.description}
        badge="Decrypt"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow
          label="Algorithm"
          value={data.algorithm || "Not configured"}
        />
        <NodeInfoRow
          label="Output"
          value={data.outputVariable || "Not configured"}
        />
      </BaseNode>
    );
  },
);

DecryptNode.displayName = "DecryptNode";
