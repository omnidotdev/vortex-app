/**
 * Cache client for session persistence.
 *
 * Connects to Valkey/Redis when `CACHE_URL` is set. Without it, Better Auth
 * falls back to its in-memory adapter, which is lost on every pod restart.
 */

import Valkey from "iovalkey";

const { CACHE_URL } = process.env;

/**
 * Lazily-connected Valkey client, or `null` when `CACHE_URL` is absent.
 */
export const cacheClient = CACHE_URL
  ? new Valkey(CACHE_URL, { lazyConnect: true })
  : null;

let connected = false;

/**
 * Ensure the cache connection is open. Safe to call repeatedly.
 */
async function ensureConnected(): Promise<void> {
  if (!cacheClient || connected) return;

  cacheClient.on("error", (err) => {
    console.error(
      "[cache] connection error:",
      err instanceof Error ? err.message : String(err),
    );
  });

  await cacheClient.connect();
  connected = true;
}

/**
 * Build a `secondaryStorage` adapter for Better Auth.
 *
 * Better Auth calls `get`, `set`, and `delete` to persist session data
 * outside of its (absent) database. When no cache is configured the
 * returned value is `undefined` so Better Auth falls back to in-memory.
 */
export function createSecondaryStorage():
  | {
      get: (key: string) => Promise<string | null>;
      set: (key: string, value: string, ttl?: number) => Promise<void>;
      delete: (key: string) => Promise<void>;
    }
  | undefined {
  if (!cacheClient) return undefined;

  return {
    async get(key) {
      await ensureConnected();
      return cacheClient.get(key);
    },

    async set(key, value, ttl) {
      await ensureConnected();

      if (ttl) {
        await cacheClient.set(key, value, "EX", ttl);
      } else {
        await cacheClient.set(key, value);
      }
    },

    async delete(key) {
      await ensureConnected();
      await cacheClient.del(key);
    },
  };
}
