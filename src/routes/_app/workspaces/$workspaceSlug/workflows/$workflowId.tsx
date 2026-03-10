import { AsyncDebouncer } from "@tanstack/pacer";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Link,
  createFileRoute,
  notFound,
  useNavigate,
} from "@tanstack/react-router";
import {
  Activity,
  Check,
  Clock,
  Copy,
  Download,
  Grid3X3,
  History,
  Loader2,
  MessageSquare,
  PanelRightClose,
  Pencil,
  PlayCircle,
  Plus,
  Save,
  Settings,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RiDiscordLine as DiscordIcon } from "react-icons/ri";
import ReactFlow, {
  Background,
  ConnectionLineType,
  Controls,
  MarkerType,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { toast } from "sonner";

import type { Connection, Edge, Node, ReactFlowInstance } from "reactflow";
import "reactflow/dist/style.css";

import { AddNodeButton } from "@/components/AddNodeButton";
import DebugPane from "@/components/DebugPane";
import { SmartEdge } from "@/components/edges/SmartEdge";
import WorkflowStats from "@/components/monitoring/WorkflowStats";
import { ActionNode } from "@/components/nodes/ActionNode";
import { AgentNode } from "@/components/nodes/AgentNode";
import { AggregateNode } from "@/components/nodes/AggregateNode";
import { ApprovalNode } from "@/components/nodes/ApprovalNode";
import { AssertNode } from "@/components/nodes/AssertNode";
import { AudioNode } from "@/components/nodes/AudioNode";
import { CacheNode } from "@/components/nodes/CacheNode";
import { ChatNode } from "@/components/nodes/ChatNode";
import { ChunkNode } from "@/components/nodes/ChunkNode";
import { ClassifyNode } from "@/components/nodes/ClassifyNode";
import { CodeNode } from "@/components/nodes/CodeNode";
import { CollectNode } from "@/components/nodes/CollectNode";
import { CommentNode } from "@/components/nodes/CommentNode";
import { ConditionNode } from "@/components/nodes/ConditionNode";
import { DatabaseNode } from "@/components/nodes/DatabaseNode";
import { DecryptNode } from "@/components/nodes/DecryptNode";
import { DelayNode } from "@/components/nodes/DelayNode";
import { EmailNode } from "@/components/nodes/EmailNode";
import { EmbeddingNode } from "@/components/nodes/EmbeddingNode";
import { EncryptNode } from "@/components/nodes/EncryptNode";
import { ErrorNode } from "@/components/nodes/ErrorNode";
import { EventNode } from "@/components/nodes/EventNode";
import { FileNode } from "@/components/nodes/FileNode";
import { FilterNode } from "@/components/nodes/FilterNode";
import { FlattenNode } from "@/components/nodes/FlattenNode";
import { FormatNode } from "@/components/nodes/FormatNode";
import { GateNode } from "@/components/nodes/GateNode";
import { GroupNode } from "@/components/nodes/GroupNode";
import { HashNode } from "@/components/nodes/HashNode";
import { InputNode } from "@/components/nodes/InputNode";
import { JwtNode } from "@/components/nodes/JwtNode";
import { LLMNode } from "@/components/nodes/LLMNode";
import { LogNode } from "@/components/nodes/LogNode";
import { LoopNode } from "@/components/nodes/LoopNode";
import { MapNode } from "@/components/nodes/MapNode";
import { MCPNode } from "@/components/nodes/MCPNode";
import { MergeNode } from "@/components/nodes/MergeNode";
import { NotificationNode } from "@/components/nodes/NotificationNode";
import { ParallelNode } from "@/components/nodes/ParallelNode";
import { ParseNode } from "@/components/nodes/ParseNode";
import { PluginNode } from "@/components/nodes/PluginNode";
import { PromptNode } from "@/components/nodes/PromptNode";
import { QueueNode } from "@/components/nodes/QueueNode";
import { RagNode } from "@/components/nodes/RagNode";
import { ReduceNode } from "@/components/nodes/ReduceNode";
import { RetryNode } from "@/components/nodes/RetryNode";
import { SagaNode } from "@/components/nodes/SagaNode";
import { SetNode } from "@/components/nodes/SetNode";
import { SignNode } from "@/components/nodes/SignNode";
import { SleepNode } from "@/components/nodes/SleepNode";
import { SortNode } from "@/components/nodes/SortNode";
import { SplitNode } from "@/components/nodes/SplitNode";
import { StateGetNode } from "@/components/nodes/StateGetNode";
import { StateSetNode } from "@/components/nodes/StateSetNode";
import { StateWaitNode } from "@/components/nodes/StateWaitNode";
import { SubworkflowNode } from "@/components/nodes/SubworkflowNode";
import { SummarizeNode } from "@/components/nodes/SummarizeNode";
import { SwitchNode } from "@/components/nodes/SwitchNode";
import { TemplateNode } from "@/components/nodes/TemplateNode";
import { TimeoutNode } from "@/components/nodes/TimeoutNode";
import { TriggerNode } from "@/components/nodes/TriggerNode";
import { UniqueNode } from "@/components/nodes/UniqueNode";
import { ValidateNode } from "@/components/nodes/ValidateNode";
import { VectorSearchNode } from "@/components/nodes/VectorSearchNode";
import { VisionNode } from "@/components/nodes/VisionNode";
import { WaitNode } from "@/components/nodes/WaitNode";
import { WebhookResponseNode } from "@/components/nodes/WebhookResponseNode";
import { ZipNode } from "@/components/nodes/ZipNode";
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
import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ExportWorkflowDialog from "@/components/workflow/ExportWorkflowDialog";
import ImportWorkflowDialog from "@/components/workflow/ImportWorkflowDialog";
import { NodeConfigSidebar } from "@/components/workflow/NodeConfigSidebar";
import VersionHistory from "@/components/workflow/VersionHistory";
import { WorkflowRunsPanel } from "@/components/workflow/WorkflowRunsPanel";
import {
  useDeleteWorkflowMutation,
  useUpdateWorkflowMutation,
  useWorkflowQuery,
  useWorkflowsQuery,
} from "@/generated/graphql";
import app from "@/lib/config/app.config";
import extractErrorMessage from "@/lib/graphql/extractErrorMessage";
import workflowOptions from "@/lib/options/workflow.options";
import { NodeTypes } from "@/lib/schema";
import getQueryKeyPrefix from "@/lib/util/getQueryKeyPrefix";
import {
  ensureStepNames,
  generateUniqueStepName,
  getNodeBaseName,
} from "@/lib/workflow/stepNames";
import { executeWorkflow } from "@/server/functions/executeWorkflow";

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/workflows/$workflowId",
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
  subworkflowNode: SubworkflowNode,
  waitNode: WaitNode,
  eventNode: EventNode,
  aggregateNode: AggregateNode,
  cacheNode: CacheNode,
  collectNode: CollectNode,
  // Extended core nodes
  mergeNode: MergeNode,
  splitNode: SplitNode,
  filterNode: FilterNode,
  setNode: SetNode,
  errorNode: ErrorNode,
  retryNode: RetryNode,
  timeoutNode: TimeoutNode,
  emailNode: EmailNode,
  webhookResponseNode: WebhookResponseNode,
  fileNode: FileNode,
  queueNode: QueueNode,
  embeddingNode: EmbeddingNode,
  vectorSearchNode: VectorSearchNode,
  logNode: LogNode,
  assertNode: AssertNode,
  sleepNode: SleepNode,
  // Data transformation nodes
  mapNode: MapNode,
  reduceNode: ReduceNode,
  sortNode: SortNode,
  uniqueNode: UniqueNode,
  templateNode: TemplateNode,
  // AI nodes
  promptNode: PromptNode,
  chatNode: ChatNode,
  summarizeNode: SummarizeNode,
  classifyNode: ClassifyNode,
  // Human-in-the-loop nodes
  approvalNode: ApprovalNode,
  inputNode: InputNode,
  notificationNode: NotificationNode,
  // Data processing nodes
  parseNode: ParseNode,
  validateNode: ValidateNode,
  formatNode: FormatNode,
  hashNode: HashNode,
  // Advanced - Array Operations
  groupNode: GroupNode,
  flattenNode: FlattenNode,
  chunkNode: ChunkNode,
  zipNode: ZipNode,
  // Advanced - Security
  encryptNode: EncryptNode,
  decryptNode: DecryptNode,
  signNode: SignNode,
  jwtNode: JwtNode,
  // Advanced - AI Extensions
  agentNode: AgentNode,
  ragNode: RagNode,
  visionNode: VisionNode,
  audioNode: AudioNode,
  // Documentation
  commentNode: CommentNode,
  // Distributed transactions
  sagaNode: SagaNode,
  // State management nodes
  stateGetNode: StateGetNode,
  stateSetNode: StateSetNode,
  stateWaitNode: StateWaitNode,
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
  subworkflow: "subworkflowNode",
  wait: "waitNode",
  event: "eventNode",
  aggregate: "aggregateNode",
  cache: "cacheNode",
  collect: "collectNode",
  // Extended core nodes
  merge: "mergeNode",
  split: "splitNode",
  filter: "filterNode",
  set: "setNode",
  error: "errorNode",
  retry: "retryNode",
  timeout: "timeoutNode",
  email: "emailNode",
  webhookResponse: "webhookResponseNode",
  file: "fileNode",
  queue: "queueNode",
  embedding: "embeddingNode",
  vectorSearch: "vectorSearchNode",
  log: "logNode",
  assert: "assertNode",
  sleep: "sleepNode",
  // Data transformation nodes
  map: "mapNode",
  reduce: "reduceNode",
  sort: "sortNode",
  unique: "uniqueNode",
  template: "templateNode",
  // AI nodes
  prompt: "promptNode",
  chat: "chatNode",
  summarize: "summarizeNode",
  classify: "classifyNode",
  // Human-in-the-loop nodes
  approval: "approvalNode",
  input: "inputNode",
  notification: "notificationNode",
  // Data processing nodes
  parse: "parseNode",
  validate: "validateNode",
  format: "formatNode",
  hash: "hashNode",
  // Advanced - Array Operations
  group: "groupNode",
  flatten: "flattenNode",
  chunk: "chunkNode",
  zip: "zipNode",
  // Advanced - Security
  encrypt: "encryptNode",
  decrypt: "decryptNode",
  sign: "signNode",
  jwt: "jwtNode",
  // Advanced - AI Extensions
  agent: "agentNode",
  rag: "ragNode",
  vision: "visionNode",
  audio: "audioNode",
  // Documentation
  comment: "commentNode",
  // Distributed transactions
  saga: "sagaNode",
  // State management nodes
  state_get: "stateGetNode",
  state_set: "stateSetNode",
  state_wait: "stateWaitNode",
};

