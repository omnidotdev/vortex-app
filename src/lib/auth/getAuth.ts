import { createGetAuth } from "@omnidotdev/providers/auth";
import { setCookie } from "@tanstack/react-start/server";

import auth from "@/lib/auth/auth";
import { authCache, oidc } from "@/lib/auth/authCache";

import type { ResolveRowIdFn } from "@omnidotdev/providers/auth";

export type {
  GetAuthSession,
  OrganizationClaim,
} from "@omnidotdev/providers/auth";

/**
 * Resolve the app's user identity.
 *
 * `rowId` gates the authenticated route guard (a session without it is treated
 * as unprovisioned and bounced to the landing page). The vortex-db user row is
 * provisioned just-in-time by the API's authentication plugin on the first
 * authenticated request, and every query is scoped server-side from the JWT
 * (`observer`), never from a client-supplied user id. So the Gatekeeper
 * identity id is a sufficient identity here: it makes the guard pass for any
 * authenticated user without a schema round-trip, and avoids exposing a
 * user-by-identity lookup on the API (an account-enumeration vector).
 */
export const resolveRowId: ResolveRowIdFn = async ({ identityProviderId }) =>
  identityProviderId ?? null;

const getAuth = createGetAuth({
  authApi: auth.api,
  oidc,
  authCache,
  setCookie,
  resolveRowId,
});

export { getAuth };
