import { describe, expect, it } from "bun:test";

import computeSuccessRate from "@/lib/util/computeSuccessRate";

describe("computeSuccessRate", () => {
  it("should return 60% when 12 succeeded and 8 failed", () => {
    expect(computeSuccessRate(12, 8)).toBe(60);
  });

  it("should return 100% when all runs succeeded", () => {
    expect(computeSuccessRate(20, 0)).toBe(100);
  });

  it("should return 0% when all runs failed", () => {
    expect(computeSuccessRate(0, 8)).toBe(0);
  });

  it("should return 0 when no runs have resolved", () => {
    expect(computeSuccessRate(0, 0)).toBe(0);
  });

  it("should not be affected by pending/running runs (only uses succeeded + failed)", () => {
    // 5 succeeded, 5 failed out of 20 total (10 still running)
    // Rate should be 50%, not 25%
    expect(computeSuccessRate(5, 5)).toBe(50);
  });

  it("should handle single succeeded run", () => {
    expect(computeSuccessRate(1, 0)).toBe(100);
  });

  it("should handle single failed run", () => {
    expect(computeSuccessRate(0, 1)).toBe(0);
  });
});
