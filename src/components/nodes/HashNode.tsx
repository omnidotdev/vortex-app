import { Hash } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface HashNodeData {
  label: string;
  description?: string;
  algorithm?: "md5" | "sha1" | "sha256" | "sha512";
  encoding?: "hex" | "base64";
  source?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: HashNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const HashNode = memo(
  ({ data, id }: { data: HashNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "hashNode" });
    };

    const algorithm = data.algorithm || "sha256";
    const encoding = data.encoding || "hex";

    return (
      <BaseNode
        id={id}
        theme="hash"
        icon={Hash}
        label={data.label || "Hash"}
        description={data.description}
        badge={algorithm.toUpperCase()}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Algorithm" value={algorithm.toUpperCase()} />
        <NodeInfoRow label="Encoding" value={encoding} />
      </BaseNode>
    );
  },
);

HashNode.displayName = "HashNode";
