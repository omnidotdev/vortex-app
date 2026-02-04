import { Check, Copy } from "lucide-react";
import { useState } from "react";

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

  // Build full webhook URL
  const getWebhookUrl = () => {
    if (typeof window === "undefined") return "";
    const baseUrl = window.location.origin;
    return `${baseUrl}/api/webhooks/workflow/${workflowId}/${webhookSecret}`;
  };

  const copyToClipboard = async () => {
    const url = getWebhookUrl();
    await navigator.clipboard.writeText(url);
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
        <Select
          value={triggerType}
          onValueChange={(value) => onChange("triggerType", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manual">Manual</SelectItem>
            <SelectItem value="webhook">Webhook</SelectItem>
            <SelectItem value="cron">Scheduled (Cron)</SelectItem>
            <SelectItem value="event">Event</SelectItem>
            <SelectItem value="omni">Omni Event</SelectItem>
            <SelectItem value="polling">HTTP Polling</SelectItem>
            <SelectItem value="kafka">Kafka</SelectItem>
            <SelectItem value="sqs">SQS</SelectItem>
            <SelectItem value="s3">S3 Event</SelectItem>
            <SelectItem value="cdc">CDC (Change Data Capture)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {triggerType === "webhook" && (
        <div className="space-y-2">
          <Label>Webhook URL</Label>
          {workflowId && webhookSecret ? (
            <>
              <div className="flex gap-2">
                <div className="flex-1 rounded-md bg-muted p-3">
                  <code className="break-all text-xs">{getWebhookUrl()}</code>
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
            <Select
              value={(config.method as string) || "GET"}
              onValueChange={(value) =>
                onNestedChange("config", "method", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
              </SelectContent>
            </Select>
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
            <Select
              value={(config.deduplication as string) || "hash"}
              onValueChange={(value) =>
                onNestedChange("config", "deduplication", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hash">Content Hash</SelectItem>
                <SelectItem value="field">Field Value</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(config.deduplication as string) === "field" && (
            <div className="space-y-2">
              <Label htmlFor="dedupField">Deduplication Field</Label>
              <Input
                id="dedupField"
                value={(config.deduplicationField as string) || ""}
                onChange={(e) =>
                  onNestedChange(
                    "config",
                    "deduplicationField",
                    e.target.value,
                  )
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
                    className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                      isSelected
                        ? "border-primary bg-primary/10 text-primary"
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
    </>
  );
};
