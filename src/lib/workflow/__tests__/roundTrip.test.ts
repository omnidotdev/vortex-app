import { describe, expect, it } from "bun:test";

import dslToReactFlow, { isDslFormat } from "@/lib/workflow/dslToReactFlow";
import dslToTypeScript from "@/lib/workflow/dslToTypeScript";
import { reactFlowToDsl } from "@/lib/workflow/reactFlowToDsl";

import type { Edge, Node } from "reactflow";
import type { WorkflowDefinition } from "@/lib/workflow/types";

// -- Helpers ------------------------------------------------------------------

/**
 * Assert structural equivalence between two sets of nodes.
 * Ignores position differences (dagre layout may adjust them) and only
 * compares node count, types, and IDs
 */
function expectStructuralNodeEquivalence(
  original: Node[],
  roundTripped: Node[],
) {
  expect(roundTripped.length).toBe(original.length);

  const origById = new Map(original.map((n) => [n.id, n]));

  for (const rt of roundTripped) {
    const orig = origById.get(rt.id);
    expect(orig).toBeDefined();
    expect(rt.type).toBe(orig!.type);
  }
}

/**
 * Assert that edges are structurally equivalent.
 * Compares source, target, and sourceHandle for each edge
 */
function expectEdgeEquivalence(original: Edge[], roundTripped: Edge[]) {
  expect(roundTripped.length).toBe(original.length);

  const key = (e: Edge) => `${e.source}::${e.target}::${e.sourceHandle ?? ""}`;
  const origKeys = new Set(original.map(key));

  for (const rt of roundTripped) {
    expect(origKeys.has(key(rt))).toBe(true);
  }
}

/**
 * Run a full round trip: ReactFlow -> DSL -> ReactFlow and assert
 * structural equivalence
 */
function roundTrip(nodes: Node[], edges: Edge[]) {
  const dsl = reactFlowToDsl(nodes, edges);
  const result = dslToReactFlow(dsl);

  return { dsl, result };
}

// -- Fixtures -----------------------------------------------------------------

function makeTriggerNode(
  id: string,
  triggerType = "webhook",
  config: Record<string, unknown> = {},
): Node {
  return {
    id,
    type: "triggerNode",
    position: { x: 100, y: 50 },
    data: {
      label: "Webhook Trigger",
      triggerType,
      config,
    },
  };
}

function makeActionNode(
  id: string,
  label: string,
  opts: Record<string, unknown> = {},
): Node {
  return {
    id,
    type: "actionNode",
    position: { x: 200, y: 200 },
    data: {
      label,
      integrationDefinitionId: opts.integrationDefinitionId ?? "slack",
      operation: opts.operation ?? "sendMessage",
      inputs: opts.inputs ?? { channel: "#general", text: "Hello" },
      ...opts,
    },
  };
}

function makeEdge(source: string, target: string, sourceHandle?: string): Edge {
  const id = `${source}-${sourceHandle ?? "out"}-${target}`;
  return {
    id,
    source,
    target,
    sourceHandle: sourceHandle ?? null,
  };
}

// -- Tests --------------------------------------------------------------------

describe("reactFlowToDsl", () => {
  it("should convert trigger + action workflow", () => {
    const nodes: Node[] = [
      makeTriggerNode("t1"),
      makeActionNode("a1", "Send Slack Message"),
    ];
    const edges: Edge[] = [makeEdge("t1", "a1")];

    const dsl = reactFlowToDsl(nodes, edges);

    expect(dsl.version).toBe("1.0");
    expect(dsl.steps.length).toBe(2);
    expect(dsl.edges.length).toBe(1);

    const trigger = dsl.steps.find((s) => s.type === "trigger");
    expect(trigger).toBeDefined();
    expect(trigger!.name).toBe("Webhook Trigger");

    const action = dsl.steps.find((s) => s.type === "action");
    expect(action).toBeDefined();
    expect(action!.name).toBe("Send Slack Message");
  });
});

