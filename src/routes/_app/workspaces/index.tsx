import { gatekeeperDashboardUrl } from "@omnidotdev/providers/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ExternalLinkIcon,
  InfoIcon,
  LayersIcon,
  LogInIcon,
} from "lucide-react";

import CreateWorkspaceButton from "@/components/workspaces/CreateWorkspaceButton";
import signIn from "@/lib/auth/signIn";
import { AUTH_BASE_URL } from "@/lib/config/env.config";
import { signOutLocal } from "@/server/functions/auth";

import type { OrganizationClaim } from "@/lib/auth/getAuth";

export const Route = createFileRoute("/_app/workspaces/")({
  component: WorkspacesPage,
});

/**
 * Workspaces list page.
 * Displays Omni organizations from JWT claims as workspaces.
 */
function WorkspacesPage() {
  const { session, authDegraded } = Route.useRouteContext();

  // Get user's organizations from JWT claims
  const organizations = session?.organizations ?? [];

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

  // Org/workspace lifecycle lives on the Gatekeeper identity dashboard
  const orgDashboardUrl = AUTH_BASE_URL
    ? gatekeeperDashboardUrl(AUTH_BASE_URL)
    : "";

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

          {!!organizations.length && <CreateWorkspaceButton />}
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

                  <h3 className="mt-3 truncate font-semibold">{org.name}</h3>
                  <p className="text-muted-foreground text-xs">{org.type}</p>
                </Link>
              ))}
            </div>
          )}

          {!showReauth && !organizations.length && (
            <div className="mb-8 flex justify-center">
              <CreateWorkspaceButton />
            </div>
          )}

          {/* Info about organization management */}
          {!showReauth && (
            <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed bg-muted/50 p-8 text-center">
              <InfoIcon className="size-6 text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">
                  Workspaces are currently managed via Omni Organizations.
                </p>
              </div>
              {orgDashboardUrl && (
                <a
                  href={orgDashboardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary text-sm hover:underline"
                >
                  Manage Organizations
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
