import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ExternalLinkIcon,
  InfoIcon,
  Sparkles,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { AUTH_BASE_URL } from "@/lib/config/env.config";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_auth/workspaces/")({
  component: WorkspacesPage,
});

/**
 * Workspace card component with vortex-themed styling.
 */
function WorkspaceCard({
  org,
}: {
  org: { id: string; slug: string; name: string; type: string };
}) {
  return (
    <Link
      to="/workspaces/$workspaceSlug"
      params={{ workspaceSlug: org.slug }}
      preload="intent"
      className={cn(
        "group relative flex h-40 flex-col items-center justify-center overflow-hidden rounded-xl border bg-card p-6",
        "transition-all duration-300",
        "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
        "hover:-translate-y-1",
      )}
    >
      {/* Subtle gradient background on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Glow effect */}
      <div className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />

      {/* Avatar */}
      <div
        className={cn(
          "relative flex size-14 items-center justify-center rounded-xl font-bold text-xl uppercase",
          "bg-gradient-to-br from-primary/20 to-primary/10 text-primary",
          "ring-2 ring-primary/20 transition-all duration-300",
          "group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:ring-primary/40",
        )}
      >
        {org.name?.charAt(0)}
        <Zap className="absolute -top-1 -right-1 size-4 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Name and type */}
      <h3 className="relative mt-4 max-w-full truncate font-semibold text-lg transition-colors group-hover:text-primary">
        {org.name}
      </h3>
      <p className="relative mt-1 text-muted-foreground text-xs capitalize">
        {org.type}
      </p>

      {/* Arrow indicator on hover */}
      <div className="absolute top-4 right-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
        <ArrowRight className="size-4 text-primary" />
      </div>
    </Link>
  );
}

/**
 * Workspaces list page.
 * Displays Omni organizations from JWT claims as workspaces.
 */
function WorkspacesPage() {
  const { session } = Route.useRouteContext();

  // Get user's organizations from JWT claims
  const organizations = session?.organizations ?? [];

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top gradient */}
        <div className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        {/* Floating orbs */}
        <div className="absolute top-1/4 right-1/4 size-32 animate-pulse rounded-full bg-primary/5 blur-2xl" />
        <div
          className="absolute bottom-1/4 left-1/4 size-24 rounded-full bg-primary/5 blur-2xl"
          style={{ animationDelay: "1s", animationDuration: "3s" }}
        />
      </div>

      {/* Header */}
      <div className="relative shrink-0 px-6 pt-12 sm:px-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4">
          {/* Icon with glow */}
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-xl" />
            <div className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 ring-1 ring-primary/20">
              <Sparkles className="size-8 text-primary" />
            </div>
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-pretty font-bold text-3xl tracking-tight">
              {organizations.length ? "Your Workspaces" : "Welcome to Vortex"}
            </h1>
            <p className="text-muted-foreground">
              {organizations.length
                ? "Select a workspace to start building automations"
                : "Create a workspace to get started with workflow automation"}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="relative flex-1 overflow-y-auto px-6 py-10 sm:px-12">
        <div className="mx-auto w-full max-w-4xl">
          {/* Workspace grid */}
          {!!organizations.length && (
            <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {organizations.map((org) => (
                <WorkspaceCard key={org.id} org={org} />
              ))}
            </div>
          )}

          {/* Info card */}
          <div
            className={cn(
              "relative overflow-hidden rounded-xl border border-primary/30 border-dashed bg-gradient-to-br from-primary/5 via-background to-primary/5 p-8",
            )}
          >
            {/* Subtle pattern */}
            <div className="pointer-events-none absolute inset-0 bg-[length:24px_24px] bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary)/0.03)_1px,transparent_1px)]" />

            <div className="relative flex flex-col items-center gap-5 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                <InfoIcon className="size-5 text-primary" />
              </div>

              <div className="space-y-2">
                <p className="font-medium">
                  Workspaces are managed via Omni Organizations
                </p>
                <p className="text-muted-foreground text-sm">
                  Create and manage your organizations to add new workspaces.
                  This experience will be streamlined soon.
                </p>
              </div>

              <Button asChild variant="outline" className="gap-2">
                <a
                  href={AUTH_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Manage Organizations
                  <ExternalLinkIcon className="size-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
