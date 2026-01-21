import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import workflowsOptions from "@/lib/options/workflows.options";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/workflows/",
)({
  loader: async ({ context: { queryClient, workspaceBySlug } }) => {
    if (!workspaceBySlug) throw notFound();

    await queryClient.ensureQueryData(
      workflowsOptions({ organizationId: workspaceBySlug.rowId }),
    );

    return { organizationId: workspaceBySlug.rowId };
  },
  component: WorkflowsPage,
});

/**
 * Workflows list page.
 */
function WorkflowsPage() {
  const { workspaceSlug } = Route.useParams();
  const { organizationId } = Route.useLoaderData();

  const { data: workflows } = useSuspenseQuery({
    ...workflowsOptions({ organizationId }),
    select: (data) => data?.workflows?.nodes ?? [],
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Workflows</h1>
        <Link
          to="/workspaces/$workspaceSlug/workflows/new"
          params={{ workspaceSlug }}
          className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm hover:bg-primary/90"
        >
          Create Workflow
        </Link>
      </div>

      {workflows.length === 0 ? (
        <div className="mt-16 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-muted" />
          <h3 className="mt-4 font-semibold text-lg">No workflows yet</h3>
          <p className="mt-2 text-muted-foreground">
            Create your first workflow to start automating.
          </p>
          <Link
            to="/workspaces/$workspaceSlug/workflows/new"
            params={{ workspaceSlug }}
            className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm hover:bg-primary/90"
          >
            Create Workflow
          </Link>
        </div>
      ) : (
        <div className="mt-8">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-muted-foreground text-sm">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Description</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Last Run</th>
                <th className="pb-3 font-medium" />
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

                  <td className="py-4">{workflow.description}</td>

                  <td className="py-4">
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
                  <td className="py-4 text-muted-foreground text-sm">
                    {workflow.workflowRuns.nodes[0]?.createdAt
                      ? new Date(
                          workflow.workflowRuns.nodes[0].createdAt,
                        ).toLocaleString()
                      : "Never"}
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
