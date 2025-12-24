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
import { ExpressionField } from "../fields/ExpressionField";

import type { NodeConfigProps } from "./types";

export const LoopNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  const loopType = (data.loopType as string) || "forEach";

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
            <SelectItem value="forEach">For Each</SelectItem>
            <SelectItem value="while">While</SelectItem>
            <SelectItem value="times">Times</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loopType === "forEach" && (
        <>
          <ExpressionField
            id="collection"
            label="Collection Expression"
            value={(data.collection as string) || ""}
            onChange={(val) => onChange("collection", val)}
            placeholder="$.trigger.data.items"
            rows={1}
          />
          <div className="space-y-2">
            <Label htmlFor="itemVariable">Item Variable Name</Label>
            <Input
              id="itemVariable"
              value={(data.itemVariable as string) || "item"}
              onChange={(e) => onChange("itemVariable", e.target.value)}
              placeholder="item"
            />
          </div>
        </>
      )}

      {loopType === "while" && (
        <ExpressionField
          id="condition"
          label="While Condition"
          value={(data.condition as string) || ""}
          onChange={(val) => onChange("condition", val)}
          placeholder="$.variables.count < 10"
          rows={1}
        />
      )}

      {loopType === "times" && (
        <div className="space-y-2">
          <Label htmlFor="count">Number of Iterations</Label>
          <Input
            id="count"
            type="number"
            value={(data.count as number) || 1}
            onChange={(e) =>
              onChange("count", Number.parseInt(e.target.value, 10) || 1)
            }
            min={1}
          />
        </div>
      )}

      <div className="space-y-2 border-t pt-4">
        <Label htmlFor="maxIterations">Max Iterations (safety limit)</Label>
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
        />
        <p className="text-muted-foreground text-xs">
          Prevents infinite loops by limiting the maximum number of iterations.
        </p>
      </div>
    </>
  );
};
