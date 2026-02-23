import { queryOptions } from "@tanstack/react-query";

import { API_BASE_URL } from "@/lib/config/env.config";
import { getCurrentAuthHeaders } from "@/lib/graphql/graphqlClientFactory";

import type { DlqFilters, DlqListResponse, DlqStats } from "@/lib/types/dlq";

/**
 * Query options for fetching paginated DLQ events.
 */
const dlqEventsOptions = (filters: DlqFilters) =>
  queryOptions<DlqListResponse>({
    queryKey: ["dlq", "events", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters.page) params.set("page", String(filters.page));
      if (filters.limit) params.set("limit", String(filters.limit));
      if (filters.errorCode) params.set("errorCode", filters.errorCode);
      if (filters.eventType) params.set("eventType", filters.eventType);

      const response = await fetch(
        `${API_BASE_URL}/api/v1/dlq?${params.toString()}`,
        { headers: getCurrentAuthHeaders() },
      );

      if (!response.ok) throw new Error("Failed to fetch DLQ events");

      return response.json();
    },
  });

/**
 * Query options for fetching DLQ aggregate stats.
 */
const dlqStatsOptions = () =>
  queryOptions<DlqStats>({
    queryKey: ["dlq", "stats"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/v1/dlq/stats`, {
        headers: getCurrentAuthHeaders(),
      });

      if (!response.ok) throw new Error("Failed to fetch DLQ stats");

      return response.json();
    },
  });

export { dlqEventsOptions, dlqStatsOptions };
