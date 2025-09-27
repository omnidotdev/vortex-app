"use client";

import { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronUp, ChevronDown } from 'lucide-react';

interface DebugEntry {
  timestamp: string;
  type: 'trigger' | 'action';
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
  if (typeof window !== 'undefined') {
    (window as any).logToDebugPane = (
      type: 'trigger' | 'action',
      message: string,
      payload?: any,
      details?: DebugEntry['details']
    ) => {
      setLogs(prev => [...prev, {
        timestamp: new Date().toISOString(),
        type,
        message,
        payload,
        details
      }]);
    };
  }

  if (!isExpanded) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="fixed bottom-4 right-4 bg-card shadow-lg"
        onClick={() => setIsExpanded(true)}
      >
        <ChevronUp className="h-4 w-4 mr-2" />
        Show Debug Output
      </Button>
    );
  }

  return (
    <div className="h-64 bg-card border-t border-border">
      <div className="flex items-center justify-between p-2 border-b border-border bg-muted">
        <h3 className="text-sm font-medium">Debug Output</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={clearLogs}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[calc(100%-36px)]">
        <div className="p-2 space-y-2">
          {logs.map((log, index) => (
            <div key={index} className="text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString()}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                  log.type === 'trigger' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'
                }`}>
                  {log.type}
                </span>
                <span>{log.message}</span>
              </div>
              {log.details && (
                <div className="ml-4 mt-1 text-xs text-muted-foreground">
                  {log.details.nodeType && <div>Node Type: {log.details.nodeType}</div>}
                  {log.details.nodeName && <div>Node Name: {log.details.nodeName}</div>}
                  {log.details.targetNodeId && <div>Target Node: {log.details.targetNodeId}</div>}
                  {log.details.expectedOutcome && <div>Expected Outcome: {log.details.expectedOutcome}</div>}
                </div>
              )}
              {log.payload && (
                <pre className="mt-1 p-2 bg-muted rounded-md overflow-x-auto text-xs">
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