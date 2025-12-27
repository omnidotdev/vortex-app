import { AlertCircle, Check, Loader2 } from "lucide-react";

import type { SaveStatus } from "./hooks/useAutoSave";

interface SaveIndicatorProps {
  status: SaveStatus;
}

export const SaveIndicator = ({ status }: SaveIndicatorProps) => {
  if (status === "idle") return null;

  return (
    <div className="flex items-center gap-1.5 text-xs">
      {status === "saving" && (
        <>
          <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
          <span className="text-muted-foreground">Saving...</span>
        </>
      )}
      {status === "saved" && (
        <>
          <Check className="h-3 w-3 text-green-500" />
          <span className="text-green-500">Saved</span>
        </>
      )}
      {status === "error" && (
        <>
          <AlertCircle className="h-3 w-3 text-destructive" />
          <span className="text-destructive">Failed</span>
        </>
      )}
    </div>
  );
};
