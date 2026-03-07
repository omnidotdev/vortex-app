import { createFileRoute } from "@tanstack/react-router";

import { proxyToGatekeeper } from "@/lib/auth/gatekeeperProxy";

export const Route = createFileRoute("/api/auth/api-key/list")({
  server: {
    handlers: {
      GET: ({ request }) =>
        proxyToGatekeeper(request, "/api/auth/api-key/list"),
    },
  },
});
