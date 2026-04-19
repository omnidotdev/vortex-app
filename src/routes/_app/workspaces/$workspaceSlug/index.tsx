import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Cable, GitBranch } from "lucide-react";
import { useMemo } from "react";

import UsageCounter from "@/components/UsageCounter";
import { Button } from "@/components/ui/button";
import { hasBilling } from "@/lib/config/env.config";
import { DEFAULT_LIMITS, getLimitsForPlan } from "@/lib/constants/tiers";
import {
  integrationDefinitionsOptions,
  integrationsOptions,
} from "@/lib/options/integrations.options";
import workflowsOptions from "@/lib/options/workflows.options";
import { getSubscription } from "@/server/functions/subscriptions";

import type { Subscription } from "@/lib/providers/billing";

export const Route = createFileRoute("/_app/workspaces/$workspaceSlug/")({
  loader: async ({ context: { queryClient, organizationId } }) => {
    if (!organizationId) throw notFound();

    let subscription: Subscription | null = null;

    if (hasBilling) {
      try {
        subscription = await getSubscription({
          data: { organizationId },
        });
      } catch {
        // Fall back to null (shows free tier)
      }
    }

    await Promise.all([
      queryClient.ensureQueryData(workflowsOptions({ organizationId })),
      queryClient.ensureQueryData(integrationsOptions({ organizationId })),
      queryClient.ensureQueryData(integrationDefinitionsOptions({})),
    ]);

    return { organizationId, subscription };
  },
  component: WorkspaceDashboard,
});

/**
 * Workspace dashboard page.
 */
