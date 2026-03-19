// Client-accessible env vars from Vite (VITE_ prefix, available on both server and client)
const viteEnv = import.meta.env;

// Server-only env vars from Node.js process (only available during SSR)
const serverEnv = typeof window === "undefined" ? process.env : {};

/**
 * Environment variables.
 *
 * VITE_-prefixed vars are read from `import.meta.env` so they are identical on
 * server and client (Vite injects them at build time). Non-VITE vars are read
 * from `process.env` and are only available during SSR.
 */

// core (client-safe)
export const BASE_URL = viteEnv.VITE_BASE_URL as string | undefined;
export const API_BASE_URL = viteEnv.VITE_API_BASE_URL as string | undefined;
export const AUTH_BASE_URL = viteEnv.VITE_AUTH_BASE_URL as string | undefined;

// auth (server-side secrets)
export const AUTH_CLIENT_ID = serverEnv.AUTH_CLIENT_ID as string | undefined;
export const AUTH_CLIENT_SECRET = serverEnv.AUTH_CLIENT_SECRET as
  | string
  | undefined;

// feature flags (client-safe)
export const FLAGS_API_HOST = viteEnv.VITE_FLAGS_API_HOST as string | undefined;
export const FLAGS_CLIENT_KEY = viteEnv.VITE_FLAGS_CLIENT_KEY as
  | string
  | undefined;

// self-hosted mode (use VITE_ prefix so value is consistent across SSR and client)
export const VITE_SELF_HOSTED = viteEnv.VITE_SELF_HOSTED as string | undefined;

// billing (client-safe)
export const BILLING_BASE_URL = viteEnv.VITE_BILLING_BASE_URL as
  | string
  | undefined;
export const CONSOLE_URL = viteEnv.VITE_CONSOLE_URL as string | undefined;

// Internal API URL for server-to-server communication (Docker service name)
// Falls back to API_BASE_URL for non-Docker environments
export const API_INTERNAL_URL =
  typeof window === "undefined"
    ? (serverEnv.API_INTERNAL_URL as string | undefined) || API_BASE_URL
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
