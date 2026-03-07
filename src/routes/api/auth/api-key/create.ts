import { createFileRoute } from "@tanstack/react-router";

import { proxyToGatekeeper } from "@/lib/auth/gatekeeperProxy";

export const Route = createFileRoute("/api/auth/api-key/create")({
  server: {
    handlers: {
      POST: ({ request }) =>
        proxyToGatekeeper(request, "/api/auth/api-key/create"),
    },
  },
});