let nodeIdCounter = 0;
const getNodeId = () => `node_${Date.now()}_${nodeIdCounter++}`;

/**
 * Workflow editor page with ReactFlow, drag-and-drop, node configuration, and debug pane.
 */
function WorkflowEditorPage() {
  const { workspaceSlug, workflowId } = Route.useParams();
  const { organizationId } = Route.useLoaderData();
  const { session } = Route.useRouteContext();
  const navigate = useNavigate();

  const accessToken = session?.accessToken;

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
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const hasUnsavedChanges = useRef(false);
  const isInitialMount = useRef(true);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showRunsPanel, setShowRunsPanel] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showMonitoring, setShowMonitoring] = useState(false);
  const [stepStatuses, setStepStatuses] = useState<Record<string, string>>({});
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
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [editName, setEditName] = useState(workflow.name);
  const [editDescription, setEditDescription] = useState(
    workflow.description || "",
  );
  const [editIsActive, setEditIsActive] = useState(workflow.isActive);
  const [editSelectOpen, setEditSelectOpen] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  // Refs to access current state in callbacks
  const nodesRef = useRef(nodes);
  const edgesRef = useRef(edges);
  nodesRef.current = nodes;
  edgesRef.current = edges;

  // Track drag state to defer autosave during node dragging
  const isDragging = useRef(false);

  // Store position for adding nodes from context menu (in flow coordinates)
  const pendingAddPositionRef = useRef<{ x: number; y: number } | null>(null);

  const { mutate: updateWorkflow } = useUpdateWorkflowMutation({
    meta: {
      invalidates: [
        getQueryKeyPrefix(useWorkflowQuery),
        getQueryKeyPrefix(useWorkflowsQuery),
      ],
    },
    onSuccess: () => {
      setIsSaving(false);
      setSaveStatus("saved");
      hasUnsavedChanges.current = false;
      logToDebugPane("action", "Workflow saved", { name: workflow.name });
      // Reset to idle after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000);
    },
    onError: (err) => {
      setIsSaving(false);
      setSaveStatus("error");
      setError(extractErrorMessage(err, "Failed to save workflow"));
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
        setError(extractErrorMessage(err, "Failed to delete workflow"));
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
      const w = window as unknown as Record<string, unknown>;
      if (
        typeof window !== "undefined" &&
        typeof w.logToDebugPane === "function"
      ) {
        (w.logToDebugPane as (...args: unknown[]) => void)(
          type,
          message,
          payload,
          details,
        );
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

  // Core save logic - extracted for reuse
  const performSave = useCallback(
    (currentNodes: Node[], currentEdges: Edge[]) => {
      setSaveStatus("saving");
      setError(null);

      // Extract trigger configuration from trigger node
      const triggerNode = currentNodes.find((n) => n.type === "triggerNode");
      const triggerType = triggerNode?.data?.triggerType || "manual";
      const triggerConfig = triggerNode?.data?.config || {};

      // Build patch with trigger-specific fields
      const patch: Record<string, unknown> = {
        definition: {
          nodes: currentNodes,
          edges: currentEdges,
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
    },
    [updateWorkflow, workflowId, workflow.webhookSecret],
  );

  // Debounced autosave - waits 1.5s of inactivity before saving
  const debouncedSave = useMemo(
    () =>
      new AsyncDebouncer(
        async (currentNodes: Node[], currentEdges: Edge[]) => {
          performSave(currentNodes, currentEdges);
        },
        {
          wait: 1500,
          onError: (error) => {
            console.error("Autosave failed:", error);
            setSaveStatus("error");
          },
          throwOnError: false,
        },
      ),
    [performSave],
  );

  // Track changes and trigger autosave (skip during drag to avoid per-frame work)
  useEffect(() => {
    // Skip the initial mount - don't autosave on load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    hasUnsavedChanges.current = true;

    // Defer autosave while dragging; onNodeDragStop triggers it instead
    if (isDragging.current) return;

    debouncedSave.maybeExecute(nodes, edges);
  }, [nodes, edges, debouncedSave]);

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  // Apply execution status highlighting to nodes
  useEffect(() => {
    if (Object.keys(stepStatuses).length === 0) {
      // Clear any execution status classes when no statuses
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          className:
            node.className?.replace(/execution-status-\w+/g, "").trim() ||
            undefined,
        })),
      );
      return;
    }

    setNodes((nds) =>
      nds.map((node) => {
        const status = stepStatuses[node.id];
        const baseClassName =
          node.className?.replace(/execution-status-\w+/g, "").trim() || "";
        const statusClass = status ? `execution-status-${status}` : "";
        const newClassName =
          [baseClassName, statusClass].filter(Boolean).join(" ") || undefined;
        return { ...node, className: newClassName };
      }),
    );
  }, [stepStatuses, setNodes]);

  const handleSave = useCallback(() => {
    setIsSaving(true);
    // Cancel any pending autosave and save immediately
    debouncedSave.cancel();
    performSave(nodes, edges);
  }, [debouncedSave, performSave, nodes, edges]);

  const handleExecute = useCallback(async () => {
    setIsExecuting(true);
    logToDebugPane("trigger", "Workflow execution started", {
      workflowId,
      nodeCount: nodesRef.current.length,
    });

    try {
      const result = await executeWorkflow({
        data: { workflowId, triggerData: {} },
      });

      logToDebugPane("action", "Workflow executed successfully", result, {
        nodeType: "Workflow",
        nodeName: workflow.name,
      });
      toast.success("Workflow executed successfully");
    } catch (err) {
      const message = extractErrorMessage(err, "Unknown error");
      logToDebugPane("action", "Workflow execution failed", {
        error: message,
      });
      toast.error(`Execution failed: ${message}`);
    } finally {
      setIsExecuting(false);
    }
  }, [workflowId, workflow.name, logToDebugPane]);

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

        // Auto-connect dropped node to selected or last node
        if (nodeType !== "triggerNode") {
          const sourceNode =
            selectedNode ??
            nodesRef.current[nodesRef.current.length - 1] ??
            null;

          if (sourceNode) {
            const sourceHasOutgoing = edgesRef.current.some(
              (e) => e.source === sourceNode.id,
            );
            const isMultiOutput =
              sourceNode.type === "conditionNode" ||
              sourceNode.type === "switchNode";

            if (!sourceHasOutgoing && !isMultiOutput) {
              const autoEdge: Edge = {
                id: `edge_${Date.now()}`,
                source: sourceNode.id,
                target: nodeId,
                type: "smart",
                markerEnd: { type: MarkerType.ArrowClosed },
                style: { stroke: "#2563eb", strokeWidth: 2 },
              };
              setEdges((eds) => [...eds, autoEdge]);

              logToDebugPane("action", "Auto-connected nodes", null, {
                nodeType: "Connection",
                nodeName: `${sourceNode.data.label} → ${label}`,
                expectedOutcome: `${sourceNode.data.label} will trigger ${label}`,
              });
            }
          }
        }

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
      setEdges,
      selectedNode,
      logToDebugPane,
      handleDeleteNode,
      handleConfigureIntegration,
      handleOpenIntegrationSettings,
      executeConnectedActions,
      handleExecute,
    ],
  );

  // Suppress autosave during drag to avoid per-frame effect overhead
  const onNodeDragStart = useCallback(() => {
    isDragging.current = true;
  }, []);

  const onNodeDragStop = useCallback(() => {
    isDragging.current = false;
    // Trigger deferred autosave with final positions
    if (hasUnsavedChanges.current) {
      debouncedSave.maybeExecute(nodesRef.current, edgesRef.current);
    }
  }, [debouncedSave]);

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
  const onPaneContextMenu = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();

      // Store the position in flow coordinates for adding nodes
      if (reactFlowInstance) {
        pendingAddPositionRef.current = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
      }

      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        type: "pane",
      });
    },
    [reactFlowInstance],
  );

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

  // Handle workflow import from DSL
  const handleImport = useCallback(
    (importedNodes: Node[], importedEdges: Edge[]) => {
      const namedNodes = ensureStepNames(importedNodes);
      setNodes(namedNodes);
      setEdges(importedEdges);
      setSelectedNode(null);
      setShowRightSidebar(false);
      hasUnsavedChanges.current = true;
    },
    [setNodes, setEdges],
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      const isTyping =
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement;

      if (event.key === "Escape") {
        setContextMenu(null);
        setShowAddNodeDialog(false);
        return;
      }

      // Delete selected node
      if (
        (event.key === "Delete" || event.key === "Backspace") &&
        selectedNode &&
        !isTyping
      ) {
        handleDeleteNode(selectedNode.id);
        return;
      }

      // Skip other shortcuts if typing
      if (isTyping) return;

      // A - Add node
      if (event.key === "a" || event.key === "A") {
        event.preventDefault();
        setShowAddNodeDialog(true);
        return;
      }

      // Ctrl/Cmd + S - Save
      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        event.preventDefault();
        handleSave();
        return;
      }

      // Ctrl/Cmd + Shift + E - Export (must be checked before Ctrl+E)
      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key === "E"
      ) {
        event.preventDefault();
        setShowExportDialog(true);
        return;
      }

      // Ctrl/Cmd + I - Import
      if ((event.metaKey || event.ctrlKey) && event.key === "i") {
        event.preventDefault();
        setShowImportDialog(true);
        return;
      }

      // Ctrl/Cmd + E - Execute
      if (
        (event.metaKey || event.ctrlKey) &&
        !event.shiftKey &&
        event.key === "e"
      ) {
        event.preventDefault();
        handleExecute();
        return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedNode, handleDeleteNode, handleSave, handleExecute]);

  // Handle node update from config sidebar (auto-save)
  const handleNodeUpdate = useCallback(
    (nodeId: string, data: Record<string, unknown>) => {
      setNodes((nds) => nds.map((n) => (n.id === nodeId ? { ...n, data } : n)));
      // Don't close panel - auto-save keeps it open
    },
    [setNodes],
  );

  // Handle adding node from sidebar or context menu
  const handleAddNode = useCallback(
    (type: string, data: Record<string, unknown>) => {
      const nodeId = getNodeId();
      const label = (data.label as string) ?? "Step";
      const stepName = generateUniqueStepName(
        getNodeBaseName(data),
        nodesRef.current,
      );

      // Use stored position from context menu, or calculate viewport center
      let position: { x: number; y: number };
      if (pendingAddPositionRef.current) {
        position = pendingAddPositionRef.current;
        pendingAddPositionRef.current = null; // Clear after use
      } else if (reactFlowInstance) {
        // Place in center of current viewport
        const viewport = reactFlowInstance.getViewport();
        const bounds = reactFlowWrapper.current?.getBoundingClientRect();
        if (bounds) {
          position = reactFlowInstance.screenToFlowPosition({
            x: bounds.width / 2,
            y: bounds.height / 2,
          });
        } else {
          position = {
            x: -viewport.x / viewport.zoom + 400,
            y: -viewport.y / viewport.zoom + 300,
          };
        }
      } else {
        position = { x: 255, y: nodesRef.current.length * 105 + 45 };
      }

      // Check if node needs attention (requires connection but not connected)
      const needsAttention =
        data.requiresConnection && !data.connectedInstanceId;

      const newNode: Node = {
        id: nodeId,
        type,
        position,
        data: {
          ...data,
          stepName,
          config: {},
          needsAttention,
          onDelete: () => handleDeleteNode(nodeId),
          onConfigureIntegration: handleConfigureIntegration,
          onOpenIntegrationSettings: handleOpenIntegrationSettings,
        },
      };
      setNodes((nds) => [...nds, newNode]);

      // Auto-connect to the selected node (or the last node if none selected)
      // Skip if the new node is a trigger (triggers are sources, not targets)
      if (type !== "triggerNode") {
        const sourceNode =
          selectedNode ??
          nodesRef.current[nodesRef.current.length - 1] ??
          null;

        if (sourceNode) {
          // Only auto-connect if the source doesn't already have an outgoing edge
          // (condition/switch nodes have multiple handles, so skip auto-connect for those)
          const sourceHasOutgoing = edgesRef.current.some(
            (e) => e.source === sourceNode.id,
          );
          const isMultiOutput =
            sourceNode.type === "conditionNode" ||
            sourceNode.type === "switchNode";

          if (!sourceHasOutgoing && !isMultiOutput) {
            const autoEdge: Edge = {
              id: `edge_${Date.now()}`,
              source: sourceNode.id,
              target: nodeId,
              type: "smart",
              markerEnd: { type: MarkerType.ArrowClosed },
              style: { stroke: "#2563eb", strokeWidth: 2 },
            };
            setEdges((eds) => [...eds, autoEdge]);

            logToDebugPane("action", "Auto-connected nodes", null, {
              nodeType: "Connection",
              nodeName: `${sourceNode.data.label} → ${label}`,
              expectedOutcome: `${sourceNode.data.label} will trigger ${label}`,
            });
          }
        }
      }

      // Select the new node and open the sidebar
      setSelectedNode(newNode);
      setShowRightSidebar(true);

      // Clear needsAttention after animation (3s)
      if (needsAttention) {
        setTimeout(() => {
          setNodes((nds) =>
            nds.map((n) =>
              n.id === nodeId
                ? { ...n, data: { ...n.data, needsAttention: false } }
                : n,
            ),
          );
        }, 3000);
      }

      // Center view on the new node
      if (reactFlowInstance) {
        setTimeout(() => {
          reactFlowInstance.setCenter(position.x + 135, position.y + 60, {
            zoom: reactFlowInstance.getZoom(),
            duration: 300,
          });
        }, 50);
      }

      logToDebugPane("action", "Node added", data, {
        nodeType: type,
        nodeName: label,
        expectedOutcome: `Added ${label} node to workflow`,
      });
    },
    [
      setNodes,
      setEdges,
      selectedNode,
      logToDebugPane,
      handleDeleteNode,
      handleConfigureIntegration,
      handleOpenIntegrationSettings,
      reactFlowInstance,
    ],
  );

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b px-2 md:px-4">
        <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-4">
          <Link
            to="/workspaces/$workspaceSlug/workflows"
            params={{ workspaceSlug }}
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            &larr;
            <span className="hidden sm:inline"> Back</span>
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate font-semibold text-sm sm:text-base">
                {workflow.name}
              </h1>
              <DialogRoot
                open={showEditDialog}
                onOpenChange={(e) => {
                  if (!e.open) setEditSelectOpen(false);
                  setShowEditDialog(e.open);
                }}
              >
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => {
                      setEditName(workflow.name);
                      setEditDescription(workflow.description || "");
                      setEditIsActive(workflow.isActive);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </DialogTrigger>
                <DialogBackdrop />
                <DialogPositioner>
                  <DialogContent>
                    <DialogCloseTrigger />
                    <DialogHeader>
                      <DialogTitle>Edit Workflow</DialogTitle>
                      <DialogDescription>
                        Update the workflow name, description, and status.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Name</Label>
                        <Input
                          id="edit-name"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="Workflow name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                          id="edit-description"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          placeholder="Optional description"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-status">Status</Label>
                        <Select
                          open={editSelectOpen}
                          onOpenChange={setEditSelectOpen}
                          value={editIsActive ? "active" : "inactive"}
                          onValueChange={(value) =>
                            setEditIsActive(value === "active")
                          }
                        >
                          <SelectTrigger id="edit-status">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogCloseTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogCloseTrigger>
                      <Button
                        onClick={() => {
                          updateWorkflow({
                            input: {
                              rowId: workflowId,
                              patch: {
                                name: editName,
                                description: editDescription || null,
                                isActive: editIsActive,
                              },
                            },
                          });
                          setShowEditDialog(false);
                        }}
                        disabled={!editName.trim()}
                      >
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </DialogPositioner>
              </DialogRoot>
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
              setShowVersionHistory(false);
              setShowMonitoring(false);
              setShowRightSidebar(true);
              if (!showRunsPanel) setSelectedNode(null);
            }}
          >
            <History className="h-4 w-4 lg:mr-1" />
            <span className="hidden lg:inline">Runs</span>
          </Button>
          <Button
            variant={showVersionHistory ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setShowVersionHistory(!showVersionHistory);
              setShowRunsPanel(false);
              setShowMonitoring(false);
              setShowRightSidebar(true);
              if (!showVersionHistory) setSelectedNode(null);
            }}
          >
            <Clock className="h-4 w-4 lg:mr-1" />
            <span className="hidden lg:inline">Versions</span>
          </Button>
          <Button
            variant={showMonitoring ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setShowMonitoring(!showMonitoring);
              setShowRunsPanel(false);
              setShowVersionHistory(false);
              setShowRightSidebar(true);
              if (!showMonitoring) setSelectedNode(null);
            }}
          >
            <Activity className="h-4 w-4 lg:mr-1" />
            <span className="hidden lg:inline">Monitoring</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowImportDialog(true)}
            title="Import workflow (Ctrl+I)"
          >
            <Upload className="h-4 w-4 lg:mr-1" />
            <span className="hidden lg:inline">Import</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowExportDialog(true)}
            title="Export workflow (Ctrl+Shift+E)"
          >
            <Download className="h-4 w-4 lg:mr-1" />
            <span className="hidden lg:inline">Export</span>
          </Button>

          {/* Autosave status indicator */}
          <div className="hidden items-center gap-1.5 text-muted-foreground text-xs sm:flex">
            {saveStatus === "saving" && (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Saving...</span>
              </>
            )}
            {saveStatus === "saved" && (
              <>
                <Check className="h-3 w-3 text-green-500" />
                <span className="text-green-600 dark:text-green-400">
                  Saved
                </span>
              </>
            )}
            {saveStatus === "error" && (
              <span className="text-destructive">Save failed</span>
            )}
          </div>

          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving || saveStatus === "saving"}
          >
            {isSaving || saveStatus === "saving" ? (
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
              onNodeDragStart={onNodeDragStart}
              onNodeDragStop={onNodeDragStop}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onNodeClick={(event, node) => {
                onNodeClick(event, node);
                // Open right sidebar when node is selected
                setShowRightSidebar(true);
                setShowRunsPanel(false);
                setShowMonitoring(false);
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
              fitViewOptions={{
                padding: 0.3,
                minZoom: 0.5,
                maxZoom: 1.5,
              }}
              minZoom={0.25}
              maxZoom={2}
              defaultViewport={{ x: 0, y: 0, zoom: 1 }}
              proOptions={{ hideAttribution: true }}
              className="bg-background"
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
            <div className="absolute right-4 bottom-4 z-20">
              <AddNodeButton
                organizationId={organizationId}
                onAddNode={handleAddNode}
                open={showAddNodeDialog}
                onOpenChange={setShowAddNodeDialog}
              />
            </div>

            {/* Debug Console + Feedback + Discord - floating buttons */}
            <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex gap-2 max-sm:hidden [&>*]:pointer-events-auto">
              <DebugPane />
              <Button
                variant="outline"
                size="sm"
                className="gap-2 shadow-lg transition-all hover:shadow-glow"
                asChild
              >
                <a
                  href={app.links.feedback}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Feedback</span>
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 shadow-lg transition-all hover:shadow-glow"
                asChild
              >
                <a
                  href={app.organization.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DiscordIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Discord</span>
                </a>
              </Button>
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
            {showVersionHistory ? (
              <aside className="h-full w-full overflow-hidden">
                <VersionHistory
                  workflowId={workflowId}
                  currentDefinition={
                    (workflow.definition as Record<string, unknown>) ?? {}
                  }
                  onClose={() => {
                    setShowVersionHistory(false);
                    if (window.innerWidth < 768) {
                      setShowRightSidebar(false);
                    }
                  }}
                />
              </aside>
            ) : showRunsPanel ? (
              <aside className="h-full w-full overflow-hidden">
                <WorkflowRunsPanel
                  runs={workflow.workflowRuns?.nodes || []}
                  totalCount={workflow.workflowRuns?.totalCount || 0}
                  apiKey={accessToken}
                  onStepStatusChange={setStepStatuses}
                />
              </aside>
            ) : showMonitoring ? (
              <aside className="h-full w-full overflow-y-auto">
                <WorkflowStats
                  workflowId={workflowId}
                  workspaceSlug={workspaceSlug}
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

      <ImportWorkflowDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        onImport={handleImport}
      />
      <ExportWorkflowDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        nodes={nodes}
        edges={edges}
        workflowName={workflow.name}
      />
    </div>
  );
}
