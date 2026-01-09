/**
 * Environment variables with validation.
 *
 * Required variables are validated at startup to fail fast.
 * Uses both import.meta.env (Vite client) and process.env (server).
 */

const env = { ...import.meta.env, ...process.env };

const {
  // Core URLs
  VITE_BASE_URL,
  VITE_API_BASE_URL,
  VITE_AUTH_BASE_URL,
  // Auth (server-side secrets)
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  AUTH_SECRET,
} = env;

// Environment helpers
export const isDevEnv = import.meta.env.DEV;
export const isProdEnv = import.meta.env.PROD;

/**
 * Assert that a required environment variable is set.
 */
function assertEnv(
  name: string,
  value: string | undefined,
): asserts value is string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}

/**
 * Assert that required environment variables are set in production.
 */
function assertProdEnv(name: string, value: string | undefined): void {
  if (isProdEnv && !value) {
    throw new Error(
      `Missing required environment variable for production: ${name}`,
    );
  }
}

// Validate required environment variables
assertEnv("VITE_BASE_URL", VITE_BASE_URL);
assertEnv("VITE_API_BASE_URL", VITE_API_BASE_URL);
assertEnv("VITE_AUTH_BASE_URL", VITE_AUTH_BASE_URL);

// Server-side auth secrets (required always for auth to work)
assertEnv("AUTH_CLIENT_ID", AUTH_CLIENT_ID);
assertEnv("AUTH_CLIENT_SECRET", AUTH_CLIENT_SECRET);

// Production-only requirements
assertProdEnv("AUTH_SECRET", AUTH_SECRET);

// Export with cleaner names
export const BASE_URL = VITE_BASE_URL;
export const API_BASE_URL = VITE_API_BASE_URL;
export const AUTH_BASE_URL = VITE_AUTH_BASE_URL;

export const API_GRAPHQL_URL = `${API_BASE_URL}/graphql`;
export const AUTH_ISSUER_URL = `${AUTH_BASE_URL}/api/auth`;

export { AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, AUTH_SECRET };
