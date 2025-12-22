import { createAuthClient } from "better-auth/client";
import { genericOAuthClient } from "better-auth/client/plugins";

/**
 * Auth browser client.
 */
const authClient = createAuthClient({
  plugins: [genericOAuthClient()],
});

export default authClient;
