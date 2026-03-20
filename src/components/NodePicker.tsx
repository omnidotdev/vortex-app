import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
  ArrowDownUp,
  Bot,
  Cable,
  CheckCircle2,
  Clock,
  Code,
  CreditCard,
  Database,
  FileJson,
  Filter,
  GitBranch,
  Globe,
  Home,
  Info,
  Layers,
  Mail,
  MessageCircle,
  MessageSquare,
  MousePointer,
  Puzzle,
  Repeat,
  Search,
  Sheet,
  Shield,
  ShoppingCart,
  SplitSquareVertical,
  Timer,
  Webhook,
  Workflow,
  Zap,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

import IntegrationPreviewModal from "@/components/integrations/IntegrationPreviewModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  integrationDefinitionsOptions,
  integrationsOptions,
} from "@/lib/options/integrations.options";
import { NodeTypes } from "@/lib/schema";

import type { IntegrationAction } from "@/lib/integrations/actions";

// Category configuration with icons and labels
const CATEGORIES = {
  all: { label: "All", icon: Layers },
  triggers: { label: "Triggers", icon: Zap },
  flow: { label: "Flow", icon: GitBranch },
  transform: { label: "Transform", icon: FileJson },
  http: { label: "HTTP", icon: Globe },
  ai: { label: "AI", icon: Bot },
  communication: { label: "Communication", icon: MessageCircle },
  smarthome: { label: "Smart Home", icon: Home },
  developer: { label: "Developer", icon: Code },
  productivity: { label: "Productivity", icon: Sheet },
  marketing: { label: "Marketing", icon: Mail },
  commerce: { label: "Commerce", icon: ShoppingCart },
  payments: { label: "Payments", icon: CreditCard },
  storage: { label: "Storage", icon: Database },
  other: { label: "Other", icon: Puzzle },
} as const;

type CategoryKey = keyof typeof CATEGORIES;

// Search tags/aliases for integrations (allows searching by alternative names)
const INTEGRATION_SEARCH_TAGS: Record<string, string[]> = {
  // AI
  openai: ["chatgpt", "gpt", "gpt-4", "gpt-4o", "dall-e", "whisper", "ai"],
  anthropic: ["claude", "ai"],
  mistral: ["mistral-ai", "ai"],
  groq: ["llama", "ai"],
  perplexity: ["ai", "search"],
  replicate: ["ai", "ml", "machine learning"],
  huggingface: ["ai", "ml", "transformers"],
  // Communication
  slack: ["messaging", "chat"],
  discord: ["messaging", "chat", "gaming"],
  twilio: ["sms", "text", "phone", "call", "messaging"],
  sendgrid: ["email", "mail"],
  resend: ["email", "mail"],
  mailchimp: ["email", "mail", "newsletter"],
  postmark: ["email", "mail"],
  intercom: ["chat", "support", "messaging"],
  zendesk: ["support", "tickets", "helpdesk"],
  // Developer
  github: ["git", "code", "repo", "repository"],
  gitlab: ["git", "code", "repo", "repository"],
  bitbucket: ["git", "code", "repo"],
  linear: ["issues", "tickets", "project management"],
  jira: ["issues", "tickets", "project management", "atlassian"],
  sentry: ["errors", "monitoring", "debugging"],
  datadog: ["monitoring", "logs", "apm"],
  // Productivity
  notion: ["notes", "docs", "wiki", "database"],
  airtable: ["database", "spreadsheet", "tables"],
  "google-sheets": ["spreadsheet", "excel", "sheets"],
  "google-drive": ["files", "storage", "docs"],
  "google-calendar": ["calendar", "events", "scheduling"],
  asana: ["tasks", "project management"],
  todoist: ["tasks", "todo", "checklist"],
  trello: ["kanban", "boards", "tasks"],
  clickup: ["tasks", "project management"],
  monday: ["tasks", "project management"],
  // Payments
  stripe: ["payments", "billing", "credit card", "checkout"],
  paypal: ["payments", "checkout"],
  square: ["payments", "pos", "checkout"],
  // Commerce
  shopify: ["ecommerce", "store", "products", "orders"],
  woocommerce: ["ecommerce", "store", "wordpress"],
  // Storage
  aws: ["s3", "amazon", "cloud"],
  supabase: ["database", "postgres", "storage"],
  firebase: ["database", "google", "storage"],
  cloudflare: ["cdn", "workers", "r2"],
  // CRM
  salesforce: ["crm", "sales", "leads"],
  hubspot: ["crm", "marketing", "sales"],
  pipedrive: ["crm", "sales"],
  // Smart Home / IoT
  mqtt: ["iot", "messaging", "smart home", "home automation", "broker"],
  homeassistant: [
    "home assistant",
    "hass",
    "smart home",
    "iot",
    "automation",
    "lights",
    "thermostat",
  ],
  nodered: ["node-red", "iot", "automation", "flow"],
  philipshue: ["hue", "lights", "smart lights", "philips"],
  // Other
  zapier: ["automation", "integrations"],
  make: ["automation", "integrations", "integromat"],
  webhooks: ["http", "api"],
};

