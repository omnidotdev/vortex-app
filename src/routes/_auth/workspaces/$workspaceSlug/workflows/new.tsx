import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import {
  useCreateWorkflowMutation,
  useWorkflowsQuery,
} from "@/generated/graphql";
import getQueryKeyPrefix from "@/lib/util/getQueryKeyPrefix";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/workflows/new",
)({
  loader: async ({ context: { workspaceBySlug } }) => {
    if (!workspaceBySlug) throw notFound();

    return { organizationId: workspaceBySlug.rowId };
  },
  component: NewWorkflowPage,
});

/**
 * Create new workflow page.
 */
function NewWorkflowPage() {
  const { workspaceSlug } = Route.useParams();
  const { organizationId } = Route.useLoaderData();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

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
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="font-bold text-2xl">Create New Workflow</h1>
      <p className="mt-2 text-muted-foreground">
        Set up a new automation workflow for your workspace.
      </p>

      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="font-medium text-sm">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what this workflow does..."
            rows={3}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() =>
              navigate({
                to: "/workspaces/$workspaceSlug/workflows",
                params: { workspaceSlug },
              })
            }
            className="rounded-md border px-4 py-2 text-sm hover:bg-accent"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending || !name.trim()}
            className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm hover:bg-primary/90 disabled:opacity-50"
          >
            {isPending ? "Creating..." : "Create Workflow"}
          </button>
        </div>
      </form>
    </div>
  );
}
