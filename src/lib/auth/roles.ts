import type { OrganizationClaim } from "@omnidotdev/providers/auth";

type WorkspaceRole = "owner" | "admin" | "member";

/**
 * Derive the highest role from an organization claim's roles array.
 */
function deriveRole(organization?: OrganizationClaim): WorkspaceRole {
  if (!organization?.roles?.length) return "member";

  const roles = organization.roles;
  if (roles.includes("owner")) return "owner";
  if (roles.includes("admin")) return "admin";

  return "member";
}

/**
 * Check whether the user's role permits destructive actions
 * (delete, revert, replay, discard, revoke).
 */
function canPerformDestructiveAction(
  organization?: OrganizationClaim,
): boolean {
  const role = deriveRole(organization);

  return role === "owner" || role === "admin";
}

export type { WorkspaceRole };
export { canPerformDestructiveAction, deriveRole };
