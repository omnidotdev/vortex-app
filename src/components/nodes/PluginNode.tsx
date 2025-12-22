"use client";

import { Puzzle, Trash2 } from "lucide-react";
import { memo } from "react";
import { Handle, Position } from "reactflow";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
      if (data.onNodeSelect) {
        data.onNodeSelect({ id, data, type: "pluginNode" });
      }
    };

    return (
      <div
        className="group relative min-w-[150px] cursor-pointer rounded-lg border-2 border-emerald-200 bg-emerald-50 px-4 py-2 shadow-lg transition-shadow hover:shadow-xl"
        onClick={handleNodeClick}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background opacity-0 shadow-md transition-opacity group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            data.onDelete?.();
          }}
        >
          <Trash2 className="h-3 w-3 text-destructive" />
        </Button>

        <div className="flex items-center justify-between gap-2 text-foreground">
          <div className="flex items-center gap-2">
            <Puzzle className="h-4 w-4 text-emerald-600" />
            <div className="font-bold">{data.label || "Plugin"}</div>
          </div>
          <Badge variant="outline" className="bg-emerald-100 text-xs">
            WASM
          </Badge>
        </div>

        {data.description && (
          <div className="mt-1 text-muted-foreground text-sm">
            {data.description}
          </div>
        )}

        {data.pluginId && (
          <div className="mt-2 text-emerald-600 text-xs">
            Plugin: {data.pluginId}
          </div>
        )}

        {data.function && (
          <div className="text-muted-foreground text-xs">
            Function: {data.function}()
          </div>
        )}

        {(data.timeout || data.memoryLimit) && (
          <div className="mt-1 flex gap-2 text-muted-foreground text-xs">
            {data.timeout && <span>Timeout: {data.timeout}ms</span>}
            {data.memoryLimit && <span>Memory: {data.memoryLimit}MB</span>}
          </div>
        )}

        <Handle
          type="target"
          position={Position.Top}
          className="!bg-emerald-500 h-3 w-3"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="!bg-emerald-500 h-3 w-3"
        />
      </div>
    );
  },
);

PluginNode.displayName = "PluginNode";
