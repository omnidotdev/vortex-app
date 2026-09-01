import { describe, expect, it } from "bun:test";

import {
  getFallbackLimits,
  limitsFromTierResponse,
  resolvePlanName,
} from "@/lib/constants/tiers";

import type { TierResponse } from "@/lib/constants/tiers";

const buildResponse = (
  tier: TierResponse["tier"],
  overrides: Partial<TierResponse["limits"]> = {},
): TierResponse => ({
  tier,
  limits: {
    max_workflows: 5,
    max_executions_per_month: 2500,
    max_integrations: 10,
    max_plugins: 2,
    max_users: 1,
    max_functions: 5,
    max_subscriptions: 25,
    max_mcp_servers: 5,
    max_routing_rules: 10,
    max_event_schemas: 10,
    sso_enabled: 0,
    audit_logs: 0,
    custom_plugins: 0,
    ...overrides,
  },
});

describe("limitsFromTierResponse", () => {
  it("maps free tier limits to UI shape", () => {
    const limits = limitsFromTierResponse(buildResponse("free"));
    expect(limits).toEqual({
      workflows: 5,
      executionsPerMonth: 2500,
      plugins: false,
    });
  });

  it("translates -1 to null (unlimited)", () => {
    const limits = limitsFromTierResponse(
      buildResponse("pro", {
        max_workflows: -1,
        max_executions_per_month: 50_000,
        custom_plugins: 1,
      }),
    );
    expect(limits.workflows).toBeNull();
    expect(limits.executionsPerMonth).toBe(50_000);
    expect(limits.plugins).toBe(true);
  });

  it("enables plugin upload when custom_plugins > 0", () => {
    const limits = limitsFromTierResponse(
      buildResponse("team", {
        max_workflows: -1,
        max_executions_per_month: 250_000,
        custom_plugins: 1,
      }),
    );
    expect(limits.plugins).toBe(true);
  });

  it("disables plugin upload when custom_plugins === 0 even if marketplace installs are allowed", () => {
    const limits = limitsFromTierResponse(
      buildResponse("free", { max_plugins: 2, custom_plugins: 0 }),
    );
    expect(limits.plugins).toBe(false);
  });
});

describe("resolvePlanName", () => {
  it("prefers the live subscription product name", () => {
    expect(resolvePlanName("Pro", "free")).toBe("Pro");
  });

  it("falls back to the entitlement tier when there is no subscription", () => {
    // The failed/absent subscription case: a paid entitlement is present but no
    // Stripe subscription. Must NOT collapse to the free plan
    expect(resolvePlanName(null, "pro")).toBe("Pro");
    expect(resolvePlanName(null, "team")).toBe("Team");
    expect(resolvePlanName(null, "enterprise")).toBe("Enterprise");
    expect(resolvePlanName(null, "free")).toBe("Free");
  });

  it("returns null only when there is genuinely neither", () => {
    expect(resolvePlanName(null, null)).toBeNull();
  });
});

describe("getFallbackLimits", () => {
  it("returns free-tier defaults", () => {
    expect(getFallbackLimits("free")).toEqual({
      workflows: 5,
      executionsPerMonth: 2_500,
      plugins: false,
    });
  });

  it("returns unlimited workflows for pro/team/enterprise", () => {
    expect(getFallbackLimits("pro").workflows).toBeNull();
    expect(getFallbackLimits("team").workflows).toBeNull();
    expect(getFallbackLimits("enterprise").workflows).toBeNull();
  });

  it("enables plugins for paid tiers", () => {
    expect(getFallbackLimits("pro").plugins).toBe(true);
    expect(getFallbackLimits("team").plugins).toBe(true);
    expect(getFallbackLimits("enterprise").plugins).toBe(true);
  });
});
