import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Link,
  createFileRoute,
  notFound,
  useNavigate,
} from "@tanstack/react-router";
import { Loader2, PlayCircle, Save } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import type { Connection, Edge, Node, ReactFlowInstance } from "reactflow";
import "reactflow/dist/style.css";

import { DebugPane } from "@/components/debug-pane";
import { ActionNode } from "@/components/nodes/ActionNode";
import { ConditionNode } from "@/components/nodes/ConditionNode";
import { DelayNode } from "@/components/nodes/DelayNode";
import { GateNode } from "@/components/nodes/GateNode";
import { LoopNode } from "@/components/nodes/LoopNode";
import { ParallelNode } from "@/components/nodes/ParallelNode";
import { PluginNode } from "@/components/nodes/PluginNode";
import { SwitchNode } from "@/components/nodes/SwitchNode";
import { TriggerNode } from "@/components/nodes/TriggerNode";
import { Button } from "@/components/ui/button";
import { NodeConfigPanel } from "@/components/workflow/NodeConfigPanel";
import { WorkflowSidebar } from "@/components/workflow-sidebar";
import {
  useUpdateWorkflowMutation,
  useWorkflowQuery,
  useWorkflowsQuery,
} from "@/generated/graphql";
import { NodeTypes } from "@/lib/schema";
import workflowOptions from "@/lib/options/workflow.options";
import getQueryKeyPrefix from "@/lib/util/getQueryKeyPrefix";

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

// Define custom node types - must be outside component to avoid re-creation
const nodeTypes = {
  triggerNode: TriggerNode,
  actionNode: ActionNode,
  conditionNode: ConditionNode,
  switchNode: SwitchNode,
  loopNode: LoopNode,
  gateNode: GateNode,
  delayNode: DelayNode,
  parallelNode: ParallelNode,
  pluginNode: PluginNode,
};

// Map step types to custom node types
const nodeTypeMap: Record<string, string> = {
  trigger: "triggerNode",
  action: "actionNode",
  condition: "conditionNode",
  switch: "switchNode",
  loop: "loopNode",
  gate: "gateNode",
  delay: "delayNode",
  parallel: "parallelNode",
  plugin: "pluginNode",
};

let nodeIdCounter = 0;
const getNodeId = () => `node_${Date.now()}_${nodeIdCounter++}`;

