import {
  Link,
  Outlet,
  createFileRoute,
  notFound,
  redirect,
  useMatches,
  useParams,
} from "@tanstack/react-router";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import SidebarProvider from "@/providers/SidebarProvider";
import { signOutAndRedirect } from "@/server/functions/auth";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ params, context: { session } }) => {
    // Redirect to home if not authenticated
    if (!session?.user) throw redirect({ to: "/" });

    // If session exists but `rowId` is missing, the user may exist in the
    // identity provider but not in the database (stale cookie or incomplete signup)
    if (!session.user.rowId) {
      await signOutAndRedirect();
    }

    const { workspaceSlug } = params as { workspaceSlug?: string };

    if (!workspaceSlug) {
      return { organizationId: undefined };
    }

    // workspaceSlug in the URL is the org slug from JWT claims
    const orgFromClaim = session?.organizations?.find(
      (org) => org.slug === workspaceSlug,
    );

    if (!orgFromClaim) throw notFound();

    return { organizationId: orgFromClaim.id, organization: orgFromClaim };
  },
  loader: async ({ context }) => ({
    organizationId: context.organizationId,
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-bold text-2xl">Workspace Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          The workspace you're looking for doesn't exist or you don't have
          access.
        </p>
      </div>
    </div>
  ),
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  // Hide AppSidebar when in workflow editor (it has its own sidebar)
  const matches = useMatches();
  const isWorkflowEditor = matches.some((match) =>
    match.routeId.includes("/workflows/$workflowId"),
  );

  return (
    <SidebarProvider>
      <div className="flex h-dvh w-full">
        {/* Sidebar - hidden in workflow editor */}
        {!isWorkflowEditor && <AppSidebar />}

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}

/**
 * Application sidebar for authenticated users.
 */
function AppSidebar() {
  const { session, organization } = Route.useRouteContext();
  const params = useParams({ strict: false });
  const workspaceSlug = (params as { workspaceSlug?: string }).workspaceSlug;

  return (
    <aside className="hidden w-64 border-r bg-background lg:block">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center border-b px-4">
          <Link to="/workspaces" className="font-bold text-xl hover:opacity-80">
            Vortex
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          <Link
            to="/workspaces"
            className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
            activeProps={{ className: "bg-accent" }}
          >
            Workspaces
          </Link>

          {/* Workspace-specific navigation */}
          {workspaceSlug && (
            <>
              <div className="pt-4 pb-2">
                <p className="px-3 font-medium text-muted-foreground text-xs uppercase">
                  {organization?.name || workspaceSlug}
                </p>
              </div>
              <Link
                to="/workspaces/$workspaceSlug"
                params={{ workspaceSlug }}
                className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                activeOptions={{ exact: true }}
                activeProps={{ className: "bg-accent" }}
              >
                Dashboard
              </Link>
              <Link
                to="/workspaces/$workspaceSlug/workflows"
                params={{ workspaceSlug }}
                className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                activeProps={{ className: "bg-accent" }}
              >
                Workflows
              </Link>
              <Link
                to="/workspaces/$workspaceSlug/templates"
                params={{ workspaceSlug }}
                className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                activeProps={{ className: "bg-accent" }}
              >
                Templates
              </Link>
              <Link
                to="/workspaces/$workspaceSlug/integrations"
                params={{ workspaceSlug }}
                className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                activeProps={{ className: "bg-accent" }}
              >
                Integrations
              </Link>

              <Link
                to="/workspaces/$workspaceSlug/settings"
                params={{ workspaceSlug }}
                className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                activeProps={{ className: "bg-accent" }}
              >
                Settings
              </Link>
            </>
          )}
        </nav>

        {/* User */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-medium text-sm">
                {session?.user?.name?.charAt(0) || "U"}
              </div>
            )}
            <div className="flex-1 truncate">
              <p className="truncate font-medium text-sm">
                {session?.user?.name || "User"}
              </p>
              <p className="truncate text-muted-foreground text-xs">
                {session?.user?.email}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="mt-3 w-full justify-start text-muted-foreground"
            onClick={() => signOutAndRedirect()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </aside>
  );
}
