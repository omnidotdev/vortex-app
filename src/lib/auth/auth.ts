import { getCookie } from "@tanstack/react-start/server";
import { betterAuth } from "better-auth/minimal";
import { customSession, genericOAuth } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import { authCache } from "@/lib/auth/authCache";
import { createSecondaryStorage } from "@/lib/cache/client";
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
  // Persist sessions in Valkey so they survive pod restarts.
  // Without this, the in-memory adapter loses all sessions on restart,
  // causing silent session expiry after ~5 minutes.
  secondaryStorage: createSecondaryStorage(),
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
      // Match session expiration so OAuth tokens (stored in account_data cookie
      // with the same maxAge) don't expire before the session itself
      maxAge: 60 * 60 * 24 * 30,
      // use encrypted JWE for security
      strategy: "jwe",
      // auto-refresh cookie before expiry (critical for stateless mode)
      refreshCache: true,
    },
  },
  account: {
    // store OAuth tokens (access token, refresh token) in a signed cookie for stateless mode to enable automatic token refresh without a database
    storeAccountCookie: true,
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "omni",
          clientId: AUTH_CLIENT_ID!,
          clientSecret: AUTH_CLIENT_SECRET,
          discoveryUrl: `${SERVER_AUTH_BASE_URL}/.well-known/openid-configuration`,
          scopes: ["openid", "profile", "email", "offline_access"],
          accessType: "offline",
          pkce: true,
        },
      ],
    }),
    customSession(async ({ user, session }) => {
      // Try to get cached auth data (rowId, identityProviderId, organizations)
      let rowId: string | null = null;
      let identityProviderId: string | null = null;
      let organizations: OrganizationClaim[] = [];

      const cachedValue = getCookie(authCache.cookieName);
      if (cachedValue) {
        const cached = await authCache.decrypt(cachedValue);
        if (cached) {
          rowId = cached.rowId;
          identityProviderId = cached.identityProviderId;
          organizations = cached.organizations;
        }
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
