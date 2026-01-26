import { ShieldCheck } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface ValidateNodeData {
  label: string;
  description?: string;
  schema?: string;
  source?: string;
  onNodeSelect?: (node: {
    id: string;
    data: ValidateNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

/** Truncate schema for display. */
const truncateSchema = (schema: string, maxLength = 25): string => {
  if (schema.length <= maxLength) return schema;
  return `${schema.slice(0, maxLength)}...`;
};

export const ValidateNode = memo(
  ({ data, id }: { data: ValidateNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "validateNode" });
    };

    const schema = data.schema || "";

    return (
      <BaseNode
        id={id}
        theme="validate"
        icon={ShieldCheck}
        label={data.label || "Validate"}
        description={data.description}
        badge="Validate"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow
          label="Schema"
          value={schema ? truncateSchema(schema) : "Not configured"}
        />
      </BaseNode>
    );
  },
);

ValidateNode.displayName = "ValidateNode";
