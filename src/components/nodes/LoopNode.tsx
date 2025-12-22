"use client";

import { Repeat, Trash2 } from "lucide-react";
import { memo } from "react";
import { Handle, Position } from "reactflow";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
        className="group relative min-w-[150px] cursor-pointer rounded-lg border-2 border-indigo-200 bg-indigo-50 px-4 py-2 shadow-lg transition-shadow hover:shadow-xl"
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
            <Repeat className="h-4 w-4 text-indigo-600" />
            <div className="font-bold">{data.label || "Loop"}</div>
          </div>
          <Badge variant="outline" className="bg-indigo-100 text-xs">
            {getLoopTypeLabel()}
          </Badge>
        </div>

        {data.description && (
          <div className="mt-1 text-muted-foreground text-sm">
            {data.description}
          </div>
        )}

        {data.loopType === "forEach" && data.collection && (
          <div className="mt-2 text-indigo-600 text-xs">
            Over: {data.collection}
          </div>
        )}

        {data.loopType === "while" && data.condition && (
          <div className="mt-2 text-indigo-600 text-xs">
            While: {data.condition}
          </div>
        )}

        {data.maxIterations && (
          <div className="mt-1 text-muted-foreground text-xs">
            Max: {data.maxIterations} iterations
          </div>
        )}

        <Handle
          type="target"
          position={Position.Top}
          className="!bg-indigo-500 h-3 w-3"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="body"
          className="!bg-indigo-500 h-3 w-3"
          style={{ left: "30%" }}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="next"
          className="h-3 w-3 bg-gray-400!"
          style={{ left: "70%" }}
        />

        <div className="mt-2 flex justify-between px-2 text-[10px] text-muted-foreground">
          <span>Body</span>
          <span>Next</span>
        </div>
      </div>
    );
  },
);

LoopNode.displayName = "LoopNode";
