import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  GitBranch,
  Globe,
  PlayCircle,
  PlugZap,
  Plus,
  RefreshCw,
  Settings,
  Sparkles,
  TrendingUp,
  Webhook,
  Workflow,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { ReactNode } from "react";

export const Route = createFileRoute("/_auth/workspaces/$workspaceSlug/")({
  component: WorkspaceDashboard,
});

// Placeholder data - will be replaced with real data from API
const stats = [
  {
    label: "Active Workflows",
    value: "12",
    change: "+2",
    trend: "up" as const,
    icon: Workflow,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Runs Today",
    value: "847",
    change: "+12%",
    trend: "up" as const,
    icon: PlayCircle,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Success Rate",
    value: "98.2%",
    change: "+0.5%",
    trend: "up" as const,
    icon: CheckCircle2,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    label: "Integrations",
    value: "8",
    change: "",
    trend: "neutral" as const,
    icon: PlugZap,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
];

const recentActivity = [
  {
    id: "1",
    type: "run_success" as const,
    workflow: "API Data Fetcher",
    time: "2 min ago",
    details: "Completed in 1.2s",
  },
  {
    id: "2",
    type: "run_success" as const,
    workflow: "Webhook Echo",
    time: "5 min ago",
    details: "Triggered by webhook",
  },
  {
    id: "3",
    type: "run_failed" as const,
    workflow: "Slack Notifier",
    time: "12 min ago",
    details: "HTTP 401 - Auth failed",
  },
  {
    id: "4",
    type: "workflow_created" as const,
    workflow: "New Pipeline",
    time: "1 hour ago",
    details: "Created from template",
  },
  {
    id: "5",
    type: "run_success" as const,
    workflow: "Daily Report",
    time: "3 hours ago",
    details: "Scheduled run",
  },
];

const recentWorkflows = [
  {
    id: "1",
    name: "API Data Fetcher",
    description: "Fetches data from JSONPlaceholder API",
    lastRun: "2 min ago",
    status: "active" as const,
    runs: 234,
    triggerType: "manual" as const,
  },
  {
    id: "2",
    name: "Webhook Echo",
    description: "Receives and forwards webhooks",
    lastRun: "5 min ago",
    status: "active" as const,
    runs: 1205,
    triggerType: "webhook" as const,
  },
  {
    id: "3",
    name: "Daily Report Generator",
    description: "Compiles daily metrics report",
    lastRun: "3 hours ago",
    status: "active" as const,
    runs: 89,
    triggerType: "cron" as const,
  },
];

const upcomingRuns = [
  { workflow: "Daily Report", time: "in 2 hours", type: "cron" },
  { workflow: "Weekly Digest", time: "tomorrow 9:00 AM", type: "cron" },
  { workflow: "Data Sync", time: "tomorrow 6:00 PM", type: "cron" },
];

const quickActions = [
  {
    label: "Create Workflow",
    description: "Start from scratch or template",
    icon: Plus,
    href: "/workspaces/$workspaceSlug/workflows/new",
    primary: true,
  },
  {
    label: "View Workflows",
    description: "Manage your automations",
    icon: Workflow,
    href: "/workspaces/$workspaceSlug/workflows",
    primary: false,
  },
  {
    label: "Integrations",
    description: "Connect external services",
    icon: PlugZap,
    href: "/workspaces/$workspaceSlug/integrations",
    primary: false,
  },
  {
    label: "Settings",
    description: "Workspace configuration",
    icon: Settings,
    href: "/workspaces/$workspaceSlug/settings",
    primary: false,
  },
];

const onboardingSteps = [
  { label: "Create your first workflow", completed: true },
  { label: "Add an integration", completed: true },
  { label: "Run a workflow successfully", completed: true },
  { label: "Set up a scheduled trigger", completed: false },
  { label: "Invite a team member", completed: false },
];

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

function StatCard({
  label,
  value,
  change,
  trend,
  icon: Icon,
  color,
  bgColor,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5">
      {/* Subtle hover glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute top-1/2 left-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[40px]" />
      </div>

      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${bgColor}`}
        >
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
        {change && trend !== "neutral" && (
          <div
            className={`flex items-center gap-0.5 font-medium text-xs ${
              trend === "up" ? "text-emerald-500" : "text-red-500"
            }`}
          >
            <TrendingUp
              className={`h-3 w-3 ${trend === "down" ? "rotate-180" : ""}`}
            />
            {change}
          </div>
        )}
      </div>
      <div className="mt-3">
        <p className="text-muted-foreground text-sm">{label}</p>
        <p className="mt-1 font-bold text-2xl tracking-tight">{value}</p>
      </div>
    </div>
  );
}

interface ActivityItemProps {
  type: "run_success" | "run_failed" | "workflow_created";
  workflow: string;
  time: string;
  details: string;
}

function ActivityItem({ type, workflow, time, details }: ActivityItemProps) {
  const icons: Record<string, ReactNode> = {
    run_success: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
    run_failed: <AlertCircle className="h-4 w-4 text-red-500" />,
    workflow_created: <Sparkles className="h-4 w-4 text-primary" />,
  };

  const labels: Record<string, string> = {
    run_success: "Completed",
    run_failed: "Failed",
    workflow_created: "Created",
  };

  return (
    <div className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50">
      <div className="mt-0.5">{icons[type]}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium text-sm">{workflow}</span>
          <Badge
            variant="outline"
            className={`px-1.5 py-0 text-xs ${
              type === "run_failed"
                ? "border-red-500/30 text-red-500"
                : type === "run_success"
                  ? "border-emerald-500/30 text-emerald-500"
                  : "border-primary/30 text-primary"
            }`}
          >
            {labels[type]}
          </Badge>
        </div>
        <p className="mt-0.5 text-muted-foreground text-xs">{details}</p>
      </div>
      <span className="shrink-0 text-muted-foreground text-xs">{time}</span>
    </div>
  );
}

function TriggerIcon({ type }: { type: "manual" | "webhook" | "cron" }) {
  const icons = {
    manual: <PlayCircle className="h-3.5 w-3.5" />,
    webhook: <Webhook className="h-3.5 w-3.5" />,
    cron: <Clock className="h-3.5 w-3.5" />,
  };
  return icons[type];
}

/**
 * Workspace dashboard page.
 */
function WorkspaceDashboard() {
  const { workspaceSlug } = Route.useParams();
  const completedSteps = onboardingSteps.filter((s) => s.completed).length;
  const totalSteps = onboardingSteps.length;
  const onboardingComplete = completedSteps === totalSteps;

  return (
    <div className="min-h-screen">
      {/* Header section with subtle background */}
      <div className="relative border-b bg-gradient-to-b from-primary/[0.02] to-transparent">
        <div className="px-6 py-8 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-bold text-2xl tracking-tight lg:text-3xl">
                Dashboard
              </h1>
              <p className="mt-1 text-muted-foreground">
                Welcome back to{" "}
                <span className="font-medium text-foreground">
                  {workspaceSlug}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link
                  to="/workspaces/$workspaceSlug/workflows"
                  params={{ workspaceSlug }}
                >
                  <Workflow className="mr-2 h-4 w-4" />
                  Workflows
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link
                  to="/workspaces/$workspaceSlug/workflows/new"
                  params={{ workspaceSlug }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Workflow
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 lg:px-8">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Left Column - Activity & Workflows */}
          <div className="space-y-6 lg:col-span-2">
            {/* Recent Activity */}
            <div className="overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b px-5 py-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <h2 className="font-semibold">Recent Activity</h2>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  View All
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-1 p-3">
                {recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} {...activity} />
                ))}
              </div>
            </div>

            {/* Recent Workflows */}
            <div className="overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b px-5 py-4">
                <div className="flex items-center gap-2">
                  <Workflow className="h-4 w-4 text-primary" />
                  <h2 className="font-semibold">Recent Workflows</h2>
                </div>
                <Button variant="ghost" size="sm" className="text-xs" asChild>
                  <Link
                    to="/workspaces/$workspaceSlug/workflows"
                    params={{ workspaceSlug }}
                  >
                    View All
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
              <div className="divide-y divide-border/50">
                {recentWorkflows.map((workflow) => (
                  <Link
                    key={workflow.id}
                    to="/workspaces/$workspaceSlug/workflows/$workflowId"
                    params={{ workspaceSlug, workflowId: workflow.id }}
                    className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <GitBranch className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-medium">
                          {workflow.name}
                        </span>
                        <Badge
                          variant="outline"
                          className="border-emerald-500/30 px-1.5 py-0 text-emerald-500 text-xs"
                        >
                          Active
                        </Badge>
                      </div>
                      <p className="truncate text-muted-foreground text-sm">
                        {workflow.description}
                      </p>
                    </div>
                    <div className="hidden items-center gap-4 text-muted-foreground text-sm sm:flex">
                      <div className="flex items-center gap-1">
                        <TriggerIcon type={workflow.triggerType} />
                        <span className="capitalize">
                          {workflow.triggerType}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>{workflow.runs} runs</span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions, Scheduled, Onboarding */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b px-5 py-4">
                <Zap className="h-4 w-4 text-primary" />
                <h2 className="font-semibold">Quick Actions</h2>
              </div>
              <div className="space-y-2 p-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.label}
                      to={action.href}
                      params={{ workspaceSlug }}
                      className={`group flex items-center gap-3 rounded-lg p-3 transition-all ${
                        action.primary
                          ? "bg-primary/10 hover:bg-primary/15"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          action.primary
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`font-medium text-sm ${action.primary ? "text-primary" : ""}`}
                        >
                          {action.label}
                        </p>
                        <p className="truncate text-muted-foreground text-xs">
                          {action.description}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Scheduled Runs */}
            <div className="overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b px-5 py-4">
                <Calendar className="h-4 w-4 text-primary" />
                <h2 className="font-semibold">Upcoming Runs</h2>
              </div>
              <div className="space-y-3 p-4">
                {upcomingRuns.map((run, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-medium">{run.workflow}</span>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {run.time}
                    </span>
                  </div>
                ))}
                {upcomingRuns.length === 0 && (
                  <p className="py-4 text-center text-muted-foreground text-sm">
                    No scheduled runs
                  </p>
                )}
              </div>
            </div>

            {/* Getting Started / Onboarding */}
            {!onboardingComplete && (
              <div className="overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="flex items-center justify-between border-primary/10 border-b px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <h2 className="font-semibold">Getting Started</h2>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-primary/30 text-primary"
                  >
                    {completedSteps}/{totalSteps}
                  </Badge>
                </div>
                <div className="space-y-3 p-4">
                  {onboardingSteps.map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          step.completed
                            ? "bg-primary text-primary-foreground"
                            : "border border-muted-foreground/30"
                        }`}
                      >
                        {step.completed && <CheckCircle2 className="h-3 w-3" />}
                      </div>
                      <span
                        className={`text-sm ${
                          step.completed
                            ? "text-muted-foreground line-through"
                            : "text-foreground"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resources */}
            <div className="overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b px-5 py-4">
                <Globe className="h-4 w-4 text-primary" />
                <h2 className="font-semibold">Resources</h2>
              </div>
              <div className="space-y-1 p-3">
                {[
                  { label: "Documentation", href: "#" },
                  { label: "API Reference", href: "#" },
                  { label: "Community Discord", href: "#" },
                ].map((resource) => (
                  <a
                    key={resource.label}
                    href={resource.href}
                    className="group flex items-center justify-between rounded-lg p-2 text-sm transition-colors hover:bg-muted/50"
                  >
                    <span>{resource.label}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
