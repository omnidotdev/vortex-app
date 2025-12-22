"use client";

import * as Icons from "lucide-react";
import { Trash2 } from "lucide-react";
import { memo } from "react";
import { Handle, Position } from "reactflow";

import { Button } from "@/components/ui/button";

import type React from "react";
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
      className="group relative min-w-37.5 cursor-pointer rounded-lg border-2 border-yellow-200 bg-yellow-50 px-4 py-2 shadow-lg transition-shadow hover:shadow-xl"
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
      {data.label === "Browser Alert" && (
        <div
          className="mt-1 cursor-pointer rounded bg-blue-50 px-2 py-1 font-medium text-blue-600 text-xs transition-colors hover:bg-blue-100 hover:text-blue-800"
          onClick={handleActionClick}
        >
          Click to test alert
        </div>
      )}
      {data.label === "HTTP Call" && (
        <div
          className="mt-1 cursor-pointer rounded bg-green-50 px-2 py-1 font-medium text-green-600 text-xs transition-colors hover:bg-green-100 hover:text-green-800"
          onClick={handleActionClick}
        >
          Click to test HTTP call
        </div>
      )}
      <Handle
        type="target"
        position={Position.Top}
        className="h-3 w-3 bg-green-500!"
      />
    </div>
  );
});

ActionNode.displayName = "ActionNode";
