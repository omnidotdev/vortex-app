import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Loader2, Trash2 } from "lucide-react";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  useDeleteWorkflowMutation,
  useWorkflowsQuery,
} from "@/generated/graphql";
import workflowsOptions from "@/lib/options/workflows.options";
import getQueryKeyPrefix from "@/lib/util/getQueryKeyPrefix";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/workflows/",
)({
  loader: async ({ context: { queryClient, organizationId } }) => {
    if (!organizationId) throw notFound();

    await queryClient.ensureQueryData(workflowsOptions({ organizationId }));

    return { organizationId };
  },
  component: WorkflowsPage,
});

/**
 * Workflows list page.
 */
function WorkflowsPage() {
  const { workspaceSlug } = Route.useParams();
  const { organizationId } = Route.useLoaderData();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: workflows } = useSuspenseQuery({
    ...workflowsOptions({ organizationId }),
    select: (data) => data?.workflows?.nodes ?? [],
  });

  const { mutate: deleteWorkflow } = useDeleteWorkflowMutation({
    meta: {
      invalidates: [getQueryKeyPrefix(useWorkflowsQuery)],
    },
    onSuccess: () => {
      setDeletingId(null);
    },
    onError: () => {
      setDeletingId(null);
    },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Workflows</h1>
        <Button asChild>
          <Link
            to="/workspaces/$workspaceSlug/workflows/new"
            params={{ workspaceSlug }}
          >
            Create Workflow
          </Link>
        </Button>
      </div>

      {workflows.length === 0 ? (
        <div className="mt-16 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-muted" />
          <h3 className="mt-4 font-semibold text-lg">No workflows yet</h3>
          <p className="mt-2 text-muted-foreground">
            Create your first workflow to start automating.
          </p>
          <Button asChild className="mt-4">
            <Link
              to="/workspaces/$workspaceSlug/workflows/new"
              params={{ workspaceSlug }}
            >
              Create Workflow
            </Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b text-left text-muted-foreground text-sm">
                <th className="w-48 pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Description</th>
                <th className="w-24 pb-3 text-right font-medium">Status</th>
                <th className="w-40 pb-3 text-right font-medium">Last Run</th>
                <th className="w-16 pb-3" />
              </tr>
            </thead>

            <tbody>
              {workflows.map((workflow) => (
                <tr key={workflow.rowId} className="border-b">
                  <td className="py-4">
                    <Link
                      to="/workspaces/$workspaceSlug/workflows/$workflowId"
                      params={{ workspaceSlug, workflowId: workflow.rowId }}
                      className="font-medium hover:underline"
                    >
                      {workflow.name}
                    </Link>
                  </td>

                  <td className="truncate py-4 pr-4 text-muted-foreground">
                    {workflow.description}
                  </td>

                  <td className="py-4 text-right">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs ${
                        workflow.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {workflow.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-4 text-right text-muted-foreground text-sm">
                    {workflow.workflowRuns.nodes[0]?.createdAt
                      ? new Date(
                          workflow.workflowRuns.nodes[0].createdAt,
                        ).toLocaleString()
                      : "Never"}
                  </td>
                  <td className="py-4 text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          disabled={deletingId === workflow.rowId}
                        >
                          {deletingId === workflow.rowId ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete workflow?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete "{workflow.name}" and
                            all its run history. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              setDeletingId(workflow.rowId);
                              deleteWorkflow({
                                input: { rowId: workflow.rowId },
                              });
                            }}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
