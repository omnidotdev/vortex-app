import { Cable } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeCodeBlock, NodeInfoRow } from "./BaseNode";

interface MCPNodeData {
  label: string;
  description?: string;
  serverName?: string;
  toolName?: string;
  inputs?: Record<string, unknown>;
  onNodeSelect?: (node: {
    id: string;
    data: MCPNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const MCPNode = memo(
  ({ data, id }: { data: MCPNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "mcpNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="mcp"
        icon={Cable}
        label={data.label || "MCP Tool"}
        description={data.description}
        badge="MCP"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        {data.serverName && (
          <NodeInfoRow label="Server" value={data.serverName} />
        )}
        {data.toolName && <NodeCodeBlock>{data.toolName}()</NodeCodeBlock>}
      </BaseNode>
    );
  },
);

MCPNode.displayName = "MCPNode";
