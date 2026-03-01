import {
  Link,
  Outlet,
  createFileRoute,
  notFound,
  useMatches,
  useParams,
} from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  BookOpen,
  ExternalLink,
  LogOut,
  Menu,
  MessageSquare,
  Users,
} from "lucide-react";
import { RiDiscordLine as DiscordIcon } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import {
  SheetBackdrop,
  SheetCloseTrigger,
  SheetContent,
  SheetContext,
  SheetPositioner,
  SheetRoot,
  SheetTrigger,
} from "@/components/ui/sheet";
import signOut from "@/lib/auth/signOut";
import app from "@/lib/config/app.config";
import { CONSOLE_URL } from "@/lib/config/env.config";
import { EventsProvider } from "@/providers/EventsProvider";
import SidebarProvider from "@/providers/SidebarProvider";

// Noop provider for client-side (main @omnidotdev/providers entry requires Node.js)
const eventsProvider = {
  async emit() {
    return {
      eventId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
  },
};

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ params, context: { session } }) => {
    // If session doesn't exist or rowId is missing, sign out to clear stale session
    // The user may exist in the identity provider but not in the database
    if (!session?.user?.rowId) {
      const { signOutAndRedirect } = await import("@/server/functions/auth");
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
    <EventsProvider provider={eventsProvider}>
      <SidebarProvider>
        <div className="flex h-dvh w-full flex-col lg:flex-row">
          {/* Mobile header - hidden in workflow editor and on lg+ */}
          {!isWorkflowEditor && <MobileHeader />}

          {/* Desktop sidebar - hidden in workflow editor */}
          {!isWorkflowEditor && <AppSidebar />}

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </EventsProvider>
  );
}

/**
 * Mobile header with sidebar trigger for smaller viewports.
 */
