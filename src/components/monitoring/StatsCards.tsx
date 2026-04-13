import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  GitBranch,
  Loader2,
  XCircle,
} from "lucide-react";

import { StatsAccessError } from "@/lib/errors/statsAccess";
import { orgStatsOptions } from "@/lib/options/stats.options";
import computeSuccessRate from "@/lib/util/computeSuccessRate";
import { cn } from "@/lib/utils";
import StatsAccessDenied from "./StatsAccessDenied";

import type { DateRange } from "./types";

/**
 * Format a number with locale grouping.
 */
function formatNumber(n: number): string {
  return n.toLocaleString();
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
 * Stats summary cards row for the monitoring dashboard.
 */
function StatsCards({ since, until }: DateRange) {
  const {
    data: stats,
    isLoading,
    isError,
    error,
  } = useQuery(orgStatsOptions({ since, until }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-lg border py-12">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error instanceof StatsAccessError) {
    return <StatsAccessDenied />;
  }

  if (isError || !stats) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-lg border py-12 text-muted-foreground">
        <AlertCircle className="h-5 w-5" />
        <p className="text-sm">Failed to load stats</p>
      </div>
    );
  }

  const hasResolved = stats.succeeded + stats.failed > 0;
  const successRate = computeSuccessRate(stats.succeeded, stats.failed);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Executions */}
      <div className="rounded-lg border p-4">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Activity className="h-4 w-4" />
          <span>Total Executions</span>
        </div>
        <p className="mt-2 font-bold text-3xl" suppressHydrationWarning>
          {formatNumber(stats.total)}
        </p>
      </div>

      {/* Success Rate */}
      <div className="rounded-lg border p-4">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <CheckCircle2 className="h-4 w-4" />
          <span>Success Rate</span>
        </div>
        <p
          className={cn(
            "mt-2 font-bold text-3xl",
            successRateColor(successRate, hasResolved),
          )}
        >
          {hasResolved ? `${successRate.toFixed(1)}%` : "\u2014"}
        </p>
      </div>

      {/* Failed */}
      <div className="rounded-lg border p-4">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <XCircle className="h-4 w-4" />
          <span>Failed</span>
        </div>
        <p className="mt-2 font-bold text-3xl" suppressHydrationWarning>
          {formatNumber(stats.failed)}
        </p>
      </div>

      {/* Active Workflows */}
      <div className="rounded-lg border p-4">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <GitBranch className="h-4 w-4" />
          <span>Active Workflows</span>
        </div>
        <p className="mt-2 font-bold text-3xl" suppressHydrationWarning>
          {formatNumber(stats.activeWorkflows)}
        </p>
      </div>
    </div>
  );
}

export default StatsCards;
