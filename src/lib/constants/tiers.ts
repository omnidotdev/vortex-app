import type { Price } from "@/lib/providers/billing";

/** Numeric plan limits by tier */
export type PlanLimits = {
  workflows: number | null;
  executionsPerMonth: number | null;
  plugins: boolean;
};

/** Default limits for the free tier */
export const FREE_LIMITS: PlanLimits = {
  workflows: 5,
  executionsPerMonth: 1_000,
  plugins: false,
};

/** Limits for the starter tier */
export const STARTER_LIMITS: PlanLimits = {
  workflows: 25,
  executionsPerMonth: 10_000,
  plugins: false,
};

/** Limits for the pro tier */
export const PRO_LIMITS: PlanLimits = {
  workflows: null,
  executionsPerMonth: 50_000,
  plugins: true,
};

/** Limits for the team tier */
export const TEAM_LIMITS: PlanLimits = {
  workflows: null,
  executionsPerMonth: 500_000,
  plugins: true,
};

/** Limits for self-hosted deployments (unlimited) */
export const SELF_HOSTED_LIMITS: PlanLimits = {
  workflows: null,
  executionsPerMonth: null,
  plugins: true,
};

/**
 * Derive plan limits from a subscription product name.
 * Falls back to free tier when no subscription is active.
 */
export function getLimitsForPlan(
  productName: string | null | undefined,
): PlanLimits {
  if (!productName) return FREE_LIMITS;

  const name = productName.toLowerCase();
  if (name.includes("team")) return TEAM_LIMITS;
  if (name.includes("pro")) return PRO_LIMITS;
  if (name.includes("starter")) return STARTER_LIMITS;

  return FREE_LIMITS;
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
      { name: "1,000 executions/month" },
      { name: "All integrations" },
      { name: "1 user" },
      { name: "Community support" },
    ],
  },
};

/** Feature name strings for the free tier */
export const FREE_TIER_FEATURES = FREE_PRICE.product.marketing_features.map(
  (f) => f.name,
);

/** Features available in self-hosted deployments */
export const SELF_HOSTED_FEATURES = [
  "Unlimited workflows",
  "Unlimited executions",
  "Unlimited integrations",
  "Unlimited users",
  "SSO/SAML",
  "Audit logs",
  "Full data control",
  "Custom plugins",
];
