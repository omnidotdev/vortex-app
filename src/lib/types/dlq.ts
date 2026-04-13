/**
 * A dead-letter event returned by the DLQ REST API.
 */
type DlqEvent = {
  id: string;
  originalEventId: string;
  eventType: string;
  eventSource: string;
  eventData: Record<string, unknown>;
  error: string;
  errorCode: string;
  routingRuleId: string;
  attempts: number;
  lastAttemptAt: string | null;
  resolvedAt: string | null;
  organizationId: string;
  createdAt: string;
};

/**
 * Paginated list response from GET /api/v1/dlq.
 */
type DlqListResponse = {
  nodes: DlqEvent[];
  total: number;
  page: number;
  limit: number;
};

/**
 * Aggregate stats from GET /api/v1/dlq/stats.
 */
type DlqStats = {
  totalUnresolved: number;
  byErrorCode: { errorCode: string; count: number }[];
  byEventType: { eventType: string; count: number }[];
};

/**
 * Filter parameters for the DLQ list query.
 */
type DlqFilters = {
  page?: number;
  limit?: number;
  errorCode?: string;
  eventType?: string;
};

export type { DlqEvent, DlqFilters, DlqListResponse, DlqStats };
