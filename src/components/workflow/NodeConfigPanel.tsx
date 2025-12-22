"use client";

import { useCallback, useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import type { Node } from "reactflow";

interface NodeConfigPanelProps {
  node: Node | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (nodeId: string, data: Record<string, unknown>) => void;
}

export function NodeConfigPanel({
  node,
  isOpen,
  onClose,
  onUpdate,
}: NodeConfigPanelProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (node) {
      setFormData(node.data || {});
    }
  }, [node]);

  const handleChange = useCallback((key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleNestedChange = useCallback(
    (parentKey: string, key: string, value: unknown) => {
      setFormData((prev) => ({
        ...prev,
        [parentKey]: {
          ...((prev[parentKey] as Record<string, unknown>) || {}),
          [key]: value,
        },
      }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (node) {
        onUpdate(node.id, formData);
        onClose();
      }
    },
    [node, formData, onUpdate, onClose],
  );

  if (!node) return null;

  const nodeType = node.type || "";

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[450px] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <SheetTitle>
              {(formData.label as string) || "Configure Node"}
            </SheetTitle>
            <Badge variant="outline" className="text-xs">
              {nodeType.replace("Node", "")}
            </Badge>
          </div>
          <SheetDescription>Configure this workflow step</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-4 space-y-4">
              {/* Common fields */}
              <div className="space-y-2">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={(formData.label as string) || ""}
                  onChange={(e) => handleChange("label", e.target.value)}
                  placeholder="Node label"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={(formData.description as string) || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="What does this step do?"
                  rows={2}
                />
              </div>

              {/* Trigger Node */}
              {nodeType === "triggerNode" && (
                <>
                  <div className="space-y-2">
                    <Label>Trigger Type</Label>
                    <Select
                      value={(formData.triggerType as string) || "manual"}
                      onValueChange={(value) =>
                        handleChange("triggerType", value)
                      }
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

                  {formData.triggerType === "cron" && (
                    <div className="space-y-2">
                      <Label htmlFor="cronExpression">Cron Expression</Label>
                      <Input
                        id="cronExpression"
                        value={
                          ((formData.config as Record<string, unknown>)
                            ?.expression as string) || ""
                        }
                        onChange={(e) =>
                          handleNestedChange(
                            "config",
                            "expression",
                            e.target.value,
                          )
                        }
                        placeholder="0 0 * * *"
                      />
                      <p className="text-muted-foreground text-xs">
                        Example: 0 0 * * * (daily at midnight)
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Action Node */}
              {nodeType === "actionNode" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="operation">Operation</Label>
                    <Input
                      id="operation"
                      value={(formData.operation as string) || ""}
                      onChange={(e) =>
                        handleChange("operation", e.target.value)
                      }
                      placeholder="e.g., sendEmail, httpRequest"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inputs">Inputs (JSON)</Label>
                    <Textarea
                      id="inputs"
                      value={JSON.stringify(formData.inputs || {}, null, 2)}
                      onChange={(e) => {
                        try {
                          handleChange("inputs", JSON.parse(e.target.value));
                        } catch {
                          // Keep as string if invalid JSON
                        }
                      }}
                      placeholder='{"key": "value"}'
                      rows={4}
                      className="font-mono text-sm"
                    />
                  </div>
                </>
              )}

              {/* Condition Node */}
              {nodeType === "conditionNode" && (
                <div className="space-y-2">
                  <Label htmlFor="expression">Condition Expression</Label>
                  <Textarea
                    id="expression"
                    value={(formData.expression as string) || ""}
                    onChange={(e) => handleChange("expression", e.target.value)}
                    placeholder="$.trigger.data.value > 100"
                    rows={2}
                    className="font-mono text-sm"
                  />
                  <p className="text-muted-foreground text-xs">
                    Use JSONPath expressions. Returns true/false.
                  </p>
                </div>
              )}

              {/* Switch Node */}
              {nodeType === "switchNode" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="switchExpression">Switch Expression</Label>
                    <Input
                      id="switchExpression"
                      value={(formData.expression as string) || ""}
                      onChange={(e) =>
                        handleChange("expression", e.target.value)
                      }
                      placeholder="$.trigger.data.type"
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Cases (JSON Array)</Label>
                    <Textarea
                      value={JSON.stringify(formData.cases || [], null, 2)}
                      onChange={(e) => {
                        try {
                          handleChange("cases", JSON.parse(e.target.value));
                        } catch {
                          // Keep as string if invalid JSON
                        }
                      }}
                      placeholder='[{"value": "A", "label": "Case A"}]'
                      rows={4}
                      className="font-mono text-sm"
                    />
                  </div>
                </>
              )}

              {/* Loop Node */}
              {nodeType === "loopNode" && (
                <>
                  <div className="space-y-2">
                    <Label>Loop Type</Label>
                    <Select
                      value={(formData.loopType as string) || "forEach"}
                      onValueChange={(value) => handleChange("loopType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="forEach">For Each</SelectItem>
                        <SelectItem value="while">While</SelectItem>
                        <SelectItem value="times">Times</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.loopType === "forEach" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="collection">
                          Collection Expression
                        </Label>
                        <Input
                          id="collection"
                          value={(formData.collection as string) || ""}
                          onChange={(e) =>
                            handleChange("collection", e.target.value)
                          }
                          placeholder="$.trigger.data.items"
                          className="font-mono text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="itemVariable">Item Variable Name</Label>
                        <Input
                          id="itemVariable"
                          value={(formData.itemVariable as string) || "item"}
                          onChange={(e) =>
                            handleChange("itemVariable", e.target.value)
                          }
                          placeholder="item"
                        />
                      </div>
                    </>
                  )}

                  {formData.loopType === "while" && (
                    <div className="space-y-2">
                      <Label htmlFor="condition">While Condition</Label>
                      <Input
                        id="condition"
                        value={(formData.condition as string) || ""}
                        onChange={(e) =>
                          handleChange("condition", e.target.value)
                        }
                        placeholder="$.variables.count < 10"
                        className="font-mono text-sm"
                      />
                    </div>
                  )}

                  {formData.loopType === "times" && (
                    <div className="space-y-2">
                      <Label htmlFor="count">Number of Iterations</Label>
                      <Input
                        id="count"
                        type="number"
                        value={(formData.count as number) || 1}
                        onChange={(e) =>
                          handleChange("count", parseInt(e.target.value) || 1)
                        }
                        min={1}
                      />
                    </div>
                  )}
                </>
              )}

              {/* Gate Node */}
              {nodeType === "gateNode" && (
                <>
                  <div className="space-y-2">
                    <Label>Gate Type</Label>
                    <Select
                      value={(formData.gateType as string) || "approval"}
                      onValueChange={(value) => handleChange("gateType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approval">Human Approval</SelectItem>
                        <SelectItem value="signal">Wait for Signal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.gateType === "approval" && (
                    <div className="space-y-2">
                      <Label htmlFor="approvers">
                        Approvers (comma-separated)
                      </Label>
                      <Input
                        id="approvers"
                        value={((formData.approvers as string[]) || []).join(
                          ", ",
                        )}
                        onChange={(e) =>
                          handleChange(
                            "approvers",
                            e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          )
                        }
                        placeholder="user@example.com, admin@example.com"
                      />
                    </div>
                  )}

                  {formData.gateType === "signal" && (
                    <div className="space-y-2">
                      <Label htmlFor="signalName">Signal Name</Label>
                      <Input
                        id="signalName"
                        value={(formData.signalName as string) || ""}
                        onChange={(e) =>
                          handleChange("signalName", e.target.value)
                        }
                        placeholder="continue-workflow"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="timeout">Timeout</Label>
                    <Input
                      id="timeout"
                      value={(formData.timeout as string) || ""}
                      onChange={(e) => handleChange("timeout", e.target.value)}
                      placeholder="1h, 24h, 7d"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Timeout Action</Label>
                    <Select
                      value={(formData.timeoutAction as string) || "reject"}
                      onValueChange={(value) =>
                        handleChange("timeoutAction", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approve">Auto-approve</SelectItem>
                        <SelectItem value="reject">Auto-reject</SelectItem>
                        <SelectItem value="continue">
                          Continue anyway
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Delay Node */}
              {nodeType === "delayNode" && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={(formData.duration as number) || 1}
                        onChange={(e) =>
                          handleChange(
                            "duration",
                            parseInt(e.target.value) || 1,
                          )
                        }
                        min={1}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Unit</Label>
                      <Select
                        value={(formData.unit as string) || "minutes"}
                        onValueChange={(value) => handleChange("unit", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="seconds">Seconds</SelectItem>
                          <SelectItem value="minutes">Minutes</SelectItem>
                          <SelectItem value="hours">Hours</SelectItem>
                          <SelectItem value="days">Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {/* Parallel Node */}
              {nodeType === "parallelNode" && (
                <>
                  <div className="space-y-2">
                    <Label>Wait For</Label>
                    <Select
                      value={String(formData.waitFor || "all")}
                      onValueChange={(value) =>
                        handleChange(
                          "waitFor",
                          value === "all" || value === "any"
                            ? value
                            : parseInt(value),
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All branches</SelectItem>
                        <SelectItem value="any">Any branch</SelectItem>
                        <SelectItem value="1">At least 1</SelectItem>
                        <SelectItem value="2">At least 2</SelectItem>
                        <SelectItem value="3">At least 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <p className="text-muted-foreground text-xs">
                    Connect each branch handle to the first step of each
                    parallel execution path.
                  </p>
                </>
              )}

              {/* Plugin Node */}
              {nodeType === "pluginNode" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="pluginId">Plugin ID</Label>
                    <Input
                      id="pluginId"
                      value={(formData.pluginId as string) || ""}
                      onChange={(e) => handleChange("pluginId", e.target.value)}
                      placeholder="my-custom-plugin"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="function">Function Name</Label>
                    <Input
                      id="function"
                      value={(formData.function as string) || ""}
                      onChange={(e) => handleChange("function", e.target.value)}
                      placeholder="processData"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pluginInputs">Inputs (JSON)</Label>
                    <Textarea
                      id="pluginInputs"
                      value={JSON.stringify(formData.inputs || {}, null, 2)}
                      onChange={(e) => {
                        try {
                          handleChange("inputs", JSON.parse(e.target.value));
                        } catch {
                          // Keep as string if invalid JSON
                        }
                      }}
                      placeholder='{"data": "$.trigger.data"}'
                      rows={4}
                      className="font-mono text-sm"
                    />
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="advanced" className="mt-4 space-y-4">
              {/* Error Handling */}
              <div className="space-y-2">
                <Label>On Error</Label>
                <Select
                  value={
                    ((formData.onError as Record<string, unknown>)
                      ?.action as string) || "stop"
                  }
                  onValueChange={(value) =>
                    handleNestedChange("onError", "action", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stop">Stop workflow</SelectItem>
                    <SelectItem value="continue">Continue to next</SelectItem>
                    <SelectItem value="retry">Retry step</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {((formData.onError as Record<string, unknown>)
                ?.action as string) === "retry" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="retryCount">Max Retries</Label>
                    <Input
                      id="retryCount"
                      type="number"
                      value={
                        ((formData.onError as Record<string, unknown>)
                          ?.retryCount as number) || 3
                      }
                      onChange={(e) =>
                        handleNestedChange(
                          "onError",
                          "retryCount",
                          parseInt(e.target.value) || 3,
                        )
                      }
                      min={1}
                      max={10}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Backoff Strategy</Label>
                    <Select
                      value={
                        ((formData.onError as Record<string, unknown>)
                          ?.retryBackoff as string) || "exponential"
                      }
                      onValueChange={(value) =>
                        handleNestedChange("onError", "retryBackoff", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linear">Linear</SelectItem>
                        <SelectItem value="exponential">Exponential</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Loop-specific: Max iterations */}
              {nodeType === "loopNode" && (
                <div className="space-y-2">
                  <Label htmlFor="maxIterations">
                    Max Iterations (safety limit)
                  </Label>
                  <Input
                    id="maxIterations"
                    type="number"
                    value={(formData.maxIterations as number) || 1000}
                    onChange={(e) =>
                      handleChange(
                        "maxIterations",
                        parseInt(e.target.value) || 1000,
                      )
                    }
                    min={1}
                  />
                </div>
              )}

              {/* Plugin-specific: Resource limits */}
              {nodeType === "pluginNode" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="timeout">Timeout (ms)</Label>
                    <Input
                      id="timeout"
                      type="number"
                      value={(formData.timeout as number) || 30000}
                      onChange={(e) =>
                        handleChange(
                          "timeout",
                          parseInt(e.target.value) || 30000,
                        )
                      }
                      min={1000}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="memoryLimit">Memory Limit (MB)</Label>
                    <Input
                      id="memoryLimit"
                      type="number"
                      value={(formData.memoryLimit as number) || 128}
                      onChange={(e) =>
                        handleChange(
                          "memoryLimit",
                          parseInt(e.target.value) || 128,
                        )
                      }
                      min={16}
                      max={1024}
                    />
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 border-t pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
