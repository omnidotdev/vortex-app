import {
  Clock,
  GitFork,
  Layers,
  Play,
  Puzzle,
  Repeat,
  Route,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SaveIndicator } from "./SaveIndicator";

import type { SaveStatus } from "./hooks/useAutoSave";

const nodeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  triggerNode: Zap,
  actionNode: Play,
  conditionNode: GitFork,
  switchNode: Route,
  loopNode: Repeat,
  gateNode: ShieldCheck,
  delayNode: Clock,
  parallelNode: Layers,
  pluginNode: Puzzle,
};

const nodeLabels: Record<string, string> = {
  triggerNode: "Trigger",
  actionNode: "Action",
  conditionNode: "Condition",
  switchNode: "Switch",
  loopNode: "Loop",
  gateNode: "Gate",
  delayNode: "Delay",
  parallelNode: "Parallel",
  pluginNode: "Plugin",
};

interface NodeConfigHeaderProps {
  nodeType: string;
  label: string;
  onLabelChange: (label: string) => void;
  onClose: () => void;
  saveStatus: SaveStatus;
}

export const NodeConfigHeader = ({
  nodeType,
  label,
  onLabelChange,
  onClose,
  saveStatus,
}: NodeConfigHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(label);
  const inputRef = useRef<HTMLInputElement>(null);

  const Icon = nodeIcons[nodeType] || Play;
  const typeLabel = nodeLabels[nodeType] || nodeType.replace("Node", "");

  useEffect(() => {
    setEditValue(label);
  }, [label]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleFinishEdit = useCallback(() => {
    setIsEditing(false);
    if (editValue.trim() && editValue !== label) {
      onLabelChange(editValue.trim());
    } else {
      setEditValue(label);
    }
  }, [editValue, label, onLabelChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleFinishEdit();
      } else if (e.key === "Escape") {
        setEditValue(label);
        setIsEditing(false);
      }
    },
    [handleFinishEdit, label],
  );

  return (
    <div className="flex items-center gap-3 border-b px-4 py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
        <Icon className="h-4 w-4" />
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-2">
        {isEditing ? (
          <Input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleFinishEdit}
            onKeyDown={handleKeyDown}
            className="h-7 px-2 font-medium text-sm"
          />
        ) : (
          <button
            type="button"
            onClick={handleStartEdit}
            className="truncate text-left font-medium hover:underline"
          >
            {label || "Untitled"}
          </button>
        )}

        <Badge variant="secondary" className="shrink-0">
          {typeLabel}
        </Badge>

        <SaveIndicator status={saveStatus} />
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="shrink-0"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
