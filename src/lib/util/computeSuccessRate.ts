/**
 * Compute success rate as a percentage of resolved (succeeded + failed) runs.
 * Pending, running, and cancelled runs are excluded from the denominator
 * so they don't artificially deflate the rate.
 * @param succeeded - Count of succeeded/completed runs.
 * @param failed - Count of failed runs.
 * @returns Success rate as a percentage (0-100), or 0 when no runs have resolved.
 */
function computeSuccessRate(succeeded: number, failed: number): number {
  const resolved = succeeded + failed;

  if (resolved <= 0) return 0;

  return (succeeded / resolved) * 100;
}

export default computeSuccessRate;
