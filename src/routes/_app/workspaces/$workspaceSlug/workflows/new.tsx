import {
  createFileRoute,
  notFound,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import {
  Clock,
  FileText,
  GitBranch,
  Globe,
  LayoutTemplate,
  MessageCircle,
  Webhook,
} from "lucide-react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  useCreateWorkflowMutation,
  useWorkflowsQuery,
} from "@/generated/graphql";
import extractErrorMessage from "@/lib/graphql/extractErrorMessage";
import getQueryKeyPrefix from "@/lib/util/getQueryKeyPrefix";
import { cn } from "@/lib/utils";

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/workflows/new",
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

/**
 * Create new workflow page.
 */
function NewWorkflowPage() {
  const { workspaceSlug } = Route.useParams();
  const { organizationId } = Route.useLoaderData();
  const router = useRouter();
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>("template");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [creatingTemplateId, setCreatingTemplateId] = useState<string | null>(
    null,
  );
  const [confirmTemplate, setConfirmTemplate] = useState<
    (typeof templates)[0] | null
  >(null);

  const { mutate: createWorkflow, isPending } = useCreateWorkflowMutation({
    meta: {
      invalidates: [getQueryKeyPrefix(useWorkflowsQuery)],
    },
    onSuccess: (data) => {
      const workflowId = data.createWorkflow?.workflow?.rowId;
      if (workflowId) {
        // Use router.navigate (stable ref) to avoid stale closure from useNavigate
        router.navigate({
          to: "/workspaces/$workspaceSlug/workflows/$workflowId",
          params: { workspaceSlug, workflowId },
          replace: true,
        });
      } else {
        setError(
          "Failed to create workflow. You may have reached your plan limit.",
        );
        setCreatingTemplateId(null);
      }
    },
    onError: (err) => {
      setError(extractErrorMessage(err, "Failed to create workflow"));
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
    setConfirmTemplate(template);
  };

  const handleConfirmTemplate = () => {
    if (!confirmTemplate) return;

    setError(null);
    setCreatingTemplateId(confirmTemplate.id);
    setConfirmTemplate(null);

    createWorkflow({
      input: {
        workflow: {
          organizationId,
          name: confirmTemplate.name,
          description: confirmTemplate.description,
          definition: confirmTemplate.definition,
          isActive: true,
        },
      },
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-bold text-2xl">Create Workflow</h1>
        <p className="mt-2 text-muted-foreground">
          Start from a template or build from scratch.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-red-700 text-sm dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-lg border bg-muted/50 p-1">
        <button
          type="button"
          onClick={() => setTab("template")}
          className={cn(
            "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 font-medium text-sm transition-colors",
            tab === "template"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <LayoutTemplate className="h-4 w-4" />
          From Template
        </button>
        <button
          type="button"
          onClick={() => setTab("scratch")}
          className={cn(
            "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 font-medium text-sm transition-colors",
            tab === "scratch"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <FileText className="h-4 w-4" />
          From Scratch
        </button>
      </div>

      {/* Template Tab */}
      {tab === "template" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => {
            const Icon = template.icon;
            const isCreating = creatingTemplateId === template.id;

            return (
              <button
                key={template.id}
                type="button"
                onClick={() => handleUseTemplate(template)}
                disabled={isPending}
                className={cn(
                  "flex cursor-pointer flex-col rounded-lg border bg-card p-5 text-left transition-all hover:border-primary/50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50",
                  isCreating && "border-primary",
                )}
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs">
                    {template.category}
                  </span>
                </div>

                <h3 className="font-semibold">{template.name}</h3>
                <p className="mt-1.5 flex-1 text-muted-foreground text-sm leading-relaxed">
                  {template.description}
                </p>

                {isCreating && (
                  <div className="mt-3 text-primary text-sm">Creating...</div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Scratch Tab */}
      {tab === "scratch" && (
        <form
          onSubmit={handleSubmitScratch}
          className="mx-auto max-w-xl space-y-6"
        >
          <div className="space-y-2">
            <label htmlFor="name" className="font-medium text-sm">
              Workflow Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome Workflow"
              required
              className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="font-medium text-sm">
              Description
              <span className="ml-1 font-normal text-muted-foreground">
                (optional)
              </span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this workflow does..."
              rows={3}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                navigate({
                  to: "/workspaces/$workspaceSlug/workflows",
                  params: { workspaceSlug },
                })
              }
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !name.trim()}>
              {isPending ? "Creating..." : "Create Workflow"}
            </Button>
          </div>
        </form>
      )}

      {/* Template confirmation dialog */}
      <AlertDialog
        open={!!confirmTemplate}
        onOpenChange={(open) => {
          if (!open) setConfirmTemplate(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Create from "{confirmTemplate?.name}"?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will create a new workflow using the{" "}
              <strong>{confirmTemplate?.name}</strong> template. You can
              customize it in the editor afterward.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmTemplate}>
              Create Workflow
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
