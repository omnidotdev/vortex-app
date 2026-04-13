import { createAuthCache, createOidcClient } from "@omnidotdev/providers/auth";

import { SERVER_AUTH_BASE_URL } from "@/lib/config/env.config";

export const oidc = createOidcClient({ authBaseUrl: SERVER_AUTH_BASE_URL! });
export const authCache = createAuthCache({ appName: "vortex" });
