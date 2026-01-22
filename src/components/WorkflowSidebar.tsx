import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Ban,
  Bell,
  Bot,
  Cable,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Code,
  CreditCard,
  Crown,
  Database,
  FileJson,
  GitBranch,
  GitFork,
  Globe,
  Hash,
  Mail,
  MessageCircle,
  MousePointer,
  Phone,
  Puzzle,
  Repeat,
  Search,
  Send,
  Sheet,
  Shield,
  SplitSquareVertical,
  Timer,
  UserPlus,
  Users,
  Webhook,
} from "lucide-react";
import { useMemo, useState } from "react";
import { SiDiscord, SiSlack } from "react-icons/si";

import ThemeToggle from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  integrationDefinitionsOptions,
  integrationsOptions,
} from "@/lib/options/integrations.options";
import { NodeTypes } from "@/lib/schema";

// Official plugins - built-in node types that ship with Vortex
// All nodes are backed by Extism plugins (builtin: prefix = native TypeScript)
const officialPlugins = [
  {
    type: NodeTypes.TRIGGER,
    category: "Triggers",
    items: [
      {
        iconName: "Webhook",
        label: "Webhook",
        description: "Triggered by HTTP webhook",
        triggerType: "webhook",
        pluginId: "builtin:trigger",
        operation: "execute",
      },
      {
        iconName: "Clock",
        label: "Schedule",
        description: "Triggered on a schedule (cron)",
        triggerType: "cron",
        pluginId: "builtin:trigger",
        operation: "execute",
      },
      {
        iconName: "MousePointer",
        label: "Manual",
        description: "Triggered by a manual click",
        triggerType: "manual",
        pluginId: "builtin:trigger",
        operation: "execute",
      },
    ],
  },
  {
    type: NodeTypes.ACTION,
    category: "HTTP",
    items: [
      {
        iconName: "Globe",
        label: "HTTP Request",
        description: "Make any HTTP request (GET, POST, PUT, DELETE, etc.)",
        pluginId: "builtin:http",
        operation: "request",
      },
    ],
  },
  {
    type: NodeTypes.ACTION,
    category: "Transform",
    items: [
      {
        iconName: "FileJson",
        label: "JSONPath Extract",
        description: "Extract data using JSONPath",
        pluginId: "builtin:transform",
        operation: "jsonPath",
      },
      {
        iconName: "FileJson",
        label: "Template",
        description: "Render template with variables",
        pluginId: "builtin:transform",
        operation: "template",
      },
      {
        iconName: "FileJson",
        label: "Map Data",
        description: "Map source to target structure",
        pluginId: "builtin:transform",
        operation: "map",
      },
    ],
  },
  {
    type: NodeTypes.CONDITION,
    category: "Flow Control",
    items: [
      {
        iconName: "GitBranch",
        label: "If Condition",
        description: "Branch based on a condition",
        pluginId: "builtin:condition",
        operation: "evaluate",
      },
      {
        iconName: "SplitSquareVertical",
        label: "Switch",
        description: "Multiple conditional branches",
        pluginId: "builtin:switch",
        operation: "evaluate",
      },
      {
        iconName: "Timer",
        label: "Delay",
        description: "Add a time delay",
        pluginId: "builtin:delay",
        operation: "wait",
      },
      {
        iconName: "Repeat",
        label: "Loop",
        description: "Repeat actions",
        pluginId: "builtin:loop",
        operation: "iterate",
      },
      {
        iconName: "GitFork",
        label: "Parallel",
        description: "Run branches in parallel",
        pluginId: "builtin:parallel",
        operation: "execute",
        comingSoon: true,
      },
      {
        iconName: "Shield",
        label: "Gate",
        description: "Require approval to continue",
        pluginId: "builtin:gate",
        operation: "check",
        comingSoon: true,
      },
    ],
  },
  {
    type: NodeTypes.ACTION,
    category: "Communication",
    items: [
      {
        iconName: "Discord",
        label: "Discord Message",
        description: "Send a message to Discord",
        pluginId: "builtin:http",
        operation: "request",
        preset: "discord",
      },
      {
        iconName: "Discord",
        label: "Discord Embed",
        description: "Send a rich embed to Discord",
        pluginId: "builtin:http",
        operation: "request",
        preset: "discord-embed",
      },
      {
        iconName: "Slack",
        label: "Slack Message",
        description: "Send a message to Slack",
        pluginId: "builtin:http",
        operation: "request",
        preset: "slack",
      },
    ],
  },
  {
    type: NodeTypes.MCP,
    category: "MCP Integrations",
    items: [
      {
        iconName: "Cable",
        label: "MCP Tool",
        description: "Call any MCP server tool",
        pluginId: "builtin:mcp",
        operation: "call",
      },
    ],
  },
];

