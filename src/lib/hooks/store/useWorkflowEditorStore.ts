import { addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type {
  Connection,
  Edge,
  Node,
  OnEdgesChange,
  OnNodesChange,
} from "reactflow";

export interface WorkflowEditorState {
  // Workflow metadata
  workflowId: string | null;
  workspaceId: string | null;
  name: string;
  description: string;
  triggerType: "manual" | "webhook" | "cron" | "event";
  cronExpression: string | null;
  isActive: boolean;

  // ReactFlow state
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;

  // UI state
  isDirty: boolean;
  isSaving: boolean;
  isExecuting: boolean;

  // Actions
  setWorkflow: (workflow: {
    id: string;
    workspaceId: string;
    name: string;
    description?: string;
    triggerType?: string;
    cronExpression?: string | null;
    isActive?: boolean;
    definition?: Record<string, unknown>;
  }) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (connection: Connection) => void;
  addNode: (node: Node) => void;
  updateNode: (nodeId: string, data: Record<string, unknown>) => void;
  removeNode: (nodeId: string) => void;
  selectNode: (nodeId: string | null) => void;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setTriggerType: (
    triggerType: "manual" | "webhook" | "cron" | "event",
  ) => void;
  setCronExpression: (cronExpression: string | null) => void;
  setIsActive: (isActive: boolean) => void;
  setIsDirty: (isDirty: boolean) => void;
  setIsSaving: (isSaving: boolean) => void;
  setIsExecuting: (isExecuting: boolean) => void;
  reset: () => void;
  getDefinition: () => Record<string, unknown>;
}

const initialState = {
  workflowId: null,
  workspaceId: null,
  name: "Untitled Workflow",
  description: "",
  triggerType: "manual" as const,
  cronExpression: null,
  isActive: false,
  nodes: [],
  edges: [],
  selectedNodeId: null,
  isDirty: false,
  isSaving: false,
  isExecuting: false,
};

export const useWorkflowEditorStore = create<WorkflowEditorState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setWorkflow: (workflow) => {
        set({
          workflowId: workflow.id,
          workspaceId: workflow.workspaceId,
          name: workflow.name,
          description: workflow.description || "",
          triggerType:
            (workflow.triggerType as WorkflowEditorState["triggerType"]) ||
            "manual",
          cronExpression: workflow.cronExpression || null,
          isActive: workflow.isActive ?? false,
          isDirty: false,
        });
      },

      setNodes: (nodes) => {
        set({ nodes, isDirty: true });
      },

      setEdges: (edges) => {
        set({ edges, isDirty: true });
      },

      onNodesChange: (changes) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
          isDirty: true,
        });
      },

      onEdgesChange: (changes) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
          isDirty: true,
        });
      },

      onConnect: (connection) => {
        set({
          edges: addEdge(connection, get().edges),
          isDirty: true,
        });
      },

      addNode: (node) => {
        set({
          nodes: [...get().nodes, node],
          isDirty: true,
        });
      },

      updateNode: (nodeId, data) => {
        set({
          nodes: get().nodes.map((node) =>
            node.id === nodeId
              ? { ...node, data: { ...node.data, ...data } }
              : node,
          ),
          isDirty: true,
        });
      },

      removeNode: (nodeId) => {
        set({
          nodes: get().nodes.filter((node) => node.id !== nodeId),
          edges: get().edges.filter(
            (edge) => edge.source !== nodeId && edge.target !== nodeId,
          ),
          selectedNodeId:
            get().selectedNodeId === nodeId ? null : get().selectedNodeId,
          isDirty: true,
        });
      },

      selectNode: (nodeId) => {
        set({ selectedNodeId: nodeId });
      },

      setName: (name) => {
        set({ name, isDirty: true });
      },

      setDescription: (description) => {
        set({ description, isDirty: true });
      },

      setTriggerType: (triggerType) => {
        set({ triggerType, isDirty: true });
      },

      setCronExpression: (cronExpression) => {
        set({ cronExpression, isDirty: true });
      },

      setIsActive: (isActive) => {
        set({ isActive, isDirty: true });
      },

      setIsDirty: (isDirty) => {
        set({ isDirty });
      },

      setIsSaving: (isSaving) => {
        set({ isSaving });
      },

      setIsExecuting: (isExecuting) => {
        set({ isExecuting });
      },

      reset: () => {
        set(initialState);
      },

      getDefinition: () => {
        const { nodes, edges, triggerType, cronExpression } = get();
        return {
          version: "1.0",
          trigger: {
            type: triggerType,
            ...(cronExpression && { cron: cronExpression }),
          },
          nodes: nodes.map((node) => ({
            id: node.id,
            type: node.type,
            position: node.position,
            data: node.data,
          })),
          edges: edges.map((edge) => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            sourceHandle: edge.sourceHandle,
            targetHandle: edge.targetHandle,
            label: edge.label,
          })),
        };
      },
    }),
    { name: "workflow-editor" },
  ),
);
