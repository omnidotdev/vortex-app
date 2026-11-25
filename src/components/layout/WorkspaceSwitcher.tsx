import { workspacesUrl } from "@omnidotdev/providers/react";
import { WorkspaceSwitcher as SharedWorkspaceSwitcher } from "@omnidotdev/thornberry/workspace-switcher";
import {
  useMatches,
  useNavigate,
  useParams,
  useRouteContext,
  useRouter,
} from "@tanstack/react-router";
import { LayoutGridIcon } from "lucide-react";

import { ACCOUNT_URL } from "@/lib/config/env.config";
import { workspaceSwitchTarget } from "@/lib/workspace/switchTarget";

import type { WorkspaceOption } from "@omnidotdev/thornberry/workspace-switcher";
import type { ClientSession } from "@/lib/auth/clientSession";
import type { OrganizationClaim } from "@/lib/auth/getAuth";

/** Map a workspace from the session claims onto a switcher entry */
const toWorkspaceOption = (workspace: OrganizationClaim): WorkspaceOption => ({
  id: workspace.id,
  name: workspace.name || `@${workspace.slug}`,
  slug: workspace.slug,
  logo: workspace.logo,
  badge: workspace.type === "personal" ? "Personal" : null,
});

interface Props {
  /** Called after choosing a workspace or an entry (e.g. close a mobile sheet) */
  onNavigate?: () => void;
}

/**
 * Sidebar workspace switcher, built on the shared Omni switcher. It heads the
 * workspace's navigation, so it shows only under a workspace handle. Choosing
 * another workspace navigates to the same section there (workflows, events,
 * members, settings), or the list a page about one workflow or integration
 * sits in. Workspaces are created and managed on the account hub
 */
const WorkspaceSwitcher = ({ onNavigate }: Props) => {
  const navigate = useNavigate();
  const router = useRouter();
  const { workspaceSlug } = useParams({ strict: false });
  const fullPaths = useMatches({
    select: (matches) => matches.map((match) => match.fullPath),
  });
  const { session } = useRouteContext({ strict: false }) as {
    session?: ClientSession | null;
  };
  const workspaces = session?.organizations ?? [];

  if (!workspaceSlug || !workspaces.length) return null;

  const current = workspaces.find(
    (workspace) => workspace.slug === workspaceSlug,
  );

  const selectWorkspace = (id: string) => {
    const next = workspaces.find((workspace) => workspace.id === id);
    if (!next || next.id === current?.id) return;

    onNavigate?.();
    navigate({
      to: workspaceSwitchTarget(
        fullPaths,
        (path) => !!router.routesByPath?.[path as never],
      ),
      params: { workspaceSlug: next.slug },
    });
  };

  // Empty when the account hub is not configured, which hides the manage link
  const manageUrl = workspacesUrl(ACCOUNT_URL) || undefined;

  return (
    <SharedWorkspaceSwitcher
      variant="sidebar"
      workspaces={workspaces.map(toWorkspaceOption)}
      currentWorkspaceId={current?.id}
      onSelect={selectWorkspace}
      actions={[
        {
          id: "all-workspaces",
          label: "All workspaces",
          icon: <LayoutGridIcon />,
          onSelect: () => {
            onNavigate?.();
            navigate({ to: "/workspaces" });
          },
        },
      ]}
      manageUrl={manageUrl}
    />
  );
};

export default WorkspaceSwitcher;
