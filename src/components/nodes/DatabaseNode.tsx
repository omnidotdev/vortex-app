"use client";

import { Database } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { Badge } from "@/components/ui/badge";

import { BaseNode, NodeCodeBlock, NodeInfoRow } from "./BaseNode";

type DatabaseOperation = "query" | "insert" | "update" | "delete";

interface DatabaseNodeData {
  label: string;
  description?: string;
  /** MCP server ID for the database */
  serverId?: string;
  /** Display name of the MCP server */
  serverName?: string;
  /** Database operation type */
  operation?: DatabaseOperation;
  /** SQL query or table name */
  query?: string;
  /** Query parameters */
  params?: Record<string, string>;
  /** Output variable name */
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: DatabaseNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

const operationLabels: Record<DatabaseOperation, string> = {
  query: "SELECT",
  insert: "INSERT",
  update: "UPDATE",
  delete: "DELETE",
};

const operationColors: Record<DatabaseOperation, string> = {
  query: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  insert: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  update: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  delete: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

export const DatabaseNode = memo(
  ({ data, id }: { data: DatabaseNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "databaseNode" });
    };

    // Truncate query for display
    const queryPreview = data.query
      ? data.query.substring(0, 50) + (data.query.length > 50 ? "..." : "")
      : undefined;

    return (
      <BaseNode
        id={id}
        theme="database"
        icon={Database}
        label={data.label || "Database"}
        description={data.description}
        badge="SQL"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        {data.serverName && (
          <NodeInfoRow label="Database" value={data.serverName} />
        )}
        {data.operation && (
          <Badge
            variant="outline"
            className={operationColors[data.operation]}
          >
            {operationLabels[data.operation]}
          </Badge>
        )}
        {queryPreview && <NodeCodeBlock>{queryPreview}</NodeCodeBlock>}
        {data.params && Object.keys(data.params).length > 0 && (
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Params: </span>
            {Object.keys(data.params).slice(0, 3).join(", ")}
            {Object.keys(data.params).length > 3 &&
              ` +${Object.keys(data.params).length - 3} more`}
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

DatabaseNode.displayName = "DatabaseNode";
