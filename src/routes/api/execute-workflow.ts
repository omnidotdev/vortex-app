import { createFileRoute } from "@tanstack/react-router";

import { getAuth } from "@/lib/auth/getAuth";
import { API_BASE_URL } from "@/lib/config/env.config";

export const Route = createFileRoute("/api/execute-workflow")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const auth = await getAuth(request);
        if (!auth) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        try {
          const body = await request.json();
          const { workflowId, triggerData = {} } = body;

          if (!workflowId) {
            return Response.json(
              { success: false, error: "workflowId is required" },
              { status: 400 },
            );
          }

          // Proxy to the API's trigger endpoint
          const apiUrl = `${API_BASE_URL}/api/v1/workflows/${workflowId}/trigger`;
          const internalSecret = process.env.INTERNAL_API_SECRET;

          // Prefer internal secret for service-to-service auth,
          // fall back to user's access token for session-based auth
          const bearerToken = internalSecret || auth.accessToken;

          const res = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify({ data: triggerData }),
          });

          const result = await res.json();

          if (!res.ok) {
            return Response.json(
              { success: false, error: result.error ?? "Trigger failed" },
              { status: res.status },
            );
          }

          return Response.json({
            success: true,
            ...result,
          });
        } catch (error) {
          return Response.json(
            {
              success: false,
              error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
          );
        }
      },

      GET: async () => {
        return Response.json({
          message: "Vortex Workflow Execution API",
          usage: {
            method: "POST",
            body: {
              workflowId: "string (required, the workflow database ID)",
              triggerData: "object (optional, data passed to trigger)",
            },
          },
        });
      },
    },
  },
});
