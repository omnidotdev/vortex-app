import { Volume2 } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface AudioNodeData {
  label: string;
  description?: string;
  model?: string;
  task?: "transcribe" | "synthesize" | "analyze";
  outputVariable?: string;
  onNodeSelect?: (node: {
    id: string;
    data: AudioNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const AudioNode = memo(
  ({ data, id }: { data: AudioNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "audioNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="audio"
        icon={Volume2}
        label={data.label || "Audio"}
        description={data.description}
        badge="Audio"
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

AudioNode.displayName = "AudioNode";
