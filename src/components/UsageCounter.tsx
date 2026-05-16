import { cn } from "@/lib/utils";

type UsageCounterProps = {
  current: number;
  limit: number | null;
  className?: string;
};

/**
 * Display a usage count with an optional plan limit and progress bar.
 * When limit is null (unlimited), only the current count is shown.
 */
function UsageCounter({ current, limit, className }: UsageCounterProps) {
  if (limit === null) {
    return (
      <p className={cn("mt-2 font-bold text-3xl", className)}>{current}</p>
    );
  }

  const ratio = current / limit;
  const barColor =
    ratio >= 1 ? "bg-red-500" : ratio >= 0.8 ? "bg-amber-500" : "bg-primary";

  return (
    <div className={className}>
      <p className="mt-2 font-bold text-3xl">
        {current}{" "}
        <span className="font-normal text-lg text-muted-foreground">
          / {limit}
        </span>
      </p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all", barColor)}
          style={{ width: `${Math.min(ratio * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}

export default UsageCounter;
