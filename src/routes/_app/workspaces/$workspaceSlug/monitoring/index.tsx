import { createFileRoute, notFound } from "@tanstack/react-router";
import { Suspense, useEffect, useState } from "react";

import DateRangePicker from "@/components/monitoring/DateRangePicker";
import ErrorTable from "@/components/monitoring/ErrorTable";
import ExecutionTimeline from "@/components/monitoring/ExecutionTimeline";
import MonthlyRunsCard from "@/components/monitoring/MonthlyRunsCard";
import StatsCards from "@/components/monitoring/StatsCards";
import { isSelfHosted } from "@/lib/config/env.config";
import { SELF_HOSTED_LIMITS, getLimitsForPlan } from "@/lib/constants/tiers";
import { getSubscription } from "@/server/functions/subscriptions";

import type { DateRange } from "@/components/monitoring/types";
import type { Subscription } from "@/lib/providers/billing";

/**
 * Default to a 7-day range. Only called client-side to avoid hydration mismatch.
 */
function getDefaultRange(): DateRange {
  return {
    since: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    until: new Date().toISOString(),
  };
}

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/monitoring/",
)({
  loader: async ({ context: { organizationId } }) => {
    if (!organizationId) throw notFound();

    let subscription: Subscription | null = null;

    if (!isSelfHosted) {
      try {
        subscription = await getSubscription({
          data: { organizationId },
        });
      } catch {
        // Fall back to null (shows free tier)
      }
    }

    return { organizationId, subscription };
  },
  component: MonitoringPage,
});

/**
 * Skeleton placeholder for loading states.
 */
function CardsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={`skeleton-${i}`}
          className="h-24 animate-pulse rounded-lg border bg-muted/30"
        />
      ))}
    </div>
  );
}

/**
 * Skeleton for the timeline chart area.
 */
function TimelineSkeleton() {
  return (
    <div className="h-[368px] animate-pulse rounded-lg border bg-muted/30" />
  );
}

/**
 * Skeleton for the error table.
 */
function TableSkeleton() {
  return <div className="h-64 animate-pulse rounded-lg border bg-muted/30" />;
}

/**
 * Monitoring dashboard page.
 */
function MonitoringPage() {
  const { subscription } = Route.useLoaderData();
  const { workspaceSlug } = Route.useParams();

  const limits = isSelfHosted
    ? SELF_HOSTED_LIMITS
    : getLimitsForPlan(subscription?.product?.name);

  const [preset, setPreset] = useState("7d");
  const [range, setRange] = useState<DateRange | null>(null);

  // Initialize date range client-side to avoid hydration mismatch
  useEffect(() => {
    setRange(getDefaultRange());
  }, []);

  const handleRangeChange = (newPreset: string, newRange: DateRange) => {
    setPreset(newPreset);
    setRange(newRange);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-2xl">Monitoring</h1>
          <p className="mt-1 text-muted-foreground">
            Track workflow execution health and performance
          </p>
        </div>
        <DateRangePicker value={preset} onChange={handleRangeChange} />
      </div>

      {range ? (
        <>
          {/* Stats cards */}
          <div className="mt-6">
            <Suspense fallback={<CardsSkeleton />}>
              <StatsCards since={range.since} until={range.until} />
            </Suspense>
          </div>

          {/* Monthly runs usage */}
          <div className="mt-6">
            <Suspense
              fallback={
                <div className="h-24 animate-pulse rounded-lg border bg-muted/30" />
              }
            >
              <MonthlyRunsCard
                runsPerMonthLimit={limits.runsPerMonth}
                workspaceSlug={workspaceSlug}
              />
            </Suspense>
          </div>

          {/* Timeline chart */}
          <div className="mt-6">
            <Suspense fallback={<TimelineSkeleton />}>
              <ExecutionTimeline since={range.since} until={range.until} />
            </Suspense>
          </div>

          {/* Error table */}
          <div className="mt-6">
            <Suspense fallback={<TableSkeleton />}>
              <ErrorTable since={range.since} />
            </Suspense>
          </div>
        </>
      ) : (
        <>
          <div className="mt-6">
            <CardsSkeleton />
          </div>
          <div className="mt-6">
            <TimelineSkeleton />
          </div>
          <div className="mt-6">
            <TableSkeleton />
          </div>
        </>
      )}
    </div>
  );
}
