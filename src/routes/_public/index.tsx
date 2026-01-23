import { createFileRoute, redirect } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  Code2,
  Database,
  GitBranch,
  Globe,
  MousePointer,
  PlugZap,
  RefreshCw,
  Webhook,
  Workflow,
} from "lucide-react";
import { LuGithub as GithubIcon } from "react-icons/lu";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth/authClient";
import app from "@/lib/config/app.config";

import type { ReactNode } from "react";

export const Route = createFileRoute("/_public/")({
  beforeLoad: ({ context: { session } }) => {
    if (session?.user?.rowId) throw redirect({ to: "/workspaces" });
  },
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
      "Design complex workflows with an intuitive drag-and-drop canvas. Connect nodes, configure actions, and see your automation take shape.",
    icon: <Workflow className="h-6 w-6" />,
  },
  {
    title: "Powerful Integrations",
    description:
      "HTTP requests, webhooks, Discord, and more. Connect any service with flexible triggers and actions.",
    icon: <PlugZap className="h-6 w-6" />,
  },
  {
    title: "Smart Conditionals",
    description:
      "Route data dynamically with if/else branches, switch statements, and loops. Build logic visually.",
    icon: <GitBranch className="h-6 w-6" />,
  },
  {
    title: "LLM & MCP Nodes",
    description:
      "Integrate AI models and Model Context Protocol servers directly into your workflows.",
    icon: <Bot className="h-6 w-6" />,
  },
  {
    title: "Code Execution",
    description:
      "Write custom JavaScript or TypeScript when you need full control. Code nodes for maximum flexibility.",
    icon: <Code2 className="h-6 w-6" />,
  },
  {
    title: "Database Operations",
    description:
      "Query databases, transform data with JSONPath, and orchestrate complex data pipelines.",
    icon: <Database className="h-6 w-6" />,
  },
];

const templates = [
  {
    name: "API Data Fetcher",
    description: "Fetch and transform API data",
    icon: Globe,
    nodes: 3,
  },
  {
    name: "Webhook Echo",
    description: "Receive and forward webhooks",
    icon: Webhook,
    nodes: 3,
  },
  {
    name: "Conditional Router",
    description: "Route based on conditions",
    icon: GitBranch,
    nodes: 5,
  },
  {
    name: "Multi-Step Pipeline",
    description: "Chain multiple API calls",
    icon: Clock,
    nodes: 5,
  },
];

const nodeTypes = [
  { name: "Trigger", icon: MousePointer, color: "text-emerald-500" },
  { name: "HTTP", icon: Globe, color: "text-blue-500" },
  { name: "Condition", icon: GitBranch, color: "text-amber-500" },
  { name: "Transform", icon: RefreshCw, color: "text-purple-500" },
  { name: "LLM", icon: Bot, color: "text-pink-500" },
  { name: "Code", icon: Code2, color: "text-cyan-500" },
];

/**
 * Animated vortex background component.
 * Creates layered spinning rings with a glowing core.
 */
function VortexBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Core glow - the heart of the vortex */}
      <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-vortex-pulse rounded-full bg-primary/20 blur-[100px]" />

      {/* Outer atmospheric glow */}
      <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      {/* Spinning orbital rings */}
      <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] animate-vortex-spin rounded-full border border-primary/10" />
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] animate-vortex-spin-slow rounded-full border border-primary/[0.07]" />
      <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] animate-vortex-spin-reverse rounded-full border border-primary/[0.05] border-dashed" />

      {/* Expanding pulse rings */}
      <div className="absolute top-1/2 left-1/2 h-[200px] w-[200px] animate-ring-expand rounded-full border border-primary/20" />
      <div className="absolute top-1/2 left-1/2 h-[200px] w-[200px] animate-ring-expand rounded-full border border-primary/20 [animation-delay:1.3s]" />
      <div className="absolute top-1/2 left-1/2 h-[200px] w-[200px] animate-ring-expand rounded-full border border-primary/20 [animation-delay:2.6s]" />

      {/* Floating particles around the vortex */}
      <div className="absolute top-[30%] left-[20%] h-2 w-2 animate-float rounded-full bg-primary/40 blur-[2px]" />
      <div className="absolute top-[60%] left-[75%] h-3 w-3 animate-float rounded-full bg-primary/30 blur-[3px] [animation-delay:1s]" />
      <div className="absolute top-[25%] left-[70%] h-1.5 w-1.5 animate-float rounded-full bg-primary/50 blur-[1px] [animation-delay:2s]" />
      <div className="absolute top-[70%] left-[25%] h-2.5 w-2.5 animate-float rounded-full bg-primary/35 blur-[2px] [animation-delay:3s]" />
      <div className="absolute top-[45%] left-[85%] h-2 w-2 animate-float rounded-full bg-primary/25 blur-[2px] [animation-delay:0.5s]" />
      <div className="absolute top-[80%] left-[60%] h-1.5 w-1.5 animate-float rounded-full bg-primary/45 blur-[1px] [animation-delay:2.5s]" />

      {/* Conic gradient overlay for spiral effect */}
      <div
        className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-vortex-spin-slow rounded-full opacity-30"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, oklch(0.6 0.15 295 / 0.3) 90deg, oklch(0.65 0.18 295 / 0.5) 180deg, oklch(0.6 0.15 295 / 0.3) 270deg, transparent)",
        }}
      />
    </div>
  );
}