function WorkspaceDashboard() {
  const { workspaceSlug } = Route.useParams();
  const loaderData = Route.useLoaderData();
  const organizationId = loaderData?.organizationId ?? "";
  const subscription = loaderData?.subscription;

  const limits = !hasBilling
    ? DEFAULT_LIMITS
    : getLimitsForPlan(subscription?.product?.name);

  const { data: workflows } = useSuspenseQuery({
    ...workflowsOptions({ organizationId }),
    select: (data) => data?.workflows?.nodes ?? [],
  });

  const { data: integrations } = useSuspenseQuery({
    ...integrationsOptions({ organizationId }),
    select: (data) => data?.integrations?.nodes ?? [],
  });

  const { data: definitions } = useSuspenseQuery({
    ...integrationDefinitionsOptions({}),
    select: (data) => data?.integrationDefinitions?.nodes ?? [],
  });

  // Create a lookup map from integration type to definition
  const definitionsByType = useMemo(() => {
    const map = new Map<string, (typeof definitions)[number]>();
    for (const def of definitions) {
      map.set(def.rowId, def);
    }
    return map;
  }, [definitions]);

  // Guard against undefined loader data during hydration race
  if (!loaderData) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Welcome to the{" "}
        <span className="font-medium text-foreground">{workspaceSlug}</span>{" "}
        workspace
      </p>

      {/* Quick stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {/* Workflows Card */}
        <Link
          to="/workspaces/$workspaceSlug/workflows"
          params={{ workspaceSlug }}
          className="group relative overflow-hidden rounded-lg border p-6 transition-colors hover:border-foreground/20 hover:bg-muted/50"
        >
          <div className="relative">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <GitBranch className="h-4 w-4" />
              <span>Workflows</span>
            </div>
            <UsageCounter current={workflows.length} limit={limits.workflows} />
          </div>

          {/* Stacked workflow icons */}
          {workflows.length > 0 && (
            <div className="absolute right-0 bottom-0 hidden items-end gap-1 p-4 sm:flex">
              {workflows.slice(0, 8).map((workflow, i) => (
                <Link
                  key={workflow.rowId}
                  to="/workspaces/$workspaceSlug/workflows/$workflowId"
                  params={{ workspaceSlug, workflowId: workflow.rowId }}
                  className="group/item hover:!-translate-y-2 relative z-20 flex h-10 w-8 flex-col items-center justify-end transition-transform duration-300 group-hover:-translate-y-1"
                  style={{
                    transitionDelay: `${i * 30}ms`,
                  }}
                >
                  {/* Tooltip */}
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-popover-foreground text-xs opacity-0 shadow-md transition-opacity group-hover/item:opacity-100">
                    <span className="font-medium">{workflow.name}</span>
                    <span
                      className={`ml-1.5 ${workflow.isActive ? "text-green-500" : "text-muted-foreground"}`}
                    >
                      {workflow.isActive ? "● Active" : "○ Inactive"}
                    </span>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
                  </div>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-md border transition-all duration-300 hover:scale-110 ${
                      workflow.isActive
                        ? "border-green-500/30 bg-green-500/10 text-green-500 hover:border-green-500/50 hover:bg-green-500/20"
                        : "border-muted bg-muted/50 text-muted-foreground hover:border-muted-foreground/50 hover:bg-muted"
                    }`}
                  >
                    <GitBranch className="h-4 w-4" />
                  </div>
                </Link>
              ))}
              {workflows.length > 8 && (
                <Link
                  to="/workspaces/$workspaceSlug/workflows"
                  params={{ workspaceSlug }}
                  className="relative z-10 flex h-10 w-8 items-end justify-center pb-1 text-muted-foreground text-xs hover:text-foreground"
                >
                  +{workflows.length - 8}
                </Link>
              )}
              {/* Fade overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent to-background/80 opacity-60 transition-opacity duration-300 group-hover:opacity-0" />
            </div>
          )}
        </Link>

        {/* Integrations Card */}
        <Link
          to="/workspaces/$workspaceSlug/integrations"
          params={{ workspaceSlug }}
          className="group relative overflow-hidden rounded-lg border p-6 transition-colors hover:border-foreground/20 hover:bg-muted/50"
        >
          <div className="relative">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Cable className="h-4 w-4" />
              <span>Integrations</span>
            </div>
            <p className="mt-2 font-bold text-3xl">{integrations.length}</p>
          </div>

          {/* Stacked integration icons */}
          {integrations.length > 0 && (
            <div className="absolute right-0 bottom-0 hidden items-end gap-1 p-4 sm:flex">
              {integrations.slice(0, 8).map((integration, i) => {
                const definition = definitionsByType.get(integration.type);
                return (
                  <Link
                    key={integration.rowId}
                    to="/workspaces/$workspaceSlug/integrations/$integrationId"
                    params={{ workspaceSlug, integrationId: integration.rowId }}
                    className="group/item hover:!-translate-y-2 relative z-20 flex h-10 w-8 flex-col items-center justify-end transition-transform duration-300 group-hover:-translate-y-1"
                    style={{
                      transitionDelay: `${i * 30}ms`,
                    }}
                  >
                    {/* Tooltip */}
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-popover-foreground text-xs opacity-0 shadow-md transition-opacity group-hover/item:opacity-100">
                      <span className="font-medium">{integration.name}</span>
                      <span
                        className={`ml-1.5 ${integration.isEnabled ? "text-blue-500" : "text-muted-foreground"}`}
                      >
                        {integration.isEnabled ? "● Enabled" : "○ Disabled"}
                      </span>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
                    </div>
                    <div
                      className={`flex h-8 w-8 items-center justify-center overflow-hidden rounded-md border transition-all duration-300 hover:scale-110 ${
                        integration.isEnabled
                          ? "border-blue-500/30 bg-blue-500/10 hover:border-blue-500/50 hover:bg-blue-500/20 dark:bg-slate-700"
                          : "border-muted bg-white hover:border-muted-foreground/50 hover:bg-muted dark:bg-slate-700 dark:hover:bg-slate-600"
                      }`}
                    >
                      {definition?.iconUrl ? (
                        <img
                          src={definition.iconUrl}
                          alt={definition.name}
                          className="h-5 w-5 object-contain"
                        />
                      ) : (
                        <Cable className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </Link>
                );
              })}
              {integrations.length > 8 && (
                <Link
                  to="/workspaces/$workspaceSlug/integrations"
                  params={{ workspaceSlug }}
                  className="relative z-10 flex h-10 w-8 items-end justify-center pb-1 text-muted-foreground text-xs hover:text-foreground"
                >
                  +{integrations.length - 8}
                </Link>
              )}
              {/* Fade overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent to-background/80 opacity-60 transition-opacity duration-300 group-hover:opacity-0" />
            </div>
          )}
        </Link>
      </div>

      {/* Quick actions */}
      <div className="mt-8">
        <h2 className="font-semibold text-lg">Quick Actions</h2>
        <div className="mt-4 flex gap-4">
          <Button asChild variant="outline">
            <Link
              to="/workspaces/$workspaceSlug/workflows"
              params={{ workspaceSlug }}
            >
              View Workflows
            </Link>
          </Button>
          <Button asChild>
            <Link
              to="/workspaces/$workspaceSlug/workflows/new"
              params={{ workspaceSlug }}
            >
              Create Workflow
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
