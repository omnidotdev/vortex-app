import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Link,
  createFileRoute,
  notFound,
  useRouteContext,
} from "@tanstack/react-router";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import UsageBanner from "@/components/UsageBanner";
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
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useDeleteWorkflowMutation,
  useUpdateWorkflowMutation,
  useWorkflowsQuery,
} from "@/generated/graphql";
import { canPerformDestructiveAction } from "@/lib/auth/roles";
import { isSelfHosted } from "@/lib/config/env.config";
import { SELF_HOSTED_LIMITS, getLimitsForPlan } from "@/lib/constants/tiers";
import workflowsOptions from "@/lib/options/workflows.options";
import getQueryKeyPrefix from "@/lib/util/getQueryKeyPrefix";
import { getSubscription } from "@/server/functions/subscriptions";

import type { Subscription } from "@/lib/providers/billing";

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/workflows/",
)({
  loader: async ({ context: { queryClient, organizationId } }) => {
    if (!organizationId) throw notFound();

    let subscription: Subscription | null = null;

    if (!isSelfHosted) {
      try {
        subscription = await getSubscription({
          data: { organizationId },
        });
      } catch {
        // Fall back to null (shows free tier)
      }
    }

    await queryClient.ensureQueryData(workflowsOptions({ organizationId }));

    return { organizationId, subscription };
  },
  component: WorkflowsPage,
});

/**
 * Workflows list page.
 */
function WorkflowsPage() {
  const { workspaceSlug } = Route.useParams();
  const { organizationId, subscription } = Route.useLoaderData();
  const { organization } = useRouteContext({ from: "/_app" });
  const isDestructiveAllowed = canPerformDestructiveAction(organization);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingWorkflow, setEditingWorkflow] = useState<{
    rowId: string;
    name: string;
    description: string;
    isActive: boolean;
  } | null>(null);

  const limits = isSelfHosted
    ? SELF_HOSTED_LIMITS
    : getLimitsForPlan(subscription?.product?.name);

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

  const { mutate: updateWorkflow } = useUpdateWorkflowMutation({
    meta: {
      invalidates: [getQueryKeyPrefix(useWorkflowsQuery)],
    },
    onSuccess: () => {
      setEditingWorkflow(null);
    },
  });

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between gap-2">
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

      <div className="mt-4">
        <UsageBanner
          current={workflows.length}
          limit={limits.workflows}
          label="Workflows"
          workspaceSlug={workspaceSlug}
        />
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
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-0 table-fixed">
            <thead>
              <tr className="border-b text-left text-muted-foreground text-sm">
                <th className="pb-3 font-medium">Name</th>
                <th className="hidden pb-3 font-medium sm:table-cell">
                  Description
                </th>
                <th className="w-20 pb-3 text-right font-medium sm:w-24">
                  Status
                </th>
                <th className="hidden pb-3 text-right font-medium sm:table-cell sm:w-40">
                  Last Run
                </th>
                <th className="w-20 pb-3 sm:w-24" />
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
                      <span className="line-clamp-1 break-all">
                        {workflow.name}
                      </span>
                    </Link>
                  </td>

                  <td className="hidden truncate py-4 pr-4 text-muted-foreground sm:table-cell">
                    {workflow.description}
                  </td>

                  <td className="py-4 text-right">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs ${
                        workflow.isActive
                          ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {workflow.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td
                    className="hidden py-4 text-right text-muted-foreground text-sm sm:table-cell"
                    suppressHydrationWarning
                  >
                    {workflow.workflowRuns.nodes[0]?.createdAt
                      ? new Date(
                          workflow.workflowRuns.nodes[0].createdAt,
                        ).toLocaleString()
                      : "Never"}
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                        onClick={() =>
                          setEditingWorkflow({
                            rowId: workflow.rowId,
                            name: workflow.name,
                            description: workflow.description || "",
                            isActive: workflow.isActive,
                          })
                        }
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      {isDestructiveAllowed ? (
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
                              <AlertDialogTitle>
                                Delete workflow?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete "{workflow.name}"
                                and all its run history. This action cannot be
                                undone.
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
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 cursor-not-allowed p-0 opacity-50"
                          disabled
                          title="Admin access required"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Workflow Dialog */}
      <DialogRoot
        open={!!editingWorkflow}
        onOpenChange={(e) => {
          if (!e.open) setEditingWorkflow(null);
        }}
      >
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogCloseTrigger />
            <DialogHeader>
              <DialogTitle>Edit Workflow</DialogTitle>
              <DialogDescription>
                Update the workflow name, description, and status.
              </DialogDescription>
            </DialogHeader>
            {editingWorkflow && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    value={editingWorkflow.name}
                    onChange={(e) =>
                      setEditingWorkflow({
                        ...editingWorkflow,
                        name: e.target.value,
                      })
                    }
                    placeholder="Workflow name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingWorkflow.description}
                    onChange={(e) =>
                      setEditingWorkflow({
                        ...editingWorkflow,
                        description: e.target.value,
                      })
                    }
                    placeholder="Optional description"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editingWorkflow.isActive ? "active" : "inactive"}
                    onValueChange={(value) =>
                      setEditingWorkflow({
                        ...editingWorkflow,
                        isActive: value === "active",
                      })
                    }
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <DialogCloseTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogCloseTrigger>
              <Button
                onClick={() => {
                  if (editingWorkflow) {
                    updateWorkflow({
                      input: {
                        rowId: editingWorkflow.rowId,
                        patch: {
                          name: editingWorkflow.name,
                          description: editingWorkflow.description || null,
                          isActive: editingWorkflow.isActive,
                        },
                      },
                    });
                  }
                }}
                disabled={!editingWorkflow?.name.trim()}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogPositioner>
      </DialogRoot>
    </div>
  );
}
