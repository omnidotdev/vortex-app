import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ArrowLeft, Calendar, Clock, Hash, Loader2, Wifi, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWorkflowRunStream } from "@/lib/hooks/useWorkflowRunStream";
import { RunStatusBadge } from "./RunStatusBadge";
import { StepLogItem } from "./StepLogItem";

dayjs.extend(relativeTime);

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
  /** Callback to notify parent of step status changes (for canvas highlighting) */
  onStepStatusChange?: (stepStatuses: Record<string, string>) => void;
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

export function RunDetail({ run, onBack, onStepStatusChange }: RunDetailProps) {
  // Use real-time streaming for in-progress runs
  const isRunning = run.status === "running" || run.status === "pending";
  const { run: streamedRun, isConnected, steps: streamedSteps } = useWorkflowRunStream(
    isRunning ? run.rowId : null,
  );

  // Use streamed data if available, otherwise fall back to initial data
  const currentRun = streamedRun || run;
  const steps = streamedRun?.workflowStepLogs.nodes || run.workflowStepLogs.nodes;

  // Notify parent of step status changes for canvas highlighting
  useEffect(() => {
    if (onStepStatusChange && steps.length > 0) {
      const stepStatuses: Record<string, string> = {};
      for (const step of steps) {
        stepStatuses[step.stepId] = step.status;
      }
      onStepStatusChange(stepStatuses);
    }
  }, [steps, onStepStatusChange]);

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
          <RunStatusBadge status={currentRun.status} />
          <h2 className="font-semibold">Run Details</h2>
          {isRunning && (
            <span className="flex items-center gap-1 text-xs">
              {isConnected ? (
                <>
                  <Wifi className="h-3 w-3 text-green-500" />
                  <span className="text-green-600 dark:text-green-400">Live</span>
                </>
              ) : (
                <>
                  <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                  <span className="text-muted-foreground">Connecting...</span>
                </>
              )}
            </span>
          )}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Hash className="h-4 w-4" />
            <span className="truncate font-mono text-xs">
              {currentRun.rowId.slice(0, 8)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatDuration(currentRun.startedAt, currentRun.completedAt)}</span>
          </div>
          {currentRun.createdAt && (
            <div className="col-span-2 flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{dayjs(toDate(currentRun.createdAt)).fromNow()}</span>
            </div>
          )}
        </div>

        {currentRun.error && (
          <div className="mt-3 rounded bg-red-100 p-2 dark:bg-red-900/50">
            <span className="font-medium text-red-800 text-xs dark:text-red-300">
              Error:
            </span>
            <p className="mt-1 text-red-700 text-sm dark:text-red-400">
              {currentRun.error}
            </p>
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
      {(currentRun.input !== undefined || currentRun.output !== undefined) && (
        <div className="shrink-0 border-t p-4">
          <h3 className="mb-2 font-medium text-muted-foreground text-sm">
            Workflow Data
          </h3>
          <div className="space-y-2">
            {currentRun.input !== undefined && currentRun.input !== null && (
              <div>
                <span className="text-muted-foreground text-xs">Input:</span>
                <pre className="mt-1 max-h-24 overflow-auto rounded bg-muted p-2 font-mono text-xs">
                  {JSON.stringify(currentRun.input, null, 2)}
                </pre>
              </div>
            )}
            {currentRun.output !== undefined && currentRun.output !== null && (
              <div>
                <span className="text-muted-foreground text-xs">Output:</span>
                <pre className="mt-1 max-h-24 overflow-auto rounded bg-muted p-2 font-mono text-xs">
                  {JSON.stringify(currentRun.output, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
