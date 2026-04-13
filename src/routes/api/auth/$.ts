import { createFileRoute } from "@tanstack/react-router";

import auth from "@/lib/auth/auth";
import { proxyToGatekeeper } from "@/lib/auth/gatekeeperProxy";

/** Paths proxied to Gatekeeper instead of handled by Better Auth */
const GATEKEEPER_PROXY_PATHS = [
  "/api/auth/api-key/create",
  "/api/auth/api-key/list",
  "/api/auth/api-key/delete",
];

/**
 * Route requests to Gatekeeper proxy or Better Auth.
 */
const handleAuth = (request: Request): Promise<Response> | Response => {
  const { pathname } = new URL(request.url);

  if (GATEKEEPER_PROXY_PATHS.includes(pathname)) {
    return proxyToGatekeeper(request, pathname);
  }

  return auth.handler(request);
};

/**
 * Auth API route handler.
 * Handles all /api/auth/* requests, proxies api-key paths to
 * Gatekeeper and delegates the rest to Better Auth.
 */
export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => handleAuth(request),
      POST: ({ request }) => handleAuth(request),
    },
  },
});
