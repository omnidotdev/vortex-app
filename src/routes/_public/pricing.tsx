import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Sparkles, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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

const faqs = [
  {
    q: "Can I change plans later?",
    a: "Yes, you can upgrade or downgrade at any time. Changes take effect immediately.",
  },
  {
    q: "What counts as a workflow run?",
    a: "Each time a workflow executes from trigger to completion counts as one run.",
  },
  {
    q: "Is there a free trial?",
    a: "All paid plans include a 14-day free trial. No credit card required.",
  },
  {
    q: "Can I self-host Vortex?",
    a: "Yes! Vortex is open source. Enterprise customers get dedicated self-hosting support.",
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

        {/* Spinning rings - subtle */}
        <div className="absolute top-[20%] left-[10%] h-[300px] w-[300px] animate-vortex-spin-slow rounded-full border border-primary/[0.05]" />
        <div className="absolute top-[60%] right-[5%] h-[400px] w-[400px] animate-vortex-spin-reverse rounded-full border border-primary/[0.03] border-dashed" />

        {/* Floating particles */}
        <div className="absolute top-[15%] left-[20%] h-2 w-2 animate-float rounded-full bg-primary/30 blur-[2px]" />
        <div className="absolute top-[70%] right-[15%] h-3 w-3 animate-float rounded-full bg-primary/20 blur-[3px] [animation-delay:2s]" />
        <div className="absolute top-[40%] right-[25%] h-1.5 w-1.5 animate-float rounded-full bg-primary/40 blur-[1px] [animation-delay:1s]" />
      </div>

      {/* Content */}
      <div className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mx-auto max-w-2xl animate-fade-up text-center opacity-0">
            <Badge className="mb-4 border-primary/20 bg-primary/10 text-primary">
              <Sparkles className="mr-1 h-3 w-3" />
              Pricing
            </Badge>
            <h1 className="font-bold text-4xl tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-foreground">Simple, </span>
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                transparent
              </span>
              <span className="text-foreground"> pricing</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mt-16 grid animate-fade-up gap-6 opacity-0 [animation-delay:200ms] lg:grid-cols-5 lg:gap-4">
            {plans.map((plan, index) => {
              const isHighlighted = plan.highlighted;

              return (
                <div
                  key={plan.name}
                  className={`group relative flex flex-col rounded-2xl border backdrop-blur-sm transition-all duration-500 ${
                    isHighlighted
                      ? "z-10 border-primary/50 bg-gradient-to-b from-primary/10 via-card to-card lg:-my-4 lg:py-4"
                      : "border-border/50 bg-card/80 hover:border-primary/30 hover:bg-card"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Highlighted plan glow */}
                  {isHighlighted && (
                    <>
                      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/20 to-transparent opacity-50" />
                      <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-primary/5 blur-xl" />
                      {/* Popular badge */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="border-primary/50 bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                          <Zap className="mr-1 h-3 w-3" />
                          Most Popular
                        </Badge>
                      </div>
                    </>
                  )}

                  {/* Card content */}
                  <div className="relative flex flex-1 flex-col p-6 lg:p-5">
                    {/* Plan name */}
                    <h3
                      className={`font-semibold text-lg ${isHighlighted ? "text-primary" : "text-foreground"}`}
                    >
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="mt-4 flex items-baseline gap-1">
                      <span
                        className={`font-bold text-4xl tracking-tight ${isHighlighted ? "text-foreground" : "text-foreground"}`}
                      >
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-muted-foreground text-sm">
                          {plan.period}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="mt-2 text-muted-foreground text-sm">
                      {plan.description}
                    </p>

                    {/* Features */}
                    <ul className="mt-6 flex-1 space-y-3">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle2
                            className={`mt-0.5 h-4 w-4 shrink-0 ${isHighlighted ? "text-primary" : "text-primary/70"}`}
                          />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      onClick={handleSignIn}
                      variant={isHighlighted ? "default" : "outline"}
                      className={`group/btn mt-6 w-full ${
                        isHighlighted
                          ? "shadow-lg shadow-primary/25 hover:shadow-primary/30 hover:shadow-xl"
                          : "hover:border-primary/50 hover:bg-primary/5"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex animate-fade-up flex-wrap items-center justify-center gap-x-8 gap-y-4 text-muted-foreground text-sm opacity-0 [animation-delay:400ms]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Cancel anytime</span>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mx-auto mt-24 max-w-3xl animate-fade-up opacity-0 [animation-delay:500ms]">
            <h2 className="text-center font-bold text-2xl text-foreground sm:text-3xl">
              Frequently asked questions
            </h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {faqs.map((faq, index) => (
                <div
                  key={faq.q}
                  className="group rounded-xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-card/80"
                  style={{ animationDelay: `${600 + index * 50}ms` }}
                >
                  <h3 className="font-medium text-foreground">{faq.q}</h3>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="relative mt-24 animate-fade-up overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/5 p-8 opacity-0 [animation-delay:700ms] sm:p-12">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 h-[200px] w-[200px] animate-vortex-pulse rounded-full bg-primary/10 blur-[60px]" />
              <div className="absolute bottom-0 left-0 h-[150px] w-[150px] rounded-full bg-primary/5 blur-[40px]" />
              <div className="absolute top-1/2 right-[15%] h-[150px] w-[150px] -translate-y-1/2 animate-vortex-spin-slow rounded-full border border-primary/10" />
            </div>

            <div className="relative text-center">
              <h2 className="font-bold text-2xl text-foreground sm:text-3xl">
                Not sure which plan is right?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                Start with the free plan and upgrade when you're ready. Our team
                is here to help you find the perfect fit.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  onClick={handleSignIn}
                  className="group h-12 gap-2 px-8 shadow-lg shadow-primary/25 hover:shadow-primary/30 hover:shadow-xl"
                >
                  Start Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 border-primary/30 px-8 hover:border-primary/50 hover:bg-primary/5"
                >
                  Talk to Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
