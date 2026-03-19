// On the server, merge process.env over import.meta.env so Railway runtime
// env vars override Vite build-time values. On the client, use import.meta.env
// only (Vite injects VITE_-prefixed vars at build time).
const env =
  typeof window === "undefined"
    ? { ...import.meta.env, ...process.env }
    : import.meta.env;

/**
 * Environment variables.
 *
 * VITE_-prefixed vars are available on both server and client.
 * Non-VITE vars (auth secrets, internal URLs) are only available during SSR.
 */

// core (client-safe)
export const BASE_URL = env.VITE_BASE_URL as string | undefined;
export const API_BASE_URL = env.VITE_API_BASE_URL as string | undefined;
export const AUTH_BASE_URL = env.VITE_AUTH_BASE_URL as string | undefined;

// auth (server-side secrets — only in process.env, never VITE_-prefixed)
export const AUTH_CLIENT_ID = env.AUTH_CLIENT_ID as string | undefined;
export const AUTH_CLIENT_SECRET = env.AUTH_CLIENT_SECRET as string | undefined;

// feature flags (client-safe)
export const FLAGS_API_HOST = env.VITE_FLAGS_API_HOST as string | undefined;
export const FLAGS_CLIENT_KEY = env.VITE_FLAGS_CLIENT_KEY as string | undefined;

// self-hosted mode (use VITE_ prefix so value is consistent across SSR and client)
export const VITE_SELF_HOSTED = env.VITE_SELF_HOSTED as string | undefined;

// billing (client-safe)
export const BILLING_BASE_URL = env.VITE_BILLING_BASE_URL as string | undefined;
export const CONSOLE_URL = env.VITE_CONSOLE_URL as string | undefined;

// Internal API URL for server-to-server communication (Docker service name)
// Falls back to API_BASE_URL for non-Docker environments
export const API_INTERNAL_URL =
  typeof window === "undefined"
    ? (env.API_INTERNAL_URL as string | undefined) || API_BASE_URL
    : API_BASE_URL;

export const API_GRAPHQL_URL = `${API_BASE_URL}/graphql`;

// Internal GraphQL URL for server-side requests
export const API_INTERNAL_GRAPHQL_URL = `${API_INTERNAL_URL}/graphql`;

// environment helpers
export const isDevEnv = import.meta.env.DEV;

/**
 * Whether the app is running in self-hosted mode.
 */
export const isSelfHosted = VITE_SELF_HOSTED === "true";

/**
 * Assert that a required environment variable is set
 */
function assertEnv(name: string, value: string | undefined): void {
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
}

// Validate required server-side env vars at startup
if (typeof window === "undefined") {
  assertEnv("VITE_API_BASE_URL", API_BASE_URL);
  assertEnv("VITE_BASE_URL", BASE_URL);
}
