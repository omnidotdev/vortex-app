import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import {
  Bot,
  Cable,
  Check,
  ChevronRight,
  Code,
  CreditCard,
  Mail,
  MessageSquare,
  Phone,
  Plug,
  Search,
  Sheet,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";

import { ConnectIntegrationDialog } from "@/components/integrations/ConnectIntegrationDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  integrationDefinitionsOptions,
  integrationsOptions,
} from "@/lib/options/integrations.options";

import type { IntegrationDefinitionsQuery } from "@/generated/graphql";

type IntegrationDefinition = NonNullable<
  IntegrationDefinitionsQuery["integrationDefinitions"]
>["nodes"][number];

const searchSchema = z.object({
  connect: z.string().optional(),
  returnTo: z.string().optional(),
});

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/integrations/",
)({
  validateSearch: searchSchema,
  loader: async ({ context: { queryClient, organizationId } }) => {
    if (!organizationId) throw notFound();

    await Promise.all([
      queryClient.ensureQueryData(integrationsOptions({ organizationId })),
      queryClient.ensureQueryData(integrationDefinitionsOptions({})),
    ]);

    return { organizationId };
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

// Stat card component
function StatCard({
  icon: Icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:border-primary/30 ${
        highlight
          ? "border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card"
          : "border-border/50 bg-card/50"
      }`}
    >
      {highlight && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      )}
      <div className="relative flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            highlight ? "bg-primary/20" : "bg-muted"
          }`}
        >
          <Icon
            className={`h-5 w-5 ${highlight ? "text-primary" : "text-muted-foreground"}`}
          />
        </div>
        <div>
          <p className="text-muted-foreground text-sm">{label}</p>
          <p className="font-semibold text-xl">{value}</p>
        </div>
      </div>
    </div>
  );
}

// Category pill component
function CategoryPill({
  category,
  icon: Icon,
  label,
  count,
  isActive,
  onClick,
}: {
  category: string;
  icon: React.ElementType;
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-200 ${
        isActive
          ? "border-primary bg-primary/10 text-primary"
          : "border-border/50 bg-card/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
      <span
        className={`rounded-full px-1.5 text-xs ${
          isActive ? "bg-primary/20" : "bg-muted"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function IntegrationsPage() {
  const { workspaceSlug } = Route.useParams();
  const { connect, returnTo } = Route.useSearch();
  const { organizationId } = Route.useLoaderData();
  const navigate = useNavigate();
  const [connectingDefinition, setConnectingDefinition] =
    useState<IntegrationDefinition | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

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

  const initializedRef = useRef(false);

  // Sync dialog state from URL param on initial load only
  useEffect(() => {
    if (initializedRef.current) return;
    if (connect && definitions.length > 0) {
      const definition = definitions.find(
        (d) => d.id === connect || d.rowId === connect,
      );
      if (definition) {
        setConnectingDefinition(definition);
      }
      initializedRef.current = true;
    }
  }, [connect, definitions]);

  const openConnectDialog = (definition: IntegrationDefinition) => {
    setConnectingDefinition(definition);
    // Use rowId for URL param (e.g., "twilio")
    window.history.replaceState(null, "", `?connect=${definition.rowId}`);
  };

  const closeConnectDialog = () => {
    setConnectingDefinition(null);
    window.history.replaceState(null, "", window.location.pathname);
  };

  // Check if an integration is connected
  const isConnected = (definitionId: string) =>
    integrations.some((i) => i.type === definitionId);

  // Get all integrations of a specific type (for multi-account support)
  const getIntegrationsOfType = (definitionId: string) =>
    integrations.filter((i) => i.type === definitionId);

  const handleConfigure = (integration: { rowId: string }) => {
    navigate({
      to: "/workspaces/$workspaceSlug/integrations/$integrationId",
      params: { workspaceSlug, integrationId: integration.rowId },
    });
  };

  // Group definitions by category
  const _groupedDefinitions = definitions.reduce(
    (acc, def) => {
      const category = def.category || "custom";
      if (!acc[category]) acc[category] = [];
      acc[category].push(def);
      return acc;
    },
    {} as Record<string, typeof definitions>,
  );

  // Filter definitions based on search and category
  const filteredDefinitions = useMemo(() => {
    let filtered = definitions;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (def) =>
          def.name.toLowerCase().includes(query) ||
          def.description?.toLowerCase().includes(query),
      );
    }

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (def) => (def.category || "custom") === activeCategory,
      );
    }

    return filtered;
  }, [definitions, searchQuery, activeCategory]);

  // Get unique categories with counts
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const def of definitions) {
      const cat = def.category || "custom";
      counts[cat] = (counts[cat] || 0) + 1;
    }
    return counts;
  }, [definitions]);

  // Stats
  const activeIntegrations = integrations.filter((i) => i.isEnabled).length;
  const uniqueCategories = Object.keys(categories).length;

  return (
    <div className="relative min-h-full">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-primary/3 blur-[80px]" />
      </div>

      <div className="relative p-8">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="animate-fade-up opacity-0">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Plug className="h-5 w-5 text-primary" />
              </div>
              <h1 className="font-bold text-2xl">Integrations</h1>
            </div>
            <p className="mt-2 max-w-lg text-muted-foreground">
              Connect external services to power your workflows. Browse our
              catalog or connect your favorite tools.
            </p>
          </div>

          {/* Search */}
          <div className="w-full animate-fade-up opacity-0 [animation-delay:100ms] lg:w-80">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-border/50 bg-card/50 pl-10"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid animate-fade-up grid-cols-2 gap-4 opacity-0 [animation-delay:150ms] lg:grid-cols-4">
          <StatCard icon={Cable} label="Available" value={definitions.length} />
          <StatCard
            icon={Zap}
            label="Connected"
            value={integrations.length}
            highlight={integrations.length > 0}
          />
          <StatCard icon={Check} label="Active" value={activeIntegrations} />
          <StatCard
            icon={Sparkles}
            label="Categories"
            value={uniqueCategories}
          />
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex animate-fade-up flex-wrap gap-2 opacity-0 [animation-delay:200ms]">
          <CategoryPill
            category="all"
            icon={Cable}
            label="All"
            count={definitions.length}
            isActive={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          />
          {Object.entries(categories).map(([category, count]) => {
            const Icon = categoryIcons[category] || Cable;
            return (
              <CategoryPill
                key={category}
                category={category}
                icon={Icon}
                label={categoryLabels[category] || category}
                count={count}
                isActive={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              />
            );
          })}
        </div>

        {/* Featured Integrations Grid */}
        {activeCategory === "all" && !searchQuery && (
          <section className="mt-8 animate-fade-up opacity-0 [animation-delay:250ms]">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-lg">Featured</h2>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {definitions
                .filter((d) => d.isFeatured)
                .map((definition, index) => {
                  const connected = isConnected(definition.rowId);
                  const connectedCount = getIntegrationsOfType(
                    definition.rowId,
                  ).length;
                  const CategoryIcon =
                    categoryIcons[definition.category || "custom"] || Cable;

                  return (
                    <div
                      key={definition.rowId}
                      className="group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
                      style={{ animationDelay: `${300 + index * 50}ms` }}
                    >
                      {/* Gradient overlay on hover */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* Connected indicator */}
                      {connected && (
                        <div className="absolute top-3 right-3 z-10">
                          <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-green-600 dark:text-green-400">
                            <Check className="h-3 w-3" />
                            <span className="font-medium text-xs">
                              {connectedCount > 1
                                ? connectedCount
                                : "Connected"}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="relative flex flex-1 flex-col p-5">
                        <div className="flex items-start gap-4">
                          {definition.iconUrl ? (
                            <img
                              src={definition.iconUrl}
                              alt={definition.name}
                              className="h-12 w-12 rounded-xl bg-muted p-2 transition-transform duration-300 group-hover:scale-110"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted transition-transform duration-300 group-hover:scale-110">
                              <CategoryIcon className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate font-semibold">
                              {definition.name}
                            </h3>
                            <Badge
                              variant="secondary"
                              className="mt-1 bg-muted/50 text-[10px]"
                            >
                              {categoryLabels[definition.category || "custom"]}
                            </Badge>
                          </div>
                        </div>
                        <p className="mt-3 line-clamp-2 flex-1 text-muted-foreground text-sm">
                          {definition.description}
                        </p>
                        <div className="mt-4 border-border/50 border-t pt-4">
                          {connected ? (
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="group/btn flex-1"
                                onClick={() => {
                                  const integration = integrations.find(
                                    (i) => i.type === definition.rowId,
                                  );
                                  if (integration) handleConfigure(integration);
                                }}
                              >
                                Configure
                                <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="px-3"
                                onClick={() => openConnectDialog(definition)}
                                title="Add another account"
                              >
                                +
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              className="group/btn w-full"
                              onClick={() => openConnectDialog(definition)}
                            >
                              <Plug className="mr-2 h-3 w-3" />
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        )}

        {/* Connected Integrations */}
        {integrations.length > 0 &&
          activeCategory === "all" &&
          !searchQuery && (
            <section className="mt-10 animate-fade-up opacity-0 [animation-delay:350ms]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold text-lg">Your Connections</h2>
                  <Badge variant="secondary" className="ml-1">
                    {integrations.length}
                  </Badge>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {integrations.map((integration, index) => {
                  const definition = definitions.find(
                    (d) => d.id === integration.type,
                  );
                  const CategoryIcon =
                    categoryIcons[definition?.category || "custom"] || Cable;

                  return (
                    <button
                      key={integration.rowId}
                      type="button"
                      onClick={() => handleConfigure(integration)}
                      className="group relative flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4 text-left backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
                      style={{ animationDelay: `${400 + index * 30}ms` }}
                    >
                      {/* Status indicator */}
                      <div
                        className={`absolute top-3 right-3 h-2 w-2 rounded-full ${
                          integration.isEnabled
                            ? "bg-green-500 shadow-green-500/50 shadow-sm"
                            : "bg-muted-foreground/50"
                        }`}
                      />

                      {definition?.iconUrl ? (
                        <img
                          src={definition.iconUrl}
                          alt={definition.name}
                          className="h-12 w-12 rounded-xl bg-muted p-2 transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted transition-transform duration-300 group-hover:scale-105">
                          <CategoryIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">
                          {integration.name}
                        </p>
                        <p className="truncate text-muted-foreground text-sm">
                          {definition?.name || integration.type}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </button>
                  );
                })}
              </div>
            </section>
          )}

        {/* All Integrations / Filtered View */}
        <section className="mt-10 animate-fade-up opacity-0 [animation-delay:400ms]">
          <div className="flex items-center gap-2">
            <Cable className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-lg">
              {activeCategory === "all"
                ? "All Integrations"
                : categoryLabels[activeCategory] || activeCategory}
            </h2>
            <Badge variant="secondary" className="ml-1">
              {filteredDefinitions.length}
            </Badge>
          </div>

          {/* Empty state for search/filter */}
          {filteredDefinitions.length === 0 && (
            <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-border/50 border-dashed bg-card/30 p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">
                No integrations found
              </h3>
              <p className="mt-2 max-w-sm text-muted-foreground">
                {searchQuery
                  ? `No integrations match "${searchQuery}". Try a different search term.`
                  : "No integrations in this category yet."}
              </p>
              {(searchQuery || activeCategory !== "all") && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}

          {/* Grid of integrations */}
          {filteredDefinitions.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredDefinitions.map((def, index) => {
                const connected = isConnected(def.rowId);
                const CategoryIcon =
                  categoryIcons[def.category || "custom"] || Cable;

                return (
                  <button
                    key={def.rowId}
                    type="button"
                    className="group relative flex cursor-pointer items-center gap-3 rounded-xl border border-border/50 bg-card/50 p-4 text-left backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
                    style={{ animationDelay: `${450 + index * 20}ms` }}
                    onClick={() =>
                      connected
                        ? handleConfigure(
                            integrations.find((i) => i.type === def.rowId)!,
                          )
                        : openConnectDialog(def)
                    }
                  >
                    {/* Connected indicator */}
                    {connected && (
                      <div className="absolute top-2 right-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10">
                          <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                    )}

                    {def.iconUrl ? (
                      <img
                        src={def.iconUrl}
                        alt={def.name}
                        className="h-10 w-10 rounded-lg bg-muted p-1.5 transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-transform duration-300 group-hover:scale-110">
                        <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-sm">
                        {def.name}
                      </span>
                      {activeCategory === "all" && (
                        <span className="text-muted-foreground text-xs">
                          {categoryLabels[def.category || "custom"]}
                        </span>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* Connect Dialog */}
        {connectingDefinition && (
          <ConnectIntegrationDialog
            definition={connectingDefinition}
            organizationId={organizationId}
            existingIntegrations={getIntegrationsOfType(
              connectingDefinition.id,
            )}
            returnTo={returnTo}
            onClose={closeConnectDialog}
            onConfigureExisting={(integration) => {
              closeConnectDialog();
              handleConfigure(integration);
            }}
          />
        )}
      </div>
    </div>
  );
}
