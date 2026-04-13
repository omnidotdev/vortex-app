import { cn } from "@/lib/utils";

import type { DateRange } from "./types";

type Preset = {
  label: string;
  value: string;
  getDates: () => DateRange;
};

const presets: Preset[] = [
  {
    label: "24h",
    value: "24h",
    getDates: () => ({
      since: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      until: new Date().toISOString(),
    }),
  },
  {
    label: "7d",
    value: "7d",
    getDates: () => ({
      since: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      until: new Date().toISOString(),
    }),
  },
  {
    label: "30d",
    value: "30d",
    getDates: () => ({
      since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      until: new Date().toISOString(),
    }),
  },
  {
    label: "90d",
    value: "90d",
    getDates: () => ({
      since: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      until: new Date().toISOString(),
    }),
  },
];

type DateRangePickerProps = {
  value: string;
  onChange: (preset: string, range: DateRange) => void;
};

/**
 * Time range preset selector for monitoring dashboard.
 */
function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <div className="flex gap-1 rounded-lg border p-1">
      {presets.map((preset) => (
        <button
          key={preset.value}
          type="button"
          onClick={() => onChange(preset.value, preset.getDates())}
          className={cn(
            "min-h-[44px] min-w-[44px] rounded-md px-3 py-2.5 font-medium text-sm transition-colors",
            value === preset.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-foreground",
          )}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}

export default DateRangePicker;
