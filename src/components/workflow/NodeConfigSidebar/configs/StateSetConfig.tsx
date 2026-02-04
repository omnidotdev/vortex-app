import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { NodeConfigProps } from "./types";

export const StateSetConfig = ({ data, onChange }: NodeConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What state are you writing?"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="stateKey">Key</Label>
        <Input
          id="stateKey"
          value={(data.key as string) || ""}
          onChange={(e) => onChange("key", e.target.value)}
          placeholder="user:preferences"
        />
        <p className="text-muted-foreground text-xs">
          State key to write (scoped to your organization)
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="stateValue">Value</Label>
        <Textarea
          id="stateValue"
          value={
            typeof data.value === "string"
              ? (data.value as string)
              : JSON.stringify(data.value ?? "", null, 2)
          }
          onChange={(e) => {
            const raw = e.target.value;
            try {
              const parsed = JSON.parse(raw);
              onChange("value", parsed);
            } catch {
              onChange("value", raw);
            }
          }}
          placeholder='{"theme": "dark"} or {{steps.previous.output}}'
          rows={4}
          className="font-mono text-sm"
        />
        <p className="text-muted-foreground text-xs">
          JSON value or template expression
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="stateTtl">TTL (seconds, optional)</Label>
        <Input
          id="stateTtl"
          type="number"
          min={0}
          value={(data.ttl as number) ?? ""}
          onChange={(e) => {
            const val = e.target.value
              ? Number.parseInt(e.target.value, 10)
              : undefined;
            onChange("ttl", val);
          }}
          placeholder="Leave blank for no expiry"
        />
        <p className="text-muted-foreground text-xs">
          Auto-expire after this many seconds
        </p>
      </div>
    </>
  );
};
