import { CheckCircle2 } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface ApprovalNodeData {
  label: string;
  description?: string;
  title?: string;
  approvers?: string[];
  timeout?: number;
  onNodeSelect?: (node: {
    id: string;
    data: ApprovalNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const ApprovalNode = memo(
  ({ data, id }: { data: ApprovalNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "approvalNode" });
    };

    const approverCount = data.approvers?.length || 0;

    return (
      <BaseNode
        id={id}
        theme="approval"
        icon={CheckCircle2}
        label={data.label || "Approval"}
        description={data.description}
        badge="Human"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Title" value={data.title || "Not configured"} />
        <NodeInfoRow
          label="Approvers"
          value={approverCount > 0 ? `${approverCount} approver(s)` : "None"}
        />
      </BaseNode>
    );
  },
);

ApprovalNode.displayName = "ApprovalNode";
