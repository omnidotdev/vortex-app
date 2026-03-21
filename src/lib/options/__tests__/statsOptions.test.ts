import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";

import { StatsAccessError } from "@/lib/errors/statsAccess";

// Mock env config
mock.module("@/lib/config/env.config", () => ({
  API_BASE_URL: "http://api.test",
}));

// Mock auth headers
mock.module("@/lib/graphql/getAuthHeaders", () => ({
  default: () => Promise.resolve({ Authorization: "Bearer test-token" }),
}));

/**
 * Replace globalThis.fetch with a stub that returns the given response.
 */
function stubFetch(status: number, body: unknown): void {
  globalThis.fetch = (() =>
    Promise.resolve(
      new Response(JSON.stringify(body), { status }),
    )) as unknown as typeof fetch;
}

describe("fetchStats error handling", () => {
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should throw StatsAccessError on 403 response", async () => {
    stubFetch(403, { error: "Access denied" });

    const { orgStatsOptions } = await import("@/lib/options/stats.options");
    const options = orgStatsOptions({
      since: "2026-01-01T00:00:00Z",
      until: "2026-01-07T00:00:00Z",
    });

    try {
      await options.queryFn!({} as never);
      expect.unreachable("Should have thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(StatsAccessError);
      expect((error as StatsAccessError).status).toBe(403);
    }
  });

  it("should throw generic Error on non-403 failures", async () => {
    stubFetch(500, { error: "Server error" });

    const { orgStatsOptions } = await import("@/lib/options/stats.options");
    const options = orgStatsOptions({
      since: "2026-01-01T00:00:00Z",
      until: "2026-01-07T00:00:00Z",
    });

    try {
      await options.queryFn!({} as never);
      expect.unreachable("Should have thrown");
    } catch (error) {
      expect(error).not.toBeInstanceOf(StatsAccessError);
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toContain("500");
    }
  });

  it("should return data on successful response", async () => {
    const mockData = {
      organizationId: "org-1",
      period: {
        since: "2026-01-01T00:00:00Z",
        until: "2026-01-07T00:00:00Z",
      },
      total: 42,
      succeeded: 40,
      failed: 2,
      cancelled: 0,
      activeWorkflows: 3,
    };

    stubFetch(200, mockData);

    const { orgStatsOptions } = await import("@/lib/options/stats.options");
    const options = orgStatsOptions({
      since: "2026-01-01T00:00:00Z",
      until: "2026-01-07T00:00:00Z",
    });

    const result = await options.queryFn!({} as never);
    expect(result).toEqual(mockData);
  });

  it("should throw StatsAccessError for timeline 403", async () => {
    stubFetch(403, { error: "Access denied" });

    const { timelineStatsOptions } = await import(
      "@/lib/options/stats.options"
    );
    const options = timelineStatsOptions({
      since: "2026-01-01T00:00:00Z",
      until: "2026-01-07T00:00:00Z",
      bucket: "day",
    });

    try {
      await options.queryFn!({} as never);
      expect.unreachable("Should have thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(StatsAccessError);
    }
  });

  it("should throw StatsAccessError for errors endpoint 403", async () => {
    stubFetch(403, { error: "Access denied" });

    const { errorsStatsOptions } = await import("@/lib/options/stats.options");
    const options = errorsStatsOptions({
      since: "2026-01-01T00:00:00Z",
      limit: 10,
    });

    try {
      await options.queryFn!({} as never);
      expect.unreachable("Should have thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(StatsAccessError);
    }
  });
});
