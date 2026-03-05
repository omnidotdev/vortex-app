import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/ui/json-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePublishEventMutation } from "@/lib/graphql/eventSchemaStubs";
import eventSchemasOptions from "@/lib/options/eventSchemas.options";

import type { PublishEventPayload } from "@/generated/graphql";

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/events/sandbox",
)({
  validateSearch: (search: Record<string, unknown>) => ({
    type: (search.type as string) ?? "",
  }),
  loader: async ({ context: { queryClient, organizationId } }) => {
    if (!organizationId) throw notFound();
    await queryClient.ensureQueryData(eventSchemasOptions({}));
    return { organizationId };
  },
  component: EventSandboxPage,
});

/**
 * Generate a skeleton JSON object from a JSON Schema's required fields.
 */
function generateSkeleton(schema: Record<string, unknown>): string {
  const properties = (schema.properties ?? {}) as Record<
    string,
    Record<string, unknown>
  >;
  const required = (schema.required ?? []) as string[];

  const skeleton: Record<string, unknown> = {};
  for (const [name, prop] of Object.entries(properties)) {
    if (!required.includes(name)) continue;
    const type = prop.type as string;
    if (type === "string") skeleton[name] = "";
    else if (type === "number" || type === "integer") skeleton[name] = 0;
    else if (type === "boolean") skeleton[name] = false;
    else if (type === "object") skeleton[name] = {};
    else if (type === "array") skeleton[name] = [];
    else skeleton[name] = null;
  }

  return JSON.stringify(skeleton, null, 2);
}

/**
 * Event sandbox page for testing event emission.
 */
function EventSandboxPage() {
  const { workspaceSlug } = Route.useParams();
  const { organizationId } = Route.useLoaderData();
  const { type: initialType } = Route.useSearch();

  const { data: schemas } = useSuspenseQuery({
    ...eventSchemasOptions({}),
    select: (data) => data?.eventSchemas?.nodes ?? [],
  });

  // Deduplicate to latest version per name
  const latestSchemas = Array.from(
    schemas
      .reduce((acc, s) => {
        const existing = acc.get(s.name);
        if (!existing || s.version > existing.version) acc.set(s.name, s);
        return acc;
      }, new Map<string, (typeof schemas)[number]>())
      .values(),
  ).sort((a, b) => a.name.localeCompare(b.name));

  const [selectedType, setSelectedType] = useState(initialType || "");
  const [eventData, setEventData] = useState(() => {
    if (initialType) {
      const schema = latestSchemas.find((s) => s.name === initialType);
      if (schema?.payloadSchema) {
        return generateSkeleton(
          schema.payloadSchema as Record<string, unknown>,
        );
      }
    }
    return "{}";
  });
  const [result, setResult] = useState<PublishEventPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedSchema = latestSchemas.find((s) => s.name === selectedType);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setResult(null);
    setError(null);
    const schema = latestSchemas.find((s) => s.name === type);
    if (schema?.payloadSchema) {
      setEventData(
        generateSkeleton(schema.payloadSchema as Record<string, unknown>),
      );
    } else {
      setEventData("{}");
    }
  };

  const { mutate: publishEvent, isPending } = usePublishEventMutation({
    onSuccess: (data) => {
      setResult(data.publishEvent ?? null);
      setError(null);
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Failed to publish event");
      setResult(null);
    },
  });

  const handleSend = () => {
    if (!selectedType) return;

    let parsedData: Record<string, unknown>;
    try {
      parsedData = JSON.parse(eventData);
    } catch {
      setError("Invalid JSON in event data");
      return;
    }

    publishEvent({
      input: {
        type: selectedType,
        organizationId,
        data: parsedData,
      },
    });
  };

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
        <h1 className="font-bold text-2xl">Event Sandbox</h1>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-8">
        {/* Left panel: event config */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="event-type"
              className="mb-2 block font-medium text-sm"
            >
              Event Type
            </label>
            <Select value={selectedType} onValueChange={handleTypeChange}>
              <SelectTrigger id="event-type">
                <SelectValue placeholder="Select an event type" />
              </SelectTrigger>
              <SelectContent>
                {latestSchemas.map((schema) => (
                  <SelectItem key={schema.name} value={schema.name}>
                    {schema.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedSchema && (
            <p className="text-muted-foreground text-sm">
              {selectedSchema.description ?? "No description"} &middot; v
              {selectedSchema.version} &middot; {selectedSchema.enforcement}{" "}
              enforcement
            </p>
          )}

          <div>
            <label className="mb-2 block font-medium text-sm">
              Event Data (JSON)
            </label>
            <JsonEditor
              value={eventData}
              onChange={setEventData}
              minHeight={200}
              maxHeight={400}
            />
          </div>

          <Button
            onClick={handleSend}
            disabled={!selectedType || isPending}
            className="w-full"
          >
            {isPending ? "Sending..." : "Send Event"}
          </Button>
        </div>

        {/* Right panel: response */}
        <div>
          <h2 className="mb-4 font-medium text-sm">Response</h2>
          {error && (
            <div className="rounded-md border border-destructive bg-destructive/10 p-4">
              <p className="font-medium text-destructive text-sm">Error</p>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          )}
          {result && (
            <div className="space-y-4">
              <div className="rounded-md border bg-muted/50 p-4">
                <p className="font-medium text-sm">Event ID</p>
                <p className="mt-1 font-mono text-sm">{result.eventId}</p>
              </div>
              <div>
                <p className="mb-2 font-medium text-sm">Triggered Workflows</p>
                {result.workflowsTriggered.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No workflows triggered
                  </p>
                ) : (
                  <div className="space-y-2">
                    {result.workflowsTriggered.map((wf) => (
                      <div
                        key={wf.runId}
                        className="flex items-center justify-between rounded-md border p-3"
                      >
                        <div>
                          <p className="font-medium text-sm">
                            {wf.workflowName}
                          </p>
                          <p className="font-mono text-muted-foreground text-xs">
                            {wf.runId}
                          </p>
                        </div>
                        <Badge variant="outline">{wf.status}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {!error && !result && (
            <p className="text-muted-foreground text-sm">
              Select an event type and send to see the response.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
