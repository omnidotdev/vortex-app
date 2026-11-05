import { workspacesUrl } from "@omnidotdev/providers/react";
import { Button, buttonVariants } from "@omnidotdev/thornberry/button";
import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import {
  ExternalLinkIcon,
  InfoIcon,
  LayersIcon,
  LogInIcon,
  Plus,
  RefreshCw,
} from "lucide-react";

import signIn from "@/lib/auth/signIn";
import { ACCOUNT_URL } from "@/lib/config/env.config";
import { fetchFreshSession, signOutLocal } from "@/server/functions/auth";

import type { OrganizationClaim } from "@/lib/auth/getAuth";

export const Route = createFileRoute("/_app/workspaces/")({
  // Re-hydrate organizations live (bypassing the display cache) so a workspace
  // just created in the account hub shows on arrival, rather than waiting out
  // getAuth's org cache TTL. Invalidating the route re-runs this.
  loader: async () => {
    const { organizations, authDegraded } = await fetchFreshSession();
    return { organizations, authDegraded };
  },
  component: WorkspacesPage,
});

/**
 * Workspaces list page.
 *
 * Lists the Omni organizations the user is a member of as workspaces.
 * Workspace creation and management is funneled to the account hub
 * (account.omni.dev/workspaces), the single ecosystem surface that owns it, so
 * this page lists and links out rather than embedding its own creation flow.
 */
function WorkspacesPage() {
  const router = useRouter();
  const { organizations, authDegraded } = Route.useLoaderData();

  // A degraded session (refresh-token grant failed) is authenticated but has no
  // access token, so organizations came back empty. Without a signal it renders
  // identically to a genuinely workspace-less user; distinguish it so the user
  // gets a re-login prompt instead of a dead-end "create a workspace" state.
  const showReauth = authDegraded && !organizations.length;

  // Sign out the dead local session before re-authing: the better-auth session
  // is still valid (only the OAuth refresh token is dead), so signing in with an
  // active session just bounces back to the callback without re-authorizing.
  // Clearing the local session (and rowId cache) first makes the OAuth redirect
  // actually fire and mint a fresh token family.
  const handleReauth = async () => {
    try {
      await signOutLocal();
    } catch {
      // Proceed with re-auth even if local sign-out fails.
    }
    await signIn({ redirectUrl: "/workspaces" });
  };

  // The account hub owns workspace creation; link out to it. Rendered only when
  // the hub URL is configured (optional env), so a missing config degrades to
  // no button rather than a dead link.
  const newWorkspaceHref = workspacesUrl(ACCOUNT_URL);
  const NewWorkspaceLink = newWorkspaceHref
    ? ({ className }: { className?: string }) => (
        <a href={newWorkspaceHref} className={buttonVariants({ className })}>
          <Plus className="size-4" />
          New workspace
        </a>
      )
    : () => null;

  // Workspace management lives on the account hub workspaces console
  // (account.omni.dev/workspaces); reuse the account hub URL computed above
  return (
    <div className="flex h-full flex-col">
      {/* Sticky header */}
      <div className="shrink-0 px-12 pt-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4">
          <LayersIcon className="size-12 text-muted-foreground" />

          <h1 className="text-pretty text-center font-semibold text-2xl">
            {organizations.length
              ? "Select a workspace"
              : showReauth
                ? "Your session expired"
                : "Create a workspace to get started"}
          </h1>

          {!!organizations.length && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="Refresh workspaces"
                title="Refresh workspaces"
                onClick={() => router.invalidate()}
              >
                <RefreshCw className="size-4" />
              </Button>
              <NewWorkspaceLink />
            </div>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-12 py-8">
        <div className="mx-auto w-full max-w-4xl">
          {showReauth && (
            <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed bg-muted/50 p-8 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-muted-foreground">
                <LogInIcon className="size-6" />
              </div>
              <p className="mx-auto max-w-md text-muted-foreground text-sm">
                We could not refresh your session, so your workspaces could not
                be loaded. Sign in again to restore access.
              </p>
              <button
                type="button"
                onClick={handleReauth}
                className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
              >
                Sign in again
              </button>
            </div>
          )}

          {!showReauth && !!organizations.length && (
            <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] justify-center gap-6">
              {organizations.map((org: OrganizationClaim) => (
                <Link
                  key={org.id}
                  to="/@{$workspaceSlug}"
                  params={{ workspaceSlug: org.slug }}
                  preload="intent"
                  className="relative flex h-32 flex-col items-center justify-center rounded-lg border p-4 hover:bg-accent"
                >
                  {org.logo ? (
                    <img
                      src={org.logo}
                      alt={org.name ?? org.slug}
                      className="size-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 font-semibold text-lg uppercase">
                      {org.name?.charAt(0)}
                    </div>
                  )}

                  <h3 className="mt-3 w-full truncate text-center font-semibold">
                    {org.name}
                  </h3>
                  <p className="w-full truncate text-center text-muted-foreground text-xs">
                    {org.type}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {!showReauth && !organizations.length && (
            <div className="mb-8 flex justify-center">
              <NewWorkspaceLink />
            </div>
          )}

          {/* Info about workspace management */}
          {!showReauth && (
            <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed bg-muted/50 p-8 text-center">
              <InfoIcon className="size-6 text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">
                  Workspaces are currently managed via Omni Workspaces.
                </p>
              </div>
              {newWorkspaceHref && (
                <a
                  href={newWorkspaceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary text-sm hover:underline"
                >
                  Manage Workspaces
                  <ExternalLinkIcon className="size-3" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
