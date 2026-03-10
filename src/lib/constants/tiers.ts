import type { Price } from "@/lib/providers/billing";

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
      { name: "1,000 runs/month" },
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
  "Unlimited runs",
  "Unlimited integrations",
  "Unlimited users",
  "SSO/SAML",
  "Audit logs",
  "Full data control",
  "Custom plugins",
];
