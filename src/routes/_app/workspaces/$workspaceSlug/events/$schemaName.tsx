import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import eventSchemasOptions from "@/lib/options/eventSchemas.options";

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/events/$schemaName",
)({
  loader: async ({ context: { queryClient, organizationId } }) => {
    if (!organizationId) throw notFound();
    await queryClient.ensureQueryData(eventSchemasOptions({}));
  },
  component: EventSchemaDetailPage,
});

/**
 * Render a JSON Schema properties object as a table.
 */
function SchemaPropertyTable({ schema }: { schema: Record<string, unknown> }) {
  const properties = (schema.properties ?? {}) as Record<
    string,
    Record<string, unknown>
  >;
  const required = (schema.required ?? []) as string[];

  const entries = Object.entries(properties);
  if (entries.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">No properties defined</p>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b text-left text-muted-foreground text-sm">
          <th className="pb-2 font-medium">Property</th>
          <th className="pb-2 font-medium">Type</th>
          <th className="pb-2 font-medium">Required</th>
          <th className="pb-2 font-medium">Description</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(([name, prop]) => (
          <tr key={name} className="border-b">
            <td className="py-2 font-mono text-sm">{name}</td>
            <td className="py-2 text-sm">
              {(prop.type as string) ?? "unknown"}
            </td>
            <td className="py-2">
              {required.includes(name) ? (
                <Badge variant="destructive" className="text-xs">
                  required
                </Badge>
              ) : (
                <span className="text-muted-foreground text-xs">optional</span>
              )}
            </td>
            <td className="py-2 text-muted-foreground text-sm">
              {(prop.description as string) ?? ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * Event schema detail page showing all versions.
 */
function EventSchemaDetailPage() {
  const { workspaceSlug, schemaName } = Route.useParams();

  const { data: allVersions } = useSuspenseQuery({
    ...eventSchemasOptions({}),
    select: (data) =>
      (data?.eventSchemata?.nodes ?? [])
        .filter((s) => s.name === schemaName)
        .sort((a, b) => b.version - a.version),
  });

  const latest = allVersions[0];

  if (!latest) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">
          Event schema "{schemaName}" not found.
        </p>
        <Button asChild className="mt-4">
          <Link
            to="/workspaces/$workspaceSlug/events"
            params={{ workspaceSlug }}
          >
            Back to catalog
          </Link>
        </Button>
      </div>
    );
  }

  const payloadSchema = (latest.payloadSchema as Record<string, unknown>) ?? {};

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link
            to="/workspaces/$workspaceSlug/events"
            params={{ workspaceSlug }}
          >
            &larr; Back
          </Link>
        </Button>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">{latest.name}</h1>
          <p className="mt-1 text-muted-foreground">
            {latest.source} &middot; v{latest.version} &middot;{" "}
            {latest.enforcement} enforcement
          </p>
          {latest.description && (
            <p className="mt-2 text-sm">{latest.description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link
              to="/workspaces/$workspaceSlug/events/sandbox"
              params={{ workspaceSlug }}
              search={{ type: latest.name }}
            >
              Test in Sandbox
            </Link>
          </Button>
          {allVersions.length > 1 && (
            <Button variant="outline" asChild>
              <Link
                to="/workspaces/$workspaceSlug/events/diff"
                params={{ workspaceSlug }}
                search={{ name: latest.name }}
              >
                Compare Versions
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Payload schema */}
      <section className="mt-8">
        <h2 className="mb-4 font-semibold text-lg">Payload Schema</h2>
        <SchemaPropertyTable schema={payloadSchema} />
      </section>

      {/* Version history */}
      <section className="mt-8">
        <h2 className="mb-4 font-semibold text-lg">Version History</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-muted-foreground text-sm">
              <th className="w-24 pb-2 font-medium">Version</th>
              <th className="w-32 pb-2 font-medium">Compatibility</th>
              <th className="w-24 pb-2 font-medium">Enforcement</th>
              <th className="pb-2 font-medium">Created</th>
              <th className="w-24 pb-2" />
            </tr>
          </thead>
          <tbody>
            {allVersions.map((version) => (
              <tr key={version.rowId} className="border-b">
                <td className="py-3">
                  <Badge variant="outline">v{version.version}</Badge>
                </td>
                <td className="py-3 text-sm">{version.compatibilityMode}</td>
                <td className="py-3 text-sm">{version.enforcement}</td>
                <td className="py-3 text-muted-foreground text-sm">
                  {new Date(version.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 text-right">
                  {allVersions.length > 1 && (
                    <Button variant="ghost" size="sm" asChild>
                      <Link
                        to="/workspaces/$workspaceSlug/events/diff"
                        params={{ workspaceSlug }}
                        search={{
                          name: latest.name,
                          versionA: String(version.version),
                        }}
                      >
                        Compare
                      </Link>
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
