import { Key } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface JwtNodeData {
  label: string;
  description?: string;
  operation?: "sign" | "verify" | "decode";
  algorithm?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: JwtNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const JwtNode = memo(
  ({ data, id }: { data: JwtNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "jwtNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="jwt"
        icon={Key}
        label={data.label || "JWT"}
        description={data.description}
        badge="JWT"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow
          label="Operation"
          value={data.operation || "Not configured"}
        />
        <NodeInfoRow
          label="Output"
          value={data.outputVariable || "Not configured"}
        />
      </BaseNode>
    );
  },
);

JwtNode.displayName = "JwtNode";
