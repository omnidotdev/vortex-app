import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  GitBranch,
  Grid3X3,
  LayoutList,
  Loader2,
  MousePointer,
  PauseCircle,
  PlayCircle,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Webhook,
  Workflow,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useDeleteWorkflowMutation,
  useWorkflowsQuery,
} from "@/generated/graphql";
import workflowsOptions from "@/lib/options/workflows.options";
import getQueryKeyPrefix from "@/lib/util/getQueryKeyPrefix";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/workflows/",
)({
  loader: async ({ context: { queryClient, organizationId } }) => {
    if (!organizationId) throw notFound();

    await queryClient.ensureQueryData(workflowsOptions({ organizationId }));

    return { organizationId };
  },
  component: WorkflowsPage,
});

type ViewMode = "grid" | "list";
type FilterStatus = "all" | "active" | "inactive";

interface WorkflowNode {
  rowId: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  cronExpression?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  definition?: {
    nodes?: Array<{
      type?: string;
      data?: {
        triggerType?: string;
      };
    }>;
  } | null;
  workflowRuns: {
    nodes: Array<{
      rowId?: string;
      createdAt?: Date | null;
      status: string;
    }>;
  };
}

function getTriggerType(
  workflow: WorkflowNode,
): "manual" | "webhook" | "cron" | "unknown" {
  if (workflow.cronExpression) return "cron";

  const definition = workflow.definition;
  if (definition?.nodes) {
    const triggerNode = definition.nodes.find(
      (n) => n.type === "triggerNode" || n.data?.triggerType,
    );
    if (triggerNode?.data?.triggerType) {
      return triggerNode.data.triggerType as "manual" | "webhook" | "cron";
    }
  }

  return "manual";
}

function TriggerBadge({
  type,
}: {
  type: "manual" | "webhook" | "cron" | "unknown";
}) {
  const config = {
    manual: {
      icon: <MousePointer className="h-3 w-3" />,
      label: "Manual",
      className: "border-blue-500/30 text-blue-600 dark:text-blue-400",
    },
    webhook: {
      icon: <Webhook className="h-3 w-3" />,
      label: "Webhook",
      className: "border-purple-500/30 text-purple-600 dark:text-purple-400",
    },
    cron: {
      icon: <Clock className="h-3 w-3" />,
      label: "Scheduled",
      className: "border-amber-500/30 text-amber-600 dark:text-amber-400",
    },
    unknown: {
      icon: <PlayCircle className="h-3 w-3" />,
      label: "Trigger",
      className: "border-muted-foreground/30 text-muted-foreground",
    },
  };

  const { icon, label, className } = config[type];

  return (
    <Badge
      variant="outline"
      className={`gap-1 px-2 py-0.5 text-xs ${className}`}
    >
      {icon}
      {label}
    </Badge>
  );
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <Badge
      variant="outline"
      className={`gap-1 px-2 py-0.5 text-xs ${
        isActive
          ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
          : "border-muted-foreground/30 text-muted-foreground"
      }`}
    >
      {isActive ? (
        <CheckCircle2 className="h-3 w-3" />
      ) : (
        <PauseCircle className="h-3 w-3" />
      )}
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}

