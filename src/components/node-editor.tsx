"use client";

import { useCallback, useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
            ? node.data.integrationId === "discord"
              ? {
                  channelId: formData.get("channelId"),
                  guildId: formData.get("guildId"),
                  limit: parseInt(formData.get("limit") as string) || 50,
                }
              : { event: formData.get("event") }
            : node.data.integrationId === "discord"
              ? (() => {
                  const baseConfig = {
                    channelId: formData.get("channelId"),
                    guildId: formData.get("guildId"),
                    message: formData.get("message"),
                    webhookUrl: formData.get("webhookUrl"),
                    content: formData.get("content"),
                    userId: formData.get("userId"),
                    roleId: formData.get("roleId"),
                    name: formData.get("name"),
                    roleName: formData.get("roleName"),
                    reason: formData.get("reason"),
                    search: formData.get("search"),
                  };
                  // Only include non-empty values
                  return Object.fromEntries(
                    Object.entries(baseConfig).filter(
                      ([_, value]) => value && value !== "",
                    ),
                  );
                })()
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
      <SheetContent className="w-[400px]">
        <SheetHeader>
          <SheetTitle>Edit {node.data.label}</SheetTitle>
          <SheetDescription>
            Make changes to your node configuration here.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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

          {/* Discord Integration Fields */}
          {node.data.integrationId === "discord" && (
            <>
              {node.data.label === "New Message" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="channelId">Channel ID</Label>
                    <Input
                      id="channelId"
                      name="channelId"
                      defaultValue={node.data.config?.channelId}
                      placeholder="123456789012345678"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="limit">Message Limit</Label>
                    <Input
                      id="limit"
                      name="limit"
                      type="number"
                      defaultValue={node.data.config?.limit || 50}
                      placeholder="50"
                    />
                  </div>
                </>
              )}

              {node.data.label === "New Member" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="guildId">Guild ID</Label>
                    <Input
                      id="guildId"
                      name="guildId"
                      defaultValue={node.data.config?.guildId}
                      placeholder="123456789012345678"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="limit">Member Limit</Label>
                    <Input
                      id="limit"
                      name="limit"
                      type="number"
                      defaultValue={node.data.config?.limit || 50}
                      placeholder="50"
                    />
                  </div>
                </>
              )}

              {node.data.label === "Send Message" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="channelId">Channel ID</Label>
                    <Input
                      id="channelId"
                      name="channelId"
                      defaultValue={node.data.config?.channelId}
                      placeholder="123456789012345678"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      defaultValue={node.data.config?.message}
                      placeholder="Hello from Vortex!"
                      required
                    />
                  </div>
                </>
              )}

              {node.data.label === "Send Webhook Message" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input
                      id="webhookUrl"
                      name="webhookUrl"
                      defaultValue={node.data.config?.webhookUrl}
                      placeholder="https://discord.com/api/webhooks/..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      name="content"
                      defaultValue={node.data.config?.content}
                      placeholder="Message content"
                      required
                    />
                  </div>
                </>
              )}

              {(node.data.label === "Add Role" ||
                node.data.label === "Remove Role") && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="guildId">Guild ID</Label>
                    <Input
                      id="guildId"
                      name="guildId"
                      defaultValue={node.data.config?.guildId}
                      placeholder="123456789012345678"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userId">User ID</Label>
                    <Input
                      id="userId"
                      name="userId"
                      defaultValue={node.data.config?.userId}
                      placeholder="123456789012345678"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roleId">Role ID</Label>
                    <Input
                      id="roleId"
                      name="roleId"
                      defaultValue={node.data.config?.roleId}
                      placeholder="123456789012345678"
                      required
                    />
                  </div>
                </>
              )}

              {node.data.label === "Create Channel" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="guildId">Guild ID</Label>
                    <Input
                      id="guildId"
                      name="guildId"
                      defaultValue={node.data.config?.guildId}
                      placeholder="123456789012345678"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Channel Name</Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={node.data.config?.name}
                      placeholder="new-channel"
                      required
                    />
                  </div>
                </>
              )}

              {node.data.label === "Create Role" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="guildId">Guild ID</Label>
                    <Input
                      id="guildId"
                      name="guildId"
                      defaultValue={node.data.config?.guildId}
                      placeholder="123456789012345678"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roleName">Role Name</Label>
                    <Input
                      id="roleName"
                      name="roleName"
                      defaultValue={node.data.config?.roleName}
                      placeholder="New Role"
                      required
                    />
                  </div>
                </>
              )}

              {node.data.label === "Ban Member" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="guildId">Guild ID</Label>
                    <Input
                      id="guildId"
                      name="guildId"
                      defaultValue={node.data.config?.guildId}
                      placeholder="123456789012345678"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userId">User ID</Label>
                    <Input
                      id="userId"
                      name="userId"
                      defaultValue={node.data.config?.userId}
                      placeholder="123456789012345678"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason (Optional)</Label>
                    <Input
                      id="reason"
                      name="reason"
                      defaultValue={node.data.config?.reason}
                      placeholder="Violated server rules"
                    />
                  </div>
                </>
              )}

              {node.data.label === "List Members" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="guildId">Guild ID</Label>
                    <Input
                      id="guildId"
                      name="guildId"
                      defaultValue={node.data.config?.guildId}
                      placeholder="123456789012345678"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="search">Search Query</Label>
                    <Input
                      id="search"
                      name="search"
                      defaultValue={node.data.config?.search}
                      placeholder="username"
                      required
                    />
                  </div>
                </>
              )}
            </>
          )}

          {node.type === NodeTypes.TRIGGER && !node.data.integrationId && (
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
