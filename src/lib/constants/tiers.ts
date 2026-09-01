import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";

import type { Price } from "@/lib/providers/billing";

/** Supported billing tiers */
export type Tier = "free" | "pro" | "team" | "enterprise";

/** Numeric plan limits by tier */
export type PlanLimits = {
  workflows: number | null;
  executionsPerMonth: number | null;
  plugins: boolean;
};

/**
 * Fallback limits per tier, mirroring omni-api `planConfigs.ts`.
 *
 * The SSOT is omni-api. These are last-resort defaults used only when the
 * `/api/v1/stats/tier` endpoint is unreachable (Aether outage, network blip).
 * Components should prefer fetching live limits from the API.
 */
const FALLBACK_BY_TIER: Record<Tier, PlanLimits> = {
  free: {
    workflows: 5,
    executionsPerMonth: 2_500,
    plugins: false,
  },
  pro: {
    workflows: null,
    executionsPerMonth: 50_000,
    plugins: true,
  },
  team: {
    workflows: null,
    executionsPerMonth: 250_000,
    plugins: true,
  },
  enterprise: {
    workflows: null,
    executionsPerMonth: null,
    plugins: true,
  },
};

/** Default limits when billing is not configured (self-hosted, unlimited) */
export const DEFAULT_LIMITS: PlanLimits = {
  workflows: null,
  executionsPerMonth: null,
  plugins: true,
};

/**
 * Convert a raw entitlement value from the API to a `PlanLimits` field.
 *
 * The API returns -1 for unlimited; UI components represent unlimited as `null`
 */
const normalizeLimit = (value: number | undefined | null): number | null => {
  if (value === undefined || value === null) return null;
  if (value === -1) return null;
  return value;
};

/**
 * Raw shape returned by `GET /api/v1/stats/tier`.
 */
export type TierResponse = {
  tier: Tier;
  limits: {
    max_workflows: number;
    max_executions_per_month: number;
    max_integrations: number;
    max_plugins: number;
    max_users: number;
    max_functions: number;
    max_subscriptions: number;
    max_mcp_servers: number;
    max_routing_rules: number;
    max_event_schemas: number;
    sso_enabled: number;
    audit_logs: number;
    custom_plugins: number;
  };
};

/**
 * Convert an API tier response into the UI's `PlanLimits` shape.
 */
export function limitsFromTierResponse(response: TierResponse): PlanLimits {
  return {
    workflows: normalizeLimit(response.limits.max_workflows),
    executionsPerMonth: normalizeLimit(
      response.limits.max_executions_per_month,
    ),
    // `plugins` gates custom plugin upload, which maps to the `custom_plugins`
    // entitlement (0 = disabled, >= 1 = enabled), NOT `max_plugins` (the
    // marketplace install count). Free tier can install marketplace plugins
    // but cannot upload custom ones
    plugins:
      response.limits.custom_plugins === -1 ||
      response.limits.custom_plugins > 0,
  };
}

/**
 * Return fallback limits for a given tier.
 *
 * Only used when the `/api/v1/stats/tier` endpoint is unavailable. Prefer the
 * live API response in all UI surfaces
 */
export function getFallbackLimits(tier: Tier): PlanLimits {
  return FALLBACK_BY_TIER[tier];
}

/**
 * The plan name to display on the billing surface. Prefers the live Stripe
 * subscription's product name; falls back to the entitlement `tier` value
 * (capitalized) so a failed or absent subscription read never renders a paid
 * workspace as free. That covers both a failed subscription lookup and a
 * comped/manually-granted tier that carries no Stripe subscription. Returns
 * `null` only when there is genuinely neither.
 */
export function resolvePlanName(
  subscriptionName: string | null,
  entitlementTier: string | null,
): string | null {
  if (subscriptionName) return subscriptionName;
  if (entitlementTier) return capitalizeFirstLetter(entitlementTier);
  return null;
}

/** Free tier placeholder price for display */
export const FREE_PRICE: Price = {
  id: "free",
  active: true,
  currency: "usd",
  unit_amount: 0,
  recurring: null,
  metadata: { tier: "free" },
  product: {
    id: "free-product",
    name: "Free",
    description: "For individuals exploring automation",
    marketing_features: [
      { name: "5 workflows" },
      { name: "2,500 executions/month" },
      { name: "All integrations" },
      { name: "10 connected accounts" },
      { name: "1 user" },
      { name: "Community support" },
    ],
  },
};

/** Feature name strings for the free tier */
export const FREE_TIER_FEATURES = FREE_PRICE.product.marketing_features.map(
  (f) => f.name,
);

/** Default features when billing is not configured */
export const DEFAULT_FEATURES = [
  "Unlimited workflows",
  "Unlimited executions",
  "Unlimited integrations",
  "Unlimited users",
  "SSO/SAML",
  "Audit logs",
  "Full data control",
  "Custom plugins",
];
