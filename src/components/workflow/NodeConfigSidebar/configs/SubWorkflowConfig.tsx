import { useQuery } from "@tanstack/react-query";
import { useParams, useRouteContext } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, ExternalLink, Loader2 } from "lucide-react";
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
import workflowsOptions from "@/lib/options/workflows.options";
import { DurationField } from "../fields/DurationField";
import { JsonField } from "../fields/JsonField";

import type { NodeConfigProps } from "./types";

type DurationUnit = "seconds" | "minutes" | "hours" | "days";

export const SubWorkflowConfig = ({
  nodeId,
  data,
  onChange,
  allNodes = [],
}: NodeConfigProps) => {
  const { workspaceSlug, workflowId: currentWorkflowId } = useParams({
    strict: false,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Get organization ID from route context (available in /_auth routes)
  const context = useRouteContext({ strict: false }) as {
    organizationId?: string;
  };
  const organizationId = context?.organizationId;

  // Fetch available workflows for the dropdown
  const { data: workflowsData, isLoading } = useQuery({
    ...workflowsOptions({ organizationId: organizationId || "", limit: 100 }),
    enabled: !!organizationId,
  });

  // Filter out the current workflow to prevent self-referencing
  const availableWorkflows =
    workflowsData?.workflows?.nodes?.filter(
      (w) => w.rowId !== currentWorkflowId,
    ) || [];

  // Extract config values
  const workflowId = (data.workflowId as string) || "";
  const waitForCompletion = (data.waitForCompletion as boolean) ?? true;
  const timeoutDuration = (data.timeoutDuration as number) || 60;
  const timeoutUnit = (data.timeoutUnit as DurationUnit) || "minutes";
  const onError = (data.onError as string) || "fail";
  const inputMapping = (data.inputMapping as Record<string, unknown>) || {};

  // Get the selected workflow details
  const selectedWorkflow = availableWorkflows.find(
    (w) => w.rowId === workflowId,
  );

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this sub-workflow do?"
          rows={2}
        />
      </div>

      {/* Workflow Selection */}
      <div className="space-y-2">
        <Label>Workflow to Execute</Label>
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading workflows...
          </div>
        ) : availableWorkflows.length === 0 ? (
          <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-800 text-sm dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
            No other workflows found. Create another workflow first.
          </div>
        ) : (
          <Select
            value={workflowId}
            onValueChange={(value) => onChange("workflowId", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a workflow..." />
            </SelectTrigger>
            <SelectContent>
              {availableWorkflows.map((workflow) => (
                <SelectItem key={workflow.rowId} value={workflow.rowId}>
                  <div className="flex flex-col">
                    <span>{workflow.name}</span>
                    {workflow.description && (
                      <span className="text-muted-foreground text-xs">
                        {workflow.description}
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Link to open selected workflow */}
        {selectedWorkflow && workspaceSlug && (
          <a
            href={`/workspaces/${workspaceSlug}/workflows/${workflowId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground"
          >
            Open "{selectedWorkflow.name}"
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      {/* Input Mapping */}
      <JsonField
        id="inputMapping"
        label="Input Data"
        value={inputMapping}
        onChange={(val) => onChange("inputMapping", val)}
        placeholder='{"orderId": "{{trigger.data.id}}", "customerEmail": "{{steps.fetch.email}}"}'
        nodeId={nodeId}
        allNodes={allNodes}
        minHeight={100}
        maxHeight={200}
      />
      <p className="text-muted-foreground text-xs">
        Map data from this workflow to the sub-workflow's trigger. Use{" "}
        {"{{variable}}"} syntax.
      </p>

      {/* Wait for Completion Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="waitForCompletion"
          checked={waitForCompletion}
          onChange={(e) => onChange("waitForCompletion", e.target.checked)}
          className="rounded"
        />
        <Label htmlFor="waitForCompletion" className="font-normal">
          Wait for completion
        </Label>
      </div>
      <p className="text-muted-foreground text-xs">
        {waitForCompletion
          ? "This step will wait until the sub-workflow finishes before continuing"
          : "The sub-workflow will run in the background (fire-and-forget)"}
      </p>

      {/* Timeout (only shown when waiting) */}
      {waitForCompletion && (
        <DurationField
          label="Timeout"
          duration={timeoutDuration}
          unit={timeoutUnit}
          onDurationChange={(val) => onChange("timeoutDuration", val)}
          onUnitChange={(val) => onChange("timeoutUnit", val)}
        />
      )}

      {/* Advanced Settings */}
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
        Error Handling
      </button>

      {showAdvanced && (
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>On Error</Label>
            <Select
              value={onError}
              onValueChange={(value) => onChange("onError", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fail">
                  <div className="flex flex-col">
                    <span>Fail workflow</span>
                    <span className="text-muted-foreground text-xs">
                      Stop execution if sub-workflow fails
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="continue">
                  <div className="flex flex-col">
                    <span>Continue</span>
                    <span className="text-muted-foreground text-xs">
                      Continue even if sub-workflow fails
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="retry">
                  <div className="flex flex-col">
                    <span>Retry</span>
                    <span className="text-muted-foreground text-xs">
                      Retry the sub-workflow on failure
                    </span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Retry settings (only shown when retry is selected) */}
          {onError === "retry" && (
            <div className="space-y-2">
              <Label htmlFor="maxRetries">Max Retries</Label>
              <Input
                id="maxRetries"
                type="number"
                value={(data.maxRetries as number) || 3}
                onChange={(e) =>
                  onChange(
                    "maxRetries",
                    Number.parseInt(e.target.value, 10) || 3,
                  )
                }
                min={1}
                max={10}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
