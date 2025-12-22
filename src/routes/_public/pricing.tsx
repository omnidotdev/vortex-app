import { createFileRoute, Link } from "@tanstack/react-router";

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
    authClient.signIn.social({ provider: "omni", callbackURL: "/workspaces" });
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold">Vortex</span>
          </Link>
          <button
            onClick={handleSignIn}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Pricing */}
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Simple, transparent pricing</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg border p-8 ${
                  plan.highlighted
                    ? "border-primary ring-2 ring-primary"
                    : ""
                }`}
              >
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <svg
                        className="h-4 w-4 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleSignIn}
                  className={`mt-8 w-full rounded-md px-4 py-2 text-sm font-medium ${
                    plan.highlighted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border hover:bg-accent"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>MIT License. Built with care.</p>
        </div>
      </footer>
    </div>
  );
}