/**
 * Mini workflow preview showing connected nodes.
 */
function WorkflowPreview() {
  return (
    <div className="relative mx-auto mt-16 max-w-3xl animate-fade-up opacity-0 [animation-delay:500ms]">
      {/* Glow behind the preview */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/10 blur-[40px]" />

      {/* Preview container */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card/80 p-6 shadow-2xl shadow-primary/10 backdrop-blur-sm">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.5 0.1 295 / 0.3) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Workflow nodes */}
        <div className="relative flex items-center justify-center gap-4 py-8">
          {/* Trigger Node */}
          <div className="group relative">
            <div className="flex h-16 w-32 flex-col items-center justify-center rounded-xl border-2 border-emerald-500/50 bg-emerald-500/10 transition-all duration-300 hover:border-emerald-500 hover:shadow-emerald-500/20 hover:shadow-lg">
              <MousePointer className="h-5 w-5 text-emerald-500" />
              <span className="mt-1 font-medium text-foreground text-xs">
                Trigger
              </span>
            </div>
            {/* Connection point */}
            <div className="absolute top-1/2 -right-2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-background bg-emerald-500" />
          </div>

          {/* Connection line */}
          <svg className="h-8 w-12 text-primary/40" viewBox="0 0 48 32">
            <path
              d="M0 16 L48 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-[dash_1s_linear_infinite]"
            />
            <polygon points="44,12 48,16 44,20" fill="currentColor" />
          </svg>

          {/* HTTP Node */}
          <div className="group relative">
            <div className="flex h-16 w-32 flex-col items-center justify-center rounded-xl border-2 border-blue-500/50 bg-blue-500/10 transition-all duration-300 hover:border-blue-500 hover:shadow-blue-500/20 hover:shadow-lg">
              <Globe className="h-5 w-5 text-blue-500" />
              <span className="mt-1 font-medium text-foreground text-xs">
                HTTP Request
              </span>
            </div>
            <div className="absolute top-1/2 -left-2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-background bg-blue-500" />
            <div className="absolute top-1/2 -right-2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-background bg-blue-500" />
          </div>

          {/* Connection line */}
          <svg className="h-8 w-12 text-primary/40" viewBox="0 0 48 32">
            <path
              d="M0 16 L48 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-[dash_1s_linear_infinite]"
            />
            <polygon points="44,12 48,16 44,20" fill="currentColor" />
          </svg>

          {/* Condition Node */}
          <div className="group relative">
            <div className="flex h-16 w-32 flex-col items-center justify-center rounded-xl border-2 border-amber-500/50 bg-amber-500/10 transition-all duration-300 hover:border-amber-500 hover:shadow-amber-500/20 hover:shadow-lg">
              <GitBranch className="h-5 w-5 text-amber-500" />
              <span className="mt-1 font-medium text-foreground text-xs">
                Condition
              </span>
            </div>
            <div className="absolute top-1/2 -left-2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-background bg-amber-500" />
            <div className="absolute top-1/3 -right-2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-background bg-emerald-500" />
            <div className="absolute top-2/3 -right-2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-background bg-red-500" />
          </div>
        </div>

        {/* Node type pills */}
        <div className="relative mt-4 flex flex-wrap items-center justify-center gap-2">
          {nodeTypes.map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.name}
                className="flex items-center gap-1.5 rounded-full border border-border/50 bg-background/50 px-3 py-1 text-xs"
              >
                <Icon className={`h-3 w-3 ${node.color}`} />
                <span className="text-muted-foreground">{node.name}</span>
              </div>
            );
          })}
          <span className="text-muted-foreground text-xs">+ more</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Subtle noise texture overlay for depth.
 */
function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.015] dark:opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

/**
 * Landing page for Vortex.
 */
