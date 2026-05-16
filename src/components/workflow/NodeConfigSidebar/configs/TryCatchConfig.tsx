import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DurationField } from "../fields/DurationField";

import type { NodeConfigProps } from "./types";

type DurationUnit = "seconds" | "minutes" | "hours" | "days";

export const TryCatchConfig = ({ data, onChange }: NodeConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this try/catch handle?"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="errorVariable">Error Variable Name</Label>
        <Input
          id="errorVariable"
          value={(data.errorVariable as string) || "error"}
          onChange={(e) => onChange("errorVariable", e.target.value)}
          placeholder="error"
        />
        <p className="text-muted-foreground text-xs">
          Access error details in catch steps via {"{{steps.<id>.<name>}}"}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="retries">Retries</Label>
        <Input
          id="retries"
          type="number"
          value={(data.retries as number) ?? 0}
          onChange={(e) =>
            onChange(
              "retries",
              Math.min(
                10,
                Math.max(0, Number.parseInt(e.target.value, 10) || 0),
              ),
            )
          }
          min={0}
          max={10}
        />
        <p className="text-muted-foreground text-xs">
          Number of times to retry before running catch steps (0-10)
        </p>
      </div>

      <DurationField
        label="Retry Delay"
        duration={(data.retryDelayDuration as number) || 1}
        unit={(data.retryDelayUnit as DurationUnit) || "seconds"}
        onDurationChange={(val) => onChange("retryDelayDuration", val)}
        onUnitChange={(val) => onChange("retryDelayUnit", val)}
      />

      <div className="rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950">
        <p className="text-muted-foreground text-xs">
          <strong>How it works:</strong> Connect try steps to the green output.
          Connect catch steps to the red output. If try steps fail after all
          retries, catch steps run with error details.
        </p>
      </div>
    </>
  );
};