// Built-in nodes organized by category
const BUILTIN_NODES = [
  // Triggers
  {
    id: "trigger-webhook",
    category: "triggers",
    label: "Webhook",
    description: "Triggered by HTTP webhook",
    icon: Webhook,
    nodeType: NodeTypes.TRIGGER,
    config: { triggerType: "webhook" },
  },
  {
    id: "trigger-schedule",
    category: "triggers",
    label: "Schedule",
    description: "Triggered on a schedule (cron)",
    icon: Clock,
    nodeType: NodeTypes.TRIGGER,
    config: { triggerType: "cron" },
  },
  {
    id: "trigger-manual",
    category: "triggers",
    label: "Manual",
    description: "Triggered manually",
    icon: MousePointer,
    nodeType: NodeTypes.TRIGGER,
    config: { triggerType: "manual" },
  },
  {
    id: "trigger-omni",
    category: "triggers",
    label: "Omni Event",
    description: "Triggered by events from Omni services",
    icon: Zap,
    nodeType: NodeTypes.TRIGGER,
    config: { triggerType: "omni" },
  },
  {
    id: "trigger-polling",
    category: "triggers",
    label: "HTTP Polling",
    description: "Poll an HTTP endpoint on an interval",
    icon: Timer,
    nodeType: NodeTypes.TRIGGER,
    config: { triggerType: "polling" },
  },
  {
    id: "trigger-kafka",
    category: "triggers",
    label: "Kafka",
    description: "Triggered by Kafka topic messages",
    icon: Layers,
    nodeType: NodeTypes.TRIGGER,
    config: { triggerType: "kafka" },
  },
  {
    id: "trigger-sqs",
    category: "triggers",
    label: "SQS",
    description: "Triggered by AWS SQS queue messages",
    icon: Layers,
    nodeType: NodeTypes.TRIGGER,
    config: { triggerType: "sqs" },
  },
  {
    id: "trigger-s3",
    category: "triggers",
    label: "S3 Event",
    description: "Triggered by S3 bucket events",
    icon: Database,
    nodeType: NodeTypes.TRIGGER,
    config: { triggerType: "s3" },
  },
  {
    id: "trigger-cdc",
    category: "triggers",
    label: "CDC",
    description: "Triggered by database changes (Change Data Capture)",
    icon: Database,
    nodeType: NodeTypes.TRIGGER,
    config: { triggerType: "cdc" },
  },
  {
    id: "trigger-mqtt",
    category: "triggers",
    label: "MQTT",
    description: "Triggered by MQTT broker messages",
    icon: Cable,
    nodeType: NodeTypes.TRIGGER,
    config: { triggerType: "mqtt" },
  },
  {
    id: "trigger-websocket",
    category: "triggers",
    label: "WebSocket",
    description: "Triggered by WebSocket server messages",
    icon: Globe,
    nodeType: NodeTypes.TRIGGER,
    config: { triggerType: "websocket" },
  },
  {
    id: "trigger-redis",
    category: "triggers",
    label: "Redis",
    description: "Triggered by Redis Pub/Sub messages",
    icon: Database,
    nodeType: NodeTypes.TRIGGER,
    config: { triggerType: "redis" },
  },
  {
    id: "trigger-nats",
    category: "triggers",
    label: "NATS",
    description: "Triggered by NATS subject messages",
    icon: Zap,
    nodeType: NodeTypes.TRIGGER,
    config: { triggerType: "nats" },
  },
  {
    id: "trigger-amqp",
    category: "triggers",
    label: "AMQP",
    description: "Triggered by AMQP/RabbitMQ queue messages",
    icon: Layers,
    nodeType: NodeTypes.TRIGGER,
    config: { triggerType: "amqp" },
  },
  {
    id: "trigger-grpc-stream",
    category: "triggers",
    label: "gRPC Stream",
    description: "Triggered by gRPC server-streaming responses",
    icon: Cable,
    nodeType: NodeTypes.TRIGGER,
    config: { triggerType: "grpc_stream" },
  },
  // Flow Control
  {
    id: "flow-condition",
    category: "flow",
    label: "If Condition",
    description: "Branch based on a condition",
    icon: GitBranch,
    nodeType: NodeTypes.CONDITION,
    pluginId: "builtin:condition",
    operation: "evaluate",
  },
  {
    id: "flow-switch",
    category: "flow",
    label: "Switch",
    description: "Multiple conditional branches",
    icon: SplitSquareVertical,
    nodeType: NodeTypes.SWITCH,
    pluginId: "builtin:switch",
    operation: "evaluate",
    config: { cases: [{ value: "", label: "Case 1" }] },
  },
  {
    id: "flow-delay",
    category: "flow",
    label: "Delay",
    description: "Wait for a duration",
    icon: Timer,
    nodeType: NodeTypes.DELAY,
    pluginId: "builtin:delay",
    operation: "wait",
    config: { duration: 5, unit: "minutes" },
  },
  {
    id: "flow-loop",
    category: "flow",
    label: "Loop",
    description: "Repeat actions",
    icon: Repeat,
    nodeType: NodeTypes.LOOP,
    pluginId: "builtin:loop",
    operation: "iterate",
    config: { type: "count", count: 5 },
  },
  {
    id: "flow-subworkflow",
    category: "flow",
    label: "Sub-Workflow",
    description: "Call another workflow",
    icon: Workflow,
    nodeType: NodeTypes.SUBWORKFLOW,
    pluginId: "builtin:subworkflow",
    operation: "call",
  },
  {
    id: "flow-trycatch",
    category: "flow",
    label: "Try/Catch",
    description: "Error boundary with retry support",
    icon: Shield,
    nodeType: NodeTypes.TRY_CATCH,
    pluginId: "builtin:trycatch",
    operation: "execute",
  },
  {
    id: "flow-race",
    category: "flow",
    label: "Race",
    description: "Run branches in parallel, use first result",
    icon: Zap,
    nodeType: NodeTypes.RACE,
    pluginId: "builtin:race",
    operation: "execute",
  },
  {
    id: "flow-saga",
    category: "flow",
    label: "Saga",
    description: "Distributed transaction with execute/compensate pairs",
    icon: ArrowDownUp,
    nodeType: NodeTypes.SAGA,
    pluginId: "builtin:saga",
    operation: "execute",
  },
  // State Management
  {
    id: "state-get",
    category: "storage",
    label: "State Get",
    description: "Read from cross-workflow state store",
    icon: Database,
    nodeType: NodeTypes.STATE_GET,
    pluginId: "builtin:state",
    operation: "get",
  },
  {
    id: "state-set",
    category: "storage",
    label: "State Set",
    description: "Write to cross-workflow state store",
    icon: Database,
    nodeType: NodeTypes.STATE_SET,
    pluginId: "builtin:state",
    operation: "set",
  },
  {
    id: "state-wait",
    category: "storage",
    label: "State Wait",
    description: "Wait for a state condition to be met",
    icon: Clock,
    nodeType: NodeTypes.STATE_WAIT,
    pluginId: "builtin:state",
    operation: "wait",
  },
  // Flow Control primitives
  {
    id: "flow-stop",
    category: "flow",
    label: "Stop",
    description: "Terminate workflow execution",
    icon: Shield,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:stop",
    operation: "execute",
  },
  {
    id: "flow-noop",
    category: "flow",
    label: "No-Op",
    description: "Pass-through placeholder",
    icon: GitBranch,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:noop",
    operation: "execute",
  },
  {
    id: "flow-debounce",
    category: "flow",
    label: "Debounce",
    description: "Coalesce rapid triggers",
    icon: Timer,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:debounce",
    operation: "execute",
  },
  {
    id: "flow-time-window",
    category: "flow",
    label: "Time Window",
    description: "Only proceed during time window",
    icon: Clock,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:time-window",
    operation: "check",
  },
  // Data primitives
  {
    id: "transform-diff",
    category: "transform",
    label: "Diff",
    description: "Compare two datasets",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:diff",
    operation: "compare",
  },
  {
    id: "transform-change-detector",
    category: "transform",
    label: "Change Detector",
    description: "Continue only if value changed",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:change-detector",
    operation: "check",
  },
  // AI primitives
  {
    id: "ai-transform",
    category: "ai",
    label: "AI Transform",
    description: "Transform data with LLM",
    icon: Bot,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:ai-transform",
    operation: "transform",
  },
  {
    id: "ai-guardrails",
    category: "ai",
    label: "AI Guardrails",
    description: "Validate LLM output against rules",
    icon: Shield,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:ai-guardrails",
    operation: "validate",
  },
  // Transform
  {
    id: "transform-jsonpath",
    category: "transform",
    label: "JSONPath Extract",
    description: "Extract data using JSONPath",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:transform",
    operation: "jsonPath",
  },
  {
    id: "transform-template",
    category: "transform",
    label: "Template",
    description: "Render template with variables",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:transform",
    operation: "template",
  },
  {
    id: "transform-map",
    category: "transform",
    label: "Map Data",
    description: "Map source to target structure",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:transform",
    operation: "map",
  },
  // HTTP
  {
    id: "http-request",
    category: "http",
    label: "HTTP Request",
    description: "Make any HTTP request",
    icon: Globe,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:http",
    operation: "request",
  },
  // MCP
  {
    id: "mcp-tool",
    category: "ai",
    label: "MCP Tool",
    description: "Call any MCP server tool",
    icon: Cable,
    nodeType: NodeTypes.MCP,
    pluginId: "builtin:mcp",
    operation: "call",
  },
  // Other
  {
    id: "utility-comment",
    category: "other",
    label: "Comment",
    description: "Add notes and documentation to canvas",
    icon: MessageSquare,
    nodeType: NodeTypes.COMMENT,
  },

  // Flow Control (additional)
  {
    id: "flow-parallel",
    category: "flow",
    label: "Parallel",
    description: "Run branches in parallel",
    icon: Layers,
    nodeType: NodeTypes.PARALLEL,
    pluginId: "builtin:parallel",
    operation: "execute",
  },
  {
    id: "flow-gate",
    category: "flow",
    label: "Gate",
    description: "Approval or signal gate",
    icon: Shield,
    nodeType: NodeTypes.GATE,
    pluginId: "builtin:gate",
    operation: "wait",
  },

  // Data Transform (additional)
  {
    id: "transform-split",
    category: "transform",
    label: "Split",
    description: "Split data into batches",
    icon: SplitSquareVertical,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:transform",
    operation: "split",
  },
  {
    id: "transform-filter",
    category: "transform",
    label: "Filter",
    description: "Filter items by condition",
    icon: Filter,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:transform",
    operation: "filter",
  },
  {
    id: "transform-set-variable",
    category: "transform",
    label: "Set Variable",
    description: "Set workflow variables",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:transform",
    operation: "setVariable",
  },
  {
    id: "transform-merge",
    category: "transform",
    label: "Merge",
    description: "Merge multiple data sources",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:transform",
    operation: "merge",
  },
  {
    id: "transform-sort",
    category: "transform",
    label: "Sort",
    description: "Sort array items",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:transform",
    operation: "sort",
  },
  {
    id: "transform-unique",
    category: "transform",
    label: "Unique",
    description: "Remove duplicate items",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:transform",
    operation: "unique",
  },
  {
    id: "transform-reduce",
    category: "transform",
    label: "Reduce",
    description: "Reduce array to single value",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:transform",
    operation: "reduce",
  },
  {
    id: "transform-group",
    category: "transform",
    label: "Group",
    description: "Group array items by key",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:transform",
    operation: "group",
  },
  {
    id: "transform-flatten",
    category: "transform",
    label: "Flatten",
    description: "Flatten nested arrays",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:transform",
    operation: "flatten",
  },
  {
    id: "transform-chunk",
    category: "transform",
    label: "Chunk",
    description: "Split array into chunks",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:transform",
    operation: "chunk",
  },
  {
    id: "transform-zip",
    category: "transform",
    label: "Zip",
    description: "Combine arrays element-wise",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:transform",
    operation: "zip",
  },

  // AI/ML
  {
    id: "ai-llm",
    category: "ai",
    label: "LLM",
    description: "Call any LLM model",
    icon: Bot,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:llm",
    operation: "call",
  },
  {
    id: "ai-code",
    category: "ai",
    label: "Code",
    description: "Execute JavaScript code",
    icon: Code,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:code",
    operation: "execute",
  },
  {
    id: "ai-prompt",
    category: "ai",
    label: "Prompt",
    description: "One-shot LLM prompt",
    icon: Bot,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:prompt",
    operation: "run",
  },
  {
    id: "ai-chat",
    category: "ai",
    label: "Chat",
    description: "Multi-turn conversation",
    icon: MessageCircle,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:chat",
    operation: "converse",
  },
  {
    id: "ai-summarize",
    category: "ai",
    label: "Summarize",
    description: "Summarize text with AI",
    icon: Bot,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:summarize",
    operation: "run",
  },
  {
    id: "ai-classify",
    category: "ai",
    label: "Classify",
    description: "Classify text into categories",
    icon: Bot,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:classify",
    operation: "run",
  },
  {
    id: "ai-agent",
    category: "ai",
    label: "AI Agent",
    description: "Autonomous AI agent",
    icon: Bot,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:agent",
    operation: "run",
    beta: true,
  },
  {
    id: "ai-rag",
    category: "ai",
    label: "RAG",
    description: "Retrieval-augmented generation",
    icon: Bot,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:rag",
    operation: "query",
    beta: true,
  },
  {
    id: "ai-vision",
    category: "ai",
    label: "Vision",
    description: "Image analysis and OCR",
    icon: Bot,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:vision",
    operation: "analyze",
  },
  {
    id: "ai-audio",
    category: "ai",
    label: "Audio",
    description: "Speech-to-text and TTS",
    icon: Bot,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:audio",
    operation: "process",
  },
  {
    id: "ai-model-registry",
    category: "ai",
    label: "Model Registry",
    description: "BYOK multi-provider AI",
    icon: Bot,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:model-registry",
    operation: "call",
    comingSoon: true,
  },
  {
    id: "ai-embedding",
    category: "ai",
    label: "Embedding",
    description: "Generate embeddings",
    icon: Bot,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:embedding",
    operation: "generate",
    beta: true,
  },
  {
    id: "ai-vector-search",
    category: "ai",
    label: "Vector Search",
    description: "Search vector database",
    icon: Search,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:vector-search",
    operation: "search",
    beta: true,
  },

  // Human-in-the-Loop
  {
    id: "human-approval",
    category: "other",
    label: "Approval",
    description: "Wait for human approval",
    icon: CheckCircle2,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:approval",
    operation: "request",
  },
  {
    id: "human-input",
    category: "other",
    label: "Human Input",
    description: "Collect form input",
    icon: MousePointer,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:human-input",
    operation: "collect",
  },
  {
    id: "human-notification",
    category: "other",
    label: "Notification",
    description: "Send notification",
    icon: MessageCircle,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:notification",
    operation: "send",
  },

  // Utility/Developer
  {
    id: "developer-log",
    category: "developer",
    label: "Log",
    description: "Write log entry",
    icon: Code,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:log",
    operation: "write",
  },
  {
    id: "developer-assert",
    category: "developer",
    label: "Assert",
    description: "Assert a condition",
    icon: Shield,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:assert",
    operation: "check",
  },
  {
    id: "developer-sleep",
    category: "developer",
    label: "Sleep",
    description: "Pause execution",
    icon: Clock,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:sleep",
    operation: "wait",
  },
  {
    id: "developer-error",
    category: "developer",
    label: "Error",
    description: "Throw an error",
    icon: Shield,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:error",
    operation: "throw",
  },
  {
    id: "developer-parse",
    category: "developer",
    label: "Parse",
    description: "Parse data format",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:parse",
    operation: "run",
  },
  {
    id: "developer-validate",
    category: "developer",
    label: "Validate",
    description: "Validate against schema",
    icon: CheckCircle2,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:validate",
    operation: "check",
  },
  {
    id: "developer-format",
    category: "developer",
    label: "Format",
    description: "Format data",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:format",
    operation: "run",
  },
  {
    id: "developer-hash",
    category: "developer",
    label: "Hash",
    description: "Hash data",
    icon: Shield,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:hash",
    operation: "compute",
  },
  {
    id: "developer-retry",
    category: "developer",
    label: "Retry",
    description: "Retry a step with backoff",
    icon: Repeat,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:retry",
    operation: "execute",
  },
  {
    id: "developer-timeout",
    category: "developer",
    label: "Timeout",
    description: "Add timeout to a step",
    icon: Timer,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:timeout",
    operation: "execute",
  },
  {
    id: "developer-wait",
    category: "developer",
    label: "Wait",
    description: "Wait for webhook/event/timeout",
    icon: Clock,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:wait",
    operation: "until",
  },
  {
    id: "developer-event",
    category: "developer",
    label: "Event",
    description: "Emit an event",
    icon: Zap,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:event",
    operation: "emit",
  },
  {
    id: "developer-collect",
    category: "developer",
    label: "Collect Events",
    description: "Wait for cross-service events",
    icon: Cable,
    nodeType: NodeTypes.COLLECT,
    pluginId: "builtin:collect",
    operation: "wait",
  },
  {
    id: "developer-aggregate",
    category: "developer",
    label: "Aggregate",
    description: "Aggregate data from steps",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:aggregate",
    operation: "collect",
  },
  {
    id: "developer-cache",
    category: "developer",
    label: "Cache",
    description: "Cache step results",
    icon: Database,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:cache",
    operation: "get",
  },

  // Communication
  {
    id: "communication-email",
    category: "communication",
    label: "Email",
    description: "Send email",
    icon: Mail,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:email",
    operation: "send",
  },

  // Storage (additional)
  {
    id: "storage-file",
    category: "storage",
    label: "File",
    description: "Read/write files",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:file",
    operation: "read",
  },
  {
    id: "storage-queue",
    category: "storage",
    label: "Queue",
    description: "Push/pull from queues",
    icon: Database,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:queue",
    operation: "push",
  },
  {
    id: "storage-database",
    category: "storage",
    label: "Database",
    description: "Query/insert/update/delete",
    icon: Database,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:database",
    operation: "query",
  },

  // Security
  {
    id: "developer-encrypt",
    category: "developer",
    label: "Encrypt",
    description: "Encrypt data",
    icon: Shield,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:encrypt",
    operation: "run",
  },
  {
    id: "developer-decrypt",
    category: "developer",
    label: "Decrypt",
    description: "Decrypt data",
    icon: Shield,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:decrypt",
    operation: "run",
  },
  {
    id: "developer-sign",
    category: "developer",
    label: "Sign",
    description: "Digital signature",
    icon: Shield,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:sign",
    operation: "run",
  },
  {
    id: "developer-jwt",
    category: "developer",
    label: "JWT",
    description: "JWT operations",
    icon: Shield,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:jwt",
    operation: "sign",
  },
  {
    id: "developer-webhook-verify",
    category: "developer",
    label: "Webhook Verify",
    description: "Verify webhook signatures",
    icon: Shield,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:webhook-verify",
    operation: "verify",
    comingSoon: true,
  },

  // Integration/Productivity
  {
    id: "productivity-spreadsheet",
    category: "productivity",
    label: "Spreadsheet",
    description: "Excel/CSV operations",
    icon: Sheet,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:spreadsheet",
    operation: "read",
    comingSoon: true,
  },
  {
    id: "productivity-google-sheets",
    category: "productivity",
    label: "Google Sheets",
    description: "Google Sheets operations",
    icon: Sheet,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:google-sheets",
    operation: "read",
    comingSoon: true,
  },
  {
    id: "productivity-pdf",
    category: "productivity",
    label: "PDF",
    description: "PDF generation and manipulation",
    icon: FileJson,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:pdf",
    operation: "generate",
    comingSoon: true,
  },

  // HTTP (additional)
  {
    id: "http-webhook-response",
    category: "http",
    label: "Webhook Response",
    description: "Respond to webhook trigger",
    icon: Webhook,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:webhook-response",
    operation: "respond",
  },
  {
    id: "http-rate-limit",
    category: "http",
    label: "Rate Limit",
    description: "Rate limiting/throttling",
    icon: Timer,
    nodeType: NodeTypes.ACTION,
    pluginId: "builtin:rate-limit",
    operation: "check",
    comingSoon: true,
  },
];

