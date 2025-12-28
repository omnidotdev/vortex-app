import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { Settings2 } from "lucide-react";

import { integrationsOptions } from "@/lib/options/integrations.options";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/integrations/",
)({
  loader: async ({ context: { queryClient, workspaceBySlug } }) => {
    if (!workspaceBySlug) throw notFound();

    await queryClient.ensureQueryData(
      integrationsOptions({ workspaceId: workspaceBySlug.rowId }),
    );

    return { workspaceId: workspaceBySlug.rowId };
  },
  component: IntegrationsPage,
});

function IntegrationsPage() {
  const { workspaceSlug } = Route.useParams();
  const { workspaceId } = Route.useLoaderData();
  const navigate = useNavigate();

  // Fetch workspace integrations
  const { data: integrations } = useSuspenseQuery({
    ...integrationsOptions({ workspaceId }),
    select: (data) => data?.integrations?.nodes ?? [],
  });

  const handleConfigure = (integration: { rowId: string }) => {
    navigate({
      to: "/workspaces/$workspaceSlug/integrations/$integrationId",
      params: { workspaceSlug, integrationId: integration.rowId },
    });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Integrations</h1>
          <p className="mt-1 text-muted-foreground">
            Connect external services to power your workflows.
          </p>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="mt-8 rounded-lg border bg-muted/50 p-8 text-center">
        <Settings2 className="mx-auto h-12 w-12 text-muted-foreground" />
        <h2 className="mt-4 font-semibold text-lg">
          Integration Catalog Coming Soon
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          The integration catalog with GitHub, Discord, Slack, and 280+ other
          services will be available after running database migrations.
        </p>
      </div>

      {/* Connected Integrations */}
      {integrations.length > 0 && (
        <section className="mt-12">
          <h2 className="font-semibold text-lg">
            Connected ({integrations.length})
          </h2>
          <div className="mt-4 divide-y rounded-lg border">
            {integrations.map((integration) => (
              <div
                key={integration.rowId}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <span className="font-semibold text-muted-foreground">
                      {integration.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{integration.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {integration.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs ${
                      integration.isEnabled
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {integration.isEnabled ? "Active" : "Inactive"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleConfigure(integration)}
                    className="rounded-md px-3 py-1 text-sm hover:bg-accent"
                  >
                    Configure
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
