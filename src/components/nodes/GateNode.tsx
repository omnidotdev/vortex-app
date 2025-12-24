"use client";

import { ShieldCheck, Signal } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeActionButton, NodeInfoRow } from "./BaseNode";

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
    const isApproval = data.gateType === "approval";
    const Icon = isApproval ? ShieldCheck : Signal;

    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "gateNode" });
    };

    const handleApprove = (e: React.MouseEvent) => {
      e.stopPropagation();

      const logToDebugPane = (
        window as unknown as {
          logToDebugPane?: (
            type: string,
            msg: string,
            data: unknown,
            meta: unknown,
          ) => void;
        }
      ).logToDebugPane;
      if (logToDebugPane) {
        logToDebugPane(
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

    const handleReject = (e: React.MouseEvent) => {
      e.stopPropagation();

      const logToDebugPane = (
        window as unknown as {
          logToDebugPane?: (
            type: string,
            msg: string,
            data: unknown,
            meta: unknown,
          ) => void;
        }
      ).logToDebugPane;
      if (logToDebugPane) {
        logToDebugPane(
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

    return (
      <BaseNode
        id={id}
        theme="gate"
        icon={Icon}
        label={data.label || "Gate"}
        description={data.description}
        badge={isApproval ? "Approval" : "Signal"}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          {
            type: "source",
            position: Position.Bottom,
            id: "approved",
            className: "!bg-green-500",
            style: { left: "30%" },
          },
          {
            type: "source",
            position: Position.Bottom,
            id: "rejected",
            className: "!bg-red-500",
            style: { left: "70%" },
          },
        ]}
        handleLabels={{ left: "Approved", right: "Rejected" }}
      >
        {isApproval && data.approvers && data.approvers.length > 0 && (
          <NodeInfoRow label="Approvers" value={data.approvers.join(", ")} />
        )}
        {!isApproval && data.signalName && (
          <NodeInfoRow label="Signal" value={data.signalName} />
        )}
        {data.timeout && (
          <NodeInfoRow
            label="Timeout"
            value={`${data.timeout}${data.timeoutAction ? ` → ${data.timeoutAction}` : ""}`}
          />
        )}

        <div className="flex gap-2">
          <NodeActionButton
            onClick={handleApprove}
            variant="success"
            className="flex-1"
          >
            Approve
          </NodeActionButton>
          <NodeActionButton
            onClick={handleReject}
            variant="danger"
            className="flex-1"
          >
            Reject
          </NodeActionButton>
        </div>
      </BaseNode>
    );
  },
);

GateNode.displayName = "GateNode";
