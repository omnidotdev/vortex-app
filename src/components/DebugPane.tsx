import { Bug, ChevronDown, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SheetBackdrop,
  SheetCloseTrigger,
  SheetContent,
  SheetPositioner,
  SheetRoot,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

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

function DebugPane() {
  const [logs, setLogs] = useState<DebugEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const clearLogs = () => setLogs([]);

  // Expose debug logger on window for external callers
  useEffect(() => {
    (window as any).logToDebugPane = (
      type: "trigger" | "action",
      message: string,
      payload?: any,
      details?: DebugEntry["details"],
    ) => {
      setLogs((prev) => [
        {
          timestamp: new Date().toISOString(),
          type,
          message,
          payload,
          details,
        },
        ...prev,
      ]);
    };

    return () => {
      delete (window as any).logToDebugPane;
    };
  }, []);

  return (
    <SheetRoot open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      {/* Trigger button */}
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "gap-2 shadow-lg transition-all hover:shadow-glow",
            logs.length > 0 && "border-primary/50",
          )}
        >
          <Bug className="h-4 w-4" />
          <span className="hidden sm:inline">Debug</span>
          {logs.length > 0 && (
            <Badge
              variant="secondary"
              className="ml-1 h-5 min-w-5 justify-center px-1.5 text-xs"
            >
              {logs.length > 99 ? "99+" : logs.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetBackdrop className="bg-background/60" />
      <SheetPositioner side="bottom">
        <SheetContent
          side="bottom"
          className="flex h-[50vh] max-h-[400px] w-full flex-col gap-0 p-0"
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b bg-muted/50 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Bug className="h-4 w-4 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-base">Debug Console</SheetTitle>
                <p className="text-muted-foreground text-xs">
                  {logs.length} {logs.length === 1 ? "entry" : "entries"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearLogs}
                disabled={logs.length === 0}
                className="h-8 w-8 p-0"
                title="Clear logs"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <SheetCloseTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  title="Close panel"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </SheetCloseTrigger>
            </div>
          </div>

          {/* Log entries */}
          <ScrollArea className="flex-1">
            {logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Bug className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">No debug logs yet</p>
                  <p className="mt-1 text-muted-foreground text-xs">
                    Workflow events will appear here
                  </p>
                </div>
              </div>
            ) : (
              <div className="divide-y">
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 transition-colors hover:bg-muted/30"
                  >
                    <div className="flex items-start gap-3">
                      {/* Type indicator */}
                      <div
                        className={cn(
                          "mt-0.5 h-2 w-2 shrink-0 rounded-full",
                          log.type === "trigger"
                            ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                            : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
                        )}
                      />

                      <div className="min-w-0 flex-1">
                        {/* Header row */}
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className={cn(
                              "font-medium text-xs capitalize",
                              log.type === "trigger"
                                ? "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                            )}
                          >
                            {log.type}
                          </Badge>
                          <span className="truncate font-medium text-sm">
                            {log.message}
                          </span>
                        </div>

                        {/* Timestamp */}
                        <p className="mt-1 text-muted-foreground text-xs">
                          {new Date(log.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            fractionalSecondDigits: 3,
                          })}
                        </p>

                        {/* Details */}
                        {log.details && (
                          <div className="mt-2 space-y-1 text-xs">
                            {log.details.nodeType && (
                              <div className="flex gap-2">
                                <span className="text-muted-foreground">
                                  Type:
                                </span>
                                <span className="font-mono">
                                  {log.details.nodeType}
                                </span>
                              </div>
                            )}
                            {log.details.nodeName && (
                              <div className="flex gap-2">
                                <span className="text-muted-foreground">
                                  Name:
                                </span>
                                <span className="font-mono">
                                  {log.details.nodeName}
                                </span>
                              </div>
                            )}
                            {log.details.targetNodeId && (
                              <div className="flex gap-2">
                                <span className="text-muted-foreground">
                                  Target:
                                </span>
                                <span className="font-mono">
                                  {log.details.targetNodeId}
                                </span>
                              </div>
                            )}
                            {log.details.expectedOutcome && (
                              <div className="flex gap-2">
                                <span className="text-muted-foreground">
                                  Outcome:
                                </span>
                                <span className="font-mono">
                                  {log.details.expectedOutcome}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Payload */}
                        {log.payload && (
                          <pre className="mt-2 max-h-40 overflow-auto rounded-md border bg-muted/50 p-2 font-mono text-xs">
                            {JSON.stringify(log.payload, null, 2)}
                          </pre>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </SheetPositioner>
    </SheetRoot>
  );
}

export default DebugPane;
