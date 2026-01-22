import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth/authClient";

export const Route = createFileRoute("/_public/pricing")({
  component: PricingPage,
});

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals getting started",
    features: [
      "5 workflows",
      "100 runs/day",
      "2 plugins",
      "3 integrations",
      "3 team members",
      "Community support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Basic",
    price: "$29",
    period: "/month",
    description: "For growing teams",
    features: [
      "25 workflows",
      "1,000 runs/day",
      "10 plugins",
      "10 integrations",
      "10 team members",
      "Email support",
    ],
    cta: "Start Trial",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$99",
    period: "/month",
    description: "For larger organizations",
    features: [
      "Unlimited workflows",
      "Unlimited runs",
      "Unlimited plugins",
      "Unlimited integrations",
      "Unlimited team members",
      "Priority support",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

function PricingPage() {
  const handleSignIn = () => {
    authClient.signIn.oauth2({
      providerId: "omni",
      callbackURL: "/workspaces",
    });
  };

  return (
    <div className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="font-bold text-4xl sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that fits your needs
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border bg-card p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "glow-lg border-primary/50"
                  : "hover:glow-sm hover:border-primary/20"
              }`}
            >
              <h3 className="font-semibold text-xl">{plan.name}</h3>
              <div className="mt-4">
                <span className="font-bold text-4xl">{plan.price}</span>
                {plan.period && (
                  <span className="text-muted-foreground">{plan.period}</span>
                )}
              </div>
              <p className="mt-2 text-muted-foreground text-sm">
                {plan.description}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={handleSignIn}
                variant={plan.highlighted ? "default" : "outline"}
                className="mt-8 w-full"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
