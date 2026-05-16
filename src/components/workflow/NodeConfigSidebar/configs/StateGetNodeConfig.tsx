import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { NodeConfigProps } from "./types";

export const StateGetNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Describe this state read"
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
        <Label htmlFor="outputVariable">Output Variable</Label>
        <Input
          id="outputVariable"
          value={(data.outputVariable as string) || ""}
          onChange={(e) => onChange("outputVariable", e.target.value)}
          placeholder="e.g. preferences"
        />
      </div>
    </>
  );
};
