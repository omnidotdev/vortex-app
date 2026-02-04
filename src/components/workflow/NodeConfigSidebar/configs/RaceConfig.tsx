import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DurationField } from "../fields/DurationField";

import type { NodeConfigProps } from "./types";

type DurationUnit = "seconds" | "minutes" | "hours" | "days";

export const RaceConfig = ({ data, onChange }: NodeConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What are the branches racing to complete?"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="resultVariable">Result Variable</Label>
        <Input
          id="resultVariable"
          value={(data.resultVariable as string) || "result"}
          onChange={(e) => onChange("resultVariable", e.target.value)}
          placeholder="result"
        />
        <p className="text-muted-foreground text-xs">
          Variable name to store the winning branch's output
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="winnerIndexVariable">Winner Index Variable</Label>
        <Input
          id="winnerIndexVariable"
          value={(data.winnerIndexVariable as string) || "winnerIndex"}
          onChange={(e) => onChange("winnerIndexVariable", e.target.value)}
          placeholder="winnerIndex"
        />
        <p className="text-muted-foreground text-xs">
          Variable name to store which branch won (0-indexed)
        </p>
      </div>

      <DurationField
        label="Timeout"
        duration={(data.timeoutDuration as number) || 30}
        unit={(data.timeoutUnit as DurationUnit) || "seconds"}
        onDurationChange={(val) => onChange("timeoutDuration", val)}
        onUnitChange={(val) => onChange("timeoutUnit", val)}
      />

      <div className="rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950">
        <p className="text-muted-foreground text-xs">
          <strong>How it works:</strong> Connect multiple branches to the race
          outputs. The first branch to complete wins. All other branches are
          cancelled.
        </p>
      </div>
    </>
  );
};
