import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, GripVertical, Layers, Plus, X } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
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

import { SmartEdge } from "@/components/edges/SmartEdge";
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
import { Button } from "@/components/ui/button";
import { NodeConfigSidebar } from "@/components/workflow/NodeConfigSidebar";
import authClient from "@/lib/auth/authClient";
import { NodeTypes } from "@/lib/schema";
import dslToReactFlow from "@/lib/workflow/dslToReactFlow";
import { generateUniqueStepName } from "@/lib/workflow/stepNames";

import type { WorkflowDefinition } from "@/lib/workflow/types";

export const Route = createFileRoute("/demo")({
  component: DemoPage,
});

// Node types registry (same as the real editor)
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
  mapNode: MapNode,
  reduceNode: ReduceNode,
  sortNode: SortNode,
  uniqueNode: UniqueNode,
  templateNode: TemplateNode,
  promptNode: PromptNode,
  chatNode: ChatNode,
  summarizeNode: SummarizeNode,
  classifyNode: ClassifyNode,
  approvalNode: ApprovalNode,
  inputNode: InputNode,
  notificationNode: NotificationNode,
  parseNode: ParseNode,
  validateNode: ValidateNode,
  formatNode: FormatNode,
  hashNode: HashNode,
  groupNode: GroupNode,
  flattenNode: FlattenNode,
  chunkNode: ChunkNode,
  zipNode: ZipNode,
  encryptNode: EncryptNode,
  decryptNode: DecryptNode,
  signNode: SignNode,
  jwtNode: JwtNode,
  agentNode: AgentNode,
  ragNode: RagNode,
  visionNode: VisionNode,
  audioNode: AudioNode,
  commentNode: CommentNode,
  sagaNode: SagaNode,
  stateGetNode: StateGetNode,
  stateSetNode: StateSetNode,
  stateWaitNode: StateWaitNode,
};

const edgeTypes = {
  smart: SmartEdge,
};

// Demo workflow: AI-powered content pipeline
const demoWorkflow: WorkflowDefinition = {
  version: "1.0",
  steps: [
    {
      id: "trigger_1",
      type: "trigger",
      name: "Every 6 Hours",
      description: "Fetch new content on a schedule",
      position: { x: 0, y: 0 },
      trigger: {
        type: "cron",
        config: { expression: "0 */6 * * *" },
      },
    },
    {
      id: "action_1",
      type: "action",
      name: "Fetch RSS Feeds",
      description: "Pull latest articles from configured sources",
      position: { x: 0, y: 0 },
      action: {
        pluginId: "builtin:http",
        operation: "request",
        inputs: {
          url: "https://api.example.com/feeds",
          method: "GET",
        },
        outputs: { response: "feedData" },
      },
    },
    {
      id: "filter_1",
      type: "filter",
      name: "Filter New Articles",
      description: "Keep only articles from the last 6 hours",
      position: { x: 0, y: 0 },
      filter: {
        input: "{{ feedData.articles }}",
        condition: "item.publishedAt > Date.now() - 6 * 60 * 60 * 1000",
        outputVariable: "newArticles",
      },
    },
    {
      id: "classify_1",
      type: "classify",
      name: "AI Classify",
      description: "Categorize each article by topic",
      position: { x: 0, y: 0 },
      classify: {
        model: "claude-sonnet-4-20250514",
        source: "{{ newArticles }}",
        categories: ["technology", "science", "business", "other"],
        outputVariable: "classifiedArticles",
      },
    },
    {
      id: "switch_1",
      type: "switch",
      name: "Route by Topic",
      description: "Send to different channels based on classification",
      position: { x: 0, y: 0 },
      switch: {
        expression: "{{ classifiedArticles.category }}",
        cases: [
          { value: "technology", label: "Tech", next: "parallel_1" },
          { value: "science", label: "Science", next: "parallel_1" },
          { value: "business", label: "Business", next: "summarize_1" },
        ],
        default: "log_1",
      },
    },
    {
      id: "parallel_1",
      type: "parallel",
      name: "Notify Channels",
      description: "Send notifications to Slack and email simultaneously",
      position: { x: 0, y: 0 },
      parallel: {
        branches: [["email_1"], ["notification_1"]],
        waitFor: "all",
      },
    },
    {
      id: "email_1",
      type: "email",
      name: "Email Digest",
      description: "Send article summary to the team",
      position: { x: 0, y: 0 },
      email: {
        to: "team@example.com",
        subject: "New {{ classifiedArticles.category }} article",
        body: "{{ classifiedArticles.summary }}",
      },
    },
    {
      id: "notification_1",
      type: "notification",
      name: "Slack Alert",
      description: "Post to #content-feed channel",
      position: { x: 0, y: 0 },
      notification: {
        channel: "slack",
        recipients: ["#content-feed"],
        message: "New article: {{ classifiedArticles.title }}",
      },
    },
    {
      id: "summarize_1",
      type: "summarize",
      name: "AI Summarize",
      description: "Generate a brief summary for business articles",
      position: { x: 0, y: 0 },
      summarize: {
        model: "claude-sonnet-4-20250514",
        source: "{{ classifiedArticles.content }}",
        style: "brief",
        outputVariable: "businessSummary",
      },
    },
    {
      id: "log_1",
      type: "log",
      name: "Log Skipped",
      description: "Log articles that didn't match any category",
      position: { x: 0, y: 0 },
      log: {
        level: "info",
        message: "Skipped article: {{ classifiedArticles.title }}",
        data: { category: "other" },
      },
    },
  ],
  edges: [
    { id: "e1", source: "trigger_1", target: "action_1" },
    { id: "e2", source: "action_1", target: "filter_1" },
    { id: "e3", source: "filter_1", target: "classify_1" },
    { id: "e4", source: "classify_1", target: "switch_1" },
    { id: "e7", source: "parallel_1", target: "email_1" },
    { id: "e8", source: "parallel_1", target: "notification_1" },
    { id: "e10", source: "summarize_1", target: "email_1" },
  ],
};

