import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/browser-alert")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { message, nodeId, workflowId } = await request.json();

          const alertMessage = message || "Browser Alert triggered from workflow!";

          // In a real implementation, you might want to:
          // 1. Store the alert in a database
          // 2. Send it via WebSocket to connected clients
          // 3. Queue it for display in the UI

          console.log(`Browser Alert triggered:`, {
            message: alertMessage,
            nodeId,
            workflowId,
            timestamp: new Date().toISOString(),
          });

          return Response.json({
            success: true,
            message: "Browser alert processed",
            data: {
              alertMessage,
              nodeId,
              workflowId,
              triggeredAt: new Date().toISOString(),
            },
          });
        } catch (error: any) {
          console.error("Error processing browser alert:", error);
          return Response.json(
            {
              error: "Failed to process browser alert",
              details: error.message,
            },
            { status: 500 },
          );
        }
      },
      GET: async () => {
        // Health check for the browser alert API
        return Response.json({
          status: "healthy",
          service: "browser-alert-api",
          description: "API endpoint for browser alert actions",
        });
      },
    },
  },
});
