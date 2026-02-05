/**
 * Hook for subscribing to real-time workflow run updates via SSE.
 */

import { useCallback, useEffect, useRef, useState } from "react";

type WorkflowStepLog = {
  rowId: string;
  stepId: string;
  stepName: string;
  stepType: string;
  status: "pending" | "running" | "completed" | "failed" | "skipped";
  input: unknown;
  output: unknown;
  error: string | null;
  startedAt: string | null;
  completedAt: string | null;
};

export type WorkflowRunStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "cancelled";

export type WorkflowRun = {
  rowId: string;
  status: WorkflowRunStatus;
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

type StreamState = {
  run: WorkflowRun | null;
  isConnected: boolean;
  error: string | null;
};

type UseWorkflowRunStreamOptions = {
  /** Access token for authentication */
  accessToken?: string | null;
  /** Whether to auto-connect when runId is provided */
  autoConnect?: boolean;
};

/**
 * Subscribe to real-time workflow run updates.
 * @param runId - The workflow run ID to stream, or null to disconnect
 * @param options - Configuration options
 */
export function useWorkflowRunStream(
  runId: string | null,
  options: UseWorkflowRunStreamOptions = {},
) {
  const { accessToken, autoConnect = true } = options;

  const [state, setState] = useState<StreamState>({
    run: null,
    isConnected: false,
    error: null,
  });

  const eventSourceRef = useRef<EventSource | null>(null);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setState((prev) => ({ ...prev, isConnected: false }));
  }, []);

  const connect = useCallback(
    (id: string) => {
      // Close existing connection
      disconnect();

      // Build URL with auth token if provided
      let url = `/api/runs/${id}/stream`;
      if (accessToken) {
        url += `?token=${encodeURIComponent(accessToken)}`;
      }

      const eventSource = new EventSource(url);
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        setState((prev) => ({ ...prev, isConnected: true, error: null }));
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          // Check for error response
          if (data.error) {
            setState((prev) => ({
              ...prev,
              error: data.error,
              isConnected: false,
            }));
            eventSource.close();
            return;
          }

          // Check for timeout
          if (data.timeout) {
            setState((prev) => ({
              ...prev,
              error: "Stream timeout",
              isConnected: false,
            }));
            eventSource.close();
            return;
          }

          // Update run state
          setState((prev) => ({
            ...prev,
            run: data as WorkflowRun,
            error: null,
          }));

          // Auto-close on terminal status
          const status = data.status as WorkflowRunStatus;
          if (["completed", "failed", "cancelled"].includes(status)) {
            eventSource.close();
            setState((prev) => ({ ...prev, isConnected: false }));
          }
        } catch (err) {
          console.error("Failed to parse SSE message:", err);
        }
      };

      eventSource.onerror = () => {
        setState((prev) => ({
          ...prev,
          error: "Connection lost",
          isConnected: false,
        }));
        eventSource.close();
        eventSourceRef.current = null;
      };
    },
    [accessToken, disconnect],
  );

  // Auto-connect when runId changes
  useEffect(() => {
    if (runId && autoConnect) {
      connect(runId);
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [runId, autoConnect, connect, disconnect]);

  return {
    /** Current workflow run state */
    run: state.run,
    /** Step logs from the current run */
    steps: state.run?.workflowStepLogs.nodes ?? [],
    /** Whether the SSE connection is active */
    isConnected: state.isConnected,
    /** Whether the run is in a terminal state */
    isComplete: state.run
      ? ["completed", "failed", "cancelled"].includes(state.run.status)
      : false,
    /** Error message if connection failed */
    error: state.error,
    /** Manually connect to a run */
    connect,
    /** Disconnect from the stream */
    disconnect,
  };
}
