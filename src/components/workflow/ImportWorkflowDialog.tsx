import { Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";

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
import { Textarea } from "@/components/ui/textarea";
import dslToReactFlow, { isDslFormat } from "@/lib/workflow/dslToReactFlow";

import type { Node, Edge } from "reactflow";

type ImportWorkflowDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (nodes: Node[], edges: Edge[]) => void;
};

type ParsedPreview = {
  stepCount: number;
  stepNames: string[];
};

// Check whether a parsed object looks like ReactFlow format (nodes array)
function looksLikeReactFlowFormat(obj: Record<string, unknown>): boolean {
  return Array.isArray(obj.nodes) && !Array.isArray(obj.steps);
}

// Validate a parsed JSON object as a workflow DSL definition
function validateWorkflowDsl(
  parsed: unknown,
): { valid: true; preview: ParsedPreview } | { valid: false; error: string } {
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return { valid: false, error: "Expected a JSON object" };
  }

  const obj = parsed as Record<string, unknown>;

  // Detect ReactFlow format and provide a helpful message
  if (looksLikeReactFlowFormat(obj)) {
    return {
      valid: false,
      error:
        "This looks like ReactFlow format. Please use DSL format (with steps and edges).",
    };
  }

  if (!isDslFormat(obj)) {
    return {
      valid: false,
      error: "Missing required `steps` array",
    };
  }

  if (!Array.isArray(obj.edges)) {
    return { valid: false, error: "Missing required `edges` array" };
  }

  if (!("version" in obj) || obj.version !== "1.0") {
    return {
      valid: false,
      error: 'Missing or invalid `version` field (expected "1.0")',
    };
  }

  const steps = obj.steps as Array<Record<string, unknown>>;
  const stepNames = steps.map(
    (step) => (step.name as string) || (step.id as string) || "Unnamed",
  );

  return {
    valid: true,
    preview: { stepCount: steps.length, stepNames },
  };
}

function ImportWorkflowDialog({
  open,
  onOpenChange,
  onImport,
}: ImportWorkflowDialogProps) {
  const [jsonText, setJsonText] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [preview, setPreview] = useState<ParsedPreview | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state when dialog closes
  const handleOpenChange = useCallback(
    (details: { open: boolean }) => {
      if (!details.open) {
        setJsonText("");
        setValidationError(null);
        setPreview(null);
        setIsDragging(false);
      }
      onOpenChange(details.open);
    },
    [onOpenChange],
  );

  // Parse and validate JSON text
  const processJsonText = useCallback((text: string) => {
    setJsonText(text);
    setValidationError(null);
    setPreview(null);

    const trimmed = text.trim();
    if (!trimmed) return;

    let parsed: unknown;
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      setValidationError("Invalid JSON syntax");
      return;
    }

    const result = validateWorkflowDsl(parsed);
    if (result.valid) {
      setPreview(result.preview);
    } else {
      setValidationError(result.error);
    }
  }, []);

  // Read a file and process its contents
  const processFile = useCallback(
    (file: File) => {
      if (!file.name.endsWith(".json")) {
        setValidationError("Only .json files are supported");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === "string") {
          processJsonText(text);
        }
      };
      reader.onerror = () => {
        setValidationError("Failed to read file");
      };
      reader.readAsText(file);
    },
    [processJsonText],
  );

  // Handle file input change
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);

      // Reset input so the same file can be selected again
      e.target.value = "";
    },
    [processFile],
  );

  // Handle drag events
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  // Handle import
  const handleImport = useCallback(() => {
    const trimmed = jsonText.trim();
    if (!trimmed) return;

    let parsed: unknown;
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      setValidationError("Invalid JSON syntax");
      return;
    }

    try {
      const { nodes, edges } = dslToReactFlow(
        parsed as Parameters<typeof dslToReactFlow>[0],
      );
      onImport(nodes, edges);
      onOpenChange(false);
    } catch (err) {
      setValidationError(
        err instanceof Error ? err.message : "Failed to convert workflow",
      );
    }
  }, [jsonText, onImport, onOpenChange]);

  return (
    <DialogRoot open={open} onOpenChange={handleOpenChange}>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent
          className={`max-w-lg ${isDragging ? "ring-2 ring-primary" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <DialogHeader>
            <DialogTitle>Import Workflow</DialogTitle>
            <DialogDescription>
              Import a workflow definition from JSON
            </DialogDescription>
          </DialogHeader>
          <DialogCloseTrigger />

          <div className="space-y-4">
            {/* File upload button */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload JSON File
              </Button>
            </div>

            {/* Paste section */}
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                Or paste JSON below:
              </p>
              <Textarea
                value={jsonText}
                onChange={(e) => processJsonText(e.target.value)}
                placeholder='{"version": "1.0", "steps": [...], "edges": [...]}'
                className="min-h-[200px] font-mono text-sm"
              />
            </div>

            {/* Validation error */}
            {validationError && (
              <p className="text-destructive text-sm">{validationError}</p>
            )}

            {/* Preview */}
            {preview && (
              <div className="rounded-md border bg-muted/30 p-3">
                <p className="text-sm">
                  <span className="font-medium">
                    {preview.stepCount} step{preview.stepCount !== 1 ? "s" : ""}
                    {" found: "}
                  </span>
                  {preview.stepNames.join(", ")}
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="button" disabled={!preview} onClick={handleImport}>
              Import
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}

export default ImportWorkflowDialog;
