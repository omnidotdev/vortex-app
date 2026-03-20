import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import eventSchemasOptions from "@/lib/options/eventSchemas.options";

export const Route = createFileRoute("/_app/workspaces/$workspaceSlug/events/")(
  {
    loader: async ({ context: { queryClient, organizationId } }) => {
      if (!organizationId) throw notFound();
      await queryClient.ensureQueryData(eventSchemasOptions({}));
    },
    component: EventSchemasPage,
  },
);

/**
 * Event schemas browse page.
 */
function EventSchemasPage() {
  const { workspaceSlug } = Route.useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [enforcementFilter, setEnforcementFilter] = useState<string>("all");
  const [visibilityFilter, setVisibilityFilter] = useState<string>("all");

  const { data: schemas } = useSuspenseQuery({
    ...eventSchemasOptions({}),
    select: (data) => data?.eventSchemata?.nodes ?? [],
  });

  // Deduplicate to show only latest version per event name
  const latestSchemas = schemas.reduce((acc, schema) => {
    const existing = acc.get(schema.name);
    if (!existing || schema.version > existing.version) {
      acc.set(schema.name, schema);
    }
    return acc;
  }, new Map<string, (typeof schemas)[number]>());

  const filteredSchemas = Array.from(latestSchemas.values()).filter(
    (schema) => {
      if (
        searchQuery &&
        !schema.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      if (sourceFilter !== "all" && schema.source !== sourceFilter)
        return false;
      if (
        enforcementFilter !== "all" &&
        schema.enforcement !== enforcementFilter
      )
        return false;
      if (visibilityFilter !== "all" && schema.visibility !== visibilityFilter)
        return false;
      return true;
    },
  );

  const sources = [...new Set(schemas.map((s) => s.source))].sort();

  // Group by source
  const grouped = filteredSchemas.reduce((acc, schema) => {
    const group = acc.get(schema.source) ?? [];
    group.push(schema);
    acc.set(schema.source, group);
    return acc;
  }, new Map<string, typeof filteredSchemas>());

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-bold text-2xl">Event Catalog</h1>
        <Button asChild>
          <Link
            to="/workspaces/$workspaceSlug/events/sandbox"
            params={{ workspaceSlug }}
            search={{ type: "" }}
          >
            Open Sandbox
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <Input
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:max-w-xs"
        />
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All sources" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sources</SelectItem>
            {sources.map((source) => (
              <SelectItem key={source} value={source}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={enforcementFilter} onValueChange={setEnforcementFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All enforcement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All enforcement</SelectItem>
            <SelectItem value="strict">Strict</SelectItem>
            <SelectItem value="warn">Warn</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>
        <Select value={visibilityFilter} onValueChange={setVisibilityFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All visibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All visibility</SelectItem>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredSchemas.length === 0 ? (
        <div className="mt-16 text-center">
          <h3 className="mt-4 font-semibold text-lg">No event schemas found</h3>
          <p className="mt-2 text-muted-foreground">
            Event schemas are registered via the SDK when services emit events.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {Array.from(grouped.entries()).map(([source, sourceSchemas]) => (
            <div key={source}>
              <h2 className="mb-3 font-semibold text-lg text-muted-foreground">
                {source}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground text-sm">
                      <th className="w-64 pb-3 font-medium">Name</th>
                      <th className="w-24 pb-3 font-medium">Version</th>
                      <th className="hidden w-24 pb-3 font-medium sm:table-cell">
                        Enforcement
                      </th>
                      <th className="hidden w-32 pb-3 font-medium md:table-cell">
                        Compatibility
                      </th>
                      <th className="hidden w-24 pb-3 font-medium sm:table-cell">
                        Visibility
                      </th>
                      <th className="hidden w-40 pb-3 text-right font-medium md:table-cell">
                        Updated
                      </th>
                      <th className="w-24 pb-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {sourceSchemas.map((schema) => (
                      <tr key={schema.rowId} className="border-b">
                        <td className="py-4">
                          <Link
                            to="/workspaces/$workspaceSlug/events/$schemaName"
                            params={{
                              workspaceSlug,
                              schemaName: schema.name,
                            }}
                            className="font-medium hover:underline"
                          >
                            {schema.name}
                          </Link>
                        </td>
                        <td className="py-4">
                          <Badge variant="outline">v{schema.version}</Badge>
                        </td>
                        <td className="hidden py-4 sm:table-cell">
                          <Badge
                            variant={
                              schema.enforcement === "strict"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {schema.enforcement}
                          </Badge>
                        </td>
                        <td className="hidden py-4 text-muted-foreground text-sm md:table-cell">
                          {schema.compatibilityMode}
                        </td>
                        <td className="hidden py-4 sm:table-cell">
                          <Badge
                            variant={
                              schema.visibility === "public"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {schema.visibility}
                          </Badge>
                        </td>
                        <td
                          className="hidden py-4 text-right text-muted-foreground text-sm md:table-cell"
                          suppressHydrationWarning
                        >
                          {new Date(schema.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link
                              to="/workspaces/$workspaceSlug/events/sandbox"
                              params={{ workspaceSlug }}
                              search={{ type: schema.name }}
                            >
                              Test
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
