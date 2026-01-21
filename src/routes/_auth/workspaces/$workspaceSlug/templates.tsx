import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { Clock, GitBranch, Globe, Webhook } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  useCreateWorkflowMutation,
  useWorkflowsQuery,
} from "@/generated/graphql";
import getQueryKeyPrefix from "@/lib/util/getQueryKeyPrefix";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/templates",
)({
  loader: async ({ context: { organizationId } }) => {
    if (!organizationId) throw notFound();
    return { organizationId };
  },
  component: TemplatesPage,
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
          position: { x: 250, y: 50 },
          data: {
            label: "Manual Trigger",
            description: "Click Execute to start",
            triggerType: "manual",
            config: {},
          },
        },
        {
          id: "http_1",
          type: "actionNode",
          position: { x: 250, y: 180 },
          data: {
            label: "Fetch Post",
            description: "GET from JSONPlaceholder",
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
          position: { x: 250, y: 310 },
          data: {
            label: "Extract Title",
            description: "Get title from response",
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
        { id: "e1", source: "trigger_1", target: "http_1" },
        { id: "e2", source: "http_1", target: "transform_1" },
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
          position: { x: 250, y: 50 },
          data: {
            label: "Webhook Trigger",
            description: "Receives incoming webhook requests",
            triggerType: "webhook",
            config: { method: "POST" },
          },
        },
        {
          id: "transform_1",
          type: "actionNode",
          position: { x: 250, y: 180 },
          data: {
            label: "Add Timestamp",
            description: "Format response with timestamp",
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
          position: { x: 250, y: 310 },
          data: {
            label: "Echo to HTTPBin",
            description: "POST to httpbin.org",
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
        { id: "e1", source: "trigger_1", target: "transform_1" },
        { id: "e2", source: "transform_1", target: "http_1" },
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
          position: { x: 250, y: 50 },
          data: {
            label: "Webhook Trigger",
            description: "Receives alert payloads",
            triggerType: "webhook",
            config: {},
          },
        },
        {
          id: "condition_1",
          type: "conditionNode",
          position: { x: 250, y: 180 },
          data: {
            label: "Check Priority",
            description: "Route based on priority",
            expression: "trigger.body.priority === 'high'",
            config: { expression: "trigger.body.priority === 'high'" },
          },
        },
        {
          id: "action_high",
          type: "actionNode",
          position: { x: 100, y: 310 },
          data: {
            label: "Format High Priority",
            description: "Create urgent message",
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
          position: { x: 400, y: 310 },
          data: {
            label: "Format Low Priority",
            description: "Create standard message",
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
          position: { x: 250, y: 440 },
          data: {
            label: "Send to HTTPBin",
            description: "POST formatted result",
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
        { id: "e1", source: "trigger_1", target: "condition_1" },
        {
          id: "e2",
          source: "condition_1",
          target: "action_high",
          sourceHandle: "true",
          label: "High",
        },
        {
          id: "e3",
          source: "condition_1",
          target: "action_low",
          sourceHandle: "false",
          label: "Normal",
        },
        { id: "e4", source: "action_high", target: "http_1" },
        { id: "e5", source: "action_low", target: "http_1" },
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
          position: { x: 250, y: 50 },
          data: {
            label: "Manual Trigger",
            description: "Start the pipeline",
            triggerType: "manual",
            config: {},
          },
        },
        {
          id: "http_users",
          type: "actionNode",
          position: { x: 250, y: 180 },
          data: {
            label: "Fetch Users",
            description: "GET users from API",
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
          position: { x: 250, y: 310 },
          data: {
            label: "Extract Names",
            description: "Get user names",
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
          position: { x: 250, y: 440 },
          data: {
            label: "Fetch Posts",
            description: "GET posts from API",
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
          position: { x: 250, y: 570 },
          data: {
            label: "Combine Results",
            description: "Merge users and posts",
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
        { id: "e1", source: "trigger_1", target: "http_users" },
        { id: "e2", source: "http_users", target: "transform_names" },
        { id: "e3", source: "transform_names", target: "http_posts" },
        { id: "e4", source: "http_posts", target: "transform_combine" },
      ],
      version: "1.0",
    },
  },
];

function TemplatesPage() {
  const { workspaceSlug } = Route.useParams();
  const { organizationId } = Route.useLoaderData();
  const navigate = useNavigate();
  const [creatingId, setCreatingId] = useState<string | null>(null);

  const { mutate: createWorkflow } = useCreateWorkflowMutation({
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
      }
      setCreatingId(null);
    },
    onError: () => {
      setCreatingId(null);
    },
  });

  const handleUseTemplate = (template: (typeof templates)[0]) => {
    setCreatingId(template.id);
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
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-bold text-2xl">Templates</h1>
        <p className="mt-2 text-muted-foreground">
          Start with a pre-built workflow template and customize it to your
          needs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => {
          const Icon = template.icon;
          const isCreating = creatingId === template.id;

          return (
            <div
              key={template.id}
              className="flex flex-col rounded-lg border bg-card p-6"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="rounded-full bg-muted px-2 py-1 text-muted-foreground text-xs">
                  {template.category}
                </span>
              </div>

              <h3 className="font-semibold text-lg">{template.name}</h3>
              <p className="mt-2 flex-1 text-muted-foreground text-sm">
                {template.description}
              </p>

              <Button
                className="mt-4 w-full"
                onClick={() => handleUseTemplate(template)}
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Use Template"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
