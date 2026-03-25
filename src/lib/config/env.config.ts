// VITE_-prefixed vars MUST come from import.meta.env on both server and
// client so the rendered HTML is identical (avoiding hydration mismatch).
// Server-only vars (auth secrets, internal URLs) are read from process.env
// directly and are never rendered into the HTML.
const clientEnv = import.meta.env;
const serverEnv =
  typeof window === "undefined" ? process.env : ({} as Record<string, string>);

/**
 * Environment variables.
 *
 * VITE_-prefixed vars are available on both server and client via
 * `import.meta.env` (Vite injects them at build time).
 * Non-VITE vars (auth secrets, internal URLs) are only available during SSR
 * via `process.env`.
 */

// core (client-safe, rendered into HTML -- must use clientEnv)
export const BASE_URL = clientEnv.VITE_BASE_URL as string | undefined;
export const API_BASE_URL = clientEnv.VITE_API_BASE_URL as string | undefined;
export const AUTH_BASE_URL = clientEnv.VITE_AUTH_BASE_URL as string | undefined;

// auth (server-side secrets -- never rendered, safe to read from process.env)
export const AUTH_CLIENT_ID = serverEnv.AUTH_CLIENT_ID as string | undefined;
export const AUTH_CLIENT_SECRET = serverEnv.AUTH_CLIENT_SECRET as
  | string
  | undefined;

// feature flags (used server-side via createServerFn, needs runtime fallback)
export const FLAGS_API_HOST =
  (clientEnv.VITE_FLAGS_API_HOST as string | undefined) ||
  (serverEnv.VITE_FLAGS_API_HOST as string | undefined);
export const FLAGS_CLIENT_KEY =
  (clientEnv.VITE_FLAGS_CLIENT_KEY as string | undefined) ||
  (serverEnv.VITE_FLAGS_CLIENT_KEY as string | undefined);

// billing (client-safe, rendered into HTML -- must use clientEnv)
export const BILLING_BASE_URL = clientEnv.VITE_BILLING_BASE_URL as
  | string
  | undefined;
export const CONSOLE_URL = clientEnv.VITE_CONSOLE_URL as string | undefined;

// Server-side runtime overrides for VITE_-prefixed vars. These allow Railway
// (or any runtime) to override the build-time values for server-to-server
// communication without affecting client-rendered HTML.
export const SERVER_BASE_URL =
  typeof window === "undefined"
    ? (serverEnv.VITE_BASE_URL as string | undefined) || BASE_URL
    : BASE_URL;

export const SERVER_AUTH_BASE_URL =
  typeof window === "undefined"
    ? (serverEnv.VITE_AUTH_BASE_URL as string | undefined) || AUTH_BASE_URL
    : AUTH_BASE_URL;

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
 * Whether billing is available (Aether integration configured).
 * Used to gate billing-dependent features; when false, the app
 * falls back to default (unlimited) limits.
 */
export const hasBilling = !!BILLING_BASE_URL;

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

// Startup warnings for optional integrations
if (!BILLING_BASE_URL)
  console.warn("BILLING_BASE_URL not set, billing disabled");
if (!FLAGS_API_HOST)
  console.warn("FLAGS_API_HOST not set, feature flags disabled");
