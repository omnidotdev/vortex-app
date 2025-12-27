import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { ConnectIntegrationDialog } from "@/components/integrations/ConnectIntegrationDialog";
import { IntegrationCard } from "@/components/integrations/IntegrationCard";
import { Input } from "@/components/ui/input";
import { featuredIntegrationDefinitionsOptions } from "@/lib/options/integrationDefinitions.options";
import { integrationsOptions } from "@/lib/options/integrations.options";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/integrations/",
)({
  loader: async ({ context: { queryClient, workspaceBySlug } }) => {
    if (!workspaceBySlug) throw notFound();

    await Promise.all([
      queryClient.ensureQueryData(featuredIntegrationDefinitionsOptions()),
      queryClient.ensureQueryData(
        integrationsOptions({ workspaceId: workspaceBySlug.rowId }),
      ),
    ]);

    return { workspaceId: workspaceBySlug.rowId };
  },
  component: IntegrationsPage,
});

interface IntegrationDefinition {
  id: string;
  name: string;
  description?: string | null;
  iconUrl?: string | null;
  category: string;
  authType: string;
  authFields: Record<string, unknown>;
  keepAlive: boolean;
}

function IntegrationsPage() {
  const { workspaceSlug } = Route.useParams();
  const { workspaceId } = Route.useLoaderData();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [showAllIntegrations, setShowAllIntegrations] = useState(false);
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [selectedDefinition, setSelectedDefinition] =
    useState<IntegrationDefinition | null>(null);

  // Fetch featured integration definitions
  const { data: definitions } = useSuspenseQuery({
    ...featuredIntegrationDefinitionsOptions(),
    select: (data) =>
      (data?.integrationDefinitions?.nodes ?? []) as IntegrationDefinition[],
  });

  // Fetch workspace integrations
  const { data: integrations } = useSuspenseQuery({
    ...integrationsOptions({ workspaceId }),
    select: (data) => data?.integrations?.nodes ?? [],
  });

  // Create a map of connected integrations by type/definitionId
  const connectedByType = useMemo(() => {
    const map = new Map<string, (typeof integrations)[0]>();
    for (const integration of integrations) {
      map.set(integration.type, integration);
      if (integration.definitionId) {
        map.set(integration.definitionId, integration);
      }
    }
    return map;
  }, [integrations]);

  // Filter definitions by search
  const filteredDefinitions = useMemo(() => {
    if (!searchQuery.trim()) return definitions;
    const query = searchQuery.toLowerCase();
    return definitions.filter(
      (def) =>
        def.name.toLowerCase().includes(query) ||
        def.description?.toLowerCase().includes(query) ||
        def.category.toLowerCase().includes(query),
    );
  }, [definitions, searchQuery]);

  const handleConnect = (definition: IntegrationDefinition) => {
    setSelectedDefinition(definition);
    setConnectDialogOpen(true);
  };

  const handleConfigure = (integration: { rowId: string }) => {
    navigate({
      to: "/workspaces/$workspaceSlug/integrations/$integrationId",
      params: { workspaceSlug, integrationId: integration.rowId },
    });
  };

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

      {/* Search */}
      <div className="relative mt-6 max-w-md">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search integrations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Featured Integrations */}
      <section className="mt-8">
        <h2 className="font-semibold text-lg">Featured Integrations</h2>
        <p className="mt-1 text-muted-foreground text-sm">
          Popular services to get you started.
        </p>

        {filteredDefinitions.length === 0 ? (
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              No integrations found matching &ldquo;{searchQuery}&rdquo;
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDefinitions.map((definition) => (
              <IntegrationCard
                key={definition.id}
                definition={definition}
                connectedIntegration={connectedByType.get(definition.id)}
                onConnect={handleConnect}
                onConfigure={handleConfigure}
              />
            ))}
          </div>
        )}
      </section>

      {/* All Integrations (Expandable) */}
      <section className="mt-12">
        <button
          type="button"
          onClick={() => setShowAllIntegrations(!showAllIntegrations)}
          className="flex w-full items-center justify-between rounded-lg border bg-card p-4 text-left transition-colors hover:bg-accent"
        >
          <div>
            <h2 className="font-semibold text-lg">All Integrations</h2>
            <p className="text-muted-foreground text-sm">
              Browse 280+ available integrations from Activepieces.
            </p>
          </div>
          {showAllIntegrations ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </button>

        {showAllIntegrations && (
          <div className="mt-4 rounded-lg border bg-muted/50 p-8 text-center">
            <p className="text-muted-foreground">
              Extended catalog coming soon. Run the sync script to populate:
            </p>
            <code className="mt-2 inline-block rounded bg-muted px-2 py-1 font-mono text-sm">
              bun run scripts/syncIntegrationCatalog.ts
            </code>
          </div>
        )}
      </section>

      {/* Connected Integrations Summary */}
      {integrations.length > 0 && (
        <section className="mt-12">
          <h2 className="font-semibold text-lg">
            Connected ({integrations.length})
          </h2>
          <div className="mt-4 divide-y rounded-lg border">
            {integrations.map((integration) => (
              <div
                key={integration.rowId}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    {integration.integrationDefinition?.iconUrl ? (
                      <img
                        src={integration.integrationDefinition.iconUrl}
                        alt={integration.name}
                        className="h-6 w-6"
                      />
                    ) : (
                      <span className="font-semibold text-muted-foreground">
                        {integration.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{integration.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {integration.integrationDefinition?.name ||
                        integration.type}
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
                  <button
                    type="button"
                    onClick={() => handleConfigure(integration)}
                    className="rounded-md px-3 py-1 text-sm hover:bg-accent"
                  >
                    Configure
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Connect Dialog */}
      <ConnectIntegrationDialog
        definition={selectedDefinition}
        workspaceId={workspaceId}
        isOpen={connectDialogOpen}
        onClose={() => {
          setConnectDialogOpen(false);
          setSelectedDefinition(null);
        }}
      />
    </div>
  );
}
