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
import { Button } from "@/components/ui/button";
import {
  TabsContent,
  TabsList,
  TabsProvider,
  TabsTrigger,
} from "@/components/ui/tabs";
import { hasBilling } from "@/lib/config/env.config";
import { DEFAULT_FEATURES, FREE_PRICE } from "@/lib/constants/tiers";
import pricesOptions from "@/lib/options/prices.options";
import { getSubscription } from "@/server/functions/subscriptions";

import type { Price, Subscription } from "@/lib/providers/billing";

// Enterprise tier placeholder for display (no price - contact sales)
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

const defaultFeatures = DEFAULT_FEATURES;

/** Map legacy tier names to current values */
const TIER_ALIASES: Record<string, string> = {
  basic: "pro",
  starter: "pro",
};

const searchSchema = z.object({
  tier: z
    .string()
    .transform((v) => TIER_ALIASES[v] ?? v)
    .pipe(z.enum(["free", "pro", "team", "enterprise"]))
    .optional(),
});

export const Route = createFileRoute("/_public/pricing")({
  validateSearch: searchSchema,
  loader: async ({ context: { queryClient, session } }) => {
    // Only fetch prices when billing is configured
    if (!hasBilling) {
      return {
        prices: [] as Price[],
        orgSubscriptions: {} as Record<string, Subscription | null>,
      };
    }

    let prices: Price[] = [];

    try {
      prices = await queryClient.ensureQueryData(pricesOptions());
    } catch {
      console.warn(
        "[pricing] Failed to fetch prices, billing service may be unavailable",
      );
    }

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

function DefaultPricing() {
  return (
    <div className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h1 className="font-bold text-4xl sm:text-5xl">All Features</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            All features included with your deployment
          </p>
        </div>

        <div className="mt-16">
          <div className="glow-lg rounded-2xl border border-primary/50 bg-card p-8">
            <h3 className="font-semibold text-xl">Enterprise</h3>
            <div className="mt-4">
              <span className="font-bold text-4xl">All Features</span>
            </div>
            <p className="mt-2 text-muted-foreground text-sm">
              Everything unlocked for your instance
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {defaultFeatures.map((feature) => (
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

/**
 * Render a "Contact us for pricing" CTA when Aether is unreachable and
 * we have no live pricing data. Free and Enterprise tiers are still shown
 * since they are not Stripe-priced.
 */
function ContactForPricingCard() {
  return (
    <div className="glow-lg flex min-w-[280px] max-w-sm flex-1 flex-col rounded-2xl border border-primary/50 bg-card p-8">
      <h3 className="font-semibold text-xl">Pro and Team</h3>
      <div className="mt-4">
        <span className="font-bold text-3xl">Contact us</span>
      </div>
      <p className="mt-2 text-muted-foreground text-sm">
        Live pricing is temporarily unavailable. Reach out and we will get back
        to you with current plans
      </p>
      <div className="mt-6">
        <Button asChild>
          <a href="mailto:hello@omni.dev">Contact sales</a>
        </Button>
      </div>
    </div>
  );
}

function SaaSPricing() {
  const { prices, orgSubscriptions } = Route.useLoaderData();

  const tabs = useTabs({ defaultValue: "month" });

  // Compute actual yearly discount from the lowest paid tier's monthly vs yearly price
  const computeYearlyDiscount = (): number => {
    const monthlyPro = prices.find(
      (p: Price) =>
        p.metadata?.tier === "pro" && p.recurring?.interval === "month",
    );
    const yearlyPro = prices.find(
      (p: Price) =>
        p.metadata?.tier === "pro" && p.recurring?.interval === "year",
    );
    if (!monthlyPro?.unit_amount || !yearlyPro?.unit_amount) return 20;
    const fullYearly = monthlyPro.unit_amount * 12;
    return Math.round(
      ((fullYearly - yearlyPro.unit_amount) / fullYearly) * 100,
    );
  };
  const yearlyDiscount = computeYearlyDiscount();

  // Source prices exclusively from Aether (omni-api planConfigs is the SSOT,
  // synced to Stripe via Mosaic). Never invent fallback numbers
  const EXPECTED_TIERS = ["pro", "team"];
  const activePrices: Price[] = prices.filter((p: Price) =>
    EXPECTED_TIERS.includes(p.metadata?.tier ?? ""),
  );

  const deduped: Price[] = [];
  for (const price of activePrices.filter(
    (p) => p.recurring?.interval === tabs.value,
  )) {
    const idx = deduped.findIndex(
      (p) => p.metadata?.tier === price.metadata?.tier,
    );
    if (idx === -1) {
      deduped.push(price);
    } else if ((price.unit_amount ?? 0) > (deduped[idx].unit_amount ?? 0)) {
      // Keep the higher-priced (current) product, discard the legacy one
      deduped[idx] = price;
    }
  }
  const filteredPrices = deduped.sort(
    (a, b) =>
      EXPECTED_TIERS.indexOf(a.metadata?.tier ?? "") -
      EXPECTED_TIERS.indexOf(b.metadata?.tier ?? ""),
  );
  const showContactFallback = filteredPrices.length === 0;

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

                {showContactFallback ? (
                  <ContactForPricingCard />
                ) : (
                  filteredPrices.map((price: Price) => (
                    <PriceCard
                      key={price.id}
                      price={price}
                      orgSubscriptions={orgSubscriptions}
                    />
                  ))
                )}

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
  if (!hasBilling) {
    return <DefaultPricing />;
  }

  return <SaaSPricing />;
}
