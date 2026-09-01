import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AlertCircle, AlertTriangle, Gauge, Loader2 } from "lucide-react";
import { useMemo } from "react";

import UsageCounter from "@/components/UsageCounter";
import { StatsAccessError } from "@/lib/errors/statsAccess";
import { orgStatsOptions } from "@/lib/options/stats.options";
import StatsAccessDenied from "./StatsAccessDenied";

/**
 * Compute the start-of-month ISO string for the current billing period.
 */
function getMonthStart(): string {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
}

/**
 * Round a date to the nearest hour to produce a stable query key.
 * Prevents every render from generating a unique "until" timestamp
 * which would bypass the query cache and cause duplicate requests.
 */
function getStableNow(): string {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  return now.toISOString();
}

type MonthlyRunsCardProps = {
  runsPerMonthLimit: number | null;
  workspaceSlug: string;
};

/**
 * Card showing monthly workflow run usage against the plan limit.
 */
function MonthlyRunsCard({
  runsPerMonthLimit,
  workspaceSlug,
}: MonthlyRunsCardProps) {
  const { monthStart, now } = useMemo(
    () => ({ monthStart: getMonthStart(), now: getStableNow() }),
    [],
  );

  const {
    data: stats,
    isLoading,
    isError,
    error,
  } = useQuery(orgStatsOptions({ since: monthStart, until: now }));

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
        <p className="text-sm">Failed to load usage data</p>
      </div>
    );
  }

  const current = stats.total;
  const isAtLimit = runsPerMonthLimit !== null && current >= runsPerMonthLimit;
  const isNearLimit =
    runsPerMonthLimit !== null && current / runsPerMonthLimit >= 0.8;

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Gauge className="h-4 w-4" />
        <span>Runs This Month</span>
      </div>
      <UsageCounter current={current} limit={runsPerMonthLimit} />
      {isAtLimit && (
        <div className="mt-3 flex items-center gap-2 text-red-600 text-sm dark:text-red-400">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <p>
            Monthly run limit reached.{" "}
            <Link
              to="/@{$workspaceSlug}/~/settings"
              params={{ workspaceSlug }}
              className="font-medium underline underline-offset-2"
            >
              Upgrade for more
            </Link>
            .
          </p>
        </div>
      )}
      {!isAtLimit && isNearLimit && (
        <div className="mt-3 flex items-center gap-2 text-amber-600 text-sm dark:text-amber-400">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <p>
            Approaching monthly run limit.{" "}
            <Link
              to="/@{$workspaceSlug}/~/settings"
              params={{ workspaceSlug }}
              className="font-medium underline underline-offset-2"
            >
              Upgrade for more
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}

export default MonthlyRunsCard;
