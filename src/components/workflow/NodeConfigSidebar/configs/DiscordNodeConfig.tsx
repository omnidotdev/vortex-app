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

/**
 * Simplified Discord node config - n8n style
 * Hides HTTP implementation details from users
 */
export const DiscordNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  const config = (data.config as Record<string, unknown>) || {};

  const updateConfig = (key: string, value: unknown) => {
    onChange("config", { ...config, [key]: value });
  };

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
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={(config.message as string) || ""}
                onChange={(e) => updateConfig("message", e.target.value)}
                placeholder="Hello from Vortex!"
                rows={3}
              />
              <p className="text-muted-foreground text-xs">
                Use {"{{variable}}"} for dynamic values from previous steps
              </p>
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
              <Label htmlFor="embedDescription">Description</Label>
              <Textarea
                id="embedDescription"
                value={(config.embedDescription as string) || ""}
                onChange={(e) =>
                  updateConfig("embedDescription", e.target.value)
                }
                placeholder="Your message content here..."
                rows={3}
              />
              <p className="text-muted-foreground text-xs">
                Use {"{{variable}}"} for dynamic values from previous steps
              </p>
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
