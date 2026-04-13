import { useRef, useState } from "react";

import { JsonEditor } from "@/components/ui/json-editor";
import { Label } from "@/components/ui/label";
import { VariablePicker } from "@/components/workflow/VariablePicker";

import type { Node } from "reactflow";

interface JsonFieldProps {
  id?: string;
  label: string;
  value: Record<string, unknown> | unknown[];
  onChange: (value: Record<string, unknown> | unknown[]) => void;
  placeholder?: string;
  rows?: number;
  /** If provided, shows a variable picker */
  nodeId?: string;
  /** All nodes in the workflow for variable picker */
  allNodes?: Node[];
  /** Minimum height in pixels */
  minHeight?: number;
  /** Maximum height in pixels */
  maxHeight?: number;
}

export const JsonField = ({
  id,
  label,
  value,
  onChange,
  placeholder = '{"key": "value"}',
  rows = 4,
  nodeId,
  allNodes,
  minHeight,
  maxHeight,
}: JsonFieldProps) => {
  const [rawValue, setRawValue] = useState(() =>
    JSON.stringify(value || {}, null, 2),
  );
  const editorRef = useRef<{ insertText: (text: string) => void } | null>(null);

  const handleChange = (text: string) => {
    setRawValue(text);

    // Check if text contains template variables - store as-is for runtime resolution
    const hasTemplates = text.includes("{{") && text.includes("}}");

    try {
      const parsed = JSON.parse(text);
      onChange(parsed);
    } catch {
      // If it has templates, store the raw string for runtime parsing
      // The workflow engine will handle template substitution first
      if (hasTemplates) {
        // Store as a special marker that the engine can detect
        onChange({ __raw: text } as Record<string, unknown>);
      }
      // Otherwise just don't update - let the user fix the JSON
    }
  };

  const handleInsertVariable = (variable: string) => {
    // Insert at cursor position (or append)
    const newValue = rawValue + variable;
    handleChange(newValue);
  };

  const showVariablePicker = nodeId && allNodes && allNodes.length > 0;

  // Calculate height from rows if not specified
  const calculatedMinHeight = minHeight ?? Math.max(80, rows * 24);
  const calculatedMaxHeight = maxHeight ?? Math.max(200, rows * 40);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {showVariablePicker && (
          <VariablePicker
            nodes={allNodes}
            currentNodeId={nodeId}
            onSelect={(variable) => handleInsertVariable(variable)}
          />
        )}
      </div>
      <JsonEditor
        value={rawValue}
        onChange={handleChange}
        placeholder={placeholder}
        minHeight={calculatedMinHeight}
        maxHeight={calculatedMaxHeight}
      />
    </div>
  );
};