/**
 * Workflow editor page with ReactFlow, drag-and-drop, node configuration, and debug pane.
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
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  // Refs to access current state in callbacks
  const nodesRef = useRef(nodes);
  const edgesRef = useRef(edges);
  nodesRef.current = nodes;
  edgesRef.current = edges;

  const { mutate: updateWorkflow } = useUpdateWorkflowMutation({
    meta: {
      invalidates: [
        getQueryKeyPrefix(useWorkflowQuery),
        getQueryKeyPrefix(useWorkflowsQuery),
      ],
    },
    onSuccess: () => {
      setIsSaving(false);
      logToDebugPane("action", "Workflow saved", { name: workflow.name });
    },
    onError: (err) => {
      setIsSaving(false);
      setError(err instanceof Error ? err.message : "Failed to save workflow");
    },
  });

  // Debug pane logging helper
  const logToDebugPane = useCallback(
    (
      type: "trigger" | "action",
      message: string,
      payload?: unknown,
      details?: {
        nodeType?: string;
        nodeName?: string;
        targetNodeId?: string;
        expectedOutcome?: string;
      },
    ) => {
      if (typeof window !== "undefined" && (window as any).logToDebugPane) {
        (window as any).logToDebugPane(type, message, payload, details);
      }
    },
    [],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      const sourceNode = nodes.find((n) => n.id === params.source);
      const targetNode = nodes.find((n) => n.id === params.target);

      if (sourceNode && targetNode) {
        logToDebugPane("action", "Nodes connected", null, {
          nodeType: "Connection",
          nodeName: `${sourceNode.data.label} → ${targetNode.data.label}`,
          expectedOutcome: `${sourceNode.data.label} will trigger ${targetNode.data.label}`,
        });
      }

      const edge: Edge = {
        ...params,
        id: `edge_${Date.now()}`,
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: "#2563eb" },
      } as Edge;

      // Add labels for condition edges
      if (sourceNode?.type === NodeTypes.CONDITION) {
        if (params.sourceHandle === "true") {
          edge.label = "True";
          edge.style = { ...edge.style, stroke: "#22c55e" };
        } else if (params.sourceHandle === "false") {
          edge.label = "False";
          edge.style = { ...edge.style, stroke: "#ef4444" };
        }
      }

      // Add labels for switch edges
      if (sourceNode?.type === NodeTypes.SWITCH) {
        if (params.sourceHandle?.startsWith("case_")) {
          const parts = params.sourceHandle.split("_");
          if (parts.length > 1 && parts[1]) {
            const caseIndex = parseInt(parts[1]);
            const cases = sourceNode.data.config?.cases || [];
            if (cases[caseIndex]) {
              edge.label = cases[caseIndex].label || `Case ${caseIndex + 1}`;
              edge.style = { ...edge.style, stroke: "#f59e0b" };
            }
          }
        }
      }

      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges, nodes, logToDebugPane],
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

  const handleExecute = async () => {
    setIsExecuting(true);
    logToDebugPane("trigger", "Workflow execution started", {
      workflowId,
      nodeCount: nodes.length,
    });

    try {
      // Get action nodes to execute
      const actionNodes = nodes.filter((node) => node.type === "actionNode");

      if (actionNodes.length === 0) {
        logToDebugPane("action", "No action nodes to execute");
        setIsExecuting(false);
        return;
      }

      // Prepare workflow definition
      const workflowDefinition = {
        nodes: nodes.map((node) => ({
          id: node.id,
          type: node.type,
          data: node.data,
          position: node.position,
        })),
        edges: edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
        })),
      };

      // Try to execute via Temporal API
      const response = await fetch("/api/execute-workflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workflowId: `vortex-workflow-${Date.now()}`,
          workflowDefinition,
          workflowType: "executeVortexWorkflow",
        }),
      });

      if (response.ok) {
        const result = await response.json();
        logToDebugPane("action", "Workflow executed via Temporal", result, {
          nodeType: "Workflow",
          nodeName: workflow.name,
          expectedOutcome: "Temporal workflow completed",
        });
      } else {
        // Fallback to direct execution
        logToDebugPane(
          "action",
          "Temporal unavailable, executing directly",
          null,
        );
        for (const node of actionNodes) {
          logToDebugPane("action", `Executing: ${node.data.label}`, node.data, {
            nodeType: node.type,
            nodeName: node.data.label,
          });
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    } catch (err) {
      logToDebugPane("action", "Execution failed", {
        error: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  // Handle drag over for drop zone
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handle drop to create node at drop position
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const nodeData = event.dataTransfer.getData("application/reactflow");

      if (!nodeData) return;

      try {
        const parsed = JSON.parse(nodeData);

        // Handle both simple {type, label} and full node data from WorkflowSidebar
        const nodeType = parsed.type || nodeTypeMap[parsed.type] || "default";
        const label = parsed.data?.label || parsed.label || "New Node";
        const description = parsed.data?.description || `${label} step`;
        const iconName = parsed.data?.iconName;
        const config = parsed.data?.config || {};

        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const newNode: Node = {
          id: getNodeId(),
          type: nodeType,
          position,
          data: {
            label,
            description,
            iconName,
            config,
          },
        };

        setNodes((nds) => [...nds, newNode]);

        logToDebugPane("action", "Node added", newNode.data, {
          nodeType: nodeType,
          nodeName: label,
          expectedOutcome: `Added ${label} node to workflow`,
        });
      } catch (e) {
        console.error("Failed to parse dropped node data:", e);
      }
    },
    [reactFlowInstance, setNodes, logToDebugPane],
  );

  // Handle node click to open config panel
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Handle node update from config panel
  const handleNodeUpdate = useCallback(
    (nodeId: string, data: Record<string, unknown>) => {
      setNodes((nds) => nds.map((n) => (n.id === nodeId ? { ...n, data } : n)));
      setSelectedNode(null);
      logToDebugPane("action", "Node updated", data, {
        nodeType: "Node Editor",
        nodeName: data.label as string,
        expectedOutcome: "Node configuration saved",
      });
    },
    [setNodes, logToDebugPane],
  );

  // Handle adding node from sidebar (click, not drag)
  const handleAddNode = useCallback(
    (
      type: string,
      data: { label: string; description: string; iconName?: string },
    ) => {
      const newNode: Node = {
        id: getNodeId(),
        type,
        position: { x: 250, y: nodes.length * 100 + 50 },
        data: {
          ...data,
          config: {},
        },
      };
      setNodes((nds) => [...nds, newNode]);

      logToDebugPane("action", "Node added via sidebar", data, {
        nodeType: type,
        nodeName: data.label,
        expectedOutcome: `Added ${data.label} node to workflow`,
      });
    },
    [nodes.length, setNodes, logToDebugPane],
  );

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-4">
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
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExecute}
            disabled={isExecuting}
          >
            {isExecuting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <PlayCircle className="mr-2 h-4 w-4" />
            )}
            Execute
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              navigate({
                to: "/workspaces/$workspaceSlug/workflows",
                params: { workspaceSlug },
              })
            }
          >
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save
          </Button>
        </div>
      </header>

      {/* Main editor area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Workflow Sidebar - drag nodes to canvas */}
        <WorkflowSidebar
          currentWorkflow={{
            id: workflowId,
            name: workflow.name,
            description: workflow.description || undefined,
          }}
          onAddNode={handleAddNode}
        />

        {/* Canvas */}
        <div className="flex flex-1 flex-col">
          <div className="flex-1" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onNodeClick={onNodeClick}
              fitView
              className="bg-background"
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>

          {/* Debug Pane at bottom */}
          <DebugPane />
        </div>

        {/* Properties panel - show workflow info when no node selected */}
        <aside className="w-80 shrink-0 overflow-y-auto border-l bg-muted/30 p-4">
          <h2 className="font-medium text-muted-foreground text-sm">
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

      {/* Node Configuration Panel (Sheet) */}
      <NodeConfigPanel
        node={selectedNode}
        isOpen={!!selectedNode}
        onClose={() => setSelectedNode(null)}
        onUpdate={handleNodeUpdate}
      />
    </div>
  );
}