function MobileHeader() {
  const { session, organization } = Route.useRouteContext();
  const params = useParams({ strict: false });
  const workspaceSlug = (params as { workspaceSlug?: string }).workspaceSlug;

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 lg:hidden">
      <Link
        to="/workspaces"
        className="flex items-center gap-2 hover:opacity-80"
      >
        <img src="/logo.png" alt="Vortex" className="h-6 w-6" />
        <span className="rounded bg-primary/10 px-1.5 py-0.5 font-medium text-primary text-xs">
          Early Access
        </span>
      </Link>

      <SheetRoot>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetBackdrop />
        <SheetPositioner side="right">
          <SheetContent side="right" className="w-64 p-0">
            <SheetContext>
              {({ setOpen }) => (
                <div className="flex h-full flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b px-4 py-4">
                    <Link
                      to="/workspaces"
                      className="flex min-w-0 items-center gap-2 hover:opacity-80"
                      onClick={() => setOpen(false)}
                    >
                      <img
                        src="/logo.png"
                        alt="Vortex"
                        className="h-6 w-6 shrink-0"
                      />
                      <span className="shrink-0 rounded bg-primary/10 px-1.5 py-0.5 font-medium text-primary text-xs">
                        Early Access
                      </span>
                    </Link>
                    <SheetCloseTrigger className="shrink-0" />
                  </div>

                  {/* Navigation */}
                  <nav className="flex-1 space-y-1 p-4">
                    <Link
                      to="/workspaces"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                      activeProps={{ className: "bg-accent" }}
                      onClick={() => setOpen(false)}
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
                          onClick={() => setOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/workspaces/$workspaceSlug/workflows"
                          params={{ workspaceSlug }}
                          className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                          activeProps={{ className: "bg-accent" }}
                          onClick={() => setOpen(false)}
                        >
                          Workflows
                        </Link>
                        <Link
                          to="/workspaces/$workspaceSlug/integrations"
                          params={{ workspaceSlug }}
                          className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                          activeProps={{ className: "bg-accent" }}
                          onClick={() => setOpen(false)}
                        >
                          Integrations
                        </Link>
                        <Link
                          to="/workspaces/$workspaceSlug/events"
                          params={{ workspaceSlug }}
                          className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                          activeProps={{ className: "bg-accent" }}
                          onClick={() => setOpen(false)}
                        >
                          Events
                        </Link>
                        <Link
                          to="/workspaces/$workspaceSlug/plugins"
                          params={{ workspaceSlug }}
                          className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                          activeProps={{ className: "bg-accent" }}
                          onClick={() => setOpen(false)}
                        >
                          Plugins
                        </Link>
                        <Link
                          to="/workspaces/$workspaceSlug/dlq"
                          params={{ workspaceSlug }}
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                          activeProps={{ className: "bg-accent" }}
                          onClick={() => setOpen(false)}
                        >
                          <AlertTriangle className="h-4 w-4" />
                          Dead Letter Queue
                        </Link>
                        <Link
                          to="/workspaces/$workspaceSlug/monitoring"
                          params={{ workspaceSlug }}
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                          activeProps={{ className: "bg-accent" }}
                          onClick={() => setOpen(false)}
                        >
                          <Activity className="h-4 w-4" />
                          Monitoring
                        </Link>
                        <Link
                          to="/workspaces/$workspaceSlug/members"
                          params={{ workspaceSlug }}
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                          activeProps={{ className: "bg-accent" }}
                          onClick={() => setOpen(false)}
                        >
                          <Users className="h-4 w-4" />
                          Members
                        </Link>
                        <Link
                          to="/workspaces/$workspaceSlug/settings"
                          params={{ workspaceSlug }}
                          className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                          activeProps={{ className: "bg-accent" }}
                          onClick={() => setOpen(false)}
                        >
                          Settings
                        </Link>
                      </>
                    )}
                  </nav>

                  {/* Omni Links */}
                  <div className="space-y-1 border-t p-4">
                    <a
                      href={app.links.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground text-sm hover:bg-accent hover:text-foreground"
                    >
                      <BookOpen className="h-4 w-4" />
                      Docs
                    </a>
                    <a
                      href={app.links.feedback}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground text-sm hover:bg-accent hover:text-foreground"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Provide Feedback
                    </a>
                    <a
                      href={app.organization.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground text-sm hover:bg-accent hover:text-foreground"
                    >
                      <DiscordIcon className="h-4 w-4" />
                      Join Omni Discord
                    </a>
                  </div>

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
                    {CONSOLE_URL && (
                      <a
                        href={CONSOLE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 flex w-full items-center gap-2 rounded-md px-3 py-2 text-muted-foreground text-sm hover:bg-accent hover:text-foreground"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Manage account
                      </a>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 w-full justify-start text-muted-foreground"
                      onClick={signOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </Button>
                  </div>
                </div>
              )}
            </SheetContext>
          </SheetContent>
        </SheetPositioner>
      </SheetRoot>
    </header>
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
          <Link
            to="/workspaces"
            className="flex items-center gap-2 hover:opacity-80"
          >
            <img src="/logo.png" alt="Vortex" className="h-6 w-6" />
            <span className="rounded bg-primary/10 px-1.5 py-0.5 font-medium text-primary text-xs">
              Early Access
            </span>
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
                to="/workspaces/$workspaceSlug/integrations"
                params={{ workspaceSlug }}
                className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                activeProps={{ className: "bg-accent" }}
              >
                Integrations
              </Link>
              <Link
                to="/workspaces/$workspaceSlug/events"
                params={{ workspaceSlug }}
                className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                activeProps={{ className: "bg-accent" }}
              >
                Events
              </Link>
              <Link
                to="/workspaces/$workspaceSlug/plugins"
                params={{ workspaceSlug }}
                className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                activeProps={{ className: "bg-accent" }}
              >
                Plugins
              </Link>
              <Link
                to="/workspaces/$workspaceSlug/dlq"
                params={{ workspaceSlug }}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                activeProps={{ className: "bg-accent" }}
              >
                <AlertTriangle className="h-4 w-4" />
                Dead Letter Queue
              </Link>
              <Link
                to="/workspaces/$workspaceSlug/monitoring"
                params={{ workspaceSlug }}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                activeProps={{ className: "bg-accent" }}
              >
                <Activity className="h-4 w-4" />
                Monitoring
              </Link>
              <Link
                to="/workspaces/$workspaceSlug/members"
                params={{ workspaceSlug }}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                activeProps={{ className: "bg-accent" }}
              >
                <Users className="h-4 w-4" />
                Members
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

        {/* Omni Links */}
        <div className="space-y-1 border-t p-4">
          <a
            href={app.links.docs}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground text-sm hover:bg-accent hover:text-foreground"
          >
            <BookOpen className="h-4 w-4" />
            Docs
          </a>
          <a
            href={app.links.feedback}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground text-sm hover:bg-accent hover:text-foreground"
          >
            <MessageSquare className="h-4 w-4" />
            Provide Feedback
          </a>
          <a
            href={app.organization.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground text-sm hover:bg-accent hover:text-foreground"
          >
            <DiscordIcon className="h-4 w-4" />
            Join Omni Discord
          </a>
        </div>

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
          {CONSOLE_URL && (
            <a
              href={CONSOLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-full items-center gap-2 rounded-md px-3 py-2 text-muted-foreground text-sm hover:bg-accent hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              Manage account
            </a>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="mt-3 w-full justify-start text-muted-foreground"
            onClick={signOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </aside>
  );
}