describe("dslToReactFlow", () => {
  it("should convert trigger + action DSL back to ReactFlow", () => {
    const dsl: WorkflowDefinition = {
      version: "1.0",
      steps: [
        {
          id: "t1",
          type: "trigger",
          name: "Webhook Trigger",
          position: { x: 100, y: 50 },
          trigger: { type: "webhook", config: {} },
        },
        {
          id: "a1",
          type: "action",
          name: "Send Slack Message",
          position: { x: 200, y: 200 },
          action: {
            integrationId: "slack",
            operation: "sendMessage",
            inputs: { channel: "#general" },
          },
        },
      ],
      edges: [{ id: "e1", source: "t1", target: "a1" }],
    };

    const { nodes, edges } = dslToReactFlow(dsl);

    expect(nodes.length).toBe(2);
    expect(edges.length).toBe(1);

    const triggerNode = nodes.find((n) => n.type === "triggerNode");
    expect(triggerNode).toBeDefined();
    expect(triggerNode!.data.label).toBe("Webhook Trigger");

    const actionNode = nodes.find((n) => n.type === "actionNode");
    expect(actionNode).toBeDefined();
    expect(actionNode!.data.label).toBe("Send Slack Message");
  });

  it("should apply dagre auto-layout for SDK-generated definitions with synthetic positions", () => {
    // SDK-generated definitions have all step positions at y: 0
    const dsl: WorkflowDefinition = {
      version: "1.0",
      steps: [
        {
          id: "t1",
          type: "trigger",
          name: "Webhook Trigger",
          position: { x: 0, y: 0 },
          trigger: { type: "webhook", config: {} },
        },
        {
          id: "a1",
          type: "action",
          name: "Send Slack Message",
          position: { x: 0, y: 0 },
          action: {
            integrationId: "slack",
            operation: "sendMessage",
            inputs: { channel: "#general" },
          },
        },
      ],
      edges: [{ id: "e1", source: "t1", target: "a1" }],
    };

    const { nodes, edges } = dslToReactFlow(dsl);

    // Dagre should have adjusted positions so at least one node's y is no longer 0
    const hasAdjustedY = nodes.some((n) => n.position.y !== 0);
    expect(hasAdjustedY).toBe(true);

    // Structural equivalence is preserved (node types, data)
    expect(nodes.length).toBe(2);
    expect(edges.length).toBe(1);

    const triggerNode = nodes.find((n) => n.type === "triggerNode");
    expect(triggerNode).toBeDefined();
    expect(triggerNode!.data.label).toBe("Webhook Trigger");

    const actionNode = nodes.find((n) => n.type === "actionNode");
    expect(actionNode).toBeDefined();
    expect(actionNode!.data.label).toBe("Send Slack Message");
  });

  it("should handle definitions without stepNameToId", () => {
    // Definition with no stepNameToId field
    const dsl: WorkflowDefinition = {
      version: "1.0",
      steps: [
        {
          id: "t1",
          type: "trigger",
          name: "Webhook Trigger",
          position: { x: 100, y: 50 },
          trigger: { type: "webhook", config: {} },
        },
        {
          id: "a1",
          type: "action",
          name: "Send Slack Message",
          position: { x: 200, y: 200 },
          action: {
            integrationId: "slack",
            operation: "sendMessage",
            inputs: { channel: "#general" },
          },
        },
      ],
      edges: [{ id: "e1", source: "t1", target: "a1" }],
    };

    const { nodes } = dslToReactFlow(dsl);

    // Nodes are created successfully
    expect(nodes.length).toBe(2);

    // No stepName should be set on any node since there is no mapping
    for (const node of nodes) {
      expect(node.data.stepName).toBeUndefined();
    }
  });
});

