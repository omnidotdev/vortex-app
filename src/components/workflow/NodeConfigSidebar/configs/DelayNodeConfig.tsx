"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DurationField } from "../fields/DurationField";

import type { NodeConfigProps } from "./types";

export const DelayNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this delay do?"
          rows={2}
        />
      </div>

      <DurationField
        duration={(data.duration as number) || 1}
        unit={
          (data.unit as "seconds" | "minutes" | "hours" | "days") || "minutes"
        }
        onDurationChange={(val) => onChange("duration", val)}
        onUnitChange={(val) => onChange("unit", val)}
      />
    </>
  );
};
