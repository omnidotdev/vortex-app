import { Input } from "@omnidotdev/thornberry/input";
import { Label } from "@omnidotdev/thornberry/label";
import { Textarea } from "@omnidotdev/thornberry/textarea";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

import Dropdown from "@/components/ui/dropdown";
import { JsonField } from "../fields/JsonField";

import type { NodeConfigProps } from "./types";

export const PluginNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Convert ms to seconds for display, store as ms internally
  const timeoutSeconds = Math.round(((data.timeout as number) || 30000) / 1000);

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
        <Label htmlFor="pluginId">Plugin</Label>
        <Input
          id="pluginId"
          value={(data.pluginId as string) || ""}
          onChange={(e) => onChange("pluginId", e.target.value)}
          placeholder="my-custom-plugin"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="function">Function</Label>
        <Input
          id="function"
          value={(data.function as string) || ""}
          onChange={(e) => onChange("function", e.target.value)}
          placeholder="processData"
        />
      </div>

      <JsonField
        id="pluginInputs"
        label="Input Data"
        value={(data.inputs as Record<string, unknown>) || {}}
        onChange={(val) => onChange("inputs", val)}
        placeholder='{"data": "{{trigger.data}}"}'
      />

      <button
        type="button"
        className="flex w-full items-center gap-2 border-t pt-4 text-muted-foreground text-sm hover:text-foreground"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        {showAdvanced ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        Advanced Settings
      </button>

      {showAdvanced && (
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="timeout">Timeout</Label>
            <div className="flex items-center gap-2">
              <Input
                id="timeout"
                type="number"
                value={timeoutSeconds}
                onChange={(e) =>
                  onChange(
                    "timeout",
                    (Number.parseInt(e.target.value, 10) || 30) * 1000,
                  )
                }
                min={1}
                max={300}
                className="w-24"
              />
              <span className="text-muted-foreground text-sm">seconds</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="memoryLimit">Memory</Label>
            <Dropdown
              value={String((data.memoryLimit as number) || 128)}
              onValueChange={(value) =>
                onChange("memoryLimit", Number.parseInt(value, 10))
              }
              options={[
                { value: "64", label: "64 MB (Light)" },
                { value: "128", label: "128 MB (Default)" },
                { value: "256", label: "256 MB (Medium)" },
                { value: "512", label: "512 MB (Large)" },
                { value: "1024", label: "1 GB (Heavy)" },
              ]}
            />
          </div>
        </div>
      )}
    </>
  );
};
