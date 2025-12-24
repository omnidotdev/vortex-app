"use client";

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
        <Select
          value={String(data.waitFor || "all")}
          onValueChange={(value) =>
            onChange(
              "waitFor",
              value === "all" || value === "any"
                ? value
                : Number.parseInt(value, 10),
            )
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All branches</SelectItem>
            <SelectItem value="any">Any branch</SelectItem>
            <SelectItem value="1">At least 1</SelectItem>
            <SelectItem value="2">At least 2</SelectItem>
            <SelectItem value="3">At least 3</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-muted-foreground text-xs">
          Connect each branch handle to the first step of each parallel
          execution path.
        </p>
      </div>
    </>
  );
};
