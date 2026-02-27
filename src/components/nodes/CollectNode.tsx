import { Combine } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface CollectEventMatcher {
  name: string;
  sourcePattern: string;
  typePattern: string;
}

interface CollectNodeData {
  label: string;
  description?: string;
  events?: CollectEventMatcher[];
  correlationKey?: string;
  timeout?: string;
  mode?: "all" | "any" | "n_of_m";
  minRequired?: number;
  onNodeSelect?: (node: {
    id: string;
    data: CollectNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const CollectNode = memo(
  ({ data, id }: { data: CollectNodeData; id: string }) => {
    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "collectNode" });
    };

    const modeDisplay = () => {
      switch (data.mode) {
        case "any":
          return "Any (first match)";
        case "n_of_m":
          return `${data.minRequired ?? 1} of ${data.events?.length ?? 0}`;
        case "all":
        default:
          return "All events";
      }
    };

    return (
      <BaseNode
        id={id}
        theme="wait"
        icon={Combine}
        label={data.label || "Collect Events"}
        description={data.description}
        badge="Collect"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        {data.correlationKey && (
          <NodeInfoRow label="Correlation" value={data.correlationKey} />
        )}
        <NodeInfoRow label="Mode" value={modeDisplay()} />
        {data.events && data.events.length > 0 && (
          <div className="mt-1 space-y-0.5">
            {data.events.map((evt) => (
              <div
                key={evt.name}
                className="text-xs text-muted-foreground truncate"
                title={`${evt.sourcePattern} / ${evt.typePattern}`}
              >
                <span className="font-medium text-foreground">
                  {evt.name}
                </span>
                {" "}
                <span className="opacity-70">
                  {evt.sourcePattern}:{evt.typePattern}
                </span>
              </div>
            ))}
          </div>
        )}
        {data.timeout && (
          <NodeInfoRow label="Timeout" value={data.timeout} />
        )}
      </BaseNode>
    );
  },
);

CollectNode.displayName = "CollectNode";
