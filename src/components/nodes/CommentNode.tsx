import { MessageSquare } from "lucide-react";
import { memo } from "react";

import { cn } from "@/lib/utils";

/** Color presets for comment nodes */
const COMMENT_COLORS = {
  yellow: {
    bg: "bg-yellow-50 dark:bg-yellow-950/50",
    border: "border-yellow-300 dark:border-yellow-700",
    icon: "text-yellow-600 dark:text-yellow-400",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/50",
    border: "border-blue-300 dark:border-blue-700",
    icon: "text-blue-600 dark:text-blue-400",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-950/50",
    border: "border-green-300 dark:border-green-700",
    icon: "text-green-600 dark:text-green-400",
  },
  pink: {
    bg: "bg-pink-50 dark:bg-pink-950/50",
    border: "border-pink-300 dark:border-pink-700",
    icon: "text-pink-600 dark:text-pink-400",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/50",
    border: "border-purple-300 dark:border-purple-700",
    icon: "text-purple-600 dark:text-purple-400",
  },
  gray: {
    bg: "bg-gray-50 dark:bg-gray-950/50",
    border: "border-gray-300 dark:border-gray-700",
    icon: "text-gray-600 dark:text-gray-400",
  },
} as const;

type CommentColor = keyof typeof COMMENT_COLORS;

interface CommentNodeData {
  label: string;
  note?: string;
  color?: CommentColor;
  onNodeSelect?: (node: {
    id: string;
    data: CommentNodeData;
    type: string;
  }) => void;
  onDelete?: () => void;
}

export const CommentNode = memo(
  ({ data, id }: { data: CommentNodeData; id: string }) => {
    const color = data.color ?? "yellow";
    const theme = COMMENT_COLORS[color];

    const handleNodeClick = () => {
      data.onNodeSelect?.({ id, data, type: "commentNode" });
    };

    return (
      <div
        className={cn(
          "min-w-[200px] max-w-[320px] rounded-lg border-2 border-dashed p-4",
          theme.bg,
          theme.border,
        )}
        onClick={handleNodeClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleNodeClick();
        }}
        role="button"
        tabIndex={0}
      >
        <div className="mb-2 flex items-center gap-2">
          <MessageSquare className={cn("h-4 w-4", theme.icon)} />
          <span className="font-medium text-sm">
            {data.label || "Comment"}
          </span>
        </div>

        {data.note && (
          <p className="whitespace-pre-wrap text-muted-foreground text-xs leading-relaxed">
            {data.note}
          </p>
        )}
      </div>
    );
  },
);

CommentNode.displayName = "CommentNode";
