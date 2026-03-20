import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, Gauge } from "lucide-react";

import UsageCounter from "@/components/UsageCounter";
import { orgStatsOptions } from "@/lib/options/stats.options";

/**
 * Compute the start-of-month ISO string for the current billing period.
 */
function getMonthStart(): string {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
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
  const monthStart = getMonthStart();
  const now = new Date().toISOString();

  const { data: stats } = useSuspenseQuery(
    orgStatsOptions({ since: monthStart, until: now }),
  );

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
              to="/workspaces/$workspaceSlug/settings"
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
              to="/workspaces/$workspaceSlug/settings"
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
