import { gatekeeperOrgManageUrl } from "@omnidotdev/providers/react";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { AUTH_BASE_URL } from "@/lib/config/env.config";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/~/members/")({
  component: MembersPage,
});

function MembersPage() {
  const { workspaceSlug } = Route.useParams();
  const manageUrl = AUTH_BASE_URL
    ? gatekeeperOrgManageUrl(AUTH_BASE_URL, workspaceSlug)
    : undefined;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-start gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-2xl tracking-tight">Members</h1>

        <p className="text-muted-foreground">
          Team members and roles are managed in your Omni account, so they stay
          consistent across every Omni product you use.
        </p>
      </div>

      {manageUrl && (
        <a
          href={manageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "default" })}
        >
          Manage members in Omni
          <ExternalLink className="size-4" />
        </a>
      )}
    </div>
  );
}
