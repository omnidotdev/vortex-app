import { hubManageUrl, hubPlanUrl } from "@omnidotdev/providers/react";

import type { HubPlanInterval } from "@omnidotdev/providers/react";

/**
 * Plans are bought and managed on the Omni account hub, the one place every
 * product sells plans. Vortex shows its own pricing, but its plan and Manage
 * billing actions link to the hub, which confirms the plan (names and prices
 * from Aether), runs checkout or the billing portal, and returns here. Each
 * link carries the signed-in account's subject as `loginHint`, so the hub
 * opens as the same account. Each helper is empty when no account hub is
 * configured, so the action is hidden rather than dead
 */

const PRODUCT = "vortex";

/**
 * Vortex's absolute origin for a return link: the configured base URL, or the
 * browser's origin when the build carries none, so `return` stays absolute
 */
const resolveBaseUrl = (baseUrl: string | undefined): string | undefined => {
  const base =
    baseUrl ||
    (typeof window !== "undefined" ? window.location.origin : undefined);

  return base ? base.replace(/\/+$/, "") : undefined;
};

/** A workspace's settings page (where its plan lives), the hub's return */
export const workspaceSettingsUrl = (
  baseUrl: string | undefined,
  workspaceSlug: string,
): string | undefined => {
  const base = resolveBaseUrl(baseUrl);

  return base ? `${base}/@${workspaceSlug}/~/settings` : undefined;
};

/** The pricing page, the hub's return when no workspace was picked */
const pricingUrl = (baseUrl: string | undefined): string | undefined => {
  const base = resolveBaseUrl(baseUrl);

  return base ? `${base}/pricing` : undefined;
};

/**
 * Buy a Vortex plan on the account hub. Without a workspace the hub asks,
 * listing only workspaces the user owns or administers
 * @param accountBaseUrl - Account hub base URL
 * @param baseUrl - Vortex's base URL, for the return
 */
export const upgradePlanUrl = (
  accountBaseUrl: string | undefined,
  baseUrl: string | undefined,
  {
    plan,
    interval,
    workspaceSlug,
    loginHint,
  }: {
    plan: string;
    interval: HubPlanInterval;
    workspaceSlug?: string;
    /** The signed-in account's subject */
    loginHint?: string | null;
  },
): string =>
  hubPlanUrl(accountBaseUrl, {
    product: PRODUCT,
    plan,
    interval,
    workspace: workspaceSlug,
    returnUrl: workspaceSlug
      ? workspaceSettingsUrl(baseUrl, workspaceSlug)
      : pricingUrl(baseUrl),
    loginHint,
  });

/**
 * Manage a workspace's Vortex plan (change or cancel it, payment method,
 * invoices) on the account hub, returning to the workspace's settings page
 * @param accountBaseUrl - Account hub base URL
 * @param baseUrl - Vortex's base URL, for the return
 * @param workspaceSlug - Workspace whose plan to manage
 * @param loginHint - The signed-in account's subject
 */
export const manageSubscriptionUrl = (
  accountBaseUrl: string | undefined,
  baseUrl: string | undefined,
  workspaceSlug: string,
  loginHint?: string | null,
): string =>
  hubManageUrl(accountBaseUrl, {
    product: PRODUCT,
    workspace: workspaceSlug,
    returnUrl: workspaceSettingsUrl(baseUrl, workspaceSlug),
    loginHint,
  });
