import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import {
  Bot,
  Cable,
  Check,
  Code,
  CreditCard,
  Mail,
  MessageSquare,
  Phone,
  Sheet,
} from "lucide-react";
import { useState } from "react";

import { ConnectIntegrationDialog } from "@/components/integrations/ConnectIntegrationDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  integrationDefinitionsOptions,
  integrationsOptions,
} from "@/lib/options/integrations.options";

import type { IntegrationDefinitionsQuery } from "@/generated/graphql";

type IntegrationDefinition = NonNullable<
  IntegrationDefinitionsQuery["integrationDefinitions"]
>["nodes"][number];

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/integrations/",
)({
  loader: async ({ context: { queryClient, workspaceBySlug } }) => {
    if (!workspaceBySlug) throw notFound();

    await Promise.all([
      queryClient.ensureQueryData(
        integrationsOptions({ organizationId: workspaceBySlug.rowId }),
      ),
      queryClient.ensureQueryData(integrationDefinitionsOptions({})),
    ]);

    return { organizationId: workspaceBySlug.rowId };
  },
  component: IntegrationsPage,
});

const categoryIcons: Record<string, React.ElementType> = {
  developer: Code,
  communication: MessageSquare,
  ai: Bot,
  payments: CreditCard,
  productivity: Sheet,
  email: Mail,
  sms: Phone,
  custom: Cable,
};

const categoryLabels: Record<string, string> = {
  developer: "Developer",
  communication: "Communication",
  ai: "AI",
  payments: "Payments",
  productivity: "Productivity",
  email: "Email",
  sms: "SMS",
  custom: "Custom",
};

function IntegrationsPage() {
  const { workspaceSlug } = Route.useParams();
  const { organizationId } = Route.useLoaderData();
  const navigate = useNavigate();
  const [connectingDefinition, setConnectingDefinition] =
    useState<IntegrationDefinition | null>(null);

  // Fetch workspace integrations (connected)
  const { data: integrations } = useSuspenseQuery({
    ...integrationsOptions({ organizationId }),
    select: (data) => data?.integrations?.nodes ?? [],
  });

  // Fetch all integration definitions (catalog)
  const { data: definitions } = useSuspenseQuery({
    ...integrationDefinitionsOptions({}),
    select: (data) => data?.integrationDefinitions?.nodes ?? [],
  });

  // Check if an integration is connected
  const isConnected = (definitionId: string) =>
    integrations.some((i) => i.type === definitionId);

  const handleConfigure = (integration: { rowId: string }) => {
    navigate({
      to: "/workspaces/$workspaceSlug/integrations/$integrationId",
      params: { workspaceSlug, integrationId: integration.rowId },
    });
  };

  // Group definitions by category
  const groupedDefinitions = definitions.reduce(
    (acc, def) => {
      const category = def.category || "custom";
      if (!acc[category]) acc[category] = [];
      acc[category].push(def);
      return acc;
    },
    {} as Record<string, typeof definitions>,
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Integrations</h1>
          <p className="mt-1 text-muted-foreground">
            Connect external services to power your workflows.
          </p>
        </div>
      </div>

      {/* Featured Integrations Grid */}
      <section className="mt-8">
        <h2 className="font-semibold text-lg">Featured Integrations</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {definitions
            .filter((d) => d.isFeatured)
            .map((definition) => {
              const connected = isConnected(definition.id);
              const CategoryIcon =
                categoryIcons[definition.category || "custom"] || Cable;

              return (
                <div
                  key={definition.id}
                  className="relative rounded-lg border bg-card p-4 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    {definition.iconUrl ? (
                      <img
                        src={definition.iconUrl}
                        alt={definition.name}
                        className="h-10 w-10 rounded-lg bg-muted p-1.5"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{definition.name}</h3>
                        {connected && (
                          <Check className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <Badge variant="secondary" className="mt-1 text-[10px]">
                        {categoryLabels[definition.category || "custom"]}
                      </Badge>
                    </div>
                  </div>
                  <p className="mt-3 line-clamp-2 text-muted-foreground text-sm">
                    {definition.description}
                  </p>
                  <div className="mt-4">
                    {connected ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          const integration = integrations.find(
                            (i) => i.type === definition.id,
                          );
                          if (integration) handleConfigure(integration);
                        }}
                      >
                        Configure
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => setConnectingDefinition(definition)}
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* Connected Integrations */}
      {integrations.length > 0 && (
        <section className="mt-12">
          <h2 className="font-semibold text-lg">
            Connected ({integrations.length})
          </h2>
          <div className="mt-4 divide-y rounded-lg border">
            {integrations.map((integration) => {
              const definition = definitions.find(
                (d) => d.id === integration.type,
              );
              const CategoryIcon =
                categoryIcons[definition?.category || "custom"] || Cable;

              return (
                <div
                  key={integration.rowId}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-3">
                    {definition?.iconUrl ? (
                      <img
                        src={definition.iconUrl}
                        alt={definition.name}
                        className="h-10 w-10 rounded-lg bg-muted p-1.5"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{integration.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {definition?.name || integration.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs ${
                        integration.isEnabled
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {integration.isEnabled ? "Active" : "Inactive"}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleConfigure(integration)}
                    >
                      Configure
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* All Integrations by Category */}
      <section className="mt-12">
        <h2 className="font-semibold text-lg">All Integrations</h2>
        <div className="mt-4 space-y-6">
          {Object.entries(groupedDefinitions).map(([category, defs]) => {
            const CategoryIcon = categoryIcons[category] || Cable;
            return (
              <div key={category}>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CategoryIcon className="h-4 w-4" />
                  <h3 className="font-medium text-sm uppercase tracking-wide">
                    {categoryLabels[category] || category}
                  </h3>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {defs.map((def) => {
                    const connected = isConnected(def.id);
                    return (
                      <button
                        key={def.id}
                        type="button"
                        className="flex items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-accent"
                        onClick={() =>
                          connected
                            ? handleConfigure(
                                integrations.find((i) => i.type === def.id)!,
                              )
                            : setConnectingDefinition(def)
                        }
                      >
                        {def.iconUrl ? (
                          <img
                            src={def.iconUrl}
                            alt={def.name}
                            className="h-8 w-8 rounded bg-muted p-1"
                          />
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                            <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                        <span className="flex-1 font-medium text-sm">
                          {def.name}
                        </span>
                        {connected && (
                          <Check className="h-4 w-4 text-green-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Connect Dialog */}
      {connectingDefinition && (
        <ConnectIntegrationDialog
          definition={connectingDefinition}
          organizationId={organizationId}
          onClose={() => setConnectingDefinition(null)}
        />
      )}
    </div>
  );
}
