import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

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
import { JsonField } from "../fields/JsonField";
import { DiscordNodeConfig } from "./DiscordNodeConfig";
import { IntegrationNodeConfig } from "./IntegrationNodeConfig";
import { SlackNodeConfig } from "./SlackNodeConfig";

import type { NodeConfigProps } from "./types";

export const ActionNodeConfig = (props: NodeConfigProps) => {
  const { data, onChange } = props;
  const preset = data.preset as string | undefined;

  // Route to simplified configs for communication presets
  // These hide HTTP implementation details like n8n does
  if (preset === "discord" || preset === "discord-embed") {
    return <DiscordNodeConfig {...props} />;
  }
  if (preset === "slack") {
    return <SlackNodeConfig {...props} />;
  }

  const pluginId = (data.pluginId as string) || "";
  const operation = (data.operation as string) || "";
  const inputs = (data.inputs as Record<string, unknown>) || {};

  const updateInput = (key: string, value: unknown) => {
    onChange("inputs", { ...inputs, [key]: value });
  };

  // For HTTP Request nodes, show simplified UI
  if (pluginId === "builtin:http") {
    return (
      <HttpNodeConfig
        data={data}
        onChange={onChange}
        operation={operation}
        inputs={inputs}
        updateInput={updateInput}
      />
    );
  }

  // For Transform nodes, show simplified UI
  if (pluginId === "builtin:transform") {
    return (
      <TransformNodeConfig
        data={data}
        onChange={onChange}
        operation={operation}
        inputs={inputs}
        updateInput={updateInput}
      />
    );
  }

  // For integration nodes (Shopify, Stripe, etc.), show friendly UI
  const integrationDefinitionId = data.integrationDefinitionId as
    | string
    | undefined;
  if (integrationDefinitionId) {
    return <IntegrationNodeConfig {...props} />;
  }

  // Fallback for custom/unknown plugins
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this action do?"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customOperation">Operation</Label>
        <Input
          id="customOperation"
          value={operation}
          onChange={(e) => onChange("operation", e.target.value)}
          placeholder="e.g., sendEmail, notify"
        />
      </div>

      <JsonField
        id="inputs"
        label="Input Data"
        value={inputs}
        onChange={(val) => onChange("inputs", val)}
        placeholder='{"key": "value"}'
      />
    </>
  );
};

