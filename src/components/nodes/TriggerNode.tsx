"use client";

import * as Icons from "lucide-react";
import { Trash2 } from "lucide-react";
import { memo } from "react";
import { Handle, Position } from "reactflow";

import { Button } from "@/components/ui/button";

import type React from "react";
export const TriggerNode = memo(({ data, id }: { data: any; id: string }) => {
  const IconComponent = data.iconName
    ? (Icons[data.iconName as keyof typeof Icons] as React.ComponentType<{
        className?: string;
      }>)
    : null;

  const handleTriggerClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    // Execute connected downstream actions
    if (data.executeConnectedActions) {
      data.executeConnectedActions(id);
    }

    // Log to debug pane
    if (typeof window !== "undefined" && (window as any).logToDebugPane) {
      (window as any).logToDebugPane(
        "trigger",
        "Click trigger activated - executing connected actions",
        {
          triggerId: id,
          timestamp: new Date().toISOString(),
        },
        {
          nodeType: "Click Trigger",
          nodeName: data.label,
          expectedOutcome: "Execute downstream workflow actions",
        },
      );
    }

    // Also call the onClick handler if it exists
    if (data.onClick) {
      data.onClick(event);
    }
  };

  const handleNodeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (data.onNodeSelect) {
      data.onNodeSelect({ id, data, type: "triggerNode" });
    }
  };

  const isClickTrigger = data.label === "Click";

  return (
    <div
      className="group relative min-w-[150px] cursor-pointer rounded-lg border-2 border-blue-200 bg-blue-50 px-4 py-2 shadow-lg transition-shadow hover:shadow-xl"
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
          {IconComponent && <IconComponent className="h-4 w-4" />}
          <div className="font-bold">{data.label}</div>
        </div>
      </div>
      <div className="mt-1 text-muted-foreground text-sm">
        {data.description}
      </div>

      {/* Status indicator */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-gray-600 text-xs">Active</span>
        <div className="h-2 w-2 rounded-full bg-green-400" />
      </div>
      {isClickTrigger && (
        <div
          className="mt-1 cursor-pointer rounded bg-blue-50 px-2 py-1 font-medium text-blue-600 text-xs transition-colors hover:bg-blue-100 hover:text-blue-800"
          onClick={handleTriggerClick}
        >
          Click to trigger
        </div>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-blue-500 h-3 w-3"
      />
    </div>
  );
});

TriggerNode.displayName = "TriggerNode";
