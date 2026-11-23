import { Label } from "@omnidotdev/thornberry/label";
import { Textarea } from "@omnidotdev/thornberry/textarea";

import Dropdown from "@/components/ui/dropdown";
import { JsonEditor } from "@/components/ui/json-editor";

import type { NodeConfigProps } from "./types";

export const SagaNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Describe this saga transaction"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="parallel">Execution Mode</Label>
        <Dropdown
          value={data.parallel ? "parallel" : "sequential"}
          onValueChange={(val) => onChange("parallel", val === "parallel")}
          options={[
            { value: "sequential", label: "Sequential" },
            { value: "parallel", label: "Parallel" },
          ]}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="steps">Steps (JSON)</Label>
        <JsonEditor
          value={data.steps ? JSON.stringify(data.steps, null, 2) : "[]"}
          onChange={(next) => {
            try {
              const parsed = JSON.parse(next);
              onChange("steps", parsed);
            } catch {
              // Allow invalid JSON while typing
            }
          }}
          placeholder='[{"name": "step1", "execute": {"type": "action"}, "compensate": {"type": "action"}}]'
          minHeight={160}
          maxHeight={320}
        />
      </div>
    </>
  );
};
