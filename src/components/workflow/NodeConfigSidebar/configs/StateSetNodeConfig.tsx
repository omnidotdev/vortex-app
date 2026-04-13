import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { NodeConfigProps } from "./types";

export const StateSetNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Describe this state write"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="key">Key</Label>
        <Input
          id="key"
          value={(data.key as string) || ""}
          onChange={(e) => onChange("key", e.target.value)}
          placeholder="e.g. user.preferences"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="value">Value</Label>
        <Textarea
          id="value"
          value={(data.value as string) || ""}
          onChange={(e) => onChange("value", e.target.value)}
          placeholder="Value or expression"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ttl">TTL (seconds)</Label>
        <Input
          id="ttl"
          type="number"
          min={0}
          value={(data.ttl as number) || ""}
          onChange={(e) =>
            onChange("ttl", e.target.value ? Number(e.target.value) : undefined)
          }
          placeholder="Optional"
        />
      </div>
    </>
  );
};
