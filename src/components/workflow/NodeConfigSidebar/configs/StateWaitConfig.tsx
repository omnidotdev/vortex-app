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

export const StateWaitConfig = ({ data, onChange }: NodeConfigProps) => {
  const condition = (data.condition as string) || "exists";

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What are you waiting for?"
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
          State key to watch
        </p>
      </div>

      <div className="space-y-2">
        <Label>Condition</Label>
        <Select
          value={condition}
          onValueChange={(value) => onChange("condition", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="exists">Key Exists</SelectItem>
            <SelectItem value="equals">Value Equals</SelectItem>
            <SelectItem value="changed">Value Changed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {condition === "equals" && (
        <div className="space-y-2">
          <Label htmlFor="compareValue">Expected Value</Label>
          <Textarea
            id="compareValue"
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
            placeholder="Expected value (JSON or string)"
            rows={3}
            className="font-mono text-sm"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="waitTimeout">Timeout</Label>
        <Input
          id="waitTimeout"
          value={(data.timeout as string) || ""}
          onChange={(e) => onChange("timeout", e.target.value)}
          placeholder="30s, 5m, 1h"
        />
        <p className="text-muted-foreground text-xs">
          Maximum time to wait for the condition
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="outputVar">Output Variable (optional)</Label>
        <Input
          id="outputVar"
          value={(data.outputVariable as string) || ""}
          onChange={(e) => onChange("outputVariable", e.target.value)}
          placeholder="stateValue"
        />
        <p className="text-muted-foreground text-xs">
          Variable to store the value when condition is met
        </p>
      </div>
    </>
  );
};
