"use client";

import {
  Plus,
  Mail,
  Send,
  Bell,
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
  Settings as SettingsIcon,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/theme-toggle";
import { NodeTypes } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useIntegrations } from "@/contexts/IntegrationsContext";
import { IntegrationsSettings } from "@/components/IntegrationsSettings";

const coreNodeTemplates = [
  {
    type: NodeTypes.TRIGGER,
    category: "Triggers",
    items: [
      {
        iconName: "Mail",
        label: "Email Received",
        description: "Triggered when an email is received",
      },
      {
        iconName: "Webhook",
        label: "Webhook",
        description: "Triggered by HTTP webhook",
      },
      {
        iconName: "Clock",
        label: "Schedule",
        description: "Triggered on a schedule",
      },
      {
        iconName: "MousePointer",
        label: "Click",
        description: "Triggered by a manual click",
      },
    ],
  },
  {
    type: NodeTypes.ACTION,
    category: "Actions",
    items: [
      {
        iconName: "AlertTriangle",
        label: "Browser Alert",
        description: "Show a browser alert for debugging",
      },
      { iconName: "Send", label: "Send Email", description: "Send an email" },
      {
        iconName: "Globe",
        label: "HTTP Call",
        description: "Make an HTTP request to an API",
      },
      {
        iconName: "Database",
        label: "Update Database",
        description: "Update database records",
      },
      {
        iconName: "FileJson",
        label: "Transform Data",
        description: "Transform data format",
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
      },
      {
        iconName: "SplitSquareVertical",
        label: "Switch",
        description: "Multiple conditional branches",
      },
      { iconName: "Timer", label: "Delay", description: "Add a time delay" },
      { iconName: "Repeat", label: "Loop", description: "Repeat actions" },
    ],
  },
];

const discordNodeTemplates = {
  triggers: {
    category: "Discord Triggers",
    items: [
      {
        iconName: "MessageCircle",
        label: "New Message",
        description: "Triggered when a message is sent in a channel",
        integrationId: "discord",
      },
      {
        iconName: "UserPlus",
        label: "New Member",
        description: "Triggered when a new member joins",
        integrationId: "discord",
      },
    ],
  },
  actions: {
    category: "Discord Actions",
    items: [
      {
        iconName: "Send",
        label: "Send Message",
        description: "Send a message to a Discord channel",
        integrationId: "discord",
      },
      {
        iconName: "Webhook",
        label: "Send Webhook Message",
        description: "Send a message via Discord webhook",
        integrationId: "discord",
      },
      {
        iconName: "Shield",
        label: "Add Role",
        description: "Add a role to a member",
        integrationId: "discord",
      },
      {
        iconName: "Shield",
        label: "Remove Role",
        description: "Remove a role from a member",
        integrationId: "discord",
      },
      {
        iconName: "Hash",
        label: "Create Channel",
        description: "Create a new Discord channel",
        integrationId: "discord",
      },
      {
        iconName: "Crown",
        label: "Create Role",
        description: "Create a new Discord role",
        integrationId: "discord",
      },
      {
        iconName: "Ban",
        label: "Ban Member",
        description: "Ban a member from the server",
        integrationId: "discord",
      },
      {
        iconName: "Users",
        label: "List Members",
        description: "List guild members",
        integrationId: "discord",
      },
    ],
  },
};

const IconMap: Record<string, React.ElementType> = {
  Mail,
  Send,
  Bell,
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
  SettingsIcon,
  ChevronDown,
  ChevronRight,
};

interface WorkflowSidebarProps {
  onAddNode: (type: string, data: any) => void;
  currentWorkflow?: {
    id: string;
    name: string;
    description?: string;
  };
}

