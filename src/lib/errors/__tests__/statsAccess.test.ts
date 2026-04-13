import { describe, expect, it } from "bun:test";

import { StatsAccessError } from "@/lib/errors/statsAccess";

describe("StatsAccessError", () => {
  it("should have status 403", () => {
    const error = new StatsAccessError("/api/v1/stats/organization");
    expect(error.status).toBe(403);
  });

  it("should have the correct name", () => {
    const error = new StatsAccessError("/api/v1/stats/organization");
    expect(error.name).toBe("StatsAccessError");
  });

  it("should include the path in the message", () => {
    const error = new StatsAccessError("/api/v1/stats/timeline");
    expect(error.message).toContain("/api/v1/stats/timeline");
  });

  it("should be an instance of Error", () => {
    const error = new StatsAccessError("/api/v1/stats/errors");
    expect(error).toBeInstanceOf(Error);
  });

  it("should be distinguishable from generic errors via instanceof", () => {
    const accessError = new StatsAccessError("/api/v1/stats/organization");
    const genericError = new Error(
      "Stats fetch failed (500): /api/v1/stats/organization",
    );

    expect(accessError instanceof StatsAccessError).toBe(true);
    expect(genericError instanceof StatsAccessError).toBe(false);
  });
});
