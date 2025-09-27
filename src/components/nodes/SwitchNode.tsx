"use client";

import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export const SwitchNode = memo(({ data, id }: { data: any; id: string }) => {
  const IconComponent = data.iconName
    ? (Icons[data.iconName as keyof typeof Icons] as React.ComponentType<{
        className?: string;
      }>)
    : null;
  const cases = data.config?.cases || [];

  const handleNodeClick = (event: React.MouseEvent) => {
    // Open sidebar for node editing
    if (data.onNodeSelect) {
      data.onNodeSelect({ id, data, type: "switchNode" });
    }
  };

  return (
    <div
      className="px-4 py-2 shadow-lg rounded-lg bg-card border-2 border-purple-500 min-w-[150px] relative group cursor-pointer hover:shadow-xl transition-shadow"
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
        className="w-3 h-3 !bg-purple-500"
      />
      {cases.map((c: any, index: number) => (
        <Handle
          key={index}
          type="source"
          position={Position.Bottom}
          id={`case_${index}`}
          className="w-3 h-3 !bg-purple-500"
          style={{ left: `${((index + 1) / (cases.length + 1)) * 100}%` }}
        />
      ))}
      <Handle
        type="source"
        position={Position.Right}
        id="default"
        className="w-3 h-3 !bg-gray-500"
      />
    </div>
  );
});

SwitchNode.displayName = "SwitchNode";
