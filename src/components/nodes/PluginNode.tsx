"use client";

import { Puzzle } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeCodeBlock, NodeInfoRow } from "./BaseNode";

interface PluginNodeData {
  label: string;
  description?: string;
  pluginId?: string;
  function?: string;
  inputs?: Record<string, unknown>;
  timeout?: number;
  memoryLimit?: number;
  onNodeSelect?: (node: {
    id: string;
    data: PluginNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const PluginNode = memo(
  ({ data, id }: { data: PluginNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "pluginNode" });
    };

    const isBuiltin = data.pluginId?.startsWith("builtin:");
    const badge = isBuiltin ? "Built-in" : "WASM";

    return (
      <BaseNode
        id={id}
        theme="plugin"
        icon={Puzzle}
        label={data.label || "Plugin"}
        description={data.description}
        badge={badge}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        {data.pluginId && (
          <NodeInfoRow
            label="Plugin"
            value={data.pluginId.replace("builtin:", "")}
          />
        )}
        {data.function && <NodeCodeBlock>{data.function}()</NodeCodeBlock>}
        {(data.timeout || data.memoryLimit) && (
          <div className="flex gap-3 text-muted-foreground text-xs">
            {data.timeout && <span>Timeout: {data.timeout}ms</span>}
            {data.memoryLimit && <span>Memory: {data.memoryLimit}MB</span>}
          </div>
        )}
      </BaseNode>
    );
  },
);

PluginNode.displayName = "PluginNode";
