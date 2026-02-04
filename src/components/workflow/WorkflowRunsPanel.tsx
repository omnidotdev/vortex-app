import { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { RunDetail } from "./RunDetail";
import { WorkflowRunsList } from "./WorkflowRunsList";

interface StepLogData {
  rowId: string;
  stepId: string;
  stepName?: string;
  stepType: string;
  status: string;
  input?: unknown;
  output?: unknown;
  error?: string | null;
  startedAt?: Date | string | null;
  completedAt?: Date | string | null;
}

interface RunData {
  rowId: string;
  status: string;
  startedAt?: Date | string | null;
  completedAt?: Date | string | null;
  error?: string | null;
  createdAt?: Date | string | null;
  input?: unknown;
  output?: unknown;
  workflowStepLogs: {
    nodes: StepLogData[];
  };
}

interface WorkflowRunsPanelProps {
  runs: RunData[];
  totalCount: number;
  /** Callback to notify parent of step status changes (for canvas highlighting) */
  onStepStatusChange?: (stepStatuses: Record<string, string>) => void;
}

export function WorkflowRunsPanel({
  runs,
  totalCount,
  onStepStatusChange,
}: WorkflowRunsPanelProps) {
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

  const selectedRun = selectedRunId
    ? runs.find((r) => r.rowId === selectedRunId)
    : null;

  if (selectedRun) {
    return (
      <RunDetail
        run={selectedRun}
        onBack={() => {
          setSelectedRunId(null);
          // Clear step statuses when going back
          onStepStatusChange?.({});
        }}
        onStepStatusChange={onStepStatusChange}
      />
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        <h2 className="mb-4 font-semibold">Execution History</h2>
        <WorkflowRunsList
          runs={runs}
          totalCount={totalCount}
          onSelectRun={setSelectedRunId}
          selectedRunId={selectedRunId}
        />
      </div>
    </ScrollArea>
  );
}
