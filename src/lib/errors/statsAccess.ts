/**
 * Thrown when a stats endpoint returns 403 (forbidden).
 * Used to distinguish access-denied from other fetch errors so the UI
 * can show a friendly message instead of crashing.
 */
class StatsAccessError extends Error {
  readonly status = 403;

  constructor(path: string) {
    super(`Stats access denied (403): ${path}`);
    this.name = "StatsAccessError";
  }
}

export { StatsAccessError };
