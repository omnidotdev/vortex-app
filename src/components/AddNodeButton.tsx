import { Layers, Plus } from "lucide-react";
import { useRef, useState } from "react";

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
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddNodeButton({
  organizationId,
  onAddNode,
  open: controlledOpen,
  onOpenChange,
}: AddNodeButtonProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleOpenChange = (open: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(open);
    }
    onOpenChange?.(open);
  };

  const handleSelectNode = (nodeData: {
    type: string;
    data: Record<string, unknown>;
  }) => {
    onAddNode(nodeData.type, nodeData.data);
    handleOpenChange(false);
  };

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(e) => handleOpenChange(e.open)}
      initialFocusEl={() => searchInputRef.current}
    >
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
          <DialogHeader className="px-4 py-2">
            <DialogTitle className="flex items-center gap-2 text-base">
              <Layers className="h-4 w-4" />
              Add Node
            </DialogTitle>
          </DialogHeader>
          <DialogCloseTrigger />
          <div className="h-[calc(100%-41px)] overflow-hidden">
            <NodePicker
              organizationId={organizationId}
              onSelectNode={handleSelectNode}
              searchInputRef={searchInputRef}
            />
          </div>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}
