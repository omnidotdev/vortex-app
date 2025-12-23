"use client";

import {
  AlertTriangle,
  Ban,
  Bell,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
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
  Puzzle,
  Repeat,
  Search,
  Send,
  Settings as SettingsIcon,
  Shield,
  SplitSquareVertical,
  Timer,
  UserPlus,
  Users,
  Webhook,
} from "lucide-react";
import { useMemo, useState } from "react";

import { IntegrationsSettings } from "@/components/IntegrationsSettings";
import ThemeToggle from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NodeTypes } from "@/lib/schema";

// Official plugins - built-in node types that ship with Vortex
const officialPlugins = [
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
      {
        iconName: "GitFork",
        label: "Parallel",
        description: "Run branches in parallel",
      },
      {
        iconName: "Shield",
        label: "Gate",
        description: "Require approval to continue",
      },
    ],
  },
];

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
  GitFork,
  Puzzle,
  CheckCircle,
};

interface WorkflowSidebarProps {
  onAddNode: (type: string, data: any) => void;
  currentWorkflow?: {
    id: string;
    name: string;
    description?: string;
  };
}

// Placeholder for community plugins - will be fetched from API
interface CommunityPlugin {
  id: string;
  name: string;
  description?: string;
  isVerified: boolean;
}

function WorkflowSidebar({ onAddNode, currentWorkflow }: WorkflowSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCommunity, setShowCommunity] = useState(true);

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
    <div className="w-64 border-border border-r bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-foreground text-xl">Vortex</h2>
        <div className="flex gap-2">
          <IntegrationsSettings
            trigger={
              <Button variant="ghost" size="sm">
                <SettingsIcon className="h-4 w-4" />
              </Button>
            }
          />
          <ThemeToggle />
        </div>
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

      <ScrollArea className="h-[calc(100vh-180px)]">
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
                {category.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex cursor-move items-start rounded-md p-2 hover:bg-accent"
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
                    <div className="mt-0.5 mr-2">
                      {renderIcon(item.iconName)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-muted-foreground text-xs">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
