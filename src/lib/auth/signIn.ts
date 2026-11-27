import authClient from "@/lib/auth/authClient";

type ProviderId = "omni";

interface Params {
  /** Redirect URL */
  redirectUrl: string;
  /** OAuth provider ID. Defaults to Omni, the only provider */
  providerId?: ProviderId;
}

/**
 * Sign in with an OAuth provider.
 *
 * Runs in the browser, so it must not depend on server-only config: the
 * provider defaults to Omni rather than being inferred from `AUTH_CLIENT_ID`,
 * which is never defined client-side. better-auth 1.7 routes generic OAuth
 * through the social-provider path, so the provider is passed as `provider` to
 * `signIn.social`
 */
const signIn = async ({ redirectUrl, providerId = "omni" }: Params) => {
  await authClient.signIn.social({
    provider: providerId,
    callbackURL: redirectUrl,
  });
};

export default signIn;
