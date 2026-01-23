import {
  Link,
  Outlet,
  createFileRoute,
  notFound,
  redirect,
  useMatches,
  useParams,
} from "@tanstack/react-router";
import {
  BookOpen,
  Cable,
  ChevronDown,
  ChevronsUpDown,
  Gauge,
  LogOut,
  MessageSquare,
  Settings,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { RiDiscordLine as DiscordIcon } from "react-icons/ri";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import signOut from "@/lib/auth/signOut";
import app from "@/lib/config/app.config";
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

  // Workflow editor gets full-screen layout without sidebar
  if (isWorkflowEditor) {
    return (
      <div className="flex h-dvh w-full flex-col">
        <Outlet />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 md:hidden">
          <SidebarTrigger className="-ml-1" />
          <div className="flex-1" />
          <Link to="/workspaces" className="font-bold text-lg">
            Vortex
          </Link>
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

/**
 * Navigation items for the workspace
 */
const workspaceNavItems = [
  {
    title: "Dashboard",
    icon: Gauge,
    href: "/workspaces/$workspaceSlug",
    exact: true,
  },
  {
    title: "Workflows",
    icon: Workflow,
    href: "/workspaces/$workspaceSlug/workflows",
  },
  {
    title: "Integrations",
    icon: Cable,
    href: "/workspaces/$workspaceSlug/integrations",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/workspaces/$workspaceSlug/settings",
  },
];

/**
 * External links
 */
const externalLinks = [
  {
    title: "Documentation",
    icon: BookOpen,
    href: app.links.docs,
  },
  {
    title: "Feedback",
    icon: MessageSquare,
    href: app.links.feedback,
  },
  {
    title: "Discord",
    icon: DiscordIcon,
    href: app.organization.discord,
  },
];

/**
 * Application sidebar for authenticated users.
 */
function AppSidebar() {
  const { session, organization } = Route.useRouteContext();
  const params = useParams({ strict: false });
  const workspaceSlug = (params as { workspaceSlug?: string }).workspaceSlug;
  const matches = useMatches();

  // Check if a route is active
  const isActive = (href: string, exact = false) => {
    const currentPath = matches[matches.length - 1]?.pathname || "";
    const targetPath = href.replace("$workspaceSlug", workspaceSlug || "");

    if (exact) {
      return currentPath === targetPath;
    }
    return currentPath.startsWith(targetPath);
  };

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      {/* Header with logo */}
      <SidebarHeader className="border-sidebar-border border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-transparent"
            >
              <Link to="/workspaces" className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Zap className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Vortex</span>
                  <span className="text-sidebar-foreground/60 text-xs">
                    Workflow Automation
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Workspaces navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <Sparkles className="mr-1 size-3" />
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={
                    matches[matches.length - 1]?.pathname === "/workspaces"
                  }
                  tooltip="All Workspaces"
                >
                  <Link to="/workspaces">
                    <ChevronsUpDown className="size-4" />
                    <span>All Workspaces</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Workspace-specific navigation */}
        {workspaceSlug && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <div className="flex size-4 items-center justify-center rounded bg-sidebar-primary/20 font-bold text-[10px] text-sidebar-primary">
                {(organization?.name || workspaceSlug).charAt(0).toUpperCase()}
              </div>
              <span className="truncate">
                {organization?.name || workspaceSlug}
              </span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {workspaceNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.href, item.exact)}
                      tooltip={item.title}
                    >
                      <Link to={item.href} params={{ workspaceSlug }}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* External links */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {externalLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User footer */}
      <SidebarFooter className="border-sidebar-border border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="size-8 rounded-lg object-cover"
                />
              ) : (
                <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary/10 font-medium text-sidebar-primary text-sm">
                  {session?.user?.name?.charAt(0) || "U"}
                </div>
              )}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {session?.user?.name || "User"}
                </span>
                <span className="truncate text-sidebar-foreground/60 text-xs">
                  {session?.user?.email}
                </span>
              </div>
              <ChevronDown className="ml-auto size-4 opacity-50" />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={signOut}
              tooltip="Sign out"
              className="text-sidebar-foreground/70 hover:text-sidebar-foreground"
            >
              <LogOut className="size-4" />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
