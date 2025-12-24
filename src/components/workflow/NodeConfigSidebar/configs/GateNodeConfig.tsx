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
import { Textarea } from "@/components/ui/textarea";

import type { NodeConfigProps } from "./types";

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
        <Select
          value={gateType}
          onValueChange={(value) => onChange("gateType", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="approval">Human Approval</SelectItem>
            <SelectItem value="signal">Wait for Signal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {gateType === "approval" && (
        <div className="space-y-2">
          <Label htmlFor="approvers">Approvers (comma-separated)</Label>
          <Input
            id="approvers"
            value={((data.approvers as string[]) || []).join(", ")}
            onChange={(e) =>
              onChange(
                "approvers",
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              )
            }
            placeholder="user@example.com, admin@example.com"
          />
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
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="timeout">Timeout</Label>
        <Input
          id="timeout"
          value={(data.timeout as string) || ""}
          onChange={(e) => onChange("timeout", e.target.value)}
          placeholder="1h, 24h, 7d"
        />
      </div>

      <div className="space-y-2">
        <Label>Timeout Action</Label>
        <Select
          value={(data.timeoutAction as string) || "reject"}
          onValueChange={(value) => onChange("timeoutAction", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="approve">Auto-approve</SelectItem>
            <SelectItem value="reject">Auto-reject</SelectItem>
            <SelectItem value="continue">Continue anyway</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
