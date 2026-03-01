/**
 * A workspace member returned by the members REST API.
 */
type Member = {
  userId: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: "owner" | "admin" | "member";
  joinedAt: string;
};

/**
 * Response from GET /api/v1/organizations/:orgId/members.
 */
type MembersResponse = {
  members: Member[];
};

export type { Member, MembersResponse };
