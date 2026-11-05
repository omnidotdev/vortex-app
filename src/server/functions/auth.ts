import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest, setCookie } from "@tanstack/react-start/server";

import auth from "@/lib/auth/auth";
import { authCache } from "@/lib/auth/authCache";
import { getAuth } from "@/lib/auth/getAuth";
import { isSessionDegraded } from "@/lib/auth/sessionState";
import {
  AUTH_CLIENT_ID,
  SERVER_AUTH_BASE_URL,
  SERVER_BASE_URL,
} from "@/lib/config/env.config";

/**
 * Resolve the current session and its organizations.
 *
 * A degraded session is authenticated (getAuth returned it) but carries no
 * access token: the refresh-token grant failed, so getAuth served the session
 * without a fresh token and userinfo org hydration was skipped, leaving
 * organizations empty. This is distinct from a genuinely workspace-less user
 * (who has a valid access token), and the workspaces page uses it to prompt a
 * re-login instead of the silent "Create a workspace to get started" state.
 *
 * `forceRefreshOrgs` bypasses getAuth's in-memory org display cache and
 * re-hydrates the list live from userinfo, so a workspace created out-of-band
 * (in the account hub) is reflected immediately instead of after the cache TTL.
 */
const loadSession = async (forceRefreshOrgs = false) => {
  const request = getRequest();

  const session = await getAuth(request, { forceRefreshOrgs });

  return {
    session,
    organizations: session?.organizations ?? [],
    authDegraded: isSessionDegraded(session),
  };
};

/**
 * Fetch the current session with access token for GraphQL.
 */
export const fetchSession = createServerFn().handler(() => loadSession());

/**
 * Fetch the session with a live organization re-hydration (bypasses the org
 * display cache). Used by the workspaces list so a workspace just created in
 * the account hub appears without waiting out the cache TTL.
 */
export const fetchFreshSession = createServerFn().handler(() =>
  loadSession(true),
);

const clearRowIdCacheCookie = () => {
  setCookie(authCache.cookieName, "", { maxAge: 0, path: "/" });
};

/**
 * Clear the rowId cache cookie.
 */
export const clearRowIdCache = createServerFn({ method: "POST" }).handler(
  async () => {
    clearRowIdCacheCookie();
  },
);

/**
 * Sign out the current user and redirect to home.
 * @knipignore - Used via dynamic import in _auth route guard
 */
export const signOutAndRedirect = createServerFn({ method: "POST" }).handler(
  async () => {
    const request = getRequest();

    try {
      await auth.api.signOut({ headers: request.headers });
    } catch {
      // Session may already be cleared by getAuth invalid_grant handler
    }
    clearRowIdCacheCookie();

    throw redirect({ to: "/" });
  },
);

/**
 * Build the IDP end_session URL for federated logout
 */
export function getIdpLogoutUrl(idTokenHint?: string): string | null {
  if (
    !SERVER_AUTH_BASE_URL ||
    !AUTH_CLIENT_ID ||
    !SERVER_BASE_URL ||
    !idTokenHint
  )
    return null;

  const endSessionUrl = new URL(`${SERVER_AUTH_BASE_URL}/oauth2/end-session`);
  endSessionUrl.searchParams.set("client_id", AUTH_CLIENT_ID);
  endSessionUrl.searchParams.set("post_logout_redirect_uri", SERVER_BASE_URL);
  endSessionUrl.searchParams.set("id_token_hint", idTokenHint);

  return endSessionUrl.toString();
}

/**
 * Sign out from the local session (server-side)
 * Returns the IDP logout URL for federated logout redirect
 */
export const signOutLocal = createServerFn({ method: "POST" }).handler(
  async () => {
    const request = getRequest();
    const headers = request.headers;

    // Grab the ID token before we destroy the local session
    let idToken: string | undefined;
    try {
      // better-auth 1.7 selects the OAuth account from its signed cookie rather
      // than by provider id (generic OAuth rebuilt on the social-provider path)
      const tokenResult = await auth.api.getAccessToken({
        body: { useAccountCookie: true },
        headers,
      });
      idToken = tokenResult?.idToken;
    } catch {
      // Token may already be expired, proceed with logout anyway
    }

    await auth.api.signOut({ headers });
    clearRowIdCacheCookie();

    return { idpLogoutUrl: getIdpLogoutUrl(idToken) };
  },
);
