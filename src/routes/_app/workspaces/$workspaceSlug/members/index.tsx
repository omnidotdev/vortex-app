import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { toast } from "sonner";

import MemberRow from "@/components/settings/MemberRow";
import { membersOptions } from "@/lib/options/members.options";
import {
  removeOrganizationMember,
  updateOrganizationMemberRole,
} from "@/server/functions/organizations";

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
  const context = Route.useRouteContext();
  const currentUserId = context.session?.user?.rowId ?? undefined;
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery(
    membersOptions(organizationId, accessToken),
  );
  const members = data?.data ?? [];

  // Determine if the current user is the workspace owner
  const currentMember = members.find((m) => m.userId === currentUserId);
  const isOwner = currentMember?.role === "owner";

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
    </div>
  );
}
