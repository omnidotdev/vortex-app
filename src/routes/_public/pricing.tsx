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
import { BASE_URL, isSelfHosted } from "@/lib/config/env.config";
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
      { name: "3 workflows" },
      { name: "500 runs/month" },
      { name: "5 integrations" },
      { name: "1 user" },
      { name: "Community support" },
    ],
  },
};

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
      { name: "Dedicated support" },
      { name: "Self-hosted option" },
      { name: "SOC 2 compliance" },
      { name: "On-premise deployment" },
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

const searchSchema = z.object({
  tier: z.enum(["free", "starter", "pro", "team", "enterprise"]).optional(),
});

export const Route = createFileRoute("/_public/pricing")({
  validateSearch: searchSchema,
  loader: async ({ context: { queryClient, session } }) => {
    // Only fetch prices in SaaS mode
    if (isSelfHosted) {
      return { prices: [], orgSubscriptions: {} };
    }

    const prices = await queryClient.ensureQueryData(pricesOptions());

    // Fetch subscriptions for all user organizations to determine current tiers
    const orgSubscriptions: Record<string, Subscription | null> = {};

    if (session?.organizations) {
      const subscriptionPromises = session.organizations.map(async (org) => {
        try {
          const subscription = await getSubscription({
            data: { organizationId: org.id },
          });
          return { orgId: org.id, subscription };
        } catch {
          return { orgId: org.id, subscription: null };
        }
      });

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
          <div className="rounded-2xl border border-primary/50 bg-card p-8 glow-lg">
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

  const filteredPrices = prices.filter(
    (price) => price.recurring?.interval === tabs.value,
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
                save 25%
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

                {filteredPrices.map((price) => (
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
