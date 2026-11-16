import { ScrollArea } from "@omnidotdev/thornberry/scroll-area";

import type { ReactNode } from "react";

interface NodeConfigBodyProps {
  children: ReactNode;
}

export const NodeConfigBody = ({ children }: NodeConfigBodyProps) => {
  return (
    <ScrollArea className="flex-1">
      <div className="space-y-4 p-4">{children}</div>
    </ScrollArea>
  );
};
