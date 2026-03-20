import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  notFound,
  useRouteContext,
} from "@tanstack/react-router";
import { Clock, Loader2, UserPlus, Users, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import InviteMemberDialog from "@/components/settings/InviteMemberDialog";
import MemberRow from "@/components/settings/MemberRow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { canPerformDestructiveAction } from "@/lib/auth/roles";
import { membersOptions } from "@/lib/options/members.options";
import {
  cancelOrganizationInvitation,
  inviteOrganizationMember,
  listOrganizationInvitations,
  removeOrganizationMember,
  updateOrganizationMemberRole,
} from "@/server/functions/organizations";

import type { GatekeeperInvitation } from "@omnidotdev/providers/auth";

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/members/",
)({
  loader: async ({ context: { queryClient, organizationId, session } }) => {
    if (!organizationId) throw notFound();

    const accessToken = session?.accessToken;

    if (!accessToken) throw notFound();

    await queryClient.ensureQueryData(
      membersOptions(organizationId, accessToken),
    );

    return { organizationId, accessToken };
  },
  component: MembersPage,
});

// -- page ------------------------------------------------------------------

function MembersPage() {
  const { organizationId, accessToken } = Route.useLoaderData();
  const { organization } = useRouteContext({ from: "/_app" });
  const context = Route.useRouteContext();
  const currentUserId = context.session?.user?.rowId ?? undefined;
  const queryClient = useQueryClient();

  const isAdmin = canPerformDestructiveAction(organization);

  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [invitations, setInvitations] = useState<GatekeeperInvitation[]>([]);
  const [invitationsLoaded, setInvitationsLoaded] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const { data } = useSuspenseQuery(
    membersOptions(organizationId, accessToken),
  );
  const members = data?.data ?? [];

  // Determine if the current user is the workspace owner
  const currentMember = members.find((m) => m.userId === currentUserId);
  const isOwner = currentMember?.role === "owner";

  // Load pending invitations when admin visits page
  const loadInvitations = useCallback(async () => {
    try {
      const result = await listOrganizationInvitations({
        data: { organizationId },
      });
      setInvitations(Array.isArray(result) ? result : []);
      setInvitationsLoaded(true);
    } catch {
      // Silently fail; invitations are supplemental
    }
  }, [organizationId]);

  useEffect(() => {
    if (isAdmin && !invitationsLoaded) {
      loadInvitations();
    }
  }, [isAdmin, invitationsLoaded, loadInvitations]);

  const handleInvite = async (email: string, role: "admin" | "member") => {
    await inviteOrganizationMember({
      data: { organizationId, email, role },
    });

    toast.success("Invitation sent", {
      description: `Invited ${email} as ${role}`,
    });

    // Refresh invitations list
    loadInvitations();
  };

  const handleCancelInvitation = async (invitationId: string) => {
    setCancellingId(invitationId);

    try {
      await cancelOrganizationInvitation({ data: { invitationId } });

      setInvitations((prev) => prev.filter((inv) => inv.id !== invitationId));
      toast.success("Invitation cancelled");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to cancel invitation",
      );
    } finally {
      setCancellingId(null);
    }
  };

  const handleRoleChange = async (memberId: string, role: string) => {
    try {
      await updateOrganizationMemberRole({
        data: {
          organizationId,
          memberId,
          role: role as "admin" | "member",
        },
      });
      queryClient.invalidateQueries({
        queryKey: ["organizationMembers", organizationId],
      });
      toast.success("Role updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update role");
    }
  };

  const handleRemove = async (memberId: string) => {
    try {
      await removeOrganizationMember({
        data: { organizationId, memberId },
      });
      queryClient.invalidateQueries({
        queryKey: ["organizationMembers", organizationId],
      });
      toast.success("Member removed");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to remove member",
      );
    }
  };

  const pendingInvitations = invitations.filter(
    (inv) => inv.status === "pending",
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Team Members</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your workspace team
          </p>
        </div>

        {isAdmin && (
          <Button onClick={() => setShowInviteDialog(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        )}
      </div>

      {/* Pending invitations */}
      {isAdmin && pendingInvitations.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-3 font-medium text-muted-foreground text-sm">
            Pending Invitations
          </h2>
          <div className="space-y-2">
            {pendingInvitations.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm">{inv.email}</p>
                    <p className="text-muted-foreground text-xs">
                      Invited as{" "}
                      <Badge variant="secondary" className="text-xs">
                        {inv.role}
                      </Badge>
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={cancellingId === inv.id}
                  onClick={() => handleCancelInvitation(inv.id)}
                  aria-label={`Cancel invitation for ${inv.email}`}
                >
                  {cancellingId === inv.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <X className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        {members.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <Users className="mx-auto mb-2 h-8 w-8" />
            <p>No members found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-muted-foreground text-sm">
                <th className="pb-3 font-medium">Member</th>
                <th className="hidden pb-3 font-medium sm:table-cell">
                  Joined
                </th>
                <th className="w-24 pb-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <MemberRow
                  key={member.id}
                  member={member}
                  currentUserId={currentUserId}
                  isOwner={isOwner}
                  onRoleChange={handleRoleChange}
                  onRemove={handleRemove}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showInviteDialog && (
        <InviteMemberDialog
          onSubmit={handleInvite}
          onClose={() => setShowInviteDialog(false)}
        />
      )}
    </div>
  );
}
