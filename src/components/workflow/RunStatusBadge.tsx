import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type RunStatus = "pending" | "running" | "completed" | "failed" | "cancelled";

const statusConfig: Record<RunStatus, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  running: {
    label: "Running",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  failed: {
    label: "Failed",
    className: "bg-red-100 text-red-800 border-red-200",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-gray-100 text-gray-800 border-gray-200",
  },
};

interface RunStatusBadgeProps {
  status: string;
  className?: string;
}

export function RunStatusBadge({ status, className }: RunStatusBadgeProps) {
  const config = statusConfig[status as RunStatus] || {
    label: status,
    className: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}
