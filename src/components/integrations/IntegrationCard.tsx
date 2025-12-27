import { CheckCircle, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IntegrationCategoryBadge } from "./IntegrationCategoryBadge";

interface IntegrationDefinition {
  id: string;
  name: string;
  description?: string | null;
  iconUrl?: string | null;
  category: string;
  authType: string;
  keepAlive: boolean;
}

interface ConnectedIntegration {
  rowId: string;
  name: string;
  isEnabled: boolean;
}

interface IntegrationCardProps {
  definition: IntegrationDefinition;
  connectedIntegration?: ConnectedIntegration | null;
  onConnect: (definition: IntegrationDefinition) => void;
  onConfigure: (integration: ConnectedIntegration) => void;
}

export function IntegrationCard({
  definition,
  connectedIntegration,
  onConnect,
  onConfigure,
}: IntegrationCardProps) {
  const isConnected = !!connectedIntegration;

  return (
    <div className="group relative flex flex-col rounded-lg border bg-card p-4 transition-colors hover:border-primary/50">
      {/* Connected indicator */}
      {isConnected && (
        <div className="absolute top-3 right-3">
          <CheckCircle className="h-5 w-5 text-green-500" />
        </div>
      )}

      {/* Icon and name */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
          {definition.iconUrl ? (
            <img
              src={definition.iconUrl}
              alt={definition.name}
              className="h-8 w-8"
              onError={(e) => {
                // Fallback to first letter if icon fails to load
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : null}
          <span
            className={`font-bold text-lg text-muted-foreground ${definition.iconUrl ? "hidden" : ""}`}
          >
            {definition.name.charAt(0)}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm">{definition.name}</h3>
          <IntegrationCategoryBadge category={definition.category} />
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 line-clamp-2 text-muted-foreground text-sm">
        {definition.description || "No description available."}
      </p>

      {/* Keep-alive indicator */}
      {definition.keepAlive && (
        <p className="mt-2 text-muted-foreground text-xs">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />{" "}
          Real-time connection
        </p>
      )}

      {/* Action button */}
      <div className="mt-4 flex gap-2">
        {isConnected ? (
          <>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onConfigure(connectedIntegration)}
            >
              <Settings className="mr-2 h-4 w-4" />
              Configure
            </Button>
          </>
        ) : (
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={() => onConnect(definition)}
          >
            Connect
          </Button>
        )}
      </div>
    </div>
  );
}
