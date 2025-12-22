"use client";

import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
export const ActionNode = memo(({ data, id }: { data: any; id: string }) => {
  const IconComponent = data.iconName
    ? (Icons[data.iconName as keyof typeof Icons] as React.ComponentType<{
        className?: string;
      }>)
    : null;

  const handleActionClick = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (data.label === "Browser Alert") {
      const message =
        data.description || data.config?.message || "Browser alert triggered!";
      alert(message);

      // Log to debug pane if available
      if (typeof window !== "undefined" && (window as any).logToDebugPane) {
        (window as any).logToDebugPane(
          "action",
          "Browser Alert Triggered",
          { message },
          {
            nodeType: "Browser Alert",
            nodeName: data.label,
            expectedOutcome: "Alert dialog shown to user",
          },
        );
      }
    } else if (data.label === "HTTP Call") {
      const url =
        data.config?.url || data.description || "https://httpbin.org/get";
      const method = data.config?.method || "GET";
      const body = data.config?.body;
      const headers = data.config?.headers || {};

      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          ...(method !== "GET" && body && { body: JSON.stringify(body) }),
        });

        const result = await response.text();

        if (typeof window !== "undefined" && (window as any).logToDebugPane) {
          (window as any).logToDebugPane(
            "action",
            "HTTP Call Executed",
            { url, method, status: response.status, response: result },
            {
              nodeType: "HTTP Call",
              nodeName: data.label,
              expectedOutcome: `HTTP ${method} request to ${url}`,
            },
          );
        }

        alert(
          `HTTP ${method} ${response.status}\nURL: ${url}\nResponse: ${result.substring(0, 200)}${result.length > 200 ? "..." : ""}`,
        );
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        if (typeof window !== "undefined" && (window as any).logToDebugPane) {
          (window as any).logToDebugPane(
            "action",
            "HTTP Call Failed",
            { url, method, error: errorMessage },
            {
              nodeType: "HTTP Call",
              nodeName: data.label,
              expectedOutcome: "HTTP request failed",
            },
          );
        }

        alert(`HTTP Call Failed\nURL: ${url}\nError: ${errorMessage}`);
      }
    }
  };

  const handleNodeClick = (event: React.MouseEvent) => {
    // Open sidebar for node editing
    if (data.onNodeSelect) {
      data.onNodeSelect({ id, data, type: "actionNode" });
    }
  };

  return (
    <div
      className="px-4 py-2 shadow-lg rounded-lg border-2 min-w-37.5 relative group cursor-pointer hover:shadow-xl transition-shadow bg-yellow-50 border-yellow-200"
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
      {data.label === "Browser Alert" && (
        <div
          className="text-xs text-blue-600 mt-1 font-medium cursor-pointer hover:text-blue-800 px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 transition-colors"
          onClick={handleActionClick}
        >
          Click to test alert
        </div>
      )}
      {data.label === "HTTP Call" && (
        <div
          className="text-xs text-green-600 mt-1 font-medium cursor-pointer hover:text-green-800 px-2 py-1 rounded bg-green-50 hover:bg-green-100 transition-colors"
          onClick={handleActionClick}
        >
          Click to test HTTP call
        </div>
      )}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-green-500!"
      />
    </div>
  );
});

ActionNode.displayName = "ActionNode";
