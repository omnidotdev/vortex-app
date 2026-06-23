import { getCookie } from "@tanstack/react-start/server";
import { betterAuth } from "better-auth";
import { customSession, genericOAuth } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import { authCache } from "@/lib/auth/authCache";
import {
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  SERVER_AUTH_BASE_URL,
  SERVER_BASE_URL,
} from "@/lib/config/env.config";

import type { OrganizationClaim } from "@omnidotdev/providers/auth";

const { AUTH_SECRET } = process.env;

/**
 * Auth server client.
 */
const auth = betterAuth({
  baseURL: SERVER_BASE_URL,
  basePath: "/api/auth",
  secret: AUTH_SECRET,
  // Trust the app's own origin for auth requests
  trustedOrigins: SERVER_BASE_URL ? [SERVER_BASE_URL] : [],
  // TODO: re-enable secondaryStorage once getAccessToken is compatible
  // secondaryStorage: createSecondaryStorage(),
  emailAndPassword: {
    enabled: false,
  },
  advanced: {
    // use custom cookie prefix to avoid collision with IDP cookies
    cookiePrefix: "vortex",
  },
  session: {
    // extend session expiration to 30 days
    expiresIn: 60 * 60 * 24 * 30,
    // refresh session if older than 1 day
    updateAge: 60 * 60 * 24,
    // enable cookie caching for stateless session validation
    cookieCache: {
      enabled: true,
      // match session expiration so the cached session does not expire before
      // the session itself
      maxAge: 60 * 60 * 24 * 30,
      // use encrypted JWE for security
      strategy: "jwe",
      // auto-refresh cookie before expiry (critical for stateless mode)
      refreshCache: true,
    },
  },
  account: {
    // store OAuth tokens (access, refresh, ID) in the database, not in a cookie.
    // stashing all three in a signed cookie pushed multi-org users past the 16KB
    // request-header limit (the ID token carries a ~2KB organization claim) and
    // triggered HTTP 431 on every request. DB storage keeps cookies small; tokens
    // are still retrieved transparently via auth.api.getAccessToken
    storeAccountCookie: false,
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "omni",
          clientId: AUTH_CLIENT_ID ?? "",
          clientSecret: AUTH_CLIENT_SECRET,
          discoveryUrl: SERVER_AUTH_BASE_URL
            ? `${SERVER_AUTH_BASE_URL}/.well-known/openid-configuration`
            : "",
          scopes: [
            "openid",
            "profile",
            "email",
            "offline_access",
            "organization",
          ],
          accessType: "offline",
          pkce: true,
          prompt: "login",
          mapProfileToUser: (profile) => ({
            name: profile.name,
            email: profile.email,
            emailVerified: profile.email_verified,
            image: profile.picture,
          }),
        },
      ],
    }),
    customSession(async ({ user, session }) => {
      // Try to get cached auth data (rowId, identityProviderId, organizations)
      let rowId: string | null = null;
      let identityProviderId: string | null = null;
      let organizations: OrganizationClaim[] = [];

      try {
        const cachedValue = getCookie(authCache.cookieName);
        if (cachedValue) {
          const cached = await authCache.decrypt(cachedValue);
          if (cached) {
            rowId = cached.rowId ?? null;
            identityProviderId = cached.identityProviderId;
            organizations = cached.organizations;
          }
        }
      } catch (err) {
        console.error("[auth] Failed to read auth cache cookie:", err);
      }

      // If cache miss, getAuth() will sync with the API and populate the cache

      return {
        user: {
          ...user,
          rowId,
          identityProviderId,
          organizations,
        },
        session,
      };
    }),
    // NB: must be the last plugin in the array
    tanstackStartCookies(),
  ],
});

export default auth;