function formatRelativeTime(
  dateInput: Date | string | null | undefined,
): string {
  if (!dateInput) return "Never";
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

function EmptyState({ workspaceSlug }: { workspaceSlug: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      {/* Illustration */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
          <Workflow className="h-10 w-10 text-primary" />
        </div>
        {/* Floating decorative elements */}
        <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10">
          <Sparkles className="h-4 w-4 text-emerald-500" />
        </div>
        <div className="absolute -bottom-1 -left-3 flex h-6 w-6 items-center justify-center rounded-md border border-amber-500/30 bg-amber-500/10">
          <Clock className="h-3 w-3 text-amber-500" />
        </div>
      </div>

      <h3 className="font-semibold text-foreground text-xl">
        No workflows yet
      </h3>
      <p className="mt-2 max-w-sm text-center text-muted-foreground">
        Create your first workflow to start automating tasks, connecting
        services, and building powerful integrations.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="gap-2">
          <Link
            to="/workspaces/$workspaceSlug/workflows/new"
            params={{ workspaceSlug }}
          >
            <Plus className="h-4 w-4" />
            Create Workflow
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="gap-2">
          <GitBranch className="h-4 w-4" />
          Browse Templates
        </Button>
      </div>
    </div>
  );
}

interface WorkflowCardProps {
  workflow: WorkflowNode;
  workspaceSlug: string;
  onDelete: () => void;
  isDeleting: boolean;
}

function WorkflowCard({
  workflow,
  workspaceSlug,
  onDelete,
  isDeleting,
}: WorkflowCardProps) {
  const triggerType = getTriggerType(workflow);
  const lastRun = workflow.workflowRuns.nodes[0];

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5">
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[60px]" />
      </div>

      {/* Card content */}
      <Link
        to="/workspaces/$workspaceSlug/workflows/$workflowId"
        params={{ workspaceSlug, workflowId: workflow.rowId }}
        className="flex flex-1 flex-col p-5"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Workflow className="h-5 w-5 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge isActive={workflow.isActive} />
          </div>
        </div>

        {/* Title & Description */}
        <div className="mt-4 flex-1">
          <h3 className="line-clamp-1 font-semibold text-foreground transition-colors group-hover:text-primary">
            {workflow.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-muted-foreground text-sm">
            {workflow.description || "No description"}
          </p>
        </div>

        {/* Metadata */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <TriggerBadge type={triggerType} />
          {workflow.cronExpression && (
            <Badge
              variant="outline"
              className="gap-1 border-muted-foreground/20 px-2 py-0.5 font-mono text-muted-foreground text-xs"
            >
              {workflow.cronExpression}
            </Badge>
          )}
        </div>
      </Link>

      {/* Footer */}
      <div className="flex items-center justify-between border-border/50 border-t bg-muted/20 px-5 py-3">
        <div className="flex items-center gap-4 text-muted-foreground text-xs">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Last run: {formatRelativeTime(lastRun?.createdAt)}</span>
          </div>
        </div>

        {/* Actions */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
              disabled={isDeleting}
              onClick={(e) => e.preventDefault()}
            >
              {isDeleting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete workflow?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete "{workflow.name}" and all its run
                history. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

interface WorkflowRowProps {
  workflow: WorkflowNode;
  workspaceSlug: string;
  onDelete: () => void;
  isDeleting: boolean;
}

function WorkflowRow({
  workflow,
  workspaceSlug,
  onDelete,
  isDeleting,
}: WorkflowRowProps) {
  const triggerType = getTriggerType(workflow);
  const lastRun = workflow.workflowRuns.nodes[0];

  return (
    <div className="group flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80">
      {/* Icon */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Workflow className="h-5 w-5 text-primary" />
      </div>

      {/* Main content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Link
            to="/workspaces/$workspaceSlug/workflows/$workflowId"
            params={{ workspaceSlug, workflowId: workflow.rowId }}
            className="truncate font-medium text-foreground transition-colors hover:text-primary"
          >
            {workflow.name}
          </Link>
          <StatusBadge isActive={workflow.isActive} />
        </div>
        <p className="mt-0.5 truncate text-muted-foreground text-sm">
          {workflow.description || "No description"}
        </p>
      </div>

      {/* Trigger */}
      <div className="hidden sm:block">
        <TriggerBadge type={triggerType} />
      </div>

      {/* Stats */}
      <div className="hidden items-center gap-4 text-muted-foreground text-sm md:flex">
        <div className="flex w-28 items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          <span>{formatRelativeTime(lastRun?.createdAt)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
          <Link
            to="/workspaces/$workspaceSlug/workflows/$workflowId"
            params={{ workspaceSlug, workflowId: workflow.rowId }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete workflow?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete "{workflow.name}" and all its run
                history. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

/**
 * Workflows list page.
 */
function WorkflowsPage() {
  const { workspaceSlug } = Route.useParams();
  const { organizationId } = Route.useLoaderData();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const { data: workflows } = useSuspenseQuery({
    ...workflowsOptions({ organizationId }),
    select: (data) => (data?.workflows?.nodes ?? []) as WorkflowNode[],
  });

  const { mutate: deleteWorkflow } = useDeleteWorkflowMutation({
    meta: {
      invalidates: [getQueryKeyPrefix(useWorkflowsQuery)],
    },
    onSuccess: () => {
      setDeletingId(null);
    },
    onError: () => {
      setDeletingId(null);
    },
  });

  // Filter and search workflows
  const filteredWorkflows = useMemo(() => {
    return workflows.filter((workflow) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workflow.description?.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && workflow.isActive) ||
        (filterStatus === "inactive" && !workflow.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [workflows, searchQuery, filterStatus]);

  // Stats
  const stats = useMemo(() => {
    const active = workflows.filter((w) => w.isActive).length;
    const inactive = workflows.length - active;
    return { total: workflows.length, active, inactive };
  }, [workflows]);

  const handleDelete = (workflowId: string) => {
    setDeletingId(workflowId);
    deleteWorkflow({ input: { rowId: workflowId } });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-gradient-to-b from-primary/[0.02] to-transparent">
        <div className="px-6 py-8 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-bold text-2xl tracking-tight lg:text-3xl">
                Workflows
              </h1>
              <p className="mt-1 text-muted-foreground">
                Build and manage your automation workflows
              </p>
            </div>
            <Button asChild className="gap-2">
              <Link
                to="/workspaces/$workspaceSlug/workflows/new"
                params={{ workspaceSlug }}
              >
                <Plus className="h-4 w-4" />
                New Workflow
              </Link>
            </Button>
          </div>

          {/* Stats bar */}
          {workflows.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Workflow className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{stats.total}</p>
                  <p className="text-muted-foreground text-xs">Total</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <div>
                  <p className="font-semibold">{stats.active}</p>
                  <p className="text-muted-foreground text-xs">Active</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
                  <PauseCircle className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <p className="font-semibold">{stats.inactive}</p>
                  <p className="text-muted-foreground text-xs">Inactive</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 lg:px-8">
        {workflows.length === 0 ? (
          <EmptyState workspaceSlug={workspaceSlug} />
        ) : (
          <>
            {/* Toolbar */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Search */}
              <div className="relative max-w-sm flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search workflows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-lg border border-border/50 bg-card/50 pr-4 pl-10 text-sm placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Filters and view toggle */}
              <div className="flex items-center gap-2">
                {/* Status filter */}
                <div className="flex items-center rounded-lg border border-border/50 bg-card/50 p-1">
                  {(["all", "active", "inactive"] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFilterStatus(status)}
                      className={`rounded-md px-3 py-1.5 font-medium text-sm transition-colors ${
                        filterStatus === status
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>

                {/* View toggle */}
                <div className="flex items-center rounded-lg border border-border/50 bg-card/50 p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                      viewMode === "grid"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                      viewMode === "list"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <LayoutList className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results count */}
            {searchQuery || filterStatus !== "all" ? (
              <p className="mb-4 text-muted-foreground text-sm">
                Showing {filteredWorkflows.length} of {workflows.length}{" "}
                workflows
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            ) : null}

            {/* No results */}
            {filteredWorkflows.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <XCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-medium">No workflows found</h3>
                <p className="mt-1 text-muted-foreground text-sm">
                  Try adjusting your search or filters
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterStatus("all");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}

            {/* Grid view */}
            {viewMode === "grid" && filteredWorkflows.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredWorkflows.map((workflow) => (
                  <WorkflowCard
                    key={workflow.rowId}
                    workflow={workflow}
                    workspaceSlug={workspaceSlug}
                    onDelete={() => handleDelete(workflow.rowId)}
                    isDeleting={deletingId === workflow.rowId}
                  />
                ))}
              </div>
            )}

            {/* List view */}
            {viewMode === "list" && filteredWorkflows.length > 0 && (
              <div className="space-y-3">
                {filteredWorkflows.map((workflow) => (
                  <WorkflowRow
                    key={workflow.rowId}
                    workflow={workflow}
                    workspaceSlug={workspaceSlug}
                    onDelete={() => handleDelete(workflow.rowId)}
                    isDeleting={deletingId === workflow.rowId}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
