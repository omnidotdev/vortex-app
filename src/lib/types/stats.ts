/**
 * Organization-level execution stats from GET /api/v1/stats/organization.
 */
type OrgStats = {
  organizationId: string;
  period: { since: string; until: string };
  total: number;
  succeeded: number;
  failed: number;
  cancelled: number;
  activeWorkflows: number;
};

/**
 * A single data point in the execution timeline.
 */
type TimelineDataPoint = {
  timestamp: string;
  total: number;
  succeeded: number;
  failed: number;
};

/**
 * Timeline response from GET /api/v1/stats/timeline.
 */
type TimelineStats = {
  period: { since: string; until: string };
  bucket: "day" | "hour";
  data: TimelineDataPoint[];
};

/**
 * A single error entry from GET /api/v1/stats/errors.
 */
type StatsError = {
  error: string;
  workflowName: string;
  workflowId: string;
  occurrences: number;
  lastSeen: string;
};

/**
 * Errors response from GET /api/v1/stats/errors.
 */
type ErrorsStats = {
  errors: StatsError[];
};

/**
 * Per-workflow execution stats from GET /api/v1/stats/workflows/:workflowId.
 */
type WorkflowStats = {
  workflowId: string;
  period: { since: string; until: string };
  total: number;
  succeeded: number;
  failed: number;
  cancelled: number;
  avgDurationMs: number | null;
  p95DurationMs: number | null;
};

export type {
  ErrorsStats,
  OrgStats,
  StatsError,
  TimelineDataPoint,
  TimelineStats,
  WorkflowStats,
};
