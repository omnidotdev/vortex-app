import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/integrations/",
)({
  component: IntegrationsPage,
});

const availableIntegrations = [
  {
    type: "slack",
    name: "Slack",
    description: "Send messages to Slack channels",
    icon: "📢",
  },
  {
    type: "github",
    name: "GitHub",
    description: "Manage repositories and issues",
    icon: "🐙",
  },
  {
    type: "webhook",
    name: "Webhook",
    description: "Send HTTP requests to any URL",
    icon: "🔗",
  },
];

/**
 * Integrations page.
 */
function IntegrationsPage() {
  // TODO: Fetch configured integrations from GraphQL API
  const configuredIntegrations: string[] = [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Integrations</h1>
      <p className="mt-2 text-muted-foreground">
        Connect external services to use in your workflows.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {availableIntegrations.map((integration) => {
          const isConfigured = configuredIntegrations.includes(
            integration.type,
          );

          return (
            <div
              key={integration.type}
              className="rounded-lg border p-6 hover:bg-accent/50"
            >
              <div className="flex items-start justify-between">
                <div className="text-3xl">{integration.icon}</div>
                {isConfigured && (
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                    Connected
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-semibold">{integration.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {integration.description}
              </p>
              <button
                className={`mt-4 w-full rounded-md px-4 py-2 text-sm ${
                  isConfigured
                    ? "border hover:bg-accent"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {isConfigured ? "Configure" : "Connect"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
