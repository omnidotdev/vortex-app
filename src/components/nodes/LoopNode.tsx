"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { Repeat, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface LoopNodeData {
  label: string;
  description?: string;
  loopType?: "forEach" | "while" | "times";
  collection?: string;
  condition?: string;
  count?: number;
  itemVariable?: string;
  maxIterations?: number;
  onNodeSelect?: (node: {
    id: string;
    data: LoopNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const LoopNode = memo(
  ({ data, id }: { data: LoopNodeData; id: string }) => {
    const handleNodeClick = () => {
      if (data.onNodeSelect) {
        data.onNodeSelect({ id, data, type: "loopNode" });
      }
    };

    const getLoopTypeLabel = () => {
      switch (data.loopType) {
        case "forEach":
          return "For Each";
        case "while":
          return "While";
        case "times":
          return `${data.count || 0} Times`;
        default:
          return "Loop";
      }
    };

    return (
      <div
        className="px-4 py-2 shadow-lg rounded-lg border-2 min-w-[150px] relative group cursor-pointer hover:shadow-xl transition-shadow bg-indigo-50 border-indigo-200"
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
            <Repeat className="h-4 w-4 text-indigo-600" />
            <div className="font-bold">{data.label || "Loop"}</div>
          </div>
          <Badge variant="outline" className="text-xs bg-indigo-100">
            {getLoopTypeLabel()}
          </Badge>
        </div>

        {data.description && (
          <div className="text-sm text-muted-foreground mt-1">
            {data.description}
          </div>
        )}

        {data.loopType === "forEach" && data.collection && (
          <div className="mt-2 text-xs text-indigo-600">
            Over: {data.collection}
          </div>
        )}

        {data.loopType === "while" && data.condition && (
          <div className="mt-2 text-xs text-indigo-600">
            While: {data.condition}
          </div>
        )}

        {data.maxIterations && (
          <div className="mt-1 text-xs text-muted-foreground">
            Max: {data.maxIterations} iterations
          </div>
        )}

        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 !bg-indigo-500"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="body"
          className="w-3 h-3 !bg-indigo-500"
          style={{ left: "30%" }}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="next"
          className="w-3 h-3 bg-gray-400!"
          style={{ left: "70%" }}
        />

        <div className="flex justify-between text-[10px] text-muted-foreground mt-2 px-2">
          <span>Body</span>
          <span>Next</span>
        </div>
      </div>
    );
  },
);

LoopNode.displayName = "LoopNode";
