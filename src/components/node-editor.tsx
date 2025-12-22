"use client";

import { useCallback, useEffect, useState } from "react";

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
import { Textarea } from "@/components/ui/textarea";
import { NodeTypes } from "@/lib/schema";

interface NodeEditorProps {
  node: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (nodeId: string, data: any) => void;
}

export function NodeEditor({
  node,
  isOpen,
  onClose,
  onUpdate,
}: NodeEditorProps) {
  const [httpMethod, setHttpMethod] = useState<string>("GET");

  useEffect(() => {
    if (node?.data?.config?.method) {
      setHttpMethod(node.data.config.method);
    }
  }, [node]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        ...node.data,
        label: formData.get("label"),
        description: formData.get("description"),
        config: {
          ...(node.data.config || {}),
          // Add specific config fields based on node type
          ...(node.type === NodeTypes.TRIGGER
            ? { event: formData.get("event") }
            : node.data.label === "HTTP Call"
              ? {
                  url: formData.get("url"),
                  method: httpMethod,
                  body: (() => {
                    const bodyText = formData.get("body") as string;
                    if (!bodyText?.trim()) return undefined;
                    try {
                      return JSON.parse(bodyText);
                    } catch {
                      return bodyText; // Use as string if JSON parsing fails
                    }
                  })(),
                  headers: (() => {
                    const headersText = formData.get("headers") as string;
                    if (!headersText?.trim()) return {};
                    try {
                      return JSON.parse(headersText);
                    } catch {
                      return {}; // Default to empty object if JSON parsing fails
                    }
                  })(),
                }
              : { action: formData.get("action") }),
        },
      };
      onUpdate(node.id, data);
      onClose();
    },
    [node, onClose, onUpdate, httpMethod],
  );

  if (!node) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-100">
        <SheetHeader>
          <SheetTitle>Edit {node.data.label}</SheetTitle>
          <SheetDescription>
            Make changes to your node configuration here.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              name="label"
              defaultValue={node.data.label}
              placeholder="Enter node label"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={node.data.description}
              placeholder="Enter node description"
            />
          </div>

          {node.type === NodeTypes.TRIGGER && (
            <div className="space-y-2">
              <Label htmlFor="event">Event Name</Label>
              <Input
                id="event"
                name="event"
                defaultValue={node.data.config?.event}
                placeholder="Enter event name"
              />
            </div>
          )}

          {node.type === NodeTypes.ACTION &&
            node.data.label === "HTTP Call" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    name="url"
                    defaultValue={node.data.config?.url}
                    placeholder="https://api.example.com/endpoint"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="method">HTTP Method</Label>
                  <Select value={httpMethod} onValueChange={setHttpMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select HTTP method" />
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

                <div className="space-y-2">
                  <Label htmlFor="headers">Headers (JSON)</Label>
                  <Textarea
                    id="headers"
                    name="headers"
                    defaultValue={JSON.stringify(
                      node.data.config?.headers || {},
                      null,
                      2,
                    )}
                    placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="body">Request Body (JSON)</Label>
                  <Textarea
                    id="body"
                    name="body"
                    defaultValue={JSON.stringify(
                      node.data.config?.body || {},
                      null,
                      2,
                    )}
                    placeholder='{"key": "value"}'
                    rows={4}
                  />
                </div>
              </>
            )}

          {node.type === NodeTypes.ACTION &&
            node.data.label !== "HTTP Call" && (
              <div className="space-y-2">
                <Label htmlFor="action">Action Name</Label>
                <Input
                  id="action"
                  name="action"
                  defaultValue={node.data.config?.action}
                  placeholder="Enter action name"
                />
              </div>
            )}

          <div className="flex justify-end gap-2 pt-4">
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
