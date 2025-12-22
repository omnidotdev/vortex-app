"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DelayNodeData {
  label: string;
  description?: string;
  duration?: number;
  unit?: "seconds" | "minutes" | "hours" | "days";
  onNodeSelect?: (node: {
    id: string;
    data: DelayNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const DelayNode = memo(
  ({ data, id }: { data: DelayNodeData; id: string }) => {
    const handleNodeClick = () => {
      if (data.onNodeSelect) {
        data.onNodeSelect({ id, data, type: "delayNode" });
      }
    };

    const getDelayDisplay = () => {
      if (!data.duration) return "No delay set";
      const unit = data.unit || "minutes";
      const plural = data.duration !== 1;
      return `${data.duration} ${unit}${plural ? "" : unit.slice(0, -1)}`;
    };

    return (
      <div
        className="px-4 py-2 shadow-lg rounded-lg border-2 min-w-[150px] relative group cursor-pointer hover:shadow-xl transition-shadow bg-cyan-50 border-cyan-200"
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

        <div className="flex items-center gap-2 text-foreground">
          <Clock className="h-4 w-4 text-cyan-600" />
          <div className="font-bold">{data.label || "Delay"}</div>
        </div>

        <div className="text-sm text-cyan-600 mt-1 font-medium">
          {getDelayDisplay()}
        </div>

        {data.description && (
          <div className="text-xs text-muted-foreground mt-1">
            {data.description}
          </div>
        )}

        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 bg-cyan-500!"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-cyan-500!"
        />
      </div>
    );
  },
);

DelayNode.displayName = "DelayNode";