const IconMap: Record<string, React.ElementType> = {
  Mail,
  Send,
  Bell,
  Cable,
  Clock,
  Database,
  FileJson,
  Webhook,
  MousePointer,
  Search,
  GitBranch,
  SplitSquareVertical,
  Timer,
  Repeat,
  AlertTriangle,
  Globe,
  MessageCircle,
  Users,
  UserPlus,
  Shield,
  Hash,
  Crown,
  Ban,
  ChevronDown,
  ChevronRight,
  GitFork,
  Puzzle,
  CheckCircle,
  Discord: SiDiscord,
  Slack: SiSlack,
};

interface WorkflowSidebarProps {
  onAddNode: (type: string, data: any) => void;
  organizationId: string;
  workspaceSlug: string;
  currentWorkflow?: {
    id: string;
    name: string;
    description?: string;
  };
}

// Category icons for integrations
const integrationCategoryIcons: Record<string, React.ElementType> = {
  developer: Code,
  communication: MessageCircle,
  ai: Bot,
  payments: CreditCard,
  productivity: Sheet,
  email: Mail,
  sms: Phone,
  custom: Cable,
};

// Placeholder for community plugins - will be fetched from API
interface CommunityPlugin {
  id: string;
  name: string;
  description?: string;
  isVerified: boolean;
}