// Map API categories to our categories
function mapCategory(apiCategory: string): CategoryKey {
  const mapping: Record<string, CategoryKey> = {
    ai: "ai",
    communication: "communication",
    developer: "developer",
    productivity: "productivity",
    marketing: "marketing",
    commerce: "commerce",
    payments: "payments",
    storage: "storage",
    support: "communication",
    hr: "productivity",
    smarthome: "smarthome",
    "smart-home": "smarthome",
    iot: "smarthome",
    other: "other",
  };
  return mapping[apiCategory?.toLowerCase()] ?? "other";
}

interface NodePickerProps {
  organizationId: string;
  onSelectNode: (nodeData: {
    type: string;
    data: Record<string, unknown>;
  }) => void;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

export function NodePicker({
  organizationId,
  onSelectNode,
  searchInputRef: externalRef,
}: NodePickerProps) {
  const { workspaceSlug } = useParams({ strict: false }) as {
    workspaceSlug: string;
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");
  const [showOnlyConnected, setShowOnlyConnected] = useState(false);
  const [previewIntegration, setPreviewIntegration] = useState<
    (typeof definitions)[0] | null
  >(null);
  const internalRef = useRef<HTMLInputElement>(null);
  const searchInputRef = externalRef ?? internalRef;

  // Fetch all integration definitions (the catalog)
  const { data: definitionsData, isLoading: loadingDefinitions } = useQuery({
    ...integrationDefinitionsOptions({}),
    select: (data) => data?.integrationDefinitions?.nodes ?? [],
  });

  // Fetch connected integrations for this org
  const { data: integrationsData } = useQuery({
    ...integrationsOptions({ organizationId }),
    select: (data) => data?.integrations?.nodes ?? [],
  });

  const definitions = definitionsData ?? [];
  const connectedIntegrations = integrationsData ?? [];

  // Set of connected integration definition IDs
  const connectedIds = useMemo(
    () => new Set(connectedIntegrations.map((i) => i.type)),
    [connectedIntegrations],
  );

  // Filter and organize nodes
  const filteredNodes = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    // Filter built-in nodes
    const builtinFiltered = BUILTIN_NODES.filter((node) => {
      // Hide unimplemented steps
      if (node.comingSoon) return false;
      // Category filter
      if (selectedCategory !== "all" && node.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (query) {
        return (
          node.label.toLowerCase().includes(query) ||
          node.description.toLowerCase().includes(query)
        );
      }
      return true;
    });

    // Filter integration definitions
    const integrationFiltered = definitions.filter((def) => {
      const category = mapCategory(def.category);
      // Category filter
      if (selectedCategory !== "all" && category !== selectedCategory) {
        return false;
      }
      // Connected filter
      if (showOnlyConnected && !connectedIds.has(def.rowId)) {
        return false;
      }
      // Search filter
      if (query) {
        // Check name, description, and rowId
        if (
          def.name.toLowerCase().includes(query) ||
          def.description?.toLowerCase().includes(query) ||
          def.rowId.toLowerCase().includes(query)
        ) {
          return true;
        }
        // Check search tags/aliases
        const tags = INTEGRATION_SEARCH_TAGS[def.rowId];
        if (tags?.some((tag) => tag.includes(query))) {
          return true;
        }
        return false;
      }
      return true;
    });

    return {
      builtin: builtinFiltered,
      integrations: integrationFiltered,
    };
  }, [
    searchQuery,
    selectedCategory,
    showOnlyConnected,
    definitions,
    connectedIds,
  ]);

  // Handle node selection
  const handleSelectBuiltin = (node: (typeof BUILTIN_NODES)[0]) => {
    onSelectNode({
      type: node.nodeType,
      data: {
        label: node.label,
        description: node.description,
        iconName: node.icon.name,
        ...(node.pluginId && { pluginId: node.pluginId }),
        ...(node.operation && { operation: node.operation }),
        ...(node.config && { config: node.config }),
      },
    });
  };

  const handleSelectIntegration = (def: (typeof definitions)[0]) => {
    // Use rowId (e.g., "twilio") for comparisons, not the Relay Node ID
    const isConnected = connectedIds.has(def.rowId);
    const connectedIntegration = connectedIntegrations.find(
      (i) => i.type === def.rowId,
    );

    onSelectNode({
      type: NodeTypes.ACTION,
      data: {
        label: def.name,
        description: def.description ?? `${def.name} integration`,
        iconUrl: def.iconUrl,
        integrationId: isConnected ? def.rowId : undefined,
        integrationDefinitionId: def.rowId,
        connectedInstanceId: connectedIntegration?.rowId,
        requiresConnection: !isConnected,
      },
    });
  };

  const handleOpenPreview = (
    e: React.MouseEvent,
    def: (typeof definitions)[0],
  ) => {
    e.stopPropagation();
    setPreviewIntegration(def);
  };

  const handleConnectFromPreview = () => {
    if (!previewIntegration) return;
    window.location.href = `/workspaces/${workspaceSlug}/integrations?connect=${previewIntegration.rowId}`;
  };

  const handleAddActionFromPreview = (action: IntegrationAction) => {
    if (!previewIntegration) return;
    const isConnected = connectedIds.has(previewIntegration.rowId);
    const connectedIntegration = connectedIntegrations.find(
      (i) => i.type === previewIntegration.rowId,
    );

    onSelectNode({
      type: NodeTypes.ACTION,
      data: {
        label: previewIntegration.name,
        description:
          previewIntegration.description ??
          `${previewIntegration.name} integration`,
        iconUrl: previewIntegration.iconUrl,
        integrationId: isConnected ? previewIntegration.rowId : undefined,
        integrationDefinitionId: previewIntegration.rowId,
        connectedInstanceId: connectedIntegration?.rowId,
        requiresConnection: !isConnected,
        operation: action.value,
      },
    });
  };

  // Count integrations by category for badges
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryKey, number> = {
      all: definitions.length + BUILTIN_NODES.length,
      triggers: BUILTIN_NODES.filter((n) => n.category === "triggers").length,
      flow: BUILTIN_NODES.filter((n) => n.category === "flow").length,
      transform: BUILTIN_NODES.filter((n) => n.category === "transform").length,
      http: BUILTIN_NODES.filter((n) => n.category === "http").length,
      ai:
        definitions.filter((d) => mapCategory(d.category) === "ai").length +
        BUILTIN_NODES.filter((n) => n.category === "ai").length,
      communication: definitions.filter(
        (d) => mapCategory(d.category) === "communication",
      ).length,
      developer: definitions.filter(
        (d) => mapCategory(d.category) === "developer",
      ).length,
      productivity: definitions.filter(
        (d) => mapCategory(d.category) === "productivity",
      ).length,
      marketing: definitions.filter(
        (d) => mapCategory(d.category) === "marketing",
      ).length,
      commerce: definitions.filter(
        (d) => mapCategory(d.category) === "commerce",
      ).length,
      payments: definitions.filter(
        (d) => mapCategory(d.category) === "payments",
      ).length,
      storage: definitions.filter((d) => mapCategory(d.category) === "storage")
        .length,
      smarthome: definitions.filter(
        (d) => mapCategory(d.category) === "smarthome",
      ).length,
      other: definitions.filter((d) => mapCategory(d.category) === "other")
        .length,
    };
    return counts;
  }, [definitions]);

  return (
    <div className="flex h-full flex-col">
      {/* Search */}
      <div className="border-b p-4">
        <div className="relative">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            placeholder="Search nodes and integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filter toggle */}
        <div className="mt-3 flex items-center gap-2">
          <Button
            variant={showOnlyConnected ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setShowOnlyConnected(!showOnlyConnected)}
            className="h-7 text-xs"
          >
            <Filter className="mr-1.5 h-3 w-3" />
            Connected only
          </Button>
          <span className="text-muted-foreground text-xs">
            {filteredNodes.builtin.length + filteredNodes.integrations.length}{" "}
            nodes
          </span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="border-b px-2 py-2">
        <div className="flex flex-wrap gap-1">
          {Object.entries(CATEGORIES).map(([key, { label, icon: Icon }]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(key as CategoryKey)}
              className="h-7 gap-1.5 px-2 text-xs"
            >
              <Icon className="h-3 w-3" />
              {label}
              {categoryCounts[key as CategoryKey] > 0 && (
                <Badge
                  variant={selectedCategory === key ? "default" : "secondary"}
                  className="ml-1 h-4 px-1 text-[10px]"
                >
                  {categoryCounts[key as CategoryKey]}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Node List */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {/* Built-in Nodes */}
          {filteredNodes.builtin.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                <Zap className="h-3.5 w-3.5" />
                Built-in
              </h3>
              <div className="grid gap-2">
                {filteredNodes.builtin.map((node) => (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => handleSelectBuiltin(node)}
                    className="flex cursor-pointer items-start gap-3 overflow-hidden rounded-lg border bg-card p-3 text-left transition-colors hover:border-primary/50 hover:bg-accent"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
                      <node.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="truncate font-medium text-sm">
                          {node.label}
                        </span>
                        {node.beta && (
                          <Badge
                            variant="secondary"
                            className="h-4 shrink-0 px-1 text-[10px]"
                          >
                            Beta
                          </Badge>
                        )}
                      </div>
                      <div className="truncate text-muted-foreground text-xs">
                        {node.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Integration Nodes */}
          {filteredNodes.integrations.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                <Cable className="h-3.5 w-3.5" />
                Integrations
                <Badge variant="outline" className="text-[10px]">
                  {filteredNodes.integrations.length}
                </Badge>
              </h3>
              <div className="grid gap-2">
                {filteredNodes.integrations.map((def) => {
                  const isConnected = connectedIds.has(def.rowId);
                  return (
                    <div
                      key={def.rowId}
                      className="group relative flex items-start gap-3 overflow-hidden rounded-lg border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-accent"
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectIntegration(def)}
                        className="flex flex-1 cursor-pointer items-start gap-3 text-left"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white dark:bg-slate-700">
                          {def.iconUrl ? (
                            <img
                              src={def.iconUrl}
                              alt={def.name}
                              className="h-5 w-5 rounded"
                            />
                          ) : (
                            <Cable className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1 overflow-hidden">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <span className="truncate font-medium text-sm">
                              {def.name}
                            </span>
                            {isConnected && (
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-500" />
                            )}
                            {def.isFeatured && (
                              <Badge
                                variant="secondary"
                                className="h-4 shrink-0 px-1 text-[10px]"
                              >
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="truncate text-muted-foreground text-xs">
                            {def.description}
                          </div>
                        </div>
                      </button>
                      <div className="flex shrink-0 items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={(e) => handleOpenPreview(e, def)}
                        >
                          <Info className="h-4 w-4" />
                          <span className="sr-only">View actions</span>
                        </Button>
                        {!isConnected && (
                          <Badge
                            variant="outline"
                            className="text-[10px] text-muted-foreground"
                          >
                            Connect
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredNodes.builtin.length === 0 &&
            filteredNodes.integrations.length === 0 && (
              <div className="py-12 text-center">
                <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
                <p className="text-muted-foreground text-sm">
                  No nodes found matching "{searchQuery}"
                </p>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setShowOnlyConnected(false);
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}

          {/* Loading State */}
          {loadingDefinitions && (
            <div className="py-12 text-center">
              <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
              <p className="text-muted-foreground text-sm">
                Loading integrations...
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      {previewIntegration && (
        <IntegrationPreviewModal
          open={!!previewIntegration}
          onOpenChange={(open) => !open && setPreviewIntegration(null)}
          integration={previewIntegration}
          isConnected={connectedIds.has(previewIntegration.rowId)}
          onConnect={handleConnectFromPreview}
          onAddAction={handleAddActionFromPreview}
        />
      )}
    </div>
  );
}
