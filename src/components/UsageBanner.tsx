import { Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";

type UsageBannerProps = {
  current: number;
  limit: number | null;
  label: string;
};

/**
 * Show a warning banner when usage approaches or reaches a plan limit.
 * Renders nothing when usage is below 80% or when the limit is null (unlimited).
 */
function UsageBanner({ current, limit, label }: UsageBannerProps) {
  if (limit === null) return null;

  const ratio = current / limit;

  if (ratio < 0.8) return null;

  const isAtLimit = current >= limit;

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm ${
        isAtLimit
          ? "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-200"
          : "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200"
      }`}
      role="alert"
    >
      <AlertTriangle className="h-4 w-4 shrink-0" />
      <p className="flex-1">
        {isAtLimit ? (
          <>
            {label} limit reached.{" "}
            <Link
              to="/pricing"
              className="font-medium underline underline-offset-2"
            >
              Upgrade to create more
            </Link>
            .
          </>
        ) : (
          <>
            You've used {current} of {limit} {label.toLowerCase()}.{" "}
            <Link
              to="/pricing"
              className="font-medium underline underline-offset-2"
            >
              Upgrade for more
            </Link>
            .
          </>
        )}
      </p>
    </div>
  );
}

export default UsageBanner;
