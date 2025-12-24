"use client";

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

import type { NodeConfigProps } from "./types";

// Built-in plugins and their operations
const BUILTIN_PLUGINS = {
  "builtin:http": {
    name: "HTTP Request",
    operations: {
      request: {
        name: "Custom Request",
        description: "Make any HTTP request",
        fields: ["url", "method", "headers", "body", "auth"],
      },
      get: {
        name: "GET",
        description: "Fetch data from an API",
        fields: ["url", "headers", "auth"],
      },
      post: {
        name: "POST",
        description: "Send data to an API",
        fields: ["url", "headers", "body", "auth"],
      },
      put: {
        name: "PUT",
        description: "Update data via API",
        fields: ["url", "headers", "body", "auth"],
      },
      delete: {
        name: "DELETE",
        description: "Delete via API",
        fields: ["url", "headers", "auth"],
      },
    },
  },
  "builtin:transform": {
    name: "Transform",
    operations: {
      jsonPath: {
        name: "JSONPath Extract",
        description: "Extract data using JSONPath expression",
        fields: ["data", "path", "first"],
      },
      template: {
        name: "Template",
        description: "Render template with variables",
        fields: ["template", "variables"],
      },
      map: {
        name: "Map Data",
        description: "Map source to target structure",
        fields: ["data", "mapping"],
      },
      pick: {
        name: "Pick Keys",
        description: "Pick specific keys from object",
        fields: ["data", "keys"],
      },
      omit: {
        name: "Omit Keys",
        description: "Omit specific keys from object",
        fields: ["data", "keys"],
      },
      merge: {
        name: "Merge Objects",
        description: "Merge multiple objects",
        fields: ["objects", "deep"],
      },
    },
  },
} as const;

type PluginId = keyof typeof BUILTIN_PLUGINS;
type OperationConfig = {
  name: string;
  description: string;
  fields: readonly string[];
};

export const ActionNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  const pluginId = (data.pluginId as PluginId) || "";
  const operation = (data.operation as string) || "";
  const inputs = (data.inputs as Record<string, unknown>) || {};

  const plugin = pluginId ? BUILTIN_PLUGINS[pluginId] : null;
  const operationConfig: OperationConfig | undefined = plugin
    ? (plugin.operations as Record<string, OperationConfig>)[operation]
    : undefined;

  const updateInput = (key: string, value: unknown) => {
    onChange("inputs", { ...inputs, [key]: value });
  };

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
        <Label htmlFor="pluginId">Plugin</Label>
        <Select
          value={pluginId}
          onValueChange={(value) => {
            onChange("pluginId", value);
            onChange("operation", "");
            onChange("inputs", {});
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a plugin" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(BUILTIN_PLUGINS).map(([id, p]) => (
              <SelectItem key={id} value={id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {plugin && (
        <div className="space-y-2">
          <Label htmlFor="operation">Operation</Label>
          <Select
            value={operation}
            onValueChange={(value) => {
              onChange("operation", value);
              onChange("inputs", {});
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an operation" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(plugin.operations).map(([opId, op]) => (
                <SelectItem key={opId} value={opId}>
                  {op.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {operationConfig && (
            <p className="text-muted-foreground text-xs">
              {operationConfig.description}
            </p>
          )}
        </div>
      )}

      {/* Dynamic fields based on operation */}
      {pluginId === "builtin:http" && operation && (
        <HttpInputs
          operation={operation}
          inputs={inputs}
          updateInput={updateInput}
        />
      )}

      {pluginId === "builtin:transform" && operation && (
        <TransformInputs
          operation={operation}
          inputs={inputs}
          updateInput={updateInput}
        />
      )}

      {/* Fallback for custom plugins */}
      {!pluginId && (
        <>
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
            label="Inputs (JSON)"
            value={inputs}
            onChange={(val) => onChange("inputs", val)}
            placeholder='{"key": "value"}'
          />
        </>
      )}
    </>
  );
};

// HTTP-specific input fields
const HttpInputs = ({
  operation,
  inputs,
  updateInput,
}: {
  operation: string;
  inputs: Record<string, unknown>;
  updateInput: (key: string, value: unknown) => void;
}) => {
  const showBody = ["request", "post", "put", "patch"].includes(operation);
  const showMethod = operation === "request";

  return (
    <div className="space-y-4 border-t pt-4">
      <h4 className="font-medium text-sm">HTTP Settings</h4>

      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          value={(inputs.url as string) || ""}
          onChange={(e) => updateInput("url", e.target.value)}
          placeholder="https://api.example.com/endpoint"
        />
        <p className="text-muted-foreground text-xs">
          Use {"{{variable}}"} for dynamic values
        </p>
      </div>

      {showMethod && (
        <div className="space-y-2">
          <Label htmlFor="method">Method</Label>
          <Select
            value={(inputs.method as string) || "GET"}
            onValueChange={(value) => updateInput("method", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <JsonField
        id="headers"
        label="Headers (optional)"
        value={(inputs.headers as Record<string, string>) || {}}
        onChange={(val) => updateInput("headers", val)}
        placeholder='{"Authorization": "Bearer {{token}}"}'
      />

      {showBody && (
        <JsonField
          id="body"
          label="Body"
          value={(inputs.body as Record<string, unknown>) || {}}
          onChange={(val) => updateInput("body", val)}
          placeholder='{"message": "{{trigger.data}}"}'
        />
      )}

      <div className="space-y-2">
        <Label htmlFor="timeout">Timeout (ms)</Label>
        <Input
          id="timeout"
          type="number"
          value={(inputs.timeout as number) || 30000}
          onChange={(e) => updateInput("timeout", Number(e.target.value))}
          min={1000}
          max={120000}
        />
      </div>
    </div>
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
  return (
    <div className="space-y-4 border-t pt-4">
      <h4 className="font-medium text-sm">Transform Settings</h4>

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
