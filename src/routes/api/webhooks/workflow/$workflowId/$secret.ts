import { Hatchet } from "@hatchet-dev/typescript-sdk";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/api/webhooks/workflow/$workflowId/$secret",
)({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        const { workflowId, secret } = params;

        try {
          // Parse request body
          let triggerData: Record<string, unknown> = {};
          const contentType = request.headers.get("content-type") || "";

          if (contentType.includes("application/json")) {
            triggerData = await request.json();
          } else if (
            contentType.includes("application/x-www-form-urlencoded")
          ) {
            const formData = await request.formData();
            triggerData = Object.fromEntries(formData.entries());
          } else {
            // Try to parse as JSON anyway
            const text = await request.text();
            if (text) {
              try {
                triggerData = JSON.parse(text);
              } catch {
                triggerData = { body: text };
              }
            }
          }

          // TODO: Validate webhook secret against stored workflow secret
          // For now, we'll trust the secret matches (should query DB in production)

          // Initialize Hatchet client
          const hatchet = Hatchet.init();

          // Generate workflow run ID
          const workflowRunId = `wf-run-${Date.now()}-${Math.random().toString(36).substring(7)}`;

          // Trigger the workflow via Hatchet event
          await hatchet.event.push("workflow:webhook-trigger", {
            workflowId,
            workflowRunId,
            webhookSecret: secret,
            triggerData,
            triggeredAt: new Date().toISOString(),
            headers: Object.fromEntries(request.headers.entries()),
          });

          return Response.json({
            success: true,
            workflowId,
            workflowRunId,
            message: "Webhook received, workflow triggered",
          });
        } catch (error) {
          console.error("Webhook processing failed:", error);

          return Response.json(
            {
              success: false,
              error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
          );
        }
      },

      GET: async ({ params }) => {
        const { workflowId } = params;

        return Response.json({
          message: "Vortex Webhook Endpoint",
          workflowId,
          usage: {
            method: "POST",
            contentTypes: [
              "application/json",
              "application/x-www-form-urlencoded",
            ],
            body: "Any JSON payload - will be passed to the workflow as trigger data",
          },
          example: {
            curl: `curl -X POST -H "Content-Type: application/json" -d '{"event": "test"}' <this-url>`,
          },
        });
      },
    },
  },
});
