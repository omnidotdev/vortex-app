"use client";

import * as Icons from "lucide-react";
import { Trash2 } from "lucide-react";
import { memo } from "react";
import { Handle, Position } from "reactflow";

import { Button } from "@/components/ui/button";

import type React from "react";

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
      className="group relative min-w-[150px] cursor-pointer rounded-lg border-2 border-purple-500 bg-card px-4 py-2 shadow-lg transition-shadow hover:shadow-xl"
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
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-purple-500 h-3 w-3"
      />
      {cases.map((c: any, index: number) => (
        <Handle
          key={index}
          type="source"
          position={Position.Bottom}
          id={`case_${index}`}
          className="!bg-purple-500 h-3 w-3"
          style={{ left: `${((index + 1) / (cases.length + 1)) * 100}%` }}
        />
      ))}
      <Handle
        type="source"
        position={Position.Right}
        id="default"
        className="!bg-gray-500 h-3 w-3"
      />
    </div>
  );
});

SwitchNode.displayName = "SwitchNode";
