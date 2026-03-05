import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { diffLines } from "diff";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import eventSchemasOptions from "@/lib/options/eventSchemas.options";

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/events/diff",
)({
  validateSearch: (search: Record<string, unknown>) => ({
    name: (search.name as string) ?? "",
    versionA: (search.versionA as string) ?? "",
    versionB: (search.versionB as string) ?? "",
  }),
  loader: async ({ context: { queryClient, organizationId } }) => {
    if (!organizationId) throw notFound();
    await queryClient.ensureQueryData(eventSchemasOptions({}));
  },
  component: EventSchemaDiffPage,
});

/**
 * Compare two schema versions field-by-field.
 */
function computeFieldChanges(
  schemaA: Record<string, unknown>,
  schemaB: Record<string, unknown>,
) {
  const propsA = (schemaA.properties ?? {}) as Record<string, unknown>;
  const propsB = (schemaB.properties ?? {}) as Record<string, unknown>;
  const allKeys = new Set([...Object.keys(propsA), ...Object.keys(propsB)]);

  const changes: { field: string; type: "added" | "removed" | "changed" }[] =
    [];

  for (const key of allKeys) {
    if (!(key in propsA)) {
      changes.push({ field: key, type: "added" });
    } else if (!(key in propsB)) {
      changes.push({ field: key, type: "removed" });
    } else if (
      JSON.stringify(propsA[key]) !== JSON.stringify(propsB[key])
    ) {
      changes.push({ field: key, type: "changed" });
    }
  }

  return changes;
}

/**
 * Event schema diff page for comparing versions side-by-side.
 */
function EventSchemaDiffPage() {
  const { workspaceSlug } = Route.useParams();
  const {
    name: initialName,
    versionA: initialVersionA,
    versionB: initialVersionB,
  } = Route.useSearch();

  const { data: schemas } = useSuspenseQuery({
    ...eventSchemasOptions({}),
    select: (data) => data?.eventSchemas?.nodes ?? [],
  });

  const schemaNames = [...new Set(schemas.map((s) => s.name))].sort();

  const [selectedName, setSelectedName] = useState(initialName || "");
  const [versionA, setVersionA] = useState(initialVersionA || "");
  const [versionB, setVersionB] = useState(initialVersionB || "");

  const versions = schemas
    .filter((s) => s.name === selectedName)
    .sort((a, b) => b.version - a.version);

  const schemaA = versions.find((v) => String(v.version) === versionA);
  const schemaB = versions.find((v) => String(v.version) === versionB);

  // Auto-select versions when name changes
  const handleNameChange = (name: string) => {
    setSelectedName(name);
    const nameVersions = schemas
      .filter((s) => s.name === name)
      .sort((a, b) => b.version - a.version);
    if (nameVersions.length >= 2) {
      setVersionA(String(nameVersions[1].version));
      setVersionB(String(nameVersions[0].version));
    } else if (nameVersions.length === 1) {
      setVersionA(String(nameVersions[0].version));
      setVersionB(String(nameVersions[0].version));
    }
  };

  const jsonA = useMemo(
    () =>
      schemaA?.payloadSchema
        ? JSON.stringify(schemaA.payloadSchema, null, 2)
        : "",
    [schemaA],
  );

  const jsonB = useMemo(
    () =>
      schemaB?.payloadSchema
        ? JSON.stringify(schemaB.payloadSchema, null, 2)
        : "",
    [schemaB],
  );

  const diffResult = useMemo(() => {
    if (!jsonA || !jsonB) return [];
    return diffLines(jsonA, jsonB);
  }, [jsonA, jsonB]);

  const fieldChanges = useMemo(() => {
    if (!schemaA?.payloadSchema || !schemaB?.payloadSchema) return [];
    return computeFieldChanges(
      schemaA.payloadSchema as Record<string, unknown>,
      schemaB.payloadSchema as Record<string, unknown>,
    );
  }, [schemaA, schemaB]);

  return (
    <div className="p-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link
            to="/workspaces/$workspaceSlug/events"
            params={{ workspaceSlug }}
          >
            &larr; Back
          </Link>
        </Button>
        <h1 className="font-bold text-2xl">Schema Diff</h1>
      </div>

      {/* Selectors */}
      <div className="mt-6 flex items-center gap-4">
        <Select value={selectedName} onValueChange={handleNameChange}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select event type" />
          </SelectTrigger>
          <SelectContent>
            {schemaNames.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={versionA} onValueChange={setVersionA}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Version A" />
          </SelectTrigger>
          <SelectContent>
            {versions.map((v) => (
              <SelectItem key={v.rowId} value={String(v.version)}>
                v{v.version}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-muted-foreground">vs</span>

        <Select value={versionB} onValueChange={setVersionB}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Version B" />
          </SelectTrigger>
          <SelectContent>
            {versions.map((v) => (
              <SelectItem key={v.rowId} value={String(v.version)}>
                v{v.version}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {schemaA && schemaB && (
        <>
          {/* Field-level summary */}
          {fieldChanges.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-2 font-semibold text-sm">Changes Summary</h2>
              <div className="flex flex-wrap gap-2">
                {fieldChanges.map((change) => (
                  <span
                    key={change.field}
                    className={`rounded-full px-2 py-1 font-mono text-xs ${
                      change.type === "added"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                        : change.type === "removed"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300"
                    }`}
                  >
                    {change.type === "added" && "+"}
                    {change.type === "removed" && "-"}
                    {change.type === "changed" && "~"}
                    {change.field}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Side-by-side diff */}
          <div className="mt-6 overflow-hidden rounded-md border">
            <div className="grid grid-cols-2 border-b bg-muted/50 px-4 py-2 font-medium text-sm">
              <span>v{versionA}</span>
              <span>v{versionB}</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
              {diffResult.map((part, i) => (
                <span
                  key={i}
                  className={
                    part.added
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : part.removed
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        : ""
                  }
                >
                  {part.value}
                </span>
              ))}
            </pre>
          </div>
        </>
      )}

      {!schemaA && !schemaB && selectedName && (
        <p className="mt-8 text-center text-muted-foreground">
          Select versions to compare.
        </p>
      )}

      {!selectedName && (
        <p className="mt-8 text-center text-muted-foreground">
          Select an event type to compare schema versions.
        </p>
      )}
    </div>
  );
}
