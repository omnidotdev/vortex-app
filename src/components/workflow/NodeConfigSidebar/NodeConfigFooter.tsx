import { Button } from "@omnidotdev/thornberry/button";
import { ConfirmDialog } from "@omnidotdev/thornberry/confirm-dialog";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface NodeConfigFooterProps {
  onDelete: () => void;
  nodeLabel?: string;
}

export const NodeConfigFooter = ({
  onDelete,
  nodeLabel = "this node",
}: NodeConfigFooterProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="border-t p-4">
      <Button
        variant="destructive"
        className="w-full"
        onClick={() => setConfirmOpen(true)}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete Node
      </Button>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={`Delete node "${nodeLabel}"?`}
        description="This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => {
          setConfirmOpen(false);
          onDelete();
        }}
      />
    </div>
  );
};
