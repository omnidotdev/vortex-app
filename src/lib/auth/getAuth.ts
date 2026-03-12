import { ensureFreshAccessToken } from "@omnidotdev/providers";
import { setCookie } from "@tanstack/react-start/server";
import { GraphQLClient } from "graphql-request";

import { getSdk } from "@/generated/graphql.sdk";
import auth from "@/lib/auth/auth";
import { authCache, oidc } from "@/lib/auth/authCache";
import { API_INTERNAL_GRAPHQL_URL } from "@/lib/config/env.config";

import type { OrganizationClaim } from "@omnidotdev/providers";

export type { OrganizationClaim } from "@omnidotdev/providers";

/**
 * Fetch user data (rowId + organizations) from GraphQL API by identity provider ID.
 */
async function fetchUserDataFromApi(
  accessToken: string,
  identityProviderId: string,
): Promise<{ rowId: string; organizations: OrganizationClaim[] } | null> {
  try {
    const graphqlClient = new GraphQLClient(API_INTERNAL_GRAPHQL_URL!, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const sdk = getSdk(graphqlClient);
    const { userByIdentityProviderId } = await sdk.UserByIdentityProviderId({
      identityProviderId,
    });

    if (!userByIdentityProviderId?.rowId) return null;

    const organizations: OrganizationClaim[] =
      userByIdentityProviderId.userOrganizations?.nodes
        ?.filter(Boolean)
        .map((org) => ({
          id: org.organizationId,
          slug: org.slug,
          name: org.name ?? org.slug,
          type: org.type,
          roles: [org.role],
          teams: [],
        })) ?? [];

    return { rowId: userByIdentityProviderId.rowId, organizations };
  } catch (error) {
    console.error("[getAuth] Failed to fetch user data:", error);
    return null;
  }
}

export type AuthSession = NonNullable<Awaited<ReturnType<typeof getAuth>>>;

export async function getAuth(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) return null;

    let accessToken: string | undefined;
    let organizations: OrganizationClaim[] = [];

    // Cast to access custom session properties added by customSession plugin
    const customUser = session.user as typeof session.user & {
      identityProviderId?: string | null;
      rowId?: string | null;
      organizations?: OrganizationClaim[];
    };
    let identityProviderId = customUser.identityProviderId;
    let rowId = customUser.rowId;
    const cachedOrganizations = customUser.organizations;

    // Check if we have complete cached data (avoids API call on every request)
    const hasCachedData =
      rowId && identityProviderId && cachedOrganizations?.length;

    if (hasCachedData) {
      organizations = cachedOrganizations;
    }

    try {
      const tokenResult = await ensureFreshAccessToken({
        getAccessToken: () =>
          auth.api.getAccessToken({
            body: { providerId: "omni" },
            headers: request.headers,
          }),
        refreshToken: () =>
          auth.api.refreshToken({
            body: { providerId: "omni" },
            headers: request.headers,
          }),
      });
      accessToken = tokenResult?.accessToken;

      // Extract identityProviderId from ID token (needed for user lookup)
      if (tokenResult?.idToken && !identityProviderId) {
        try {
          const payload = await oidc.verifyIdToken(tokenResult.idToken);
          identityProviderId = payload.sub ?? null;
        } catch (jwtError) {
          console.error("[getAuth] JWT verification failed:", jwtError);
        }
      }

      // Fetch user data (rowId + orgs) from API on cache miss
      if ((!rowId || !hasCachedData) && accessToken && identityProviderId) {
        const userData = await fetchUserDataFromApi(
          accessToken,
          identityProviderId,
        );

        if (userData) {
          rowId = userData.rowId;
          if (!hasCachedData) {
            organizations = userData.organizations;
          }

          const encrypted = await authCache.encrypt({
            rowId,
            identityProviderId,
            organizations,
          });
          setCookie(authCache.cookieName, encrypted, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: authCache.cookieTtlSeconds,
          });
        }
      }
    } catch (err) {
      console.error("[getAuth] Token fetch error:", err);
    }

    return {
      ...session,
      accessToken,
      organizations,
      user: {
        ...session.user,
        rowId,
        identityProviderId,
        username: session.user.name || session.user.email,
      },
    };
  } catch (error) {
    console.error("Failed to get auth session:", error);
    return null;
  }
}
