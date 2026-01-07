import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, Calendar, Clock, Hash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RunStatusBadge } from "./RunStatusBadge";
import { StepLogItem } from "./StepLogItem";

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

interface RunDetailProps {
  run: RunData;
  onBack: () => void;
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

  const end = toDate(completedAt) || new Date();
  const durationMs = end.getTime() - start.getTime();

  if (durationMs < 1000) return `${durationMs}ms`;
  if (durationMs < 60000) return `${(durationMs / 1000).toFixed(1)}s`;
  if (durationMs < 3600000)
    return `${Math.floor(durationMs / 60000)}m ${Math.floor((durationMs % 60000) / 1000)}s`;
  return `${Math.floor(durationMs / 3600000)}h ${Math.floor((durationMs % 3600000) / 60000)}m`;
}

export function RunDetail({ run, onBack }: RunDetailProps) {
  const steps = run.workflowStepLogs.nodes;

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="shrink-0 border-b p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-2 -ml-2"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to runs
        </Button>

        <div className="flex items-center gap-3">
          <RunStatusBadge status={run.status} />
          <h2 className="font-semibold">Run Details</h2>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Hash className="h-4 w-4" />
            <span className="truncate font-mono text-xs">
              {run.rowId.slice(0, 8)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatDuration(run.startedAt, run.completedAt)}</span>
          </div>
          {run.createdAt && (
            <div className="col-span-2 flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {formatDistanceToNow(toDate(run.createdAt)!, {
                  addSuffix: true,
                })}
              </span>
            </div>
          )}
        </div>

        {run.error && (
          <div className="mt-3 rounded bg-red-100 p-2">
            <span className="font-medium text-red-800 text-xs">Error:</span>
            <p className="mt-1 text-red-700 text-sm">{run.error}</p>
          </div>
        )}
      </div>

      {/* Step logs */}
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          <h3 className="mb-3 font-medium text-muted-foreground text-sm">
            Execution Steps ({steps.length})
          </h3>

          {steps.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground text-sm">
              No step logs available for this run.
            </p>
          ) : (
            <div className="space-y-2">
              {steps.map((step, index) => (
                <StepLogItem key={step.rowId} step={step} index={index} />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input/Output section */}
      {(run.input !== undefined || run.output !== undefined) && (
        <div className="shrink-0 border-t p-4">
          <h3 className="mb-2 font-medium text-muted-foreground text-sm">
            Workflow Data
          </h3>
          <div className="space-y-2">
            {run.input !== undefined && run.input !== null && (
              <div>
                <span className="text-muted-foreground text-xs">Input:</span>
                <pre className="mt-1 max-h-24 overflow-auto rounded bg-muted p-2 font-mono text-xs">
                  {JSON.stringify(run.input, null, 2)}
                </pre>
              </div>
            )}
            {run.output !== undefined && run.output !== null && (
              <div>
                <span className="text-muted-foreground text-xs">Output:</span>
                <pre className="mt-1 max-h-24 overflow-auto rounded bg-muted p-2 font-mono text-xs">
                  {JSON.stringify(run.output, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
