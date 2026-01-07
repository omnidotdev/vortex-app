import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  Clock,
  Loader2,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

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

interface StepLogItemProps {
  step: StepLogData;
  index: number;
}

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Circle className="h-4 w-4 text-muted-foreground" />,
  running: <Loader2 className="h-4 w-4 animate-spin text-blue-500" />,
  completed: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  failed: <AlertCircle className="h-4 w-4 text-red-500" />,
  skipped: <Circle className="h-4 w-4 text-gray-400" />,
};

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
  return `${Math.floor(durationMs / 60000)}m ${Math.floor((durationMs % 60000) / 1000)}s`;
}

function JsonPreview({ data, label }: { data: unknown; label: string }) {
  if (data === null || data === undefined) return null;

  return (
    <div className="mt-2">
      <span className="text-muted-foreground text-xs">{label}:</span>
      <pre className="mt-1 max-h-40 overflow-auto rounded bg-muted p-2 font-mono text-xs">
        {String(JSON.stringify(data, null, 2))}
      </pre>
    </div>
  );
}

export function StepLogItem({ step, index }: StepLogItemProps) {
  const [isExpanded, setIsExpanded] = useState(step.status === "failed");

  const icon = statusIcons[step.status] || statusIcons.pending;
  const hasDetails = step.input || step.output || step.error;

  return (
    <div className="relative">
      {/* Timeline connector */}
      {index > 0 && (
        <div className="absolute top-0 left-[11px] h-3 w-0.5 -translate-y-full bg-border" />
      )}

      <div
        className={cn(
          "rounded-md border p-3 transition-colors",
          step.status === "failed" && "border-red-200 bg-red-50/50",
          step.status === "running" && "border-blue-200 bg-blue-50/50",
        )}
      >
        <button
          type="button"
          onClick={() => hasDetails && setIsExpanded(!isExpanded)}
          className="flex w-full items-start gap-3 text-left"
          disabled={!hasDetails}
        >
          <div className="mt-0.5 shrink-0">{icon}</div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {step.stepName || step.stepId}
              </span>
              <span className="rounded bg-muted px-1.5 py-0.5 text-muted-foreground text-xs">
                {step.stepType}
              </span>
            </div>

            <div className="mt-1 flex items-center gap-3 text-muted-foreground text-xs">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDuration(step.startedAt, step.completedAt)}
              </span>
              {step.startedAt && (
                <span>{dayjs(toDate(step.startedAt)).fromNow()}</span>
              )}
            </div>

            {step.error && !isExpanded && (
              <p className="mt-1 line-clamp-1 text-red-600 text-xs">
                {step.error}
              </p>
            )}
          </div>

          {hasDetails && (
            <div className="shrink-0">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          )}
        </button>

        {isExpanded && hasDetails && (
          <div className="mt-3 space-y-2 border-t pt-3">
            {step.error && (
              <div className="rounded bg-red-100 p-2">
                <span className="text-red-800 text-xs">Error:</span>
                <pre className="mt-1 whitespace-pre-wrap font-mono text-red-700 text-xs">
                  {step.error}
                </pre>
              </div>
            )}
            <JsonPreview data={step.input} label="Input" />
            <JsonPreview data={step.output} label="Output" />
          </div>
        )}
      </div>
    </div>
  );
}
