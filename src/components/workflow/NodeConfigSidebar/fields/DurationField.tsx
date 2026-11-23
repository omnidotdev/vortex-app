import { Input } from "@omnidotdev/thornberry/input";
import { Label } from "@omnidotdev/thornberry/label";
import { OptionsSelect } from "@omnidotdev/thornberry/select";

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
        <OptionsSelect
          value={unit || "minutes"}
          onValueChange={(v) => onUnitChange(v as DurationUnit)}
          options={[
            { value: "seconds", label: "Seconds" },
            { value: "minutes", label: "Minutes" },
            { value: "hours", label: "Hours" },
            { value: "days", label: "Days" },
          ]}
        />
      </div>
    </div>
  );
};
