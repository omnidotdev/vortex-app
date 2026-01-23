import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  FileText,
  GitBranch,
  Globe,
  LayoutTemplate,
  Loader2,
  MessageCircle,
  Plus,
  Sparkles,
  Webhook,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  useCreateWorkflowMutation,
  useWorkflowsQuery,
} from "@/generated/graphql";
import getQueryKeyPrefix from "@/lib/util/getQueryKeyPrefix";
import { cn } from "@/lib/utils";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/workflows/new",
)({
  loader: async ({ context: { organizationId } }) => {
    if (!organizationId) throw notFound();

    return { organizationId };
  },
  component: NewWorkflowPage,
});

/**
 * Template definitions matching demoWorkflows.ts in vortex-api
 */
const templates = [
  {
    id: "api-data-fetcher",
    name: "API Data Fetcher",
    description:
      "Fetches a post from JSONPlaceholder API and extracts the title. Great starting point for API integrations.",
    icon: Globe,
    category: "HTTP",
    definition: {
      nodes: [
        {
          id: "trigger_1",
          type: "triggerNode",
          position: { x: 255, y: 45 },
          data: {
            label: "Manual Trigger",
            description: "Click Execute to start",
            iconName: "MousePointer",
            triggerType: "manual",
            config: {},
          },
        },
        {
          id: "http_1",
          type: "actionNode",
          position: { x: 255, y: 180 },
          data: {
            label: "HTTP Request",
            description: "GET from JSONPlaceholder",
            iconName: "Globe",
            pluginId: "builtin:http",
            operation: "request",
            config: {
              url: "https://jsonplaceholder.typicode.com/posts/1",
              method: "GET",
            },
          },
        },
        {
          id: "transform_1",
          type: "actionNode",
          position: { x: 255, y: 315 },
          data: {
            label: "JSONPath Extract",
            description: "Get title from response",
            iconName: "FileJson",
            pluginId: "builtin:transform",
            operation: "jsonPath",
            config: {
              data: "{{steps.http_1.body}}",
              path: "$.title",
              first: true,
            },
          },
        },
      ],
      edges: [
        { id: "e1", source: "trigger_1", target: "http_1", type: "smart" },
        { id: "e2", source: "http_1", target: "transform_1", type: "smart" },
      ],
      version: "1.0",
    },
  },
  {
    id: "webhook-echo",
    name: "Webhook Echo",
    description:
      "Receives webhook data, adds a timestamp, and echoes it to httpbin.org. Perfect for testing webhook integrations.",
    icon: Webhook,
    category: "Webhooks",
    definition: {
      nodes: [
        {
          id: "trigger_1",
          type: "triggerNode",
          position: { x: 255, y: 45 },
          data: {
            label: "Webhook Trigger",
            description: "Receives incoming webhook requests",
            iconName: "Webhook",
            triggerType: "webhook",
            config: { method: "POST" },
          },
        },
        {
          id: "transform_1",
          type: "actionNode",
          position: { x: 255, y: 180 },
          data: {
            label: "Template",
            description: "Format response with timestamp",
            iconName: "FileJson",
            pluginId: "builtin:transform",
            operation: "template",
            config: {
              template: JSON.stringify({
                received_at: "{{now}}",
                original_payload: "{{trigger.body}}",
                message: "Echo from Vortex!",
              }),
            },
          },
        },
        {
          id: "http_1",
          type: "actionNode",
          position: { x: 255, y: 315 },
          data: {
            label: "HTTP Request",
            description: "POST to httpbin.org",
            iconName: "Globe",
            pluginId: "builtin:http",
            operation: "request",
            config: {
              url: "https://httpbin.org/post",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Vortex-Demo": "webhook-echo",
              },
              body: "{{steps.transform_1.result}}",
            },
          },
        },
      ],
      edges: [
        { id: "e1", source: "trigger_1", target: "transform_1", type: "smart" },
        { id: "e2", source: "transform_1", target: "http_1", type: "smart" },
      ],
      version: "1.0",
    },
  },
  {
    id: "conditional-router",
    name: "Conditional Router",
    description:
      "Routes webhooks based on priority field. Demonstrates conditional branching with different paths for high/low priority.",
    icon: GitBranch,
    category: "Logic",
    definition: {
      nodes: [
        {
          id: "trigger_1",
          type: "triggerNode",
          position: { x: 255, y: 45 },
          data: {
            label: "Webhook Trigger",
            description: "Receives alert payloads",
            iconName: "Webhook",
            triggerType: "webhook",
            config: {},
          },
        },
        {
          id: "condition_1",
          type: "conditionNode",
          position: { x: 255, y: 180 },
          data: {
            label: "If Condition",
            description: "Route based on priority",
            iconName: "GitBranch",
            expression: "trigger.body.priority === 'high'",
            config: { expression: "trigger.body.priority === 'high'" },
          },
        },
        {
          id: "action_high",
          type: "actionNode",
          position: { x: 105, y: 315 },
          data: {
            label: "Template",
            description: "Create urgent message",
            iconName: "FileJson",
            pluginId: "builtin:transform",
            operation: "template",
            config: {
              template: JSON.stringify({
                urgency: "HIGH",
                message: "High priority alert received!",
                payload: "{{trigger.body}}",
              }),
            },
          },
        },
        {
          id: "action_low",
          type: "actionNode",
          position: { x: 405, y: 315 },
          data: {
            label: "Template",
            description: "Create standard message",
            iconName: "FileJson",
            pluginId: "builtin:transform",
            operation: "template",
            config: {
              template: JSON.stringify({
                urgency: "NORMAL",
                message: "Standard priority alert",
                payload: "{{trigger.body}}",
              }),
            },
          },
        },
        {
          id: "http_1",
          type: "actionNode",
          position: { x: 255, y: 450 },
          data: {
            label: "HTTP Request",
            description: "POST formatted result",
            iconName: "Globe",
            pluginId: "builtin:http",
            operation: "request",
            config: {
              url: "https://httpbin.org/post",
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: "{{steps.action_high.result || steps.action_low.result}}",
            },
          },
        },
      ],
      edges: [
        { id: "e1", source: "trigger_1", target: "condition_1", type: "smart" },
        {
          id: "e2",
          source: "condition_1",
          target: "action_high",
          sourceHandle: "true",
          label: "High",
          type: "smart",
        },
        {
          id: "e3",
          source: "condition_1",
          target: "action_low",
          sourceHandle: "false",
          label: "Normal",
          type: "smart",
        },
        { id: "e4", source: "action_high", target: "http_1", type: "smart" },
        { id: "e5", source: "action_low", target: "http_1", type: "smart" },
      ],
      version: "1.0",
    },
  },
  {
    id: "multi-step-pipeline",
    name: "Multi-Step Pipeline",
    description:
      "Fetches users and posts from JSONPlaceholder, then combines the results. Demonstrates chaining multiple API calls.",
    icon: Clock,
    category: "HTTP",
    definition: {
      nodes: [
        {
          id: "trigger_1",
          type: "triggerNode",
          position: { x: 255, y: 45 },
          data: {
            label: "Manual Trigger",
            description: "Start the pipeline",
            iconName: "MousePointer",
            triggerType: "manual",
            config: {},
          },
        },
        {
          id: "http_users",
          type: "actionNode",
          position: { x: 255, y: 180 },
          data: {
            label: "HTTP Request",
            description: "GET users from API",
            iconName: "Globe",
            pluginId: "builtin:http",
            operation: "request",
            config: {
              url: "https://jsonplaceholder.typicode.com/users?_limit=3",
              method: "GET",
            },
          },
        },
        {
          id: "transform_names",
          type: "actionNode",
          position: { x: 255, y: 315 },
          data: {
            label: "JSONPath Extract",
            description: "Get user names",
            iconName: "FileJson",
            pluginId: "builtin:transform",
            operation: "jsonPath",
            config: {
              data: "{{steps.http_users.body}}",
              path: "$[*].name",
            },
          },
        },
        {
          id: "http_posts",
          type: "actionNode",
          position: { x: 255, y: 450 },
          data: {
            label: "HTTP Request",
            description: "GET posts from API",
            iconName: "Globe",
            pluginId: "builtin:http",
            operation: "request",
            config: {
              url: "https://jsonplaceholder.typicode.com/posts?_limit=3",
              method: "GET",
            },
          },
        },
        {
          id: "transform_combine",
          type: "actionNode",
          position: { x: 255, y: 585 },
          data: {
            label: "Template",
            description: "Merge users and posts",
            iconName: "FileJson",
            pluginId: "builtin:transform",
            operation: "template",
            config: {
              template: JSON.stringify({
                userNames: "{{steps.transform_names.result}}",
                postCount: "{{steps.http_posts.body.length}}",
                summary: "Fetched users and posts successfully",
              }),
            },
          },
        },
      ],
      edges: [
        { id: "e1", source: "trigger_1", target: "http_users", type: "smart" },
        {
          id: "e2",
          source: "http_users",
          target: "transform_names",
          type: "smart",
        },
        {
          id: "e3",
          source: "transform_names",
          target: "http_posts",
          type: "smart",
        },
        {
          id: "e4",
          source: "http_posts",
          target: "transform_combine",
          type: "smart",
        },
      ],
      version: "1.0",
    },
  },
  {
    id: "discord-send-message",
    name: "Send Discord Message",
    description:
      "Send a message to a Discord channel via webhook. Great for notifications and alerts.",
    icon: MessageCircle,
    category: "Communication",
    definition: {
      nodes: [
        {
          id: "trigger_1",
          type: "triggerNode",
          position: { x: 255, y: 45 },
          data: {
            label: "Manual Trigger",
            description: "Start the workflow manually or via API",
            iconName: "MousePointer",
            triggerType: "manual",
            config: {},
          },
        },
        {
          id: "action_send_discord",
          type: "actionNode",
          position: { x: 255, y: 195 },
          data: {
            label: "Discord Message",
            description: "Send a message to Discord",
            iconName: "Discord",
            pluginId: "builtin:http",
            operation: "post",
            config: {
              url: "",
              body: {
                content: "Hello from Vortex!",
                username: "Vortex Bot",
              },
              headers: {
                "Content-Type": "application/json",
              },
            },
          },
        },
      ],
      edges: [
        {
          id: "e1",
          source: "trigger_1",
          target: "action_send_discord",
          type: "smart",
        },
      ],
      version: "1.0",
    },
  },
  {
    id: "discord-rich-embed",
    name: "Discord Rich Embed",
    description:
      "Send beautifully formatted embed messages to Discord with title, description, and colors.",
    icon: MessageCircle,
    category: "Communication",
    definition: {
      nodes: [
        {
          id: "trigger_1",
          type: "triggerNode",
          position: { x: 255, y: 45 },
          data: {
            label: "Manual Trigger",
            description: "Start the workflow manually",
            iconName: "MousePointer",
            triggerType: "manual",
            config: {},
          },
        },
        {
          id: "action_send_embed",
          type: "actionNode",
          position: { x: 255, y: 195 },
          data: {
            label: "Discord Embed",
            description: "Send a rich embed to Discord",
            iconName: "Discord",
            pluginId: "builtin:http",
            operation: "post",
            config: {
              url: "",
              body: {
                embeds: [
                  {
                    title: "Notification from Vortex",
                    description:
                      "This is a rich embed message with formatting support.",
                    color: 5814783,
                    footer: { text: "Powered by Vortex" },
                  },
                ],
              },
              headers: {
                "Content-Type": "application/json",
              },
            },
          },
        },
      ],
      edges: [
        {
          id: "e1",
          source: "trigger_1",
          target: "action_send_embed",
          type: "smart",
        },
      ],
      version: "1.0",
    },
  },
  {
    id: "discord-webhook-forwarder",
    name: "Discord Webhook Forwarder",
    description:
      "Receive webhooks and forward them to Discord. Perfect for integrating external services with your Discord server.",
    icon: MessageCircle,
    category: "Communication",
    definition: {
      nodes: [
        {
          id: "trigger_1",
          type: "triggerNode",
          position: { x: 255, y: 45 },
          data: {
            label: "Webhook Trigger",
            description: "Receives incoming webhook requests",
            iconName: "Webhook",
            triggerType: "webhook",
            config: { method: "POST" },
          },
        },
        {
          id: "action_discord",
          type: "actionNode",
          position: { x: 255, y: 195 },
          data: {
            label: "Discord Embed",
            description: "Forward webhook payload to Discord",
            iconName: "Discord",
            pluginId: "builtin:http",
            operation: "post",
            config: {
              url: "",
              body: {
                embeds: [
                  {
                    title: "Webhook Event",
                    description: "{{trigger.body}}",
                    color: 5814783,
                    footer: { text: "Forwarded by Vortex" },
                  },
                ],
              },
              headers: {
                "Content-Type": "application/json",
              },
            },
          },
        },
      ],
      edges: [
        {
          id: "e1",
          source: "trigger_1",
          target: "action_discord",
          type: "smart",
        },
      ],
      version: "1.0",
    },
  },
];

