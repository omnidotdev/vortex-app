import { useCallback, useRef } from "react";

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

import type { NodeConfigProps } from "./types";

/**
 * Simplified Discord node config
 * Hides HTTP implementation details from users
 */
export const DiscordNodeConfig = ({
  data,
  onChange,
  nodeId,
  allNodes = [],
}: NodeConfigProps) => {
  const config = (data.config as Record<string, unknown>) || {};
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const embedDescRef = useRef<HTMLTextAreaElement>(null);

  const updateConfig = useCallback(
    (key: string, value: unknown) => {
      onChange("config", { ...config, [key]: value });
    },
    [config, onChange],
  );

  // Insert variable at cursor position
  const handleInsertVariable = useCallback(
    (variable: string, _displayName: string, field: "message" | "embed") => {
      const ref = field === "message" ? messageRef : embedDescRef;
      const configKey = field === "message" ? "message" : "embedDescription";
      const textarea = ref.current;
      const currentValue = (config[configKey] as string) || "";

      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newValue =
          currentValue.substring(0, start) +
          variable +
          currentValue.substring(end);
        updateConfig(configKey, newValue);

        // Restore cursor position after the inserted variable
        setTimeout(() => {
          textarea.focus();
          const newCursorPos = start + variable.length;
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
      } else {
        updateConfig(configKey, currentValue + variable);
      }
    },
    [config, updateConfig],
  );

  // Determine if this is an embed or simple message
  const isEmbed = data.preset === "discord-embed";

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this Discord message do?"
          rows={2}
        />
      </div>

      <div className="space-y-4 border-t pt-4">
        <h4 className="font-medium text-sm">Discord Settings</h4>

        <div className="space-y-2">
          <Label htmlFor="webhookUrl">Webhook URL</Label>
          <Input
            id="webhookUrl"
            type="url"
            value={(config.webhookUrl as string) || ""}
            onChange={(e) => updateConfig("webhookUrl", e.target.value)}
            placeholder="https://discord.com/api/webhooks/..."
          />
          <p className="text-muted-foreground text-xs">
            Create a webhook in your Discord server settings → Integrations →
            Webhooks
          </p>
        </div>

        {!isEmbed ? (
          // Simple message
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="message">Message</Label>
                <VariablePicker
                  nodes={allNodes}
                  currentNodeId={nodeId}
                  onSelect={(variable, displayName) =>
                    handleInsertVariable(variable, displayName, "message")
                  }
                />
              </div>
              <Textarea
                ref={messageRef}
                id="message"
                value={(config.message as string) || ""}
                onChange={(e) => updateConfig("message", e.target.value)}
                placeholder="Hello from Vortex!"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Bot Username (optional)</Label>
              <Input
                id="username"
                value={(config.username as string) || ""}
                onChange={(e) => updateConfig("username", e.target.value)}
                placeholder="Vortex Bot"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatarUrl">Avatar URL (optional)</Label>
              <Input
                id="avatarUrl"
                type="url"
                value={(config.avatarUrl as string) || ""}
                onChange={(e) => updateConfig("avatarUrl", e.target.value)}
                placeholder="https://example.com/avatar.png"
              />
            </div>
          </>
        ) : (
          // Rich embed
          <>
            <div className="space-y-2">
              <Label htmlFor="embedTitle">Title</Label>
              <Input
                id="embedTitle"
                value={(config.embedTitle as string) || ""}
                onChange={(e) => updateConfig("embedTitle", e.target.value)}
                placeholder="Notification"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="embedDescription">Description</Label>
                <VariablePicker
                  nodes={allNodes}
                  currentNodeId={nodeId}
                  onSelect={(variable, displayName) =>
                    handleInsertVariable(variable, displayName, "embed")
                  }
                />
              </div>
              <Textarea
                ref={embedDescRef}
                id="embedDescription"
                value={(config.embedDescription as string) || ""}
                onChange={(e) =>
                  updateConfig("embedDescription", e.target.value)
                }
                placeholder="Your message content here..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="embedColor">Color</Label>
              <Select
                value={(config.embedColor as string) || "blue"}
                onValueChange={(value) => updateConfig("embedColor", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="green">Green (Success)</SelectItem>
                  <SelectItem value="red">Red (Error)</SelectItem>
                  <SelectItem value="yellow">Yellow (Warning)</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="gray">Gray</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="embedFooter">Footer (optional)</Label>
              <Input
                id="embedFooter"
                value={(config.embedFooter as string) || ""}
                onChange={(e) => updateConfig("embedFooter", e.target.value)}
                placeholder="Powered by Vortex"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="embedUrl">URL (optional)</Label>
              <Input
                id="embedUrl"
                type="url"
                value={(config.embedUrl as string) || ""}
                onChange={(e) => updateConfig("embedUrl", e.target.value)}
                placeholder="https://example.com"
              />
              <p className="text-muted-foreground text-xs">
                Makes the title a clickable link
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