describe("round trip: ReactFlow -> DSL -> ReactFlow", () => {
  it("should preserve a simple trigger + action workflow", () => {
    const nodes: Node[] = [
      makeTriggerNode("t1"),
      makeActionNode("a1", "Send Slack Message"),
    ];
    const edges: Edge[] = [makeEdge("t1", "a1")];

    const { result } = roundTrip(nodes, edges);

    expectStructuralNodeEquivalence(nodes, result.nodes);
    expectEdgeEquivalence(edges, result.edges);
  });

  it("should preserve a condition with true/false branches", () => {
    const nodes: Node[] = [
      makeTriggerNode("t1"),
      {
        id: "c1",
        type: "conditionNode",
        position: { x: 200, y: 150 },
        data: {
          label: "Check Status",
          expression: "status === 'active'",
        },
      },
      makeActionNode("a1", "Handle Active"),
      makeActionNode("a2", "Handle Inactive"),
    ];
    const edges: Edge[] = [
      makeEdge("t1", "c1"),
      makeEdge("c1", "a1", "true"),
      makeEdge("c1", "a2", "false"),
    ];

    const { dsl, result } = roundTrip(nodes, edges);

    // Verify DSL has condition step with branches
    const condStep = dsl.steps.find((s) => s.type === "condition");
    expect(condStep).toBeDefined();
    if (condStep?.type === "condition") {
      expect(condStep.condition.trueBranch).toBe("a1");
      expect(condStep.condition.falseBranch).toBe("a2");
    }

    expectStructuralNodeEquivalence(nodes, result.nodes);

    // Condition edges are synthesized + merged with DSL edges
    // Verify the true/false branch edges exist
    const trueEdge = result.edges.find(
      (e) => e.source === "c1" && e.sourceHandle === "true",
    );
    const falseEdge = result.edges.find(
      (e) => e.source === "c1" && e.sourceHandle === "false",
    );
    expect(trueEdge).toBeDefined();
    expect(trueEdge!.target).toBe("a1");
    expect(falseEdge).toBeDefined();
    expect(falseEdge!.target).toBe("a2");
  });

  it("should preserve a switch with cases and default", () => {
    const nodes: Node[] = [
      makeTriggerNode("t1"),
      {
        id: "sw1",
        type: "switchNode",
        position: { x: 200, y: 150 },
        data: {
          label: "Route by Type",
          expression: "event.type",
          cases: [
            { value: "order", label: "Order" },
            { value: "refund", label: "Refund" },
          ],
        },
      },
      makeActionNode("a1", "Handle Order"),
      makeActionNode("a2", "Handle Refund"),
      makeActionNode("a3", "Handle Default"),
    ];
    const edges: Edge[] = [
      makeEdge("t1", "sw1"),
      makeEdge("sw1", "a1", "case_0"),
      makeEdge("sw1", "a2", "case_1"),
      makeEdge("sw1", "a3", "default"),
    ];

    const { dsl, result } = roundTrip(nodes, edges);

    // Verify DSL switch step
    const switchStep = dsl.steps.find((s) => s.type === "switch");
    expect(switchStep).toBeDefined();
    if (switchStep?.type === "switch") {
      expect(switchStep.switch.cases.length).toBe(2);
      expect(switchStep.switch.cases[0].next).toBe("a1");
      expect(switchStep.switch.cases[1].next).toBe("a2");
      expect(switchStep.switch.default).toBe("a3");
    }

    expectStructuralNodeEquivalence(nodes, result.nodes);

    // Verify case edges survive round trip
    const case0Edge = result.edges.find(
      (e) => e.source === "sw1" && e.sourceHandle === "case_0",
    );
    const case1Edge = result.edges.find(
      (e) => e.source === "sw1" && e.sourceHandle === "case_1",
    );
    const defaultEdge = result.edges.find(
      (e) => e.source === "sw1" && e.sourceHandle === "default",
    );
    expect(case0Edge?.target).toBe("a1");
    expect(case1Edge?.target).toBe("a2");
    expect(defaultEdge?.target).toBe("a3");
  });

  it("should preserve a loop step", () => {
    const nodes: Node[] = [
      makeTriggerNode("t1"),
      {
        id: "l1",
        type: "loopNode",
        position: { x: 200, y: 150 },
        data: {
          label: "Process Items",
          loopType: "forEach",
          collection: "items",
          itemVariable: "item",
          indexVariable: "idx",
          body: ["a1"],
          maxIterations: 100,
        },
      },
      makeActionNode("a1", "Process Item"),
    ];
    const edges: Edge[] = [makeEdge("t1", "l1"), makeEdge("l1", "a1")];

    const { dsl, result } = roundTrip(nodes, edges);

    const loopStep = dsl.steps.find((s) => s.type === "loop");
    expect(loopStep).toBeDefined();
    if (loopStep?.type === "loop") {
      expect(loopStep.loop.type).toBe("forEach");
      expect(loopStep.loop.collection).toBe("items");
      expect(loopStep.loop.itemVariable).toBe("item");
      expect(loopStep.loop.indexVariable).toBe("idx");
      expect(loopStep.loop.body).toEqual(["a1"]);
      expect(loopStep.loop.maxIterations).toBe(100);
    }

    expectStructuralNodeEquivalence(nodes, result.nodes);
    expectEdgeEquivalence(edges, result.edges);
  });

  it("should preserve a parallel step", () => {
    const nodes: Node[] = [
      makeTriggerNode("t1"),
      {
        id: "p1",
        type: "parallelNode",
        position: { x: 200, y: 150 },
        data: {
          label: "Run in Parallel",
          branches: [["a1"], ["a2"]],
          waitFor: "all",
        },
      },
      makeActionNode("a1", "Branch A"),
      makeActionNode("a2", "Branch B"),
    ];
    const edges: Edge[] = [
      makeEdge("t1", "p1"),
      makeEdge("p1", "a1"),
      makeEdge("p1", "a2"),
    ];

    const { dsl, result } = roundTrip(nodes, edges);

    const parallelStep = dsl.steps.find((s) => s.type === "parallel");
    expect(parallelStep).toBeDefined();
    if (parallelStep?.type === "parallel") {
      expect(parallelStep.parallel.branches).toEqual([["a1"], ["a2"]]);
      expect(parallelStep.parallel.waitFor).toBe("all");
    }

    expectStructuralNodeEquivalence(nodes, result.nodes);
    expectEdgeEquivalence(edges, result.edges);
  });

  it("should preserve a gate step", () => {
    const nodes: Node[] = [
      makeTriggerNode("t1"),
      {
        id: "g1",
        type: "gateNode",
        position: { x: 200, y: 150 },
        data: {
          label: "Approval Gate",
          gateType: "approval",
          approvers: ["admin@example.com"],
          timeout: "24h",
          timeoutAction: "reject",
        },
      },
      makeActionNode("a1", "Continue"),
    ];
    const edges: Edge[] = [makeEdge("t1", "g1"), makeEdge("g1", "a1")];

    const { dsl, result } = roundTrip(nodes, edges);

    const gateStep = dsl.steps.find((s) => s.type === "gate");
    expect(gateStep).toBeDefined();
    if (gateStep?.type === "gate") {
      expect(gateStep.gate.type).toBe("approval");
      expect(gateStep.gate.approvers).toEqual(["admin@example.com"]);
      expect(gateStep.gate.timeout).toBe("24h");
      expect(gateStep.gate.timeoutAction).toBe("reject");
    }

    expectStructuralNodeEquivalence(nodes, result.nodes);
    expectEdgeEquivalence(edges, result.edges);
  });

  it("should preserve an LLM step", () => {
    // Test DSL -> ReactFlow direction for LLM
    const dsl: WorkflowDefinition = {
      version: "1.0",
      steps: [
        {
          id: "t1",
          type: "trigger",
          name: "Start",
          position: { x: 100, y: 50 },
          trigger: { type: "manual", config: {} },
        },
        {
          id: "llm1",
          type: "prompt",
          name: "Generate Text",
          position: { x: 200, y: 200 },
          prompt: {
            model: "gpt-4",
            template: "Summarize: {{input}}",
            outputVariable: "result",
          },
        },
      ],
      edges: [{ id: "e1", source: "t1", target: "llm1" }],
    };

    const { nodes, edges } = dslToReactFlow(dsl);

    expect(nodes.length).toBe(2);
    const promptNode = nodes.find((n) => n.id === "llm1");
    expect(promptNode).toBeDefined();
    expect(promptNode!.type).toBe("promptNode");
    expect(promptNode!.data.label).toBe("Generate Text");
    expect(promptNode!.data.model).toBe("gpt-4");
    expect(promptNode!.data.template).toBe("Summarize: {{input}}");

    // Round trip back
    const dsl2 = reactFlowToDsl(nodes, edges);
    const promptStep = dsl2.steps.find((s) => s.id === "llm1");
    expect(promptStep).toBeDefined();
    expect(promptStep!.type).toBe("prompt");
  });

  it("should preserve an MCP step via the plugin node type", () => {
    const nodes: Node[] = [
      makeTriggerNode("t1"),
      {
        id: "mcp1",
        type: "pluginNode",
        position: { x: 200, y: 200 },
        data: {
          label: "MCP Server Call",
          pluginId: "mcp-server-github",
          function: "listRepos",
          inputs: { org: "omnidotdev" },
          timeout: 30000,
        },
      },
    ];
    const edges: Edge[] = [makeEdge("t1", "mcp1")];

    const { dsl, result } = roundTrip(nodes, edges);

    const pluginStep = dsl.steps.find((s) => s.type === "plugin");
    expect(pluginStep).toBeDefined();
    if (pluginStep?.type === "plugin") {
      expect(pluginStep.plugin.pluginId).toBe("mcp-server-github");
      expect(pluginStep.plugin.function).toBe("listRepos");
      expect(pluginStep.plugin.inputs).toEqual({ org: "omnidotdev" });
      expect(pluginStep.plugin.timeout).toBe(30000);
    }

    expectStructuralNodeEquivalence(nodes, result.nodes);
    expectEdgeEquivalence(edges, result.edges);
  });

  it("should preserve a code step via the extended node types", () => {
    // Use a "log" step as a representative extended type (code nodes
    // are handled generically in dslToReactFlow via extendedStepToNodeData)
    const nodes: Node[] = [
      makeTriggerNode("t1"),
      {
        id: "log1",
        type: "logNode",
        position: { x: 200, y: 200 },
        data: {
          label: "Debug Log",
          level: "info",
          message: "Processing item: {{item.id}}",
        },
      },
    ];
    const edges: Edge[] = [makeEdge("t1", "log1")];

    const { dsl, result } = roundTrip(nodes, edges);

    const logStep = dsl.steps.find((s) => s.type === "log");
    expect(logStep).toBeDefined();
    if (logStep && "log" in logStep) {
      expect(logStep.log.level).toBe("info");
      expect(logStep.log.message).toBe("Processing item: {{item.id}}");
    }

    expectStructuralNodeEquivalence(nodes, result.nodes);
    expectEdgeEquivalence(edges, result.edges);
  });

  it("should preserve a database step via the hash node type", () => {
    // Use hash node as a representative data processing type
    const nodes: Node[] = [
      makeTriggerNode("t1"),
      {
        id: "h1",
        type: "hashNode",
        position: { x: 200, y: 200 },
        data: {
          label: "Hash Data",
          algorithm: "sha256",
          encoding: "hex",
          source: "payload.body",
          outputVariable: "hashed",
        },
      },
    ];
    const edges: Edge[] = [makeEdge("t1", "h1")];

    const { dsl, result } = roundTrip(nodes, edges);

    const hashStep = dsl.steps.find((s) => s.type === "hash");
    expect(hashStep).toBeDefined();
    if (hashStep && "hash" in hashStep) {
      expect(hashStep.hash.algorithm).toBe("sha256");
      expect(hashStep.hash.source).toBe("payload.body");
    }

    expectStructuralNodeEquivalence(nodes, result.nodes);
    expectEdgeEquivalence(edges, result.edges);
  });

  it("should preserve a full workflow with mixed step types", () => {
    const nodes: Node[] = [
      makeTriggerNode("t1", "webhook", { path: "/api/orders" }),
      {
        id: "c1",
        type: "conditionNode",
        position: { x: 200, y: 150 },
        data: {
          label: "Check Amount",
          expression: "order.amount > 100",
        },
      },
      makeActionNode("a1", "Send High-Value Alert", {
        integrationDefinitionId: "slack",
        operation: "sendMessage",
        inputs: { channel: "#alerts", text: "High value order" },
      }),
      {
        id: "l1",
        type: "loopNode",
        position: { x: 400, y: 300 },
        data: {
          label: "Process Line Items",
          loopType: "forEach",
          collection: "order.items",
          itemVariable: "lineItem",
          body: [],
        },
      },
      {
        id: "g1",
        type: "gateNode",
        position: { x: 400, y: 450 },
        data: {
          label: "Manager Approval",
          gateType: "approval",
          approvers: ["manager@example.com"],
        },
      },
      makeActionNode("a2", "Confirm Order", {
        integrationDefinitionId: "email",
        operation: "send",
        inputs: { to: "customer@example.com" },
      }),
    ];
    const edges: Edge[] = [
      makeEdge("t1", "c1"),
      makeEdge("c1", "a1", "true"),
      makeEdge("c1", "l1", "false"),
      makeEdge("l1", "g1"),
      makeEdge("g1", "a2"),
    ];

    const { dsl, result } = roundTrip(nodes, edges);

    // Verify all step types are preserved
    expect(dsl.steps.length).toBe(6);
    const types = dsl.steps.map((s) => s.type).sort() as string[];
    expect(types).toEqual(
      ["action", "action", "condition", "gate", "loop", "trigger"].sort(),
    );

    expectStructuralNodeEquivalence(nodes, result.nodes);

    // Verify at minimum the non-branch edges survive
    const nonBranchEdges = edges.filter(
      (e) => e.sourceHandle !== "true" && e.sourceHandle !== "false",
    );
    for (const edge of nonBranchEdges) {
      const found = result.edges.find(
        (e) => e.source === edge.source && e.target === edge.target,
      );
      expect(found).toBeDefined();
    }

    // Verify condition branch edges survive
    const trueEdge = result.edges.find(
      (e) => e.source === "c1" && e.sourceHandle === "true",
    );
    const falseEdge = result.edges.find(
      (e) => e.source === "c1" && e.sourceHandle === "false",
    );
    expect(trueEdge?.target).toBe("a1");
    expect(falseEdge?.target).toBe("l1");
  });
});

