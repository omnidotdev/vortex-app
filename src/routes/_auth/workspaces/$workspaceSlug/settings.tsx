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
              <input
                type="text"
                defaultValue={workspaceSlug}
                className="mt-1 w-full rounded-md border px-3 py-2"
              />
            </div>
            <div>
              <label className="font-medium text-sm">Slug</label>
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
          <h2 className="font-semibold text-lg">Plan</h2>
          <div className="mt-4 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Free Plan</p>
                <p className="text-muted-foreground text-sm">
                  5 workflows, 100 runs/day
                </p>
              </div>
              <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm hover:bg-primary/90">
                Upgrade
              </button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <h2 className="font-semibold text-lg text-red-600">Danger Zone</h2>
          <div className="mt-4 rounded-lg border border-red-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Delete Workspace</p>
                <p className="text-muted-foreground text-sm">
                  Permanently delete this workspace and all its data.
                </p>
              </div>
              <button className="rounded-md border border-red-600 px-4 py-2 text-red-600 text-sm hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
