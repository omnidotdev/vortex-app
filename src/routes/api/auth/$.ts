import { createFileRoute } from "@tanstack/react-router";

import auth from "@/lib/auth/auth";

/**
 * Auth API route handler.
 * Handles all /api/auth/* requests via Better Auth.
 */
export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => auth.handler(request),
      POST: ({ request }) => auth.handler(request),
    },
  },
});
