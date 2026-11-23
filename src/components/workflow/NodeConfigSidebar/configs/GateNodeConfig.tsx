import { Input } from "@omnidotdev/thornberry/input";
import { Label } from "@omnidotdev/thornberry/label";
import { Textarea } from "@omnidotdev/thornberry/textarea";

import Dropdown from "@/components/ui/dropdown";
import { DurationField } from "../fields/DurationField";

import type { NodeConfigProps } from "./types";

type DurationUnit = "seconds" | "minutes" | "hours" | "days";

export const GateNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  const gateType = (data.gateType as string) || "approval";

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What approval or signal is needed?"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>Gate Type</Label>
        <Dropdown
          value={gateType}
          onValueChange={(value) => onChange("gateType", value)}
          options={[
            { value: "approval", label: "Wait for Approval" },
            { value: "signal", label: "Wait for Signal" },
          ]}
        />
      </div>

      {gateType === "approval" && (
        <div className="space-y-2">
          <Label htmlFor="approvers">Who Can Approve</Label>
          <Textarea
            id="approvers"
            value={((data.approvers as string[]) || []).join("\n")}
            onChange={(e) =>
              onChange(
                "approvers",
                e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              )
            }
            placeholder="user@example.com&#10;admin@example.com"
            rows={3}
          />
          <p className="text-muted-foreground text-xs">
            One email per line. Any of these people can approve.
          </p>
        </div>
      )}

      {gateType === "signal" && (
        <div className="space-y-2">
          <Label htmlFor="signalName">Signal Name</Label>
          <Input
            id="signalName"
            value={(data.signalName as string) || ""}
            onChange={(e) => onChange("signalName", e.target.value)}
            placeholder="continue-workflow"
          />
          <p className="text-muted-foreground text-xs">
            Workflow continues when this signal is received via API
          </p>
        </div>
      )}

      <DurationField
        label="Wait Timeout"
        duration={(data.timeoutDuration as number) || 24}
        unit={(data.timeoutUnit as DurationUnit) || "hours"}
        onDurationChange={(val) => onChange("timeoutDuration", val)}
        onUnitChange={(val) => onChange("timeoutUnit", val)}
      />

      <div className="space-y-2">
        <Label>If Timeout Reached</Label>
        <Dropdown
          value={(data.timeoutAction as string) || "reject"}
          onValueChange={(value) => onChange("timeoutAction", value)}
          options={[
            { value: "approve", label: "Automatically Approve" },
            { value: "reject", label: "Automatically Reject" },
            { value: "fail", label: "Fail the Workflow" },
          ]}
        />
      </div>
    </>
  );
};
