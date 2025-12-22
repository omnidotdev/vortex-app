"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { ShieldCheck, Signal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

    const isApproval = data.gateType === "approval";
    const Icon = isApproval ? ShieldCheck : Signal;

    return (
      <div
        className="px-4 py-2 shadow-lg rounded-lg border-2 min-w-37.5 relative group cursor-pointer hover:shadow-xl transition-shadow bg-amber-50 border-amber-200"
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
            <Icon className="h-4 w-4 text-amber-600" />
            <div className="font-bold">{data.label || "Gate"}</div>
          </div>
          <Badge variant="outline" className="text-xs bg-amber-100">
            {isApproval ? "Approval" : "Signal"}
          </Badge>
        </div>

        {data.description && (
          <div className="text-sm text-muted-foreground mt-1">
            {data.description}
          </div>
        )}

        {isApproval && data.approvers && data.approvers.length > 0 && (
          <div className="mt-2 text-xs text-amber-600">
            Approvers: {data.approvers.join(", ")}
          </div>
        )}

        {!isApproval && data.signalName && (
          <div className="mt-2 text-xs text-amber-600">
            Signal: {data.signalName}
          </div>
        )}

        {data.timeout && (
          <div className="mt-1 text-xs text-muted-foreground">
            Timeout: {data.timeout}
            {data.timeoutAction && ` → ${data.timeoutAction}`}
          </div>
        )}

        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 bg-amber-500!"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="approved"
          className="w-3 h-3 bg-green-500!"
          style={{ left: "30%" }}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="rejected"
          className="w-3 h-3 bg-red-500!"
          style={{ left: "70%" }}
        />

        <div className="flex justify-between text-[10px] text-muted-foreground mt-2 px-2">
          <span className="text-green-600">Approved</span>
          <span className="text-red-600">Rejected</span>
        </div>
      </div>
    );
  },
);

GateNode.displayName = "GateNode";
