import { Link, createFileRoute } from "@tanstack/react-router";
import { ExternalLinkIcon, InfoIcon, LayersIcon } from "lucide-react";

import { AUTH_BASE_URL, CONSOLE_URL } from "@/lib/config/env.config";

import type { OrganizationClaim } from "@/lib/auth/getAuth";

export const Route = createFileRoute("/_auth/workspaces/")({
  component: WorkspacesPage,
});

/**
 * Workspaces list page.
 * Displays Omni organizations from JWT claims as workspaces.
 */
function WorkspacesPage() {
  const { session } = Route.useRouteContext();

  // Get user's organizations from JWT claims
  const organizations = session?.organizations ?? [];

  return (
    <div className="flex h-full flex-col">
      {/* Sticky header */}
      <div className="shrink-0 px-12 pt-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4">
          <LayersIcon className="size-12 text-muted-foreground" />

          <h1 className="text-pretty text-center font-semibold text-2xl">
            {organizations.length
              ? "Select a workspace"
              : "Create a workspace to get started"}
          </h1>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-12 py-8">
        <div className="mx-auto w-full max-w-4xl">
          {!!organizations.length && (
            <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] justify-center gap-6">
              {organizations.map((org: OrganizationClaim) => (
                <Link
                  key={org.id}
                  to="/workspaces/$workspaceSlug"
                  params={{ workspaceSlug: org.slug }}
                  preload="intent"
                  className="relative flex h-32 flex-col items-center justify-center rounded-lg border p-4 hover:bg-accent"
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 font-semibold text-lg uppercase">
                    {org.name?.charAt(0)}
                  </div>

                  <h3 className="mt-3 truncate font-semibold">{org.name}</h3>
                  <p className="text-muted-foreground text-xs">{org.type}</p>
                </Link>
              ))}
            </div>
          )}

          {/* Info about organization management */}
          <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed bg-muted/50 p-8 text-center">
            <InfoIcon className="size-6 text-muted-foreground" />
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                Workspaces are currently managed via Omni Organizations.
              </p>
            </div>
            <a
              href={CONSOLE_URL || AUTH_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary text-sm hover:underline"
            >
              Manage Organizations
              <ExternalLinkIcon className="size-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
