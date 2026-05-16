/**
 * Hook for subscribing to real-time workflow run updates via SSE.
 *
 * Uses `fetch` with a `ReadableStream` reader instead of native `EventSource`
 * so that the `Authorization` header can be included for API key auth.
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

type WorkflowRunStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "cancelled";

type WorkflowRun = {
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

/** A single parsed SSE event from the stream */
export type RunStreamEvent = {
  type?: string;
  data?: unknown;
  status?: string;
  done?: boolean;
  timeout?: boolean;
  error?: string;
};

type StreamState = {
  run: WorkflowRun | null;
  events: RunStreamEvent[];
  isConnected: boolean;
  error: string | null;
};

type UseWorkflowRunStreamOptions = {
  /** API key for `Authorization: Bearer` header */
  apiKey?: string | null;
  /** Whether to auto-connect when runId is provided */
  autoConnect?: boolean;
};

/**
 * Parse SSE chunks from a ReadableStream.
 *
 * Accumulates partial chunks and emits complete `data: ...\n\n` lines.
 */
function parseSseChunk(
  chunk: string,
  buffer: string,
): { buffer: string; messages: string[] } {
  const combined = buffer + chunk;
  const messages: string[] = [];
  // SSE messages are separated by double newlines
  const parts = combined.split("\n\n");
  // Last element may be incomplete; keep it in the buffer
  const newBuffer = parts.pop() ?? "";

  for (const part of parts) {
    for (const line of part.split("\n")) {
      if (line.startsWith("data: ")) {
        messages.push(line.slice(6));
      }
    }
  }

  return { buffer: newBuffer, messages };
}

/**
 * Subscribe to real-time workflow run events.
 * @param runId - The workflow run ID to stream, or null to disconnect
 * @param options - Configuration options
 */
export function useWorkflowRunStream(
  runId: string | null,
  options: UseWorkflowRunStreamOptions = {},
) {
  const { apiKey, autoConnect = true } = options;

  const [state, setState] = useState<StreamState>({
    run: null,
    events: [],
    isConnected: false,
    error: null,
  });

  // Abort controller ref for cancelling in-flight fetch
  const abortRef = useRef<AbortController | null>(null);

  const disconnect = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setState((prev) => ({ ...prev, isConnected: false }));
  }, []);

  const connect = useCallback(
    async (id: string) => {
      // Cancel any existing connection
      disconnect();

      const controller = new AbortController();
      abortRef.current = controller;

      setState((prev) => ({
        ...prev,
        isConnected: true,
        error: null,
        events: [],
      }));

      try {
        const headers: Record<string, string> = {};
        if (apiKey) {
          headers.Authorization = `Bearer ${apiKey}`;
        }

        const response = await fetch(`/api/v1/runs/${id}/stream`, {
          headers,
          signal: controller.signal,
        });

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          const message =
            (body as { error?: string }).error ||
            `Stream request failed: ${response.status}`;
          setState((prev) => ({
            ...prev,
            error: message,
            isConnected: false,
          }));
          return;
        }

        if (!response.body) {
          setState((prev) => ({
            ...prev,
            error: "No response body",
            isConnected: false,
          }));
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let sseBuffer = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            setState((prev) => ({ ...prev, isConnected: false }));
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          const { buffer, messages } = parseSseChunk(chunk, sseBuffer);
          sseBuffer = buffer;

          for (const message of messages) {
            try {
              const parsed = JSON.parse(message) as RunStreamEvent;

              // Append to event log
              setState((prev) => ({
                ...prev,
                events: [...prev.events, parsed],
              }));

              // Handle error events
              if (parsed.error) {
                setState((prev) => ({
                  ...prev,
                  error: parsed.error ?? null,
                  isConnected: false,
                }));
                reader.cancel();
                return;
              }

              // Handle timeout
              if (parsed.timeout) {
                setState((prev) => ({
                  ...prev,
                  error: "Stream timeout",
                  isConnected: false,
                }));
                reader.cancel();
                return;
              }

              // Close on terminal done signal
              if (parsed.done) {
                setState((prev) => ({ ...prev, isConnected: false }));
                reader.cancel();
                return;
              }
            } catch {
              // Ignore unparseable messages
            }
          }
        }
      } catch (err) {
        if ((err as { name?: string }).name === "AbortError") {
          // Normal disconnection, no error to surface
          return;
        }

        setState((prev) => ({
          ...prev,
          error: err instanceof Error ? err.message : "Connection lost",
          isConnected: false,
        }));
      }
    },
    [apiKey, disconnect],
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
    /** Current workflow run state (populated if the stream emits full run objects) */
    run: state.run,
    /** All SSE events received from the stream */
    events: state.events,
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