type Tab = "scratch" | "template";

const categories = [
  "All",
  "HTTP",
  "Webhooks",
  "Logic",
  "Communication",
] as const;
type Category = (typeof categories)[number];

/**
 * Create new workflow page.
 */
function NewWorkflowPage() {
  const { workspaceSlug } = Route.useParams();
  const { organizationId } = Route.useLoaderData();
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>("template");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [creatingTemplateId, setCreatingTemplateId] = useState<string | null>(
    null,
  );

  const filteredTemplates =
    selectedCategory === "All"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  const { mutate: createWorkflow, isPending } = useCreateWorkflowMutation({
    meta: {
      invalidates: [getQueryKeyPrefix(useWorkflowsQuery)],
    },
    onSuccess: (data) => {
      const workflowId = data.createWorkflow?.workflow?.rowId;
      if (workflowId) {
        navigate({
          to: "/workspaces/$workspaceSlug/workflows/$workflowId",
          params: { workspaceSlug, workflowId },
        });
      } else {
        navigate({
          to: "/workspaces/$workspaceSlug/workflows",
          params: { workspaceSlug },
        });
      }
    },
    onError: (err) => {
      setError(
        err instanceof Error ? err.message : "Failed to create workflow",
      );
      setCreatingTemplateId(null);
    },
  });

  const handleSubmitScratch = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    createWorkflow({
      input: {
        workflow: {
          organizationId,
          name: name.trim(),
          description: description.trim() || null,
          definition: { nodes: [], edges: [], version: "1.0" },
          isActive: true,
        },
      },
    });
  };

  const handleUseTemplate = (template: (typeof templates)[0]) => {
    setError(null);
    setCreatingTemplateId(template.id);

    createWorkflow({
      input: {
        workflow: {
          organizationId,
          name: template.name,
          description: template.description,
          definition: template.definition,
          isActive: true,
        },
      },
    });
  };

  return (
    <div className="relative min-h-screen">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-20 left-0 h-[400px] w-[400px] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <div className="relative p-8">
        {/* Header */}
        <div className="mb-10 animate-fade-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-primary text-sm">
            <Sparkles className="h-3.5 w-3.5" />
            New Workflow
          </div>
          <h1 className="font-bold font-display text-3xl tracking-tight">
            Create a Workflow
          </h1>
          <p className="mt-2 max-w-lg text-muted-foreground">
            Start with a pre-built template to hit the ground running, or create
            a blank canvas for your custom automation.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 animate-fade-up rounded-xl border border-red-500/20 bg-red-500/5 p-4 backdrop-blur-sm">
            <p className="text-red-600 text-sm dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Tab Switcher */}
        <div
          className="mb-8 animate-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          <div className="inline-flex rounded-xl border border-border/50 bg-card/50 p-1.5 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setTab("template")}
              className={cn(
                "group relative flex cursor-pointer items-center gap-2.5 rounded-lg px-5 py-2.5 font-medium text-sm transition-all duration-300",
                tab === "template"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
            >
              <LayoutTemplate
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  tab === "template" && "scale-110",
                )}
              />
              From Template
            </button>
            <button
              type="button"
              onClick={() => setTab("scratch")}
              className={cn(
                "group relative flex cursor-pointer items-center gap-2.5 rounded-lg px-5 py-2.5 font-medium text-sm transition-all duration-300",
                tab === "scratch"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
            >
              <Plus
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  tab === "scratch" && "scale-110",
                )}
              />
              From Scratch
            </button>
          </div>
        </div>

        {/* Tab Content Container */}
        <div className="relative">
          {/* Template Tab */}
          <div
            className={cn(
              "transition-all duration-300 ease-out",
              tab === "template"
                ? "translate-y-0 opacity-100"
                : "pointer-events-none absolute inset-0 -translate-y-4 opacity-0",
            )}
          >
            {/* Category Filter */}
            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map((category) => {
                const count =
                  category === "All"
                    ? templates.length
                    : templates.filter((t) => t.category === category).length;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-all duration-200",
                      selectedCategory === category
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-border/50 bg-card/50 text-muted-foreground hover:border-primary/20 hover:bg-primary/5 hover:text-foreground",
                    )}
                  >
                    {category}
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-xs",
                        selectedCategory === category
                          ? "bg-primary/20"
                          : "bg-muted",
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Template Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTemplates.map((template, index) => {
                const Icon = template.icon;
                const isCreating = creatingTemplateId === template.id;

                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => handleUseTemplate(template)}
                    disabled={isPending}
                    className={cn(
                      "group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border/50 bg-card/50 p-5 text-left backdrop-blur-sm transition-all duration-300",
                      "hover:-translate-y-1 hover:border-primary/30 hover:bg-card/80 hover:shadow-primary/5 hover:shadow-xl",
                      "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0",
                      isCreating && "border-primary/50 bg-primary/5",
                    )}
                    style={{ animationDelay: `${200 + index * 50}ms` }}
                  >
                    {/* Glow effect on hover */}
                    <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Header */}
                    <div className="relative mb-4 flex items-start justify-between">
                      <div
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300",
                          isCreating
                            ? "bg-primary/20"
                            : "bg-primary/10 group-hover:bg-primary/15 group-hover:shadow-lg group-hover:shadow-primary/10",
                        )}
                      >
                        {isCreating ? (
                          <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        ) : (
                          <Icon className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                        )}
                      </div>
                      <span className="rounded-full border border-border/50 bg-muted/50 px-2.5 py-1 text-muted-foreground text-xs transition-colors group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary">
                        {template.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative flex-1">
                      <h3 className="font-semibold tracking-tight transition-colors group-hover:text-primary">
                        {template.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-muted-foreground text-sm leading-relaxed">
                        {template.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="relative mt-4 flex items-center justify-between border-border/30 border-t pt-4">
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                        <Zap className="h-3.5 w-3.5" />
                        <span>
                          {template.definition.nodes.length} step
                          {template.definition.nodes.length !== 1 && "s"}
                        </span>
                      </div>
                      <div
                        className={cn(
                          "flex items-center gap-1 text-sm transition-all duration-300",
                          isCreating
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-primary",
                        )}
                      >
                        {isCreating ? (
                          <>Creating...</>
                        ) : (
                          <>
                            <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              Use template
                            </span>
                            <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scratch Tab */}
          <div
            className={cn(
              "mx-auto max-w-xl transition-all duration-300 ease-out",
              tab === "scratch"
                ? "translate-y-0 opacity-100"
                : "pointer-events-none absolute inset-0 translate-y-4 opacity-0",
            )}
          >
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
              {/* Card Header */}
              <div className="border-border/30 border-b bg-gradient-to-r from-primary/5 to-transparent px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold tracking-tight">
                      Blank Workflow
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Start with an empty canvas
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmitScratch} className="p-6">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="flex items-center gap-2 font-medium text-sm"
                    >
                      Workflow Name
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Daily Report Generator"
                      required
                      className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-muted-foreground/50 focus:border-primary/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="flex items-center gap-2 font-medium text-sm"
                    >
                      Description
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="What does this workflow do?"
                      rows={3}
                      className="w-full resize-none rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-muted-foreground/50 focus:border-primary/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-xl"
                    onClick={() =>
                      navigate({
                        to: "/workspaces/$workspaceSlug/workflows",
                        params: { workspaceSlug },
                      })
                    }
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending || !name.trim()}
                    className="flex-1 gap-2 rounded-xl shadow-lg shadow-primary/25"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Create Workflow
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Help text */}
            <p className="mt-4 text-center text-muted-foreground text-sm">
              You can add triggers, actions, and conditions after creating your
              workflow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
