"use client";

import { useEffect, useRef, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

interface UseAutoSaveOptions {
  data: Record<string, unknown>;
  nodeId: string;
  onSave: (nodeId: string, data: Record<string, unknown>) => void;
  debounceMs?: number;
  enabled?: boolean;
}

interface UseAutoSaveReturn {
  status: SaveStatus;
  lastSaved: Date | null;
}

export const useAutoSave = ({
  data,
  nodeId,
  onSave,
  debounceMs = 500,
  enabled = true,
}: UseAutoSaveOptions): UseAutoSaveReturn => {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const isFirstRender = useRef(true);
  const previousNodeId = useRef(nodeId);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce the data
  const [debouncedData] = useDebounceValue(data, debounceMs);

  useEffect(() => {
    // Skip if disabled
    if (!enabled) return;

    // Skip first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Reset on node change
    if (previousNodeId.current !== nodeId) {
      previousNodeId.current = nodeId;
      isFirstRender.current = true;
      setStatus("idle");
      return;
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Trigger save
    setStatus("saving");

    try {
      onSave(nodeId, debouncedData);
      setStatus("saved");
      setLastSaved(new Date());

      // Reset to idle after 2 seconds
      timeoutRef.current = setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [debouncedData, nodeId, onSave, enabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { status, lastSaved };
};
