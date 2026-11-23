import { Button } from "@omnidotdev/thornberry/button";
import { Input } from "@omnidotdev/thornberry/input";
import { Label } from "@omnidotdev/thornberry/label";
import { OptionsSelect } from "@omnidotdev/thornberry/select";
import { Textarea } from "@omnidotdev/thornberry/textarea";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

import type { NodeConfigProps } from "./types";

export const TriggerNodeConfig = ({
  data,
  onChange,
  onNestedChange,
  workflowId,
  webhookSecret,
}: NodeConfigProps) => {
  const triggerType = (data.triggerType as string) || "manual";
  const config = (data.config as Record<string, unknown>) || {};
  const [copied, setCopied] = useState(false);
  // Defer to client to avoid hydration mismatch (window.location is unavailable during SSR)
  const [webhookUrl, setWebhookUrl] = useState("");

  useEffect(() => {
    if (workflowId && webhookSecret) {
      setWebhookUrl(
        `${window.location.origin}/api/webhooks/workflow/${workflowId}/${webhookSecret}`,
      );
    }
  }, [workflowId, webhookSecret]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What triggers this workflow?"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>Trigger Type</Label>
        <OptionsSelect
          value={triggerType}
          onValueChange={(value) => onChange("triggerType", value)}
          options={[
            { value: "manual", label: "Manual" },
            { value: "webhook", label: "Webhook" },
            { value: "cron", label: "Scheduled (Cron)" },
            { value: "event", label: "Event" },
            { value: "omni", label: "Omni Event" },
            { value: "polling", label: "HTTP Polling" },
            { value: "kafka", label: "Kafka" },
            { value: "sqs", label: "SQS" },
            { value: "s3", label: "S3 Event" },
            { value: "cdc", label: "CDC (Change Data Capture)" },
            { value: "mqtt", label: "MQTT" },
            { value: "websocket", label: "WebSocket" },
            { value: "redis", label: "Redis Pub/Sub" },
            { value: "nats", label: "NATS" },
            { value: "amqp", label: "AMQP (RabbitMQ)" },
            { value: "grpc_stream", label: "gRPC Stream" },
          ]}
        />
      </div>

      {triggerType === "webhook" && (
        <div className="space-y-2">
          <Label>Webhook URL</Label>
          {workflowId && webhookSecret ? (
            <>
              <div className="flex gap-2">
                <div className="flex-1 rounded-md bg-muted p-3">
                  <code className="break-all text-xs">{webhookUrl}</code>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-muted-foreground text-xs">
                Send a POST request with JSON body to trigger the workflow.
              </p>
            </>
          ) : (
            <>
              <div className="rounded-md bg-muted p-3">
                <code className="break-all text-muted-foreground text-xs">
                  Save the workflow first to generate a webhook URL
                </code>
              </div>
              <p className="text-muted-foreground text-xs">
                Click Save to generate your webhook URL.
              </p>
            </>
          )}
        </div>
      )}

      {triggerType === "cron" && (
        <div className="space-y-2">
          <Label htmlFor="cronExpression">Cron Expression</Label>
          <Input
            id="cronExpression"
            value={(config.expression as string) || ""}
            onChange={(e) =>
              onNestedChange("config", "expression", e.target.value)
            }
            placeholder="0 0 * * *"
            className="font-mono"
          />
          <p className="text-muted-foreground text-xs">
            Examples: "0 0 * * *" (daily at midnight), "0 9 * * MON" (every
            Monday at 9am), "*/15 * * * *" (every 15 minutes)
          </p>
        </div>
      )}

      {triggerType === "event" && (
        <div className="space-y-2">
          <Label htmlFor="eventName">Event Name</Label>
          <Input
            id="eventName"
            value={(config.eventName as string) || ""}
            onChange={(e) =>
              onNestedChange("config", "eventName", e.target.value)
            }
            placeholder="user.created"
          />
          <p className="text-muted-foreground text-xs">
            The workflow will trigger when this event is emitted.
          </p>
        </div>
      )}

      {triggerType === "omni" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={(config.source as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "source", e.target.value)
              }
              placeholder="runa, chronicle, * (all)"
            />
            <p className="text-muted-foreground text-xs">
              Omni service name or * for all services
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventType">Event Type</Label>
            <Input
              id="eventType"
              value={(config.eventType as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "eventType", e.target.value)
              }
              placeholder="user.created, payment.*"
            />
            <p className="text-muted-foreground text-xs">
              Event type pattern. Use * for wildcards
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="filter">Filter (optional)</Label>
            <Textarea
              id="filter"
              value={(config.filter as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "filter", e.target.value)
              }
              placeholder="$.data.amount > 100"
              rows={3}
            />
            <p className="text-muted-foreground text-xs">
              JSONPath expression to filter events
            </p>
          </div>
        </div>
      )}

      {triggerType === "polling" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pollingUrl">URL</Label>
            <Input
              id="pollingUrl"
              value={(config.url as string) || ""}
              onChange={(e) => onNestedChange("config", "url", e.target.value)}
              placeholder="https://api.example.com/data"
            />
          </div>

          <div className="space-y-2">
            <Label>Method</Label>
            <OptionsSelect
              value={(config.method as string) || "GET"}
              onValueChange={(value) =>
                onNestedChange("config", "method", value)
              }
              options={[
                { value: "GET", label: "GET" },
                { value: "POST", label: "POST" },
              ]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pollingInterval">Interval</Label>
            <Input
              id="pollingInterval"
              value={(config.interval as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "interval", e.target.value)
              }
              placeholder="30s, 5m, 1h"
            />
            <p className="text-muted-foreground text-xs">
              How often to poll. Examples: 30s, 5m, 1h
            </p>
          </div>

          <div className="space-y-2">
            <Label>Deduplication</Label>
            <OptionsSelect
              value={(config.deduplication as string) || "hash"}
              onValueChange={(value) =>
                onNestedChange("config", "deduplication", value)
              }
              options={[
                { value: "hash", label: "Content Hash" },
                { value: "field", label: "Field Value" },
                { value: "none", label: "None" },
              ]}
            />
          </div>

          {(config.deduplication as string) === "field" && (
            <div className="space-y-2">
              <Label htmlFor="dedupField">Deduplication Field</Label>
              <Input
                id="dedupField"
                value={(config.deduplicationField as string) || ""}
                onChange={(e) =>
                  onNestedChange("config", "deduplicationField", e.target.value)
                }
                placeholder="$.id"
              />
              <p className="text-muted-foreground text-xs">
                JSONPath to the field used for deduplication
              </p>
            </div>
          )}
        </div>
      )}

      {triggerType === "kafka" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="kafkaBrokers">Brokers</Label>
            <Input
              id="kafkaBrokers"
              value={(config.brokers as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "brokers", e.target.value)
              }
              placeholder="broker1:9092, broker2:9092"
            />
            <p className="text-muted-foreground text-xs">
              Comma-separated list of Kafka broker addresses
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="kafkaTopic">Topic</Label>
            <Input
              id="kafkaTopic"
              value={(config.topic as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "topic", e.target.value)
              }
              placeholder="my-topic"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="kafkaGroupId">Consumer Group ID</Label>
            <Input
              id="kafkaGroupId"
              value={(config.groupId as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "groupId", e.target.value)
              }
              placeholder="vortex-consumer-group"
            />
          </div>
        </div>
      )}

      {triggerType === "sqs" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sqsQueueUrl">Queue URL</Label>
            <Input
              id="sqsQueueUrl"
              value={(config.queueUrl as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "queueUrl", e.target.value)
              }
              placeholder="https://sqs.us-east-1.amazonaws.com/123456789/my-queue"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sqsRegion">Region</Label>
            <Input
              id="sqsRegion"
              value={(config.region as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "region", e.target.value)
              }
              placeholder="us-east-1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sqsBatchSize">Batch Size</Label>
            <Input
              id="sqsBatchSize"
              type="number"
              min={1}
              max={10}
              value={(config.batchSize as number) || 1}
              onChange={(e) =>
                onNestedChange(
                  "config",
                  "batchSize",
                  parseInt(e.target.value, 10),
                )
              }
            />
            <p className="text-muted-foreground text-xs">
              Number of messages to receive per poll (1-10)
            </p>
          </div>
        </div>
      )}

      {triggerType === "s3" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="s3Bucket">Bucket</Label>
            <Input
              id="s3Bucket"
              value={(config.bucket as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "bucket", e.target.value)
              }
              placeholder="my-bucket"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="s3Prefix">Prefix (optional)</Label>
            <Input
              id="s3Prefix"
              value={(config.prefix as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "prefix", e.target.value)
              }
              placeholder="uploads/"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="s3Suffix">Suffix (optional)</Label>
            <Input
              id="s3Suffix"
              value={(config.suffix as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "suffix", e.target.value)
              }
              placeholder=".csv"
            />
          </div>

          <div className="space-y-2">
            <Label>Events</Label>
            <p className="text-muted-foreground text-xs">
              S3 event types are configured via S3 bucket notifications pointing
              to the Vortex webhook endpoint
            </p>
          </div>
        </div>
      )}

      {triggerType === "cdc" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cdcTable">Table</Label>
            <Input
              id="cdcTable"
              value={(config.table as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "table", e.target.value)
              }
              placeholder="public.users"
            />
          </div>

          <div className="space-y-2">
            <Label>Operations</Label>
            <p className="text-muted-foreground text-xs">
              Select which database operations trigger this workflow
            </p>
            <div className="flex gap-2">
              {["INSERT", "UPDATE", "DELETE"].map((op) => {
                const operations = (config.operations as string[]) || [
                  "INSERT",
                  "UPDATE",
                  "DELETE",
                ];
                const isSelected = operations.includes(op);
                return (
                  <button
                    key={op}
                    type="button"
                    onClick={() => {
                      const newOps = isSelected
                        ? operations.filter((o: string) => o !== op)
                        : [...operations, op];
                      onNestedChange("config", "operations", newOps);
                    }}
                    className={`rounded-md border px-3 py-1.5 font-medium text-xs transition-colors ${
                      isSelected
                        ? "border-primary bg-primary/10 text-primary dark:text-primary-300"
                        : "border-muted text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {op}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {triggerType === "mqtt" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mqttBrokerUrl">Broker URL</Label>
            <Input
              id="mqttBrokerUrl"
              value={(config.brokerUrl as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "brokerUrl", e.target.value)
              }
              placeholder="mqtt://broker.example.com:1883"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mqttTopic">Topic</Label>
            <Input
              id="mqttTopic"
              value={(config.topic as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "topic", e.target.value)
              }
              placeholder="sensors/temperature/#"
            />
            <p className="text-muted-foreground text-xs">
              MQTT topic pattern. Use # for multi-level and + for single-level
              wildcards
            </p>
          </div>

          <div className="space-y-2">
            <Label>QoS</Label>
            <OptionsSelect
              value={String((config.qos as number) ?? 0)}
              onValueChange={(value) =>
                onNestedChange("config", "qos", parseInt(value, 10))
              }
              options={[
                { value: "0", label: "0 - At most once" },
                { value: "1", label: "1 - At least once" },
                { value: "2", label: "2 - Exactly once" },
              ]}
            />
          </div>
        </div>
      )}

      {triggerType === "websocket" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wsUrl">WebSocket URL</Label>
            <Input
              id="wsUrl"
              value={(config.url as string) || ""}
              onChange={(e) => onNestedChange("config", "url", e.target.value)}
              placeholder="wss://stream.example.com/events"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="wsProtocols">Protocols (optional)</Label>
            <Input
              id="wsProtocols"
              value={(config.protocols as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "protocols", e.target.value)
              }
              placeholder="graphql-ws, json"
            />
            <p className="text-muted-foreground text-xs">
              Comma-separated list of WebSocket subprotocols
            </p>
          </div>
        </div>
      )}

      {triggerType === "redis" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="redisUrl">Redis URL</Label>
            <Input
              id="redisUrl"
              value={(config.url as string) || ""}
              onChange={(e) => onNestedChange("config", "url", e.target.value)}
              placeholder="redis://localhost:6379"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="redisChannels">Channels</Label>
            <Input
              id="redisChannels"
              value={(config.channels as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "channels", e.target.value)
              }
              placeholder="events:*, notifications"
            />
            <p className="text-muted-foreground text-xs">
              Comma-separated list of Redis Pub/Sub channels
            </p>
          </div>
        </div>
      )}

      {triggerType === "nats" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="natsServers">Servers</Label>
            <Input
              id="natsServers"
              value={(config.servers as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "servers", e.target.value)
              }
              placeholder="nats://localhost:4222"
            />
            <p className="text-muted-foreground text-xs">
              Comma-separated list of NATS server URLs
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="natsSubject">Subject</Label>
            <Input
              id="natsSubject"
              value={(config.subject as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "subject", e.target.value)
              }
              placeholder="events.>"
            />
            <p className="text-muted-foreground text-xs">
              NATS subject to subscribe to. Use &gt; for wildcard
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="natsQueue">Queue Group (optional)</Label>
            <Input
              id="natsQueue"
              value={(config.queue as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "queue", e.target.value)
              }
              placeholder="vortex-workers"
            />
            <p className="text-muted-foreground text-xs">
              Queue group for load-balanced consumption
            </p>
          </div>
        </div>
      )}

      {triggerType === "amqp" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amqpUrl">Connection URL</Label>
            <Input
              id="amqpUrl"
              value={(config.url as string) || ""}
              onChange={(e) => onNestedChange("config", "url", e.target.value)}
              placeholder="amqp://guest:guest@localhost:5672"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amqpQueue">Queue</Label>
            <Input
              id="amqpQueue"
              value={(config.queue as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "queue", e.target.value)
              }
              placeholder="my-queue"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amqpExchange">Exchange (optional)</Label>
            <Input
              id="amqpExchange"
              value={(config.exchange as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "exchange", e.target.value)
              }
              placeholder="my-exchange"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amqpRoutingKey">Routing Key (optional)</Label>
            <Input
              id="amqpRoutingKey"
              value={(config.routingKey as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "routingKey", e.target.value)
              }
              placeholder="events.#"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amqpPrefetch">Prefetch</Label>
            <Input
              id="amqpPrefetch"
              type="number"
              min={1}
              value={(config.prefetch as number) || 10}
              onChange={(e) =>
                onNestedChange(
                  "config",
                  "prefetch",
                  parseInt(e.target.value, 10),
                )
              }
            />
            <p className="text-muted-foreground text-xs">
              Max unacknowledged messages per consumer
            </p>
          </div>
        </div>
      )}

      {triggerType === "grpc_stream" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="grpcAddress">Server Address</Label>
            <Input
              id="grpcAddress"
              value={(config.address as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "address", e.target.value)
              }
              placeholder="localhost:50051"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grpcProtoPath">Proto Path</Label>
            <Input
              id="grpcProtoPath"
              value={(config.protoPath as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "protoPath", e.target.value)
              }
              placeholder="/path/to/service.proto"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grpcService">Service Name</Label>
            <Input
              id="grpcService"
              value={(config.service as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "service", e.target.value)
              }
              placeholder="events.EventService"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grpcMethod">Method Name</Label>
            <Input
              id="grpcMethod"
              value={(config.method as string) || ""}
              onChange={(e) =>
                onNestedChange("config", "method", e.target.value)
              }
              placeholder="StreamEvents"
            />
          </div>
        </div>
      )}
    </>
  );
};
