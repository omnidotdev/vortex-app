import { ShieldAlert } from "lucide-react";

/**
 * Placeholder shown when stats endpoints return 403.
 * Indicates the user lacks permission or the feature is not available
 * on their current plan.
 */
function StatsAccessDenied() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border py-12 text-center text-muted-foreground">
      <ShieldAlert className="h-8 w-8" />
      <p className="font-medium text-sm">Monitoring data is not available</p>
      <p className="max-w-sm text-xs">
        Your current plan or permissions do not include access to execution
        stats. Contact your workspace admin or upgrade your plan.
      </p>
    </div>
  );
}

export default StatsAccessDenied;
