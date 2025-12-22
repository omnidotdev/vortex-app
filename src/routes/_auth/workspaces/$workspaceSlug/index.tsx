import { Link, createFileRoute } from "@tanstack/react-router";

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
          <Link
            to="/workspaces/$workspaceSlug/workflows"
            params={{ workspaceSlug }}
            className="rounded-md border px-4 py-2 text-sm hover:bg-accent"
          >
            View Workflows
          </Link>
          <Link
            to="/workspaces/$workspaceSlug/workflows/new"
            params={{ workspaceSlug }}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm hover:bg-primary/90"
          >
            Create Workflow
          </Link>
        </div>
      </div>
    </div>
  );
}