describe("isDslFormat", () => {
  it("should return true for DSL format objects", () => {
    expect(
      isDslFormat({
        version: "1.0",
        steps: [{ id: "s1", type: "trigger" }],
        edges: [],
      }),
    ).toBe(true);
  });

  it("should return false for ReactFlow format objects", () => {
    expect(
      isDslFormat({
        nodes: [{ id: "n1", type: "triggerNode" }],
        edges: [],
      }),
    ).toBe(false);
  });

  it("should return false when both steps and nodes are present", () => {
    // `nodes` array present means it's ReactFlow, not DSL
    expect(
      isDslFormat({
        steps: [{ id: "s1" }],
        nodes: [{ id: "n1" }],
        edges: [],
      }),
    ).toBe(false);
  });

  it("should return false for empty objects", () => {
    expect(isDslFormat({})).toBe(false);
  });

  it("should return false when steps is not an array", () => {
    expect(isDslFormat({ steps: "not-an-array" })).toBe(false);
  });
});

describe("unknown/generic step types", () => {
  it("should handle unknown node types gracefully in reactFlowToDsl", () => {
    const nodes: Node[] = [
      makeTriggerNode("t1"),
      {
        id: "x1",
        type: "unknownCustomNode",
        position: { x: 200, y: 200 },
        data: { label: "Custom Thing" },
      },
    ];
    const edges: Edge[] = [makeEdge("t1", "x1")];

    // Unknown node types are handled by the generic converter
    const dsl = reactFlowToDsl(nodes, edges);
    expect(dsl.steps.length).toBe(2);
    expect(dsl.steps[0].type).toBe("trigger");
    expect(dsl.steps[1].type as string).toBe("unknownCustomNode");
    expect(dsl.steps[1].name).toBe("Custom Thing");
  });

  it("should handle unknown step types gracefully in dslToReactFlow", () => {
    const dsl: WorkflowDefinition = {
      version: "1.0",
      steps: [
        {
          id: "t1",
          type: "trigger",
          name: "Start",
          position: { x: 100, y: 50 },
          trigger: { type: "manual", config: {} },
        },
        // Force an unknown step type via type assertion
        {
          id: "u1",
          type: "someUnknownType" as "action",
          name: "Unknown Step",
          position: { x: 200, y: 200 },
          action: {
            operation: "test",
            inputs: {},
          },
        } as unknown as WorkflowDefinition["steps"][number],
      ],
      edges: [{ id: "e1", source: "t1", target: "u1" }],
    };

    // dslToReactFlow handles unknown types via extendedStepToNodeData (default case)
    const { nodes } = dslToReactFlow(dsl);
    expect(nodes.length).toBe(2);

    // Unknown type gets a synthesized node type name
    const unknownNode = nodes.find((n) => n.id === "u1");
    expect(unknownNode).toBeDefined();
    expect(unknownNode!.type).toBe("someUnknownTypeNode");
    expect(unknownNode!.data.label).toBe("Unknown Step");
  });
});

