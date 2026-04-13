import { FormInput } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface InputNodeData {
  label: string;
  description?: string;
  title?: string;
  fields?: Array<{ name: string; type: string; required?: boolean }>;
  timeout?: number;
  onNodeSelect?: (node: {
    id: string;
    data: InputNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const InputNode = memo(
  ({ data, id }: { data: InputNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "inputNode" });
    };

    const fieldCount = data.fields?.length || 0;

    return (
      <BaseNode
        id={id}
        theme="input"
        icon={FormInput}
        label={data.label || "Input"}
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
          label="Fields"
          value={fieldCount > 0 ? `${fieldCount} field(s)` : "None"}
        />
      </BaseNode>
    );
  },
);

InputNode.displayName = "InputNode";
