import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Clock, Loader2, RotateCcw, X } from "lucide-react";
import { useCallback, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWorkflowQuery } from "@/generated/graphql";
import { API_BASE_URL } from "@/lib/config/env.config";
import { getCurrentAuthHeaders } from "@/lib/graphql/graphqlClientFactory";
import getQueryKeyPrefix from "@/lib/util/getQueryKeyPrefix";

dayjs.extend(relativeTime);

type VersionEntry = {
  id: string;
  version: number;
  changeNote: string | null;
  createdAt: string;
  createdByName: string | null;
};

type VersionsResponse = {
  versions: VersionEntry[];
  total: number;
};

type VersionHistoryProps = {
  workflowId: string;
  onClose: () => void;
};

const PAGE_SIZE = 20;

/**
 * Fetch workflow versions from the REST API.
 */
async function fetchVersions(
  workflowId: string,
  limit: number,
  offset: number,
): Promise<VersionsResponse> {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/workflows/${workflowId}/versions?limit=${limit}&offset=${offset}`,
    { headers: getCurrentAuthHeaders() },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch versions: ${res.status}`);
  }

  return res.json();
}

/**
 * Revert a workflow to a specific version via the REST API.
 */
async function revertToVersion(
  workflowId: string,
  version: number,
): Promise<void> {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/workflows/${workflowId}/revert/${version}`,
    {
      method: "POST",
      headers: {
        ...getCurrentAuthHeaders(),
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "Unknown error");
    throw new Error(body || `Revert failed with status ${res.status}`);
  }
}

function VersionHistory({ workflowId, onClose }: VersionHistoryProps) {
  const queryClient = useQueryClient();
  const [loadedCount, setLoadedCount] = useState(PAGE_SIZE);
  const [restoreTarget, setRestoreTarget] = useState<VersionEntry | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [restoreError, setRestoreError] = useState<string | null>(null);

  const {
    data,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ["workflowVersions", workflowId, loadedCount],
    queryFn: () => fetchVersions(workflowId, loadedCount, 0),
  });

  const versions = data?.versions ?? [];
  const totalCount = data?.total ?? 0;

  const handleRestore = useCallback(async () => {
    if (!restoreTarget) return;

    setIsRestoring(true);
    setRestoreError(null);

    try {
      await revertToVersion(workflowId, restoreTarget.version);

      // Invalidate workflow query to refetch updated definition
      await queryClient.invalidateQueries({
        queryKey: getQueryKeyPrefix(useWorkflowQuery),
      });

      // Invalidate version list
      await queryClient.invalidateQueries({
        queryKey: ["workflowVersions", workflowId],
      });

      setRestoreTarget(null);
      onClose();
    } catch (err) {
      setRestoreError(
        err instanceof Error ? err.message : "Failed to restore version",
      );
    } finally {
      setIsRestoring(false);
    }
  }, [workflowId, restoreTarget, queryClient, onClose]);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="font-semibold text-sm">Version History</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {fetchError && (
            <div className="py-8 text-center">
              <p className="text-destructive text-sm">
                {fetchError instanceof Error
                  ? fetchError.message
                  : "Failed to load versions"}
              </p>
            </div>
          )}

          {!isLoading && !fetchError && versions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Clock className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 font-medium text-muted-foreground">
                No versions yet
              </h3>
              <p className="mt-1 text-muted-foreground text-sm">
                Versions are created automatically when you save changes.
              </p>
            </div>
          )}

          {!isLoading && versions.length > 0 && (
            <div className="space-y-2">
              {versions.map((entry) => (
                <div
                  key={entry.id}
                  className="group rounded-md border border-border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="shrink-0">
                          v{entry.version}
                        </Badge>
                        <span className="truncate text-muted-foreground text-xs">
                          {entry.createdByName ?? "System"}
                        </span>
                      </div>

                      {entry.changeNote && (
                        <p className="line-clamp-2 text-sm">
                          {entry.changeNote.length > 80
                            ? `${entry.changeNote.slice(0, 80)}...`
                            : entry.changeNote}
                        </p>
                      )}

                      <p className="text-muted-foreground text-xs">
                        {dayjs(entry.createdAt).fromNow()}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => setRestoreTarget(entry)}
                    >
                      <RotateCcw className="mr-1 h-3.5 w-3.5" />
                      Restore
                    </Button>
                  </div>
                </div>
              ))}

              {totalCount > versions.length && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setLoadedCount((prev) => prev + PAGE_SIZE)}
                >
                  Load more ({totalCount - versions.length} remaining)
                </Button>
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Restore confirmation dialog */}
      <AlertDialog
        open={!!restoreTarget}
        onOpenChange={(open) => {
          if (!open) {
            setRestoreTarget(null);
            setRestoreError(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Restore version {restoreTarget?.version}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will create a new version with the definition from version{" "}
              {restoreTarget?.version}. Your current workflow will be updated to
              match.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {restoreError && (
            <p className="text-destructive text-sm">{restoreError}</p>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRestoring}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRestore} disabled={isRestoring}>
              {isRestoring && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
              Restore
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default VersionHistory;
