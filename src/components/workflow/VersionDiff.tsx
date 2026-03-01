import { Minus, Plus, RefreshCw } from "lucide-react";

import { cn } from "@/lib/utils";

type DiffEntry = {
  path: string;
  type: "added" | "removed" | "changed";
  oldValue?: unknown;
  newValue?: unknown;
};

type VersionDiffProps = {
  currentDefinition: Record<string, unknown>;
  selectedDefinition: Record<string, unknown>;
  selectedVersion: number;
};

/**
 * Format a value for display in the diff viewer.
 */
function formatValue(value: unknown): string {
  if (typeof value === "string") return `"${value}"`;
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (Array.isArray(value)) return `[${value.length} items]`;
  if (typeof value === "object")
    return `{${Object.keys(value as object).length} keys}`;

  return String(value);
}

/**
 * Recursively compute a flat list of diffs between two JSON objects.
 */
function computeDiff(
  oldObj: Record<string, unknown>,
  newObj: Record<string, unknown>,
  path = "",
): DiffEntry[] {
  const entries: DiffEntry[] = [];
  const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);

  for (const key of allKeys) {
    const currentPath = path ? `${path}.${key}` : key;
    const oldVal = oldObj[key];
    const newVal = newObj[key];

    if (!(key in oldObj)) {
      entries.push({ path: currentPath, type: "added", newValue: newVal });
    } else if (!(key in newObj)) {
      entries.push({ path: currentPath, type: "removed", oldValue: oldVal });
    } else if (
      typeof oldVal === "object" &&
      oldVal !== null &&
      typeof newVal === "object" &&
      newVal !== null &&
      !Array.isArray(oldVal) &&
      !Array.isArray(newVal)
    ) {
      entries.push(
        ...computeDiff(
          oldVal as Record<string, unknown>,
          newVal as Record<string, unknown>,
          currentPath,
        ),
      );
    } else if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
      entries.push({
        path: currentPath,
        type: "changed",
        oldValue: oldVal,
        newValue: newVal,
      });
    }
  }

  return entries;
}

function VersionDiff({
  currentDefinition,
  selectedDefinition,
  selectedVersion,
}: VersionDiffProps) {
  const diff = computeDiff(selectedDefinition, currentDefinition);

  const addedCount = diff.filter((e) => e.type === "added").length;
  const removedCount = diff.filter((e) => e.type === "removed").length;
  const changedCount = diff.filter((e) => e.type === "changed").length;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="space-y-1.5">
        <p className="font-medium text-sm">
          Changes from v{selectedVersion} to current
        </p>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-green-700 dark:text-green-400">
            <Plus className="h-3 w-3" />
            {addedCount} added
          </span>
          <span className="flex items-center gap-1 text-red-700 dark:text-red-400">
            <Minus className="h-3 w-3" />
            {removedCount} removed
          </span>
          <span className="flex items-center gap-1 text-yellow-700 dark:text-yellow-400">
            <RefreshCw className="h-3 w-3" />
            {changedCount} changed
          </span>
        </div>
      </div>

      {/* Diff entries */}
      <div className="space-y-1 font-mono text-xs">
        {diff.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">
            No differences
          </p>
        ) : (
          diff.map((entry) => (
            <div
              key={entry.path}
              className={cn(
                "rounded px-2 py-1",
                entry.type === "added" &&
                  "bg-green-500/10 text-green-700 dark:text-green-400",
                entry.type === "removed" &&
                  "bg-red-500/10 text-red-700 dark:text-red-400",
                entry.type === "changed" &&
                  "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
              )}
            >
              <span className="font-semibold">{entry.path}</span>

              {entry.type === "added" && (
                <span> + {formatValue(entry.newValue)}</span>
              )}

              {entry.type === "removed" && (
                <span> - {formatValue(entry.oldValue)}</span>
              )}

              {entry.type === "changed" && (
                <>
                  <span className="line-through opacity-60">
                    {" "}
                    {formatValue(entry.oldValue)}
                  </span>
                  <span> {"\u2192"} {formatValue(entry.newValue)}</span>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default VersionDiff;
