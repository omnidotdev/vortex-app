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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth/authClient";
import app from "@/lib/config/app.config";

import type { ReactNode } from "react";

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
    title: "Visual Workflow Builder",
    description:
      "Design complex workflows with an intuitive drag-and-drop interface. No coding required to get started.",
    icon: <Workflow className="h-6 w-6" />,
  },
  {
    title: "Powerful Integrations",
    description:
      "Connect your favorite tools and services. Trigger workflows from webhooks, schedules, or events.",
    icon: <PlugZap className="h-6 w-6" />,
  },
  {
    title: "Reliable Execution",
    description:
      "Built-in retries, error handling, and monitoring. Your workflows run reliably, every time.",
    icon: <RefreshCw className="h-6 w-6" />,
  },
  {
    title: "Lightning Fast",
    description:
      "Execute thousands of workflows per second. Scale from prototype to production seamlessly.",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: "Scheduled Tasks",
    description:
      "Run workflows on a schedule with cron expressions. Automate recurring tasks with precision.",
    icon: <Timer className="h-6 w-6" />,
  },
  {
    title: "Version Control",
    description:
      "Track changes to your workflows over time. Roll back to previous versions when needed.",
    icon: <GitBranch className="h-6 w-6" />,
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

/**
 * Landing page for Vortex.
 */
function LandingPage() {
  const { session } = Route.useRouteContext();
  const isAuthenticated = !!session?.user?.rowId;

  const handleSignIn = () => {
    authClient.signIn.oauth2({
      providerId: "omni",
      callbackURL: "/workspaces",
    });
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-32 sm:px-6 md:pt-32 md:pb-40 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-8 flex justify-center">
              <Badge className="gap-2 border-primary/20 bg-primary/10 px-4 py-2 text-primary">
                <span>Workflow automation for the decentralized web</span>
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="mb-6 font-extrabold text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block text-foreground">Automate anything</span>
              <span className="mt-2 block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                with confidence.
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
              Build, deploy, and monitor powerful workflows with a visual editor
              or code. Open source workflow automation that scales with your
              needs.
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
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={handleSignIn}
                  className="group h-12 gap-2 px-8 font-semibold text-base"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              )}

              <Button
                variant="outline"
                size="lg"
                className="h-12 gap-2 px-8"
                asChild
              >
                <Link to="/demo">
                  <PlayCircle className="h-4 w-4" />
                  Try the Demo
                </Link>
              </Button>

              <a
                href={app.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="h-12 gap-2 px-8">
                  <GithubIcon size={18} />
                  View on GitHub
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
              <div className="text-center">
                <div className="font-bold text-2xl text-foreground sm:text-3xl">
                  100%
                </div>
                <div className="text-muted-foreground text-sm">Open Source</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-foreground sm:text-3xl">
                  Free
                </div>
                <div className="text-muted-foreground text-sm">
                  For Individuals
                </div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-foreground sm:text-3xl">
                  Visual
                </div>
                <div className="text-muted-foreground text-sm">
                  Workflow Builder
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative gradient orb */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
      </section>

      {/* Features Section */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Badge className="mb-4 border-primary/20 bg-primary/10 text-primary">
              Features
            </Badge>
            <h2 className="mb-4 font-bold text-3xl text-foreground sm:text-4xl">
              Everything you need to automate
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features wrapped in a simple, intuitive interface.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group hover:glow-sm relative overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-300 hover:border-primary/30"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
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
            <Badge className="mb-4 border-primary/20 bg-primary/10 text-primary">
              Use Cases
            </Badge>
            <h2 className="mb-4 font-bold text-3xl text-foreground sm:text-4xl">
              Built for any automation
            </h2>
            <p className="text-lg text-muted-foreground">
              From simple tasks to complex orchestration, Vortex handles it all.
            </p>
          </div>

          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            {useCases.map((useCase) => (
              <div
                key={useCase}
                className="flex items-center gap-3 rounded-lg border bg-card p-4"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
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
                <Badge className="mb-4 border-primary/20 bg-primary/10 text-primary">
                  <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                  Open Source
                </Badge>
                <h2 className="mb-4 font-bold text-3xl text-foreground sm:text-4xl">
                  Built in the open, for everyone
                </h2>
                <p className="text-lg text-muted-foreground">
                  {app.name} is completely open source. Inspect the code,
                  contribute features, or self-host on your own infrastructure.
                  Your workflows, your rules.
                </p>
              </div>

              {/* CTA */}
              <a
                href={app.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="h-12 gap-2 px-6">
                  <GithubIcon size={20} />
                  View on GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative px-4 py-32 sm:px-6 lg:px-8">
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
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handleSignIn}
                className="group h-14 gap-2 px-10 font-semibold text-lg"
              >
                Get Started for Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
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
