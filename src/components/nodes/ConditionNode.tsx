"use client";

import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export const ConditionNode = memo(({ data, id }: { data: any; id: string }) => {
  const IconComponent = data.iconName
    ? (Icons[data.iconName as keyof typeof Icons] as React.ComponentType<{
        className?: string;
      }>)
    : null;

  const handleNodeClick = (event: React.MouseEvent) => {
    // Open sidebar for node editing
    if (data.onNodeSelect) {
      data.onNodeSelect({ id, data, type: "conditionNode" });
    }
  };

  return (
    <div
      className="px-4 py-2 shadow-lg rounded-lg bg-card border-2 border-yellow-500 min-w-[150px] relative group cursor-pointer hover:shadow-xl transition-shadow"
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
        {IconComponent && <IconComponent className="h-4 w-4" />}
        <div className="font-bold">{data.label}</div>
      </div>
      <div className="text-sm text-muted-foreground mt-1">
        {data.description}
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-yellow-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="true"
        className="w-3 h-3 !bg-green-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="false"
        className="w-3 h-3 !bg-red-500"
      />
    </div>
  );
});

ConditionNode.displayName = "ConditionNode";
