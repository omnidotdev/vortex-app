import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import useDialogStore, { DialogType } from "@/lib/hooks/store/useDialogStore";
import workspacesOptions from "@/lib/options/workspaces.options";

export const Route = createFileRoute("/_auth/workspaces/")({
  component: WorkspacesPage,
});

/**
 * Workspaces list page.
 */
function WorkspacesPage() {
  const { session } = Route.useRouteContext();

  // If user doesn't have a rowId yet (first login, not synced to API),
  // show empty state
  if (!session?.user?.rowId) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl">Workspaces</h1>
        </div>
        <div className="mt-8 rounded-lg border border-dashed p-12 text-center">
          <h3 className="font-medium text-lg">Setting up your account...</h3>
          <p className="mt-2 text-muted-foreground text-sm">
            Please wait while we finish setting up your account.
          </p>
        </div>
      </div>
    );
  }

  return <WorkspacesList userId={session.user.rowId} />;
}

function WorkspacesList({ userId }: { userId: string }) {
  const { data } = useSuspenseQuery({
    ...workspacesOptions({ userId }),
  });

  const { setIsOpen: setIsCreateWorkspaceOpen } = useDialogStore({
    type: DialogType.CreateWorkspace,
  });

  const workspaces = data?.workspaces?.nodes ?? [];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Workspaces</h1>
        <Button onClick={() => setIsCreateWorkspaceOpen(true)}>
          <PlusIcon className="mr-2 size-4" />
          Create Workspace
        </Button>
      </div>

      {workspaces.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed p-12 text-center">
          <h3 className="font-medium text-lg">No workspaces yet</h3>
          <p className="mt-2 text-muted-foreground text-sm">
            Create your first workspace to get started with Vortex.
          </p>
          <Button
            className="mt-4"
            onClick={() => setIsCreateWorkspaceOpen(true)}
          >
            <PlusIcon className="mr-2 size-4" />
            Create Workspace
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workspaces.map((workspace) => (
            <Link
              key={workspace.rowId}
              to="/workspaces/$workspaceSlug"
              params={{ workspaceSlug: workspace.slug }}
              className="block rounded-lg border p-6 hover:bg-accent"
            >
              <h3 className="font-semibold">{workspace.name}</h3>
              <p className="mt-1 text-muted-foreground text-sm">
                {workspace.tier.toLowerCase()} plan
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
