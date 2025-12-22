import { useSuspenseQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  notFound,
  useNavigate,
} from "@tanstack/react-router";
import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import {
  useUpdateWorkflowMutation,
  useWorkflowQuery,
  useWorkflowsQuery,
} from "@/generated/graphql";
import workflowOptions from "@/lib/options/workflow.options";
import getQueryKeyPrefix from "@/lib/util/getQueryKeyPrefix";

import type { Connection, Node, Edge } from "reactflow";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/workflows/$workflowId",
)({
  loader: async ({ params, context: { queryClient, workspaceBySlug } }) => {
    if (!workspaceBySlug) throw notFound();

    await queryClient.ensureQueryData(
      workflowOptions({ rowId: params.workflowId }),
    );

    return { workspaceId: workspaceBySlug.rowId };
  },
  component: WorkflowEditorPage,
});

/**
 * Workflow editor page with ReactFlow.
 */
function WorkflowEditorPage() {
  const { workspaceSlug, workflowId } = Route.useParams();
  const navigate = useNavigate();

  const { data: workflow } = useSuspenseQuery({
    ...workflowOptions({ rowId: workflowId }),
    select: (data) => data?.workflow,
  });

  if (!workflow) throw notFound();

  const definition =
    (workflow.definition as { nodes?: Node[]; edges?: Edge[] }) || {};
  const initialNodes = definition.nodes || [];
  const initialEdges = definition.edges || [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate: updateWorkflow } = useUpdateWorkflowMutation({
    meta: {
      invalidates: [
        getQueryKeyPrefix(useWorkflowQuery),
        getQueryKeyPrefix(useWorkflowsQuery),
      ],
    },
    onSuccess: () => {
      setIsSaving(false);
    },
    onError: (err) => {
      setIsSaving(false);
      setError(err instanceof Error ? err.message : "Failed to save workflow");
    },
  });

  const onConnect = useCallback(
    (params: Connection) => {
      const edge = {
        ...params,
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: "#2563eb" },
      };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

  const handleSave = () => {
    setIsSaving(true);
    setError(null);

    updateWorkflow({
      input: {
        rowId: workflowId,
        patch: {
          definition: {
            nodes,
            edges,
            version: "1.0",
          },
        },
      },
    });
  };

  const handleAddNode = (type: string, label: string, color: string) => {
    const newNode: Node = {
      id: `node_${Date.now()}`,
      type: "default",
      position: { x: 250, y: nodes.length * 100 + 50 },
      data: { label, type, color },
      style: {
        background: color,
        color: "white",
        padding: 10,
        borderRadius: 5,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const stepTypes = [
    { type: "trigger", label: "Trigger", color: "#3b82f6" },
    { type: "action", label: "Action", color: "#22c55e" },
    { type: "condition", label: "Condition", color: "#eab308" },
    { type: "switch", label: "Switch", color: "#f97316" },
    { type: "loop", label: "Loop", color: "#a855f7" },
    { type: "gate", label: "Gate", color: "#ef4444" },
    { type: "delay", label: "Delay", color: "#6b7280" },
    { type: "parallel", label: "Parallel", color: "#6366f1" },
    { type: "plugin", label: "Plugin", color: "#ec4899" },
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center gap-4">
          <Link
            to="/workspaces/$workspaceSlug/workflows"
            params={{ workspaceSlug }}
            className="text-muted-foreground hover:text-foreground"
          >
            &larr; Back
          </Link>
          <h1 className="font-semibold">{workflow.name}</h1>
          <span
            className={`rounded-full px-2 py-0.5 text-xs ${
              workflow.isActive
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {workflow.isActive ? "Active" : "Inactive"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {error && <span className="text-sm text-red-500">{error}</span>}
          <button
            onClick={() =>
              navigate({
                to: "/workspaces/$workspaceSlug/workflows",
                params: { workspaceSlug },
              })
            }
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </header>

      {/* Editor */}
      <div className="flex flex-1">
        {/* Node palette */}
        <aside className="w-64 border-r bg-muted/30 p-4">
          <h2 className="text-sm font-medium text-muted-foreground">
            Step Types
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Click to add to canvas
          </p>
          <div className="mt-4 space-y-2">
            {stepTypes.map((step) => (
              <button
                key={step.type}
                onClick={() => handleAddNode(step.type, step.label, step.color)}
                className="flex w-full cursor-pointer items-center gap-2 rounded-md border bg-background p-2 text-sm hover:bg-accent"
              >
                <div
                  className="h-3 w-3 rounded"
                  style={{ backgroundColor: step.color }}
                />
                {step.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Canvas */}
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            className="bg-background"
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>

        {/* Properties panel */}
        <aside className="w-80 border-l bg-muted/30 p-4">
          <h2 className="text-sm font-medium text-muted-foreground">
            Workflow Info
          </h2>
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <label className="text-muted-foreground">Name</label>
              <p className="font-medium">{workflow.name}</p>
            </div>
            {workflow.description && (
              <div>
                <label className="text-muted-foreground">Description</label>
                <p>{workflow.description}</p>
              </div>
            )}
            <div>
              <label className="text-muted-foreground">Trigger</label>
              <p className="font-medium">{workflow.triggerType}</p>
            </div>
            {workflow.cronExpression && (
              <div>
                <label className="text-muted-foreground">Schedule</label>
                <p className="font-mono text-xs">{workflow.cronExpression}</p>
              </div>
            )}
            <div>
              <label className="text-muted-foreground">Nodes</label>
              <p className="font-medium">{nodes.length}</p>
            </div>
            <div>
              <label className="text-muted-foreground">Connections</label>
              <p className="font-medium">{edges.length}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
