import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/settings",
)({
  component: WorkspaceSettingsPage,
});

/**
 * Workspace settings page.
 */
function WorkspaceSettingsPage() {
  const { workspaceSlug } = Route.useParams();

  return (
    <div className="p-8">
      <h1 className="font-bold text-2xl">Workspace Settings</h1>

      <div className="mt-8 max-w-2xl space-y-8">
        {/* General */}
        <section>
          <h2 className="font-semibold text-lg">General</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="font-medium text-sm">Workspace Name</label>
              <p className="mt-1 text-foreground">{workspaceSlug}</p>
            </div>
            <div>
              <label className="font-medium text-sm">Slug</label>
              <p className="mt-1 font-mono text-muted-foreground text-sm">
                {workspaceSlug}
              </p>
            </div>
          </div>
        </section>

        {/* Plan */}
        <section>
          <h2 className="font-semibold text-lg">Plan</h2>
          <div className="mt-4 rounded-lg border p-4">
            <div>
              <p className="font-medium">Free Plan</p>
              <p className="text-muted-foreground text-sm">
                5 workflows, 100 runs/day
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
