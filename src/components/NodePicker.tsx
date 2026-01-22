import { useQuery } from "@tanstack/react-query";
import {
  Bot,
  Cable,
  CheckCircle2,
  Clock,
  Code,
  CreditCard,
  Database,
  FileJson,
  Filter,
  GitBranch,
  Globe,
  Layers,
  Mail,
  MessageCircle,
  MousePointer,
  Puzzle,
  Repeat,
  Search,
  Sheet,
  ShoppingCart,
  SplitSquareVertical,
  Timer,
  Webhook,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  integrationDefinitionsOptions,
  integrationsOptions,
} from "@/lib/options/integrations.options";
import { NodeTypes } from "@/lib/schema";

// Category configuration with icons and labels
const CATEGORIES = {
  all: { label: "All", icon: Layers },
  triggers: { label: "Triggers", icon: Zap },
  flow: { label: "Flow", icon: GitBranch },
  transform: { label: "Transform", icon: FileJson },
  http: { label: "HTTP", icon: Globe },
  ai: { label: "AI", icon: Bot },
  communication: { label: "Communication", icon: MessageCircle },
  developer: { label: "Developer", icon: Code },
  productivity: { label: "Productivity", icon: Sheet },
  marketing: { label: "Marketing", icon: Mail },
  commerce: { label: "Commerce", icon: ShoppingCart },
  payments: { label: "Payments", icon: CreditCard },
  storage: { label: "Storage", icon: Database },
  other: { label: "Other", icon: Puzzle },
} as const;

type CategoryKey = keyof typeof CATEGORIES;

// Built-in nodes organized by category
const BUILTIN_NODES = [
  // Triggers
  {
    id: "trigger-webhook",
    category: "triggers",
    label: "Webhook",
    description: "Triggered by HTTP webhook",
    icon: Webhook,
    nodeType: NodeTypes.TRIGGER,
    config: { triggerType: "webhook" },
  },
  {
    id: "trigger-schedule",
    category: "triggers",
    label: "Schedule",
    description: "Triggered on a schedule (cron)",
    icon: Clock,
    nodeType: NodeTypes.TRIGGER,
    config: { triggerType: "cron" },
  },
  {
    id: "trigger-manual",
    category: "triggers",
    label: "Manual",
    description: "Triggered manually",
    icon: MousePointer,
    nodeType: NodeTypes.TRIGGER,
    config: { triggerType: "manual" },
  },
  // Flow Control
  {
    id: "flow-condition",
    category: "flow",
    label: "If Condition",
    description: "Branch based on a condition",
    icon: GitBranch,
    nodeType: NodeTypes.CONDITION,
    pluginId: "builtin:condition",
    operation: "evaluate",
  },
  {
    id: "flow-switch",
    category: "flow",
    label: "Switch",
    description: "Multiple conditional branches",
    icon: SplitSquareVertical,
    nodeType: NodeTypes.SWITCH,
    pluginId: "builtin:switch",
    operation: "evaluate",
    config: { cases: [{ value: "", label: "Case 1" }] },
  },
  {
    id: "flow-delay",
    category: "flow",
    label: "Delay",
    description: "Wait for a duration",
    icon: Timer,
    nodeType: NodeTypes.DELAY,
    pluginId: "builtin:delay",
    operation: "wait",
    config: { duration: 5, unit: "minutes" },
  },
  {
    id: "flow-loop",
    category: "flow",
    label: "Loop",
    description: "Repeat actions",
    icon: Repeat,
    nodeType: NodeTypes.LOOP,
    pluginId: "builtin:loop",
    operation: "iterate",
    config: { type: "count", count: 5 },
  },
  // Transform
  {
    id: "transform-jsonpath",
    category: "transform",
    label: "JSONPath Extract",
    description: "Extract data using JSONPath",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:transform",
    operation: "jsonPath",
  },
  {
    id: "transform-template",
    category: "transform",
    label: "Template",
    description: "Render template with variables",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:transform",
    operation: "template",
  },
  {
    id: "transform-map",
    category: "transform",
    label: "Map Data",
    description: "Map source to target structure",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:transform",
    operation: "map",
  },
  // HTTP
  {
    id: "http-request",
    category: "http",
    label: "HTTP Request",
    description: "Make any HTTP request",
    icon: Globe,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:http",
    operation: "request",
  },
  // MCP
  {
    id: "mcp-tool",
    category: "ai",
    label: "MCP Tool",
    description: "Call any MCP server tool",
    icon: Cable,
    nodeType: NodeTypes.MCP,
    pluginId: "builtin:mcp",
    operation: "call",
  },
];

