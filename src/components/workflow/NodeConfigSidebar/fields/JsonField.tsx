import { useRef, useState } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
}: JsonFieldProps) => {
  const [error, setError] = useState<string | null>(null);
  const [rawValue, setRawValue] = useState(() =>
    JSON.stringify(value || {}, null, 2),
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (text: string) => {
    setRawValue(text);

    // Check if text contains template variables
    const hasTemplates = text.includes("{{") && text.includes("}}");

    try {
      const parsed = JSON.parse(text);
      onChange(parsed);
      setError(null);
    } catch {
      // If it has templates and fails to parse, give a helpful hint
      if (hasTemplates) {
        // Check if it looks like a bare template (not wrapped in JSON)
        const trimmed = text.trim();
        if (trimmed.startsWith("{{") && trimmed.endsWith("}}")) {
          setError('Wrap in JSON, e.g.: {"content": "' + trimmed + '"}');
        } else {
          setError(
            "Invalid JSON - ensure template variables are inside quoted strings",
          );
        }
      } else {
        setError("Invalid JSON");
      }
    }
  };

  const handleInsertVariable = (variable: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue =
        rawValue.substring(0, start) + variable + rawValue.substring(end);
      handleChange(newValue);

      setTimeout(() => {
        textarea.focus();
        const newCursorPos = start + variable.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    } else {
      handleChange(rawValue + variable);
    }
  };

  const showVariablePicker = nodeId && allNodes && allNodes.length > 0;

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
      <Textarea
        ref={textareaRef}
        id={id}
        value={rawValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`font-mono text-sm ${error ? "border-destructive" : ""}`}
      />
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
};
