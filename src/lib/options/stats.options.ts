import { queryOptions } from "@tanstack/react-query";

import { API_BASE_URL } from "@/lib/config/env.config";
import { StatsAccessError } from "@/lib/errors/statsAccess";
import getAuthHeaders from "@/lib/graphql/getAuthHeaders";

import type {
  ErrorsStats,
  OrgStats,
  TimelineStats,
  WorkflowStats,
} from "@/lib/types/stats";

/** 2 minutes — stats are not real-time, avoid rapid refetching */
const STATS_STALE_TIME = 2 * 60 * 1000;

/** 10 minutes — keep cached stats longer to reduce redundant fetches */
const STATS_GC_TIME = 10 * 60 * 1000;

/**
 * Retry with exponential backoff, respecting 429 rate limits.
 * @param failureCount - Number of consecutive failures
 * @param error - The error that triggered the retry
 * @returns Delay in ms before retrying, or false to stop
 */
function statsRetryDelay(failureCount: number, _error: Error): number {
  // Exponential backoff: 2s, 4s, 8s
  const baseDelay = Math.min(2000 * 2 ** failureCount, 30_000);
  // Add jitter to avoid thundering herd
  return baseDelay + Math.random() * 1000;
}

/**
 * Determine whether a failed stats query should be retried.
 * Never retry access-denied (403); stop after 3 attempts for others.
 */
function statsRetry(failureCount: number, error: Error): boolean {
  // Access denied — never retry, the UI handles this gracefully
  if (error instanceof StatsAccessError) return false;
  if (failureCount >= 3) return false;
  // Rate-limited — retry with backoff
  if (error.message.includes("429")) return true;
  // Other client errors (4xx) — do not retry
  if (error.message.match(/\(4\d{2}\)/)) return false;
  // Server errors or network failures — retry
  return true;
}

/** Shared query behavior for all stats endpoints */
const statsDefaults = {
  staleTime: STATS_STALE_TIME,
  gcTime: STATS_GC_TIME,
  refetchOnMount: false as const,
  refetchOnWindowFocus: false as const,
  retry: statsRetry,
  retryDelay: statsRetryDelay,
  // Prevent errors (especially expected 403s) from propagating to error
  // boundaries — each component handles its own error state inline
  throwOnError: false as const,
};

/**
 * Fetch a stats endpoint with auth headers, throwing a descriptive error
 * that includes the HTTP status for retry logic.
 */
async function fetchStats<T>(
  path: string,
  params: URLSearchParams,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}?${params.toString()}`, {
    headers: await getAuthHeaders(),
  });

  if (!response.ok) {
    if (response.status === 403) {
      throw new StatsAccessError(path);
    }

    throw new Error(`Stats fetch failed (${response.status}): ${path}`);
  }

  return response.json();
}

/**
 * Query options for fetching organization-level execution stats.
 */
const orgStatsOptions = (params: { since: string; until: string }) =>
  queryOptions<OrgStats>({
    queryKey: ["stats", "organization", params],
    queryFn: () =>
      fetchStats<OrgStats>(
        "/api/v1/stats/organization",
        new URLSearchParams({ since: params.since, until: params.until }),
      ),
    ...statsDefaults,
  });

/**
 * Query options for fetching the execution timeline.
 */
const timelineStatsOptions = (params: {
  since: string;
  until: string;
  bucket: "day" | "hour";
}) =>
  queryOptions<TimelineStats>({
    queryKey: ["stats", "timeline", params],
    queryFn: () =>
      fetchStats<TimelineStats>(
        "/api/v1/stats/timeline",
        new URLSearchParams({
          since: params.since,
          until: params.until,
          bucket: params.bucket,
        }),
      ),
    ...statsDefaults,
  });

/**
 * Query options for fetching top errors.
 */
const errorsStatsOptions = (params: { since: string; limit?: number }) =>
  queryOptions<ErrorsStats>({
    queryKey: ["stats", "errors", params],
    queryFn: () => {
      const searchParams = new URLSearchParams({ since: params.since });
      if (params.limit) searchParams.set("limit", String(params.limit));

      return fetchStats<ErrorsStats>("/api/v1/stats/errors", searchParams);
    },
    ...statsDefaults,
  });

/**
 * Query options for fetching per-workflow execution stats.
 */
const workflowStatsOptions = (params: {
  workflowId: string;
  since: string;
  until: string;
}) =>
  queryOptions<WorkflowStats>({
    queryKey: [
      "stats",
      "workflow",
      params.workflowId,
      { since: params.since, until: params.until },
    ],
    queryFn: () =>
      fetchStats<WorkflowStats>(
        `/api/v1/stats/workflows/${params.workflowId}`,
        new URLSearchParams({ since: params.since, until: params.until }),
      ),
    ...statsDefaults,
  });

export {
  errorsStatsOptions,
  orgStatsOptions,
  timelineStatsOptions,
  workflowStatsOptions,
};
