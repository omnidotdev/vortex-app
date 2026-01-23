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
    description: "For individuals exploring automation",
    features: [
      "3 workflows",
      "500 runs/month",
      "5 integrations",
      "1 user",
      "Community support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "$19",
    period: "/month",
    description: "For individuals and small projects",
    features: [
      "10 workflows",
      "5,000 runs/month",
      "25 integrations",
      "3 users",
      "Email support",
    ],
    cta: "Start Trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For growing teams",
    features: [
      "50 workflows",
      "25,000 runs/month",
      "100 integrations",
      "10 users",
      "Priority support",
      "Custom plugins",
    ],
    cta: "Start Trial",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$149",
    period: "/month",
    description: "For scaling organizations",
    features: [
      "Unlimited workflows",
      "100,000 runs/month",
      "Unlimited integrations",
      "25 users",
      "SSO/SAML",
      "Audit logs",
    ],
    cta: "Start Trial",
    highlighted: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited everything",
      "Custom SLAs",
      "Dedicated support",
      "Self-hosted option",
      "SOC 2 compliance",
      "On-premise deployment",
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
