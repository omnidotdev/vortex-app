/**
 * SSE endpoint for streaming workflow run updates.
 * Provides real-time updates for workflow execution status and step logs.
 */

import { createFileRoute } from "@tanstack/react-router";
import { GraphQLClient, gql } from "graphql-request";

import { getAuth } from "@/lib/auth/getAuth";
import { API_INTERNAL_GRAPHQL_URL } from "@/lib/config/env.config";

const POLL_INTERVAL_MS = 500;
const MAX_DURATION_MS = 5 * 60 * 1000; // 5 minutes max

const GET_WORKFLOW_RUN_QUERY = gql`
  query GetWorkflowRunStream($runId: UUID!) {
    workflowRun(rowId: $runId) {
      rowId
      status
      error
      input
      output
      startedAt
      completedAt
      createdAt
      workflowStepLogs(orderBy: STARTED_AT_ASC) {
        nodes {
          rowId
          stepId
          stepName
          stepType
          status
          input
          output
          error
          startedAt
          completedAt
        }
      }
    }
  }
`;

type WorkflowStepLog = {
  rowId: string;
  stepId: string;
  stepName: string;
  stepType: string;
  status: string;
  input: unknown;
  output: unknown;
  error: string | null;
  startedAt: string | null;
  completedAt: string | null;
};

type WorkflowRun = {
  rowId: string;
  status: string;
  error: string | null;
  input: unknown;
  output: unknown;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string | null;
  workflowStepLogs: {
    nodes: WorkflowStepLog[];
  };
};

type QueryResult = {
  workflowRun: WorkflowRun | null;
};

async function fetchWorkflowRun(
  client: GraphQLClient,
  runId: string,
): Promise<WorkflowRun | null> {
  try {
    const data = await client.request<QueryResult>(GET_WORKFLOW_RUN_QUERY, {
      runId,
    });
    return data.workflowRun;
  } catch (error) {
    console.error("Failed to fetch workflow run:", error);
    return null;
  }
}

function isTerminalStatus(status: string): boolean {
  return ["completed", "failed", "cancelled"].includes(status);
}

export const Route = createFileRoute("/api/runs/$runId/stream")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const auth = await getAuth(request);
        if (!auth) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        const { runId } = params;

        // Get auth token from request headers
        const authHeader = request.headers.get("Authorization");
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (authHeader) {
          headers.Authorization = authHeader;
        }

        const client = new GraphQLClient(API_INTERNAL_GRAPHQL_URL!, {
          headers,
        });

        // Create SSE stream
        const stream = new ReadableStream({
          async start(controller) {
            const encoder = new TextEncoder();
            const startTime = Date.now();

            const sendEvent = (data: unknown) => {
              const message = `data: ${JSON.stringify(data)}\n\n`;
              controller.enqueue(encoder.encode(message));
            };

            const sendError = (error: string) => {
              sendEvent({ error });
              controller.close();
            };

            // Initial fetch
            const initialRun = await fetchWorkflowRun(client, runId);
            if (!initialRun) {
              sendError("Workflow run not found");
              return;
            }

            sendEvent(initialRun);

            // If already terminal, close immediately
            if (isTerminalStatus(initialRun.status)) {
              controller.close();
              return;
            }

            // Poll for updates
            const poll = async () => {
              // Check timeout
              if (Date.now() - startTime > MAX_DURATION_MS) {
                sendEvent({ timeout: true });
                controller.close();
                return;
              }

              const run = await fetchWorkflowRun(client, runId);
              if (!run) {
                sendError("Workflow run not found");
                return;
              }

              sendEvent(run);

              if (isTerminalStatus(run.status)) {
                controller.close();
                return;
              }

              // Schedule next poll
              setTimeout(poll, POLL_INTERVAL_MS);
            };

            // Start polling after initial delay
            setTimeout(poll, POLL_INTERVAL_MS);
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        });
      },
    },
  },
});
