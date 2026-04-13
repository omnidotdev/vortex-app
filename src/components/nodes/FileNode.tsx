import { File } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

type FileOperation = "read" | "write" | "delete" | "list" | "exists";

interface FileNodeData {
  label: string;
  description?: string;
  operation?: FileOperation;
  provider?: string;
  providerConfig?: Record<string, unknown>;
  path?: string;
  content?: string;
  encoding?: string;
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: FileNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const FileNode = memo(
  ({ data, id }: { data: FileNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "fileNode" });
    };

    const truncatedPath = data.path
      ? data.path.length > 25
        ? `...${data.path.slice(-22)}`
        : data.path
      : "Not configured";

    return (
      <BaseNode
        id={id}
        theme="file"
        icon={File}
        label={data.label || "File Operation"}
        description={data.description}
        badge={data.operation || "read"}
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow label="Path" value={truncatedPath} />
        <NodeInfoRow
          label="Operation"
          value={data.operation || "Not configured"}
        />
      </BaseNode>
    );
  },
);

FileNode.displayName = "FileNode";
