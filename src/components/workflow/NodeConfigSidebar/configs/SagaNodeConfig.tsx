import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
        <Select
          value={data.parallel ? "parallel" : "sequential"}
          onValueChange={(val) => onChange("parallel", val === "parallel")}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sequential">Sequential</SelectItem>
            <SelectItem value="parallel">Parallel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="steps">Steps (JSON)</Label>
        <Textarea
          id="steps"
          value={data.steps ? JSON.stringify(data.steps, null, 2) : "[]"}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              onChange("steps", parsed);
            } catch {
              // Allow invalid JSON while typing
            }
          }}
          placeholder='[{"name": "step1", "execute": {"type": "action"}, "compensate": {"type": "action"}}]'
          rows={8}
          className="font-mono text-xs"
        />
      </div>
    </>
  );
};
