import { ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { PluginsQuery } from "@/generated/graphql";

type Plugin = NonNullable<PluginsQuery["plugins"]>["nodes"][number];

type PluginCardProps = {
  plugin: Plugin;
  onToggle: (plugin: Plugin, enabled: boolean) => void;
};

/** Card displaying plugin metadata with enable/disable toggle. */
function PluginCard({ plugin, onToggle }: PluginCardProps) {
  return (
    <div className="flex flex-col rounded-lg border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-medium truncate">{plugin.name}</h3>
            {plugin.isVerified && (
              <Badge
                variant="secondary"
                className="gap-1 shrink-0 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
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

      <div className="mt-4 flex justify-end">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onToggle(plugin, !plugin.isEnabled)}
        >
          {plugin.isEnabled ? "Disable" : "Enable"}
        </Button>
      </div>
    </div>
  );
}

export default PluginCard;
