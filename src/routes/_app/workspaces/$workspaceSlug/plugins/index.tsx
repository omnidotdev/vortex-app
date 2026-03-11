import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Package, Search, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import PluginCard from "@/components/plugins/PluginCard";
import UploadPluginDialog from "@/components/plugins/UploadPluginDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/lib/config/env.config";
import getAuthHeaders from "@/lib/graphql/getAuthHeaders";
import pluginsOptions from "@/lib/options/plugins.options";

import type { Plugin } from "@/components/plugins/PluginCard";

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/plugins/",
)({
  loader: async ({ context: { queryClient, organizationId } }) => {
    if (!organizationId) throw notFound();
    await queryClient.ensureQueryData(pluginsOptions({ organizationId }));
    return { organizationId };
  },
  component: PluginsPage,
});

function PluginsPage() {
  const { organizationId } = Route.useLoaderData();
  const { workspaceSlug } = Route.useParams();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();
  const [isToggling, setIsToggling] = useState<string | null>(null);

  const { data: plugins } = useSuspenseQuery({
    ...pluginsOptions({ organizationId }),
    select: (data) => data?.plugins?.nodes ?? [],
  });

  const filteredPlugins = plugins.filter((plugin) =>
    plugin.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleToggle = async (plugin: Plugin, enabled: boolean) => {
    if (isToggling) return;
    setIsToggling(plugin.rowId);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/plugins/${plugin.rowId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(await getAuthHeaders()),
          },
          body: JSON.stringify({ isEnabled: enabled }),
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to ${enabled ? "enable" : "disable"} plugin`);
      }

      await queryClient.invalidateQueries({
        queryKey: pluginsOptions({ organizationId }).queryKey,
      });

      toast.success(`${plugin.name} ${enabled ? "enabled" : "disabled"}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update plugin",
      );
    } finally {
      setIsToggling(null);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Plugins</h1>
          <p className="mt-1 text-muted-foreground">
            Extend Vortex with custom WebAssembly workflow steps.
          </p>
        </div>

        <Button onClick={() => setIsUploadOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Plugin
        </Button>
      </div>

      {/* Search */}
      <div className="relative mt-6 max-w-sm">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search plugins..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Grid */}
      {filteredPlugins.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPlugins.map((plugin) => (
            <PluginCard
              key={plugin.rowId}
              plugin={plugin}
              onToggle={handleToggle}
              isToggling={isToggling}
              workspaceSlug={workspaceSlug}
            />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="mt-4 font-medium">
            {searchQuery
              ? "No plugins match your search"
              : "No plugins installed"}
          </p>
          <p className="mt-1 max-w-sm text-muted-foreground text-sm">
            {searchQuery
              ? "Try a different search term."
              : "Upload a WASM plugin to extend Vortex with custom steps."}
          </p>
          {!searchQuery && (
            <Button className="mt-4" onClick={() => setIsUploadOpen(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Plugin
            </Button>
          )}
        </div>
      )}

      {isUploadOpen && (
        <UploadPluginDialog
          organizationId={organizationId}
          onClose={() => setIsUploadOpen(false)}
        />
      )}
    </div>
  );
}
