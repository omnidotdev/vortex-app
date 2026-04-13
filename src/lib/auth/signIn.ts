import authClient from "@/lib/auth/authClient";
import { AUTH_CLIENT_ID } from "@/lib/config/env.config";

type ProviderId = "omni";

interface Params {
  /** Redirect URL */
  redirectUrl: string;
  /** OAuth provider ID. Defaults to first available provider */
  providerId?: ProviderId;
}

/**
 * Detect first available OAuth provider based on env vars.
 */
const getDefaultProvider = (): ProviderId | null => {
  if (AUTH_CLIENT_ID) return "omni";
  return null;
};

/**
 * Sign in with OAuth2 provider.
 */
const signIn = async ({ redirectUrl, providerId }: Params) => {
  const provider = providerId ?? getDefaultProvider();

  if (!provider) {
    // No OAuth providers configured, email/password must be used instead
    console.warn("No OAuth providers configured. Use email/password login.");
    return;
  }

  await authClient.signIn.oauth2({
    providerId: provider,
    callbackURL: redirectUrl,
  });
};

export default signIn;
