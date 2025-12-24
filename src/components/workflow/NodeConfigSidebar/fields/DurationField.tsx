"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DurationUnit = "seconds" | "minutes" | "hours" | "days";

interface DurationFieldProps {
  label?: string;
  duration: number;
  unit: DurationUnit;
  onDurationChange: (duration: number) => void;
  onUnitChange: (unit: DurationUnit) => void;
}

export const DurationField = ({
  label = "Duration",
  duration,
  unit,
  onDurationChange,
  onUnitChange,
}: DurationFieldProps) => {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="grid grid-cols-2 gap-2">
        <Input
          type="number"
          value={duration || 1}
          onChange={(e) =>
            onDurationChange(Number.parseInt(e.target.value, 10) || 1)
          }
          min={1}
        />
        <Select
          value={unit || "minutes"}
          onValueChange={(v) => onUnitChange(v as DurationUnit)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seconds">Seconds</SelectItem>
            <SelectItem value="minutes">Minutes</SelectItem>
            <SelectItem value="hours">Hours</SelectItem>
            <SelectItem value="days">Days</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
