import authClient from "@/lib/auth/authClient";

interface Params {
  /** Redirect URL. */
  redirectUrl: string;
}

/**
 * Sign in with OAuth2 provider.
 */
const signIn = async ({ redirectUrl }: Params) => {
  await authClient.signIn.oauth2({
    providerId: "omni",
    callbackURL: redirectUrl,
  });
};

export default signIn;
