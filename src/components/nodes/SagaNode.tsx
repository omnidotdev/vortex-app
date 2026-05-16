import { ArrowDownUp, Shield } from "lucide-react";
import { memo } from "react";
import { Position } from "reactflow";

import { BaseNode, NodeInfoRow } from "./BaseNode";

interface SagaStepDef {
  name: string;
  execute: { type: string };
  compensate: { type: string };
  timeout?: string;
  retries?: number;
}

interface SagaNodeData {
  label: string;
  description?: string;
  steps?: SagaStepDef[];
  parallel?: boolean;
  onNodeSelect?: (node: {
    id: string;
    data: SagaNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const SagaNode = memo(
  ({ data, id }: { data: SagaNodeData; id: string }) => {
    const stepCount = data.steps?.length || 0;

    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "sagaNode" });
    };

    return (
      <BaseNode
        id={id}
        theme="saga"
        icon={Shield}
        label={data.label || "Saga"}
        description={data.description}
        badge="Transaction"
        onClick={handleNodeClick}
        onDelete={data.onDelete}
        handles={[
          { type: "target", position: Position.Top },
          { type: "source", position: Position.Bottom },
        ]}
      >
        <NodeInfoRow
          label="Steps"
          value={`${stepCount} step${stepCount !== 1 ? "s" : ""}`}
        />
        <NodeInfoRow
          label="Mode"
          value={data.parallel ? "Parallel" : "Sequential"}
        />

        {/* Step summary showing execute/compensate pairs */}
        {data.steps && data.steps.length > 0 && (
          <div className="mt-1.5 space-y-1">
            {data.steps.slice(0, 3).map((step) => (
              <div
                key={step.name}
                className="flex items-center gap-1 text-[10px] text-muted-foreground"
              >
                <ArrowDownUp className="h-2.5 w-2.5 shrink-0" />
                <span className="truncate font-medium">{step.name}</span>
                <span className="shrink-0 opacity-60">
                  {step.execute.type}/{step.compensate.type}
                </span>
              </div>
            ))}
            {data.steps.length > 3 && (
              <div className="text-[10px] text-muted-foreground opacity-60">
                +{data.steps.length - 3} more
              </div>
            )}
          </div>
        )}
      </BaseNode>
    );
  },
);

SagaNode.displayName = "SagaNode";
