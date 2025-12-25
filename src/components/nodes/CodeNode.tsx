"use client";

import { Code2 } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeCodeBlock, NodeInfoRow } from "./BaseNode";

interface CodeNodeData {
  label: string;
  description?: string;
  /** MCP server ID for the code sandbox */
  serverId?: string;
  /** Display name of the MCP server */
  serverName?: string;
  /** JavaScript code to execute */
  code?: string;
  /** npm dependencies to install */
  dependencies?: string[];
  /** Input variable mappings */
  inputs?: Record<string, string>;
  /** Output variable name */
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: CodeNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const CodeNode = memo(
  ({ data, id }: { data: CodeNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "codeNode" });
    };

    // Get first line of code for preview
    const codePreview = data.code
      ? data.code.split("\n")[0].substring(0, 40) +
        (data.code.length > 40 ? "..." : "")
      : undefined;

    return (
      <BaseNode
        id={id}
        theme="code"
        icon={Code2}
        label={data.label || "Code"}
        description={data.description}
        badge="JS"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        {data.serverName && (
          <NodeInfoRow label="Sandbox" value={data.serverName} />
        )}
        {codePreview && <NodeCodeBlock>{codePreview}</NodeCodeBlock>}
        {data.dependencies && data.dependencies.length > 0 && (
          <div className="text-muted-foreground text-xs">
            <span className="font-medium">Deps: </span>
            {data.dependencies.slice(0, 3).join(", ")}
            {data.dependencies.length > 3 &&
              ` +${data.dependencies.length - 3} more`}
          </div>
        )}
        {data.outputVariable && (
          <NodeInfoRow
            label="Output"
            value={
              <code className="text-xs">
                {"{{" + data.outputVariable + "}}"}
              </code>
            }
          />
        )}
      </BaseNode>
    );
  },
);

CodeNode.displayName = "CodeNode";
