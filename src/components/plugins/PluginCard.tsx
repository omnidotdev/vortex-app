import { Link } from "@tanstack/react-router";
import { Loader2, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { PluginsQuery } from "@/generated/graphql";

export type Plugin = NonNullable<PluginsQuery["plugins"]>["nodes"][number];

type PluginCardProps = {
  plugin: Plugin;
  onToggle: (plugin: Plugin, enabled: boolean) => void;
  isToggling?: string | null;
  workspaceSlug: string;
};

/** Card displaying plugin metadata with enable/disable toggle. */
function PluginCard({
  plugin,
  onToggle,
  isToggling,
  workspaceSlug,
}: PluginCardProps) {
  return (
    <div className="flex flex-col rounded-lg border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-medium">{plugin.name}</h3>
            {plugin.isVerified && (
              <Badge
                variant="secondary"
                className="shrink-0 gap-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              >
                <ShieldCheck className="h-3 w-3" />
                Verified
              </Badge>
            )}
          </div>
          <p className="mt-1 text-muted-foreground text-xs">
            v{plugin.version}
          </p>
        </div>

        <span
          className={`inline-flex shrink-0 rounded-full px-2 py-1 text-xs ${
            plugin.isEnabled
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          {plugin.isEnabled ? "Enabled" : "Disabled"}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <Link
          to="/workspaces/$workspaceSlug/plugins/$pluginId"
          params={{ workspaceSlug, pluginId: plugin.rowId }}
          className="text-muted-foreground text-xs hover:text-foreground"
        >
          View Details
        </Link>
        <Button
          size="sm"
          variant="outline"
          disabled={isToggling === plugin.rowId}
          onClick={() => onToggle(plugin, !plugin.isEnabled)}
        >
          {isToggling === plugin.rowId && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {plugin.isEnabled ? "Disable" : "Enable"}
        </Button>
      </div>
    </div>
  );
}

export default PluginCard;
