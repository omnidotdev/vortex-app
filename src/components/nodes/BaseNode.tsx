"use client";

import { Trash2 } from "lucide-react";
import { memo } from "react";
import { Handle } from "reactflow";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { Position } from "reactflow";

/** Node color theme configuration */
export interface NodeTheme {
  border: string;
  bg: string;
  iconBg: string;
  iconText: string;
  accent: string;
  handleColor: string;
}

/** Pre-defined node themes */
export const nodeThemes = {
  trigger: {
    border: "border-blue-200 dark:border-blue-800",
    bg: "bg-blue-50 dark:bg-blue-950",
    iconBg: "bg-blue-100 dark:bg-blue-900",
    iconText: "text-blue-600 dark:text-blue-400",
    accent: "text-blue-600 dark:text-blue-400",
    handleColor: "!bg-blue-500",
  },
  action: {
    border: "border-amber-200 dark:border-amber-800",
    bg: "bg-amber-50 dark:bg-amber-950",
    iconBg: "bg-amber-100 dark:bg-amber-900",
    iconText: "text-amber-600 dark:text-amber-400",
    accent: "text-amber-600 dark:text-amber-400",
    handleColor: "!bg-amber-500",
  },
  condition: {
    border: "border-yellow-200 dark:border-yellow-800",
    bg: "bg-yellow-50 dark:bg-yellow-950",
    iconBg: "bg-yellow-100 dark:bg-yellow-900",
    iconText: "text-yellow-600 dark:text-yellow-400",
    accent: "text-yellow-600 dark:text-yellow-400",
    handleColor: "!bg-yellow-500",
  },
  plugin: {
    border: "border-emerald-200 dark:border-emerald-800",
    bg: "bg-emerald-50 dark:bg-emerald-950",
    iconBg: "bg-emerald-100 dark:bg-emerald-900",
    iconText: "text-emerald-600 dark:text-emerald-400",
    accent: "text-emerald-600 dark:text-emerald-400",
    handleColor: "!bg-emerald-500",
  },
  delay: {
    border: "border-cyan-200 dark:border-cyan-800",
    bg: "bg-cyan-50 dark:bg-cyan-950",
    iconBg: "bg-cyan-100 dark:bg-cyan-900",
    iconText: "text-cyan-600 dark:text-cyan-400",
    accent: "text-cyan-600 dark:text-cyan-400",
    handleColor: "!bg-cyan-500",
  },
  loop: {
    border: "border-indigo-200 dark:border-indigo-800",
    bg: "bg-indigo-50 dark:bg-indigo-950",
    iconBg: "bg-indigo-100 dark:bg-indigo-900",
    iconText: "text-indigo-600 dark:text-indigo-400",
    accent: "text-indigo-600 dark:text-indigo-400",
    handleColor: "!bg-indigo-500",
  },
  parallel: {
    border: "border-violet-200 dark:border-violet-800",
    bg: "bg-violet-50 dark:bg-violet-950",
    iconBg: "bg-violet-100 dark:bg-violet-900",
    iconText: "text-violet-600 dark:text-violet-400",
    accent: "text-violet-600 dark:text-violet-400",
    handleColor: "!bg-violet-500",
  },
  gate: {
    border: "border-orange-200 dark:border-orange-800",
    bg: "bg-orange-50 dark:bg-orange-950",
    iconBg: "bg-orange-100 dark:bg-orange-900",
    iconText: "text-orange-600 dark:text-orange-400",
    accent: "text-orange-600 dark:text-orange-400",
    handleColor: "!bg-orange-500",
  },
  switch: {
    border: "border-purple-200 dark:border-purple-800",
    bg: "bg-purple-50 dark:bg-purple-950",
    iconBg: "bg-purple-100 dark:bg-purple-900",
    iconText: "text-purple-600 dark:text-purple-400",
    accent: "text-purple-600 dark:text-purple-400",
    handleColor: "!bg-purple-500",
  },
  mcp: {
    border: "border-rose-200 dark:border-rose-800",
    bg: "bg-rose-50 dark:bg-rose-950",
    iconBg: "bg-rose-100 dark:bg-rose-900",
    iconText: "text-rose-600 dark:text-rose-400",
    accent: "text-rose-600 dark:text-rose-400",
    handleColor: "!bg-rose-500",
  },
  llm: {
    border: "border-pink-200 dark:border-pink-800",
    bg: "bg-pink-50 dark:bg-pink-950",
    iconBg: "bg-pink-100 dark:bg-pink-900",
    iconText: "text-pink-600 dark:text-pink-400",
    accent: "text-pink-600 dark:text-pink-400",
    handleColor: "!bg-pink-500",
  },
  code: {
    border: "border-slate-200 dark:border-slate-800",
    bg: "bg-slate-50 dark:bg-slate-950",
    iconBg: "bg-slate-100 dark:bg-slate-900",
    iconText: "text-slate-600 dark:text-slate-400",
    accent: "text-slate-600 dark:text-slate-400",
    handleColor: "!bg-slate-500",
  },
  database: {
    border: "border-teal-200 dark:border-teal-800",
    bg: "bg-teal-50 dark:bg-teal-950",
    iconBg: "bg-teal-100 dark:bg-teal-900",
    iconText: "text-teal-600 dark:text-teal-400",
    accent: "text-teal-600 dark:text-teal-400",
    handleColor: "!bg-teal-500",
  },
} as const;

export type NodeThemeKey = keyof typeof nodeThemes;

