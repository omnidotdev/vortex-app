"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CasesEditor } from "../fields/CasesEditor";
import { ExpressionField } from "../fields/ExpressionField";

import type { NodeConfigProps } from "./types";

interface SwitchCase {
  value: string;
  label: string;
}

export const SwitchNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What value determines the branch?"
          rows={2}
        />
      </div>

      <ExpressionField
        id="switchExpression"
        label="Switch Expression"
        value={(data.expression as string) || ""}
        onChange={(val) => onChange("expression", val)}
        placeholder="$.trigger.data.type"
        rows={1}
      />

      <CasesEditor
        cases={(data.cases as SwitchCase[]) || []}
        onChange={(cases) => onChange("cases", cases)}
      />
    </>
  );
};
