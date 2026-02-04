import { Cable, Play, Settings, Trash2 } from "lucide-react";
import { memo } from "react";
import { Handle, Position } from "reactflow";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  NODE_MIN_HEIGHT,
  NODE_WIDTH,
  NodeInfoRow,
  getIntegrationTheme,
  nodeThemes,
} from "./BaseNode";

interface ActionNodeData {
  label: string;
  description?: string;
  pluginId?: string;
  operation?: string;
  config?: Record<string, unknown>;
  // Integration-specific fields
  iconUrl?: string;
  integrationDefinitionId?: string;
  connectedInstanceId?: string;
  requiresConnection?: boolean;
  needsAttention?: boolean;
  onNodeSelect?: (node: {
    id: string;
    data: ActionNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
  onConfigureIntegration?: (integrationDefinitionId: string) => void;
  onOpenIntegrationSettings?: (integrationInstanceId: string) => void;
}

export const ActionNode = memo(
  ({
    data,
    id,
    selected,
  }: {
    data: ActionNodeData;
    id: string;
    selected?: boolean;
  }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "actionNode" });
    };

    const isIntegration = !!data.integrationDefinitionId;
    const themeKey = isIntegration
      ? getIntegrationTheme(data.label || data.integrationDefinitionId || "")
      : "action";
    const themeConfig = nodeThemes[themeKey];

    return (
      <div
        className={cn(
          "group relative cursor-pointer rounded-xl border px-4 py-3",
          themeConfig.border,
          themeConfig.bg,
          themeConfig.glow,
          selected &&
            "ring-2 ring-primary ring-offset-2 ring-offset-background",
          data.needsAttention && "animate-attention-pulse",
        )}
        style={{ width: NODE_WIDTH, minHeight: NODE_MIN_HEIGHT }}
        onClick={handleNodeClick}
      >
        {/* Delete button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full border bg-background opacity-0 shadow-md transition-opacity group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            data.onDelete?.();
          }}
        >
          <Trash2 className="h-3 w-3 text-destructive" />
        </Button>

        {/* Header */}
        <div className="flex min-w-0 items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {/* Icon - use integration logo or default icon */}
            {data.iconUrl ? (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm dark:bg-slate-800">
                <img
                  src={data.iconUrl}
                  alt={data.label}
                  className="h-6 w-6 object-contain"
                  onError={(e) => {
                    // Fallback to icon if image fails to load
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            ) : (
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm",
                  themeConfig.iconBg,
                )}
              >
                {isIntegration ? (
                  <Cable className="h-5 w-5 text-white" />
                ) : (
                  <Play className="h-5 w-5 text-white" />
                )}
              </div>
            )}
            {/* Title and description */}
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-medium text-foreground">
                {data.label || "Action"}
              </span>
              {data.description && (
                <span className="truncate text-muted-foreground text-xs">
                  {data.description}
                </span>
              )}
            </div>
          </div>
          {/* Badge / Settings */}
          {isIntegration && (
            <>
              {data.requiresConnection ? (
                <Badge
                  variant="outline"
                  className="shrink-0 cursor-pointer border-amber-300 bg-amber-50 text-amber-700 text-xs hover:bg-amber-100 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-300 dark:hover:bg-amber-900"
                  onClick={(e) => {
                    e.stopPropagation();
                    data.onConfigureIntegration?.(
                      data.integrationDefinitionId!,
                    );
                  }}
                >
                  Connect
                </Badge>
              ) : (
                <button
                  type="button"
                  className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (data.connectedInstanceId) {
                      data.onOpenIntegrationSettings?.(
                        data.connectedInstanceId,
                      );
                    }
                  }}
                  title="Configure integration"
                >
                  <Settings className="h-4 w-4" />
                </button>
              )}
            </>
          )}
          {!isIntegration && data.pluginId && (
            <Badge
              variant="outline"
              className={cn("shrink-0 text-xs", themeConfig.accent)}
            >
              Plugin
            </Badge>
          )}
        </div>

        {/* Body content */}
        <div className="mt-3 min-w-0 space-y-1 overflow-hidden">
          {data.operation && (
            <NodeInfoRow
              label="Action"
              value={
                <span className="truncate font-mono text-xs">
                  {formatOperation(data.operation)}
                </span>
              }
            />
          )}
          {!isIntegration && data.pluginId && (
            <NodeInfoRow
              label="Plugin"
              value={
                <span className="truncate font-mono text-xs">
                  {data.pluginId.replace("builtin:", "")}
                </span>
              }
            />
          )}
        </div>

        {/* Handles */}
        <Handle
          type="target"
          position={Position.Top}
          className={cn("h-3 w-3", themeConfig.handleColor)}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className={cn("h-3 w-3", themeConfig.handleColor)}
        />
      </div>
    );
  },
);

ActionNode.displayName = "ActionNode";

/** Format operation name for display */
function formatOperation(operation: string): string {
  // Convert snake_case or camelCase to Title Case
  return operation
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
