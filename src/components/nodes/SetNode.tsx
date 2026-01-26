import { Variable } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface SetNodeData {
  label: string;
  description?: string;
  variables?: Record<string, unknown>;
  scope?: "workflow" | "step";
  onNodeSelect?: (node: {
    id: string;
    data: SetNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const SetNode = memo(
  ({ data, id }: { data: SetNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "setNode" });
    };

    const scope = data.scope || "workflow";
    const variableCount = data.variables ? Object.keys(data.variables).length : 0;

    return (
      <BaseNode
        id={id}
        theme="set"
        icon={Variable}
        label={data.label || "Set Variables"}
        description={data.description}
        badge={scope}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow
          label="Variables"
          value={variableCount > 0 ? `${variableCount} variable(s)` : "None"}
        />
        <NodeInfoRow label="Scope" value={scope} />
      </BaseNode>
    );
  },
);

SetNode.displayName = "SetNode";