function WorkflowSidebar({
  onAddNode,
  organizationId,
  workspaceSlug,
  currentWorkflow,
}: WorkflowSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCommunity, setShowCommunity] = useState(true);
  const [showIntegrations, setShowIntegrations] = useState(true);

  // Fetch connected integrations for the workspace
  const { data: integrationsData } = useQuery({
    ...integrationsOptions({ organizationId }),
    select: (data) => data?.integrations?.nodes ?? [],
  });

  // Fetch integration definitions for icons/metadata
  const { data: definitionsData } = useQuery({
    ...integrationDefinitionsOptions({}),
    select: (data) => data?.integrationDefinitions?.nodes ?? [],
  });

  const connectedIntegrations = integrationsData ?? [];
  const definitions = definitionsData ?? [];

  // TODO: Fetch community plugins from API using usePluginsQuery
  const communityPlugins: CommunityPlugin[] = [];

  const filteredOfficialPlugins = useMemo(() => {
    if (!searchQuery.trim()) return officialPlugins;

    return officialPlugins
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [searchQuery]);

  const filteredCommunityPlugins = useMemo(() => {
    if (!searchQuery.trim()) return communityPlugins;

    return communityPlugins.filter(
      (plugin) =>
        plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plugin.description?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  // Filter connected integrations based on search
  const filteredIntegrations = useMemo(() => {
    if (!searchQuery.trim()) return connectedIntegrations;

    return connectedIntegrations.filter((integration) => {
      const def = definitions.find((d) => d.id === integration.type);
      return (
        integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        def?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        def?.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery, connectedIntegrations, definitions]);

  const handleDragStart = (event: React.DragEvent, nodeData: any) => {
    // Create custom drag preview
    const dragPreview = document.createElement("div");
    dragPreview.textContent = nodeData.data.label;
    dragPreview.style.cssText = `
      position: absolute;
      top: -1000px;
      left: -1000px;
      padding: 8px 12px;
      background: hsl(var(--card));
      border: 1px solid hsl(var(--border));
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      color: hsl(var(--foreground));
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      pointer-events: none;
    `;
    document.body.appendChild(dragPreview);
    event.dataTransfer.setDragImage(dragPreview, 0, 0);

    // Clean up after a frame
    requestAnimationFrame(() => {
      document.body.removeChild(dragPreview);
    });

    const type =
      nodeData.type === NodeTypes.CONDITION && nodeData.data.label === "Switch"
        ? NodeTypes.SWITCH
        : nodeData.data.label === "Delay"
          ? NodeTypes.DELAY
          : nodeData.data.label === "Loop"
            ? NodeTypes.LOOP
            : nodeData.data.label === "Parallel"
              ? NodeTypes.PARALLEL
              : nodeData.data.label === "Gate"
                ? NodeTypes.GATE
                : nodeData.type;

    const config = (() => {
      if (type === NodeTypes.SWITCH) {
        return { cases: [{ value: "", label: "Case 1" }] };
      }
      if (type === NodeTypes.DELAY) {
        return { duration: 5, unit: "minutes" };
      }
      if (type === NodeTypes.LOOP) {
        return { type: "count", count: 5 };
      }
      if (type === NodeTypes.TRIGGER) {
        return { triggerType: nodeData.data.triggerType || "manual" };
      }
      // Simplified configs for communication nodes - no HTTP details exposed
      // These are transformed to HTTP requests at execution time
      if (nodeData.data.preset === "discord") {
        return {
          webhookUrl: "",
          message: "Hello from Vortex!",
          username: "Vortex Bot",
        };
      }
      if (nodeData.data.preset === "discord-embed") {
        return {
          webhookUrl: "",
          embedTitle: "Notification",
          embedDescription: "Your message here",
          embedColor: "blue",
          embedFooter: "Powered by Vortex",
        };
      }
      if (nodeData.data.preset === "slack") {
        return {
          webhookUrl: "",
          message: "Hello from Vortex!",
          messageType: "simple",
        };
      }
      return {};
    })();

    // Build node data with plugin info for action nodes
    const enrichedData = {
      ...nodeData.data,
      config,
    };

    // Add plugin info if present (for action nodes)
    if (nodeData.data.pluginId) {
      enrichedData.pluginId = nodeData.data.pluginId;
      enrichedData.operation = nodeData.data.operation;
    }

    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({
        ...nodeData,
        type,
        data: enrichedData,
      }),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const renderIcon = (iconName: string) => {
    const Icon = IconMap[iconName];
    return Icon ? <Icon className="h-4 w-4" /> : null;
  };

  return (
    <div className="w-64 border-border border-r bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-foreground text-xl">Vortex</h2>
        <ThemeToggle />
      </div>

      {currentWorkflow ? (
        <div className="mb-4 rounded-lg bg-muted/50 p-3">
          <h3 className="font-medium text-foreground text-sm">
            {currentWorkflow.name}
          </h3>

          {currentWorkflow.description && (
            <div className="mt-1 text-muted-foreground text-xs">
              {currentWorkflow.description}
            </div>
          )}
        </div>
      ) : (
        <div className="mb-4 rounded-lg border border-primary/20 bg-primary/5 p-3">
          <h3 className="mb-1 font-medium text-primary text-sm">
            Welcome to Vortex! 👋
          </h3>
          <div className="text-muted-foreground text-xs">
            Drag nodes from below to start building your first workflow, or
            select a sample workflow from the dropdown above.
          </div>
        </div>
      )}

      <div className="relative mb-4">
        <Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search nodes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <ScrollArea className="h-[calc(100vh-220px)]">
        {/* Official Plugins Section */}
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-2">
            <h3 className="font-semibold text-foreground text-sm">Official</h3>
            <Badge variant="secondary" className="text-[10px]">
              Built-in
            </Badge>
          </div>

          {filteredOfficialPlugins.map((category) => (
            <div key={category.category} className="mb-4">
              <h4 className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                {category.category}
              </h4>
              <div className="space-y-1">
                {category.items.map((item) => {
                  const itemWithPlugin = item as typeof item & {
                    pluginId?: string;
                    operation?: string;
                    triggerType?: string;
                    comingSoon?: boolean;
                    preset?: string;
                  };
                  const isComingSoon = itemWithPlugin.comingSoon;
                  return (
                    <div
                      key={item.label}
                      className={`flex items-start rounded-md p-2 ${
                        isComingSoon
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-move hover:bg-accent"
                      }`}
                      draggable={!isComingSoon}
                      onDragStart={(e) => {
                        if (isComingSoon) {
                          e.preventDefault();
                          return;
                        }
                        handleDragStart(e, {
                          type: category.type,
                          data: {
                            label: item.label,
                            description: item.description,
                            iconName: item.iconName,
                            // Pass plugin info for action nodes
                            ...(itemWithPlugin.pluginId && {
                              pluginId: itemWithPlugin.pluginId,
                              operation: itemWithPlugin.operation,
                            }),
                            // Pass trigger type for trigger nodes
                            ...(itemWithPlugin.triggerType && {
                              triggerType: itemWithPlugin.triggerType,
                            }),
                            // Pass preset for pre-configured nodes
                            ...(itemWithPlugin.preset && {
                              preset: itemWithPlugin.preset,
                            }),
                          },
                        });
                      }}
                    >
                      <div className="mt-0.5 mr-2">
                        {renderIcon(item.iconName)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {item.label}
                          </span>
                          {isComingSoon && (
                            <Badge
                              variant="outline"
                              className="text-[10px] text-muted-foreground"
                            >
                              Soon
                            </Badge>
                          )}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Connected Integrations Section */}
        <div className="border-border border-t pt-4">
          <button
            type="button"
            className="mb-2 flex w-full items-center justify-between"
            onClick={() => setShowIntegrations(!showIntegrations)}
          >
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground text-sm">
                Integrations
              </h3>
              <Badge variant="outline" className="text-[10px]">
                {filteredIntegrations.length}
              </Badge>
            </div>
            {showIntegrations ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {showIntegrations && (
            <div className="space-y-1">
              {filteredIntegrations.length > 0 ? (
                filteredIntegrations.map((integration) => {
                  const def = definitions.find(
                    (d) => d.id === integration.type,
                  );
                  const CategoryIcon =
                    integrationCategoryIcons[def?.category ?? "custom"] ??
                    Cable;
                  return (
                    <div
                      key={integration.rowId}
                      className="flex cursor-move items-start rounded-md p-2 hover:bg-accent"
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(e, {
                          type: NodeTypes.MCP,
                          data: {
                            label: integration.name,
                            description:
                              def?.description ?? "Connected integration",
                            iconName: "Cable",
                            integrationId: integration.rowId,
                            mcpServerId: (integration as any).mcpServerId,
                          },
                        })
                      }
                    >
                      <div className="mt-0.5 mr-2">
                        {def?.iconUrl ? (
                          <img
                            src={def.iconUrl}
                            alt={def.name}
                            className="h-4 w-4 rounded"
                          />
                        ) : (
                          <CategoryIcon className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-sm">
                            {integration.name}
                          </span>
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {def?.name ?? integration.type}
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="ml-1 text-[10px] text-muted-foreground"
                      >
                        MCP
                      </Badge>
                    </div>
                  );
                })
              ) : (
                <div className="py-4 text-center text-muted-foreground text-xs">
                  No integrations connected
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="mt-2 w-full text-muted-foreground"
                asChild
              >
                <Link
                  to="/workspaces/$workspaceSlug/integrations"
                  params={{ workspaceSlug }}
                >
                  <Cable className="mr-2 h-4 w-4" />
                  Browse Integrations
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Community Plugins Section */}
        <div className="border-border border-t pt-4">
          <button
            type="button"
            className="mb-2 flex w-full items-center justify-between"
            onClick={() => setShowCommunity(!showCommunity)}
          >
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground text-sm">
                Community
              </h3>
              <Badge variant="outline" className="text-[10px]">
                {filteredCommunityPlugins.length}
              </Badge>
            </div>
            {showCommunity ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {showCommunity && (
            <div className="space-y-1">
              {filteredCommunityPlugins.length > 0 ? (
                filteredCommunityPlugins.map((plugin) => (
                  <div
                    key={plugin.id}
                    className="flex cursor-move items-start rounded-md p-2 hover:bg-accent"
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, {
                        type: NodeTypes.PLUGIN,
                        data: {
                          label: plugin.name,
                          description: plugin.description || "Community plugin",
                          iconName: "Puzzle",
                          pluginId: plugin.id,
                        },
                      })
                    }
                  >
                    <div className="mt-0.5 mr-2">
                      <Puzzle className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-sm">
                          {plugin.name}
                        </span>
                        {plugin.isVerified && (
                          <CheckCircle className="h-3 w-3 text-blue-500" />
                        )}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {plugin.description || "Community plugin"}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="ml-1 text-[10px] text-muted-foreground"
                    >
                      WASM
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="py-4 text-center text-muted-foreground text-xs">
                  No community plugins installed
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="mt-2 w-full text-muted-foreground"
                disabled
              >
                <Puzzle className="mr-2 h-4 w-4" />
                Browse Plugins (Coming Soon)
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default WorkflowSidebar;
