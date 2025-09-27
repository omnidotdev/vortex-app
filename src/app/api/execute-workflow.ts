import { createFileRoute } from "@tanstack/react-router";
import { getTemporalClient } from "../../temporal/client";

export const Route = createFileRoute("/api/execute-workflow")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const {
            workflowId,
            workflowDefinition,
            workflowType = "simpleTestWorkflow",
          } = await request.json();

          console.log(
            "🚀 [API] Starting Vortex workflow via Temporal:",
            workflowId,
          );
          console.log(
            "📋 [API] Workflow definition:",
            JSON.stringify(workflowDefinition, null, 2),
          );
          console.log("🔍 [API] Workflow type:", workflowType);
          console.log("🔍 [API] Task queue: vortex");
          console.log("🔍 [API] Namespace: default");

          const client = await getTemporalClient();
          console.log("🔗 [API] Temporal client obtained");

          // Test connection and verify server state
          try {
            console.log("🔍 [API] Testing Temporal server connection...");
            const workflows = [];
            const listIterator = client.workflow.list({ pageSize: 1 });
            for await (const workflow of listIterator) {
              workflows.push(workflow.workflowId);
              break;
            }
            console.log("✅ [API] Can connect to Temporal server");
            console.log("📊 [API] Server has workflows:", workflows.length > 0);
          } catch (connectionError) {
            console.error(
              "❌ [API] Temporal server connection failed:",
              connectionError,
            );
          }

          // Start the Temporal workflow
          console.log("📤 [API] Sending workflow to Temporal server...");
          console.log("📤 [API] Workflow type:", workflowType);
          console.log("📤 [API] Task queue: vortex");
          console.log("📤 [API] Namespace: default");
          const handle = await client.workflow.start(workflowType, {
            args: [workflowDefinition],
            taskQueue: "vortex",
            workflowId,
          });

          console.log("✅ [API] Temporal workflow started:", handle.workflowId);
          console.log("🔗 [API] Workflow handle created successfully");

          // Check workflow status (simplified to avoid type errors)
          try {
            const description = await handle.describe();
            console.log("📊 [API] Workflow description:", description);
          } catch (describeError) {
            console.log("⚠️ [API] Could not describe workflow:", describeError);
          }

          // Don't wait for completion - return immediately so UI doesn't hang
          console.log(
            "✅ [API] Workflow started successfully, returning immediately",
          );

          return Response.json({
            success: true,
            workflowId: handle.workflowId,
            status: "started",
            temporalUI: `http://localhost:8080/namespaces/default/workflows/${handle.workflowId}`,
            message: "Workflow started successfully via Temporal",
            note: "Check Temporal UI to monitor progress",
          });
        } catch (error) {
          console.error("❌ [API] Workflow execution failed:", error);

          return Response.json(
            {
              success: false,
              error: error instanceof Error ? error.message : "Unknown error",
              troubleshooting: {
                checkWorker:
                  "Make sure Temporal worker is running: npm run worker:dev",
                checkTemporal:
                  "Make sure Temporal server is running: npm run temporal:server",
                checkWorkflow: "Verify the workflow type exists in the worker",
              },
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
              workflowId: "string (optional, will be auto-generated)",
              workflowDefinition: {
                nodes: "array of workflow nodes",
                edges: "array of workflow edges",
              },
              workflowType:
                "string (optional, defaults to 'simpleTestWorkflow')",
            },
          },
          temporalUI: "http://localhost:8080",
        });
      },
    },
  },
});
