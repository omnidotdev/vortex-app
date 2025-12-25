"use client";

import { Bot, ImageIcon } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { Badge } from "@/components/ui/badge";

import { BaseNode, NodeCodeBlock, NodeInfoRow } from "./BaseNode";

interface LLMNodeData {
  label: string;
  description?: string;
  /** MCP server ID for the LLM provider */
  serverId?: string;
  /** Display name of the MCP server */
  serverName?: string;
  /** Model identifier (e.g., "gpt-4", "claude-3-opus") */
  model?: string;
  /** System prompt for the LLM */
  systemPrompt?: string;
  /** User prompt template (supports {{variable}} interpolation) */
  userPrompt?: string;
  /** Whether vision/image input is enabled */
  visionEnabled?: boolean;
  /** Output variable name */
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: LLMNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const LLMNode = memo(
  ({ data, id }: { data: LLMNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "llmNode" });
    };

    // Truncate prompts for display
    const truncateText = (text: string, maxLength = 50) => {
      if (text.length <= maxLength) return text;
      return `${text.substring(0, maxLength)}...`;
    };

    return (
      <BaseNode
        id={id}
        theme="llm"
        icon={Bot}
        label={data.label || "LLM"}
        description={data.description}
        badge="AI"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        {data.serverName && (
          <NodeInfoRow label="Provider" value={data.serverName} />
        )}
        {data.model && (
          <NodeCodeBlock>{data.model}</NodeCodeBlock>
        )}
        {data.systemPrompt && (
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">System: </span>
            {truncateText(data.systemPrompt, 40)}
          </div>
        )}
        {data.userPrompt && (
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Prompt: </span>
            {truncateText(data.userPrompt, 40)}
          </div>
        )}
        {data.visionEnabled && (
          <Badge variant="outline" className="gap-1 text-xs">
            <ImageIcon className="h-3 w-3" />
            Vision
          </Badge>
        )}
        {data.outputVariable && (
          <NodeInfoRow
            label="Output"
            value={<code className="text-xs">{"{{" + data.outputVariable + "}}"}</code>}
          />
        )}
      </BaseNode>
    );
  },
);

LLMNode.displayName = "LLMNode";
