import { Lock } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface EncryptNodeData {
  label: string;
  description?: string;
  algorithm?: string;
  keySource?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: EncryptNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const EncryptNode = memo(
  ({ data, id }: { data: EncryptNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "encryptNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="encrypt"
        icon={Lock}
        label={data.label || "Encrypt"}
        description={data.description}
        badge="Encrypt"
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

EncryptNode.displayName = "EncryptNode";
