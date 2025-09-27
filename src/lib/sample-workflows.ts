import { Workflow, NodeTypes } from "./schema";

export const sampleWorkflows: Workflow[] = [
  {
    id: "email-automation",
    name: "Email Automation",
    description: "Automated email workflow with conditions and responses",
    nodes: [
      {
        id: "node_1",
        type: NodeTypes.TRIGGER,
        position: { x: 100, y: 100 },
        data: {
          label: "Email Received",
          description: "Triggered when an email is received",
          icon: "Mail",
          config: {
            event: "email_received",
            conditions: [
              {
                field: "subject",
                operator: "contains",
                value: "urgent",
              },
            ],
          },
        },
      },
      {
        id: "node_2",
        type: NodeTypes.CONDITION,
        position: { x: 300, y: 100 },
        data: {
          label: "Check Priority",
          description: "Check if email is high priority",
          icon: "GitBranch",
          config: {
            condition: "email.priority",
            operator: "equals",
            value: "high",
          },
        },
      },
      {
        id: "node_3",
        type: NodeTypes.ACTION,
        position: { x: 500, y: 50 },
        data: {
          label: "Send Alert",
          description: "Send priority email alert",
          icon: "Bell",
          config: {
            action: "send_notification",
            parameters: {
              type: "urgent",
              recipient: "admin@company.com",
            },
          },
        },
      },
      {
        id: "node_4",
        type: NodeTypes.ACTION,
        position: { x: 500, y: 150 },
        data: {
          label: "Auto Reply",
          description: "Send automated reply",
          icon: "Send",
          config: {
            action: "send_email",
            parameters: {
              template: "auto_reply",
              delay: "5m",
            },
          },
        },
      },
    ],
    edges: [
      {
        id: "edge_1",
        source: "node_1",
        target: "node_2",
      },
      {
        id: "edge_2",
        source: "node_2",
        target: "node_3",
        label: "High Priority",
        type: "success",
      },
      {
        id: "edge_3",
        source: "node_2",
        target: "node_4",
        label: "Normal Priority",
        type: "default",
      },
    ],
  },
  {
    id: "order-processing",
    name: "Order Processing",
    description:
      "E-commerce order processing with inventory checks and notifications",
    nodes: [
      {
        id: "node_1",
        type: NodeTypes.TRIGGER,
        position: { x: 100, y: 150 },
        data: {
          label: "New Order",
          description: "Triggered when a new order is placed",
          icon: "MousePointer",
          config: {
            event: "order_created",
          },
        },
      },
      {
        id: "node_2",
        type: NodeTypes.ACTION,
        position: { x: 300, y: 150 },
        data: {
          label: "Check Inventory",
          description: "Verify product availability",
          icon: "Database",
          config: {
            action: "inventory_check",
            parameters: {
              source: "warehouse_db",
            },
          },
        },
      },
      {
        id: "node_3",
        type: NodeTypes.CONDITION,
        position: { x: 500, y: 150 },
        data: {
          label: "In Stock?",
          description: "Check if items are available",
          icon: "GitBranch",
          config: {
            condition: "inventory.available",
            operator: "greaterThan",
            value: 0,
          },
        },
      },
      {
        id: "node_4",
        type: NodeTypes.ACTION,
        position: { x: 700, y: 100 },
        data: {
          label: "Process Payment",
          description: "Process customer payment",
          icon: "Globe",
          config: {
            action: "http_call",
            parameters: {
              url: "https://api.payment.com/charge",
              method: "POST",
            },
          },
        },
      },
      {
        id: "node_5",
        type: NodeTypes.ACTION,
        position: { x: 700, y: 200 },
        data: {
          label: "Backorder Alert",
          description: "Notify customer of backorder",
          icon: "AlertTriangle",
          config: {
            action: "send_notification",
            parameters: {
              type: "backorder",
              template: "out_of_stock",
            },
          },
        },
      },
      {
        id: "node_6",
        type: NodeTypes.ACTION,
        position: { x: 900, y: 100 },
        data: {
          label: "Ship Order",
          description: "Create shipping label and send",
          icon: "Send",
          config: {
            action: "create_shipment",
            parameters: {
              carrier: "fedex",
              service: "ground",
            },
          },
        },
      },
    ],
    edges: [
      {
        id: "edge_1",
        source: "node_1",
        target: "node_2",
      },
      {
        id: "edge_2",
        source: "node_2",
        target: "node_3",
      },
      {
        id: "edge_3",
        source: "node_3",
        target: "node_4",
        label: "In Stock",
        type: "success",
      },
      {
        id: "edge_4",
        source: "node_3",
        target: "node_5",
        label: "Out of Stock",
        type: "failure",
      },
      {
        id: "edge_5",
        source: "node_4",
        target: "node_6",
      },
    ],
  },
  {
    id: "customer-support",
    name: "Customer Support Triage",
    description: "Automated support ticket routing and response system",
    nodes: [
      {
        id: "node_1",
        type: NodeTypes.TRIGGER,
        position: { x: 100, y: 200 },
        data: {
          label: "Support Ticket",
          description: "New support ticket received",
          icon: "Mail",
          config: {
            event: "ticket_created",
          },
        },
      },
      {
        id: "node_2",
        type: NodeTypes.ACTION,
        position: { x: 300, y: 200 },
        data: {
          label: "Analyze Content",
          description: "AI analysis of ticket content",
          icon: "Globe",
          config: {
            action: "http_call",
            parameters: {
              url: "https://api.openai.com/v1/chat/completions",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            },
          },
        },
      },
      {
        id: "node_3",
        type: NodeTypes.SWITCH,
        position: { x: 500, y: 200 },
        data: {
          label: "Route by Category",
          description: "Route ticket based on category",
          icon: "SplitSquareVertical",
          config: {
            field: "category",
            cases: [
              { value: "technical", label: "Technical" },
              { value: "billing", label: "Billing" },
              { value: "general", label: "General" },
            ],
          },
        },
      },
      {
        id: "node_4",
        type: NodeTypes.ACTION,
        position: { x: 700, y: 100 },
        data: {
          label: "Assign to Tech Team",
          description: "Route to technical support",
          icon: "Send",
          config: {
            action: "assign_ticket",
            parameters: {
              team: "technical",
              priority: "medium",
            },
          },
        },
      },
      {
        id: "node_5",
        type: NodeTypes.ACTION,
        position: { x: 700, y: 200 },
        data: {
          label: "Assign to Billing",
          description: "Route to billing department",
          icon: "Send",
          config: {
            action: "assign_ticket",
            parameters: {
              team: "billing",
              priority: "high",
            },
          },
        },
      },
      {
        id: "node_6",
        type: NodeTypes.ACTION,
        position: { x: 700, y: 300 },
        data: {
          label: "Send Auto Response",
          description: "Send automated acknowledgment",
          icon: "Mail",
          config: {
            action: "send_email",
            parameters: {
              template: "general_response",
              delay: "1m",
            },
          },
        },
      },
    ],
    edges: [
      {
        id: "edge_1",
        source: "node_1",
        target: "node_2",
      },
      {
        id: "edge_2",
        source: "node_2",
        target: "node_3",
      },
      {
        id: "edge_3",
        source: "node_3",
        target: "node_4",
        label: "Technical",
        type: "case",
      },
      {
        id: "edge_4",
        source: "node_3",
        target: "node_5",
        label: "Billing",
        type: "case",
      },
      {
        id: "edge_5",
        source: "node_3",
        target: "node_6",
        label: "General",
        type: "case",
      },
    ],
  },
  {
    id: "data-processing",
    name: "Data Processing Pipeline",
    description:
      "Automated data validation, transformation, and storage pipeline",
    nodes: [
      {
        id: "node_1",
        type: NodeTypes.TRIGGER,
        position: { x: 100, y: 150 },
        data: {
          label: "File Upload",
          description: "CSV file uploaded to system",
          icon: "FileJson",
          config: {
            event: "file_uploaded",
            conditions: [
              {
                field: "file_type",
                operator: "equals",
                value: "csv",
              },
            ],
          },
        },
      },
      {
        id: "node_2",
        type: NodeTypes.ACTION,
        position: { x: 300, y: 150 },
        data: {
          label: "Validate Data",
          description: "Validate CSV structure and content",
          icon: "AlertTriangle",
          config: {
            action: "validate_csv",
            parameters: {
              schema: "customer_data",
              strict: true,
            },
          },
        },
      },
      {
        id: "node_3",
        type: NodeTypes.CONDITION,
        position: { x: 500, y: 150 },
        data: {
          label: "Valid Data?",
          description: "Check if validation passed",
          icon: "GitBranch",
          config: {
            condition: "validation.passed",
            operator: "equals",
            value: true,
          },
        },
      },
      {
        id: "node_4",
        type: NodeTypes.ACTION,
        position: { x: 700, y: 100 },
        data: {
          label: "Transform Data",
          description: "Apply data transformations",
          icon: "FileJson",
          config: {
            action: "transform_data",
            parameters: {
              transformations: ["normalize", "enrich", "deduplicate"],
            },
          },
        },
      },
      {
        id: "node_5",
        type: NodeTypes.ACTION,
        position: { x: 700, y: 200 },
        data: {
          label: "Error Notification",
          description: "Send validation error report",
          icon: "AlertTriangle",
          config: {
            action: "send_notification",
            parameters: {
              type: "validation_error",
              include_report: true,
            },
          },
        },
      },
      {
        id: "node_6",
        type: NodeTypes.DELAY,
        position: { x: 900, y: 100 },
        data: {
          label: "Wait 5 minutes",
          description: "Delay before database write",
          icon: "Timer",
          config: {
            duration: 5,
            unit: "minutes",
          },
        },
      },
      {
        id: "node_7",
        type: NodeTypes.ACTION,
        position: { x: 1100, y: 100 },
        data: {
          label: "Store in Database",
          description: "Save processed data to database",
          icon: "Database",
          config: {
            action: "database_insert",
            parameters: {
              table: "processed_data",
              batch_size: 1000,
            },
          },
        },
      },
    ],
    edges: [
      {
        id: "edge_1",
        source: "node_1",
        target: "node_2",
      },
      {
        id: "edge_2",
        source: "node_2",
        target: "node_3",
      },
      {
        id: "edge_3",
        source: "node_3",
        target: "node_4",
        label: "Valid",
        type: "success",
      },
      {
        id: "edge_4",
        source: "node_3",
        target: "node_5",
        label: "Invalid",
        type: "failure",
      },
      {
        id: "edge_5",
        source: "node_4",
        target: "node_6",
      },
      {
        id: "edge_6",
        source: "node_6",
        target: "node_7",
      },
    ],
  },
];