// Curated node palette for the demo
const DEMO_PALETTE = [
  {
    label: "Triggers",
    nodes: [
      {
        type: NodeTypes.TRIGGER,
        label: "Webhook",
        data: { label: "Webhook", triggerType: "webhook" },
      },
      {
        type: NodeTypes.TRIGGER,
        label: "Schedule",
        data: { label: "Schedule", triggerType: "cron" },
      },
      {
        type: NodeTypes.TRIGGER,
        label: "Manual",
        data: { label: "Manual Trigger", triggerType: "manual" },
      },
    ],
  },
  {
    label: "Actions",
    nodes: [
      {
        type: NodeTypes.ACTION,
        label: "HTTP Request",
        data: {
          label: "HTTP Request",
          pluginId: "builtin:http",
          operation: "request",
        },
      },
      {
        type: NodeTypes.ACTION,
        label: "Custom Action",
        data: { label: "Custom Action" },
      },
    ],
  },
  {
    label: "AI / ML",
    nodes: [
      {
        type: "classifyNode",
        label: "Classify",
        data: { label: "AI Classify" },
      },
      {
        type: "summarizeNode",
        label: "Summarize",
        data: { label: "AI Summarize" },
      },
      { type: "promptNode", label: "Prompt", data: { label: "AI Prompt" } },
      { type: "chatNode", label: "Chat", data: { label: "AI Chat" } },
    ],
  },
  {
    label: "Flow Control",
    nodes: [
      {
        type: NodeTypes.CONDITION,
        label: "Condition",
        data: { label: "Condition" },
      },
      { type: NodeTypes.SWITCH, label: "Switch", data: { label: "Switch" } },
      { type: NodeTypes.LOOP, label: "Loop", data: { label: "Loop" } },
      { type: "parallelNode", label: "Parallel", data: { label: "Parallel" } },
      { type: "delayNode", label: "Delay", data: { label: "Delay" } },
    ],
  },
  {
    label: "Data",
    nodes: [
      { type: "filterNode", label: "Filter", data: { label: "Filter" } },
      { type: "mapNode", label: "Map", data: { label: "Map" } },
      { type: "templateNode", label: "Template", data: { label: "Template" } },
      { type: "mergeNode", label: "Merge", data: { label: "Merge" } },
    ],
  },
  {
    label: "Communication",
    nodes: [
      { type: "emailNode", label: "Email", data: { label: "Email" } },
      {
        type: "notificationNode",
        label: "Notification",
        data: { label: "Notification" },
      },
    ],
  },
];

let demoNodeCounter = 0;
const getDemoNodeId = () => `demo_${Date.now()}_${demoNodeCounter++}`;

/**
 * Interactive demo page for Vortex workflow builder.
 */
