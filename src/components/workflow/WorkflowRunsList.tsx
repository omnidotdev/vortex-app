import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ChevronRight, Clock, History } from "lucide-react";

import { RunStatusBadge } from "./RunStatusBadge";

dayjs.extend(relativeTime);

interface RunData {
  rowId: string;
  status: string;
  startedAt?: Date | string | null;
  completedAt?: Date | string | null;
  error?: string | null;
  createdAt?: Date | string | null;
  workflowStepLogs: {
    nodes: Array<{ rowId: string; status: string }>;
  };
}

interface WorkflowRunsListProps {
  runs: RunData[];
  totalCount: number;
  onSelectRun: (runId: string) => void;
  selectedRunId?: string | null;
}

function toDate(value: Date | string | null | undefined): Date | null {
  if (!value) return null;
  return value instanceof Date ? value : new Date(value);
}

function formatDuration(
  startedAt?: Date | string | null,
  completedAt?: Date | string | null,
): string {
  const start = toDate(startedAt);
  if (!start) return "-";

  const end = toDate(completedAt);
  if (!end) return "running...";
  const durationMs = end.getTime() - start.getTime();

  if (durationMs < 1000) return `${durationMs}ms`;
  if (durationMs < 60000) return `${(durationMs / 1000).toFixed(1)}s`;
  if (durationMs < 3600000)
    return `${Math.floor(durationMs / 60000)}m ${Math.floor((durationMs % 60000) / 1000)}s`;
  return `${Math.floor(durationMs / 3600000)}h ${Math.floor((durationMs % 3600000) / 60000)}m`;
}

export function WorkflowRunsList({
  runs,
  totalCount,
  onSelectRun,
  selectedRunId,
}: WorkflowRunsListProps) {
  if (runs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <History className="h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 font-medium text-muted-foreground">No runs yet</h3>
        <p className="mt-1 text-muted-foreground text-sm">
          Execute your workflow to see run history here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="text-muted-foreground text-sm">
          {totalCount} run{totalCount !== 1 ? "s" : ""}
        </span>
      </div>

      {runs.map((run) => {
        const stepCount = run.workflowStepLogs.nodes.length;
        const completedSteps = run.workflowStepLogs.nodes.filter(
          (s) => s.status === "completed",
        ).length;

        return (
          <button
            key={run.rowId}
            type="button"
            onClick={() => onSelectRun(run.rowId)}
            className={`flex w-full items-center justify-between rounded-md border p-3 text-left transition-colors hover:bg-muted/50 ${
              selectedRunId === run.rowId
                ? "border-primary bg-muted/50"
                : "border-border"
            }`}
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <RunStatusBadge status={run.status} />
                {stepCount > 0 && (
                  <span className="text-muted-foreground text-xs">
                    {completedSteps}/{stepCount} steps
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-muted-foreground text-xs">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDuration(run.startedAt, run.completedAt)}
                </span>
                {run.createdAt && (
                  <span>{dayjs(toDate(run.createdAt)).fromNow()}</span>
                )}
              </div>

              {run.error && (
                <p className="line-clamp-1 text-red-600 text-xs">{run.error}</p>
              )}
            </div>

            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </button>
        );
      })}
    </div>
  );
}
