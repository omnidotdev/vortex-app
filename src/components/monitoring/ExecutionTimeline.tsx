import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { timelineStatsOptions } from "@/lib/options/stats.options";

import type { DateRange } from "./types";

/**
 * Determine the bucket size based on the time range span.
 * Use "hour" for ranges shorter than 3 days, "day" otherwise.
 */
function getBucket(since: string, until: string): "day" | "hour" {
  const diffMs = new Date(until).getTime() - new Date(since).getTime();
  const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
  return diffMs < threeDaysMs ? "hour" : "day";
}

/**
 * Format a timestamp for the X-axis label.
 */
function formatXAxis(timestamp: string, bucket: "day" | "hour"): string {
  const date = new Date(timestamp);

  if (bucket === "hour") {
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

/**
 * Execution timeline chart showing succeeded vs failed executions over time.
 */
function ExecutionTimeline({ since, until }: DateRange) {
  const bucket = getBucket(since, until);

  const { data: timeline } = useSuspenseQuery(
    timelineStatsOptions({ since, until, bucket }),
  );

  const chartData = useMemo(
    () =>
      timeline.data.map((point) => ({
        ...point,
        label: formatXAxis(point.timestamp, bucket),
      })),
    [timeline.data, bucket],
  );

  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 font-semibold text-lg">Execution Timeline</h2>

      {chartData.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          No execution data in this period
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                color: "hsl(var(--popover-foreground))",
                fontSize: "0.875rem",
              }}
              labelStyle={{ fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="succeeded"
              stackId="1"
              stroke="hsl(142, 71%, 45%)"
              fill="hsl(142, 71%, 45%)"
              fillOpacity={0.3}
              name="Succeeded"
            />
            <Area
              type="monotone"
              dataKey="failed"
              stackId="1"
              stroke="hsl(0, 84%, 60%)"
              fill="hsl(0, 84%, 60%)"
              fillOpacity={0.3}
              name="Failed"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ExecutionTimeline;
