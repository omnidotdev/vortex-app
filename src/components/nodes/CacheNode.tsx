import { Database } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface CacheNodeData {
  label: string;
  description?: string;
  operation?: "get" | "set" | "delete" | "getOrSet";
  key?: string;
  ttl?: number;
  onNodeSelect?: (node: {
    id: string;
    data: CacheNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const CacheNode = memo(
  ({ data, id }: { data: CacheNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "cacheNode" });
    };

    const getOperationDisplay = () => {
      const ops: Record<string, string> = {
        get: "Get",
        set: "Set",
        delete: "Delete",
        getOrSet: "Get or Set",
      };
      return ops[data.operation || "get"] || "Get";
    };

    return (
      <BaseNode
        id={id}
        theme="cache"
        icon={Database}
        label={data.label || "Cache"}
        description={data.description}
        badge={getOperationDisplay()}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Key" value={data.key || "Not configured"} />
        {data.ttl && <NodeInfoRow label="TTL" value={`${data.ttl}s`} />}
      </BaseNode>
    );
  },
);

CacheNode.displayName = "CacheNode";
