const env = { ...import.meta.env, ...process.env };

/**
 * Environment variables.
 */
export const {
  // core
  VITE_BASE_URL: BASE_URL,
  VITE_API_BASE_URL: API_BASE_URL,
  VITE_AUTH_BASE_URL: AUTH_BASE_URL,
  // auth (server-side secrets)
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  // feature flags
  VITE_FLAGS_API_HOST: FLAGS_API_HOST,
  VITE_FLAGS_CLIENT_KEY: FLAGS_CLIENT_KEY,
  // self-hosted mode
  SELF_HOSTED,
  VITE_SELF_HOSTED,
  // billing
  /** @knipignore - used by billing provider */
  VITE_BILLING_BASE_URL: BILLING_BASE_URL,
} = env;

// Internal API URL for server-to-server communication (Docker service name)
// Falls back to API_BASE_URL for non-Docker environments
const API_INTERNAL_URL =
  typeof window === "undefined"
    ? env.API_INTERNAL_URL || API_BASE_URL
    : API_BASE_URL;

export const API_GRAPHQL_URL = `${API_BASE_URL}/graphql`;

// Internal GraphQL URL for server-side requests
export const API_INTERNAL_GRAPHQL_URL = `${API_INTERNAL_URL}/graphql`;

// environment helpers
export const isDevEnv = import.meta.env.DEV;

/**
 * Whether the app is running in self-hosted mode.
 */
export const isSelfHosted =
  SELF_HOSTED === "true" || VITE_SELF_HOSTED === "true";

/**
 * Billing provider to use.
 * - "local" for self-hosted (all features unlocked)
 * - "aether" for SaaS (billing service)
 * @knipignore - used by billing provider factory
 */
export const billingProvider: "local" | "aether" = isSelfHosted
  ? "local"
  : "aether";
