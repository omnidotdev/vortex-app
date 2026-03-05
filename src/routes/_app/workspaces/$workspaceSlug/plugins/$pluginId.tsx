import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute, useParams } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Package, ShieldCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/lib/config/env.config";
import { getCurrentAuthHeaders } from "@/lib/graphql/graphqlClientFactory";

type PluginDetail = {
  id: string;
  name: string;
  version: string;
  description?: string;
  isEnabled: boolean;
  isVerified: boolean;
  manifest: Record<string, unknown>;
  wasmUrl: string;
  wasmHash: string;
  createdAt: string;
  usage: {
    totalCalls: number;
    successCalls: number;
    failedCalls: number;
    successRate: number;
    avgDurationMs: number;
    lastExecutedAt: string | null;
  };
};

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/plugins/$pluginId",
)({
  component: PluginDetailPage,
});

function PluginDetailPage() {
  const { workspaceSlug, pluginId } = useParams({
    from: "/_app/workspaces/$workspaceSlug/plugins/$pluginId",
  });

  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: plugin,
    isLoading,
    error,
    refetch,
  } = useQuery<PluginDetail>({
    queryKey: ["plugin", pluginId],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/plugins/${pluginId}`,
        {
          headers: getCurrentAuthHeaders(),
        },
      );
      if (!response.ok) throw new Error("Failed to load plugin");
      return response.json();
    },
  });

  const handleToggle = async () => {
    if (!plugin || isToggling) return;
    setIsToggling(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/plugins/${pluginId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...getCurrentAuthHeaders(),
          },
          body: JSON.stringify({ isEnabled: !plugin.isEnabled }),
        },
      );
      if (!response.ok) throw new Error("Failed to update plugin");
      await refetch();
      toast.success(`Plugin ${!plugin.isEnabled ? "enabled" : "disabled"}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    if (!plugin || isDeleting) return;
    if (!confirm(`Delete plugin "${plugin.name}"? This cannot be undone.`))
      return;
    setIsDeleting(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/plugins/${pluginId}`,
        {
          method: "DELETE",
          headers: getCurrentAuthHeaders(),
        },
      );
      if (!response.ok) throw new Error("Failed to delete plugin");
      toast.success("Plugin deleted");
      // Navigate back handled by router
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !plugin) {
    return (
      <div className="p-8">
        <p className="text-destructive">Failed to load plugin.</p>
        <Link
          to="/workspaces/$workspaceSlug/plugins"
          params={{ workspaceSlug }}
          className="mt-2 text-sm hover:underline"
        >
          ← Back to Plugins
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/workspaces/$workspaceSlug/plugins"
          params={{ workspaceSlug }}
          className="mb-4 flex items-center gap-1 text-muted-foreground text-sm hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Plugins
        </Link>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <Package className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-2xl">{plugin.name}</h1>
                {plugin.isVerified && (
                  <Badge
                    variant="secondary"
                    className="gap-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  >
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs ${
                    plugin.isEnabled
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {plugin.isEnabled ? "Enabled" : "Disabled"}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">v{plugin.version}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggle}
              disabled={isToggling}
            >
              {isToggling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {plugin.isEnabled ? "Disable" : "Enable"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Uninstall
            </Button>
          </div>
        </div>

        {plugin.description && (
          <p className="mt-4 text-muted-foreground">{plugin.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Usage Stats */}
        <div className="rounded-lg border p-4">
          <h2 className="mb-4 font-semibold">Usage Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground text-xs">Total Calls</p>
              <p className="font-semibold text-2xl">
                {plugin.usage.totalCalls}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Success Rate</p>
              <p className="font-semibold text-2xl">
                {plugin.usage.successRate}%
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Avg Duration</p>
              <p className="font-semibold text-2xl">
                {plugin.usage.avgDurationMs
                  ? `${plugin.usage.avgDurationMs}ms`
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Last Executed</p>
              <p className="font-semibold text-sm">
                {plugin.usage.lastExecutedAt
                  ? new Date(plugin.usage.lastExecutedAt).toLocaleDateString()
                  : "Never"}
              </p>
            </div>
          </div>
        </div>

        {/* Plugin Info */}
        <div className="rounded-lg border p-4">
          <h2 className="mb-4 font-semibold">Plugin Info</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Version</dt>
              <dd className="font-medium">{plugin.version}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Installed</dt>
              <dd className="font-medium">
                {new Date(plugin.createdAt).toLocaleDateString()}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">SHA256</dt>
              <dd className="max-w-[200px] truncate font-mono text-xs">
                {plugin.wasmHash}
              </dd>
            </div>
          </dl>
        </div>

        {/* Manifest */}
        <div className="rounded-lg border p-4 lg:col-span-2">
          <h2 className="mb-4 font-semibold">Manifest</h2>
          <pre className="overflow-auto rounded bg-muted p-3 font-mono text-xs">
            {JSON.stringify(plugin.manifest, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
