"use client";

import { GitBranch } from "lucide-react";
import { memo } from "react";
import { Handle, Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface ParallelNodeData {
  label: string;
  description?: string;
  branches?: string[][];
  waitFor?: "all" | "any" | number;
  onNodeSelect?: (node: {
    id: string;
    data: ParallelNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const ParallelNode = memo(
  ({ data, id }: { data: ParallelNodeData; id: string }) => {
    const branchCount = data.branches?.length || 2;

    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "parallelNode" });
    };

    const getWaitForLabel = () => {
      if (data.waitFor === "all") return "Wait for all";
      if (data.waitFor === "any") return "Wait for any";
      if (typeof data.waitFor === "number") return `Wait for ${data.waitFor}`;
      return "Wait for all";
    };

    return (
      <BaseNode
        id={id}
        theme="parallel"
        icon={GitBranch}
        label={data.label || "Parallel"}
        description={data.description}
        badge={`${branchCount} branches`}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[{ type: "target", position: Position.Top }]}
      >
        <NodeInfoRow label="Strategy" value={getWaitForLabel()} />

        {/* Branch labels */}
        <div className="mt-2 flex justify-around text-[10px] text-muted-foreground">
          {Array.from({ length: branchCount }).map((_, index) => (
            <span key={index}>Branch {index + 1}</span>
          ))}
        </div>

        {/* Dynamic branch handles */}
        {Array.from({ length: branchCount }).map((_, index) => {
          const offset = ((index + 1) / (branchCount + 1)) * 100;
          return (
            <Handle
              key={`branch_${index}`}
              type="source"
              position={Position.Bottom}
              id={`branch_${index}`}
              className="h-3 w-3 bg-violet-500!"
              style={{ left: `${offset}%` }}
            />
          );
        })}
      </BaseNode>
    );
  },
);

ParallelNode.displayName = "ParallelNode";
