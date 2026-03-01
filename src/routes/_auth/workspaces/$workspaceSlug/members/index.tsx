import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { toast } from "sonner";

import MemberRow from "@/components/settings/MemberRow";
import { API_BASE_URL } from "@/lib/config/env.config";
import { getCurrentAuthHeaders } from "@/lib/graphql/graphqlClientFactory";
import { membersOptions } from "@/lib/options/members.options";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/members/",
)({
  loader: async ({ context: { queryClient, organizationId } }) => {
    if (!organizationId) throw notFound();
    await queryClient.ensureQueryData(membersOptions(organizationId));
    return { organizationId };
  },
  component: MembersPage,
});

// -- helpers ---------------------------------------------------------------

/**
 * Update a member's role.
 */
async function updateMemberRole(
  organizationId: string,
  userId: string,
  role: string,
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/organizations/${organizationId}/members/${userId}/role`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...getCurrentAuthHeaders(),
      },
      body: JSON.stringify({ role }),
    },
  );

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(body?.error ?? "Failed to update role");
  }
}

/**
 * Remove a member from the workspace.
 */
async function removeMember(
  organizationId: string,
  userId: string,
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/organizations/${organizationId}/members/${userId}`,
    {
      method: "DELETE",
      headers: getCurrentAuthHeaders(),
    },
  );

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(body?.error ?? "Failed to remove member");
  }
}

// -- page ------------------------------------------------------------------

function MembersPage() {
  const { organizationId } = Route.useLoaderData();
  const context = Route.useRouteContext();
  const currentUserId = context.session?.user?.rowId;
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery(membersOptions(organizationId));
  const members = data.members;

  // Determine if the current user is the workspace owner
  const currentMember = members.find((m) => m.userId === currentUserId);
  const isOwner = currentMember?.role === "owner";

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      await updateMemberRole(organizationId, userId, role);
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast.success("Role updated");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update role",
      );
    }
  };

  const handleRemove = async (userId: string) => {
    try {
      await removeMember(organizationId, userId);
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast.success("Member removed");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to remove member",
      );
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Team Members</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your workspace team
          </p>
        </div>
      </div>

      <div className="mt-8">
        {members.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <Users className="mx-auto mb-2 h-8 w-8" />
            <p>No members found</p>
          </div>
        ) : (
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b text-left text-muted-foreground text-sm">
                <th className="w-48 pb-3 font-medium">Member</th>
                <th className="w-32 pb-3 font-medium">Role</th>
                <th className="w-32 pb-3 font-medium">Joined</th>
                <th className="w-24 pb-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <MemberRow
                  key={member.userId}
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
    </div>
  );
}