/** Handle configuration */
export interface NodeHandle {
  type: "source" | "target";
  position: Position;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}

/** Standard node dimensions for consistent sizing */
export const NODE_WIDTH = 280;
export const NODE_MIN_HEIGHT = 120;

/** Base node props */
export interface BaseNodeProps {
  id: string;
  /** Node theme key or custom theme */
  theme: NodeThemeKey | NodeTheme;
  /** Icon component */
  icon: LucideIcon;
  /** Node title/label */
  label: string;
  /** Optional description */
  description?: string;
  /** Optional badge text */
  badge?: string;
  /** Badge variant */
  badgeVariant?: "default" | "outline" | "secondary" | "destructive";
  /** Whether node is selected */
  selected?: boolean;
  /** Handle configurations */
  handles?: NodeHandle[];
  /** Custom content to render in body */
  children?: ReactNode;
  /** Footer content (buttons, etc.) */
  footer?: ReactNode;
  /** Handle labels at bottom */
  handleLabels?: { left?: string; right?: string };
  /** Click handler */
  onClick?: () => void;
  /** Delete handler */
  onDelete?: () => void;
}

/**
 * Base node component providing consistent styling across all workflow nodes.
 *
 * Features:
 * - Fixed width (280px) and minimum height (120px) for consistent canvas layout
 * - Clean header with icon in rounded container
 * - Consistent spacing and typography
 * - Dark mode support
 * - Hover and selection states
 */
export const BaseNode = memo(
  ({
    theme,
    icon: Icon,
    label,
    description,
    badge,
    badgeVariant = "outline",
    selected,
    handles = [],
    children,
    footer,
    handleLabels,
    onClick,
    onDelete,
  }: BaseNodeProps) => {
    const themeConfig = typeof theme === "string" ? nodeThemes[theme] : theme;

    return (
      <div
        className={cn(
          "group relative cursor-pointer rounded-xl border-2 px-4 py-3 shadow-sm transition-all duration-200",
          "hover:shadow-md",
          themeConfig.border,
          themeConfig.bg,
          selected && "ring-2 ring-primary ring-offset-2",
        )}
        style={{ width: NODE_WIDTH, minHeight: NODE_MIN_HEIGHT }}
        onClick={onClick}
      >
        {/* Delete button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background opacity-0 shadow-md transition-opacity group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
        >
          <Trash2 className="h-3 w-3 text-destructive" />
        </Button>

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Icon container */}
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                themeConfig.iconBg,
              )}
            >
              <Icon className={cn("h-5 w-5", themeConfig.iconText)} />
            </div>
            {/* Title and description */}
            <div className="flex flex-col">
              <span className="font-medium text-foreground">{label}</span>
              {description && (
                <span className="text-muted-foreground text-xs">
                  {description}
                </span>
              )}
            </div>
          </div>
          {/* Badge */}
          {badge && (
            <Badge
              variant={badgeVariant}
              className={cn("text-xs", themeConfig.iconBg, themeConfig.accent)}
            >
              {badge}
            </Badge>
          )}
        </div>

        {/* Body content */}
        {children && <div className="mt-3 space-y-2">{children}</div>}

        {/* Footer */}
        {footer && <div className="mt-3">{footer}</div>}

        {/* Handle labels */}
        {handleLabels && (
          <div className="mt-2 flex justify-between px-2 text-[10px] text-muted-foreground">
            <span>{handleLabels.left}</span>
            <span>{handleLabels.right}</span>
          </div>
        )}

        {/* Handles */}
        {handles.map((handle, index) => (
          <Handle
            key={handle.id || `${handle.type}-${handle.position}-${index}`}
            type={handle.type}
            position={handle.position}
            id={handle.id}
            className={cn(
              "h-3 w-3",
              handle.className || themeConfig.handleColor,
            )}
            style={handle.style}
          />
        ))}
      </div>
    );
  },
);

BaseNode.displayName = "BaseNode";

/** Info row component for displaying key-value pairs */
export const NodeInfoRow = memo(
  ({
    label,
    value,
    className,
  }: {
    label: string;
    value: ReactNode;
    className?: string;
  }) => (
    <div className={cn("flex items-center justify-between text-sm", className)}>
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  ),
);

NodeInfoRow.displayName = "NodeInfoRow";

/** Code/expression display component */
export const NodeCodeBlock = memo(
  ({ children, className }: { children: ReactNode; className?: string }) => (
    <div
      className={cn(
        "rounded-md bg-muted px-2 py-1 font-mono text-foreground text-xs",
        className,
      )}
    >
      {children}
    </div>
  ),
);

NodeCodeBlock.displayName = "NodeCodeBlock";

/** Action button for node testing/actions */
export const NodeActionButton = memo(
  ({
    children,
    onClick,
    variant = "default",
    className,
  }: {
    children: ReactNode;
    onClick?: (e: React.MouseEvent) => void;
    variant?: "default" | "success" | "danger" | "warning";
    className?: string;
  }) => {
    const variantClasses = {
      default: "bg-muted text-foreground hover:bg-muted/80",
      success:
        "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300",
      danger:
        "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300",
      warning:
        "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300",
    };

    return (
      <div
        className={cn(
          "cursor-pointer rounded-md px-3 py-1.5 text-center font-medium text-xs transition-colors",
          variantClasses[variant],
          className,
        )}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e);
        }}
      >
        {children}
      </div>
    );
  },
);

NodeActionButton.displayName = "NodeActionButton";
