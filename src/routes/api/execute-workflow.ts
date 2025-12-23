import { createFileRoute } from "@tanstack/react-router";

import type { WorkflowDefinition } from "../../lib/workflow/types";

export const Route = createFileRoute("/api/execute-workflow")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { workflowId, workflowDefinition, triggerData = {} } = body;

          // Generate workflow run ID
          const workflowRunId = `wf-run-${Date.now()}-${Math.random().toString(36).substring(7)}`;
          const hatchetWorkflowId = workflowId || `wf-${Date.now()}`;

          console.log("Starting Vortex workflow via Hatchet");
          console.log("Workflow Run ID:", workflowRunId);
          console.log("Workflow ID:", hatchetWorkflowId);

          // TODO: Integrate with Hatchet client once vortex-worker is connected
          // For now, return a placeholder response
          // const hatchet = Hatchet.init();
          // const run = await hatchet.workflow.run("dsl-workflow", {
          //   workflowId: hatchetWorkflowId,
          //   triggerData,
          //   definition: workflowDefinition,
          // });

          return Response.json({
            success: true,
            workflowId: hatchetWorkflowId,
            workflowRunId,
            status: "pending",
            hatchetUI: "http://localhost:8080",
            message:
              "Workflow execution API ready. Connect Hatchet client to enable execution.",
            note: "Check Hatchet dashboard at http://localhost:8080 to monitor workflows",
          });
        } catch (error) {
          console.error("Workflow execution failed:", error);

          return Response.json(
            {
              success: false,
              error: error instanceof Error ? error.message : "Unknown error",
              troubleshooting: {
                checkWorker:
                  "Make sure vortex-worker is running (check Tilt dashboard)",
                checkHatchet:
                  "Make sure Hatchet is running: docker compose up -d",
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
              workflowDefinition: "WorkflowDefinition (DSL format)",
              triggerData: "object (optional, data passed to trigger)",
            },
          },
          format: {
            version: "1.0",
            steps: "array of Step objects",
            edges: "array of EdgeDefinition objects",
            variables: "optional variable definitions",
            settings: "optional workflow settings",
          },
          hatchetUI: "http://localhost:8080",
        });
      },
    },
  },
});
