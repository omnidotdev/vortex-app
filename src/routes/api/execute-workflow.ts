import { createFileRoute } from "@tanstack/react-router";
import { Hatchet } from "@hatchet-dev/typescript-sdk";

import { reactFlowToDsl } from "../../lib/workflow/reactFlowToDsl";
import type { WorkflowDefinition } from "../../lib/workflow/types";

export const Route = createFileRoute("/api/execute-workflow")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const {
            workflowId,
            organizationId,
            workflowDefinition,
            triggerData = {},
          } = body;

          // Generate workflow run ID
          const workflowRunId = `wf-run-${Date.now()}-${Math.random().toString(36).substring(7)}`;
          const hatchetWorkflowId = workflowId || `wf-${Date.now()}`;

          // Convert ReactFlow format (nodes/edges) to DSL format (steps/edges)
          const dslDefinition = reactFlowToDsl(
            workflowDefinition.nodes || [],
            workflowDefinition.edges || [],
          );

          console.log("Starting Vortex workflow via Hatchet");
          console.log("Workflow Run ID:", workflowRunId);
          console.log("Workflow ID:", hatchetWorkflowId);
          console.log(
            "DSL Definition:",
            JSON.stringify(dslDefinition, null, 2),
          );

          // Initialize Hatchet client
          const hatchet = Hatchet.init();

          // Trigger the DSL workflow via event
          await hatchet.event.push("workflow:execute", {
            workflowId: hatchetWorkflowId,
            organizationId, // Include org ID for credential lookup
            triggerData,
            definition: dslDefinition,
          });

          return Response.json({
            success: true,
            workflowId: hatchetWorkflowId,
            workflowRunId,
            status: "pending",
            hatchetUI: "http://localhost:8888",
            message: "Workflow execution triggered via Hatchet",
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
          hatchetUI: "http://localhost:8888",
        });
      },
    },
  },
});
