import { useQuery } from "@tanstack/react-query";
import { AlertCircle, ExternalLink, Loader2, Plug } from "lucide-react";
import { useMemo } from "react";

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
import { integrationDefinitionOptions } from "@/lib/options/integrations.options";

import type { NodeConfigProps } from "./types";

/**
 * IntegrationNodeConfig provides a user-friendly UI for configuring
 * integration nodes (Shopify, Stripe, etc.) instead of showing raw
 * operation/inputs fields.
 */
export const IntegrationNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  const integrationDefinitionId = data.integrationDefinitionId as
    | string
    | undefined;
  const requiresConnection = data.requiresConnection as boolean | undefined;
  const operation = (data.operation as string) || "";
  const inputs = (data.inputs as Record<string, unknown>) || {};

  // Fetch the integration definition to get available actions
  const { data: definitionData, isLoading } = useQuery({
    ...integrationDefinitionOptions({ rowId: integrationDefinitionId || "" }),
    enabled: !!integrationDefinitionId,
  });

  const definition = definitionData?.integrationDefinition;

  // For now, we'll provide a simple but friendly interface
  // In a full implementation, this would show actions from the catalog
  const commonActions = useMemo(() => {
    if (!integrationDefinitionId) return [];

    // Map common integration patterns to user-friendly actions
    const actionsByIntegration: Record<
      string,
      { value: string; label: string; description: string }[]
    > = {
      shopify: [
        {
          value: "get_products",
          label: "Get Products",
          description: "Retrieve a list of products",
        },
        {
          value: "get_product",
          label: "Get Product",
          description: "Get a single product by ID",
        },
        {
          value: "create_product",
          label: "Create Product",
          description: "Add a new product",
        },
        {
          value: "update_product",
          label: "Update Product",
          description: "Update an existing product",
        },
        {
          value: "get_orders",
          label: "Get Orders",
          description: "Retrieve a list of orders",
        },
        {
          value: "get_order",
          label: "Get Order",
          description: "Get a single order by ID",
        },
        {
          value: "create_order",
          label: "Create Order",
          description: "Create a draft order",
        },
        {
          value: "get_customers",
          label: "Get Customers",
          description: "Retrieve a list of customers",
        },
        {
          value: "get_customer",
          label: "Get Customer",
          description: "Get a single customer by ID",
        },
        {
          value: "custom",
          label: "Custom Action",
          description: "Configure a custom API call",
        },
      ],
      stripe: [
        {
          value: "get_customers",
          label: "Get Customers",
          description: "List all customers",
        },
        {
          value: "create_customer",
          label: "Create Customer",
          description: "Add a new customer",
        },
        {
          value: "create_payment_intent",
          label: "Create Payment",
          description: "Start a new payment",
        },
        {
          value: "get_invoices",
          label: "Get Invoices",
          description: "List all invoices",
        },
        {
          value: "custom",
          label: "Custom Action",
          description: "Configure a custom API call",
        },
      ],
      // Default actions for any integration
      default: [
        {
          value: "custom",
          label: "Custom Action",
          description: "Configure a custom API call",
        },
      ],
    };

    return (
      actionsByIntegration[integrationDefinitionId] ||
      actionsByIntegration.default
    );
  }, [integrationDefinitionId]);

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
              <a href="/integrations" target="_blank" rel="noopener noreferrer">
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
        >
          <SelectTrigger>
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
      {operation && operation !== "custom" && (
        <ActionInputs
          integrationId={integrationDefinitionId || ""}
          operation={operation}
          inputs={inputs}
          updateInput={updateInput}
        />
      )}

      {/* Custom action shows generic inputs */}
      {operation === "custom" && (
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
}: {
  integrationId: string;
  operation: string;
  inputs: Record<string, unknown>;
  updateInput: (key: string, value: unknown) => void;
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
