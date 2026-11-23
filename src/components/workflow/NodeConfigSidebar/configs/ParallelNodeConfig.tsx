import { Label } from "@omnidotdev/thornberry/label";
import { Textarea } from "@omnidotdev/thornberry/textarea";

import Dropdown from "@/components/ui/dropdown";

import type { NodeConfigProps } from "./types";

export const ParallelNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this parallel step do?"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>Wait For</Label>
        <Dropdown
          value={String(data.waitFor || "all")}
          onValueChange={(value) =>
            onChange(
              "waitFor",
              value === "all" || value === "any"
                ? value
                : Number.parseInt(value, 10),
            )
          }
          options={[
            { value: "all", label: "All branches" },
            { value: "any", label: "Any branch" },
            { value: "1", label: "At least 1" },
            { value: "2", label: "At least 2" },
            { value: "3", label: "At least 3" },
          ]}
        />
        <p className="text-muted-foreground text-xs">
          Connect each branch handle to the first step of each parallel
          execution path.
        </p>
      </div>
    </>
  );
};
