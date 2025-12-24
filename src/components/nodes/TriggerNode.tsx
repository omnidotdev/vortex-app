"use client";

import { Zap } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeActionButton, NodeInfoRow } from "./BaseNode";

interface TriggerNodeData {
  label: string;
  description?: string;
  triggerType?: "manual" | "webhook" | "cron" | "event";
  config?: Record<string, unknown>;
  onNodeSelect?: (node: {
    id: string;
    data: TriggerNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
  onClick?: (event: React.MouseEvent) => void;
  executeConnectedActions?: (nodeId: string) => void;
}

export const TriggerNode = memo(
  ({ data, id }: { data: TriggerNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "triggerNode" });
    };

    const handleTestTrigger = (e: React.MouseEvent) => {
      e.stopPropagation();

      if (
        typeof window !== "undefined" &&
        (
          window as unknown as {
            logToDebugPane?: (
              type: string,
              msg: string,
              data: unknown,
              meta: unknown,
            ) => void;
          }
        ).logToDebugPane
      ) {
        (
          window as unknown as {
            logToDebugPane: (
              type: string,
              msg: string,
              data: unknown,
              meta: unknown,
            ) => void;
          }
        ).logToDebugPane(
          "trigger",
          `Test: ${data.label} trigger activated`,
          {
            triggerId: id,
            triggerType: data.triggerType || data.label,
            timestamp: new Date().toISOString(),
          },
          {
            nodeType: `${data.label} Trigger`,
            nodeName: data.label,
            expectedOutcome: "Simulated trigger execution",
          },
        );
      }

      if (data.executeConnectedActions) {
        data.executeConnectedActions(id);
      }

      data.onClick?.(e);
    };

    const getTriggerTypeLabel = () => {
      switch (data.triggerType) {
        case "webhook":
          return "Webhook";
        case "cron":
          return "Schedule";
        case "event":
          return "Event";
        default:
          return "Manual";
      }
    };

    return (
      <BaseNode
        id={id}
        theme="trigger"
        icon={Zap}
        label={data.label || "Trigger"}
        description={data.description}
        badge={getTriggerTypeLabel()}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[{ type: "source", position: Position.Bottom }]}
      >
        <NodeInfoRow label="Status" value={<StatusIndicator active />} />
        <NodeActionButton onClick={handleTestTrigger}>
          Test Trigger
        </NodeActionButton>
      </BaseNode>
    );
  },
);

TriggerNode.displayName = "TriggerNode";

/** Status indicator component */
const StatusIndicator = memo(({ active }: { active: boolean }) => (
  <div className="flex items-center gap-2">
    <span className="text-xs">{active ? "Active" : "Inactive"}</span>
    <div
      className={`h-2 w-2 rounded-full ${active ? "bg-green-500" : "bg-gray-400"}`}
    />
  </div>
));

StatusIndicator.displayName = "StatusIndicator";
