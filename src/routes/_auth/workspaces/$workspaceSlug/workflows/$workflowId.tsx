import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Link,
  createFileRoute,
  notFound,
  useNavigate,
} from "@tanstack/react-router";
import { Grid3X3, Loader2, PlayCircle, Save } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
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

import DebugPane from "@/components/DebugPane";
import { ActionNode } from "@/components/nodes/ActionNode";
import { CodeNode } from "@/components/nodes/CodeNode";
import { ConditionNode } from "@/components/nodes/ConditionNode";
import { DatabaseNode } from "@/components/nodes/DatabaseNode";
import { DelayNode } from "@/components/nodes/DelayNode";
import { GateNode } from "@/components/nodes/GateNode";
import { LLMNode } from "@/components/nodes/LLMNode";
import { LoopNode } from "@/components/nodes/LoopNode";
import { MCPNode } from "@/components/nodes/MCPNode";
import { ParallelNode } from "@/components/nodes/ParallelNode";
import { PluginNode } from "@/components/nodes/PluginNode";
import { SwitchNode } from "@/components/nodes/SwitchNode";
import { TriggerNode } from "@/components/nodes/TriggerNode";
import { Button } from "@/components/ui/button";
import WorkflowSidebar from "@/components/WorkflowSidebar";
import { NodeConfigSidebar } from "@/components/workflow/NodeConfigSidebar";
import {
  useUpdateWorkflowMutation,
  useWorkflowQuery,
  useWorkflowsQuery,
} from "@/generated/graphql";
import workflowOptions from "@/lib/options/workflow.options";
import { NodeTypes } from "@/lib/schema";
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
  mcpNode: MCPNode,
  llmNode: LLMNode,
  codeNode: CodeNode,
  databaseNode: DatabaseNode,
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
  mcp: "mcpNode",
  llm: "llmNode",
  code: "codeNode",
  database: "databaseNode",
};

let nodeIdCounter = 0;
const getNodeId = () => `node_${Date.now()}_${nodeIdCounter++}`;

/**
 * Workflow editor page with ReactFlow, drag-and-drop, node configuration, and debug pane.
 */
