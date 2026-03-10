import { useTabs } from "@ark-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";

import { PriceCard } from "@/components/pricing";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  TabsContent,
  TabsList,
  TabsProvider,
  TabsTrigger,
} from "@/components/ui/tabs";
import { isSelfHosted } from "@/lib/config/env.config";
import pricesOptions from "@/lib/options/prices.options";
import { getSubscription } from "@/server/functions/subscriptions";

import type { Price, Subscription } from "@/lib/providers/billing";

// Free tier placeholder for display
const FREE_PRICE: Price = {
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

// Starter tier placeholder for display
const STARTER_PRODUCT = {
  id: "starter-product",
  name: "Starter",
  description: "\uD83C\uDF2A\uFE0F Workflow automation for the decentralized web",
  marketing_features: [
    { name: "25 workflows" },
    { name: "10,000 runs/month" },
    { name: "All integrations" },
    { name: "2 users" },
    { name: "Email support" },
  ],
};

const STARTER_PRICE_MONTHLY: Price = {
  id: "starter-monthly",
  active: true,
  currency: "usd",
  unit_amount: 1200,
  recurring: { interval: "month", interval_count: 1 },
  metadata: { tier: "starter" },
  product: STARTER_PRODUCT,
};

const STARTER_PRICE_YEARLY: Price = {
  ...STARTER_PRICE_MONTHLY,
  id: "starter-yearly",
  unit_amount: 10800,
  recurring: { interval: "year", interval_count: 1 },
};

// Pro tier placeholder for display
const PRO_PRODUCT = {
  id: "pro-product",
  name: "Pro",
  description: "\uD83C\uDF2A\uFE0F Advanced workflow automation with full platform access",
  marketing_features: [
    { name: "Unlimited workflows" },
    { name: "50,000 runs/month" },
    { name: "All integrations" },
    { name: "5 users" },
    { name: "Priority support" },
    { name: "SSO/SAML" },
    { name: "Custom plugins" },
  ],
};

const PRO_PRICE_MONTHLY: Price = {
  id: "pro-monthly",
  active: true,
  currency: "usd",
  unit_amount: 3900,
  recurring: { interval: "month", interval_count: 1 },
  metadata: { tier: "pro" },
  product: PRO_PRODUCT,
};

const PRO_PRICE_YEARLY: Price = {
  ...PRO_PRICE_MONTHLY,
  id: "pro-yearly",
  unit_amount: 35100,
  recurring: { interval: "year", interval_count: 1 },
};

// Team tier placeholder for display
const TEAM_PRODUCT = {
  id: "team-product",
  name: "Team",
  description: "\uD83C\uDF2A\uFE0F Workflow automation at scale for organizations",
  marketing_features: [
    { name: "Unlimited workflows" },
    { name: "500,000 runs/month" },
    { name: "All integrations" },
    { name: "25 users" },
    { name: "Priority support" },
    { name: "SSO/SAML" },
    { name: "Audit logs" },
    { name: "SLA guarantee" },
  ],
};

const TEAM_PRICE_MONTHLY: Price = {
  id: "team-monthly",
  active: true,
  currency: "usd",
  unit_amount: 9900,
  recurring: { interval: "month", interval_count: 1 },
  metadata: { tier: "team" },
  product: TEAM_PRODUCT,
};

const TEAM_PRICE_YEARLY: Price = {
  ...TEAM_PRICE_MONTHLY,
  id: "team-yearly",
  unit_amount: 89100,
  recurring: { interval: "year", interval_count: 1 },
};

/** Fallback paid tiers when billing products are not yet configured */
const FALLBACK_PAID_PRICES: Price[] = [
  STARTER_PRICE_MONTHLY,
  STARTER_PRICE_YEARLY,
  PRO_PRICE_MONTHLY,
  PRO_PRICE_YEARLY,
  TEAM_PRICE_MONTHLY,
  TEAM_PRICE_YEARLY,
];

// Enterprise tier placeholder for display
const ENTERPRISE_PRICE: Price = {
  id: "enterprise",
  active: true,
  currency: "usd",
  unit_amount: null,
  recurring: null,
  metadata: { tier: "enterprise" },
  product: {
    id: "enterprise-product",
    name: "Enterprise",
    description: "For large organizations",
    marketing_features: [
      { name: "Unlimited everything" },
      { name: "Custom SLAs" },
      { name: "Dedicated support engineer" },
      { name: "Self-hosted deployment" },
      { name: "SOC 2 compliance" },
      { name: "Data residency controls" },
    ],
  },
};

const faqItems = [
  {
    question: "Can I cancel at any time?",
    answer:
      "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "You can export all your data at any time. After cancellation, your data will be retained for 30 days before being permanently deleted.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate the difference.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, all paid plans include a 14-day free trial. No credit card required to start.",
  },
];

const selfHostedFeatures = [
  "Unlimited workflows",
  "Unlimited runs",
  "Unlimited integrations",
  "Unlimited users",
  "SSO/SAML",
  "Audit logs",
  "Full data control",
  "Custom plugins",
];

/** Map legacy tier names to current values */
const TIER_ALIASES: Record<string, string> = {
  basic: "starter",
};

const searchSchema = z.object({
  tier: z
    .string()
    .transform((v) => TIER_ALIASES[v] ?? v)
    .pipe(z.enum(["free", "starter", "pro", "team", "enterprise"]))
    .optional(),
});

export const Route = createFileRoute("/_public/pricing")({
  validateSearch: searchSchema,
  loader: async ({ context: { queryClient, session } }) => {
    // Only fetch prices in SaaS mode
    if (isSelfHosted) {
      return {
        prices: [] as Price[],
        orgSubscriptions: {} as Record<string, Subscription | null>,
      };
    }

    const prices = await queryClient.ensureQueryData(pricesOptions());

    // Fetch subscriptions for all user organizations to determine current tiers
    const orgSubscriptions: Record<string, Subscription | null> = {};

    if (session?.organizations) {
      const subscriptionPromises = session.organizations.map(
        async (org: { id: string }) => {
          try {
            const subscription = await getSubscription({
              data: { organizationId: org.id },
            });
            return { orgId: org.id, subscription };
          } catch {
            return { orgId: org.id, subscription: null };
          }
        },
      );

      const results = await Promise.all(subscriptionPromises);
      for (const { orgId, subscription } of results) {
        orgSubscriptions[orgId] = subscription;
      }
    }

    return { prices, orgSubscriptions };
  },
  component: PricingPage,
});

function SelfHostedPricing() {
  return (
    <div className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h1 className="font-bold text-4xl sm:text-5xl">Self-Hosted</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            All features included with your self-hosted deployment
          </p>
        </div>

        <div className="mt-16">
          <div className="glow-lg rounded-2xl border border-primary/50 bg-card p-8">
            <h3 className="font-semibold text-xl">Enterprise</h3>
            <div className="mt-4">
              <span className="font-bold text-4xl">All Features</span>
            </div>
            <p className="mt-2 text-muted-foreground text-sm">
              Everything unlocked for your self-hosted instance
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {selfHostedFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SaaSPricing() {
  const { prices, orgSubscriptions } = Route.useLoaderData();

  const tabs = useTabs({ defaultValue: "month" });

  // Compute actual yearly discount from the lowest paid tier's monthly vs yearly price
  const computeYearlyDiscount = (): number => {
    const allPrices =
      prices.length > 0 ? prices : FALLBACK_PAID_PRICES;
    const monthlyStarter = allPrices.find(
      (p: Price) =>
        p.metadata?.tier === "starter" &&
        p.recurring?.interval === "month",
    );
    const yearlyStarter = allPrices.find(
      (p: Price) =>
        p.metadata?.tier === "starter" &&
        p.recurring?.interval === "year",
    );
    if (!monthlyStarter?.unit_amount || !yearlyStarter?.unit_amount) return 25;
    const fullYearly = monthlyStarter.unit_amount * 12;
    return Math.round(
      ((fullYearly - yearlyStarter.unit_amount) / fullYearly) * 100,
    );
  };
  const yearlyDiscount = computeYearlyDiscount();

  // Use Aether prices only if they include the expected tiers (starter/pro/team);
  // otherwise fall back to hardcoded values to avoid showing stale Stripe data
  const EXPECTED_TIERS = ["starter", "pro", "team"];
  const hasExpectedTiers =
    prices.length > 0 &&
    EXPECTED_TIERS.every((tier) =>
      prices.some((p: Price) => p.metadata?.tier === tier),
    );
  // Filter to expected tiers, then deduplicate by tier+interval (keep highest
  // price to discard legacy/stale Stripe products with outdated pricing)
  const activePrices = hasExpectedTiers
    ? prices.filter((p: Price) => EXPECTED_TIERS.includes(p.metadata?.tier))
    : FALLBACK_PAID_PRICES;

  const filteredPrices = activePrices
    .filter((price: Price) => price.recurring?.interval === tabs.value)
    .reduce<Price[]>((acc, price) => {
      const existing = acc.find((p) => p.metadata?.tier === price.metadata?.tier);
      if (!existing) return [...acc, price];
      // Keep the higher-priced (current) product, discard the legacy one
      if ((price.unit_amount ?? 0) > (existing.unit_amount ?? 0)) {
        return acc.map((p) =>
          p.metadata?.tier === price.metadata?.tier ? price : p,
        );
      }
      return acc;
    }, [])
    .sort(
      (a, b) =>
        EXPECTED_TIERS.indexOf(a.metadata?.tier ?? "") -
        EXPECTED_TIERS.indexOf(b.metadata?.tier ?? ""),
    );

  return (
    <div className="size-full pt-8">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-bold text-4xl text-foreground">
            Simple, transparent pricing
          </h1>

          <p className="text-muted-foreground">
            Free and open source. Pay only for what you need.
          </p>
        </div>

        <TabsProvider value={tabs} className="flex w-full flex-col">
          <TabsList className="place-self-center">
            <TabsTrigger value="month" className="rounded-lg">
              Monthly
            </TabsTrigger>

            <TabsTrigger value="year" className="relative rounded-lg">
              Yearly{" "}
              <Badge className="absolute -top-4 -right-4 rotate-12 px-1">
                save {yearlyDiscount}%
              </Badge>
            </TabsTrigger>
          </TabsList>

          <div className="pt-2">
            {(["month", "year"] as const).map((tab) => (
              <TabsContent
                key={tab}
                value={tab}
                className="flex flex-wrap gap-4"
              >
                <PriceCard
                  price={FREE_PRICE}
                  orgSubscriptions={orgSubscriptions}
                />

                {filteredPrices.map((price: Price) => (
                  <PriceCard
                    key={price.id}
                    price={price}
                    orgSubscriptions={orgSubscriptions}
                  />
                ))}

                <PriceCard
                  price={ENTERPRISE_PRICE}
                  orgSubscriptions={orgSubscriptions}
                />
              </TabsContent>
            ))}
          </div>
        </TabsProvider>

        <div className="mt-24 text-center">
          <h2 className="mb-4 font-bold text-2xl text-foreground">
            Frequently Asked Questions
          </h2>

          <AccordionRoot multiple className="mx-auto mt-8 grid max-w-3xl">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.question}
                value={item.question}
                className="border-0"
              >
                <AccordionItemTrigger className="text-lg">
                  {item.question}
                </AccordionItemTrigger>

                <AccordionItemContent className="text-left text-muted-foreground">
                  {item.answer}
                </AccordionItemContent>
              </AccordionItem>
            ))}
          </AccordionRoot>
        </div>
      </div>
    </div>
  );
}

function PricingPage() {
  if (isSelfHosted) {
    return <SelfHostedPricing />;
  }

  return <SaaSPricing />;
}
