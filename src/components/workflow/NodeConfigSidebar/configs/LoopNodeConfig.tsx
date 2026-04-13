import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

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
import { ExpressionField } from "../fields/ExpressionField";

import type { NodeConfigProps } from "./types";

export const LoopNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  const loopType = (data.loopType as string) || "forEach";
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this loop iterate over?"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>Loop Type</Label>
        <Select
          value={loopType}
          onValueChange={(value) => onChange("loopType", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="forEach">For Each Item</SelectItem>
            <SelectItem value="while">While Condition</SelectItem>
            <SelectItem value="times">Fixed Count</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loopType === "forEach" && (
        <>
          <ExpressionField
            id="collection"
            label="Items to Loop Over"
            value={(data.collection as string) || ""}
            onChange={(val) => onChange("collection", val)}
            placeholder="{{trigger.data.items}}"
            rows={1}
          />
          <p className="text-muted-foreground text-xs">
            Reference an array from a previous step, e.g.{" "}
            {"{{steps.fetch.body.users}}"}
          </p>
        </>
      )}

      {loopType === "while" && (
        <>
          <ExpressionField
            id="condition"
            label="Continue While"
            value={(data.condition as string) || ""}
            onChange={(val) => onChange("condition", val)}
            placeholder="{{loop.index}} < 10"
            rows={1}
          />
          <p className="text-muted-foreground text-xs">
            Loop continues while this condition is true
          </p>
        </>
      )}

      {loopType === "times" && (
        <div className="space-y-2">
          <Label htmlFor="count">Repeat Count</Label>
          <Input
            id="count"
            type="number"
            value={(data.count as number) || 5}
            onChange={(e) =>
              onChange("count", Number.parseInt(e.target.value, 10) || 1)
            }
            min={1}
            max={10000}
          />
        </div>
      )}

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
        <div className="space-y-2 pt-2">
          <Label htmlFor="maxIterations">Safety Limit</Label>
          <Input
            id="maxIterations"
            type="number"
            value={(data.maxIterations as number) || 1000}
            onChange={(e) =>
              onChange(
                "maxIterations",
                Number.parseInt(e.target.value, 10) || 1000,
              )
            }
            min={1}
            max={100000}
          />
          <p className="text-muted-foreground text-xs">
            Maximum iterations before stopping (prevents runaway loops)
          </p>
        </div>
      )}
    </>
  );
};
