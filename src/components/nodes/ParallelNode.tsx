"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { GitBranch, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ParallelNodeData {
  label: string;
  description?: string;
  branches?: string[][];
  waitFor?: "all" | "any" | number;
  onNodeSelect?: (node: { id: string; data: ParallelNodeData; type: string }) => void;
  onDelete?: () => void;
}

export const ParallelNode = memo(
  ({ data, id }: { data: ParallelNodeData; id: string }) => {
    const handleNodeClick = () => {
      if (data.onNodeSelect) {
        data.onNodeSelect({ id, data, type: "parallelNode" });
      }
    };

    const branchCount = data.branches?.length || 2;

    const getWaitForLabel = () => {
      if (data.waitFor === "all") return "Wait for all";
      if (data.waitFor === "any") return "Wait for any";
      if (typeof data.waitFor === "number") return `Wait for ${data.waitFor}`;
      return "Wait for all";
    };

    return (
      <div
        className="px-4 py-2 shadow-lg rounded-lg border-2 min-w-[180px] relative group cursor-pointer hover:shadow-xl transition-shadow bg-violet-50 border-violet-200"
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
            <GitBranch className="h-4 w-4 text-violet-600" />
            <div className="font-bold">{data.label || "Parallel"}</div>
          </div>
          <Badge variant="outline" className="text-xs bg-violet-100">
            {branchCount} branches
          </Badge>
        </div>

        {data.description && (
          <div className="text-sm text-muted-foreground mt-1">
            {data.description}
          </div>
        )}

        <div className="mt-2 text-xs text-violet-600">{getWaitForLabel()}</div>

        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 !bg-violet-500"
        />

        {/* Dynamic branch handles */}
        {Array.from({ length: branchCount }).map((_, index) => {
          const offset = ((index + 1) / (branchCount + 1)) * 100;
          return (
            <Handle
              key={`branch_${index}`}
              type="source"
              position={Position.Bottom}
              id={`branch_${index}`}
              className="w-3 h-3 !bg-violet-500"
              style={{ left: `${offset}%` }}
            />
          );
        })}

        <div className="flex justify-around text-[10px] text-muted-foreground mt-2">
          {Array.from({ length: branchCount }).map((_, index) => (
            <span key={index}>Branch {index + 1}</span>
          ))}
        </div>
      </div>
    );
  },
);

ParallelNode.displayName = "ParallelNode";
