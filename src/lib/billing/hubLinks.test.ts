import { describe, expect, test } from "bun:test";

import {
  manageSubscriptionUrl,
  upgradePlanUrl,
  workspaceSettingsUrl,
} from "./hubLinks";

const HUB = "https://account.omni.dev";
const VORTEX = "https://vortex.omni.dev";

const params = (url: string) => Object.fromEntries(new URL(url).searchParams);

describe("workspaceSettingsUrl", () => {
  test("points at the workspace's settings page", () => {
    expect(workspaceSettingsUrl(`${VORTEX}/`, "acme")).toBe(
      `${VORTEX}/@acme/~/settings`,
    );
  });

  test("falls back to the browser's origin when the build has no base URL", () => {
    expect(workspaceSettingsUrl("", "acme")).toBe(
      `${window.location.origin}/@acme/~/settings`,
    );
  });
});

describe("upgradePlanUrl", () => {
  test("buys the plan on the account hub and returns to the workspace's settings", () => {
    const url = upgradePlanUrl(HUB, VORTEX, {
      plan: "pro",
      interval: "month",
      workspaceSlug: "acme",
    });

    expect(url.startsWith(`${HUB}/billing?`)).toBe(true);
    expect(params(url)).toEqual({
      product: "vortex",
      plan: "pro",
      interval: "month",
      workspace: "acme",
      return: `${VORTEX}/@acme/~/settings`,
    });
  });

  test("lets the hub ask for the workspace and returns to pricing", () => {
    expect(
      params(upgradePlanUrl(HUB, VORTEX, { plan: "team", interval: "year" })),
    ).toEqual({
      product: "vortex",
      plan: "team",
      interval: "year",
      return: `${VORTEX}/pricing`,
    });
  });

  test("opens the hub as the signed-in account", () => {
    expect(
      params(
        upgradePlanUrl(HUB, VORTEX, {
          plan: "pro",
          interval: "month",
          workspaceSlug: "acme",
          loginHint: "user-123",
        }),
      ),
    ).toHaveProperty("login_hint", "user-123");
    expect(
      params(upgradePlanUrl(HUB, VORTEX, { plan: "pro", interval: "month" })),
    ).not.toHaveProperty("login_hint");
  });

  test("is empty when no account hub is configured", () => {
    expect(
      upgradePlanUrl(undefined, VORTEX, { plan: "pro", interval: "month" }),
    ).toBe("");
  });
});

describe("manageSubscriptionUrl", () => {
  test("manages the workspace's plan on the account hub", () => {
    const url = manageSubscriptionUrl(HUB, VORTEX, "acme");

    expect(url.startsWith(`${HUB}/billing?`)).toBe(true);
    expect(params(url)).toEqual({
      product: "vortex",
      workspace: "acme",
      manage: "1",
      return: `${VORTEX}/@acme/~/settings`,
    });
  });

  test("opens the hub as the signed-in account", () => {
    expect(
      params(manageSubscriptionUrl(HUB, VORTEX, "acme", "user-123")),
    ).toHaveProperty("login_hint", "user-123");
    expect(
      params(manageSubscriptionUrl(HUB, VORTEX, "acme")),
    ).not.toHaveProperty("login_hint");
  });

  test("is empty when no account hub is configured", () => {
    expect(manageSubscriptionUrl("", VORTEX, "acme")).toBe("");
  });
});
