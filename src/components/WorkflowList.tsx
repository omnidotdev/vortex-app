import { Edit, Play, Plus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Workflow {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface WorkflowListProps {
  workflows?: Workflow[];
  isLoading?: boolean;
  onCreateClick?: () => void;
  onEditClick?: (workflowId: string) => void;
  onExecuteClick?: (workflowId: string) => void;
  onDeleteClick?: (workflowId: string) => void;
}

export function WorkflowList({
  workflows = [],
  isLoading = false,
  onCreateClick,
  onEditClick,
  onExecuteClick,
  onDeleteClick,
}: WorkflowListProps) {
  const handleDelete = (workflowId: string, workflowName: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${workflowName}"? This action cannot be undone.`,
      )
    ) {
      onDeleteClick?.(workflowId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <span className="ml-2 text-lg">Loading workflows...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-2xl">My Workflows</h2>
          <p className="text-muted-foreground">
            Manage your automation workflows
          </p>
        </div>
        <Button onClick={onCreateClick} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Workflow
        </Button>
      </div>

      {/* Workflows Grid */}
      {workflows.length === 0 ? (
        <Card className="p-8 text-center">
          <CardContent className="space-y-4">
            <div className="text-muted-foreground">
              <h3 className="mb-2 font-medium text-lg">No workflows yet</h3>
              <p>Create your first workflow to get started with automation.</p>
            </div>
            <Button onClick={onCreateClick} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Workflow
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workflows.map((workflow) => (
            <Card
              key={workflow.id}
              className="transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    {workflow.description && (
                      <CardDescription className="line-clamp-2">
                        {workflow.description}
                      </CardDescription>
                    )}
                  </div>
                  <Badge variant={workflow.isActive ? "default" : "secondary"}>
                    {workflow.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Workflow Stats */}
                <div className="text-muted-foreground text-sm">
                  <p>
                    Created: {new Date(workflow.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    Updated: {new Date(workflow.updatedAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEditClick?.(workflow.id)}
                    className="flex-1 gap-1"
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>

                  {workflow.isActive && (
                    <Button
                      size="sm"
                      onClick={() => onExecuteClick?.(workflow.id)}
                      className="flex-1 gap-1"
                    >
                      <Play className="h-3 w-3" />
                      Run
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(workflow.id, workflow.name)}
                    className="gap-1"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkflowList;
