import { Braces, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import type { Node } from "reactflow";

interface VariablePickerProps {
  /** All nodes in the workflow */
  nodes: Node[];
  /** The current node (to exclude from suggestions) */
  currentNodeId: string;
  /** Called when a variable is selected */
  onSelect: (variable: string, displayName: string) => void;
  /** Optional className for the trigger button */
  className?: string;
}

interface StepOutput {
  key: string;
  label: string;
  description?: string;
}

// Define expected outputs for different node/integration types
const OUTPUT_SCHEMAS: Record<string, StepOutput[]> = {
  // AI integrations
  openai: [
    { key: "output", label: "Response", description: "The AI's response text" },
  ],
  anthropic: [
    { key: "output", label: "Response", description: "The AI's response text" },
  ],

  // Communication
  slack: [
    {
      key: "output.ts",
      label: "Message ID",
      description: "Sent message timestamp",
    },
    { key: "output.channel", label: "Channel", description: "Channel ID" },
  ],
  discord: [
    { key: "output.id", label: "Message ID", description: "Sent message ID" },
  ],
  twilio: [
    {
      key: "output.sid",
      label: "Message SID",
      description: "Twilio message ID",
    },
    { key: "output.status", label: "Status", description: "Message status" },
  ],

  // HTTP
  "builtin:http": [
    {
      key: "output.body",
      label: "Response Body",
      description: "HTTP response body",
    },
    {
      key: "output.status",
      label: "Status Code",
      description: "HTTP status code",
    },
    {
      key: "output.headers",
      label: "Headers",
      description: "Response headers",
    },
  ],

  // Default for unknown types
  default: [{ key: "output", label: "Output", description: "Step output" }],
};

// Get a friendly name for a node
function getNodeDisplayName(node: Node): string {
  const label = node.data?.label as string;
  if (label) return label;

  const integrationId = node.data?.integrationDefinitionId as string;
  if (integrationId) {
    return integrationId.charAt(0).toUpperCase() + integrationId.slice(1);
  }

  return node.type || "Step";
}

// Get the icon/color for a node type
function getNodeTypeInfo(node: Node): { color: string; icon: string } {
  const integrationId = node.data?.integrationDefinitionId as string;
  const pluginId = node.data?.pluginId as string;

  if (integrationId === "openai" || integrationId === "anthropic") {
    return { color: "bg-purple-500", icon: "AI" };
  }
  if (integrationId === "slack" || integrationId === "discord") {
    return { color: "bg-blue-500", icon: "MSG" };
  }
  if (pluginId === "builtin:http") {
    return { color: "bg-green-500", icon: "HTTP" };
  }
  if (node.type === "triggerNode") {
    return { color: "bg-amber-500", icon: "TRG" };
  }

  return { color: "bg-gray-500", icon: "STEP" };
}

// Get outputs for a node
function getNodeOutputs(node: Node): StepOutput[] {
  const integrationId = node.data?.integrationDefinitionId as string;
  const pluginId = node.data?.pluginId as string;

  if (integrationId && OUTPUT_SCHEMAS[integrationId]) {
    return OUTPUT_SCHEMAS[integrationId];
  }
  if (pluginId && OUTPUT_SCHEMAS[pluginId]) {
    return OUTPUT_SCHEMAS[pluginId];
  }

  return OUTPUT_SCHEMAS.default;
}

// Generate a readable step identifier from node
function getStepIdentifier(node: Node, index: number): string {
  // Use a slugified version of the label if available, otherwise use step number
  const label = node.data?.label as string;
  if (label) {
    // Create a slug: lowercase, replace spaces with underscores, remove special chars
    const slug = label
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "_")
      .substring(0, 20);
    return slug || `step_${index + 1}`;
  }

  const integrationId = node.data?.integrationDefinitionId as string;
  if (integrationId) {
    return integrationId.toLowerCase();
  }

  return `step_${index + 1}`;
}

export function VariablePicker({
  nodes,
  currentNodeId,
  onSelect,
  className,
}: VariablePickerProps) {
  const [open, setOpen] = useState(false);
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  // Get all action nodes that can provide output data
  // We show all other nodes - the executor handles execution order at runtime
  const availableNodes = useMemo(() => {
    // Get all action nodes (excluding triggers and current node)
    const actionNodes = nodes.filter(
      (n) =>
        n.id !== currentNodeId &&
        n.type !== "triggerNode" &&
        (n.data?.integrationDefinitionId || n.data?.pluginId),
    );

    // Assign step numbers for display
    return actionNodes.map((node, index) => ({
      node,
      stepNumber: index + 1,
    }));
  }, [nodes, currentNodeId]);

  const handleSelectOutput = (
    node: Node,
    stepNumber: number,
    output: StepOutput,
  ) => {
    // Use step name for clean, readable references
    // The step name is a unique identifier stored in node.data.stepName
    // Use single quotes since this will be inside JSON strings (which use double quotes)
    const stepName = (node.data?.stepName as string) || node.id;
    const variable = `{{steps['${stepName}'].${output.key}}}`;
    const displayName = `${stepName} → ${output.label}`;
    onSelect(variable, displayName);
    setOpen(false);
  };

  if (availableNodes.length === 0) {
    return null; // Don't show picker if no steps to reference
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn("h-8 px-2 text-muted-foreground", className)}
          title="Insert data from previous step"
        >
          <Braces className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-0">
        <div className="border-b px-3 py-2">
          <p className="font-medium text-sm">Insert from previous step</p>
          <p className="text-muted-foreground text-xs">
            Click a step to see available data
          </p>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {availableNodes.map(({ node, stepNumber }) => {
            const displayName = getNodeDisplayName(node);
            const typeInfo = getNodeTypeInfo(node);
            const outputs = getNodeOutputs(node);
            const isExpanded = expandedNode === node.id;

            return (
              <div key={node.id} className="border-b last:border-b-0">
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-accent"
                  onClick={() => setExpandedNode(isExpanded ? null : node.id)}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded font-bold text-[10px] text-white",
                      typeInfo.color,
                    )}
                  >
                    {stepNumber}
                  </span>
                  <span className="flex-1 truncate text-sm">{displayName}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
                      isExpanded && "rotate-90",
                    )}
                  />
                </button>

                {isExpanded && (
                  <div className="bg-muted/50 pb-1">
                    {outputs.map((output) => (
                      <button
                        key={output.key}
                        type="button"
                        className="flex w-full items-center gap-2 px-3 py-1.5 pl-11 text-left hover:bg-accent"
                        onClick={() =>
                          handleSelectOutput(node, stepNumber, output)
                        }
                      >
                        <div className="flex-1">
                          <p className="text-sm">{output.label}</p>
                          {output.description && (
                            <p className="text-muted-foreground text-xs">
                              {output.description}
                            </p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
