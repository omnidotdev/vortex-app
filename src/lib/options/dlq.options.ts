import { queryOptions } from "@tanstack/react-query";

import { API_BASE_URL } from "@/lib/config/env.config";
import getAuthHeaders from "@/lib/graphql/getAuthHeaders";

import type { DlqFilters, DlqListResponse, DlqStats } from "@/lib/types/dlq";

/**
 * Fetch a DLQ endpoint with auth headers and structured error handling.
 *
 * @param path - API path (e.g. `/api/v1/dlq`)
 * @param organizationId - Organization to scope the request to
 */
async function fetchDlq<T>(path: string, organizationId: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      ...(await getAuthHeaders()),
      "X-Organization-Id": organizationId,
    },
  });

  if (!response.ok) {
    throw new Error(`DLQ fetch failed (${response.status}): ${path}`);
  }

  return response.json();
}

/**
 * Determine whether a failed DLQ query should be retried.
 * Never retry client errors (4xx) except 429 (rate limit).
 */
function dlqRetry(failureCount: number, error: Error): boolean {
  if (failureCount >= 2) return false;
  if (error.message.includes("429")) return true;
  if (error.message.match(/\(4\d{2}\)/)) return false;
  return true;
}

/**
 * Query options for fetching paginated DLQ events.
 */
const dlqEventsOptions = (filters: DlqFilters, organizationId: string) =>
  queryOptions<DlqListResponse>({
    queryKey: ["dlq", "events", organizationId, filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters.page) params.set("page", String(filters.page));
      if (filters.limit) params.set("limit", String(filters.limit));
      if (filters.errorCode) params.set("errorCode", filters.errorCode);
      if (filters.eventType) params.set("eventType", filters.eventType);

      return fetchDlq<DlqListResponse>(
        `/api/v1/dlq?${params.toString()}`,
        organizationId,
      );
    },
    retry: dlqRetry,
  });

/**
 * Query options for fetching DLQ aggregate stats.
 */
const dlqStatsOptions = (organizationId: string) =>
  queryOptions<DlqStats>({
    queryKey: ["dlq", "stats", organizationId],
    queryFn: () => fetchDlq<DlqStats>("/api/v1/dlq/stats", organizationId),
    retry: dlqRetry,
  });

export { dlqEventsOptions, dlqStatsOptions };
