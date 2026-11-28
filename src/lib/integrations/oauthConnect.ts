import { API_BASE_URL } from "@/lib/config/env.config";
import getAuthHeaders from "@/lib/graphql/getAuthHeaders";

/** Input for starting an OAuth connection */
interface OAuthConnectRequest {
  provider: string;
  organizationId: string;
  definitionId: string;
  /** Relative app path to land on after the provider redirects back */
  returnUrl?: string;
}

/**
 * Collaborators for {@link getOAuthAuthorizationUrl}. Each defaults to the real
 * implementation; tests inject fakes
 */
interface OAuthConnectDeps {
  fetch?: typeof fetch;
  getAuthHeaders?: typeof getAuthHeaders;
  apiBaseUrl?: string;
}

/** Generic, user-facing messages for each failure the API can return */
const MESSAGES = {
  planLimit:
    "You have reached your plan's connected-account limit. Upgrade your plan to connect more integrations.",
  forbidden: "Only workspace admins can connect integrations.",
  unauthenticated: "Your session has expired. Sign in again to continue.",
  unavailable: "This integration cannot be connected right now.",
  generic: "Could not start the connection. Try again.",
} as const;

/**
 * Ask the API for the provider authorization URL.
 *
 * The session is sent in the Authorization header of an API request, since a
 * page navigation cannot carry it. The caller then navigates to the returned
 * provider URL. Throws an `Error` with a user-facing message on failure
 */
const getOAuthAuthorizationUrl = async (
  { provider, organizationId, definitionId, returnUrl }: OAuthConnectRequest,
  deps: OAuthConnectDeps = {},
): Promise<string> => {
  const {
    fetch: fetchFn = fetch,
    getAuthHeaders: authHeaders = getAuthHeaders,
    apiBaseUrl = API_BASE_URL,
  } = deps;

  let response: Response;
  try {
    response = await fetchFn(
      `${apiBaseUrl}/api/v1/oauth/${encodeURIComponent(provider)}/authorize-url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(await authHeaders()),
        },
        body: JSON.stringify({ organizationId, definitionId, returnUrl }),
      },
    );
  } catch {
    throw new Error(MESSAGES.generic);
  }

  const body = (await response.json().catch(() => null)) as {
    url?: string;
    error?: string;
  } | null;

  if (response.ok && body?.url) return body.url;

  if (response.status === 403) {
    throw new Error(
      body?.error?.startsWith("Plan limit reached")
        ? MESSAGES.planLimit
        : MESSAGES.forbidden,
    );
  }
  if (response.status === 401) throw new Error(MESSAGES.unauthenticated);
  if (response.status === 503) throw new Error(MESSAGES.unavailable);

  throw new Error(MESSAGES.generic);
};

export { getOAuthAuthorizationUrl };
