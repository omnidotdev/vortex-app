import { Cable, CheckCircle2, Plus, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { getIntegrationActions } from "@/lib/integrations/actions";

import type { IntegrationAction } from "@/lib/integrations/actions";

type IntegrationPreviewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  integration: {
    rowId: string;
    name: string;
    description?: string | null;
    iconUrl?: string | null;
    category?: string | null;
  };
  isConnected: boolean;
  onConnect: () => void;
  onAddAction: (action: IntegrationAction) => void;
};

/** Modal for previewing available actions for an integration before connecting. */
function IntegrationPreviewModal({
  open,
  onOpenChange,
  integration,
  isConnected,
  onConnect,
  onAddAction,
}: IntegrationPreviewModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const actions = useMemo(
    () => getIntegrationActions(integration.rowId),
    [integration.rowId],
  );

  const filteredActions = useMemo(() => {
    if (!searchQuery.trim()) return actions;

    const query = searchQuery.toLowerCase();
    return actions.filter(
      (action) =>
        action.label.toLowerCase().includes(query) ||
        action.description.toLowerCase().includes(query),
    );
  }, [actions, searchQuery]);

  const showSearch = actions.length > 5;
  const hasActions = actions.length > 0;
  const hasFilteredActions = filteredActions.length > 0;

  const handleAddAction = (action: IntegrationAction) => {
    onAddAction(action);
    onOpenChange(false);
  };

  return (
    <DialogRoot open={open} onOpenChange={(e) => onOpenChange(e.open)}>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent className="flex max-h-[85vh] max-w-lg flex-col overflow-hidden">
          <DialogHeader>
            <div className="flex items-start gap-3">
              {integration.iconUrl ? (
                <img
                  src={integration.iconUrl}
                  alt=""
                  className="h-10 w-10 shrink-0 rounded-lg bg-white p-1 dark:bg-slate-700"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Cable className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <DialogTitle className="truncate">
                    {integration.name}
                  </DialogTitle>
                  {isConnected && (
                    <Badge
                      variant="secondary"
                      className="shrink-0 gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      Connected
                    </Badge>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  {integration.category && (
                    <Badge variant="outline" className="text-xs">
                      {integration.category}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            {integration.description && (
              <DialogDescription className="mt-3">
                {integration.description}
              </DialogDescription>
            )}
          </DialogHeader>
          <DialogCloseTrigger />

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden border-y">
            <div className="flex shrink-0 items-center justify-between gap-4 border-b bg-muted/30 px-4 py-3">
              <h3 className="font-medium text-sm">
                Available Actions ({actions.length})
              </h3>
              {showSearch && (
                <div className="relative w-48">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search actions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-8 pl-9 text-sm"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            <ScrollArea className="flex-1">
              <div className="p-2">
                {!hasActions && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <Cable className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-sm">Actions coming soon</p>
                    <p className="mt-1 text-muted-foreground text-xs">
                      We're working on adding actions for this integration.
                    </p>
                  </div>
                )}

                {hasActions && !hasFilteredActions && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <Search className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-sm">No actions found</p>
                    <p className="mt-1 text-muted-foreground text-xs">
                      Try a different search term.
                    </p>
                  </div>
                )}

                {hasFilteredActions && (
                  <div className="space-y-1">
                    {filteredActions.map((action) => (
                      <ActionCard
                        key={action.value}
                        action={action}
                        onAdd={() => handleAddAction(action)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          <DialogFooter className="shrink-0 pt-4">
            {!isConnected && (
              <Button onClick={onConnect}>
                <Cable className="mr-2 h-4 w-4" />
                Connect {integration.name}
              </Button>
            )}
            <DialogCloseTrigger asChild>
              <Button variant="outline">Close</Button>
            </DialogCloseTrigger>
          </DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}

type ActionCardProps = {
  action: IntegrationAction;
  onAdd: () => void;
};

/** Card displaying an action with hover state for add button. */
function ActionCard({ action, onAdd }: ActionCardProps) {
  return (
    <div className="group flex items-center justify-between gap-3 rounded-md p-3 transition-colors hover:bg-accent">
      <div className="min-w-0 flex-1">
        <p className="font-medium text-sm">{action.label}</p>
        <p className="truncate text-muted-foreground text-xs">
          {action.description}
        </p>
      </div>
      <Button
        size="sm"
        variant="ghost"
        onClick={onAdd}
        className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <Plus className="mr-1 h-4 w-4" />
        Add
      </Button>
    </div>
  );
}

export default IntegrationPreviewModal;
