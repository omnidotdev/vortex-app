import { MousePointer2 } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <MousePointer2 className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 font-medium">Select a node</h3>
      <p className="text-muted-foreground text-sm">
        Click on a node in the canvas to configure it
      </p>
    </div>
  );
};