describe("dslToTypeScript", () => {
  it("should generate valid TypeScript with imports and builder pattern", () => {
    const dsl: WorkflowDefinition = {
      version: "1.0",
      steps: [
        {
          id: "t1",
          type: "trigger",
          name: "Webhook",
          position: { x: 0, y: 0 },
          trigger: { type: "webhook", config: { path: "/api/hook" } },
        },
        {
          id: "a1",
          type: "action",
          name: "Send Notification",
          position: { x: 0, y: 100 },
          action: {
            integrationId: "slack",
            operation: "sendMessage",
            inputs: { channel: "#general", text: "Hello" },
          },
        },
      ],
      edges: [{ id: "e1", source: "t1", target: "a1" }],
    };

    const code = dslToTypeScript(dsl, "Order Notifications");

    // Verify import statement
    expect(code).toContain('import { workflow } from "@omnidotdev/vortex"');

    // Verify builder start
    expect(code).toContain(
      'const orderNotifications = workflow("Order Notifications")',
    );

    // Verify trigger call
    expect(code).toContain('.trigger("webhook"');
    expect(code).toContain("/api/hook");

    // Verify action call
    expect(code).toContain('.action("Send Notification"');
    expect(code).toContain("slack");

    // Verify build call
    expect(code).toContain(".build();");

    // Verify export
    expect(code).toContain("export default orderNotifications;");
  });

  it("should generate condition builder calls", () => {
    const dsl: WorkflowDefinition = {
      version: "1.0",
      steps: [
        {
          id: "t1",
          type: "trigger",
          name: "Start",
          position: { x: 0, y: 0 },
          trigger: { type: "manual", config: {} },
        },
        {
          id: "c1",
          type: "condition",
          name: "Is Active",
          position: { x: 0, y: 100 },
          condition: {
            expression: "user.active === true",
            trueBranch: "a1",
            falseBranch: "a2",
          },
        },
      ],
      edges: [{ id: "e1", source: "t1", target: "c1" }],
    };

    const code = dslToTypeScript(dsl);

    expect(code).toContain('.condition("Is Active"');
    expect(code).toContain("user.active === true");
  });

  it("should generate generic step calls for extended types", () => {
    const dsl: WorkflowDefinition = {
      version: "1.0",
      steps: [
        {
          id: "t1",
          type: "trigger",
          name: "Start",
          position: { x: 0, y: 0 },
          trigger: { type: "manual", config: {} },
        },
        {
          id: "d1",
          type: "delay",
          name: "Wait",
          position: { x: 0, y: 100 },
          delay: { duration: 5, unit: "minutes" },
        },
      ],
      edges: [{ id: "e1", source: "t1", target: "d1" }],
    };

    const code = dslToTypeScript(dsl);

    // Delay is a generic step type
    expect(code).toContain('.step("Wait"');
    expect(code).toContain('"type": "delay"');
  });

  it("should handle workflow with variables and settings", () => {
    const dsl: WorkflowDefinition = {
      version: "1.0",
      steps: [
        {
          id: "t1",
          type: "trigger",
          name: "Start",
          position: { x: 0, y: 0 },
          trigger: { type: "manual", config: {} },
        },
      ],
      edges: [],
      variables: {
        count: { type: "number", default: 0, description: "Counter" },
      },
      settings: {
        timeout: "30m",
        retryPolicy: {
          maxAttempts: 3,
          backoffCoefficient: 2,
          initialInterval: "1s",
          maxInterval: "30s",
        },
      },
    };

    const code = dslToTypeScript(dsl);

    expect(code).toContain(".variables(");
    expect(code).toContain(".settings(");
    expect(code).toContain("30m");
    expect(code).toContain("maxAttempts");
  });

  it("should use default workflow name when none is provided", () => {
    const dsl: WorkflowDefinition = {
      version: "1.0",
      steps: [
        {
          id: "t1",
          type: "trigger",
          name: "Start",
          position: { x: 0, y: 0 },
          trigger: { type: "manual", config: {} },
        },
      ],
      edges: [],
    };

    const code = dslToTypeScript(dsl);

    expect(code).toContain('const myWorkflow = workflow("myWorkflow")');
    expect(code).toContain("export default myWorkflow;");
  });

  it("should include the generated-by header comment", () => {
    const dsl: WorkflowDefinition = {
      version: "1.0",
      steps: [],
      edges: [],
    };

    const code = dslToTypeScript(dsl);

    expect(code).toContain("// Generated by Vortex");
  });

  it("should topologically sort steps in edge order", () => {
    const dsl: WorkflowDefinition = {
      version: "1.0",
      steps: [
        {
          id: "a1",
          type: "action",
          name: "Second",
          position: { x: 0, y: 100 },
          action: {
            integrationId: "slack",
            operation: "sendMessage",
            inputs: {},
          },
        },
        {
          id: "t1",
          type: "trigger",
          name: "First",
          position: { x: 0, y: 0 },
          trigger: { type: "manual", config: {} },
        },
      ],
      edges: [{ id: "e1", source: "t1", target: "a1" }],
    };

    const code = dslToTypeScript(dsl);

    // Trigger should appear before action even though steps array has action first
    const triggerIdx = code.indexOf('.trigger("manual"');
    const actionIdx = code.indexOf('.action("Second"');
    expect(triggerIdx).toBeLessThan(actionIdx);
  });
});