// Simplified HTTP node config
const HttpNodeConfig = ({
  data,
  onChange,
  operation,
  inputs,
  updateInput,
}: {
  data: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  operation: string;
  inputs: Record<string, unknown>;
  updateInput: (key: string, value: unknown) => void;
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Get config as fallback for inputs (templates store defaults in config)
  const config = (data.config as Record<string, unknown>) || {};

  // Determine HTTP method from operation or inputs
  const method =
    operation === "request"
      ? (inputs.method as string) || "GET"
      : operation.toUpperCase();
  const showBody = ["POST", "PUT", "PATCH"].includes(method);

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this request do?"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          value={(inputs.url as string) || ""}
          onChange={(e) => updateInput("url", e.target.value)}
          placeholder="https://api.example.com/endpoint"
        />
        <p className="text-muted-foreground text-xs">
          Use {"{{variable}}"} for dynamic values from previous steps
        </p>
      </div>

      <div className="space-y-2">
        <Label>Method</Label>
        <Select
          value={method}
          onValueChange={(value) => {
            if (operation === "request") {
              updateInput("method", value);
            } else {
              // Switch to custom request mode
              onChange("operation", "request");
              updateInput("method", value);
            }
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET - Fetch data</SelectItem>
            <SelectItem value="POST">POST - Send data</SelectItem>
            <SelectItem value="PUT">PUT - Update/replace</SelectItem>
            <SelectItem value="PATCH">PATCH - Partial update</SelectItem>
            <SelectItem value="DELETE">DELETE - Remove</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {showBody && (
        <JsonField
          id="body"
          label="Request Body"
          value={
            (inputs.body as Record<string, unknown>) ||
            (config.body as Record<string, unknown>) ||
            {}
          }
          onChange={(val) => updateInput("body", val)}
          placeholder='{"content": "Hello from Vortex!", "username": "Vortex Bot"}'
        />
      )}

      <button
        type="button"
        className="flex w-full items-center gap-2 border-t pt-4 text-muted-foreground text-sm hover:text-foreground"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        {showAdvanced ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        Headers & Timeout
      </button>

      {showAdvanced && (
        <div className="space-y-4 pt-2">
          <JsonField
            id="headers"
            label="Headers"
            value={(inputs.headers as Record<string, string>) || {}}
            onChange={(val) => updateInput("headers", val)}
            placeholder='{"Authorization": "Bearer {{token}}"}'
          />

          <div className="space-y-2">
            <Label htmlFor="timeout">Timeout</Label>
            <div className="flex items-center gap-2">
              <Input
                id="timeout"
                type="number"
                value={Math.round(((inputs.timeout as number) || 30000) / 1000)}
                onChange={(e) =>
                  updateInput(
                    "timeout",
                    (Number.parseInt(e.target.value, 10) || 30) * 1000,
                  )
                }
                min={1}
                max={120}
                className="w-24"
              />
              <span className="text-muted-foreground text-sm">seconds</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Simplified Transform node config
const TransformNodeConfig = ({
  data,
  onChange,
  operation,
  inputs,
  updateInput,
}: {
  data: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  operation: string;
  inputs: Record<string, unknown>;
  updateInput: (key: string, value: unknown) => void;
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this transform do?"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>Transform Type</Label>
        <Select
          value={operation}
          onValueChange={(value) => {
            onChange("operation", value);
            onChange("inputs", {});
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select transform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jsonPath">Extract Data (JSONPath)</SelectItem>
            <SelectItem value="template">Build from Template</SelectItem>
            <SelectItem value="map">Map Fields</SelectItem>
            <SelectItem value="pick">Keep Fields</SelectItem>
            <SelectItem value="omit">Remove Fields</SelectItem>
            <SelectItem value="merge">Merge Objects</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <TransformInputs
        operation={operation}
        inputs={inputs}
        updateInput={updateInput}
      />
    </>
  );
};

// Transform-specific input fields
const TransformInputs = ({
  operation,
  inputs,
  updateInput,
}: {
  operation: string;
  inputs: Record<string, unknown>;
  updateInput: (key: string, value: unknown) => void;
}) => {
  if (!operation) return null;

  return (
    <div className="space-y-4">
      {operation === "jsonPath" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="data">Source Data</Label>
            <Input
              id="data"
              value={(inputs.data as string) || ""}
              onChange={(e) => updateInput("data", e.target.value)}
              placeholder="{{trigger.data}} or {{steps.step1.output}}"
            />
            <p className="text-muted-foreground text-xs">
              Reference to the data to extract from
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="path">JSONPath Expression</Label>
            <Input
              id="path"
              value={(inputs.path as string) || ""}
              onChange={(e) => updateInput("path", e.target.value)}
              placeholder="$.items[*].name"
              className="font-mono"
            />
            <p className="text-muted-foreground text-xs">
              e.g., $.data.items[0].id, $..name, $.users[?(@.active)]
            </p>
          </div>
        </>
      )}

      {operation === "template" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="template">Template</Label>
            <Textarea
              id="template"
              value={(inputs.template as string) || ""}
              onChange={(e) => updateInput("template", e.target.value)}
              placeholder="Hello {{name}}, your order #{{orderId}} is ready!"
              rows={3}
              className="font-mono"
            />
          </div>
          <JsonField
            id="variables"
            label="Variables"
            value={(inputs.variables as Record<string, unknown>) || {}}
            onChange={(val) => updateInput("variables", val)}
            placeholder='{"name": "{{trigger.user}}", "orderId": "{{steps.order.id}}"}'
          />
        </>
      )}

      {operation === "map" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="data">Source Data</Label>
            <Input
              id="data"
              value={(inputs.data as string) || ""}
              onChange={(e) => updateInput("data", e.target.value)}
              placeholder="{{trigger.data}}"
            />
          </div>
          <JsonField
            id="mapping"
            label="Mapping"
            value={(inputs.mapping as Record<string, unknown>) || {}}
            onChange={(val) => updateInput("mapping", val)}
            placeholder='{"userId": "$.id", "fullName": "$.profile.name"}'
          />
          <p className="text-muted-foreground text-xs">
            Use JSONPath ($.path) for dynamic values or literals for static
            values
          </p>
        </>
      )}

      {(operation === "pick" || operation === "omit") && (
        <>
          <div className="space-y-2">
            <Label htmlFor="data">Source Object</Label>
            <Input
              id="data"
              value={(inputs.data as string) || ""}
              onChange={(e) => updateInput("data", e.target.value)}
              placeholder="{{trigger.data}}"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keys">
              Keys to {operation === "pick" ? "Keep" : "Remove"}
            </Label>
            <Input
              id="keys"
              value={Array.isArray(inputs.keys) ? inputs.keys.join(", ") : ""}
              onChange={(e) =>
                updateInput(
                  "keys",
                  e.target.value
                    .split(",")
                    .map((k) => k.trim())
                    .filter(Boolean),
                )
              }
              placeholder="id, name, email"
            />
            <p className="text-muted-foreground text-xs">
              Comma-separated list of keys
            </p>
          </div>
        </>
      )}

      {operation === "merge" && (
        <>
          <JsonField
            id="objects"
            label="Objects to Merge"
            value={(inputs.objects as unknown[]) || []}
            onChange={(val) => updateInput("objects", val)}
            placeholder='[{"a": 1}, {"b": 2}]'
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="deep"
              checked={(inputs.deep as boolean) || false}
              onChange={(e) => updateInput("deep", e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="deep" className="font-normal">
              Deep merge (recursively merge nested objects)
            </Label>
          </div>
        </>
      )}
    </div>
  );
};
