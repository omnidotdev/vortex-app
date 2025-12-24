"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ExpressionField } from "../fields/ExpressionField";

import type { NodeConfigProps } from "./types";

export const ConditionNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What condition does this check?"
          rows={2}
        />
      </div>

      <ExpressionField
        id="expression"
        label="Condition Expression"
        value={(data.expression as string) || ""}
        onChange={(val) => onChange("expression", val)}
        placeholder="$.trigger.data.value > 100"
        hint="Use JSONPath expressions. Returns true/false."
      />
    </>
  );
};
