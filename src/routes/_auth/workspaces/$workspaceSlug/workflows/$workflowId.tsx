import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Link,
  createFileRoute,
  notFound,
  useNavigate,
} from "@tanstack/react-router";
import {
  Copy,
  Grid3X3,
  History,
  Loader2,
  PanelRightClose,
  PlayCircle,
  Plus,
  Save,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Background,
  ConnectionLineType,
  Controls,
  MarkerType,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";

import type { Connection, Edge, Node, ReactFlowInstance } from "reactflow";
import "reactflow/dist/style.css";

import { AddNodeButton } from "@/components/AddNodeButton";
import DebugPane from "@/components/DebugPane";
import { SmartEdge } from "@/components/edges/SmartEdge";
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
import ThemeToggle from "@/components/ThemeToggle";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { NodeConfigSidebar } from "@/components/workflow/NodeConfigSidebar";
import { WorkflowRunsPanel } from "@/components/workflow/WorkflowRunsPanel";
import {
  useDeleteWorkflowMutation,
  useUpdateWorkflowMutation,
  useWorkflowQuery,
  useWorkflowsQuery,
} from "@/generated/graphql";
import workflowOptions from "@/lib/options/workflow.options";
import { NodeTypes } from "@/lib/schema";
import getQueryKeyPrefix from "@/lib/util/getQueryKeyPrefix";
import {
  ensureStepNames,
  generateUniqueStepName,
  getNodeBaseName,
} from "@/lib/workflow/stepNames";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/workflows/$workflowId",
)({
  loader: async ({ params, context: { queryClient, organizationId } }) => {
    if (!organizationId) throw notFound();

    await queryClient.ensureQueryData(
      workflowOptions({ rowId: params.workflowId }),
    );

    return { organizationId };
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

// Define custom edge types - must be outside component to avoid re-creation
const edgeTypes = {
  smart: SmartEdge,
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
  const { organizationId } = Route.useLoaderData();
  const navigate = useNavigate();

  const { data: workflow } = useSuspenseQuery({
    ...workflowOptions({ rowId: workflowId }),
    select: (data) => data?.workflow,
  });

  if (!workflow) throw notFound();

  const definition =
    (workflow.definition as { nodes?: Node[]; edges?: Edge[] }) || {};
  // Ensure all nodes have step names (for backwards compatibility with old workflows)
  const initialNodes = ensureStepNames(definition.nodes || []);
  const initialEdges = definition.edges || [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isSaving, setIsSaving] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showRunsPanel, setShowRunsPanel] = useState(false);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    type: "node" | "edge" | "pane";
    nodeId?: string;
    edgeId?: string;
  } | null>(null);
  const [showAddNodeDialog, setShowAddNodeDialog] = useState(false);
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

  const { mutate: deleteWorkflow, isPending: isDeleting } =
    useDeleteWorkflowMutation({
      meta: {
        invalidates: [getQueryKeyPrefix(useWorkflowsQuery)],
      },
      onSuccess: () => {
        navigate({
          to: "/workspaces/$workspaceSlug/workflows",
          params: { workspaceSlug },
        });
      },
      onError: (err) => {
        setError(
          err instanceof Error ? err.message : "Failed to delete workflow",
        );
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
        type: "smart",
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: "#2563eb", strokeWidth: 2 },
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

  const handleExecute = useCallback(async () => {
    setIsExecuting(true);
    logToDebugPane("trigger", "Workflow execution started", {
      workflowId,
      nodeCount: nodesRef.current.length,
    });

    try {
      // Get action nodes to execute
      const currentNodes = nodesRef.current;
      const currentEdges = edgesRef.current;
      const actionNodes = currentNodes.filter(
        (node) => node.type === "actionNode",
      );

      if (actionNodes.length === 0) {
        logToDebugPane("action", "No action nodes to execute");
        setIsExecuting(false);
        return;
      }

      // Prepare workflow definition
      const workflowDefinition = {
        nodes: currentNodes.map((node) => ({
          id: node.id,
          type: node.type,
          data: node.data,
          position: node.position,
        })),
        edges: currentEdges.map((edge) => ({
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
          organizationId, // Include org ID for credential lookup
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
        // fall back to direct execution
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
  }, [workflowId, organizationId, workflow.name, logToDebugPane]);

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

  // Handle integration configuration - navigate to integrations page to connect
  const handleConfigureIntegration = useCallback(
    (integrationDefinitionId: string) => {
      const returnTo = encodeURIComponent(window.location.pathname);
      navigate({
        to: "/workspaces/$workspaceSlug/integrations",
        params: { workspaceSlug },
        search: { connect: integrationDefinitionId, returnTo },
      });
    },
    [navigate, workspaceSlug],
  );

  // Handle opening integration settings - navigate to specific integration's settings
  const handleOpenIntegrationSettings = useCallback(
    (integrationInstanceId: string) => {
      navigate({
        to: "/workspaces/$workspaceSlug/integrations/$integrationId",
        params: { workspaceSlug, integrationId: integrationInstanceId },
      });
    },
    [navigate, workspaceSlug],
  );

  // Enrich nodes loaded from database with callbacks
  // This runs once when the component mounts to add execute handlers to trigger nodes
  useEffect(() => {
    setNodes((currentNodes) =>
      currentNodes.map((node) => {
        const needsCallbacks =
          !node.data.onDelete ||
          !node.data.onConfigureIntegration ||
          !node.data.onOpenIntegrationSettings;
        if (!needsCallbacks && node.type !== "triggerNode") return node;

        if (node.type === "triggerNode" && !node.data.onExecuteWorkflow) {
          return {
            ...node,
            data: {
              ...node.data,
              onExecuteWorkflow: handleExecute,
              onDelete: () => handleDeleteNode(node.id),
              onConfigureIntegration: handleConfigureIntegration,
              onOpenIntegrationSettings: handleOpenIntegrationSettings,
            },
          };
        }
        if (needsCallbacks) {
          return {
            ...node,
            data: {
              ...node.data,
              onDelete: () => handleDeleteNode(node.id),
              onConfigureIntegration: handleConfigureIntegration,
              onOpenIntegrationSettings: handleOpenIntegrationSettings,
            },
          };
        }
        return node;
      }),
    );
  }, [
    setNodes,
    handleExecute,
    handleDeleteNode,
    handleConfigureIntegration,
    handleOpenIntegrationSettings,
  ]);

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

        // Generate a unique step name based on the label
        // We use nodesRef.current to get the latest nodes for uniqueness check
        const stepName = generateUniqueStepName(label, nodesRef.current);

        const newNode: Node = {
          id: nodeId,
          type: nodeType,
          position,
          data: {
            label,
            stepName,
            description,
            iconName,
            config,
            // Include any integration/plugin info from the dropped data
            ...(parsed.data?.integrationDefinitionId && {
              integrationDefinitionId: parsed.data.integrationDefinitionId,
            }),
            ...(parsed.data?.pluginId && { pluginId: parsed.data.pluginId }),
            ...(parsed.data?.operation && { operation: parsed.data.operation }),
            onDelete: () => handleDeleteNode(nodeId),
            onConfigureIntegration: handleConfigureIntegration,
            onOpenIntegrationSettings: handleOpenIntegrationSettings,
            executeConnectedActions:
              nodeType === "triggerNode" ? executeConnectedActions : undefined,
            onExecuteWorkflow:
              nodeType === "triggerNode" ? handleExecute : undefined,
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
      handleConfigureIntegration,
      handleOpenIntegrationSettings,
      executeConnectedActions,
      handleExecute,
    ],
  );

  // Handle node click to open config panel
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setContextMenu(null);
  }, []);

  // Handle node context menu (right-click)
  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        type: "node",
        nodeId: node.id,
      });
      setSelectedNode(node);
    },
    [],
  );

  // Handle edge context menu (right-click)
  const onEdgeContextMenu = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      event.preventDefault();
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        type: "edge",
        edgeId: edge.id,
      });
    },
    [],
  );

  // Handle pane context menu (right-click on canvas)
  const onPaneContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      type: "pane",
    });
  }, []);

  // Close context menu
  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  // Close context menu when add node dialog opens
  useEffect(() => {
    if (showAddNodeDialog) {
      setContextMenu(null);
    }
  }, [showAddNodeDialog]);

  // Duplicate node
  const handleDuplicateNode = useCallback(
    (nodeId: string) => {
      const nodeToDuplicate = nodes.find((n) => n.id === nodeId);
      if (!nodeToDuplicate) return;

      const newNodeId = `node_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      // Generate a unique step name for the duplicate
      const baseStepName =
        (nodeToDuplicate.data?.stepName as string) ||
        getNodeBaseName(nodeToDuplicate.data || {});
      const stepName = generateUniqueStepName(baseStepName, nodesRef.current);

      const newNode: Node = {
        ...nodeToDuplicate,
        id: newNodeId,
        position: {
          x: nodeToDuplicate.position.x + 50,
          y: nodeToDuplicate.position.y + 50,
        },
        data: {
          ...nodeToDuplicate.data,
          stepName,
          onDelete: () => handleDeleteNode(newNodeId),
          onConfigureIntegration: handleConfigureIntegration,
          onOpenIntegrationSettings: handleOpenIntegrationSettings,
        },
        selected: false,
      };

      setNodes((nds) => [...nds, newNode]);
      setContextMenu(null);
      logToDebugPane("action", "Node duplicated", {
        originalId: nodeId,
        newId: newNodeId,
        stepName,
      });
    },
    [
      nodes,
      setNodes,
      handleDeleteNode,
      handleConfigureIntegration,
      handleOpenIntegrationSettings,
      logToDebugPane,
    ],
  );

  // Delete edge
  const handleDeleteEdge = useCallback(
    (edgeId: string) => {
      setEdges((eds) => eds.filter((e) => e.id !== edgeId));
      setContextMenu(null);
      logToDebugPane("action", "Edge deleted", { edgeId });
    },
    [setEdges, logToDebugPane],
  );

  // Keyboard delete support and close context menu on Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setContextMenu(null);
        return;
      }
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
    (type: string, data: Record<string, unknown>) => {
      const nodeId = getNodeId();
      const label = (data.label as string) ?? "Step";
      const stepName = generateUniqueStepName(
        getNodeBaseName(data),
        nodesRef.current,
      );

      const newNode: Node = {
        id: nodeId,
        type,
        position: { x: 255, y: nodesRef.current.length * 105 + 45 },
        data: {
          ...data,
          stepName,
          config: {},
          onDelete: () => handleDeleteNode(nodeId),
          onConfigureIntegration: handleConfigureIntegration,
          onOpenIntegrationSettings: handleOpenIntegrationSettings,
        },
      };
      setNodes((nds) => [...nds, newNode]);

      logToDebugPane("action", "Node added via sidebar", data, {
        nodeType: type,
        nodeName: label,
        expectedOutcome: `Added ${label} node to workflow`,
      });
    },
    [
      setNodes,
      logToDebugPane,
      handleDeleteNode,
      handleConfigureIntegration,
      handleOpenIntegrationSettings,
    ],
  );

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-2 md:px-4">
        <div className="flex min-w-0 items-center gap-2 md:gap-4">
          <Link
            to="/workspaces/$workspaceSlug/workflows"
            params={{ workspaceSlug }}
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            &larr; Back
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate font-semibold">{workflow.name}</h1>
              <span
                className={`hidden shrink-0 rounded-full px-2 py-0.5 text-xs sm:inline ${
                  workflow.isActive
                    ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                {workflow.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            {workflow.description && (
              <p className="hidden truncate text-muted-foreground text-sm md:block">
                {workflow.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1 md:gap-2">
          {error && (
            <span className="hidden text-red-500 text-sm md:inline">
              {error}
            </span>
          )}
          <ThemeToggle />
          <Button
            variant={snapToGrid ? "default" : "outline"}
            size="sm"
            onClick={() => setSnapToGrid(!snapToGrid)}
            className="hidden lg:flex"
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
              <Loader2 className="h-4 w-4 animate-spin lg:mr-1" />
            ) : (
              <PlayCircle className="h-4 w-4 lg:mr-1" />
            )}
            <span className="hidden lg:inline">Execute</span>
          </Button>
          <Button
            variant={showRunsPanel ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setShowRunsPanel(!showRunsPanel);
              setShowRightSidebar(true);
              if (!showRunsPanel) setSelectedNode(null);
            }}
          >
            <History className="h-4 w-4 lg:mr-1" />
            <span className="hidden lg:inline">History</span>
          </Button>

          <Button size="sm" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin lg:mr-1" />
            ) : (
              <Save className="h-4 w-4 lg:mr-1" />
            )}
            <span className="hidden lg:inline">Save</span>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                disabled={isDeleting}
                className="hidden md:flex"
              >
                {isDeleting ? (
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-1 h-4 w-4" />
                )}
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete workflow?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete "{workflow.name}" and all its run
                  history. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    deleteWorkflow({ input: { rowId: workflowId } })
                  }
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>

      {/* Main editor area */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Canvas */}
        <div className="flex flex-1 flex-col">
          <div className="relative flex-1" ref={reactFlowWrapper}>
            {/* Right sidebar toggle - floating on canvas edge */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 z-10 hidden bg-background/80 backdrop-blur-sm md:flex"
              onClick={() => setShowRightSidebar(!showRightSidebar)}
            >
              <PanelRightClose
                className={`h-4 w-4 transition-transform ${showRightSidebar ? "" : "rotate-180"}`}
              />
            </Button>

            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onNodeClick={(event, node) => {
                onNodeClick(event, node);
                // Open right sidebar when node is selected
                setShowRightSidebar(true);
                setShowRunsPanel(false);
              }}
              onNodeContextMenu={onNodeContextMenu}
              onEdgeContextMenu={onEdgeContextMenu}
              onPaneContextMenu={onPaneContextMenu}
              onPaneClick={closeContextMenu}
              snapToGrid={snapToGrid}
              snapGrid={[15, 15]}
              connectionLineType={ConnectionLineType.SmoothStep}
              connectionLineStyle={{ stroke: "#6366f1", strokeWidth: 3 }}
              defaultEdgeOptions={{ type: "smart" }}
              deleteKeyCode={["Backspace", "Delete"]}
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

            {/* Context Menu */}
            {contextMenu && (
              <div
                className="fade-in-0 zoom-in-95 fixed z-50 min-w-[160px] animate-in overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
                style={{ left: contextMenu.x, top: contextMenu.y }}
              >
                {contextMenu.type === "node" && contextMenu.nodeId && (
                  <>
                    <button
                      type="button"
                      className="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={() => {
                        setShowRightSidebar(true);
                        setShowRunsPanel(false);
                        setContextMenu(null);
                      }}
                    >
                      <Settings className="h-4 w-4" />
                      Configure
                    </button>
                    <button
                      type="button"
                      className="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={() => handleDuplicateNode(contextMenu.nodeId!)}
                    >
                      <Copy className="h-4 w-4" />
                      Duplicate
                    </button>
                    <div className="-mx-1 my-1 h-px bg-border" />
                    <button
                      type="button"
                      className="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-destructive text-sm outline-none transition-colors hover:bg-destructive/10"
                      onClick={() => {
                        handleDeleteNode(contextMenu.nodeId!);
                        setContextMenu(null);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </>
                )}
                {contextMenu.type === "edge" && contextMenu.edgeId && (
                  <button
                    type="button"
                    className="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-destructive text-sm outline-none transition-colors hover:bg-destructive/10"
                    onClick={() => handleDeleteEdge(contextMenu.edgeId!)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Connection
                  </button>
                )}
                {contextMenu.type === "pane" && (
                  <button
                    type="button"
                    className="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                    onClick={() => {
                      setShowAddNodeDialog(true);
                      setContextMenu(null);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Add Node
                  </button>
                )}
              </div>
            )}

            {/* Floating Add Node Button */}
            <div className="absolute right-4 bottom-4 z-10">
              <AddNodeButton
                organizationId={organizationId}
                onAddNode={handleAddNode}
                open={showAddNodeDialog}
                onOpenChange={setShowAddNodeDialog}
              />
            </div>

            {/* Debug Console - floating button + slide-out sheet */}
            <div className="absolute bottom-4 left-4 z-10">
              <DebugPane />
            </div>
          </div>
        </div>

        {/* Right sidebar - Node config, Runs panel, or Workflow info */}
        <div
          className={`h-full shrink-0 overflow-hidden bg-muted/30 transition-all duration-300 ease-in-out ${
            showRightSidebar ? "w-80 border-l md:w-96" : "w-0 border-l-0"
          }`}
        >
          <div className="relative h-full w-80 md:w-96">
            {/* Mobile close button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 z-10 md:hidden"
              onClick={() => setShowRightSidebar(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            {showRunsPanel ? (
              <aside className="h-full w-full overflow-hidden">
                <WorkflowRunsPanel
                  runs={workflow.workflowRuns?.nodes || []}
                  totalCount={workflow.workflowRuns?.totalCount || 0}
                />
              </aside>
            ) : selectedNode ? (
              <NodeConfigSidebar
                selectedNode={selectedNode}
                allNodes={nodes}
                onNodeUpdate={handleNodeUpdate}
                onNodeDelete={handleDeleteNode}
                onClose={() => {
                  setSelectedNode(null);
                  // On mobile, close sidebar when deselecting
                  if (window.innerWidth < 768) {
                    setShowRightSidebar(false);
                  }
                }}
                workflowId={workflowId}
                webhookSecret={workflow.webhookSecret}
              />
            ) : (
              <aside className="h-full w-full overflow-y-auto p-4">
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
                      <label className="text-muted-foreground">
                        Description
                      </label>
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
                      <p className="font-mono text-xs">
                        {workflow.cronExpression}
                      </p>
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
      </div>
    </div>
  );
}
