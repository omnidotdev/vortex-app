"use client";

import { Clock, Trash2 } from "lucide-react";
import { memo } from "react";
import { Handle, Position } from "reactflow";

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

    const handleSkipDelay = (event: React.MouseEvent) => {
      event.stopPropagation();
      if (typeof window !== "undefined" && (window as any).logToDebugPane) {
        (window as any).logToDebugPane(
          "action",
          "Delay SKIPPED",
          {
            delayId: id,
            originalDuration: data.duration,
            unit: data.unit,
          },
          {
            nodeType: "Delay",
            nodeName: data.label || "Delay",
            expectedOutcome: "Continue immediately without waiting",
          },
        );
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
        className="group relative min-w-37.5 cursor-pointer rounded-lg border-2 border-cyan-200 bg-cyan-50 px-4 py-2 shadow-lg transition-shadow hover:shadow-xl"
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

        <div className="flex items-center gap-2 text-foreground">
          <Clock className="h-4 w-4 text-cyan-600" />
          <div className="font-bold">{data.label || "Delay"}</div>
        </div>

        <div className="mt-1 font-medium text-cyan-600 text-sm">
          {getDelayDisplay()}
        </div>

        {data.description && (
          <div className="mt-1 text-muted-foreground text-xs">
            {data.description}
          </div>
        )}

        <div
          className="mt-2 cursor-pointer rounded bg-cyan-100 px-2 py-1 text-center font-medium text-cyan-700 text-xs transition-colors hover:bg-cyan-200"
          onClick={handleSkipDelay}
        >
          Skip Delay
        </div>

        <Handle
          type="target"
          position={Position.Top}
          className="h-3 w-3 bg-cyan-500!"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="h-3 w-3 bg-cyan-500!"
        />
      </div>
    );
  },
);

DelayNode.displayName = "DelayNode";