function LandingPage() {
  const handleSignIn = () => {
    authClient.signIn.oauth2({
      providerId: "omni",
      callbackURL: "/workspaces",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <NoiseOverlay />

      {/* Hero Section */}
      <section className="relative px-4 pt-24 pb-20 sm:px-6 md:pt-36 md:pb-28 lg:px-8">
        <VortexBackground />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-8 flex animate-fade-up justify-center opacity-0">
              <Badge className="gap-2 border-primary/30 bg-primary/10 px-4 py-2 text-primary backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span>{app.description}</span>
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="mb-6 animate-fade-up font-extrabold text-4xl tracking-tight opacity-0 [animation-delay:100ms] sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block text-foreground">Pull everything</span>
              <span className="mt-2 block bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                into the flow.
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl animate-fade-up text-lg text-muted-foreground opacity-0 [animation-delay:200ms]">
              Build powerful workflows visually. Connect APIs, add logic,
              integrate AI—all with a drag-and-drop canvas. Open source and
              free.
            </p>

            {/* CTAs */}
            <div className="flex animate-fade-up flex-col items-center justify-center gap-4 opacity-0 [animation-delay:300ms] sm:flex-row">
              <Button
                size="lg"
                onClick={handleSignIn}
                className="group h-12 gap-2 px-8 font-semibold text-base shadow-lg shadow-primary/25 transition-shadow duration-300 hover:shadow-primary/30 hover:shadow-xl"
              >
                Start Building
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <a
                href={app.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 gap-2 border-primary/20 px-8 backdrop-blur-sm transition-colors duration-300 hover:border-primary/40 hover:bg-primary/5"
                >
                  <GithubIcon size={18} />
                  View Source
                </Button>
              </a>
            </div>
          </div>

          {/* Workflow Preview */}
          <WorkflowPreview />
        </div>

        {/* Bottom fade gradient */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="relative px-4 py-28 sm:px-6 lg:px-8">
        {/* Subtle side glows */}
        <div className="pointer-events-none absolute top-1/2 left-0 h-[400px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
        <div className="pointer-events-none absolute top-1/2 right-0 h-[400px] w-[200px] translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Badge className="mb-4 border-primary/20 bg-primary/10 text-primary">
              Capabilities
            </Badge>
            <h2 className="mb-4 font-bold text-3xl text-foreground sm:text-4xl">
              Everything spirals into place
            </h2>
            <p className="text-lg text-muted-foreground">
              From simple automations to complex orchestrations with AI.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Hover glow effect */}
                <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[60px]" />
                </div>

                {/* Rotating border accent on hover */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, oklch(0.55 0.15 295 / 0.3) 60deg, transparent 120deg)",
                    animation: "vortex-spin 8s linear infinite",
                  }}
                />
                <div className="absolute inset-[1px] -z-10 rounded-2xl bg-card/95" />

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
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

      {/* Templates Section */}
      <section className="relative px-4 py-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Badge className="mb-4 border-primary/20 bg-primary/10 text-primary">
              Templates
            </Badge>
            <h2 className="mb-4 font-bold text-3xl text-foreground sm:text-4xl">
              Start from a blueprint
            </h2>
            <p className="text-lg text-muted-foreground">
              Pre-built workflows to get you automating in seconds.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {templates.map((template, index) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.name}
                  className="group flex items-start gap-4 rounded-xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground">
                      {template.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {template.description}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-muted-foreground text-xs">
                      <Workflow className="h-3 w-3" />
                      {template.nodes} nodes
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="relative px-4 py-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/5 p-8 sm:p-12 lg:p-16">
            {/* Animated background elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 h-[300px] w-[300px] animate-vortex-pulse rounded-full bg-primary/10 blur-[80px]" />
              <div className="absolute bottom-0 left-0 h-[250px] w-[250px] rounded-full bg-primary/5 blur-[60px]" />

              {/* Subtle spinning ring */}
              <div className="absolute top-1/2 right-[10%] h-[200px] w-[200px] -translate-y-1/2 animate-vortex-spin-slow rounded-full border border-primary/10" />
            </div>

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
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 gap-2 border-primary/30 px-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/5"
                >
                  <GithubIcon size={20} />
                  View on GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-12">
            {[
              { value: "100%", label: "Open Source" },
              { value: "Free", label: "For Individuals" },
              { value: "∞", label: "Workflows" },
              { value: "13+", label: "Node Types" },
            ].map((stat) => (
              <div key={stat.label} className="group relative text-center">
                <div className="absolute inset-0 -z-10 rounded-xl bg-primary/5 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden px-4 py-36 sm:px-6 lg:px-8">
        {/* Mini vortex background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 animate-vortex-pulse rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] animate-vortex-spin rounded-full border border-primary/10" />
          <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] animate-vortex-spin-reverse rounded-full border border-primary/5 border-dashed" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-bold text-4xl text-foreground sm:text-5xl lg:text-6xl">
            Ready to enter{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              the vortex?
            </span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
            Start building workflows today. Free for individuals and small
            teams.
          </p>

          <Button
            size="lg"
            onClick={handleSignIn}
            className="group h-14 gap-2 px-10 font-semibold text-lg shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/30 hover:shadow-xl"
          >
            Get Started for Free
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>

          <p className="mt-6 text-muted-foreground text-sm">
            No credit card required. Free and open source.
          </p>
        </div>
      </section>
    </div>
  );
}