function WorkflowEditorPage() {
  const { workspaceSlug, workflowId } = Route.useParams();
  const { workspaceId } = Route.useLoaderData();
  const _navigate = useNavigate();

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
  const [snapToGrid, setSnapToGrid] = useState(true);
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
            const caseIndex = parseInt(parts[1], 10);
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

    // Extract trigger configuration from trigger node
    const triggerNode = nodes.find((n) => n.type === "triggerNode");
    const triggerType = triggerNode?.data?.triggerType || "manual";
    const triggerConfig = triggerNode?.data?.config || {};

    // Build patch with trigger-specific fields
    const patch: Record<string, unknown> = {
      definition: {
        nodes,
        edges,
        version: "1.0",
      },
    };

    // Set cron expression if trigger is cron
    if (triggerType === "cron" && triggerConfig.expression) {
      patch.cronExpression = triggerConfig.expression;
    } else {
      patch.cronExpression = null;
    }

    // Generate webhook secret if trigger is webhook and none exists
    if (triggerType === "webhook" && !workflow.webhookSecret) {
      patch.webhookSecret = crypto.randomUUID();
    }

    updateWorkflow({
      input: {
        rowId: workflowId,
        patch,
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
        // TODO vendor agnostic
        logToDebugPane("action", "Workflow executed via executor", result, {
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

  // Execute connected actions from a trigger node
  const executeConnectedActions = useCallback(
    async (triggerId: string) => {
      // Find all edges that start from this trigger
      const connectedEdges = edgesRef.current.filter(
        (edge) => edge.source === triggerId,
      );

      for (const edge of connectedEdges) {
        const targetNode = nodesRef.current.find((n) => n.id === edge.target);
        if (targetNode) {
          logToDebugPane(
            "action",
            `Executing: ${targetNode.data.label}`,
            targetNode.data,
            {
              nodeType: targetNode.type,
              nodeName: targetNode.data.label,
              expectedOutcome: `Execute ${targetNode.data.label} action`,
            },
          );

          // Execute action based on type
          if (targetNode.data.label === "Browser Alert") {
            const message =
              targetNode.data.config?.message ||
              targetNode.data.description ||
              "Browser alert triggered!";
            alert(message);
          } else if (targetNode.data.label === "HTTP Call") {
            const url =
              targetNode.data.config?.url || "https://httpbin.org/get";
            const method = targetNode.data.config?.method || "GET";
            try {
              const response = await fetch(url, { method });
              const result = await response.text();
              logToDebugPane("action", `HTTP ${method} ${response.status}`, {
                url,
                status: response.status,
                response: result.substring(0, 200),
              });
            } catch (err) {
              logToDebugPane("action", "HTTP Call failed", {
                error: err instanceof Error ? err.message : "Unknown error",
              });
            }
          }

          // Recursively execute connected actions
          await executeConnectedActions(targetNode.id);
        }
      }
    },
    [logToDebugPane],
  );

  // Handle node deletion
  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((n) => n.id !== nodeId));
      setEdges((eds) =>
        eds.filter((e) => e.source !== nodeId && e.target !== nodeId),
      );
      if (selectedNode?.id === nodeId) {
        setSelectedNode(null);
      }
      logToDebugPane("action", "Node deleted", { nodeId });
    },
    [setNodes, setEdges, selectedNode, logToDebugPane],
  );

  // Handle drag over for drop zone
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handle drop to create node at drop position
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

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

        // screenToFlowPosition expects screen coordinates (clientX/Y), not relative
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        const nodeId = getNodeId();
        const newNode: Node = {
          id: nodeId,
          type: nodeType,
          position,
          data: {
            label,
            description,
            iconName,
            config,
            onDelete: () => handleDeleteNode(nodeId),
            executeConnectedActions:
              nodeType === "triggerNode" ? executeConnectedActions : undefined,
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
    [
      reactFlowInstance,
      setNodes,
      logToDebugPane,
      handleDeleteNode,
      executeConnectedActions,
    ],
  );

  // Handle node click to open config panel
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Keyboard delete support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === "Delete" || event.key === "Backspace") &&
        selectedNode &&
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLTextAreaElement)
      ) {
        handleDeleteNode(selectedNode.id);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedNode, handleDeleteNode]);

  // Handle node update from config sidebar (auto-save)
  const handleNodeUpdate = useCallback(
    (nodeId: string, data: Record<string, unknown>) => {
      setNodes((nds) => nds.map((n) => (n.id === nodeId ? { ...n, data } : n)));
      // Don't close panel - auto-save keeps it open
    },
    [setNodes],
  );

  // Handle adding node from sidebar (click, not drag)
  const handleAddNode = useCallback(
    (
      type: string,
      data: { label: string; description: string; iconName?: string },
    ) => {
      const nodeId = getNodeId();
      const newNode: Node = {
        id: nodeId,
        type,
        position: { x: 250, y: nodes.length * 100 + 50 },
        data: {
          ...data,
          config: {},
          onDelete: () => handleDeleteNode(nodeId),
        },
      };
      setNodes((nds) => [...nds, newNode]);

      logToDebugPane("action", "Node added via sidebar", data, {
        nodeType: type,
        nodeName: data.label,
        expectedOutcome: `Added ${data.label} node to workflow`,
      });
    },
    [nodes.length, setNodes, logToDebugPane, handleDeleteNode],
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
            variant={snapToGrid ? "default" : "outline"}
            size="sm"
            onClick={() => setSnapToGrid(!snapToGrid)}
          >
            <Grid3X3 className="mr-1 h-4 w-4" />
            Snap
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExecute}
            disabled={isExecuting}
          >
            {isExecuting ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              <PlayCircle className="mr-1 h-4 w-4" />
            )}
            Execute
          </Button>

          <Button size="sm" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-1 h-4 w-4" />
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
          workspaceId={workspaceId}
          workspaceSlug={workspaceSlug}
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
              snapToGrid={snapToGrid}
              snapGrid={[15, 15]}
              fitView
              className="bg-background"
              proOptions={{
                // ? look into legality, replace xyflow if an issue
                hideAttribution: true,
              }}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>

          {/* Debug Pane at bottom */}
          <DebugPane />
        </div>

        {/* Right sidebar - Node config or Workflow info */}
        {selectedNode ? (
          <NodeConfigSidebar
            selectedNode={selectedNode}
            onNodeUpdate={handleNodeUpdate}
            onNodeDelete={handleDeleteNode}
            onClose={() => setSelectedNode(null)}
            workflowId={workflowId}
            webhookSecret={workflow.webhookSecret}
          />
        ) : (
          <aside className="w-100 shrink-0 overflow-y-auto border-l bg-muted/30 p-4">
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
                <p className="font-medium">
                  {nodes.find((n) => n.type === "triggerNode")?.data
                    ?.triggerType || "manual"}
                </p>
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
        )}
      </div>
    </div>
  );
}
