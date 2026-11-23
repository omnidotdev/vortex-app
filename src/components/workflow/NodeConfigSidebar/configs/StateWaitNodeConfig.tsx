import { Input } from "@omnidotdev/thornberry/input";
import { Label } from "@omnidotdev/thornberry/label";
import { Textarea } from "@omnidotdev/thornberry/textarea";

import Dropdown from "@/components/ui/dropdown";

import type { NodeConfigProps } from "./types";

export const StateWaitNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  const condition = (data.condition as string) || "exists";

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Describe this state wait condition"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="key">Key</Label>
        <Input
          id="key"
          value={(data.key as string) || ""}
          onChange={(e) => onChange("key", e.target.value)}
          placeholder="e.g. order.status"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="condition">Condition</Label>
        <Dropdown
          value={condition}
          onValueChange={(val) => onChange("condition", val)}
          options={[
            { value: "exists", label: "Exists" },
            { value: "equals", label: "Equals" },
            { value: "changed", label: "Changed" },
          ]}
        />
      </div>

      {condition === "equals" && (
        <div className="space-y-2">
          <Label htmlFor="expectedValue">Expected Value</Label>
          <Input
            id="expectedValue"
            value={(data.expectedValue as string) || ""}
            onChange={(e) => onChange("expectedValue", e.target.value)}
            placeholder="Value to match"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="timeout">Timeout</Label>
        <Input
          id="timeout"
          value={(data.timeout as string) || "5m"}
          onChange={(e) => onChange("timeout", e.target.value)}
          placeholder="e.g. 5m, 1h"
        />
      </div>
    </>
  );
};
