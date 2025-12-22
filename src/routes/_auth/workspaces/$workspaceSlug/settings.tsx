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
      <h1 className="text-2xl font-bold">Workspace Settings</h1>

      <div className="mt-8 max-w-2xl space-y-8">
        {/* General */}
        <section>
          <h2 className="text-lg font-semibold">General</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-medium">Workspace Name</label>
              <input
                type="text"
                defaultValue={workspaceSlug}
                className="mt-1 w-full rounded-md border px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Slug</label>
              <input
                type="text"
                defaultValue={workspaceSlug}
                className="mt-1 w-full rounded-md border bg-muted px-3 py-2"
                disabled
              />
            </div>
          </div>
        </section>

        {/* Plan */}
        <section>
          <h2 className="text-lg font-semibold">Plan</h2>
          <div className="mt-4 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Free Plan</p>
                <p className="text-sm text-muted-foreground">
                  5 workflows, 100 runs/day
                </p>
              </div>
              <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
                Upgrade
              </button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
          <div className="mt-4 rounded-lg border border-red-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Delete Workspace</p>
                <p className="text-sm text-muted-foreground">
                  Permanently delete this workspace and all its data.
                </p>
              </div>
              <button className="rounded-md border border-red-600 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
