import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/plugins/",
)({
  component: PluginsPage,
});

/**
 * Plugins marketplace page.
 */
function PluginsPage() {
  // TODO: Fetch installed plugins from GraphQL API
  const installedPlugins: Array<{
    id: string;
    name: string;
    version: string;
    description: string;
    isEnabled: boolean;
  }> = [];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Plugins</h1>
          <p className="mt-2 text-muted-foreground">
            Extend Vortex with WASM plugins.
          </p>
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Upload Plugin
        </button>
      </div>

      {installedPlugins.length === 0 ? (
        <div className="mt-16 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-muted" />
          <h3 className="mt-4 text-lg font-semibold">No plugins installed</h3>
          <p className="mt-2 text-muted-foreground">
            Upload a WASM plugin or browse the marketplace.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <button className="rounded-md border px-4 py-2 text-sm hover:bg-accent">
              Browse Marketplace
            </button>
            <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
              Upload Plugin
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {installedPlugins.map((plugin) => (
            <div
              key={plugin.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{plugin.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    v{plugin.version}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plugin.description}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={plugin.isEnabled}
                    className="rounded"
                  />
                  <span className="text-sm">Enabled</span>
                </label>
                <button className="text-sm text-red-600 hover:underline">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Plugin Development */}
      <div className="mt-12 rounded-lg border bg-muted/30 p-6">
        <h2 className="font-semibold">Develop Your Own Plugin</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Plugins are Extism WASM modules. Write in Rust, Go, TypeScript, or any
          language that compiles to WASM.
        </p>
        <a
          href="/docs/plugins/developing-plugins"
          className="mt-4 inline-block text-sm text-primary hover:underline"
        >
          Read the documentation →
        </a>
      </div>
    </div>
  );
}
