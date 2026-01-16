import {
  FLAGS_API_HOST,
  FLAGS_CLIENT_KEY,
  isDevEnv,
  isProdEnv,
} from "@/lib/config/env.config";
import { FLAGS, defaultFlags } from "./defaults";

import type { GrowthBookClient } from "@growthbook/growthbook";

let gbClient: GrowthBookClient | null = null;
let initialized = false;

/**
 * Initialize feature flags.
 * Uses in-memory defaults for local dev, GrowthBook for staging/prod.
 */
export async function initializeFlags(): Promise<void> {
  if (initialized) return;

  if (isDevEnv) {
    // Local development: use in-memory defaults (no flag service connection needed)
    initialized = true;
    return;
  }

  const apiHost = FLAGS_API_HOST;
  const clientKey = FLAGS_CLIENT_KEY;

  if (!apiHost || !clientKey) {
    console.warn(
      "Feature flag environment variables not set. Using default flag values.",
    );
    initialized = true;
    return;
  }

  try {
    const { GrowthBookClient } = await import("@growthbook/growthbook");
    gbClient = new GrowthBookClient({
      apiHost,
      clientKey,
    });

    await gbClient.init({ timeout: 3000 });
    initialized = true;
  } catch (error) {
    console.error("Failed to initialize feature flags:", error);
    initialized = true;
  }
}

/**
 * Build user context for flag evaluation.
 */
export function buildFlagContext(session?: {
  user?: { id?: string; email?: string };
}) {
  const email = session?.user?.email;

  return {
    id: session?.user?.id ?? "anonymous",
    email: email ?? "",
    internal: email?.endsWith("@omni.dev") ?? false,
  };
}

/**
 * Get default value for a flag from in-memory config.
 */
function getDefaultFlagValue<T>(flagKey: string, fallback: T): T {
  const flagConfig = defaultFlags[flagKey];
  if (flagConfig) {
    return flagConfig.variants[flagConfig.defaultVariant] as T;
  }
  return fallback;
}

/**
 * Evaluate a boolean feature flag.
 * Falls back to in-memory defaults if flag service is unavailable.
 */
export async function getBooleanFlag(
  flagKey: string,
  defaultValue: boolean,
  userContext?: ReturnType<typeof buildFlagContext>,
): Promise<boolean> {
  await initializeFlags();

  // In dev mode or if client not initialized, use defaults
  if (!gbClient) {
    // In production without flag service, default to showing maintenance page
    if (isProdEnv && flagKey === FLAGS.MAINTENANCE) {
      return true;
    }
    return getDefaultFlagValue(flagKey, defaultValue);
  }

  try {
    return gbClient.isOn(flagKey, { attributes: userContext ?? {} });
  } catch (error) {
    console.error(`Failed to evaluate flag "${flagKey}":`, error);
    return getDefaultFlagValue(flagKey, defaultValue);
  }
}

// Re-export flag keys for convenience
export { FLAGS };
