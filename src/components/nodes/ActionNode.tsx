"use client";

import { Play } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface ActionNodeData {
  label: string;
  description?: string;
  pluginId?: string;
  operation?: string;
  config?: Record<string, unknown>;
  onNodeSelect?: (node: {
    id: string;
    data: ActionNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const ActionNode = memo(
  ({ data, id }: { data: ActionNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "actionNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="action"
        icon={Play}
        label={data.label || "Action"}
        description={data.description}
        badge={data.pluginId ? "Plugin" : undefined}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        {data.pluginId && <NodeInfoRow label="Plugin" value={data.pluginId} />}
        {data.operation && (
          <NodeInfoRow label="Operation" value={data.operation} />
        )}
      </BaseNode>
    );
  },
);

ActionNode.displayName = "ActionNode";
