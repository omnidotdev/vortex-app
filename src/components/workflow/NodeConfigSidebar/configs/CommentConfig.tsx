import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import type { NodeConfigProps } from "./types";

const COLOR_OPTIONS = [
  { value: "yellow", label: "Yellow", swatch: "bg-yellow-400" },
  { value: "blue", label: "Blue", swatch: "bg-blue-400" },
  { value: "green", label: "Green", swatch: "bg-green-400" },
  { value: "pink", label: "Pink", swatch: "bg-pink-400" },
  { value: "purple", label: "Purple", swatch: "bg-purple-400" },
  { value: "gray", label: "Gray", swatch: "bg-gray-400" },
] as const;

export const CommentConfig = ({ data, onChange }: NodeConfigProps) => {
  const currentColor = (data.color as string) || "yellow";

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="note">Note</Label>
        <Textarea
          id="note"
          value={(data.note as string) || ""}
          onChange={(e) => onChange("note", e.target.value)}
          placeholder="Add notes or documentation for this workflow..."
          rows={5}
        />
      </div>

      <div className="space-y-2">
        <Label>Color</Label>
        <div className="flex flex-wrap gap-2">
          {COLOR_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange("color", option.value)}
              className={cn(
                "flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs transition-colors",
                currentColor === option.value
                  ? "border-primary bg-accent"
                  : "border-transparent hover:bg-muted",
              )}
            >
              <span
                className={cn("h-3 w-3 rounded-full", option.swatch)}
              />
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950">
        <p className="text-muted-foreground text-xs">
          Comments are visual-only and do not affect workflow execution.
          Use them to document your workflow logic for yourself and
          collaborators.
        </p>
      </div>
    </>
  );
};
