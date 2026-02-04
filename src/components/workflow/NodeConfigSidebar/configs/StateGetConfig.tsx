import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { NodeConfigProps } from "./types";

export const StateGetConfig = ({ data, onChange }: NodeConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What state are you reading?"
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
          State key to read (scoped to your organization)
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="outputVar">Output Variable</Label>
        <Input
          id="outputVar"
          value={(data.outputVariable as string) || "stateValue"}
          onChange={(e) => onChange("outputVariable", e.target.value)}
          placeholder="stateValue"
        />
        <p className="text-muted-foreground text-xs">
          Variable name to store the retrieved value
        </p>
      </div>
    </>
  );
};
