"use client";

import { ShieldCheck, Signal, Trash2 } from "lucide-react";
import { memo } from "react";
import { Handle, Position } from "reactflow";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GateNodeData {
  label: string;
  description?: string;
  gateType?: "approval" | "signal";
  approvers?: string[];
  signalName?: string;
  timeout?: string;
  timeoutAction?: "approve" | "reject" | "continue";
  onNodeSelect?: (node: {
    id: string;
    data: GateNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const GateNode = memo(
  ({ data, id }: { data: GateNodeData; id: string }) => {
    const handleNodeClick = () => {
      if (data.onNodeSelect) {
        data.onNodeSelect({ id, data, type: "gateNode" });
      }
    };

    const handleApprove = (event: React.MouseEvent) => {
      event.stopPropagation();
      if (typeof window !== "undefined" && (window as any).logToDebugPane) {
        (window as any).logToDebugPane(
          "action",
          "Gate APPROVED",
          {
            gateId: id,
            gateType: data.gateType,
            approvers: data.approvers,
          },
          {
            nodeType: "Gate",
            nodeName: data.label || "Gate",
            expectedOutcome: "Continue via approved branch",
          },
        );
      }
    };

    const handleReject = (event: React.MouseEvent) => {
      event.stopPropagation();
      if (typeof window !== "undefined" && (window as any).logToDebugPane) {
        (window as any).logToDebugPane(
          "action",
          "Gate REJECTED",
          {
            gateId: id,
            gateType: data.gateType,
            approvers: data.approvers,
          },
          {
            nodeType: "Gate",
            nodeName: data.label || "Gate",
            expectedOutcome: "Continue via rejected branch",
          },
        );
      }
    };

    const isApproval = data.gateType === "approval";
    const Icon = isApproval ? ShieldCheck : Signal;

    return (
      <div
        className="group relative min-w-37.5 cursor-pointer rounded-lg border-2 border-amber-200 bg-amber-50 px-4 py-2 shadow-lg transition-shadow hover:shadow-xl"
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
            <Icon className="h-4 w-4 text-amber-600" />
            <div className="font-bold">{data.label || "Gate"}</div>
          </div>
          <Badge variant="outline" className="bg-amber-100 text-xs">
            {isApproval ? "Approval" : "Signal"}
          </Badge>
        </div>

        {data.description && (
          <div className="mt-1 text-muted-foreground text-sm">
            {data.description}
          </div>
        )}

        {isApproval && data.approvers && data.approvers.length > 0 && (
          <div className="mt-2 text-amber-600 text-xs">
            Approvers: {data.approvers.join(", ")}
          </div>
        )}

        {!isApproval && data.signalName && (
          <div className="mt-2 text-amber-600 text-xs">
            Signal: {data.signalName}
          </div>
        )}

        {data.timeout && (
          <div className="mt-1 text-muted-foreground text-xs">
            Timeout: {data.timeout}
            {data.timeoutAction && ` → ${data.timeoutAction}`}
          </div>
        )}

        <Handle
          type="target"
          position={Position.Top}
          className="h-3 w-3 bg-amber-500!"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="approved"
          className="h-3 w-3 bg-green-500!"
          style={{ left: "30%" }}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="rejected"
          className="h-3 w-3 bg-red-500!"
          style={{ left: "70%" }}
        />

        <div className="mt-2 flex justify-between gap-2">
          <div
            className="flex-1 cursor-pointer rounded bg-green-100 px-2 py-1 text-center font-medium text-green-700 text-xs transition-colors hover:bg-green-200"
            onClick={handleApprove}
          >
            Approve
          </div>
          <div
            className="flex-1 cursor-pointer rounded bg-red-100 px-2 py-1 text-center font-medium text-red-700 text-xs transition-colors hover:bg-red-200"
            onClick={handleReject}
          >
            Reject
          </div>
        </div>
      </div>
    );
  },
);

GateNode.displayName = "GateNode";
