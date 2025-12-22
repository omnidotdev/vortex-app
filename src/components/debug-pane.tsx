"use client";

import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DebugEntry {
  timestamp: string;
  type: "trigger" | "action";
  message: string;
  payload?: any;
  details?: {
    nodeType?: string;
    nodeName?: string;
    targetNodeId?: string;
    expectedOutcome?: string;
  };
}

export function DebugPane() {
  const [logs, setLogs] = useState<DebugEntry[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  const clearLogs = () => setLogs([]);

  // Function to add to global window object for debugging
  if (typeof window !== "undefined") {
    (window as any).logToDebugPane = (
      type: "trigger" | "action",
      message: string,
      payload?: any,
      details?: DebugEntry["details"],
    ) => {
      setLogs((prev) => [
        ...prev,
        {
          timestamp: new Date().toISOString(),
          type,
          message,
          payload,
          details,
        },
      ]);
    };
  }

  if (!isExpanded) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="fixed right-4 bottom-4 bg-card shadow-lg"
        onClick={() => setIsExpanded(true)}
      >
        <ChevronUp className="mr-2 h-4 w-4" />
        Show Debug Output
      </Button>
    );
  }

  return (
    <div className="h-64 border-border border-t bg-card">
      <div className="flex items-center justify-between border-border border-b bg-muted p-2">
        <h3 className="font-medium text-sm">Debug Output</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={clearLogs}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(false)}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[calc(100%-36px)]">
        <div className="space-y-2 p-2">
          {logs.map((log, index) => (
            <div key={index} className="text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-xs ${
                    log.type === "trigger"
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-green-500/10 text-green-500"
                  }`}
                >
                  {log.type}
                </span>
                <span>{log.message}</span>
              </div>
              {log.details && (
                <div className="mt-1 ml-4 text-muted-foreground text-xs">
                  {log.details.nodeType && (
                    <div>Node Type: {log.details.nodeType}</div>
                  )}
                  {log.details.nodeName && (
                    <div>Node Name: {log.details.nodeName}</div>
                  )}
                  {log.details.targetNodeId && (
                    <div>Target Node: {log.details.targetNodeId}</div>
                  )}
                  {log.details.expectedOutcome && (
                    <div>Expected Outcome: {log.details.expectedOutcome}</div>
                  )}
                </div>
              )}
              {log.payload && (
                <pre className="mt-1 overflow-x-auto rounded-md bg-muted p-2 text-xs">
                  {JSON.stringify(log.payload, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
