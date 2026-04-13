import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/_health")({
  server: {
    handlers: {
      GET: async () => {
        return Response.json({
          status: "ok",
          timestamp: Date.now(),
          service: "vortex-app",
        });
      },
    },
  },
});
