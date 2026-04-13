import { Bot } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface AgentNodeData {
  label: string;
  description?: string;
  agentType?: string;
  model?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: AgentNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const AgentNode = memo(
  ({ data, id }: { data: AgentNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "agentNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="agent"
        icon={Bot}
        label={data.label || "Agent"}
        description={data.description}
        badge="Agent"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Model" value={data.model || "Not configured"} />
        <NodeInfoRow
          label="Output"
          value={data.outputVariable || "Not configured"}
        />
      </BaseNode>
    );
  },
);

AgentNode.displayName = "AgentNode";
