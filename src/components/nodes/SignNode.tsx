import { PenTool } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface SignNodeData {
  label: string;
  description?: string;
  algorithm?: string;
  keySource?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: SignNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const SignNode = memo(
  ({ data, id }: { data: SignNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "signNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="sign"
        icon={PenTool}
        label={data.label || "Sign"}
        description={data.description}
        badge="Sign"
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

SignNode.displayName = "SignNode";
