"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { JsonField } from "../fields/JsonField";

import type { NodeConfigProps } from "./types";

export const PluginNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this plugin do?"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pluginId">Plugin ID</Label>
        <Input
          id="pluginId"
          value={(data.pluginId as string) || ""}
          onChange={(e) => onChange("pluginId", e.target.value)}
          placeholder="my-custom-plugin or builtin:http"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="function">Function Name</Label>
        <Input
          id="function"
          value={(data.function as string) || ""}
          onChange={(e) => onChange("function", e.target.value)}
          placeholder="processData"
        />
      </div>

      <JsonField
        id="pluginInputs"
        label="Inputs (JSON)"
        value={(data.inputs as Record<string, unknown>) || {}}
        onChange={(val) => onChange("inputs", val)}
        placeholder='{"data": "$.trigger.data"}'
      />

      <div className="space-y-4 border-t pt-4">
        <h4 className="font-medium text-sm">Resource Limits</h4>

        <div className="space-y-2">
          <Label htmlFor="timeout">Timeout (ms)</Label>
          <Input
            id="timeout"
            type="number"
            value={(data.timeout as number) || 30000}
            onChange={(e) =>
              onChange("timeout", Number.parseInt(e.target.value, 10) || 30000)
            }
            min={1000}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="memoryLimit">Memory Limit (MB)</Label>
          <Input
            id="memoryLimit"
            type="number"
            value={(data.memoryLimit as number) || 128}
            onChange={(e) =>
              onChange(
                "memoryLimit",
                Number.parseInt(e.target.value, 10) || 128,
              )
            }
            min={16}
            max={1024}
          />
        </div>
      </div>
    </>
  );
};
