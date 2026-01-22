import { Layers, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NodePicker } from "./NodePicker";

interface AddNodeButtonProps {
  organizationId: string;
  onAddNode: (type: string, data: Record<string, unknown>) => void;
}

export function AddNodeButton({
  organizationId,
  onAddNode,
}: AddNodeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectNode = (nodeData: {
    type: string;
    data: Record<string, unknown>;
  }) => {
    onAddNode(nodeData.type, nodeData.data);
    setIsOpen(false);
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="!h-14 !w-14 !rounded-full shadow-lg hover:shadow-xl"
        >
          <Plus className="!h-6 !w-6" />
          <span className="sr-only">Add Node</span>
        </Button>
      </DialogTrigger>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent className="h-[80vh] max-h-[700px] w-[95vw] max-w-[480px] overflow-hidden p-0">
          <DialogHeader className="border-b px-4 py-3">
            <DialogTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Add Node
            </DialogTitle>
          </DialogHeader>
          <DialogCloseTrigger />
          <div className="h-[calc(100%-57px)] overflow-hidden">
            <NodePicker
              organizationId={organizationId}
              onSelectNode={handleSelectNode}
            />
          </div>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}
