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

export const CollectNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  const mode = (data.mode as string) || "all";

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Describe this event collection"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="correlationKey">Correlation Key</Label>
        <Input
          id="correlationKey"
          value={(data.correlationKey as string) || ""}
          onChange={(e) => onChange("correlationKey", e.target.value)}
          placeholder="e.g. orderId"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mode">Collection Mode</Label>
        <Select value={mode} onValueChange={(val) => onChange("mode", val)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="any">Any Event</SelectItem>
            <SelectItem value="n_of_m">N of M</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {mode === "n_of_m" && (
        <div className="space-y-2">
          <Label htmlFor="minRequired">Minimum Required</Label>
          <Input
            id="minRequired"
            type="number"
            min={1}
            value={(data.minRequired as number) || 1}
            onChange={(e) => onChange("minRequired", Number(e.target.value))}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="timeout">Timeout</Label>
        <Input
          id="timeout"
          value={(data.timeout as string) || "5m"}
          onChange={(e) => onChange("timeout", e.target.value)}
          placeholder="e.g. 5m, 1h"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="events">Events (JSON)</Label>
        <Textarea
          id="events"
          value={data.events ? JSON.stringify(data.events, null, 2) : "[]"}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              onChange("events", parsed);
            } catch {
              // Allow invalid JSON while typing
            }
          }}
          placeholder='[{"name": "payment", "sourcePattern": "*", "typePattern": "payment.*"}]'
          rows={6}
          className="font-mono text-xs"
        />
      </div>
    </>
  );
};
