"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";

import type React from "react";
import type { Connection, Edge, Node, ReactFlowInstance } from "reactflow";
import "reactflow/dist/style.css";

import { ChevronDown, Loader2, PlayCircle, Save } from "lucide-react";
import { toast } from "sonner";

import DebugPane from "@/components/DebugPane";
import { NodeConfigPanel } from "@/components/workflow/NodeConfigPanel";
import { ActionNode } from "@/components/nodes/ActionNode";
import { ConditionNode } from "@/components/nodes/ConditionNode";
import { SwitchNode } from "@/components/nodes/SwitchNode";
import { TriggerNode } from "@/components/nodes/TriggerNode";
import { UserProfile } from "@/components/UserProfile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import WorkflowSidebar from "@/components/WorkflowSidebar";
import {
  createEmptyWorkflow,
  getAllWorkflowNames,
  getWorkflowById,
  saveCustomWorkflow,
} from "@/lib/sample-workflows";
import { NodeTypes } from "@/lib/schema";

const nodeTypes = {
  triggerNode: TriggerNode,
  actionNode: ActionNode,
  conditionNode: ConditionNode,
  switchNode: SwitchNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

let id = 0;
const getId = () => `node_${id++}`;

export function WorkflowApp() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [loading, setLoading] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [currentWorkflow, setCurrentWorkflow] =
    useState<string>("email-automation");
  const [workflowName, setWorkflowName] = useState("Email Automation");
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  // Refs to always access current state
  const nodesRef = useRef(nodes);
  const edgesRef = useRef(edges);

  // Keep refs updated
  nodesRef.current = nodes;
  edgesRef.current = edges;

  // Load initial workflow
  useEffect(() => {
    const workflow = getWorkflowById(currentWorkflow);
    if (workflow) {
      setNodes(workflow.nodes);
      setEdges(workflow.edges);
      setWorkflowName(workflow.name);
    }
  }, []);

  const handleWorkflowChange = useCallback(
    (workflowId: string) => {
      const workflow = getWorkflowById(workflowId);
      if (workflow) {
        setNodes(workflow.nodes);
        setEdges(workflow.edges);
        setCurrentWorkflow(workflowId);
        setWorkflowName(workflow.name);
        setSelectedNode(null); // Clear selected node when switching workflows

        if (typeof window !== "undefined" && (window as any).logToDebugPane) {
          (window as any).logToDebugPane("action", "Workflow loaded", null, {
            nodeType: "Workflow",
            nodeName: workflow.name,
            expectedOutcome: `Loaded workflow: ${workflow.name}`,
          });
        }

        toast.success(`Loaded workflow: ${workflow.name}`);
      }
    },
    [setNodes, setEdges],
  );

  const handleNewWorkflow = useCallback(() => {
    const newWorkflow = createEmptyWorkflow();
    setNodes([]);
    setEdges([]);
    setCurrentWorkflow(newWorkflow.id);
    setWorkflowName(newWorkflow.name);
    setSelectedNode(null);

    if (typeof window !== "undefined" && (window as any).logToDebugPane) {
      (window as any).logToDebugPane("action", "New workflow created", null, {
        nodeType: "Workflow",
        nodeName: newWorkflow.name,
        expectedOutcome: "Empty workflow ready for editing",
      });
    }

    toast.success("New workflow created");
  }, [setNodes, setEdges]);

  const handleSaveWorkflow = useCallback(() => {
    const currentWorkflowData = getWorkflowById(currentWorkflow);

    if (currentWorkflowData) {
      // Update existing workflow
      const updatedWorkflow = {
        ...currentWorkflowData,
        nodes: nodes as any,
        edges: edges as any,
      };

      if (saveCustomWorkflow(updatedWorkflow)) {
        toast.success(`Workflow "${workflowName}" saved successfully!`);
      } else {
        toast.error("Failed to save workflow");
      }
    } else {
      // Create new custom workflow
      const newWorkflow = {
        id: currentWorkflow,
        name: workflowName,
        description: "Custom workflow",
        nodes: nodes as any,
        edges: edges as any,
      };

      if (saveCustomWorkflow(newWorkflow)) {
        toast.success(`Workflow "${workflowName}" saved successfully!`);
      } else {
        toast.error("Failed to save workflow");
      }
    }

    if (typeof window !== "undefined" && (window as any).logToDebugPane) {
      (window as any).logToDebugPane("action", "Workflow saved", null, {
        nodeType: "Workflow",
        nodeName: workflowName,
        expectedOutcome: `Saved workflow: ${workflowName}`,
      });
    }
  }, [currentWorkflow, workflowName, nodes, edges]);

  const onConnect = useCallback(
    (params: Connection) => {
      const sourceNode = nodes.find((n) => n.id === params.source);
      const targetNode = nodes.find((n) => n.id === params.target);

      if (sourceNode && targetNode) {
        if (typeof window !== "undefined" && (window as any).logToDebugPane) {
          (window as any).logToDebugPane("action", "Nodes connected", null, {
            nodeType: "Connection",
            nodeName: `${sourceNode.data.label} → ${targetNode.data.label}`,
            expectedOutcome: `${sourceNode.data.label} will trigger ${targetNode.data.label}`,
          });
        }
      }

      const edge: any = {
        ...params,
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: "#2563eb" },
      };

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
    [setEdges, nodes],
  );

  const executeConnectedActions = useCallback(
    async (triggerId: string) => {
      console.log("executeConnectedActions called with triggerId:", triggerId);
      const connectedEdges = edgesRef.current.filter(
        (edge) => edge.source === triggerId,
      );
      console.log("Found connected edges:", connectedEdges);
      const nextNodes = connectedEdges.map((edge) =>
        nodesRef.current.find((node) => node.id === edge.target),
      );
      console.log("Next nodes to execute:", nextNodes);

      for (const node of nextNodes) {
        if (node && node.type === NodeTypes.ACTION) {
          console.log("Executing action node:", node.data.label);

          if (typeof window !== "undefined" && (window as any).logToDebugPane) {
            (window as any).logToDebugPane(
              "action",
              `Triggered: ${node.data.label}`,
              node.data,
              {
                nodeType: "Action",
                nodeName: node.data.label,
                expectedOutcome: `Execute ${node.data.label} action`,
              },
            );
          }
        }
      }
    },
    [nodesRef, edgesRef],
  );

  const handleNodeClick = useCallback((event: any, node: Node) => {
    event.stopPropagation();
    setSelectedNode(node);

    if (typeof window !== "undefined" && (window as any).logToDebugPane) {
      (window as any).logToDebugPane("action", "Node selected", null, {
        nodeType: "Click Trigger",
        nodeName: node.data.label,
        expectedOutcome: "Manual workflow execution",
      });
    }
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      let nodeData;
      try {
        nodeData = JSON.parse(type);
      } catch (error) {
        console.error("Failed to parse dropped data:", error);
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: getId(),
        type: nodeData.type,
        position,
        data: {
          ...nodeData.data,
          executeConnectedActions:
            nodeData.type === NodeTypes.TRIGGER
              ? executeConnectedActions
              : undefined,
          onNodeSelect: (node: Node) => setSelectedNode(node),
        },
      };

      setNodes((nds) => nds.concat(newNode));

      if (typeof window !== "undefined" && (window as any).logToDebugPane) {
        (window as any).logToDebugPane("action", "Node added", newNode.data, {
          nodeType: nodeData.data.label,
          nodeName: nodeData.data.label,
          expectedOutcome: `Added ${nodeData.data.label} node to workflow`,
        });
      }
    },
    [reactFlowInstance, setNodes, executeConnectedActions],
  );

  const handleExecuteWorkflow = async () => {
    setLoading(true);
    try {
      console.log("🚀 [UI] Starting workflow execution");
      console.log(
        "🔍 [UI] About to check if we should use Temporal or direct execution",
      );

      // Check if we have any nodes to execute
      const actionNodes = nodes.filter((node) => node.type === "actionNode");
      console.log(
        `📊 [UI] Found ${actionNodes.length} action nodes to execute`,
      );

      if (actionNodes.length === 0) {
        alert("No action nodes found in workflow!");
        return;
      }

      // Try Temporal execution first
      console.log("🎯 [UI] Attempting Temporal execution...");

      // Prepare workflow definition from the visual workflow
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

      // Execute via Temporal workflow
      const workflowId = `vortex-workflow-${Date.now()}`;

      console.log("📋 [UI] Workflow definition:", workflowDefinition);
      console.log("🔗 [UI] Starting Temporal workflow:", workflowId);
      console.log("🌐 [UI] Making API call to /api/execute-workflow...");

      // Send to Temporal via API
      const response = await fetch("/api/execute-workflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workflowId,
          workflowDefinition,
          workflowType: "executeVortexWorkflow",
        }),
      });

      console.log(
        "📡 [UI] API response received:",
        response.status,
        response.statusText,
      );

      if (!response.ok) {
        console.error("❌ [UI] API call failed with status:", response.status);
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ [UI] Error data:", errorData);

        // Fall back to direct execution if Temporal fails
        console.log(
          "🔄 [UI] Temporal failed, falling back to direct execution...",
        );
        await executeWorkflowDirectly(actionNodes);
        return;
      }

      const result = await response.json();
      console.log("Workflow started:", result);
      console.log("View in Hatchet UI:", result.hatchetUI);

      // Log to debug pane
      if (typeof window !== "undefined" && (window as any).logToDebugPane) {
        (window as any).logToDebugPane(
          "workflow",
          "Workflow Executed",
          result,
          {
            workflowId: result.workflowId,
            hatchetUI: result.hatchetUI,
            nodesExecuted: workflowDefinition.nodes.length,
            executionTime: result.executionTime,
          },
        );
      }

      // Update UI with success
      setLoading(false);

      // Show success feedback
      const executedCount =
        result.executedActions ||
        workflowDefinition.nodes.filter((n) => n.type === "actionNode").length;
      alert(
        `Workflow started successfully!\n\n` +
          `• ${executedCount} actions queued\n` +
          `• Workflow ID: ${result.workflowId}\n` +
          `• View in Hatchet UI: ${result.hatchetUI || "http://localhost:8080"}`,
      );

      console.log("Workflow execution started successfully");
    } catch (error: any) {
      console.error("❌ [UI] Workflow execution failed:", error);

      // Try fallback to direct execution
      console.log("🔄 [UI] Attempting fallback to direct execution...");
      try {
        const actionNodes = nodes.filter((node) => node.type === "actionNode");
        await executeWorkflowDirectly(actionNodes);
        console.log("✅ [UI] Direct execution completed successfully");
      } catch (fallbackError) {
        console.error("❌ [UI] Even direct execution failed:", fallbackError);

        // Log error to debug pane
        if (typeof window !== "undefined" && (window as any).logToDebugPane) {
          (window as any).logToDebugPane(
            "error",
            "All Workflow Execution Failed",
            {
              hatchetError: error.message,
              directError: (fallbackError as Error).message,
            },
            {
              workflowType: "Failed Execution",
              troubleshooting: "Both Hatchet and direct execution failed",
            },
          );
        }

        alert(
          `❌ All workflow execution methods failed:\n\nTemporal: ${error.message}\nDirect: ${(fallbackError as Error).message}\n\nCheck console for details.`,
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Fallback direct execution function
  const executeWorkflowDirectly = async (actionNodes: any[]) => {
    console.log("⚡ [UI] Executing workflow directly (bypassing Temporal)");
    let executedCount = 0;

    for (const node of actionNodes) {
      console.log(`🔄 [UI] Executing node: ${node.data.label}`);

      try {
        if (node.data.label === "Browser Alert") {
          const message =
            node.data.description ||
            node.data.config?.message ||
            "Alert from workflow";
          alert(message);
          executedCount++;
        } else if (node.data.label === "HTTP Call") {
          const url = node.data.config?.url || "https://httpbin.org/get";
          const response = await fetch(url);
          console.log(`HTTP Call result: ${response.status}`);
          executedCount++;
        } else if (node.data.label === "Send Email") {
          console.log("Email action executed (simulated)");
          executedCount++;
        }

        // Small delay to see execution
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (nodeError) {
        console.error(`Failed to execute node ${node.data.label}:`, nodeError);
      }
    }

    alert(`Direct execution completed: ${executedCount} actions executed`);
  };

  return (
    <div className="flex h-screen bg-background">
      <WorkflowSidebar
        currentWorkflow={{
          id: currentWorkflow,
          name: workflowName,
          description: getWorkflowById(currentWorkflow)?.description,
        }}
        onAddNode={(type, data) => {
          const newNode = {
            id: getId(),
            type,
            position: { x: 100, y: 100 },
            data: {
              ...data,
              executeConnectedActions:
                type === NodeTypes.TRIGGER
                  ? executeConnectedActions
                  : undefined,
              onNodeSelect: (node: Node) => setSelectedNode(node),
            },
          };
          setNodes((nds) => nds.concat(newNode));

          if (typeof window !== "undefined" && (window as any).logToDebugPane) {
            (window as any).logToDebugPane(
              "action",
              "Node added via sidebar",
              data,
              {
                nodeType: data.label,
                nodeName: data.label,
                expectedOutcome: `Added ${data.label} node to workflow`,
              },
            );
          }
        }}
      />

      <div className="flex flex-1 flex-col">
        <div className="border-border border-b bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="min-w-50 justify-between"
                  >
                    {workflowName}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-62.5">
                  {getAllWorkflowNames().map((workflow) => (
                    <DropdownMenuItem
                      key={workflow.id}
                      onClick={() => handleWorkflowChange(workflow.id)}
                      className="flex flex-col items-start p-3"
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="font-medium">{workflow.name}</div>
                        {workflow.isCustom && (
                          <span className="rounded bg-primary px-1.5 py-0.5 text-primary-foreground text-xs">
                            Custom
                          </span>
                        )}
                      </div>
                      {workflow.description && (
                        <div className="text-muted-foreground text-sm">
                          {workflow.description}
                        </div>
                      )}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleNewWorkflow} className="p-3">
                    <div className="font-medium">Create New Workflow</div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex space-x-2">
                <Button
                  onClick={handleSaveWorkflow}
                  variant="outline"
                  disabled={loading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>

                <Button onClick={handleExecuteWorkflow} disabled={loading}>
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <PlayCircle className="mr-2 h-4 w-4" />
                  )}
                  Execute Workflow
                </Button>
              </div>
            </div>

            <UserProfile />
          </div>
        </div>

        <div className="relative flex-1" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onNodeClick={handleNodeClick}
            fitView
            className="bg-background"
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>

        <DebugPane />
      </div>

      <NodeConfigPanel
        node={selectedNode}
        isOpen={!!selectedNode}
        onClose={() => setSelectedNode(null)}
        onUpdate={(nodeId: string, data: Record<string, unknown>) => {
          setNodes((nds) =>
            nds.map((n) => (n.id === nodeId ? { ...n, data } : n)),
          );
          setSelectedNode(null);
          toast.success("Node updated successfully");

          if (typeof window !== "undefined" && (window as any).logToDebugPane) {
            (window as any).logToDebugPane("action", "Node updated", data, {
              nodeType: "Node Editor",
              nodeName: data.label as string,
              expectedOutcome: "Node configuration saved",
            });
          }
        }}
      />
    </div>
  );
}
