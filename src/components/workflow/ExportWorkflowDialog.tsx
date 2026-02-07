import { Check, Copy, Download } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@/components/ui/tabs";
import dslToTypeScript from "@/lib/workflow/dslToTypeScript";
import { reactFlowToDsl } from "@/lib/workflow/reactFlowToDsl";

import type { Edge, Node } from "reactflow";

type ExportWorkflowDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nodes: Node[];
  edges: Edge[];
  workflowName: string;
};

// Derive a filename-safe slug from the workflow name
function toFilenameSlug(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "workflow"
  );
}

// Trigger a file download via a temporary anchor element
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function ExportWorkflowDialog({
  open,
  onOpenChange,
  nodes,
  edges,
  workflowName,
}: ExportWorkflowDialogProps) {
  const [activeTab, setActiveTab] = useState("json");
  const [copied, setCopied] = useState(false);

  const dsl = useMemo(() => {
    if (!open) return null;
    return reactFlowToDsl(nodes, edges);
  }, [open, nodes, edges]);

  const jsonOutput = useMemo(() => {
    if (!dsl) return "";
    return JSON.stringify(dsl, null, 2);
  }, [dsl]);

  const tsOutput = useMemo(() => {
    if (!dsl) return "";
    return dslToTypeScript(dsl, workflowName);
  }, [dsl, workflowName]);

  const currentOutput = activeTab === "json" ? jsonOutput : tsOutput;
  const filenameSlug = toFilenameSlug(workflowName);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(currentOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied or unavailable
    }
  }, [currentOutput]);

  const handleDownload = useCallback(() => {
    if (activeTab === "json") {
      downloadFile(jsonOutput, `${filenameSlug}.json`, "application/json");
    } else {
      downloadFile(tsOutput, `${filenameSlug}.ts`, "text/typescript");
    }
  }, [activeTab, jsonOutput, tsOutput, filenameSlug]);

  // Reset copied state when switching tabs
  const handleTabChange = useCallback((details: { value: string | null }) => {
    if (details.value) {
      setActiveTab(details.value);
      setCopied(false);
    }
  }, []);

  return (
    <DialogRoot open={open} onOpenChange={(e) => onOpenChange(e.open)}>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Export Workflow</DialogTitle>
            <DialogDescription>
              Export your workflow definition
            </DialogDescription>
          </DialogHeader>

          <TabsRoot value={activeTab} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="json">JSON</TabsTrigger>
              <TabsTrigger value="typescript">TypeScript</TabsTrigger>
            </TabsList>

            <TabsContent value="json">
              <pre className="max-h-[400px] overflow-y-auto rounded-md border bg-muted p-4 font-mono text-sm">
                {jsonOutput}
              </pre>
            </TabsContent>

            <TabsContent value="typescript">
              <pre className="max-h-[400px] overflow-y-auto rounded-md border bg-muted p-4 font-mono text-sm">
                {tsOutput}
              </pre>
            </TabsContent>
          </TabsRoot>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>

            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>

            <DialogCloseTrigger asChild>
              <Button variant="ghost" size="sm">
                Close
              </Button>
            </DialogCloseTrigger>
          </DialogFooter>

          <DialogCloseTrigger />
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}

export default ExportWorkflowDialog;