// Map API categories to our categories
function mapCategory(apiCategory: string): CategoryKey {
  const mapping: Record<string, CategoryKey> = {
    ai: "ai",
    communication: "communication",
    developer: "developer",
    productivity: "productivity",
    marketing: "marketing",
    commerce: "commerce",
    payments: "payments",
    storage: "storage",
    support: "communication",
    hr: "productivity",
    other: "other",
  };
  return mapping[apiCategory?.toLowerCase()] ?? "other";
}

interface NodePickerProps {
  organizationId: string;
  onSelectNode: (nodeData: {
    type: string;
    data: Record<string, unknown>;
  }) => void;
}

export function NodePicker({ organizationId, onSelectNode }: NodePickerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");
  const [showOnlyConnected, setShowOnlyConnected] = useState(false);

  // Fetch all integration definitions (the catalog)
  const { data: definitionsData, isLoading: loadingDefinitions } = useQuery({
    ...integrationDefinitionsOptions({}),
    select: (data) => data?.integrationDefinitions?.nodes ?? [],
  });

  // Fetch connected integrations for this org
  const { data: integrationsData } = useQuery({
    ...integrationsOptions({ organizationId }),
    select: (data) => data?.integrations?.nodes ?? [],
  });

  const definitions = definitionsData ?? [];
  const connectedIntegrations = integrationsData ?? [];

  // Set of connected integration definition IDs
  const connectedIds = useMemo(
    () => new Set(connectedIntegrations.map((i) => i.type)),
    [connectedIntegrations],
  );

  // Filter and organize nodes
  const filteredNodes = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    // Filter built-in nodes
    const builtinFiltered = BUILTIN_NODES.filter((node) => {
      // Category filter
      if (selectedCategory !== "all" && node.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (query) {
        return (
          node.label.toLowerCase().includes(query) ||
          node.description.toLowerCase().includes(query)
        );
      }
      return true;
    });

    // Filter integration definitions
    const integrationFiltered = definitions.filter((def) => {
      const category = mapCategory(def.category);
      // Category filter
      if (selectedCategory !== "all" && category !== selectedCategory) {
        return false;
      }
      // Connected filter
      if (showOnlyConnected && !connectedIds.has(def.id)) {
        return false;
      }
      // Search filter
      if (query) {
        return (
          def.name.toLowerCase().includes(query) ||
          def.description?.toLowerCase().includes(query) ||
          def.id.toLowerCase().includes(query)
        );
      }
      return true;
    });

    return {
      builtin: builtinFiltered,
      integrations: integrationFiltered,
    };
  }, [
    searchQuery,
    selectedCategory,
    showOnlyConnected,
    definitions,
    connectedIds,
  ]);

  // Handle node selection
  const handleSelectBuiltin = (node: (typeof BUILTIN_NODES)[0]) => {
    onSelectNode({
      type: node.nodeType,
      data: {
        label: node.label,
        description: node.description,
        iconName: node.icon.name,
        ...(node.pluginId && { pluginId: node.pluginId }),
        ...(node.operation && { operation: node.operation }),
        ...(node.config && { config: node.config }),
      },
    });
  };

  const handleSelectIntegration = (def: (typeof definitions)[0]) => {
    const isConnected = connectedIds.has(def.id);
    const connectedIntegration = connectedIntegrations.find(
      (i) => i.type === def.id,
    );

    onSelectNode({
      type: NodeTypes.ACTION,
      data: {
        label: def.name,
        description: def.description ?? `${def.name} integration`,
        iconUrl: def.iconUrl,
        integrationId: isConnected ? def.id : undefined,
        integrationDefinitionId: def.id,
        connectedInstanceId: connectedIntegration?.rowId,
        requiresConnection: !isConnected,
      },
    });
  };

  // Count integrations by category for badges
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryKey, number> = {
      all: definitions.length + BUILTIN_NODES.length,
      triggers: BUILTIN_NODES.filter((n) => n.category === "triggers").length,
      flow: BUILTIN_NODES.filter((n) => n.category === "flow").length,
      transform: BUILTIN_NODES.filter((n) => n.category === "transform").length,
      http: BUILTIN_NODES.filter((n) => n.category === "http").length,
      ai:
        definitions.filter((d) => mapCategory(d.category) === "ai").length +
        BUILTIN_NODES.filter((n) => n.category === "ai").length,
      communication: definitions.filter(
        (d) => mapCategory(d.category) === "communication",
      ).length,
      developer: definitions.filter(
        (d) => mapCategory(d.category) === "developer",
      ).length,
      productivity: definitions.filter(
        (d) => mapCategory(d.category) === "productivity",
      ).length,
      marketing: definitions.filter(
        (d) => mapCategory(d.category) === "marketing",
      ).length,
      commerce: definitions.filter(
        (d) => mapCategory(d.category) === "commerce",
      ).length,
      payments: definitions.filter(
        (d) => mapCategory(d.category) === "payments",
      ).length,
      storage: definitions.filter((d) => mapCategory(d.category) === "storage")
        .length,
      other: definitions.filter((d) => mapCategory(d.category) === "other")
        .length,
    };
    return counts;
  }, [definitions]);

  return (
    <div className="flex h-full flex-col">
      {/* Search */}
      <div className="border-b p-4">
        <div className="relative">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search nodes and integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            autoFocus
          />
        </div>

        {/* Filter toggle */}
        <div className="mt-3 flex items-center gap-2">
          <Button
            variant={showOnlyConnected ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setShowOnlyConnected(!showOnlyConnected)}
            className="h-7 text-xs"
          >
            <Filter className="mr-1.5 h-3 w-3" />
            Connected only
          </Button>
          <span className="text-muted-foreground text-xs">
            {filteredNodes.builtin.length + filteredNodes.integrations.length}{" "}
            nodes
          </span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="border-b px-2 py-2">
        <div className="flex flex-wrap gap-1">
          {Object.entries(CATEGORIES).map(([key, { label, icon: Icon }]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(key as CategoryKey)}
              className="h-7 gap-1.5 px-2 text-xs"
            >
              <Icon className="h-3 w-3" />
              {label}
              {categoryCounts[key as CategoryKey] > 0 && (
                <Badge
                  variant={selectedCategory === key ? "default" : "secondary"}
                  className="ml-1 h-4 px-1 text-[10px]"
                >
                  {categoryCounts[key as CategoryKey]}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Node List */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {/* Built-in Nodes */}
          {filteredNodes.builtin.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                <Zap className="h-3.5 w-3.5" />
                Built-in
              </h3>
              <div className="grid gap-2">
                {filteredNodes.builtin.map((node) => (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => handleSelectBuiltin(node)}
                    className="flex cursor-pointer items-start gap-3 overflow-hidden rounded-lg border bg-card p-3 text-left transition-colors hover:border-primary/50 hover:bg-accent"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
                      <node.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <div className="truncate font-medium text-sm">
                        {node.label}
                      </div>
                      <div className="truncate text-muted-foreground text-xs">
                        {node.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Integration Nodes */}
          {filteredNodes.integrations.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                <Cable className="h-3.5 w-3.5" />
                Integrations
                <Badge variant="outline" className="text-[10px]">
                  {filteredNodes.integrations.length}
                </Badge>
              </h3>
              <div className="grid gap-2">
                {filteredNodes.integrations.map((def) => {
                  const isConnected = connectedIds.has(def.id);
                  return (
                    <button
                      key={def.id}
                      type="button"
                      onClick={() => handleSelectIntegration(def)}
                      className="flex cursor-pointer items-start gap-3 overflow-hidden rounded-lg border bg-card p-3 text-left transition-colors hover:border-primary/50 hover:bg-accent"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
                        {def.iconUrl ? (
                          <img
                            src={def.iconUrl}
                            alt={def.name}
                            className="h-5 w-5 rounded"
                          />
                        ) : (
                          <Cable className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1 overflow-hidden">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span className="truncate font-medium text-sm">
                            {def.name}
                          </span>
                          {isConnected && (
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-500" />
                          )}
                          {def.isFeatured && (
                            <Badge
                              variant="secondary"
                              className="h-4 shrink-0 px-1 text-[10px]"
                            >
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="truncate text-muted-foreground text-xs">
                          {def.description}
                        </div>
                      </div>
                      {!isConnected && (
                        <Badge
                          variant="outline"
                          className="shrink-0 text-[10px] text-muted-foreground"
                        >
                          Connect
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredNodes.builtin.length === 0 &&
            filteredNodes.integrations.length === 0 && (
              <div className="py-12 text-center">
                <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
                <p className="text-muted-foreground text-sm">
                  No nodes found matching "{searchQuery}"
                </p>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setShowOnlyConnected(false);
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}

          {/* Loading State */}
          {loadingDefinitions && (
            <div className="py-12 text-center">
              <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
              <p className="text-muted-foreground text-sm">
                Loading integrations...
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
