import { ChevronDown, ChevronRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";

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
import { JsonField } from "../fields/JsonField";
import { DiscordNodeConfig } from "./DiscordNodeConfig";
import { IntegrationNodeConfig } from "./IntegrationNodeConfig";
import { SlackNodeConfig } from "./SlackNodeConfig";

import type { Node } from "reactflow";
import type { NodeConfigProps } from "./types";

type SubConfigProps = {
  data: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  operation: string;
  inputs: Record<string, unknown>;
  updateInput: (key: string, value: unknown) => void;
};

type PluginSubConfigProps = SubConfigProps & {
  pluginId: string;
};

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
        nodeId={props.nodeId}
        allNodes={props.allNodes || []}
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

  // AI nodes
  if (
    pluginId === "builtin:llm" ||
    pluginId === "builtin:code" ||
    pluginId === "builtin:prompt" ||
    pluginId === "builtin:chat" ||
    pluginId === "builtin:summarize" ||
    pluginId === "builtin:classify" ||
    pluginId === "builtin:agent" ||
    pluginId === "builtin:rag" ||
    pluginId === "builtin:vision" ||
    pluginId === "builtin:audio" ||
    pluginId === "builtin:model-registry" ||
    pluginId === "builtin:embedding" ||
    pluginId === "builtin:vector-search"
  ) {
    return (
      <AiNodeConfig
        data={data}
        onChange={onChange}
        operation={operation}
        inputs={inputs}
        updateInput={updateInput}
      />
    );
  }

  // Developer / utility nodes
  if (
    pluginId === "builtin:log" ||
    pluginId === "builtin:assert" ||
    pluginId === "builtin:sleep" ||
    pluginId === "builtin:error" ||
    pluginId === "builtin:parse" ||
    pluginId === "builtin:validate" ||
    pluginId === "builtin:format" ||
    pluginId === "builtin:hash" ||
    pluginId === "builtin:retry" ||
    pluginId === "builtin:timeout" ||
    pluginId === "builtin:wait" ||
    pluginId === "builtin:event" ||
    pluginId === "builtin:aggregate" ||
    pluginId === "builtin:cache"
  ) {
    return (
      <DeveloperNodeConfig
        data={data}
        onChange={onChange}
        operation={operation}
        inputs={inputs}
        updateInput={updateInput}
        pluginId={pluginId}
      />
    );
  }

  // Security nodes
  if (
    pluginId === "builtin:encrypt" ||
    pluginId === "builtin:decrypt" ||
    pluginId === "builtin:sign" ||
    pluginId === "builtin:jwt" ||
    pluginId === "builtin:webhook-verify"
  ) {
    return (
      <SecurityNodeConfig
        data={data}
        onChange={onChange}
        operation={operation}
        inputs={inputs}
        updateInput={updateInput}
        pluginId={pluginId}
      />
    );
  }

  // Storage / messaging nodes
  if (
    pluginId === "builtin:email" ||
    pluginId === "builtin:file" ||
    pluginId === "builtin:queue" ||
    pluginId === "builtin:database"
  ) {
    return (
      <StorageNodeConfig
        data={data}
        onChange={onChange}
        operation={operation}
        inputs={inputs}
        updateInput={updateInput}
        pluginId={pluginId}
      />
    );
  }

  // Built-in integration nodes
  if (
    pluginId === "builtin:spreadsheet" ||
    pluginId === "builtin:google-sheets" ||
    pluginId === "builtin:pdf"
  ) {
    return (
      <IntegrationBuiltinNodeConfig
        data={data}
        onChange={onChange}
        operation={operation}
        inputs={inputs}
        updateInput={updateInput}
        pluginId={pluginId}
      />
    );
  }

  // HTTP extended nodes
  if (
    pluginId === "builtin:webhook-response" ||
    pluginId === "builtin:rate-limit"
  ) {
    return (
      <HttpExtendedConfig
        data={data}
        onChange={onChange}
        operation={operation}
        inputs={inputs}
        updateInput={updateInput}
        pluginId={pluginId}
      />
    );
  }

  // Flow control primitives
  if (
    pluginId === "builtin:stop" ||
    pluginId === "builtin:noop" ||
    pluginId === "builtin:debounce" ||
    pluginId === "builtin:time-window"
  ) {
    return (
      <FlowPrimitivesConfig
        data={data}
        onChange={onChange}
        operation={operation}
        inputs={inputs}
        updateInput={updateInput}
        pluginId={pluginId}
      />
    );
  }

  // Data primitives
  if (pluginId === "builtin:diff" || pluginId === "builtin:change-detector") {
    return (
      <DataPrimitivesConfig
        data={data}
        onChange={onChange}
        operation={operation}
        inputs={inputs}
        updateInput={updateInput}
        pluginId={pluginId}
      />
    );
  }

  // AI primitives
  if (
    pluginId === "builtin:ai-transform" ||
    pluginId === "builtin:ai-guardrails"
  ) {
    return (
      <AiPrimitivesConfig
        data={data}
        onChange={onChange}
        operation={operation}
        inputs={inputs}
        updateInput={updateInput}
        pluginId={pluginId}
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
  nodeId,
  allNodes,
}: {
  data: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  operation: string;
  inputs: Record<string, unknown>;
  updateInput: (key: string, value: unknown) => void;
  nodeId: string;
  allNodes: Node[];
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const urlRef = useRef<HTMLInputElement>(null);

  // Get config as fallback for inputs (templates store defaults in config)
  const config = (data.config as Record<string, unknown>) || {};

  // Determine HTTP method from operation or inputs
  const method =
    operation === "request"
      ? (inputs.method as string) || "GET"
      : operation.toUpperCase();
  const showBody = ["POST", "PUT", "PATCH"].includes(method);

  // Insert variable at cursor position in URL field
  const handleInsertUrlVariable = useCallback(
    (variable: string) => {
      const input = urlRef.current;
      const currentValue = (inputs.url as string) || "";

      if (input) {
        const start = input.selectionStart || 0;
        const end = input.selectionEnd || 0;
        const newValue =
          currentValue.substring(0, start) +
          variable +
          currentValue.substring(end);
        updateInput("url", newValue);

        setTimeout(() => {
          input.focus();
          const newCursorPos = start + variable.length;
          input.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
      } else {
        updateInput("url", currentValue + variable);
      }
    },
    [inputs.url, updateInput],
  );

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
        <div className="flex items-center justify-between">
          <Label htmlFor="url">URL</Label>
          <VariablePicker
            nodes={allNodes}
            currentNodeId={nodeId}
            onSelect={(variable) => handleInsertUrlVariable(variable)}
          />
        </div>
        <Input
          ref={urlRef}
          id="url"
          value={(inputs.url as string) || ""}
          onChange={(e) => updateInput("url", e.target.value)}
          placeholder="https://api.example.com/endpoint"
        />
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
          nodeId={nodeId}
          allNodes={allNodes}
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
            nodeId={nodeId}
            allNodes={allNodes}
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
            <SelectItem value="split">Split into Batches</SelectItem>
            <SelectItem value="filter">Filter Items</SelectItem>
            <SelectItem value="set">Set Variable</SelectItem>
            <SelectItem value="sort">Sort Items</SelectItem>
            <SelectItem value="unique">Unique Items</SelectItem>
            <SelectItem value="reduce">Reduce</SelectItem>
            <SelectItem value="group">Group By</SelectItem>
            <SelectItem value="flatten">Flatten</SelectItem>
            <SelectItem value="chunk">Chunk Array</SelectItem>
            <SelectItem value="zip">Zip Arrays</SelectItem>
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

      {operation === "split" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={(inputs.source as string) || ""}
              onChange={(e) => updateInput("source", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
            <p className="text-muted-foreground text-xs">
              Array or object to split into batches
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="batchSize">Batch Size</Label>
            <Input
              id="batchSize"
              type="number"
              value={(inputs.batchSize as number) || 10}
              onChange={(e) =>
                updateInput(
                  "batchSize",
                  Number.parseInt(e.target.value, 10) || 10,
                )
              }
              min={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="itemVariable">Item Variable</Label>
            <Input
              id="itemVariable"
              value={(inputs.itemVariable as string) || "item"}
              onChange={(e) => updateInput("itemVariable", e.target.value)}
              placeholder="item"
            />
            <p className="text-muted-foreground text-xs">
              Variable name for each item in the batch
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxItems">Max Items</Label>
            <Input
              id="maxItems"
              type="number"
              value={(inputs.maxItems as number) || ""}
              onChange={(e) =>
                updateInput(
                  "maxItems",
                  e.target.value
                    ? Number.parseInt(e.target.value, 10)
                    : undefined,
                )
              }
              placeholder="No limit"
              min={1}
            />
            <p className="text-muted-foreground text-xs">
              Maximum number of items to process
            </p>
          </div>
        </>
      )}

      {operation === "filter" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={(inputs.source as string) || ""}
              onChange={(e) => updateInput("source", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
            <p className="text-muted-foreground text-xs">Array to filter</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="expression">Expression</Label>
            <Input
              id="expression"
              value={(inputs.expression as string) || ""}
              onChange={(e) => updateInput("expression", e.target.value)}
              placeholder="item.status === 'active'"
              className="font-mono"
            />
            <p className="text-muted-foreground text-xs">
              Condition to evaluate for each item
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="itemVariable">Item Variable</Label>
            <Input
              id="itemVariable"
              value={(inputs.itemVariable as string) || "item"}
              onChange={(e) => updateInput("itemVariable", e.target.value)}
              placeholder="item"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="filteredItems"
            />
          </div>
        </>
      )}

      {operation === "set" && (
        <JsonField
          id="variables"
          label="Variables"
          value={(inputs.variables as Record<string, unknown>) || {}}
          onChange={(val) => updateInput("variables", val)}
          placeholder='{"myVar": "{{steps.previous.output}}", "count": 42}'
        />
      )}

      {operation === "sort" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={(inputs.source as string) || ""}
              onChange={(e) => updateInput("source", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
            <p className="text-muted-foreground text-xs">Array to sort</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sortKey">Sort Key</Label>
            <Input
              id="sortKey"
              value={(inputs.sortKey as string) || ""}
              onChange={(e) => updateInput("sortKey", e.target.value)}
              placeholder="name"
            />
            <p className="text-muted-foreground text-xs">Property to sort by</p>
          </div>
          <div className="space-y-2">
            <Label>Direction</Label>
            <Select
              value={(inputs.direction as string) || "asc"}
              onValueChange={(value) => updateInput("direction", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="sortedItems"
            />
          </div>
        </>
      )}

      {operation === "unique" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={(inputs.source as string) || ""}
              onChange={(e) => updateInput("source", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
            <p className="text-muted-foreground text-xs">
              Array to deduplicate
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="keyField">Key Field</Label>
            <Input
              id="keyField"
              value={(inputs.keyField as string) || ""}
              onChange={(e) => updateInput("keyField", e.target.value)}
              placeholder="id"
            />
            <p className="text-muted-foreground text-xs">
              Property to determine uniqueness
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="uniqueItems"
            />
          </div>
        </>
      )}

      {operation === "reduce" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={(inputs.source as string) || ""}
              onChange={(e) => updateInput("source", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
            <p className="text-muted-foreground text-xs">Array to reduce</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="expression">Expression</Label>
            <Input
              id="expression"
              value={(inputs.expression as string) || ""}
              onChange={(e) => updateInput("expression", e.target.value)}
              placeholder="acc + item.value"
              className="font-mono"
            />
            <p className="text-muted-foreground text-xs">
              Reducer expression using `acc` and `item`
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="initialValue">Initial Value</Label>
            <Input
              id="initialValue"
              value={(inputs.initialValue as string) || ""}
              onChange={(e) => updateInput("initialValue", e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accumulatorVariable">Accumulator Variable</Label>
            <Input
              id="accumulatorVariable"
              value={(inputs.accumulatorVariable as string) || "acc"}
              onChange={(e) =>
                updateInput("accumulatorVariable", e.target.value)
              }
              placeholder="acc"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="total"
            />
          </div>
        </>
      )}

      {operation === "group" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={(inputs.source as string) || ""}
              onChange={(e) => updateInput("source", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
            <p className="text-muted-foreground text-xs">Array to group</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="keyExpression">Key Expression</Label>
            <Input
              id="keyExpression"
              value={(inputs.keyExpression as string) || ""}
              onChange={(e) => updateInput("keyExpression", e.target.value)}
              placeholder="item.category"
              className="font-mono"
            />
            <p className="text-muted-foreground text-xs">
              Expression to compute group key for each item
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="itemVariable">Item Variable</Label>
            <Input
              id="itemVariable"
              value={(inputs.itemVariable as string) || "item"}
              onChange={(e) => updateInput("itemVariable", e.target.value)}
              placeholder="item"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="grouped"
            />
          </div>
        </>
      )}

      {operation === "flatten" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={(inputs.source as string) || ""}
              onChange={(e) => updateInput("source", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
            <p className="text-muted-foreground text-xs">
              Nested array to flatten
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="depth">Depth</Label>
            <Input
              id="depth"
              type="number"
              value={(inputs.depth as number) || 1}
              onChange={(e) =>
                updateInput("depth", Number.parseInt(e.target.value, 10) || 1)
              }
              min={1}
            />
            <p className="text-muted-foreground text-xs">
              How many levels to flatten
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="flattened"
            />
          </div>
        </>
      )}

      {operation === "chunk" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={(inputs.source as string) || ""}
              onChange={(e) => updateInput("source", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
            <p className="text-muted-foreground text-xs">
              Array to split into chunks
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="chunkSize">Chunk Size</Label>
            <Input
              id="chunkSize"
              type="number"
              value={(inputs.chunkSize as number) || 10}
              onChange={(e) =>
                updateInput(
                  "chunkSize",
                  Number.parseInt(e.target.value, 10) || 10,
                )
              }
              min={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="chunks"
            />
          </div>
        </>
      )}

      {operation === "zip" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="sources">Sources</Label>
            <Input
              id="sources"
              value={(inputs.sources as string) || ""}
              onChange={(e) => updateInput("sources", e.target.value)}
              placeholder="{{steps.a.output}}, {{steps.b.output}}"
            />
            <p className="text-muted-foreground text-xs">
              Comma-separated references to arrays to zip together
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="zipped"
            />
          </div>
        </>
      )}
    </div>
  );
};

// AI node config (LLM, code, prompt, chat, summarize, classify, agent, RAG, vision, audio, model-registry, embedding, vector-search)
const AiNodeConfig = ({
  data,
  onChange,
  inputs,
  updateInput,
}: SubConfigProps) => {
  const pluginId = (data.pluginId as string) || "";

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this AI step do?"
          rows={2}
        />
      </div>

      {pluginId === "builtin:llm" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="serverId">Server ID</Label>
            <Input
              id="serverId"
              value={(inputs.serverId as string) || ""}
              onChange={(e) => updateInput("serverId", e.target.value)}
              placeholder="default"
            />
            <p className="text-muted-foreground text-xs">
              LLM server to use for inference
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={(inputs.model as string) || ""}
              onChange={(e) => updateInput("model", e.target.value)}
              placeholder="gpt-4o, claude-sonnet-4-20250514, etc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="systemPrompt">System Prompt</Label>
            <Textarea
              id="systemPrompt"
              value={(inputs.systemPrompt as string) || ""}
              onChange={(e) => updateInput("systemPrompt", e.target.value)}
              placeholder="You are a helpful assistant..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="userPrompt">User Prompt</Label>
            <Textarea
              id="userPrompt"
              value={(inputs.userPrompt as string) || ""}
              onChange={(e) => updateInput("userPrompt", e.target.value)}
              placeholder="{{trigger.data.message}}"
              rows={3}
            />
            <p className="text-muted-foreground text-xs">
              Supports template variables
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="temperature">Temperature</Label>
              <Input
                id="temperature"
                type="number"
                value={(inputs.temperature as number) ?? 0.7}
                onChange={(e) =>
                  updateInput("temperature", Number.parseFloat(e.target.value))
                }
                min={0}
                max={2}
                step={0.1}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="maxTokens">Max Tokens</Label>
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
                placeholder="Auto"
                min={1}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="llmResponse"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:code" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="serverId">Server ID</Label>
            <Input
              id="serverId"
              value={(inputs.serverId as string) || ""}
              onChange={(e) => updateInput("serverId", e.target.value)}
              placeholder="default"
            />
            <p className="text-muted-foreground text-xs">
              Code execution server
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="source">Source Code</Label>
            <Textarea
              id="source"
              value={(inputs.source as string) || ""}
              onChange={(e) => updateInput("source", e.target.value)}
              placeholder="// Write your code here..."
              rows={8}
              className="font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dependencies">Dependencies</Label>
            <Input
              id="dependencies"
              value={(inputs.dependencies as string) || ""}
              onChange={(e) => updateInput("dependencies", e.target.value)}
              placeholder="lodash, axios"
            />
            <p className="text-muted-foreground text-xs">
              Comma-separated package names
            </p>
          </div>
          <JsonField
            id="inputMapping"
            label="Input Mapping"
            value={(inputs.inputMapping as Record<string, unknown>) || {}}
            onChange={(val) => updateInput("inputMapping", val)}
            placeholder='{"data": "{{trigger.data}}"}'
          />
          <JsonField
            id="outputMapping"
            label="Output Mapping"
            value={(inputs.outputMapping as Record<string, unknown>) || {}}
            onChange={(val) => updateInput("outputMapping", val)}
            placeholder='{"result": "$.output"}'
          />
        </>
      )}

      {pluginId === "builtin:prompt" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={(inputs.model as string) || ""}
              onChange={(e) => updateInput("model", e.target.value)}
              placeholder="gpt-4o"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="template">Template</Label>
            <Textarea
              id="template"
              value={(inputs.template as string) || ""}
              onChange={(e) => updateInput("template", e.target.value)}
              placeholder="Summarize the following: {{input}}"
              rows={4}
            />
            <p className="text-muted-foreground text-xs">
              Prompt template with variable placeholders
            </p>
          </div>
          <JsonField
            id="variables"
            label="Variables"
            value={(inputs.variables as Record<string, unknown>) || {}}
            onChange={(val) => updateInput("variables", val)}
            placeholder='{"input": "{{trigger.data}}"}'
          />
          <div className="space-y-2">
            <Label htmlFor="temperature">Temperature</Label>
            <Input
              id="temperature"
              type="number"
              value={(inputs.temperature as number) ?? 0.7}
              onChange={(e) =>
                updateInput("temperature", Number.parseFloat(e.target.value))
              }
              min={0}
              max={2}
              step={0.1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="promptResult"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:chat" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={(inputs.model as string) || ""}
              onChange={(e) => updateInput("model", e.target.value)}
              placeholder="gpt-4o"
            />
          </div>
          <JsonField
            id="messages"
            label="Messages"
            value={(inputs.messages as unknown[]) || []}
            onChange={(val) => updateInput("messages", val)}
            placeholder='[{"role": "user", "content": "Hello"}]'
          />
          <div className="space-y-2">
            <Label htmlFor="temperature">Temperature</Label>
            <Input
              id="temperature"
              type="number"
              value={(inputs.temperature as number) ?? 0.7}
              onChange={(e) =>
                updateInput("temperature", Number.parseFloat(e.target.value))
              }
              min={0}
              max={2}
              step={0.1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="chatResponse"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:summarize" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={(inputs.model as string) || ""}
              onChange={(e) => updateInput("model", e.target.value)}
              placeholder="gpt-4o"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={(inputs.source as string) || ""}
              onChange={(e) => updateInput("source", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
            <p className="text-muted-foreground text-xs">
              Text or data to summarize
            </p>
          </div>
          <div className="space-y-2">
            <Label>Style</Label>
            <Select
              value={(inputs.style as string) || "brief"}
              onValueChange={(value) => updateInput("style", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brief">Brief</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
                <SelectItem value="bullets">Bullet Points</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="summary"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:classify" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={(inputs.model as string) || ""}
              onChange={(e) => updateInput("model", e.target.value)}
              placeholder="gpt-4o"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={(inputs.source as string) || ""}
              onChange={(e) => updateInput("source", e.target.value)}
              placeholder="{{trigger.data.text}}"
            />
            <p className="text-muted-foreground text-xs">Text to classify</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="categories">Categories</Label>
            <Input
              id="categories"
              value={(inputs.categories as string) || ""}
              onChange={(e) => updateInput("categories", e.target.value)}
              placeholder="positive, negative, neutral"
            />
            <p className="text-muted-foreground text-xs">
              Comma-separated list of categories
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="classification"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:agent" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="serverId">Server ID</Label>
            <Input
              id="serverId"
              value={(inputs.serverId as string) || ""}
              onChange={(e) => updateInput("serverId", e.target.value)}
              placeholder="default"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="goal">Goal</Label>
            <Textarea
              id="goal"
              value={(inputs.goal as string) || ""}
              onChange={(e) => updateInput("goal", e.target.value)}
              placeholder="Research the topic and produce a summary..."
              rows={4}
            />
            <p className="text-muted-foreground text-xs">
              Objective for the agent to accomplish
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tools">Tools</Label>
            <Input
              id="tools"
              value={(inputs.tools as string) || ""}
              onChange={(e) => updateInput("tools", e.target.value)}
              placeholder="web_search, calculator, code_exec"
            />
            <p className="text-muted-foreground text-xs">
              Comma-separated tool names the agent can use
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxIterations">Max Iterations</Label>
            <Input
              id="maxIterations"
              type="number"
              value={(inputs.maxIterations as number) || 10}
              onChange={(e) =>
                updateInput(
                  "maxIterations",
                  Number.parseInt(e.target.value, 10) || 10,
                )
              }
              min={1}
              max={100}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="agentResult"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:rag" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="serverId">Server ID</Label>
            <Input
              id="serverId"
              value={(inputs.serverId as string) || ""}
              onChange={(e) => updateInput("serverId", e.target.value)}
              placeholder="default"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="query">Query</Label>
            <Input
              id="query"
              value={(inputs.query as string) || ""}
              onChange={(e) => updateInput("query", e.target.value)}
              placeholder="{{trigger.data.question}}"
            />
            <p className="text-muted-foreground text-xs">
              Search query for retrieval
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="collection">Collection</Label>
            <Input
              id="collection"
              value={(inputs.collection as string) || ""}
              onChange={(e) => updateInput("collection", e.target.value)}
              placeholder="documents"
            />
            <p className="text-muted-foreground text-xs">
              Vector store collection name
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="topK">Top K</Label>
            <Input
              id="topK"
              type="number"
              value={(inputs.topK as number) || 5}
              onChange={(e) =>
                updateInput("topK", Number.parseInt(e.target.value, 10) || 5)
              }
              min={1}
              max={100}
            />
            <p className="text-muted-foreground text-xs">
              Number of results to retrieve
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="ragResults"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:vision" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="serverId">Server ID</Label>
            <Input
              id="serverId"
              value={(inputs.serverId as string) || ""}
              onChange={(e) => updateInput("serverId", e.target.value)}
              placeholder="default"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageInput">Image Input</Label>
            <Input
              id="imageInput"
              value={(inputs.imageInput as string) || ""}
              onChange={(e) => updateInput("imageInput", e.target.value)}
              placeholder="{{trigger.data.imageUrl}}"
            />
            <p className="text-muted-foreground text-xs">
              URL or base64-encoded image
            </p>
          </div>
          <div className="space-y-2">
            <Label>Task</Label>
            <Select
              value={(inputs.task as string) || "describe"}
              onValueChange={(value) => updateInput("task", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="describe">Describe</SelectItem>
                <SelectItem value="ocr">OCR (Extract Text)</SelectItem>
                <SelectItem value="detect">Detect Objects</SelectItem>
                <SelectItem value="classify">Classify</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              value={(inputs.prompt as string) || ""}
              onChange={(e) => updateInput("prompt", e.target.value)}
              placeholder="Describe what you see in this image..."
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="visionResult"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:audio" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="serverId">Server ID</Label>
            <Input
              id="serverId"
              value={(inputs.serverId as string) || ""}
              onChange={(e) => updateInput("serverId", e.target.value)}
              placeholder="default"
            />
          </div>
          <div className="space-y-2">
            <Label>Task</Label>
            <Select
              value={(inputs.task as string) || "transcribe"}
              onValueChange={(value) => updateInput("task", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transcribe">
                  Transcribe (Speech to Text)
                </SelectItem>
                <SelectItem value="synthesize">
                  Synthesize (Text to Speech)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="input">Input</Label>
            <Input
              id="input"
              value={(inputs.input as string) || ""}
              onChange={(e) => updateInput("input", e.target.value)}
              placeholder={
                (inputs.task as string) === "synthesize"
                  ? "Text to convert to speech"
                  : "Audio URL or reference"
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Input
              id="language"
              value={(inputs.language as string) || ""}
              onChange={(e) => updateInput("language", e.target.value)}
              placeholder="en"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="voice">Voice</Label>
            <Input
              id="voice"
              value={(inputs.voice as string) || ""}
              onChange={(e) => updateInput("voice", e.target.value)}
              placeholder="alloy"
            />
            <p className="text-muted-foreground text-xs">
              Voice ID for text-to-speech
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="audioResult"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:model-registry" && (
        <>
          <div className="space-y-2">
            <Label>Provider</Label>
            <Select
              value={(inputs.provider as string) || ""}
              onValueChange={(value) => updateInput("provider", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="anthropic">Anthropic</SelectItem>
                <SelectItem value="google">Google</SelectItem>
                <SelectItem value="azure">Azure OpenAI</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="connectionId">Connection ID</Label>
            <Input
              id="connectionId"
              value={(inputs.connectionId as string) || ""}
              onChange={(e) => updateInput("connectionId", e.target.value)}
              placeholder="my-openai-connection"
            />
            <p className="text-muted-foreground text-xs">
              Reference to a configured connection
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={(inputs.model as string) || ""}
              onChange={(e) => updateInput("model", e.target.value)}
              placeholder="gpt-4o"
            />
          </div>
          <div className="space-y-2">
            <Label>Operation</Label>
            <Select
              value={(inputs.operation as string) || "complete"}
              onValueChange={(value) => updateInput("operation", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="complete">Completion</SelectItem>
                <SelectItem value="chat">Chat</SelectItem>
                <SelectItem value="embed">Embed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="messagesOrPrompt">Messages / Prompt</Label>
            <Textarea
              id="messagesOrPrompt"
              value={(inputs.messagesOrPrompt as string) || ""}
              onChange={(e) => updateInput("messagesOrPrompt", e.target.value)}
              placeholder="Enter prompt text or JSON messages array"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="temperature">Temperature</Label>
            <Input
              id="temperature"
              type="number"
              value={(inputs.temperature as number) ?? 0.7}
              onChange={(e) =>
                updateInput("temperature", Number.parseFloat(e.target.value))
              }
              min={0}
              max={2}
              step={0.1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="modelResult"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:embedding" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="serverId">Server ID</Label>
            <Input
              id="serverId"
              value={(inputs.serverId as string) || ""}
              onChange={(e) => updateInput("serverId", e.target.value)}
              placeholder="default"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={(inputs.model as string) || ""}
              onChange={(e) => updateInput("model", e.target.value)}
              placeholder="text-embedding-3-small"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="input">Input</Label>
            <Textarea
              id="input"
              value={(inputs.input as string) || ""}
              onChange={(e) => updateInput("input", e.target.value)}
              placeholder="Text to embed or {{steps.previous.output}}"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="embedding"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:vector-search" && (
        <>
          <div className="space-y-2">
            <Label>Provider</Label>
            <Select
              value={(inputs.provider as string) || ""}
              onValueChange={(value) => updateInput("provider", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pinecone">Pinecone</SelectItem>
                <SelectItem value="qdrant">Qdrant</SelectItem>
                <SelectItem value="weaviate">Weaviate</SelectItem>
                <SelectItem value="pgvector">pgvector</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="indexName">Index Name</Label>
            <Input
              id="indexName"
              value={(inputs.indexName as string) || ""}
              onChange={(e) => updateInput("indexName", e.target.value)}
              placeholder="my-index"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="query">Query</Label>
            <Input
              id="query"
              value={(inputs.query as string) || ""}
              onChange={(e) => updateInput("query", e.target.value)}
              placeholder="{{steps.embedding.output}}"
            />
            <p className="text-muted-foreground text-xs">
              Query vector or text to search
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="topK">Top K</Label>
              <Input
                id="topK"
                type="number"
                value={(inputs.topK as number) || 10}
                onChange={(e) =>
                  updateInput("topK", Number.parseInt(e.target.value, 10) || 10)
                }
                min={1}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="minScore">Min Score</Label>
              <Input
                id="minScore"
                type="number"
                value={(inputs.minScore as number) ?? 0}
                onChange={(e) =>
                  updateInput("minScore", Number.parseFloat(e.target.value))
                }
                min={0}
                max={1}
                step={0.05}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="searchResults"
            />
          </div>
        </>
      )}
    </>
  );
};

// Developer / utility node config
const DeveloperNodeConfig = ({
  data,
  onChange,
  inputs,
  updateInput,
  pluginId,
}: PluginSubConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this step do?"
          rows={2}
        />
      </div>

      {pluginId === "builtin:log" && (
        <>
          <div className="space-y-2">
            <Label>Level</Label>
            <Select
              value={(inputs.level as string) || "info"}
              onValueChange={(value) => updateInput("level", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="debug">Debug</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warn">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Input
              id="message"
              value={(inputs.message as string) || ""}
              onChange={(e) => updateInput("message", e.target.value)}
              placeholder="Processing order {{trigger.data.orderId}}"
            />
            <p className="text-muted-foreground text-xs">
              Supports template variables
            </p>
          </div>
          <JsonField
            id="logData"
            label="Data"
            value={(inputs.data as Record<string, unknown>) || {}}
            onChange={(val) => updateInput("data", val)}
            placeholder='{"orderId": "{{trigger.data.orderId}}"}'
          />
        </>
      )}

      {pluginId === "builtin:assert" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="expression">Expression</Label>
            <Input
              id="expression"
              value={(inputs.expression as string) || ""}
              onChange={(e) => updateInput("expression", e.target.value)}
              placeholder="steps.previous.output.status === 200"
              className="font-mono"
            />
            <p className="text-muted-foreground text-xs">
              Condition that must be true
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="failureMessage">Failure Message</Label>
            <Input
              id="failureMessage"
              value={(inputs.failureMessage as string) || ""}
              onChange={(e) => updateInput("failureMessage", e.target.value)}
              placeholder="Expected status 200 but got something else"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="softFail"
              checked={(inputs.softFail as boolean) || false}
              onChange={(e) => updateInput("softFail", e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="softFail" className="font-normal">
              Soft fail (continue workflow on assertion failure)
            </Label>
          </div>
        </>
      )}

      {pluginId === "builtin:sleep" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              type="number"
              value={(inputs.duration as number) || 1}
              onChange={(e) =>
                updateInput(
                  "duration",
                  Number.parseInt(e.target.value, 10) || 1,
                )
              }
              min={0}
            />
          </div>
          <div className="space-y-2">
            <Label>Unit</Label>
            <Select
              value={(inputs.unit as string) || "seconds"}
              onValueChange={(value) => updateInput("unit", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ms">Milliseconds</SelectItem>
                <SelectItem value="seconds">Seconds</SelectItem>
                <SelectItem value="minutes">Minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {pluginId === "builtin:error" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="errorType">Error Type</Label>
            <Input
              id="errorType"
              value={(inputs.errorType as string) || ""}
              onChange={(e) => updateInput("errorType", e.target.value)}
              placeholder="ValidationError"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Input
              id="message"
              value={(inputs.message as string) || ""}
              onChange={(e) => updateInput("message", e.target.value)}
              placeholder="Invalid input: missing required field"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="fatal"
              checked={(inputs.fatal as boolean) ?? true}
              onChange={(e) => updateInput("fatal", e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="fatal" className="font-normal">
              Fatal (stop entire workflow)
            </Label>
          </div>
        </>
      )}

      {pluginId === "builtin:parse" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={(inputs.source as string) || ""}
              onChange={(e) => updateInput("source", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
            <p className="text-muted-foreground text-xs">
              Raw string data to parse
            </p>
          </div>
          <div className="space-y-2">
            <Label>Format</Label>
            <Select
              value={(inputs.format as string) || "json"}
              onValueChange={(value) => updateInput("format", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="xml">XML</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="yaml">YAML</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="parsed"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:validate" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={(inputs.source as string) || ""}
              onChange={(e) => updateInput("source", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
            <p className="text-muted-foreground text-xs">Data to validate</p>
          </div>
          <JsonField
            id="schema"
            label="Schema"
            value={(inputs.schema as Record<string, unknown>) || {}}
            onChange={(val) => updateInput("schema", val)}
            placeholder='{"type": "object", "required": ["name", "email"]}'
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="strict"
              checked={(inputs.strict as boolean) || false}
              onChange={(e) => updateInput("strict", e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="strict" className="font-normal">
              Strict (reject additional properties)
            </Label>
          </div>
        </>
      )}

      {pluginId === "builtin:format" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={(inputs.source as string) || ""}
              onChange={(e) => updateInput("source", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              value={(inputs.type as string) || "date"}
              onValueChange={(value) => updateInput("type", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="currency">Currency</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="bytes">Bytes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="locale">Locale</Label>
            <Input
              id="locale"
              value={(inputs.locale as string) || ""}
              onChange={(e) => updateInput("locale", e.target.value)}
              placeholder="en-US"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pattern">Pattern</Label>
            <Input
              id="pattern"
              value={(inputs.pattern as string) || ""}
              onChange={(e) => updateInput("pattern", e.target.value)}
              placeholder="YYYY-MM-DD or #,##0.00"
            />
            <p className="text-muted-foreground text-xs">
              Format pattern (varies by type)
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="formatted"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:hash" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={(inputs.source as string) || ""}
              onChange={(e) => updateInput("source", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
          </div>
          <div className="space-y-2">
            <Label>Algorithm</Label>
            <Select
              value={(inputs.algorithm as string) || "sha256"}
              onValueChange={(value) => updateInput("algorithm", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="md5">MD5</SelectItem>
                <SelectItem value="sha1">SHA-1</SelectItem>
                <SelectItem value="sha256">SHA-256</SelectItem>
                <SelectItem value="sha512">SHA-512</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Encoding</Label>
            <Select
              value={(inputs.encoding as string) || "hex"}
              onValueChange={(value) => updateInput("encoding", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hex">Hex</SelectItem>
                <SelectItem value="base64">Base64</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="hash"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:retry" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="stepId">Step ID</Label>
            <Input
              id="stepId"
              value={(inputs.stepId as string) || ""}
              onChange={(e) => updateInput("stepId", e.target.value)}
              placeholder="step_to_retry"
            />
            <p className="text-muted-foreground text-xs">
              ID of the step to retry on failure
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxAttempts">Max Attempts</Label>
            <Input
              id="maxAttempts"
              type="number"
              value={(inputs.maxAttempts as number) || 3}
              onChange={(e) =>
                updateInput(
                  "maxAttempts",
                  Number.parseInt(e.target.value, 10) || 3,
                )
              }
              min={1}
              max={50}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="initialDelay">Initial Delay (ms)</Label>
            <Input
              id="initialDelay"
              type="number"
              value={(inputs.initialDelay as number) || 1000}
              onChange={(e) =>
                updateInput(
                  "initialDelay",
                  Number.parseInt(e.target.value, 10) || 1000,
                )
              }
              min={0}
            />
          </div>
          <div className="space-y-2">
            <Label>Backoff</Label>
            <Select
              value={(inputs.backoff as string) || "exponential"}
              onValueChange={(value) => updateInput("backoff", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixed</SelectItem>
                <SelectItem value="linear">Linear</SelectItem>
                <SelectItem value="exponential">Exponential</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {pluginId === "builtin:timeout" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="stepId">Step ID</Label>
            <Input
              id="stepId"
              value={(inputs.stepId as string) || ""}
              onChange={(e) => updateInput("stepId", e.target.value)}
              placeholder="step_to_timeout"
            />
            <p className="text-muted-foreground text-xs">
              ID of the step to apply timeout to
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (ms)</Label>
            <Input
              id="duration"
              type="number"
              value={(inputs.duration as number) || 30000}
              onChange={(e) =>
                updateInput(
                  "duration",
                  Number.parseInt(e.target.value, 10) || 30000,
                )
              }
              min={100}
            />
          </div>
          <div className="space-y-2">
            <Label>On Timeout</Label>
            <Select
              value={(inputs.onTimeout as string) || "error"}
              onValueChange={(value) => updateInput("onTimeout", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="error">Throw Error</SelectItem>
                <SelectItem value="continue">Continue</SelectItem>
                <SelectItem value="fallback">Fallback</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {pluginId === "builtin:wait" && (
        <>
          <div className="space-y-2">
            <Label>Resume On</Label>
            <Select
              value={(inputs.resumeOn as string) || "webhook"}
              onValueChange={(value) => updateInput("resumeOn", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="webhook">Webhook</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="timeout">Timeout</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventName">Event Name</Label>
            <Input
              id="eventName"
              value={(inputs.eventName as string) || ""}
              onChange={(e) => updateInput("eventName", e.target.value)}
              placeholder="payment.completed"
            />
            <p className="text-muted-foreground text-xs">
              Event to wait for (when using event mode)
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeout">Timeout (ms)</Label>
            <Input
              id="timeout"
              type="number"
              value={(inputs.timeout as number) || 86400000}
              onChange={(e) =>
                updateInput(
                  "timeout",
                  Number.parseInt(e.target.value, 10) || 86400000,
                )
              }
              min={0}
            />
            <p className="text-muted-foreground text-xs">
              Maximum wait time before timing out
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="resumeData"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:event" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="eventName">Event Name</Label>
            <Input
              id="eventName"
              value={(inputs.eventName as string) || ""}
              onChange={(e) => updateInput("eventName", e.target.value)}
              placeholder="order.processed"
            />
            <p className="text-muted-foreground text-xs">
              Name of the event to emit
            </p>
          </div>
          <JsonField
            id="payload"
            label="Payload"
            value={(inputs.payload as Record<string, unknown>) || {}}
            onChange={(val) => updateInput("payload", val)}
            placeholder='{"orderId": "{{trigger.data.orderId}}"}'
          />
        </>
      )}

      {pluginId === "builtin:aggregate" && (
        <>
          <div className="space-y-2">
            <Label>Mode</Label>
            <Select
              value={(inputs.mode as string) || "collect"}
              onValueChange={(value) => updateInput("mode", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="collect">Collect</SelectItem>
                <SelectItem value="merge">Merge</SelectItem>
                <SelectItem value="concat">Concat</SelectItem>
                <SelectItem value="sum">Sum</SelectItem>
                <SelectItem value="first">First</SelectItem>
                <SelectItem value="last">Last</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={(inputs.source as string) || ""}
              onChange={(e) => updateInput("source", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="groupBy">Group By</Label>
            <Input
              id="groupBy"
              value={(inputs.groupBy as string) || ""}
              onChange={(e) => updateInput("groupBy", e.target.value)}
              placeholder="category"
            />
            <p className="text-muted-foreground text-xs">
              Optional grouping key
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="aggregated"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:cache" && (
        <>
          <div className="space-y-2">
            <Label>Operation</Label>
            <Select
              value={(inputs.operation as string) || "get"}
              onValueChange={(value) => updateInput("operation", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="get">Get</SelectItem>
                <SelectItem value="set">Set</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="getOrSet">Get or Set</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="key">Key</Label>
            <Input
              id="key"
              value={(inputs.key as string) || ""}
              onChange={(e) => updateInput("key", e.target.value)}
              placeholder="user:{{trigger.data.userId}}"
            />
          </div>
          {((inputs.operation as string) === "set" ||
            (inputs.operation as string) === "getOrSet") && (
            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                value={(inputs.value as string) || ""}
                onChange={(e) => updateInput("value", e.target.value)}
                placeholder="{{steps.previous.output}}"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="ttl">TTL (seconds)</Label>
            <Input
              id="ttl"
              type="number"
              value={(inputs.ttl as number) || ""}
              onChange={(e) =>
                updateInput(
                  "ttl",
                  e.target.value
                    ? Number.parseInt(e.target.value, 10)
                    : undefined,
                )
              }
              placeholder="3600"
              min={0}
            />
            <p className="text-muted-foreground text-xs">
              Time-to-live in seconds (empty for no expiry)
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="cachedValue"
            />
          </div>
        </>
      )}
    </>
  );
};

// Security node config (encrypt, decrypt, sign, JWT, webhook verify)
const SecurityNodeConfig = ({
  data,
  onChange,
  inputs,
  updateInput,
  pluginId,
}: PluginSubConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this security step do?"
          rows={2}
        />
      </div>

      {pluginId === "builtin:encrypt" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="input">Input</Label>
            <Input
              id="input"
              value={(inputs.input as string) || ""}
              onChange={(e) => updateInput("input", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
            <p className="text-muted-foreground text-xs">Data to encrypt</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="keyReference">Key Reference</Label>
            <Input
              id="keyReference"
              value={(inputs.keyReference as string) || ""}
              onChange={(e) => updateInput("keyReference", e.target.value)}
              placeholder="{{secrets.ENCRYPTION_KEY}}"
            />
            <p className="text-muted-foreground text-xs">
              Reference to the encryption key
            </p>
          </div>
          <div className="space-y-2">
            <Label>Algorithm</Label>
            <Select
              value={(inputs.algorithm as string) || "AES-GCM"}
              onValueChange={(value) => updateInput("algorithm", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AES-GCM">AES-GCM</SelectItem>
                <SelectItem value="AES-CBC">AES-CBC</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="encrypted"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:decrypt" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="input">Input</Label>
            <Input
              id="input"
              value={(inputs.input as string) || ""}
              onChange={(e) => updateInput("input", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
            <p className="text-muted-foreground text-xs">
              Encrypted data to decrypt
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="keyReference">Key Reference</Label>
            <Input
              id="keyReference"
              value={(inputs.keyReference as string) || ""}
              onChange={(e) => updateInput("keyReference", e.target.value)}
              placeholder="{{secrets.ENCRYPTION_KEY}}"
            />
          </div>
          <div className="space-y-2">
            <Label>Algorithm</Label>
            <Select
              value={(inputs.algorithm as string) || "AES-GCM"}
              onValueChange={(value) => updateInput("algorithm", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AES-GCM">AES-GCM</SelectItem>
                <SelectItem value="AES-CBC">AES-CBC</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="decrypted"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:sign" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="input">Input</Label>
            <Input
              id="input"
              value={(inputs.input as string) || ""}
              onChange={(e) => updateInput("input", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
            <p className="text-muted-foreground text-xs">Data to sign</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="keyReference">Key Reference</Label>
            <Input
              id="keyReference"
              value={(inputs.keyReference as string) || ""}
              onChange={(e) => updateInput("keyReference", e.target.value)}
              placeholder="{{secrets.SIGNING_KEY}}"
            />
          </div>
          <div className="space-y-2">
            <Label>Algorithm</Label>
            <Select
              value={(inputs.algorithm as string) || "SHA-256"}
              onValueChange={(value) => updateInput("algorithm", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SHA-256">SHA-256</SelectItem>
                <SelectItem value="SHA-384">SHA-384</SelectItem>
                <SelectItem value="SHA-512">SHA-512</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Encoding</Label>
            <Select
              value={(inputs.encoding as string) || "hex"}
              onValueChange={(value) => updateInput("encoding", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hex">Hex</SelectItem>
                <SelectItem value="base64">Base64</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="signature"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:jwt" && (
        <>
          <div className="space-y-2">
            <Label>Operation</Label>
            <Select
              value={(inputs.operation as string) || "create"}
              onValueChange={(value) => updateInput("operation", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="verify">Verify</SelectItem>
                <SelectItem value="decode">Decode</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="input">Input</Label>
            <Input
              id="input"
              value={(inputs.input as string) || ""}
              onChange={(e) => updateInput("input", e.target.value)}
              placeholder={
                (inputs.operation as string) === "create"
                  ? '{"sub": "user123"}'
                  : "eyJhbGciOiJIUzI1N..."
              }
            />
            <p className="text-muted-foreground text-xs">
              {(inputs.operation as string) === "create"
                ? "Payload for the JWT"
                : "JWT token to process"}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="secret">Secret</Label>
            <Input
              id="secret"
              value={(inputs.secret as string) || ""}
              onChange={(e) => updateInput("secret", e.target.value)}
              placeholder="{{secrets.JWT_SECRET}}"
            />
          </div>
          <div className="space-y-2">
            <Label>Algorithm</Label>
            <Select
              value={(inputs.algorithm as string) || "HS256"}
              onValueChange={(value) => updateInput("algorithm", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HS256">HS256</SelectItem>
                <SelectItem value="HS384">HS384</SelectItem>
                <SelectItem value="HS512">HS512</SelectItem>
                <SelectItem value="RS256">RS256</SelectItem>
                <SelectItem value="RS512">RS512</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {(inputs.operation as string) === "create" && (
            <div className="space-y-2">
              <Label htmlFor="expiresIn">Expires In</Label>
              <Input
                id="expiresIn"
                value={(inputs.expiresIn as string) || ""}
                onChange={(e) => updateInput("expiresIn", e.target.value)}
                placeholder="1h, 7d, 30m"
              />
              <p className="text-muted-foreground text-xs">
                Token expiration (e.g., 1h, 7d, 30m)
              </p>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="jwtResult"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:webhook-verify" && (
        <>
          <div className="space-y-2">
            <Label>Provider</Label>
            <Select
              value={(inputs.provider as string) || ""}
              onValueChange={(value) => updateInput("provider", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stripe">Stripe</SelectItem>
                <SelectItem value="github">GitHub</SelectItem>
                <SelectItem value="shopify">Shopify</SelectItem>
                <SelectItem value="slack">Slack</SelectItem>
                <SelectItem value="custom">Custom (HMAC)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="payload">Payload</Label>
            <Input
              id="payload"
              value={(inputs.payload as string) || ""}
              onChange={(e) => updateInput("payload", e.target.value)}
              placeholder="{{trigger.body}}"
            />
            <p className="text-muted-foreground text-xs">
              Raw request body to verify
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="signature">Signature</Label>
            <Input
              id="signature"
              value={(inputs.signature as string) || ""}
              onChange={(e) => updateInput("signature", e.target.value)}
              placeholder="{{trigger.headers.x-signature}}"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="secret">Secret</Label>
            <Input
              id="secret"
              value={(inputs.secret as string) || ""}
              onChange={(e) => updateInput("secret", e.target.value)}
              placeholder="{{secrets.WEBHOOK_SECRET}}"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="isValid"
            />
          </div>
        </>
      )}
    </>
  );
};

// Storage / messaging node config (email, file, queue, database)
const StorageNodeConfig = ({
  data,
  onChange,
  inputs,
  updateInput,
  pluginId,
}: PluginSubConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this step do?"
          rows={2}
        />
      </div>

      {pluginId === "builtin:email" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              value={(inputs.to as string) || ""}
              onChange={(e) => updateInput("to", e.target.value)}
              placeholder="user@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={(inputs.subject as string) || ""}
              onChange={(e) => updateInput("subject", e.target.value)}
              placeholder="Order Confirmation #{{trigger.data.orderId}}"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Body</Label>
            <Textarea
              id="body"
              value={(inputs.body as string) || ""}
              onChange={(e) => updateInput("body", e.target.value)}
              placeholder="Your order has been confirmed..."
              rows={5}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="cc">CC</Label>
              <Input
                id="cc"
                value={(inputs.cc as string) || ""}
                onChange={(e) => updateInput("cc", e.target.value)}
                placeholder="manager@example.com"
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="bcc">BCC</Label>
              <Input
                id="bcc"
                value={(inputs.bcc as string) || ""}
                onChange={(e) => updateInput("bcc", e.target.value)}
                placeholder="audit@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Content Type</Label>
            <Select
              value={(inputs.contentType as string) || "text"}
              onValueChange={(value) => updateInput("contentType", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Plain Text</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {pluginId === "builtin:file" && (
        <>
          <div className="space-y-2">
            <Label>Operation</Label>
            <Select
              value={(inputs.operation as string) || "read"}
              onValueChange={(value) => updateInput("operation", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="write">Write</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="list">List</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Provider</Label>
            <Select
              value={(inputs.provider as string) || "local"}
              onValueChange={(value) => updateInput("provider", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local">Local</SelectItem>
                <SelectItem value="s3">Amazon S3</SelectItem>
                <SelectItem value="gcs">Google Cloud Storage</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="path">Path</Label>
            <Input
              id="path"
              value={(inputs.path as string) || ""}
              onChange={(e) => updateInput("path", e.target.value)}
              placeholder="/data/output.json or s3://bucket/key"
            />
          </div>
          {(inputs.operation as string) === "write" && (
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={(inputs.content as string) || ""}
                onChange={(e) => updateInput("content", e.target.value)}
                placeholder="{{steps.previous.output}}"
                rows={4}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="fileResult"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:queue" && (
        <>
          <div className="space-y-2">
            <Label>Operation</Label>
            <Select
              value={(inputs.operation as string) || "push"}
              onValueChange={(value) => updateInput("operation", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="push">Push</SelectItem>
                <SelectItem value="pull">Pull</SelectItem>
                <SelectItem value="peek">Peek</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Provider</Label>
            <Select
              value={(inputs.provider as string) || ""}
              onValueChange={(value) => updateInput("provider", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="valkey">Valkey</SelectItem>
                <SelectItem value="sqs">Amazon SQS</SelectItem>
                <SelectItem value="rabbitmq">RabbitMQ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="queueName">Queue Name</Label>
            <Input
              id="queueName"
              value={(inputs.queueName as string) || ""}
              onChange={(e) => updateInput("queueName", e.target.value)}
              placeholder="order-processing"
            />
          </div>
          {(inputs.operation as string) === "push" && (
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={(inputs.message as string) || ""}
                onChange={(e) => updateInput("message", e.target.value)}
                placeholder="{{steps.previous.output}}"
                rows={3}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="queueResult"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:database" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="serverId">Server ID</Label>
            <Input
              id="serverId"
              value={(inputs.serverId as string) || ""}
              onChange={(e) => updateInput("serverId", e.target.value)}
              placeholder="default"
            />
            <p className="text-muted-foreground text-xs">
              Database connection to use
            </p>
          </div>
          <div className="space-y-2">
            <Label>Operation</Label>
            <Select
              value={(inputs.operation as string) || "query"}
              onValueChange={(value) => updateInput("operation", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="query">Query</SelectItem>
                <SelectItem value="insert">Insert</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="query">Query</Label>
            <Textarea
              id="query"
              value={(inputs.query as string) || ""}
              onChange={(e) => updateInput("query", e.target.value)}
              placeholder="SELECT * FROM users WHERE id = $1"
              rows={4}
              className="font-mono text-sm"
            />
          </div>
          <JsonField
            id="params"
            label="Parameters"
            value={(inputs.params as Record<string, unknown>) || {}}
            onChange={(val) => updateInput("params", val)}
            placeholder='["{{trigger.data.userId}}"]'
          />
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="dbResult"
            />
          </div>
        </>
      )}
    </>
  );
};

// Built-in integration node config (spreadsheet, google-sheets, pdf)
const IntegrationBuiltinNodeConfig = ({
  data,
  onChange,
  inputs,
  updateInput,
  pluginId,
}: PluginSubConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this step do?"
          rows={2}
        />
      </div>

      {pluginId === "builtin:spreadsheet" && (
        <>
          <div className="space-y-2">
            <Label>Operation</Label>
            <Select
              value={(inputs.operation as string) || "read"}
              onValueChange={(value) => updateInput("operation", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="write">Write</SelectItem>
                <SelectItem value="append">Append</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="path">Path</Label>
            <Input
              id="path"
              value={(inputs.path as string) || ""}
              onChange={(e) => updateInput("path", e.target.value)}
              placeholder="/data/report.xlsx"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sheet">Sheet</Label>
            <Input
              id="sheet"
              value={(inputs.sheet as string) || ""}
              onChange={(e) => updateInput("sheet", e.target.value)}
              placeholder="Sheet1"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="headers"
              checked={(inputs.headers as boolean) ?? true}
              onChange={(e) => updateInput("headers", e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="headers" className="font-normal">
              First row contains headers
            </Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="sheetData"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:google-sheets" && (
        <>
          <div className="space-y-2">
            <Label>Operation</Label>
            <Select
              value={(inputs.operation as string) || "read"}
              onValueChange={(value) => updateInput("operation", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="write">Write</SelectItem>
                <SelectItem value="append">Append</SelectItem>
                <SelectItem value="clear">Clear</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="spreadsheetId">Spreadsheet ID</Label>
            <Input
              id="spreadsheetId"
              value={(inputs.spreadsheetId as string) || ""}
              onChange={(e) => updateInput("spreadsheetId", e.target.value)}
              placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
            />
            <p className="text-muted-foreground text-xs">
              ID from the Google Sheets URL
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sheet">Sheet</Label>
            <Input
              id="sheet"
              value={(inputs.sheet as string) || ""}
              onChange={(e) => updateInput("sheet", e.target.value)}
              placeholder="Sheet1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="range">Range</Label>
            <Input
              id="range"
              value={(inputs.range as string) || ""}
              onChange={(e) => updateInput("range", e.target.value)}
              placeholder="A1:D10"
            />
            <p className="text-muted-foreground text-xs">
              Cell range in A1 notation
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="sheetsData"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:pdf" && (
        <>
          <div className="space-y-2">
            <Label>Operation</Label>
            <Select
              value={(inputs.operation as string) || "parse"}
              onValueChange={(value) => updateInput("operation", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="parse">Parse</SelectItem>
                <SelectItem value="merge">Merge</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="input">Input</Label>
            <Input
              id="input"
              value={(inputs.input as string) || ""}
              onChange={(e) => updateInput("input", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
            <p className="text-muted-foreground text-xs">
              {(inputs.operation as string) === "create"
                ? "HTML or template content"
                : (inputs.operation as string) === "merge"
                  ? "Comma-separated PDF paths"
                  : "PDF file path or URL"}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="pdfResult"
            />
          </div>
        </>
      )}
    </>
  );
};

// HTTP extended config (webhook-response, rate-limit)
const HttpExtendedConfig = ({
  data,
  onChange,
  inputs,
  updateInput,
  pluginId,
}: PluginSubConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this step do?"
          rows={2}
        />
      </div>

      {pluginId === "builtin:webhook-response" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="statusCode">Status Code</Label>
            <Input
              id="statusCode"
              type="number"
              value={(inputs.statusCode as number) || 200}
              onChange={(e) =>
                updateInput(
                  "statusCode",
                  Number.parseInt(e.target.value, 10) || 200,
                )
              }
              min={100}
              max={599}
            />
          </div>
          <JsonField
            id="headers"
            label="Headers"
            value={(inputs.headers as Record<string, unknown>) || {}}
            onChange={(val) => updateInput("headers", val)}
            placeholder='{"X-Custom-Header": "value"}'
          />
          <JsonField
            id="body"
            label="Body"
            value={(inputs.body as Record<string, unknown>) || {}}
            onChange={(val) => updateInput("body", val)}
            placeholder='{"success": true, "data": "{{steps.previous.output}}"}'
          />
          <div className="space-y-2">
            <Label>Content Type</Label>
            <Select
              value={(inputs.contentType as string) || "application/json"}
              onValueChange={(value) => updateInput("contentType", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="application/json">JSON</SelectItem>
                <SelectItem value="text/plain">Plain Text</SelectItem>
                <SelectItem value="text/html">HTML</SelectItem>
                <SelectItem value="application/xml">XML</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {pluginId === "builtin:rate-limit" && (
        <>
          <div className="space-y-2">
            <Label>Operation</Label>
            <Select
              value={(inputs.operation as string) || "check"}
              onValueChange={(value) => updateInput("operation", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="check">Check</SelectItem>
                <SelectItem value="consume">Consume</SelectItem>
                <SelectItem value="reset">Reset</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="key">Key</Label>
            <Input
              id="key"
              value={(inputs.key as string) || ""}
              onChange={(e) => updateInput("key", e.target.value)}
              placeholder="{{trigger.data.userId}}"
            />
            <p className="text-muted-foreground text-xs">
              Unique identifier for rate limiting
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="limit">Limit</Label>
              <Input
                id="limit"
                type="number"
                value={(inputs.limit as number) || 100}
                onChange={(e) =>
                  updateInput(
                    "limit",
                    Number.parseInt(e.target.value, 10) || 100,
                  )
                }
                min={1}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="window">Window (seconds)</Label>
              <Input
                id="window"
                type="number"
                value={(inputs.window as number) || 60}
                onChange={(e) =>
                  updateInput(
                    "window",
                    Number.parseInt(e.target.value, 10) || 60,
                  )
                }
                min={1}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Algorithm</Label>
            <Select
              value={(inputs.algorithm as string) || "sliding-window"}
              onValueChange={(value) => updateInput("algorithm", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sliding-window">Sliding Window</SelectItem>
                <SelectItem value="fixed-window">Fixed Window</SelectItem>
                <SelectItem value="token-bucket">Token Bucket</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="rateLimitResult"
            />
          </div>
        </>
      )}
    </>
  );
};

// Flow control primitives config (stop, noop, debounce, time-window)
const FlowPrimitivesConfig = ({
  data,
  onChange,
  inputs,
  updateInput,
  pluginId,
}: PluginSubConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this step do?"
          rows={2}
        />
      </div>

      {pluginId === "builtin:stop" && (
        <>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={(inputs.status as string) || "success"}
              onValueChange={(value) => updateInput("status", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failure">Failure</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              value={(inputs.reason as string) || ""}
              onChange={(e) => updateInput("reason", e.target.value)}
              placeholder="Why is the workflow stopping?"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="output">Output (JSON)</Label>
            <Textarea
              id="output"
              value={(inputs.output as string) || ""}
              onChange={(e) => updateInput("output", e.target.value)}
              placeholder='{"result": "completed"}'
              rows={3}
              className="font-mono"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:noop" && (
        <p className="text-muted-foreground text-sm">
          No configuration needed. This step passes through without action.
        </p>
      )}

      {pluginId === "builtin:debounce" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="key">Debounce Key</Label>
            <Input
              id="key"
              value={(inputs.key as string) || ""}
              onChange={(e) => updateInput("key", e.target.value)}
              placeholder="{{trigger.userId}}"
            />
            <p className="text-muted-foreground text-xs">
              Unique key to group triggers for debouncing
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="windowMs">Window (ms)</Label>
            <Input
              id="windowMs"
              type="number"
              value={(inputs.windowMs as number) || 5000}
              onChange={(e) =>
                updateInput(
                  "windowMs",
                  Number.parseInt(e.target.value, 10) || 5000,
                )
              }
              min={100}
            />
            <p className="text-muted-foreground text-xs">
              Time window in milliseconds to coalesce triggers
            </p>
          </div>
          <div className="space-y-2">
            <Label>Strategy</Label>
            <Select
              value={(inputs.strategy as string) || "last"}
              onValueChange={(value) => updateInput("strategy", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="first">First (use first trigger)</SelectItem>
                <SelectItem value="last">Last (use last trigger)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="debouncedResult"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:time-window" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              value={(inputs.startTime as string) || "09:00"}
              onChange={(e) => updateInput("startTime", e.target.value)}
              placeholder="09:00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              value={(inputs.endTime as string) || "17:00"}
              onChange={(e) => updateInput("endTime", e.target.value)}
              placeholder="17:00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Input
              id="timezone"
              value={(inputs.timezone as string) || "America/New_York"}
              onChange={(e) => updateInput("timezone", e.target.value)}
              placeholder="America/New_York"
            />
          </div>
          <div className="space-y-2">
            <Label>Days of Week</Label>
            <div className="flex flex-wrap gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day, idx) => {
                  const currentDays = (inputs.daysOfWeek as number[]) || [
                    1, 2, 3, 4, 5,
                  ];
                  const isChecked = currentDays.includes(idx);
                  return (
                    <label
                      key={day}
                      className="flex items-center gap-1 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const newDays = e.target.checked
                            ? [...currentDays, idx].sort()
                            : currentDays.filter((d) => d !== idx);
                          updateInput("daysOfWeek", newDays);
                        }}
                        className="rounded"
                      />
                      {day}
                    </label>
                  );
                },
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>On Outside Window</Label>
            <Select
              value={(inputs.onOutside as string) || "skip"}
              onValueChange={(value) => updateInput("onOutside", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="skip">Skip (do nothing)</SelectItem>
                <SelectItem value="queue">
                  Queue (run when window opens)
                </SelectItem>
                <SelectItem value="fail">Fail (throw error)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </>
  );
};

// Data primitives config (diff, change-detector)
const DataPrimitivesConfig = ({
  data,
  onChange,
  inputs,
  updateInput,
  pluginId,
}: PluginSubConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this step do?"
          rows={2}
        />
      </div>

      {pluginId === "builtin:diff" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="left">Left Source</Label>
            <Input
              id="left"
              value={(inputs.left as string) || ""}
              onChange={(e) => updateInput("left", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
            <p className="text-muted-foreground text-xs">
              First dataset to compare
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="right">Right Source</Label>
            <Input
              id="right"
              value={(inputs.right as string) || ""}
              onChange={(e) => updateInput("right", e.target.value)}
              placeholder="{{steps.current.output}}"
            />
            <p className="text-muted-foreground text-xs">
              Second dataset to compare
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="key">Key Field</Label>
            <Input
              id="key"
              value={(inputs.key as string) || ""}
              onChange={(e) => updateInput("key", e.target.value)}
              placeholder="id"
            />
            <p className="text-muted-foreground text-xs">
              Property to match items between datasets
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="diffResult"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:change-detector" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="key">State Key</Label>
            <Input
              id="key"
              value={(inputs.key as string) || ""}
              onChange={(e) => updateInput("key", e.target.value)}
              placeholder="myService.lastValue"
            />
            <p className="text-muted-foreground text-xs">
              Unique key to track changes across runs
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Value Expression</Label>
            <Input
              id="value"
              value={(inputs.value as string) || ""}
              onChange={(e) => updateInput("value", e.target.value)}
              placeholder="{{steps.fetch.output.data}}"
            />
            <p className="text-muted-foreground text-xs">
              Value to compare against the last stored value
            </p>
          </div>
          <div className="space-y-2">
            <Label>Strategy</Label>
            <Select
              value={(inputs.strategy as string) || "hash"}
              onValueChange={(value) => updateInput("strategy", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hash">Hash (fast, less precise)</SelectItem>
                <SelectItem value="deep_equal">
                  Deep Equal (thorough comparison)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="changeResult"
            />
          </div>
        </>
      )}
    </>
  );
};

// AI primitives config (ai-transform, ai-guardrails)
const AiPrimitivesConfig = ({
  data,
  onChange,
  inputs,
  updateInput,
  pluginId,
}: PluginSubConfigProps) => {
  const [ruleCount, setRuleCount] = useState(
    (inputs.rules as Array<{ type: string; value: string }>)?.length || 1,
  );

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this step do?"
          rows={2}
        />
      </div>

      {pluginId === "builtin:ai-transform" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={(inputs.model as string) || ""}
              onChange={(e) => updateInput("model", e.target.value)}
              placeholder="gpt-4o"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              value={(inputs.prompt as string) || ""}
              onChange={(e) => updateInput("prompt", e.target.value)}
              placeholder="Extract the key facts from the following text and return as JSON..."
              rows={4}
            />
            <p className="text-muted-foreground text-xs">
              Prompt template describing the transformation
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="input">Input Source</Label>
            <Input
              id="input"
              value={(inputs.input as string) || ""}
              onChange={(e) => updateInput("input", e.target.value)}
              placeholder="{{steps.previous.output}}"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="schema">Output Schema (optional)</Label>
            <Textarea
              id="schema"
              value={(inputs.schema as string) || ""}
              onChange={(e) => updateInput("schema", e.target.value)}
              placeholder='{"type": "object", "properties": {"summary": {"type": "string"}}}'
              rows={3}
              className="font-mono"
            />
            <p className="text-muted-foreground text-xs">
              JSON schema for structured output
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="transformedData"
            />
          </div>
        </>
      )}

      {pluginId === "builtin:ai-guardrails" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="input">Input Source</Label>
            <Input
              id="input"
              value={(inputs.input as string) || ""}
              onChange={(e) => updateInput("input", e.target.value)}
              placeholder="{{steps.aiStep.output}}"
            />
            <p className="text-muted-foreground text-xs">
              LLM output to validate
            </p>
          </div>
          <div className="space-y-2">
            <Label>Rules</Label>
            {Array.from({ length: ruleCount }).map((_, idx) => {
              const rules =
                (inputs.rules as Array<{ type: string; value: string }>) || [];
              const rule = rules[idx] || { type: "contains", value: "" };
              return (
                <div key={idx} className="flex gap-2">
                  <Select
                    value={rule.type}
                    onValueChange={(value) => {
                      const newRules = [...rules];
                      newRules[idx] = { ...rule, type: value };
                      updateInput("rules", newRules);
                    }}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regex">Regex</SelectItem>
                      <SelectItem value="contains">Contains</SelectItem>
                      <SelectItem value="not_contains">Not Contains</SelectItem>
                      <SelectItem value="max_length">Max Length</SelectItem>
                      <SelectItem value="json_schema">JSON Schema</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={rule.value}
                    onChange={(e) => {
                      const newRules = [...rules];
                      newRules[idx] = { ...rule, value: e.target.value };
                      updateInput("rules", newRules);
                    }}
                    placeholder="Rule value"
                    className="flex-1"
                  />
                </div>
              );
            })}
            <button
              type="button"
              className="text-primary text-sm hover:underline"
              onClick={() => {
                const rules =
                  (inputs.rules as Array<{ type: string; value: string }>) ||
                  [];
                updateInput("rules", [
                  ...rules,
                  { type: "contains", value: "" },
                ]);
                setRuleCount(ruleCount + 1);
              }}
            >
              + Add rule
            </button>
          </div>
          <div className="space-y-2">
            <Label>On Fail</Label>
            <Select
              value={(inputs.onFail as string) || "block"}
              onValueChange={(value) => updateInput("onFail", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="block">Block (stop workflow)</SelectItem>
                <SelectItem value="warn">
                  Warn (continue with warning)
                </SelectItem>
                <SelectItem value="sanitize">
                  Sanitize (clean output)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputVariable">Output Variable</Label>
            <Input
              id="outputVariable"
              value={(inputs.outputVariable as string) || ""}
              onChange={(e) => updateInput("outputVariable", e.target.value)}
              placeholder="validatedOutput"
            />
          </div>
        </>
      )}
    </>
  );
};
