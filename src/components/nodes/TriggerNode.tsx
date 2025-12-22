"use client";

import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
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
      className="px-4 py-2 shadow-lg rounded-lg border-2 min-w-[150px] relative group cursor-pointer hover:shadow-xl transition-shadow bg-blue-50 border-blue-200"
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
          {IconComponent && <IconComponent className="h-4 w-4" />}
          <div className="font-bold">{data.label}</div>
        </div>
      </div>
      <div className="text-sm text-muted-foreground mt-1">
        {data.description}
      </div>

      {/* Status indicator */}
      <div className="mt-3 flex justify-between items-center">
        <span className="text-xs text-gray-600">Active</span>
        <div className="w-2 h-2 rounded-full bg-green-400" />
      </div>
      {isClickTrigger && (
        <div
          className="text-xs text-blue-600 mt-1 font-medium cursor-pointer hover:text-blue-800 px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 transition-colors"
          onClick={handleTriggerClick}
        >
          Click to trigger
        </div>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-blue-500"
      />
    </div>
  );
});

TriggerNode.displayName = "TriggerNode";
