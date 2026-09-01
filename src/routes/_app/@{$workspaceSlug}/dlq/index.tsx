import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import {
  AlertCircle,
  AlertTriangle,
  Archive,
  Loader2,
  Play,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { canPerformDestructiveAction } from "@/lib/auth/roles";
import { API_BASE_URL } from "@/lib/config/env.config";
import getAuthHeaders from "@/lib/graphql/getAuthHeaders";
import { dlqEventsOptions, dlqStatsOptions } from "@/lib/options/dlq.options";

import type { DlqEvent, DlqFilters } from "@/lib/types/dlq";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/dlq/")({
  component: DlqDashboard,
});

// -- helpers ---------------------------------------------------------------

/**
 * Build auth + org-scoped headers for DLQ mutation requests.
 */
async function dlqHeaders(
  organizationId: string,
): Promise<Record<string, string>> {
  return {
    ...(await getAuthHeaders()),
    "X-Organization-Id": organizationId,
  };
}

/**
 * Replay a single DLQ event.
 */
async function replayEvent(id: string, organizationId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/v1/dlq/${id}/replay`, {
    method: "POST",
    headers: await dlqHeaders(organizationId),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(body?.error ?? "Failed to replay event");
  }
}

/**
 * Discard a single DLQ event.
 */
async function discardEvent(id: string, organizationId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/v1/dlq/${id}/discard`, {
    method: "POST",
    headers: await dlqHeaders(organizationId),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(body?.error ?? "Failed to discard event");
  }
}

/**
 * Bulk replay events matching the current filter.
 */
async function bulkReplay(
  filters: Pick<DlqFilters, "errorCode" | "eventType">,
  organizationId: string,
): Promise<{ replayed: number; failed: number; total: number }> {
  const response = await fetch(`${API_BASE_URL}/api/v1/dlq/replay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(await dlqHeaders(organizationId)),
    },
    body: JSON.stringify({
      errorCode: filters.errorCode || undefined,
      eventType: filters.eventType || undefined,
    }),
  });

  if (!response.ok) throw new Error("Failed to bulk replay events");

  return response.json();
}

/**
 * Bulk discard events matching the current filter.
 */
async function bulkDiscard(
  filters: Pick<DlqFilters, "errorCode" | "eventType">,
  organizationId: string,
): Promise<{ discarded: number }> {
  const response = await fetch(`${API_BASE_URL}/api/v1/dlq/discard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(await dlqHeaders(organizationId)),
    },
    body: JSON.stringify({
      errorCode: filters.errorCode || undefined,
      eventType: filters.eventType || undefined,
    }),
  });

  if (!response.ok) throw new Error("Failed to bulk discard events");

  return response.json();
}

// -- sub-components --------------------------------------------------------

/**
 * Stats bar showing aggregate DLQ metrics.
 */
