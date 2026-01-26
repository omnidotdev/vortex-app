import { Workflow } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface SubworkflowNodeData {
  label: string;
  description?: string;
  workflowId?: string;
  waitForCompletion?: boolean;
  onNodeSelect?: (node: {
    id: string;
    data: SubworkflowNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const SubworkflowNode = memo(
  ({ data, id }: { data: SubworkflowNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "subworkflowNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="subworkflow"
        icon={Workflow}
        label={data.label || "Subworkflow"}
        description={data.description}
        badge="Call"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow
          label="Workflow"
          value={data.workflowId || "Not configured"}
        />
        <NodeInfoRow
          label="Wait"
          value={data.waitForCompletion !== false ? "Yes" : "Fire & forget"}
        />
      </BaseNode>
    );
  },
);

SubworkflowNode.displayName = "SubworkflowNode";
