import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { AlertCircle, AlertTriangle, Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { StatsAccessError } from "@/lib/errors/statsAccess";
import { errorsStatsOptions } from "@/lib/options/stats.options";
import StatsAccessDenied from "./StatsAccessDenied";

/**
 * Format a timestamp as a relative time string (e.g. "2 hours ago").
 */
function formatRelativeTime(timestamp: string): string {
  const now = Date.now();
  const then = new Date(timestamp).getTime();
  const diffMs = now - then;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
}

/**
 * Truncate a string to a given length with an ellipsis.
 */
function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

type ErrorTableProps = {
  since: string;
};

/**
 * Top errors table for the monitoring dashboard.
 */
function ErrorTable({ since }: ErrorTableProps) {
  const { workspaceSlug } = useParams({ strict: false }) as {
    workspaceSlug: string;
  };

  const { data, isLoading, isError, error } = useQuery(
    errorsStatsOptions({ since, limit: 10 }),
  );

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

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-lg border py-12 text-muted-foreground">
        <AlertCircle className="h-5 w-5" />
        <p className="text-sm">Failed to load errors</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <div className="border-b px-4 py-3">
        <h2 className="font-semibold text-lg">Top Errors</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 font-medium text-sm">Error</th>
              <th className="px-4 py-3 font-medium text-sm">Workflow</th>
              <th className="px-4 py-3 font-medium text-sm">Occurrences</th>
              <th className="px-4 py-3 font-medium text-sm">Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {data.errors.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="py-12 text-center text-muted-foreground"
                >
                  <AlertTriangle className="mx-auto mb-2 h-8 w-8" />
                  <p>No errors in this period</p>
                </td>
              </tr>
            )}

            {data.errors.map((err) => (
              <tr
                key={`${err.workflowId}-${err.error}`}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <td
                  className="max-w-xs px-4 py-3 text-muted-foreground text-sm"
                  title={err.error}
                >
                  {truncate(err.error, 80)}
                </td>
                <td className="px-4 py-3 text-sm">
                  <Link
                    to="/@{$workspaceSlug}/workflows/$workflowId"
                    params={{
                      workspaceSlug,
                      workflowId: err.workflowId,
                    }}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {err.workflowName}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="secondary">{err.occurrences}</Badge>
                </td>
                <td
                  className="px-4 py-3 text-muted-foreground text-sm"
                  suppressHydrationWarning
                >
                  {formatRelativeTime(err.lastSeen)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ErrorTable;
