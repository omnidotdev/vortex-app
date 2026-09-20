import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  GitBranch,
  PlayCircle,
  PlugZap,
  RefreshCw,
  Timer,
  Workflow,
  Zap,
} from "lucide-react";
import { LuGithub as GithubIcon } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth/authClient";
import app from "@/lib/config/app.config";

import type { CSSProperties, ReactNode } from "react";

export const Route = createFileRoute("/_public/")({
  component: LandingPage,
});

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

const features: Feature[] = [
  {
    title: "Visual builder",
    description:
      "Drag, drop, and wire nodes on a canvas. Every edit round-trips to the JSON DSL, so the visual and code views never drift.",
    icon: <Workflow className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "500+ integrations",
    description:
      "Trigger from webhooks, schedules, or CloudEvents, and reach the services you already use without writing glue code.",
    icon: <PlugZap className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Reliable by default",
    description:
      "Automatic retries, timeouts, and error handling. Every run is observable end to end, with logs for each step.",
    icon: <RefreshCw className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Pluggable backends",
    description:
      "Swap the execution engine to fit your stack and scale from a single node to thousands of runs per second.",
    icon: <Zap className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Scheduled triggers",
    description:
      "Cron-driven runs for recurring jobs, with timezone-aware schedules you define once and forget.",
    icon: <Timer className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Versioned workflows",
    description:
      "Every workflow is versioned. Diff what changed and roll back to any previous version in a click.",
    icon: <GitBranch className="h-6 w-6" aria-hidden="true" />,
  },
];

const useCases = [
  "Data pipeline orchestration",
  "CI/CD automation",
  "Business process automation",
  "Event-driven architectures",
  "Scheduled reporting",
  "Multi-service coordination",
];

/** Fine grid mesh, faded toward the edges (mirrors the social card). */
const meshStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(150,120,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(150,120,255,.06) 1px, transparent 1px)",
  backgroundSize: "46px 46px",
  maskImage: "radial-gradient(60% 55% at 50% 35%, #000 0%, transparent 78%)",
  WebkitMaskImage:
    "radial-gradient(60% 55% at 50% 35%, #000 0%, transparent 78%)",
};

/** Slow conic swirl that reads as a vortex behind the headline. */
const swirlStyle: CSSProperties = {
  background:
    "conic-gradient(from 0deg, transparent 0%, rgba(150,120,255,.30) 18%, transparent 42%, rgba(150,120,255,.18) 68%, transparent 92%)",
  maskImage: "radial-gradient(closest-side, #000 12%, transparent 72%)",
  WebkitMaskImage: "radial-gradient(closest-side, #000 12%, transparent 72%)",
};

/**
 * Landing page for Vortex.
 */
function LandingPage() {
  const { session } = Route.useRouteContext();
  const isAuthenticated = !!session?.user?.rowId;

  const handleSignIn = () => {
    authClient.signIn.social({
      provider: "omni",
      callbackURL: "/workspaces",
    });
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-20 pb-32 sm:px-6 md:pt-32 md:pb-40 lg:px-8">
        {/* Branded backdrop */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 opacity-60" style={meshStyle} />
          <div
            className="absolute top-[-14%] left-1/2 h-[760px] w-[760px] -translate-x-1/2 animate-spin rounded-full opacity-40 [animation-duration:70s]"
            style={swirlStyle}
          />
          <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            {/* Headline */}
            <h1 className="mb-6 font-extrabold text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block text-foreground">Automate anything</span>
              <span className="mt-2 block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                with confidence.
              </span>
            </h1>

            <p className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground">
              Build, deploy, and monitor workflows with a visual editor, a JSON
              DSL, or the TypeScript SDK. Open source, self-hostable, and wired
              to the tools you already run.
            </p>

            {/* Capability line, echoing the brand mark */}
            <p className="mx-auto mb-10 font-medium text-muted-foreground/80 text-sm tracking-wide">
              visual editor · json dsl · typescript sdk · 500+ integrations
            </p>

            {/* CTAs */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {isAuthenticated ? (
                <Button
                  size="lg"
                  className="group h-12 gap-2 px-8 font-semibold text-base"
                  asChild
                >
                  <Link to="/workspaces">
                    Go to Dashboard
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={handleSignIn}
                  className="group h-12 gap-2 px-8 font-semibold text-base"
                >
                  Get Started Free
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              )}

              <Button
                variant="outline"
                size="lg"
                className="h-12 gap-2 px-8"
                asChild
              >
                <Link to="/demo">
                  <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  Try the Demo
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-12 gap-2 px-8"
                asChild
              >
                <a href={app.links.github} target="_blank" rel="noreferrer">
                  <GithubIcon size={18} aria-hidden="true" />
                  View Source
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              <div className="text-center">
                <div className="font-bold text-2xl text-foreground sm:text-3xl">
                  500+
                </div>
                <div className="text-muted-foreground text-sm">
                  Integrations
                </div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-foreground sm:text-3xl">
                  3 ways
                </div>
                <div className="text-muted-foreground text-sm">
                  Visual, JSON, or SDK
                </div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-foreground sm:text-3xl">
                  Apache-2.0
                </div>
                <div className="text-muted-foreground text-sm">
                  Open source, self-hostable
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 font-bold text-3xl text-foreground sm:text-4xl">
              Everything you need to automate
            </h2>
            <p className="text-lg text-muted-foreground">
              The authoring, execution, and observability of a workflow engine,
              without the operational drag.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group hover:glow-sm relative overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-300 hover:border-primary/30"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:text-primary-300">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-semibold text-foreground text-lg">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 font-bold text-3xl text-foreground sm:text-4xl">
              Built for any automation
            </h2>
            <p className="text-lg text-muted-foreground">
              From a single scheduled task to cross-service orchestration, the
              same engine scales with you.
            </p>
          </div>

          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            {useCases.map((useCase) => (
              <div
                key={useCase}
                className="flex items-center gap-3 rounded-lg border bg-card p-4"
              >
                <CheckCircle2
                  className="h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="text-foreground">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="glow-sm relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-background p-8 sm:p-12 lg:p-16">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
              {/* Content */}
              <div className="max-w-xl text-center lg:text-left">
                <h2 className="mb-4 font-bold text-3xl text-foreground sm:text-4xl">
                  Built in the open, for everyone
                </h2>
                <p className="text-lg text-muted-foreground">
                  {app.name} is Apache-2.0 licensed. Read the code, open a pull
                  request, or self-host it on your own infrastructure. Your
                  workflows, your rules.
                </p>
              </div>

              {/* CTA */}
              <Button
                variant="outline"
                size="lg"
                className="h-12 shrink-0 gap-2 px-6"
                asChild
              >
                <a href={app.links.github} target="_blank" rel="noreferrer">
                  <GithubIcon size={20} aria-hidden="true" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden px-4 py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="relative">
            <h2 className="mb-6 font-bold text-4xl text-foreground sm:text-5xl">
              Ready to{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                automate?
              </span>
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
              Start building workflows today. Free for individuals and small
              teams.
            </p>

            {isAuthenticated ? (
              <Button
                size="lg"
                className="group h-14 gap-2 px-10 font-semibold text-lg"
                asChild
              >
                <Link to="/workspaces">
                  Go to Dashboard
                  <ArrowRight
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handleSignIn}
                className="group h-14 gap-2 px-10 font-semibold text-lg"
              >
                Get Started for Free
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
            )}

            <p className="mt-6 text-muted-foreground text-sm">
              No credit card required. Free and open source.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
