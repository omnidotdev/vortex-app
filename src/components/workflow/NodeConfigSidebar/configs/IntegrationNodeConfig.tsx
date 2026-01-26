import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { AlertCircle, ExternalLink, Loader2, Plug } from "lucide-react";
import { useCallback, useMemo, useRef } from "react";

import { Button } from "@/components/ui/button";
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
import { VariablePicker } from "@/components/workflow/VariablePicker";
import { getIntegrationActions } from "@/lib/integrations/actions";
import { integrationDefinitionOptions } from "@/lib/options/integrations.options";

import type { Node } from "reactflow";
import type { NodeConfigProps } from "./types";

/**
 * IntegrationNodeConfig provides a user-friendly UI for configuring
 * integration nodes (Shopify, Stripe, etc.) instead of showing raw
 * operation/inputs fields.
 */
export const IntegrationNodeConfig = ({
  nodeId,
  data,
  onChange,
  allNodes = [],
}: NodeConfigProps) => {
  const { workspaceSlug } = useParams({ strict: false });
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const integrationDefinitionId = data.integrationDefinitionId as
    | string
    | undefined;
  const requiresConnection = data.requiresConnection as boolean | undefined;
  const operation = (data.operation as string) || "";
  const inputs = (data.inputs as Record<string, unknown>) || {};

  // Handle inserting a variable into the prompt field
  const handleInsertVariable = useCallback(
    (variable: string, _displayName: string) => {
      const textarea = promptRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentValue = (inputs.prompt as string) || "";
        const newValue =
          currentValue.substring(0, start) +
          variable +
          currentValue.substring(end);
        onChange("inputs", { ...inputs, prompt: newValue });

        // Restore cursor position after the inserted variable
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(
            start + variable.length,
            start + variable.length,
          );
        }, 0);
      } else {
        // Fallback: append to end
        const currentValue = (inputs.prompt as string) || "";
        onChange("inputs", { ...inputs, prompt: currentValue + variable });
      }
    },
    [inputs, onChange],
  );

  // Fetch the integration definition to get available actions
  const { data: definitionData, isLoading } = useQuery({
    ...integrationDefinitionOptions({ rowId: integrationDefinitionId || "" }),
    enabled: !!integrationDefinitionId,
  });

  const definition = definitionData?.integrationDefinition;

  // Get available actions for this integration from the shared module
  const commonActions = useMemo(() => {
    // Use rowId (e.g., "twilio") - the actual primary key, not the Relay Node ID
    const integrationId = definition?.rowId || integrationDefinitionId;
    if (!integrationId) return [];

    return getIntegrationActions(integrationId);
  }, [definition?.rowId, integrationDefinitionId]);

  const updateInput = (key: string, value: unknown) => {
    onChange("inputs", { ...inputs, [key]: value });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      {requiresConnection && (
        <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950">
          <Plug className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="flex flex-1 items-center justify-between gap-2">
            <span className="text-amber-800 text-sm dark:text-amber-200">
              This integration needs to be connected first.
            </span>
            <Button variant="outline" size="sm" asChild>
              <a
                href={`/workspaces/${workspaceSlug}/integrations?connect=${integrationDefinitionId}&returnTo=${encodeURIComponent(window.location.pathname)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      )}

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder={`What should this ${definition?.name || "integration"} step do?`}
          rows={2}
        />
      </div>

      {/* Action Selection */}
      <div className="space-y-2">
        <Label>Action</Label>
        <Select
          value={operation}
          onValueChange={(v) => onChange("operation", v)}
          disabled={requiresConnection}
        >
          <SelectTrigger disabled={requiresConnection}>
            <SelectValue placeholder="Select an action..." />
          </SelectTrigger>
          <SelectContent>
            {commonActions.map((action) => (
              <SelectItem key={action.value} value={action.value}>
                <div className="flex flex-col">
                  <span>{action.label}</span>
                  <span className="text-muted-foreground text-xs">
                    {action.description}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Dynamic Inputs based on selected action */}
      {!requiresConnection && operation && operation !== "custom" && (
        <ActionInputs
          integrationId={definition?.rowId || integrationDefinitionId || ""}
          operation={operation}
          inputs={inputs}
          updateInput={updateInput}
          nodeId={nodeId}
          allNodes={allNodes}
          promptRef={promptRef}
          handleInsertVariable={handleInsertVariable}
        />
      )}

      {/* Custom action shows generic inputs */}
      {!requiresConnection && operation === "custom" && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg border bg-muted/50 p-3">
            <AlertCircle className="h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              For custom actions, refer to the{" "}
              {definition?.docsUrl ? (
                <a
                  href={definition.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  API documentation
                </a>
              ) : (
                "integration's API documentation"
              )}
              .
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endpoint">Endpoint / Method</Label>
            <Input
              id="endpoint"
              value={(inputs.endpoint as string) || ""}
              onChange={(e) => updateInput("endpoint", e.target.value)}
              placeholder="e.g., products/list or /api/orders"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="params">Parameters (JSON)</Label>
            <Textarea
              id="params"
              value={
                typeof inputs.params === "object"
                  ? JSON.stringify(inputs.params, null, 2)
                  : (inputs.params as string) || ""
              }
              onChange={(e) => {
                try {
                  updateInput("params", JSON.parse(e.target.value));
                } catch {
                  updateInput("params", e.target.value);
                }
              }}
              placeholder='{"limit": 10}'
              rows={4}
              className="font-mono text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Render appropriate input fields based on the selected action
 */
const ActionInputs = ({
  integrationId,
  operation,
  inputs,
  updateInput,
  nodeId,
  allNodes,
  promptRef,
  handleInsertVariable,
}: {
  integrationId: string;
  operation: string;
  inputs: Record<string, unknown>;
  updateInput: (key: string, value: unknown) => void;
  nodeId: string;
  allNodes: Node[];
  promptRef: React.RefObject<HTMLTextAreaElement | null>;
  handleInsertVariable: (variable: string, displayName: string) => void;
}) => {
  // Shopify-specific inputs
  if (integrationId === "shopify") {
    if (operation === "get_product" || operation === "update_product") {
      return (
        <div className="space-y-2">
          <Label htmlFor="product_id">Product ID</Label>
          <Input
            id="product_id"
            value={(inputs.product_id as string) || ""}
            onChange={(e) => updateInput("product_id", e.target.value)}
            placeholder="Enter product ID or use {{variable}}"
          />
        </div>
      );
    }

    if (operation === "get_order") {
      return (
        <div className="space-y-2">
          <Label htmlFor="order_id">Order ID</Label>
          <Input
            id="order_id"
            value={(inputs.order_id as string) || ""}
            onChange={(e) => updateInput("order_id", e.target.value)}
            placeholder="Enter order ID or use {{variable}}"
          />
        </div>
      );
    }

    if (operation === "get_customer") {
      return (
        <div className="space-y-2">
          <Label htmlFor="customer_id">Customer ID</Label>
          <Input
            id="customer_id"
            value={(inputs.customer_id as string) || ""}
            onChange={(e) => updateInput("customer_id", e.target.value)}
            placeholder="Enter customer ID or use {{variable}}"
          />
        </div>
      );
    }

    if (
      operation === "get_products" ||
      operation === "get_orders" ||
      operation === "get_customers"
    ) {
      return (
        <div className="space-y-2">
          <Label htmlFor="limit">Limit (optional)</Label>
          <Input
            id="limit"
            type="number"
            value={(inputs.limit as number) || ""}
            onChange={(e) =>
              updateInput(
                "limit",
                e.target.value
                  ? Number.parseInt(e.target.value, 10)
                  : undefined,
              )
            }
            placeholder="50"
            min={1}
            max={250}
          />
          <p className="text-muted-foreground text-xs">
            Maximum number of items to return (1-250)
          </p>
        </div>
      );
    }

    if (operation === "create_product") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Product Title</Label>
            <Input
              id="title"
              value={(inputs.title as string) || ""}
              onChange={(e) => updateInput("title", e.target.value)}
              placeholder="Enter product title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body_html">Description (HTML)</Label>
            <Textarea
              id="body_html"
              value={(inputs.body_html as string) || ""}
              onChange={(e) => updateInput("body_html", e.target.value)}
              placeholder="Product description..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vendor">Vendor (optional)</Label>
            <Input
              id="vendor"
              value={(inputs.vendor as string) || ""}
              onChange={(e) => updateInput("vendor", e.target.value)}
              placeholder="Brand name"
            />
          </div>
        </div>
      );
    }
  }

  // Stripe-specific inputs
  if (integrationId === "stripe") {
    if (operation === "create_customer") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={(inputs.email as string) || ""}
              onChange={(e) => updateInput("email", e.target.value)}
              placeholder="customer@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name (optional)</Label>
            <Input
              id="name"
              value={(inputs.name as string) || ""}
              onChange={(e) => updateInput("name", e.target.value)}
              placeholder="Customer name"
            />
          </div>
        </div>
      );
    }

    if (operation === "create_payment_intent") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (cents)</Label>
            <Input
              id="amount"
              type="number"
              value={(inputs.amount as number) || ""}
              onChange={(e) =>
                updateInput("amount", Number.parseInt(e.target.value, 10))
              }
              placeholder="1000 = $10.00"
            />
            <p className="text-muted-foreground text-xs">
              Amount in cents (e.g., 1000 = $10.00)
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={(inputs.currency as string) || "usd"}
              onValueChange={(v) => updateInput("currency", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
                <SelectItem value="gbp">GBP</SelectItem>
                <SelectItem value="cad">CAD</SelectItem>
                <SelectItem value="aud">AUD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    }
  }

  // Twilio-specific inputs
  if (integrationId === "twilio") {
    if (operation === "send_sms" || operation === "send_mms") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="to">To Phone Number</Label>
            <Input
              id="to"
              value={(inputs.to as string) || ""}
              onChange={(e) => updateInput("to", e.target.value)}
              placeholder="+1234567890 or {{variable}}"
            />
            <p className="text-muted-foreground text-xs">
              Phone number in E.164 format (e.g., +1234567890)
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="from">From Phone Number</Label>
            <Input
              id="from"
              value={(inputs.from as string) || ""}
              onChange={(e) => updateInput("from", e.target.value)}
              placeholder="+1234567890 (your Twilio number)"
            />
            <p className="text-muted-foreground text-xs">
              Your Twilio phone number
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Message Body</Label>
            <Textarea
              id="body"
              value={(inputs.body as string) || ""}
              onChange={(e) => updateInput("body", e.target.value)}
              placeholder="Enter your message or use {{variable}}"
              rows={3}
            />
          </div>
          {operation === "send_mms" && (
            <div className="space-y-2">
              <Label htmlFor="mediaUrl">Media URL (optional)</Label>
              <Input
                id="mediaUrl"
                value={(inputs.mediaUrl as string) || ""}
                onChange={(e) => updateInput("mediaUrl", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-muted-foreground text-xs">
                URL of the media to attach
              </p>
            </div>
          )}
        </div>
      );
    }

    if (operation === "make_call") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="to">To Phone Number</Label>
            <Input
              id="to"
              value={(inputs.to as string) || ""}
              onChange={(e) => updateInput("to", e.target.value)}
              placeholder="+1234567890 or {{variable}}"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="from">From Phone Number</Label>
            <Input
              id="from"
              value={(inputs.from as string) || ""}
              onChange={(e) => updateInput("from", e.target.value)}
              placeholder="+1234567890 (your Twilio number)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">TwiML URL</Label>
            <Input
              id="url"
              value={(inputs.url as string) || ""}
              onChange={(e) => updateInput("url", e.target.value)}
              placeholder="https://example.com/twiml"
            />
            <p className="text-muted-foreground text-xs">
              URL that returns TwiML instructions for the call
            </p>
          </div>
        </div>
      );
    }

    if (operation === "get_message") {
      return (
        <div className="space-y-2">
          <Label htmlFor="messageSid">Message SID</Label>
          <Input
            id="messageSid"
            value={(inputs.messageSid as string) || ""}
            onChange={(e) => updateInput("messageSid", e.target.value)}
            placeholder="SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          />
        </div>
      );
    }

    if (operation === "lookup_phone") {
      return (
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            value={(inputs.phoneNumber as string) || ""}
            onChange={(e) => updateInput("phoneNumber", e.target.value)}
            placeholder="+1234567890"
          />
          <p className="text-muted-foreground text-xs">
            Phone number to look up information for
          </p>
        </div>
      );
    }
  }

  // Slack-specific inputs
  if (integrationId === "slack") {
    if (operation === "send_message") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="channel">Channel</Label>
            <Input
              id="channel"
              value={(inputs.channel as string) || ""}
              onChange={(e) => updateInput("channel", e.target.value)}
              placeholder="#general or C1234567890"
            />
            <p className="text-muted-foreground text-xs">
              Channel name (with #) or channel ID
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="text">Message</Label>
            <Textarea
              id="text"
              value={(inputs.text as string) || ""}
              onChange={(e) => updateInput("text", e.target.value)}
              placeholder="Enter your message or use {{variable}}"
              rows={3}
            />
          </div>
        </div>
      );
    }

    if (operation === "send_dm") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user">User</Label>
            <Input
              id="user"
              value={(inputs.user as string) || ""}
              onChange={(e) => updateInput("user", e.target.value)}
              placeholder="U1234567890 or @username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="text">Message</Label>
            <Textarea
              id="text"
              value={(inputs.text as string) || ""}
              onChange={(e) => updateInput("text", e.target.value)}
              placeholder="Enter your message"
              rows={3}
            />
          </div>
        </div>
      );
    }
  }

  // Discord-specific inputs
  if (integrationId === "discord") {
    if (operation === "send_message") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="channelId">Channel ID</Label>
            <Input
              id="channelId"
              value={(inputs.channelId as string) || ""}
              onChange={(e) => updateInput("channelId", e.target.value)}
              placeholder="123456789012345678"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Message</Label>
            <Textarea
              id="content"
              value={(inputs.content as string) || ""}
              onChange={(e) => updateInput("content", e.target.value)}
              placeholder="Enter your message"
              rows={3}
            />
          </div>
        </div>
      );
    }
  }

  // Email integrations (Resend, SendGrid)
  if (integrationId === "resend" || integrationId === "sendgrid") {
    if (operation === "send_email") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              value={(inputs.to as string) || ""}
              onChange={(e) => updateInput("to", e.target.value)}
              placeholder="recipient@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="from">From</Label>
            <Input
              id="from"
              value={(inputs.from as string) || ""}
              onChange={(e) => updateInput("from", e.target.value)}
              placeholder="sender@yourdomain.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={(inputs.subject as string) || ""}
              onChange={(e) => updateInput("subject", e.target.value)}
              placeholder="Email subject"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="html">Body (HTML)</Label>
            <Textarea
              id="html"
              value={(inputs.html as string) || ""}
              onChange={(e) => updateInput("html", e.target.value)}
              placeholder="<p>Your email content...</p>"
              rows={4}
            />
          </div>
        </div>
      );
    }
  }

  // AI integrations (OpenAI, Anthropic)
  if (integrationId === "openai" || integrationId === "anthropic") {
    if (operation === "ask_chatgpt" || operation === "ask_claude") {
      const openaiModels = [
        { value: "gpt-4o", label: "GPT-4o (Latest)" },
        { value: "gpt-4o-mini", label: "GPT-4o Mini (Fast)" },
        { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
        { value: "gpt-4", label: "GPT-4" },
        { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
      ];
      const anthropicModels = [
        {
          value: "claude-sonnet-4-20250514",
          label: "Claude Sonnet 4 (Latest)",
        },
        { value: "claude-3-5-sonnet-20241022", label: "Claude 3.5 Sonnet" },
        {
          value: "claude-3-5-haiku-20241022",
          label: "Claude 3.5 Haiku (Fast)",
        },
        { value: "claude-3-opus-20240229", label: "Claude 3 Opus" },
      ];
      const models =
        integrationId === "openai" ? openaiModels : anthropicModels;

      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select
              value={(inputs.model as string) || ""}
              onValueChange={(v) => updateInput("model", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a model..." />
              </SelectTrigger>
              <SelectContent>
                {models.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="prompt">Prompt</Label>
              <VariablePicker
                nodes={allNodes}
                currentNodeId={nodeId}
                onSelect={handleInsertVariable}
              />
            </div>
            <Textarea
              ref={promptRef}
              id="prompt"
              value={(inputs.prompt as string) || ""}
              onChange={(e) => updateInput("prompt", e.target.value)}
              placeholder="Enter your prompt or click { } to insert data from previous steps"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxTokens">Max Tokens (optional)</Label>
            <Input
              id="maxTokens"
              type="number"
              value={(inputs.maxTokens as number) || ""}
              onChange={(e) =>
                updateInput(
                  "maxTokens",
                  e.target.value
                    ? Number.parseInt(e.target.value, 10)
                    : undefined,
                )
              }
              placeholder="2048"
            />
          </div>
        </div>
      );
    }
  }

  // GitHub-specific inputs
  if (integrationId === "github") {
    if (operation === "create_issue") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="owner">Repository Owner</Label>
            <Input
              id="owner"
              value={(inputs.owner as string) || ""}
              onChange={(e) => updateInput("owner", e.target.value)}
              placeholder="username or organization"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="repo">Repository Name</Label>
            <Input
              id="repo"
              value={(inputs.repo as string) || ""}
              onChange={(e) => updateInput("repo", e.target.value)}
              placeholder="repository-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Issue Title</Label>
            <Input
              id="title"
              value={(inputs.title as string) || ""}
              onChange={(e) => updateInput("title", e.target.value)}
              placeholder="Issue title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Issue Body (optional)</Label>
            <Textarea
              id="body"
              value={(inputs.body as string) || ""}
              onChange={(e) => updateInput("body", e.target.value)}
              placeholder="Describe the issue..."
              rows={4}
            />
          </div>
        </div>
      );
    }

    if (operation === "get_issues" || operation === "get_prs") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="owner">Repository Owner</Label>
            <Input
              id="owner"
              value={(inputs.owner as string) || ""}
              onChange={(e) => updateInput("owner", e.target.value)}
              placeholder="username or organization"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="repo">Repository Name</Label>
            <Input
              id="repo"
              value={(inputs.repo as string) || ""}
              onChange={(e) => updateInput("repo", e.target.value)}
              placeholder="repository-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State (optional)</Label>
            <Select
              value={(inputs.state as string) || "open"}
              onValueChange={(v) => updateInput("state", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    }
  }

  // Generic fallback for list operations
  if (operation.startsWith("get_") && operation.endsWith("s")) {
    return (
      <div className="space-y-2">
        <Label htmlFor="limit">Limit (optional)</Label>
        <Input
          id="limit"
          type="number"
          value={(inputs.limit as number) || ""}
          onChange={(e) =>
            updateInput(
              "limit",
              e.target.value ? Number.parseInt(e.target.value, 10) : undefined,
            )
          }
          placeholder="50"
        />
      </div>
    );
  }

  return null;
};
