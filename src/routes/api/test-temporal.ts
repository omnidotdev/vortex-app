import { createFileRoute } from "@tanstack/react-router";
import { getTemporalClient } from "../../temporal/client";

export const Route = createFileRoute("/api/test-temporal")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const {
            workflowType = "discordActionWorkflow",
            input = {
              actionName: "sendMessageWithBot",
              props: {
                channel_id: "test-channel-id",
                message: "🧪 Test message from Temporal workflow!",
              },
              auth: "test-auth-token",
            },
          } = body;

          console.log("🧪 [API] Starting test workflow:", workflowType);
          console.log(
            "📋 [API] Workflow input:",
            JSON.stringify(input, null, 2),
          );

          const client = await getTemporalClient();

          // Start the workflow
          const handle = await client.workflow.start(workflowType, {
            args: [input],
            taskQueue: "vortex",
            workflowId: `test-${workflowType}-${Date.now()}`,
          });

          console.log(
            "✅ [API] Workflow started successfully:",
            handle.workflowId,
          );

          // Get the result (this will wait for completion)
          const result = await handle.result();

          console.log("🎉 [API] Workflow completed with result:", result);

          return Response.json({
            success: true,
            workflowId: handle.workflowId,
            workflowType,
            result,
            message: "Test workflow completed successfully!",
            temporalUI: `http://localhost:8080/namespaces/default/workflows/${handle.workflowId}`,
            instructions: {
              checkLogs:
                "Check the console for [TEMPORAL WORKFLOW] and [TEMPORAL ACTIVITY] logs",
              viewInUI: `Visit http://localhost:8080/namespaces/default/workflows/${handle.workflowId}`,
              status:
                "Workflow completed - you should see it in Temporal UI history",
            },
          });
        } catch (error) {
          console.error("❌ [API] Test workflow failed:", error);

          return Response.json(
            {
              success: false,
              error: error instanceof Error ? error.message : "Unknown error",
              troubleshooting: {
                checkWorker:
                  "Make sure Temporal worker is running: npm run worker:dev",
                checkTemporal:
                  "Make sure Temporal server is running: npm run temporal:server",
                checkNamespace:
                  "Check namespace in Temporal UI: http://localhost:8080",
                checkTaskQueue:
                  "Verify task queue 'vortex' is configured correctly",
              },
            },
            { status: 500 },
          );
        }
      },

      GET: async () => {
        try {
          const client = await getTemporalClient();

          console.log("📊 [API] Listing recent workflows...");

          // List recent workflows
          const workflows = [];
          const listIterator = client.workflow.list({
            pageSize: 10,
          });

          for await (const workflow of listIterator) {
            workflows.push({
              workflowId: workflow.workflowId,
              workflowType: workflow.workflowType,
              status: workflow.status?.name || "unknown",
              startTime: workflow.startTime?.toISOString(),
              closeTime: workflow.closeTime?.toISOString(),
              taskQueue: workflow.taskQueue,
            });

            // Only show first 10
            if (workflows.length >= 10) break;
          }

          console.log(`📊 [API] Found ${workflows.length} recent workflows`);

          return Response.json({
            success: true,
            recentWorkflows: workflows,
            temporalUI: "http://localhost:8080/namespaces/default/workflows",
            instructions: {
              startTest: "POST to this endpoint to start a test workflow",
              viewUI: "Visit http://localhost:8080 to see Temporal UI",
              testDiscord:
                "POST with workflowType 'discordActionWorkflow' to test Discord integration",
            },
            examples: {
              testDiscordAction: {
                workflowType: "discordActionWorkflow",
                input: {
                  actionName: "sendMessageWithBot",
                  props: {
                    channel_id: "your-channel-id",
                    message: "Hello from Temporal!",
                  },
                  auth: "your-bot-token",
                },
              },
              testDiscordTrigger: {
                workflowType: "discordTriggerWorkflow",
                input: {
                  triggerName: "new_message",
                  props: {
                    channel: "your-channel-id",
                    limit: 5,
                  },
                  auth: "your-bot-token",
                },
              },
            },
          });
        } catch (error) {
          console.error("❌ [API] Failed to list workflows:", error);
          return Response.json(
            {
              success: false,
              error: error instanceof Error ? error.message : "Unknown error",
              troubleshooting: {
                connection:
                  "Check if Temporal server is running and accessible",
                client: "Verify Temporal client configuration",
              },
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
