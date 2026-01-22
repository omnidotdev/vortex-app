import { useCallback, useEffect } from "react";

import { nodeConfigRegistry } from "./configs";
import { EmptyState } from "./EmptyState";
import { useAutoSave } from "./hooks/useAutoSave";
import { useNodeConfig } from "./hooks/useNodeConfig";
import { NodeConfigBody } from "./NodeConfigBody";
import { NodeConfigFooter } from "./NodeConfigFooter";
import { NodeConfigHeader } from "./NodeConfigHeader";

import type { Node } from "reactflow";

interface NodeConfigSidebarProps {
  selectedNode: Node | null;
  onNodeUpdate: (nodeId: string, data: Record<string, unknown>) => void;
  onNodeDelete: (nodeId: string) => void;
  onClose: () => void;
  workflowId?: string;
  webhookSecret?: string | null;
}

export const NodeConfigSidebar = ({
  selectedNode,
  onNodeUpdate,
  onNodeDelete,
  onClose,
  workflowId,
  webhookSecret,
}: NodeConfigSidebarProps) => {
  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedNode) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedNode, onClose]);

  // Early return for empty state
  if (!selectedNode) {
    return (
      <aside className="flex h-full w-80 shrink-0 flex-col border-l bg-background md:w-96">
        <EmptyState />
      </aside>
    );
  }

  return (
    <NodeConfigSidebarContent
      selectedNode={selectedNode}
      onNodeUpdate={onNodeUpdate}
      onNodeDelete={onNodeDelete}
      onClose={onClose}
      workflowId={workflowId}
      webhookSecret={webhookSecret}
    />
  );
};

// Separate component to use hooks with guaranteed selectedNode
const NodeConfigSidebarContent = ({
  selectedNode,
  onNodeUpdate,
  onNodeDelete,
  onClose,
  workflowId,
  webhookSecret,
}: Omit<NodeConfigSidebarProps, "selectedNode"> & { selectedNode: Node }) => {
  const nodeType = selectedNode.type || "";

  const { formData, handleChange, handleNestedChange } = useNodeConfig(
    selectedNode.data || {},
  );

  const { status } = useAutoSave({
    data: formData,
    nodeId: selectedNode.id,
    onSave: onNodeUpdate,
    debounceMs: 500,
  });

  const handleDelete = useCallback(() => {
    onNodeDelete(selectedNode.id);
    onClose();
  }, [selectedNode.id, onNodeDelete, onClose]);

  const handleLabelChange = useCallback(
    (label: string) => {
      handleChange("label", label);
    },
    [handleChange],
  );

  // Get the config component for this node type
  const ConfigComponent = nodeConfigRegistry[nodeType];

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col border-l bg-background md:w-96">
      <NodeConfigHeader
        nodeType={nodeType}
        label={(formData.label as string) || "Untitled"}
        onLabelChange={handleLabelChange}
        onClose={onClose}
        saveStatus={status}
      />

      <NodeConfigBody>
        {ConfigComponent ? (
          <ConfigComponent
            nodeId={selectedNode.id}
            data={formData}
            onChange={handleChange}
            onNestedChange={handleNestedChange}
            workflowId={workflowId}
            webhookSecret={webhookSecret}
          />
        ) : (
          <p className="text-muted-foreground text-sm">
            No configuration available for this node type.
          </p>
        )}
      </NodeConfigBody>

      <NodeConfigFooter
        onDelete={handleDelete}
        nodeLabel={(formData.label as string) || "this node"}
      />
    </aside>
  );
};
