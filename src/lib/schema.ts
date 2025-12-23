import { z } from "zod";

// Node Types
export const NodeTypes = {
  TRIGGER: "triggerNode",
  ACTION: "actionNode",
  CONDITION: "conditionNode",
  SWITCH: "switchNode",
  DELAY: "delayNode",
  LOOP: "loopNode",
} as const;

// Base node schema
const baseNodeSchema = z.object({
  id: z.string(),
  type: z.enum([
    NodeTypes.TRIGGER,
    NodeTypes.ACTION,
    NodeTypes.CONDITION,
    NodeTypes.SWITCH,
    NodeTypes.DELAY,
    NodeTypes.LOOP,
  ]),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
});

// Trigger node schema
export const triggerNodeSchema = baseNodeSchema.extend({
  type: z.literal(NodeTypes.TRIGGER),
  data: z.object({
    label: z.string(),
    description: z.string(),
    icon: z.string(),
    config: z.object({
      event: z.string(),
      conditions: z
        .array(
          z.object({
            field: z.string(),
            operator: z.enum(["equals", "contains", "startsWith", "endsWith"]),
            value: z.string(),
          }),
        )
        .optional(),
    }),
  }),
});

// Action node schema
export const actionNodeSchema = baseNodeSchema.extend({
  type: z.literal(NodeTypes.ACTION),
  data: z.object({
    label: z.string(),
    description: z.string(),
    icon: z.string(),
    config: z.object({
      action: z.string(),
      parameters: z.record(z.string(), z.unknown()),
    }),
  }),
});

// Condition node schema
export const conditionNodeSchema = baseNodeSchema.extend({
  type: z.literal(NodeTypes.CONDITION),
  data: z.object({
    label: z.string(),
    description: z.string(),
    icon: z.string(),
    config: z.object({
      condition: z.string(),
      operator: z.enum([
        "equals",
        "notEquals",
        "contains",
        "greaterThan",
        "lessThan",
      ]),
      value: z.union([z.string(), z.number(), z.boolean()]),
    }),
  }),
});

// Switch node schema
export const switchNodeSchema = baseNodeSchema.extend({
  type: z.literal(NodeTypes.SWITCH),
  data: z.object({
    label: z.string(),
    description: z.string(),
    icon: z.string(),
    config: z.object({
      field: z.string(),
      cases: z.array(
        z.object({
          value: z.union([z.string(), z.number(), z.boolean()]),
          label: z.string(),
        }),
      ),
    }),
  }),
});

// Delay node schema
export const delayNodeSchema = baseNodeSchema.extend({
  type: z.literal(NodeTypes.DELAY),
  data: z.object({
    label: z.string(),
    description: z.string(),
    icon: z.string(),
    config: z.object({
      duration: z.number(),
      unit: z.enum(["seconds", "minutes", "hours"]),
    }),
  }),
});

// Loop node schema
export const loopNodeSchema = baseNodeSchema.extend({
  type: z.literal(NodeTypes.LOOP),
  data: z.object({
    label: z.string(),
    description: z.string(),
    icon: z.string(),
    config: z.object({
      type: z.enum(["count", "collection", "while"]),
      count: z.number().optional(),
      collection: z.string().optional(),
      condition: z.string().optional(),
    }),
  }),
});

// Edge schema
export const edgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  label: z.string().optional(),
  type: z.enum(["default", "success", "failure", "case"]).optional(),
});

// Workflow schema
export const workflowSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  nodes: z.array(
    z.union([
      triggerNodeSchema,
      actionNodeSchema,
      conditionNodeSchema,
      switchNodeSchema,
      delayNodeSchema,
      loopNodeSchema,
    ]),
  ),
  edges: z.array(edgeSchema),
});

/** @knipignore */
export type Workflow = z.infer<typeof workflowSchema>;
/** @knipignore */
export type TriggerNode = z.infer<typeof triggerNodeSchema>;
/** @knipignore */
export type ActionNode = z.infer<typeof actionNodeSchema>;
/** @knipignore */
export type ConditionNode = z.infer<typeof conditionNodeSchema>;
/** @knipignore */
export type SwitchNode = z.infer<typeof switchNodeSchema>;
/** @knipignore */
export type DelayNode = z.infer<typeof delayNodeSchema>;
/** @knipignore */
export type LoopNode = z.infer<typeof loopNodeSchema>;
/** @knipignore */
export type Edge = z.infer<typeof edgeSchema>;
