"use client";

import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { useDiscordIntegration } from "@/contexts/IntegrationsContext";

export const TriggerNode = memo(({ data, id }: { data: any; id: string }) => {
  const { isEnabled: isDiscordEnabled } = useDiscordIntegration();
  const IconComponent = data.iconName
    ? (Icons[data.iconName as keyof typeof Icons] as React.ComponentType<{
        className?: string;
      }>)
    : null;

  const handleTriggerClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    // Handle Discord triggers
    if (data.integrationId === "discord") {
      if (!isDiscordEnabled) {
        alert(
          "Discord integration is not enabled. Please configure it in settings.",
        );
        return;
      }

      console.log(`Executing Discord trigger: ${data.label}`, data.config);
      // Discord trigger execution will be handled by the workflow
    }

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
  const isDiscordNode = data.integrationId === "discord";
  const nodeColor = isDiscordNode
    ? isDiscordEnabled
      ? "bg-green-50 border-green-200"
      : "bg-gray-50 border-gray-200"
    : "bg-blue-50 border-blue-200";

  return (
    <div
      className={`px-4 py-2 shadow-lg rounded-lg border-2 min-w-[150px] relative group cursor-pointer hover:shadow-xl transition-shadow ${nodeColor}`}
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
        {isDiscordNode && (
          <Badge variant="outline" className="text-xs">
            Discord
          </Badge>
        )}
      </div>
      <div className="text-sm text-muted-foreground mt-1">
        {data.description}
      </div>

      {/* Configuration preview for Discord nodes */}
      {isDiscordNode && data.config && Object.keys(data.config).length > 0 && (
        <div className="mt-2 space-y-1">
          {Object.entries(data.config)
            .filter(([_, value]) => value && value !== "")
            .slice(0, 2)
            .map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <span className="text-xs font-medium text-gray-500">
                  {key}:
                </span>
                <span className="text-xs truncate max-w-[100px] text-gray-700">
                  {String(value)}
                </span>
              </div>
            ))}
        </div>
      )}

      {/* Status indicator */}
      <div className="mt-3 flex justify-between items-center">
        <span
          className={`text-xs ${
            isDiscordNode && !isDiscordEnabled
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          {isDiscordNode
            ? isDiscordEnabled
              ? "Listening..."
              : "Discord disabled"
            : "Active"}
        </span>
        <div
          className={`w-2 h-2 rounded-full ${
            isDiscordNode
              ? isDiscordEnabled
                ? "bg-green-400"
                : "bg-gray-300"
              : "bg-green-400"
          }`}
        />
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