export function WorkflowSidebar({
  onAddNode,
  currentWorkflow,
}: WorkflowSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDiscordOpen, setIsDiscordOpen] = useState(true);
  const { isIntegrationEnabled } = useIntegrations();

  const allNodeTemplates = useMemo(() => {
    const templates = [...coreNodeTemplates];

    // Add Discord nodes (temporarily forced for testing)
    if (isIntegrationEnabled("discord") || true) {
      templates.push({
        type: NodeTypes.TRIGGER,
        category: discordNodeTemplates.triggers.category,
        items: discordNodeTemplates.triggers.items,
      });
      templates.push({
        type: NodeTypes.ACTION,
        category: discordNodeTemplates.actions.category,
        items: discordNodeTemplates.actions.items,
      });
    }

    return templates;
  }, [isIntegrationEnabled]);

  const filteredNodeTemplates = useMemo(() => {
    if (!searchQuery.trim()) return allNodeTemplates;

    return allNodeTemplates
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [searchQuery, allNodeTemplates]);

  const handleDragStart = (event: React.DragEvent, nodeData: any) => {
    const type =
      nodeData.type === NodeTypes.CONDITION && nodeData.data.label === "Switch"
        ? NodeTypes.SWITCH
        : nodeData.data.label === "Delay"
          ? NodeTypes.DELAY
          : nodeData.data.label === "Loop"
            ? NodeTypes.LOOP
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
      // Discord node configurations
      if (nodeData.data.integrationId === "discord") {
        switch (nodeData.data.label) {
          case "New Message":
            return { channelId: "", limit: 50 };
          case "New Member":
            return { guildId: "", limit: 50 };
          case "Send Message":
            return { channelId: "", message: "" };
          case "Send Webhook Message":
            return { webhookUrl: "", content: "" };
          case "Add Role":
          case "Remove Role":
            return { guildId: "", userId: "", roleId: "" };
          case "Create Channel":
            return { guildId: "", name: "" };
          case "Create Role":
            return { guildId: "", roleName: "" };
          case "Ban Member":
            return { guildId: "", userId: "", reason: "" };
          case "List Members":
            return { guildId: "", search: "" };
          default:
            return {};
        }
      }
      return {};
    })();

    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({
        ...nodeData,
        type,
        data: {
          ...nodeData.data,
          config,
        },
      }),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const renderIcon = (iconName: string) => {
    const Icon = IconMap[iconName];
    return Icon ? <Icon className="h-4 w-4" /> : null;
  };

  return (
    <div className="w-64 bg-card p-4 border-r border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Vortex</h2>
        <div className="flex gap-2">
          <IntegrationsSettings
            trigger={
              <Button variant="ghost" size="sm">
                <SettingsIcon className="w-4 h-4" />
              </Button>
            }
          />
          <ThemeToggle />
        </div>
      </div>

      {currentWorkflow ? (
        <div className="bg-muted/50 p-3 rounded-lg mb-4">
          <h3 className="font-medium text-foreground text-sm mb-1">
            Current Workflow
          </h3>
          <div className="text-sm font-medium text-foreground">
            {currentWorkflow.name}
          </div>
          {currentWorkflow.description && (
            <div className="text-xs text-muted-foreground mt-1">
              {currentWorkflow.description}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-primary/5 border border-primary/20 p-3 rounded-lg mb-4">
          <h3 className="font-medium text-primary text-sm mb-1">
            Welcome to Vortex! 👋
          </h3>
          <div className="text-xs text-muted-foreground">
            Drag nodes from below to start building your first workflow, or
            select a sample workflow from the dropdown above.
          </div>
        </div>
      )}

      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search nodes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <ScrollArea className="h-[calc(100vh-180px)]">
        {filteredNodeTemplates.map((category) => {
          // Check if this is a Discord category
          const isDiscordCategory = category.category.includes("Discord");

          if (isDiscordCategory) {
            return (
              <div key={category.category} className="mb-6">
                <Collapsible
                  open={isDiscordOpen}
                  onOpenChange={setIsDiscordOpen}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-1 hover:bg-accent rounded">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {category.category}
                    </h3>
                    {isDiscordOpen ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 mt-2">
                    {category.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start p-2 rounded-md hover:bg-accent cursor-move ml-2"
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, {
                            type: category.type,
                            data: {
                              label: item.label,
                              description: item.description,
                              iconName: item.iconName,
                              integrationId: (item as any).integrationId,
                            },
                          })
                        }
                      >
                        <div className="mr-2 mt-0.5">
                          {renderIcon(item.iconName)}
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {item.label}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            );
          }

          // Regular categories
          return (
            <div key={category.category} className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start p-2 rounded-md hover:bg-accent cursor-move"
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, {
                        type: category.type,
                        data: {
                          label: item.label,
                          description: item.description,
                          iconName: item.iconName,
                        },
                      })
                    }
                  >
                    <div className="mr-2 mt-0.5">
                      {renderIcon(item.iconName)}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{item.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
}
