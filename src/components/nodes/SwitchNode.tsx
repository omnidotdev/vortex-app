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
  const expression = data.config?.expression || data.expression;

  const handleNodeClick = (event: React.MouseEvent) => {
    // Open sidebar for node editing
    if (data.onNodeSelect) {
      data.onNodeSelect({ id, data, type: "switchNode" });
    }
  };

  const handleTestSwitch = (event: React.MouseEvent) => {
    event.stopPropagation();

    // Simulate switch evaluation (random case for demo)
    const selectedCase =
      cases.length > 0
        ? cases[Math.floor(Math.random() * cases.length)]
        : { label: "default" };

    if (typeof window !== "undefined" && (window as any).logToDebugPane) {
      (window as any).logToDebugPane(
        "action",
        `Switch evaluated: ${selectedCase.label || "default"}`,
        {
          switchId: id,
          expression: expression || "(no expression)",
          selectedCase: selectedCase.label,
          allCases: cases.map((c: any) => c.label),
        },
        {
          nodeType: "Switch",
          nodeName: data.label,
          expectedOutcome: `Follow ${selectedCase.label || "default"} branch`,
        },
      );
    }
  };

  return (
    <div
      className="group relative min-w-37.5 cursor-pointer rounded-lg border-2 border-purple-500 bg-card px-4 py-2 shadow-lg transition-shadow hover:shadow-xl"
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
      {expression && (
        <div className="mt-2 rounded bg-muted px-2 py-1 font-mono text-xs">
          {expression}
        </div>
      )}
      {cases.length > 0 && (
        <div className="mt-1 text-muted-foreground text-xs">
          Cases: {cases.map((c: any) => c.label || c.value).join(", ")}
        </div>
      )}
      <div
        className="mt-2 cursor-pointer rounded bg-purple-100 px-2 py-1 font-medium text-purple-700 text-xs transition-colors hover:bg-purple-200"
        onClick={handleTestSwitch}
      >
        Test Switch
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="h-3 w-3 bg-purple-500!"
      />
      {cases.map((c: any, index: number) => (
        <Handle
          key={index}
          type="source"
          position={Position.Bottom}
          id={`case_${index}`}
          className="h-3 w-3 bg-purple-500!"
          style={{ left: `${((index + 1) / (cases.length + 1)) * 100}%` }}
        />
      ))}
      <Handle
        type="source"
        position={Position.Right}
        id="default"
        className="h-3 w-3 bg-gray-500!"
      />
    </div>
  );
});

SwitchNode.displayName = "SwitchNode";
