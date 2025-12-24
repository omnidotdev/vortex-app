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
          </SelectContent>
        </Select>
      </div>

      {triggerType === "webhook" && (
        <div className="space-y-2">
          <Label>Webhook URL</Label>
          {workflowId && webhookSecret ? (
            <>
              <div className="rounded-md bg-muted p-3">
                <code className="break-all text-xs">
                  POST /webhooks/workflow/{workflowId}/{webhookSecret}
                </code>
              </div>
              <p className="text-muted-foreground text-xs">
                Send a POST request to this URL to trigger the workflow. The
                request body will be passed as trigger data.
              </p>
            </>
          ) : (
            <>
              <div className="rounded-md bg-muted p-3">
                <code className="break-all text-muted-foreground text-xs">
                  POST /webhooks/workflow/{"{workflowId}"}/{"{secret}"}
                </code>
              </div>
              <p className="text-muted-foreground text-xs">
                Save the workflow to generate the webhook URL.
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
    </>
  );
};