function DlqStatsBar({ organizationId }: { organizationId: string }) {
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery(dlqStatsOptions(organizationId));

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton, never reorders
            key={`skeleton-${i}`}
            className="h-24 animate-pulse rounded-lg border bg-muted/30"
          />
        ))}
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-lg border py-12 text-muted-foreground">
        <AlertCircle className="h-5 w-5" />
        <p className="text-sm">Failed to load DLQ stats</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {/* Total unresolved */}
      <div className="rounded-lg border p-4">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <AlertTriangle className="h-4 w-4" />
          <span>Unresolved</span>
        </div>
        <p className="mt-2 font-bold text-3xl">{stats.totalUnresolved}</p>
      </div>

      {/* By error code */}
      <div className="rounded-lg border p-4">
        <p className="text-muted-foreground text-sm">By Error Code</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {stats.byErrorCode.length === 0 && (
            <span className="text-muted-foreground text-sm">None</span>
          )}
          {stats.byErrorCode.map(({ errorCode, count }) => (
            <Badge key={errorCode} variant="secondary" className="gap-1">
              {errorCode}
              <span className="font-normal text-muted-foreground">{count}</span>
            </Badge>
          ))}
        </div>
      </div>

      {/* By event type */}
      <div className="rounded-lg border p-4">
        <p className="text-muted-foreground text-sm">By Event Type</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {stats.byEventType.length === 0 && (
            <span className="text-muted-foreground text-sm">None</span>
          )}
          {stats.byEventType.map(({ eventType, count }) => (
            <Badge key={eventType} variant="outline" className="gap-1">
              {eventType}
              <span className="font-normal text-muted-foreground">{count}</span>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * A single row in the DLQ events table.
 */
function DlqRow({
  event,
  onMutate,
  isDestructiveAllowed,
  organizationId,
}: {
  event: DlqEvent;
  onMutate: () => void;
  isDestructiveAllowed: boolean;
  organizationId: string;
}) {
  const [busy, setBusy] = useState<"replay" | "discard" | null>(null);

  const handleReplay = async () => {
    setBusy("replay");
    try {
      await replayEvent(event.id, organizationId);
      toast.success("Event replayed");
      onMutate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to replay");
    } finally {
      setBusy(null);
    }
  };

  const handleDiscard = async () => {
    setBusy("discard");
    try {
      await discardEvent(event.id, organizationId);
      toast.success("Event discarded");
      onMutate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to discard");
    } finally {
      setBusy(null);
    }
  };

  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      <td className="px-4 py-3 text-sm">{event.eventType}</td>
      <td className="px-4 py-3">
        <Badge variant="secondary" className="font-mono text-xs">
          {event.errorCode}
        </Badge>
      </td>
      <td className="max-w-xs truncate px-4 py-3 text-muted-foreground text-sm">
        {event.error}
      </td>
      <td className="px-4 py-3 text-center text-sm">{event.attempts}</td>
      <td
        className="px-4 py-3 text-muted-foreground text-sm"
        suppressHydrationWarning
      >
        {new Date(event.createdAt).toLocaleString()}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReplay}
            disabled={busy !== null || !isDestructiveAllowed}
            aria-label="Replay event"
            title={isDestructiveAllowed ? undefined : "Admin access required"}
            className={
              isDestructiveAllowed ? undefined : "cursor-not-allowed opacity-50"
            }
          >
            {busy === "replay" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDiscard}
            disabled={busy !== null || !isDestructiveAllowed}
            aria-label="Discard event"
            title={isDestructiveAllowed ? undefined : "Admin access required"}
            className={
              isDestructiveAllowed ? undefined : "cursor-not-allowed opacity-50"
            }
          >
            {busy === "discard" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </td>
    </tr>
  );
}

// -- main page -------------------------------------------------------------

function DlqDashboard() {
  const { organization, organizationId } = useRouteContext({ from: "/_app" });
  const isDestructiveAllowed = canPerformDestructiveAction(organization);
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<DlqFilters>({
    page: 1,
    limit: 20,
  });
  const [errorCodeFilter, setErrorCodeFilter] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState("");
  const [bulkBusy, setBulkBusy] = useState<"replay" | "discard" | null>(null);

  const activeFilters: DlqFilters = {
    ...filters,
    errorCode: errorCodeFilter || undefined,
    eventType: eventTypeFilter || undefined,
  };

  const {
    data: eventsData,
    isLoading,
    isFetching,
    isError: isEventsError,
  } = useQuery(dlqEventsOptions(activeFilters, organizationId!));

  const events = eventsData?.nodes ?? [];
  const total = eventsData?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / (filters.limit ?? 20)));

  /** Invalidate both events list and stats after any mutation */
  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["dlq"] });
  };

  const handleBulkReplay = async () => {
    setBulkBusy("replay");
    try {
      const result = await bulkReplay(
        {
          errorCode: errorCodeFilter || undefined,
          eventType: eventTypeFilter || undefined,
        },
        organizationId!,
      );
      toast.success(
        `Replayed ${result.replayed} event(s)${result.failed ? `, ${result.failed} failed` : ""}`,
      );
      invalidateAll();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Bulk replay failed");
    } finally {
      setBulkBusy(null);
    }
  };

  const handleBulkDiscard = async () => {
    setBulkBusy("discard");
    try {
      const result = await bulkDiscard(
        {
          errorCode: errorCodeFilter || undefined,
          eventType: eventTypeFilter || undefined,
        },
        organizationId!,
      );
      toast.success(`Discarded ${result.discarded} event(s)`);
      invalidateAll();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Bulk discard failed");
    } finally {
      setBulkBusy(null);
    }
  };

  const handleApplyFilters = () => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Dead Letter Queue</h1>
          <p className="mt-1 text-muted-foreground">
            Inspect, replay, and discard failed events
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={invalidateAll}
          disabled={isFetching}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-6">
        <DlqStatsBar organizationId={organizationId!} />
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap items-end gap-3">
        <div>
          <label
            htmlFor="dlq-error-code"
            className="mb-1 block text-muted-foreground text-xs"
          >
            Error Code
          </label>
          <Input
            id="dlq-error-code"
            type="text"
            placeholder="e.g. DISPATCH_FAILED"
            value={errorCodeFilter}
            onChange={(e) => setErrorCodeFilter(e.target.value)}
            className="w-52"
          />
        </div>
        <div>
          <label
            htmlFor="dlq-event-type"
            className="mb-1 block text-muted-foreground text-xs"
          >
            Event Type
          </label>
          <Input
            id="dlq-event-type"
            type="text"
            placeholder="e.g. workflow.triggered"
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
            className="w-52"
          />
        </div>
        <Button variant="outline" size="sm" onClick={handleApplyFilters}>
          Apply
        </Button>
      </div>

      {/* Bulk actions */}
      {events.length > 0 && (
        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBulkReplay}
            disabled={bulkBusy !== null || !isDestructiveAllowed}
            title={isDestructiveAllowed ? undefined : "Admin access required"}
            className={
              isDestructiveAllowed ? undefined : "cursor-not-allowed opacity-50"
            }
          >
            {bulkBusy === "replay" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            Replay All Filtered
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleBulkDiscard}
            disabled={bulkBusy !== null || !isDestructiveAllowed}
            title={isDestructiveAllowed ? undefined : "Admin access required"}
            className={
              isDestructiveAllowed ? undefined : "cursor-not-allowed opacity-50"
            }
          >
            {bulkBusy === "discard" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 h-4 w-4" />
            )}
            Discard All Filtered
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="-mx-8 mt-6 px-8 sm:mx-0 sm:px-0">
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 font-medium text-sm">Event Type</th>
                <th className="px-4 py-3 font-medium text-sm">Error Code</th>
                <th className="px-4 py-3 font-medium text-sm">Error Message</th>
                <th className="px-4 py-3 text-center font-medium text-sm">
                  Attempts
                </th>
                <th className="px-4 py-3 font-medium text-sm">Created</th>
                <th className="px-4 py-3 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                  </td>
                </tr>
              )}

              {!isLoading && isEventsError && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-muted-foreground"
                  >
                    <AlertCircle className="mx-auto mb-2 h-8 w-8" />
                    <p>Failed to load dead-letter events</p>
                    <p className="mt-1 text-xs">
                      Check your connection and try refreshing
                    </p>
                  </td>
                </tr>
              )}

              {!isLoading && !isEventsError && events.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-muted-foreground"
                  >
                    <Archive className="mx-auto mb-2 h-8 w-8" />
                    <p>No dead-letter events found</p>
                  </td>
                </tr>
              )}

              {events.map((event) => (
                <DlqRow
                  key={event.id}
                  event={event}
                  onMutate={invalidateAll}
                  isDestructiveAllowed={isDestructiveAllowed}
                  organizationId={organizationId!}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            Page {filters.page ?? 1} of {totalPages} ({total} total)
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={(filters.page ?? 1) <= 1}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: (prev.page ?? 1) - 1,
                }))
              }
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={(filters.page ?? 1) >= totalPages}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: (prev.page ?? 1) + 1,
                }))
              }
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
