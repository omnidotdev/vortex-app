import { Eye } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface VisionNodeData {
  label: string;
  description?: string;
  model?: string;
  task?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: VisionNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const VisionNode = memo(
  ({ data, id }: { data: VisionNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "visionNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="vision"
        icon={Eye}
        label={data.label || "Vision"}
        description={data.description}
        badge="Vision"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Task" value={data.task || "Not configured"} />
        <NodeInfoRow
          label="Output"
          value={data.outputVariable || "Not configured"}
        />
      </BaseNode>
    );
  },
);

VisionNode.displayName = "VisionNode";
