import { createFileRoute } from "@tanstack/react-router";

import { getTemporalClient } from "../../temporal/client";

import type { WorkflowDefinition } from "../../lib/workflow/types";

export const Route = createFileRoute("/api/execute-workflow")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const {
            workflowId,
            workflowDefinition,
            workflowType = "executeVortexWorkflow",
            useDsl = false,
            triggerData = {},
          } = body;

          // Generate workflow run ID
          const workflowRunId = `wf-run-${Date.now()}-${Math.random().toString(36).substring(7)}`;
          const temporalWorkflowId = workflowId || `wf-${Date.now()}`;

          console.log("🚀 [API] Starting Vortex workflow via Temporal");
          console.log("🔍 [API] Workflow Run ID:", workflowRunId);
          console.log("🔍 [API] Workflow ID:", temporalWorkflowId);
          console.log("🔍 [API] Workflow type:", workflowType);
          console.log("🔍 [API] Use DSL:", useDsl);
          console.log("🔍 [API] Task queue: vortex");

          const client = await getTemporalClient();

          let handle;

          if (useDsl && isDslDefinition(workflowDefinition)) {
            // Use new DSL-based workflow with database tracking
            console.log("📋 [API] Executing DSL workflow");
            console.log(`📋 [API] Steps: ${workflowDefinition.steps.length}`);

            handle = await client.workflow.start("executeDslWorkflow", {
              args: [
                {
                  workflowRunId,
                  workflowId: temporalWorkflowId,
                  definition: workflowDefinition,
                  triggerData,
                },
              ],
              taskQueue: "vortex",
              workflowId: temporalWorkflowId,
            });

            console.log("✅ [API] DSL workflow started:", handle.workflowId);

            return Response.json({
              success: true,
              workflowId: handle.workflowId,
              workflowRunId,
              status: "started",
              type: "dsl",
              temporalUI: `http://localhost:8080/namespaces/default/workflows/${handle.workflowId}`,
              message: "DSL workflow started successfully",
              note: "Check Temporal UI to monitor progress. Workflow run is being tracked in database.",
            });
          } else {
            // Use legacy visual workflow format
            console.log("📋 [API] Executing legacy visual workflow");
            console.log(
              `📋 [API] Nodes: ${workflowDefinition.nodes?.length || 0}`,
            );

            handle = await client.workflow.start(workflowType, {
              args: [workflowDefinition],
              taskQueue: "vortex",
              workflowId: temporalWorkflowId,
            });

            console.log("✅ [API] Workflow started:", handle.workflowId);

            return Response.json({
              success: true,
              workflowId: handle.workflowId,
              status: "started",
              type: "legacy",
              temporalUI: `http://localhost:8080/namespaces/default/workflows/${handle.workflowId}`,
              message: "Workflow started successfully via Temporal",
              note: "Check Temporal UI to monitor progress",
            });
          }
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
              workflowDefinition:
                "WorkflowDefinition (DSL) or legacy visual format",
              workflowType:
                "string (optional, defaults to 'executeVortexWorkflow')",
              useDsl: "boolean (optional, defaults to false)",
              triggerData: "object (optional, data passed to trigger)",
            },
          },
          formats: {
            dsl: {
              version: "1.0",
              steps: "array of Step objects",
              edges: "array of EdgeDefinition objects",
              variables: "optional variable definitions",
              settings: "optional workflow settings",
            },
            legacy: {
              nodes: "array of visual nodes",
              edges: "array of visual edges",
            },
          },
          temporalUI: "http://localhost:8080",
        });
      },
    },
  },
});

/**
 * Type guard to check if definition is DSL format
 */
function isDslDefinition(def: any): def is WorkflowDefinition {
  return (
    def &&
    typeof def === "object" &&
    def.version === "1.0" &&
    Array.isArray(def.steps) &&
    Array.isArray(def.edges)
  );
}
