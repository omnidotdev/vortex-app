import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

import { workflowStatsOptions } from "@/lib/options/stats.options";
import computeSuccessRate from "@/lib/util/computeSuccessRate";
import { cn } from "@/lib/utils";

type WorkflowStatsProps = {
  workflowId: string;
  workspaceSlug: string;
};

/**
 * Format a millisecond duration to a human-readable string.
 */
function formatDuration(ms: number | null): string {
  if (ms === null) return "\u2014";
  if (ms < 1000) return `${Math.round(ms)}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60_000).toFixed(1)}m`;
}

/**
 * Determine the color class for the success rate.
 * @param rate - Success rate percentage (0-100).
 * @param hasResolved - Whether any runs have resolved (succeeded or failed).
 */
function successRateColor(rate: number, hasResolved: boolean): string {
  if (!hasResolved) return "text-muted-foreground";
  if (rate >= 95) return "text-green-500";
  if (rate >= 80) return "text-yellow-500";
  return "text-red-500";
}

/**
 * Compact stats panel for the workflow editor sidebar.
 */
function WorkflowStats({ workflowId, workspaceSlug }: WorkflowStatsProps) {
  const [timeRange, setTimeRange] = useState<{
    since: string;
    until: string;
  } | null>(null);

  useEffect(() => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    setTimeRange({
      since: sevenDaysAgo.toISOString(),
      until: now.toISOString(),
    });
  }, []);

  const since = timeRange?.since ?? "";
  const until = timeRange?.until ?? "";

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery(workflowStatsOptions({ workflowId, since, until }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="flex flex-col items-center gap-2 p-8 text-muted-foreground">
        <AlertCircle className="h-5 w-5" />
        <p className="text-sm">Failed to load stats</p>
      </div>
    );
  }

  const hasResolved = stats.succeeded + stats.failed > 0;
  const successRate = computeSuccessRate(stats.succeeded, stats.failed);

  return (
    <div className="space-y-4 p-4">
      <h3 className="font-medium text-muted-foreground text-sm">Last 7 Days</h3>

      {/* Outcome stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Activity className="h-3 w-3" />
            Total
          </div>
          <p className="font-bold text-xl" suppressHydrationWarning>
            {stats.total.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <CheckCircle2 className="h-3 w-3" />
            Succeeded
          </div>
          <p
            className="font-bold text-green-500 text-xl"
            suppressHydrationWarning
          >
            {stats.succeeded.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <XCircle className="h-3 w-3" />
            Failed
          </div>
          <p
            className="font-bold text-red-500 text-xl"
            suppressHydrationWarning
          >
            {stats.failed.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <CheckCircle2 className="h-3 w-3" />
            Success Rate
          </div>
          <p
            className={cn(
              "font-bold text-xl",
              successRateColor(successRate, hasResolved),
            )}
          >
            {hasResolved ? `${successRate.toFixed(1)}%` : "\u2014"}
          </p>
        </div>
      </div>

      {/* Duration stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Clock className="h-3 w-3" />
            Avg Duration
          </div>
          <p className="font-semibold text-sm">
            {formatDuration(stats.avgDurationMs)}
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Clock className="h-3 w-3" />
            P95 Duration
          </div>
          <p className="font-semibold text-sm">
            {formatDuration(stats.p95DurationMs)}
          </p>
        </div>
      </div>

      {/* Cancelled count */}
      {stats.cancelled > 0 && (
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <AlertCircle className="h-3 w-3" />
            Cancelled
          </div>
          <p className="font-semibold text-sm" suppressHydrationWarning>
            {stats.cancelled.toLocaleString()}
          </p>
        </div>
      )}

      {/* Link to full dashboard */}
      <Link
        to="/workspaces/$workspaceSlug/monitoring"
        params={{ workspaceSlug }}
        className="flex items-center gap-1 text-primary text-sm hover:underline"
      >
        <Activity className="h-4 w-4" />
        View full dashboard
      </Link>
    </div>
  );
}

export default WorkflowStats;
