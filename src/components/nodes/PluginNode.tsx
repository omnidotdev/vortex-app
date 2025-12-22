"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { Puzzle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PluginNodeData {
  label: string;
  description?: string;
  pluginId?: string;
  function?: string;
  inputs?: Record<string, unknown>;
  timeout?: number;
  memoryLimit?: number;
  onNodeSelect?: (node: { id: string; data: PluginNodeData; type: string }) => void;
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
        className="px-4 py-2 shadow-lg rounded-lg border-2 min-w-[150px] relative group cursor-pointer hover:shadow-xl transition-shadow bg-emerald-50 border-emerald-200"
        onClick={handleNodeClick}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-background shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
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
          <Badge variant="outline" className="text-xs bg-emerald-100">
            WASM
          </Badge>
        </div>

        {data.description && (
          <div className="text-sm text-muted-foreground mt-1">
            {data.description}
          </div>
        )}

        {data.pluginId && (
          <div className="mt-2 text-xs text-emerald-600">
            Plugin: {data.pluginId}
          </div>
        )}

        {data.function && (
          <div className="text-xs text-muted-foreground">
            Function: {data.function}()
          </div>
        )}

        {(data.timeout || data.memoryLimit) && (
          <div className="mt-1 text-xs text-muted-foreground flex gap-2">
            {data.timeout && <span>Timeout: {data.timeout}ms</span>}
            {data.memoryLimit && <span>Memory: {data.memoryLimit}MB</span>}
          </div>
        )}

        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 !bg-emerald-500"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 !bg-emerald-500"
        />
      </div>
    );
  },
);

PluginNode.displayName = "PluginNode";