function DemoPage() {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => dslToReactFlow(demoWorkflow),
    [],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showPalette, setShowPalette] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const handleSignIn = () => {
    authClient.signIn.oauth2({
      providerId: "omni",
      callbackURL: "/workspaces",
    });
  };

  const onConnect = useCallback(
    (params: Connection) => {
      const edge: Edge = {
        ...params,
        id: `edge_${Date.now()}`,
        type: "smart",
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: "#2563eb", strokeWidth: 2 },
      } as Edge;

      const sourceNode = nodes.find((n) => n.id === params.source);

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

      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges, nodes],
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleNodeUpdate = useCallback(
    (nodeId: string, data: Record<string, unknown>) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n,
        ),
      );
      // Keep sidebar in sync
      setSelectedNode((prev) =>
        prev?.id === nodeId
          ? { ...prev, data: { ...prev.data, ...data } }
          : prev,
      );
    },
    [setNodes],
  );

  const handleNodeDelete = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((n) => n.id !== nodeId));
      setEdges((eds) =>
        eds.filter((e) => e.source !== nodeId && e.target !== nodeId),
      );
      setSelectedNode(null);
    },
    [setNodes, setEdges],
  );

  const handleAddNode = useCallback(
    (type: string, data: Record<string, unknown>) => {
      const center = reactFlowInstance?.project({
        x: (reactFlowWrapper.current?.clientWidth ?? 800) / 2,
        y: (reactFlowWrapper.current?.clientHeight ?? 600) / 2,
      }) ?? { x: 400, y: 300 };

      const stepName = generateUniqueStepName(type, nodes);

      const newNode: Node = {
        id: getDemoNodeId(),
        type,
        position: {
          x: center.x + (Math.random() - 0.5) * 100,
          y: center.y + (Math.random() - 0.5) * 100,
        },
        data: { ...data, stepName },
      };

      setNodes((nds) => [...nds, newNode]);
      setShowPalette(false);
    },
    [reactFlowInstance, nodes, setNodes],
  );

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* Demo banner */}
      {!bannerDismissed && (
        <div className="relative z-20 flex items-center justify-between border-b bg-primary/5 px-4 py-2.5">
          <div className="flex flex-1 items-center justify-center gap-3">
            <span className="font-medium text-foreground text-sm">
              Interactive Demo
            </span>
            <span className="hidden text-muted-foreground text-sm sm:inline">
              &mdash; Drag nodes, connect them, and explore the workflow
              builder. Nothing is saved.
            </span>
            <Button size="sm" onClick={handleSignIn} className="ml-2 gap-1.5">
              Sign up free
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setBannerDismissed(true)}
            className="ml-4 rounded p-1 text-muted-foreground hover:text-foreground"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Toolbar */}
      <div className="z-20 flex items-center justify-between border-b bg-background/80 px-4 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80">
            <img src="/logo.png" alt="Vortex" className="h-6 w-6" />
          </Link>
          <div className="h-5 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-foreground text-sm">
              AI Content Pipeline
            </span>
            <span className="rounded bg-amber-500/10 px-1.5 py-0.5 font-medium text-amber-600 text-xs dark:text-amber-400">
              Demo
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>

      {/* Canvas + Sidebar */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* ReactFlow Canvas */}
        <div ref={reactFlowWrapper} className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            connectionLineType={ConnectionLineType.SmoothStep}
            defaultEdgeOptions={{
              type: "smart",
              markerEnd: { type: MarkerType.ArrowClosed },
              style: { stroke: "#6366f1", strokeWidth: 2 },
            }}
            snapToGrid
            snapGrid={[16, 16]}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            minZoom={0.1}
            maxZoom={2}
            proOptions={{ hideAttribution: true }}
          >
            <Background gap={16} size={1} />
            <Controls />
          </ReactFlow>
        </div>

        {/* Floating Add Node button */}
        <div className="absolute bottom-6 left-6 z-10">
          <Button
            size="icon"
            className="!h-14 !w-14 !rounded-full shadow-lg hover:shadow-xl"
            onClick={() => setShowPalette(!showPalette)}
          >
            <Plus className="!h-6 !w-6" />
            <span className="sr-only">Add Node</span>
          </Button>
        </div>

        {/* Node palette popover */}
        {showPalette && (
          <div className="absolute bottom-24 left-6 z-10 w-72 rounded-xl border bg-background shadow-2xl">
            <div className="flex items-center gap-2 border-b px-4 py-3">
              <Layers className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold text-sm">Add Node</span>
              <button
                type="button"
                onClick={() => setShowPalette(false)}
                className="ml-auto rounded p-0.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {DEMO_PALETTE.map((group) => (
                <div key={group.label} className="mb-2">
                  <p className="mb-1 px-2 pt-1 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                    {group.label}
                  </p>
                  {group.nodes.map((node) => (
                    <button
                      key={`${group.label}-${node.label}`}
                      type="button"
                      onClick={() => handleAddNode(node.type, node.data)}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent"
                    >
                      <span className="text-foreground">{node.label}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Node config sidebar */}
        {selectedNode && (
          <NodeConfigSidebar
            selectedNode={selectedNode}
            allNodes={nodes}
            onNodeUpdate={handleNodeUpdate}
            onNodeDelete={handleNodeDelete}
            onClose={() => setSelectedNode(null)}
          />
        )}
      </div>
    </div>
  );
}
