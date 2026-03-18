import { useSuspenseQuery } from "@tanstack/react-query";
import { Activity, CheckCircle2, GitBranch, XCircle } from "lucide-react";

import { orgStatsOptions } from "@/lib/options/stats.options";
import computeSuccessRate from "@/lib/util/computeSuccessRate";
import { cn } from "@/lib/utils";

import type { DateRange } from "./types";

/**
 * Format a number with locale grouping.
 */
function formatNumber(n: number): string {
  return n.toLocaleString();
}

/**
 * Determine the color class for the success rate.
 */
function successRateColor(rate: number): string {
  if (rate >= 95) return "text-green-500";
  if (rate >= 80) return "text-yellow-500";
  return "text-red-500";
}

/**
 * Stats summary cards row for the monitoring dashboard.
 */
function StatsCards({ since, until }: DateRange) {
  const { data: stats } = useSuspenseQuery(orgStatsOptions({ since, until }));

  const successRate = computeSuccessRate(stats.succeeded, stats.failed);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Executions */}
      <div className="rounded-lg border p-4">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Activity className="h-4 w-4" />
          <span>Total Executions</span>
        </div>
        <p className="mt-2 font-bold text-3xl">{formatNumber(stats.total)}</p>
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
            successRateColor(successRate),
          )}
        >
          {successRate.toFixed(1)}%
        </p>
      </div>

      {/* Failed */}
      <div className="rounded-lg border p-4">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <XCircle className="h-4 w-4" />
          <span>Failed</span>
        </div>
        <p className="mt-2 font-bold text-3xl">{formatNumber(stats.failed)}</p>
      </div>

      {/* Active Workflows */}
      <div className="rounded-lg border p-4">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <GitBranch className="h-4 w-4" />
          <span>Active Workflows</span>
        </div>
        <p className="mt-2 font-bold text-3xl">
          {formatNumber(stats.activeWorkflows)}
        </p>
      </div>
    </div>
  );
}

export default StatsCards;
