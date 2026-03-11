import { queryOptions } from "@tanstack/react-query";

import { API_BASE_URL } from "@/lib/config/env.config";
import getAuthHeaders from "@/lib/graphql/getAuthHeaders";

import type {
  ErrorsStats,
  OrgStats,
  TimelineStats,
  WorkflowStats,
} from "@/lib/types/stats";

/**
 * Query options for fetching organization-level execution stats.
 */
const orgStatsOptions = (params: { since: string; until: string }) =>
  queryOptions<OrgStats>({
    queryKey: ["stats", "organization", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        since: params.since,
        until: params.until,
      });

      const response = await fetch(
        `${API_BASE_URL}/api/v1/stats/organization?${searchParams.toString()}`,
        { headers: await getAuthHeaders() },
      );

      if (!response.ok) throw new Error("Failed to fetch organization stats");

      return response.json();
    },
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
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        since: params.since,
        until: params.until,
        bucket: params.bucket,
      });

      const response = await fetch(
        `${API_BASE_URL}/api/v1/stats/timeline?${searchParams.toString()}`,
        { headers: await getAuthHeaders() },
      );

      if (!response.ok) throw new Error("Failed to fetch timeline stats");

      return response.json();
    },
  });

/**
 * Query options for fetching top errors.
 */
const errorsStatsOptions = (params: { since: string; limit?: number }) =>
  queryOptions<ErrorsStats>({
    queryKey: ["stats", "errors", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams({ since: params.since });
      if (params.limit) searchParams.set("limit", String(params.limit));

      const response = await fetch(
        `${API_BASE_URL}/api/v1/stats/errors?${searchParams.toString()}`,
        { headers: await getAuthHeaders() },
      );

      if (!response.ok) throw new Error("Failed to fetch error stats");

      return response.json();
    },
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
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        since: params.since,
        until: params.until,
      });

      const response = await fetch(
        `${API_BASE_URL}/api/v1/stats/workflows/${params.workflowId}?${searchParams.toString()}`,
        { headers: await getAuthHeaders() },
      );

      if (!response.ok) throw new Error("Failed to fetch workflow stats");

      return response.json();
    },
  });

export {
  errorsStatsOptions,
  orgStatsOptions,
  timelineStatsOptions,
  workflowStatsOptions,
};
