import { GraphQLClient } from "graphql-request";
import { createRemoteJWKSet, jwtVerify } from "jose";

import auth from "@/lib/auth/auth";
import { API_GRAPHQL_URL, AUTH_BASE_URL } from "@/lib/config/env.config";

export interface AuthSession {
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
  };
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    rowId?: string;
    identityProviderId?: string;
  };
  accessToken?: string;
}

/**
 * Get the current auth session from cookies with access token for GraphQL.
 */
export async function getAuth(request: Request): Promise<AuthSession | null> {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) return null;

    // get access token and id token for GraphQL requests
    let accessToken: string | undefined;
    let identityProviderId: string | undefined;

    try {
      const tokenResult = await auth.api.getAccessToken({
        body: { providerId: "omni" },
        headers: request.headers,
      });
      accessToken = tokenResult?.accessToken;

      // extract claims from the ID token
      if (tokenResult?.idToken) {
        const jwks = createRemoteJWKSet(new URL(`${AUTH_BASE_URL}/.well-known/jwks.json`));
        const { payload } = await jwtVerify(tokenResult.idToken, jwks);
        identityProviderId = payload.sub;
      }
    } catch (err) {
      console.error("[getAuth] Error fetching access token:", err);
    }

    let rowId: string | undefined;

    // fetch the database `rowId` using the IDP ID
    if (accessToken && identityProviderId) {
      try {
        const graphqlClient = new GraphQLClient(API_GRAPHQL_URL!, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { userByIdentityProviderId } = await graphqlClient.request<{
          userByIdentityProviderId: { rowId: string } | null;
        }>(
          `query UserByIdentityProviderId($identityProviderId: UUID!) {
            userByIdentityProviderId(identityProviderId: $identityProviderId) {
              rowId
            }
          }`,
          { identityProviderId },
        );

        if (userByIdentityProviderId) rowId = userByIdentityProviderId.rowId;
      } catch (error) {
        console.error(
          "[getAuth] Error fetching user rowId from GraphQL:",
          error,
        );
      }
    }

    return {
      ...session,
      accessToken,
      user: {
        ...session.user,
        rowId,
        identityProviderId,
      },
    };
  } catch (error) {
    console.error("[getAuth] Failed to get auth session:", error);
    return null;
  }
}
