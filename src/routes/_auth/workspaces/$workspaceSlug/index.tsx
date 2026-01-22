import { Link, createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_auth/workspaces/$workspaceSlug/")({
  component: WorkspaceDashboard,
});

/**
 * Workspace dashboard page.
 */
function WorkspaceDashboard() {
  const { workspaceSlug } = Route.useParams();

  return (
    <div className="p-8">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Welcome to workspace: {workspaceSlug}
      </p>

      {/* Quick stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-6">
          <p className="text-muted-foreground text-sm">Workflows</p>
          <p className="mt-2 font-bold text-3xl">0</p>
        </div>
        <div className="rounded-lg border p-6">
          <p className="text-muted-foreground text-sm">Runs Today</p>
          <p className="mt-2 font-bold text-3xl">0</p>
        </div>
        <div className="rounded-lg border p-6">
          <p className="text-muted-foreground text-sm">Integrations</p>
          <p className="mt-2 font-bold text-3xl">0</p>
        </div>
        <div className="rounded-lg border p-6">
          <p className="text-muted-foreground text-sm">Plugins</p>
          <p className="mt-2 font-bold text-3xl">0</p>
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
