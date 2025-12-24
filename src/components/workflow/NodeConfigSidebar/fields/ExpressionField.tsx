"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ExpressionFieldProps {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  rows?: number;
}

export const ExpressionField = ({
  id,
  label,
  value,
  onChange,
  placeholder = "$.trigger.data.value",
  hint,
  rows = 2,
}: ExpressionFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="font-mono text-sm"
      />
      {hint && <p className="text-muted-foreground text-xs">{hint}</p>}
    </div>
  );
};
