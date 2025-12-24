"use client";

import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface JsonFieldProps {
  id?: string;
  label: string;
  value: Record<string, unknown> | unknown[];
  onChange: (value: Record<string, unknown> | unknown[]) => void;
  placeholder?: string;
  rows?: number;
}

export const JsonField = ({
  id,
  label,
  value,
  onChange,
  placeholder = '{"key": "value"}',
  rows = 4,
}: JsonFieldProps) => {
  const [error, setError] = useState<string | null>(null);
  const [rawValue, setRawValue] = useState(() =>
    JSON.stringify(value || {}, null, 2),
  );

  const handleChange = (text: string) => {
    setRawValue(text);
    try {
      const parsed = JSON.parse(text);
      onChange(parsed);
      setError(null);
    } catch {
      setError("Invalid JSON");
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
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