export const getWorkflowNames = (): Array<{
  id: string;
  name: string;
  description?: string;
}> => {
  return sampleWorkflows.map((workflow) => ({
    id: workflow.id,
    name: workflow.name,
    description: workflow.description,
  }));
};

// Local storage for custom workflows
const CUSTOM_WORKFLOWS_KEY = "vortex-custom-workflows";

export const getCustomWorkflows = (): Workflow[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(CUSTOM_WORKFLOWS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load custom workflows:", error);
    return [];
  }
};

export const saveCustomWorkflow = (workflow: Workflow): boolean => {
  if (typeof window === "undefined") return false;

  try {
    const customWorkflows = getCustomWorkflows();
    const existingIndex = customWorkflows.findIndex(
      (w) => w.id === workflow.id,
    );

    if (existingIndex >= 0) {
      customWorkflows[existingIndex] = workflow;
    } else {
      customWorkflows.push(workflow);
    }

    localStorage.setItem(CUSTOM_WORKFLOWS_KEY, JSON.stringify(customWorkflows));
    return true;
  } catch (error) {
    console.error("Failed to save custom workflow:", error);
    return false;
  }
};

export const deleteCustomWorkflow = (workflowId: string): boolean => {
  if (typeof window === "undefined") return false;

  try {
    const customWorkflows = getCustomWorkflows();
    const filteredWorkflows = customWorkflows.filter(
      (w) => w.id !== workflowId,
    );
    localStorage.setItem(
      CUSTOM_WORKFLOWS_KEY,
      JSON.stringify(filteredWorkflows),
    );
    return true;
  } catch (error) {
    console.error("Failed to delete custom workflow:", error);
    return false;
  }
};

export const getAllWorkflows = (): Workflow[] => {
  return [...sampleWorkflows, ...getCustomWorkflows()];
};

export const getAllWorkflowNames = (): Array<{
  id: string;
  name: string;
  description?: string;
  isCustom: boolean;
}> => {
  const sample = sampleWorkflows.map((workflow) => ({
    id: workflow.id,
    name: workflow.name,
    description: workflow.description,
    isCustom: false,
  }));

  const custom = getCustomWorkflows().map((workflow) => ({
    id: workflow.id,
    name: workflow.name,
    description: workflow.description,
    isCustom: true,
  }));

  return [...sample, ...custom];
};

export const getWorkflowById = (id: string): Workflow | undefined => {
  return getAllWorkflows().find((workflow) => workflow.id === id);
};

export const createEmptyWorkflow = (
  name: string = "New Workflow",
): Workflow => {
  return {
    id: `workflow-${Date.now()}`,
    name,
    description: "A new workflow template",
    nodes: [],
    edges: [],
  };
};
