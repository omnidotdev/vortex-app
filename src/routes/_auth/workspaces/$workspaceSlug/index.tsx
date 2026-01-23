import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Cable, GitBranch } from "lucide-react";

import { Button } from "@/components/ui/button";
import { integrationsOptions } from "@/lib/options/integrations.options";
import workflowsOptions from "@/lib/options/workflows.options";

export const Route = createFileRoute("/_auth/workspaces/$workspaceSlug/")({
  loader: async ({ context: { queryClient, organizationId } }) => {
    if (!organizationId) throw notFound();

    await Promise.all([
      queryClient.ensureQueryData(workflowsOptions({ organizationId })),
      queryClient.ensureQueryData(integrationsOptions({ organizationId })),
    ]);

    return { organizationId };
  },
  component: WorkspaceDashboard,
});

/**
 * Workspace dashboard page.
 */
function WorkspaceDashboard() {
  const { workspaceSlug } = Route.useParams();
  const { organizationId } = Route.useLoaderData();

  const { data: workflows } = useSuspenseQuery({
    ...workflowsOptions({ organizationId }),
    select: (data) => data?.workflows?.nodes ?? [],
  });

  const { data: integrations } = useSuspenseQuery({
    ...integrationsOptions({ organizationId }),
    select: (data) => data?.integrations?.nodes ?? [],
  });

  return (
    <div className="p-8">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Welcome to workspace: {workspaceSlug}
      </p>

      {/* Quick stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {/* Workflows Card */}
        <div className="group relative overflow-hidden rounded-lg border p-6">
          <div className="relative z-10">
            <p className="text-muted-foreground text-sm">Workflows</p>
            <p className="mt-2 font-bold text-3xl">{workflows.length}</p>
          </div>

          {/* Stacked workflow icons */}
          {workflows.length > 0 && (
            <div className="absolute right-0 bottom-0 flex items-end gap-1 p-4">
              {workflows.slice(0, 8).map((workflow, i) => (
                <Link
                  key={workflow.rowId}
                  to="/workspaces/$workspaceSlug/workflows/$workflowId"
                  params={{ workspaceSlug, workflowId: workflow.rowId }}
                  className="hover:!-translate-y-2 relative z-10 flex h-10 w-8 flex-col items-center justify-end transition-transform duration-300 group-hover:-translate-y-1"
                  style={{
                    transitionDelay: `${i * 30}ms`,
                  }}
                  title={workflow.name}
                >
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
        </div>

        {/* Integrations Card */}
        <div className="group relative overflow-hidden rounded-lg border p-6">
          <div className="relative z-10">
            <p className="text-muted-foreground text-sm">Integrations</p>
            <p className="mt-2 font-bold text-3xl">{integrations.length}</p>
          </div>

          {/* Stacked integration icons */}
          {integrations.length > 0 && (
            <div className="absolute right-0 bottom-0 flex items-end gap-1 p-4">
              {integrations.slice(0, 8).map((integration, i) => (
                <Link
                  key={integration.rowId}
                  to="/workspaces/$workspaceSlug/integrations/$integrationId"
                  params={{ workspaceSlug, integrationId: integration.rowId }}
                  className="hover:!-translate-y-2 relative z-10 flex h-10 w-8 flex-col items-center justify-end transition-transform duration-300 group-hover:-translate-y-1"
                  style={{
                    transitionDelay: `${i * 30}ms`,
                  }}
                  title={integration.name}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-md border transition-all duration-300 hover:scale-110 ${
                      integration.isEnabled
                        ? "border-blue-500/30 bg-blue-500/10 text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/20"
                        : "border-muted bg-muted/50 text-muted-foreground hover:border-muted-foreground/50 hover:bg-muted"
                    }`}
                  >
                    <Cable className="h-4 w-4" />
                  </div>
                </Link>
              ))}
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
        </div>
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
