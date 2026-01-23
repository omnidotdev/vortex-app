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
  glow?: string;
}

/** Pre-defined node themes - gemstone-inspired with glows */
export const nodeThemes = {
  // Sapphire - triggers
  trigger: {
    border: "border-blue-300/60 dark:border-blue-600/40",
    bg: "bg-gradient-to-br from-blue-50 via-blue-50/80 to-sky-50 dark:from-blue-950 dark:via-blue-950/80 dark:to-sky-950",
    iconBg:
      "bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700",
    iconText: "text-white",
    accent: "text-blue-600 dark:text-blue-400",
    handleColor: "!bg-blue-500",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.15)] dark:shadow-[0_0_20px_rgba(59,130,246,0.25)]",
  },
  // Amber/Topaz - actions
  action: {
    border: "border-amber-300/60 dark:border-amber-600/40",
    bg: "bg-gradient-to-br from-amber-50 via-orange-50/50 to-yellow-50 dark:from-amber-950 dark:via-orange-950/50 dark:to-yellow-950",
    iconBg:
      "bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600",
    iconText: "text-white",
    accent: "text-amber-600 dark:text-amber-400",
    handleColor: "!bg-amber-500",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)] dark:shadow-[0_0_20px_rgba(245,158,11,0.25)]",
  },
  // Citrine - conditions
  condition: {
    border: "border-yellow-300/60 dark:border-yellow-600/40",
    bg: "bg-gradient-to-br from-yellow-50 via-amber-50/50 to-orange-50 dark:from-yellow-950 dark:via-amber-950/50 dark:to-orange-950",
    iconBg:
      "bg-gradient-to-br from-yellow-500 to-amber-500 dark:from-yellow-600 dark:to-amber-600",
    iconText: "text-white",
    accent: "text-yellow-600 dark:text-yellow-400",
    handleColor: "!bg-yellow-500",
    glow: "shadow-[0_0_15px_rgba(234,179,8,0.15)] dark:shadow-[0_0_20px_rgba(234,179,8,0.25)]",
  },
  // Emerald - plugins/integrations
  plugin: {
    border: "border-emerald-300/60 dark:border-emerald-600/40",
    bg: "bg-gradient-to-br from-emerald-50 via-green-50/50 to-teal-50 dark:from-emerald-950 dark:via-green-950/50 dark:to-teal-950",
    iconBg:
      "bg-gradient-to-br from-emerald-500 to-green-600 dark:from-emerald-600 dark:to-green-700",
    iconText: "text-white",
    accent: "text-emerald-600 dark:text-emerald-400",
    handleColor: "!bg-emerald-500",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.15)] dark:shadow-[0_0_20px_rgba(16,185,129,0.25)]",
  },
  // Aquamarine - delay/timing
  delay: {
    border: "border-cyan-300/60 dark:border-cyan-600/40",
    bg: "bg-gradient-to-br from-cyan-50 via-sky-50/50 to-blue-50 dark:from-cyan-950 dark:via-sky-950/50 dark:to-blue-950",
    iconBg:
      "bg-gradient-to-br from-cyan-500 to-sky-500 dark:from-cyan-600 dark:to-sky-600",
    iconText: "text-white",
    accent: "text-cyan-600 dark:text-cyan-400",
    handleColor: "!bg-cyan-500",
    glow: "shadow-[0_0_15px_rgba(6,182,212,0.15)] dark:shadow-[0_0_20px_rgba(6,182,212,0.25)]",
  },
  // Tanzanite - loops
  loop: {
    border: "border-indigo-300/60 dark:border-indigo-600/40",
    bg: "bg-gradient-to-br from-indigo-50 via-violet-50/50 to-purple-50 dark:from-indigo-950 dark:via-violet-950/50 dark:to-purple-950",
    iconBg:
      "bg-gradient-to-br from-indigo-500 to-violet-500 dark:from-indigo-600 dark:to-violet-600",
    iconText: "text-white",
    accent: "text-indigo-600 dark:text-indigo-400",
    handleColor: "!bg-indigo-500",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.15)] dark:shadow-[0_0_20px_rgba(99,102,241,0.25)]",
  },
  // Amethyst - parallel
  parallel: {
    border: "border-violet-300/60 dark:border-violet-600/40",
    bg: "bg-gradient-to-br from-violet-50 via-purple-50/50 to-fuchsia-50 dark:from-violet-950 dark:via-purple-950/50 dark:to-fuchsia-950",
    iconBg:
      "bg-gradient-to-br from-violet-500 to-purple-600 dark:from-violet-600 dark:to-purple-700",
    iconText: "text-white",
    accent: "text-violet-600 dark:text-violet-400",
    handleColor: "!bg-violet-500",
    glow: "shadow-[0_0_15px_rgba(139,92,246,0.15)] dark:shadow-[0_0_20px_rgba(139,92,246,0.25)]",
  },
  // Fire Opal - gate
  gate: {
    border: "border-orange-300/60 dark:border-orange-600/40",
    bg: "bg-gradient-to-br from-orange-50 via-red-50/30 to-amber-50 dark:from-orange-950 dark:via-red-950/30 dark:to-amber-950",
    iconBg:
      "bg-gradient-to-br from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600",
    iconText: "text-white",
    accent: "text-orange-600 dark:text-orange-400",
    handleColor: "!bg-orange-500",
    glow: "shadow-[0_0_15px_rgba(249,115,22,0.15)] dark:shadow-[0_0_20px_rgba(249,115,22,0.25)]",
  },
  // Purple Sapphire - switch
  switch: {
    border: "border-purple-300/60 dark:border-purple-600/40",
    bg: "bg-gradient-to-br from-purple-50 via-fuchsia-50/50 to-pink-50 dark:from-purple-950 dark:via-fuchsia-950/50 dark:to-pink-950",
    iconBg:
      "bg-gradient-to-br from-purple-500 to-fuchsia-500 dark:from-purple-600 dark:to-fuchsia-600",
    iconText: "text-white",
    accent: "text-purple-600 dark:text-purple-400",
    handleColor: "!bg-purple-500",
    glow: "shadow-[0_0_15px_rgba(168,85,247,0.15)] dark:shadow-[0_0_20px_rgba(168,85,247,0.25)]",
  },
  // Ruby - MCP
  mcp: {
    border: "border-rose-300/60 dark:border-rose-600/40",
    bg: "bg-gradient-to-br from-rose-50 via-pink-50/50 to-red-50 dark:from-rose-950 dark:via-pink-950/50 dark:to-red-950",
    iconBg:
      "bg-gradient-to-br from-rose-500 to-red-500 dark:from-rose-600 dark:to-red-600",
    iconText: "text-white",
    accent: "text-rose-600 dark:text-rose-400",
    handleColor: "!bg-rose-500",
    glow: "shadow-[0_0_15px_rgba(244,63,94,0.15)] dark:shadow-[0_0_20px_rgba(244,63,94,0.25)]",
  },
  // Pink Tourmaline - LLM/AI
  llm: {
    border: "border-pink-300/60 dark:border-pink-600/40",
    bg: "bg-gradient-to-br from-pink-50 via-rose-50/50 to-fuchsia-50 dark:from-pink-950 dark:via-rose-950/50 dark:to-fuchsia-950",
    iconBg:
      "bg-gradient-to-br from-pink-500 to-rose-500 dark:from-pink-600 dark:to-rose-600",
    iconText: "text-white",
    accent: "text-pink-600 dark:text-pink-400",
    handleColor: "!bg-pink-500",
    glow: "shadow-[0_0_15px_rgba(236,72,153,0.15)] dark:shadow-[0_0_20px_rgba(236,72,153,0.25)]",
  },
  // Obsidian - code
  code: {
    border: "border-slate-300/60 dark:border-slate-600/40",
    bg: "bg-gradient-to-br from-slate-50 via-gray-50/50 to-zinc-50 dark:from-slate-950 dark:via-gray-950/50 dark:to-zinc-950",
    iconBg:
      "bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-500 dark:to-slate-600",
    iconText: "text-white",
    accent: "text-slate-600 dark:text-slate-400",
    handleColor: "!bg-slate-500",
    glow: "shadow-[0_0_15px_rgba(100,116,139,0.1)] dark:shadow-[0_0_20px_rgba(100,116,139,0.15)]",
  },
  // Jade - database
  database: {
    border: "border-teal-300/60 dark:border-teal-600/40",
    bg: "bg-gradient-to-br from-teal-50 via-emerald-50/50 to-cyan-50 dark:from-teal-950 dark:via-emerald-950/50 dark:to-cyan-950",
    iconBg:
      "bg-gradient-to-br from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600",
    iconText: "text-white",
    accent: "text-teal-600 dark:text-teal-400",
    handleColor: "!bg-teal-500",
    glow: "shadow-[0_0_15px_rgba(20,184,166,0.15)] dark:shadow-[0_0_20px_rgba(20,184,166,0.25)]",
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

/** Standard node dimensions for consistent sizing (must be even multiples of grid size 15px for center alignment) */
export const NODE_WIDTH = 270;
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
          "group relative cursor-pointer rounded-xl border px-4 py-3 transition-all duration-200",
          "backdrop-blur-sm",
          themeConfig.border,
          themeConfig.bg,
          themeConfig.glow,
          "hover:scale-[1.02]",
          selected &&
            "ring-2 ring-primary ring-offset-2 ring-offset-background",
        )}
        style={{ width: NODE_WIDTH, minHeight: NODE_MIN_HEIGHT }}
        onClick={onClick}
      >
        {/* Delete button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full border bg-background opacity-0 shadow-md transition-opacity group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
        >
          <Trash2 className="h-3 w-3 text-destructive" />
        </Button>

        {/* Header */}
        <div className="flex min-w-0 items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {/* Icon container - gemstone style with gradient and subtle shadow */}
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm transition-transform group-hover:scale-105",
                themeConfig.iconBg,
              )}
            >
              <Icon className={cn("h-5 w-5", themeConfig.iconText)} />
            </div>
            {/* Title and description */}
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
              <span className="truncate font-medium text-foreground">
                {label}
              </span>
              {description && (
                <span className="truncate text-muted-foreground text-xs">
                  {description}
                </span>
              )}
            </div>
          </div>
          {/* Badge */}
          {badge && (
            <Badge
              variant={badgeVariant}
              className={cn(
                "shrink-0 border-transparent text-xs",
                themeConfig.iconBg,
                themeConfig.iconText,
              )}
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

        {/* Handles for connections */}
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
    <div
      className={cn(
        "flex min-w-0 items-center justify-between gap-2 overflow-hidden text-sm",
        className,
      )}
    >
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="min-w-0 truncate text-foreground">{value}</span>
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
