"use client";

import * as Icons from "lucide-react";
import { Trash2 } from "lucide-react";
import { memo } from "react";
import { Handle, Position } from "reactflow";

import { Button } from "@/components/ui/button";

import type React from "react";

export const ConditionNode = memo(({ data, id }: { data: any; id: string }) => {
  const IconComponent = data.iconName
    ? (Icons[data.iconName as keyof typeof Icons] as React.ComponentType<{
        className?: string;
      }>)
    : null;

  const expression = data.config?.expression || data.expression;

  const handleNodeClick = (event: React.MouseEvent) => {
    // Open sidebar for node editing
    if (data.onNodeSelect) {
      data.onNodeSelect({ id, data, type: "conditionNode" });
    }
  };

  const handleTestCondition = (event: React.MouseEvent) => {
    event.stopPropagation();

    // Simulate condition evaluation (random true/false for demo)
    const result = Math.random() > 0.5;

    if (typeof window !== "undefined" && (window as any).logToDebugPane) {
      (window as any).logToDebugPane(
        "action",
        `Condition evaluated: ${result ? "TRUE" : "FALSE"}`,
        {
          conditionId: id,
          expression: expression || "(no expression)",
          result,
        },
        {
          nodeType: "Condition",
          nodeName: data.label,
          expectedOutcome: result
            ? "Follow TRUE branch"
            : "Follow FALSE branch",
        },
      );
    }
  };

  return (
    <div
      className="group relative min-w-37.5 cursor-pointer rounded-lg border-2 border-yellow-500 bg-card px-4 py-2 shadow-lg transition-shadow hover:shadow-xl"
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
        {IconComponent && <IconComponent className="h-4 w-4" />}
        <div className="font-bold">{data.label}</div>
      </div>
      <div className="mt-1 text-muted-foreground text-sm">
        {data.description}
      </div>
      {expression && (
        <div className="mt-2 rounded bg-muted px-2 py-1 font-mono text-xs">
          {expression}
        </div>
      )}
      <div
        className="mt-2 cursor-pointer rounded bg-yellow-100 px-2 py-1 font-medium text-xs text-yellow-700 transition-colors hover:bg-yellow-200"
        onClick={handleTestCondition}
      >
        Test Condition
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="h-3 w-3 bg-yellow-500!"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="true"
        className="h-3 w-3 bg-green-500!"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="false"
        className="h-3 w-3 bg-red-500!"
      />
    </div>
  );
});

ConditionNode.displayName = "ConditionNode";
