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
 * Simplified Slack node config - n8n style
 * Hides HTTP implementation details from users
 */
export const SlackNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  const config = (data.config as Record<string, unknown>) || {};

  const updateConfig = (key: string, value: unknown) => {
    onChange("config", { ...config, [key]: value });
  };

  const messageType = (config.messageType as string) || "simple";

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this Slack message do?"
          rows={2}
        />
      </div>

      <div className="space-y-4 border-t pt-4">
        <h4 className="font-medium text-sm">Slack Settings</h4>

        <div className="space-y-2">
          <Label htmlFor="webhookUrl">Webhook URL</Label>
          <Input
            id="webhookUrl"
            type="url"
            value={(config.webhookUrl as string) || ""}
            onChange={(e) => updateConfig("webhookUrl", e.target.value)}
            placeholder="https://hooks.slack.com/services/..."
          />
          <p className="text-muted-foreground text-xs">
            Create an Incoming Webhook in your Slack workspace settings
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="messageType">Message Type</Label>
          <Select
            value={messageType}
            onValueChange={(value) => updateConfig("messageType", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="simple">Simple Text</SelectItem>
              <SelectItem value="blocks">Rich Message (Blocks)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {messageType === "simple" ? (
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
              Use {"{{variable}}"} for dynamic values. Supports Slack markdown:
              *bold*, _italic_, `code`
            </p>
          </div>
        ) : (
          // Block Kit builder - simplified
          <>
            <div className="space-y-2">
              <Label htmlFor="headerText">Header (optional)</Label>
              <Input
                id="headerText"
                value={(config.headerText as string) || ""}
                onChange={(e) => updateConfig("headerText", e.target.value)}
                placeholder="Notification"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={(config.message as string) || ""}
                onChange={(e) => updateConfig("message", e.target.value)}
                placeholder="Your message content here..."
                rows={3}
              />
              <p className="text-muted-foreground text-xs">
                Use {"{{variable}}"} for dynamic values
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contextText">Context (optional)</Label>
              <Input
                id="contextText"
                value={(config.contextText as string) || ""}
                onChange={(e) => updateConfig("contextText", e.target.value)}
                placeholder="Sent by Vortex"
              />
              <p className="text-muted-foreground text-xs">
                Small text shown below the message
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Accent Color</Label>
              <Select
                value={(config.color as string) || "none"}
                onValueChange={(value) => updateConfig("color", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="good">Green (Success)</SelectItem>
                  <SelectItem value="warning">Yellow (Warning)</SelectItem>
                  <SelectItem value="danger">Red (Error)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="channel">Channel Override (optional)</Label>
          <Input
            id="channel"
            value={(config.channel as string) || ""}
            onChange={(e) => updateConfig("channel", e.target.value)}
            placeholder="#general"
          />
          <p className="text-muted-foreground text-xs">
            Override the default channel set in the webhook
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
          <Label htmlFor="iconEmoji">Icon Emoji (optional)</Label>
          <Input
            id="iconEmoji"
            value={(config.iconEmoji as string) || ""}
            onChange={(e) => updateConfig("iconEmoji", e.target.value)}
            placeholder=":robot_face:"
          />
        </div>
      </div>
    </>
  );
};
