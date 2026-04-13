import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { JsonField } from "../fields/JsonField";

import type { NodeConfigProps } from "./types";

export const MCPNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What does this MCP tool do?"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="serverId">Server ID</Label>
        <Input
          id="serverId"
          value={(data.serverId as string) || ""}
          onChange={(e) => onChange("serverId", e.target.value)}
          placeholder="mcp-server-id"
        />
        <p className="text-muted-foreground text-xs">
          The ID of the MCP server to connect to
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="serverName">Server Name</Label>
        <Input
          id="serverName"
          value={(data.serverName as string) || ""}
          onChange={(e) => onChange("serverName", e.target.value)}
          placeholder="Slack, GitHub, etc."
        />
        <p className="text-muted-foreground text-xs">
          Display name for the MCP server
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tool">Tool Name</Label>
        <Input
          id="tool"
          value={(data.tool as string) || ""}
          onChange={(e) => onChange("tool", e.target.value)}
          placeholder="send_message"
        />
        <p className="text-muted-foreground text-xs">
          The MCP tool to invoke on the server
        </p>
      </div>

      <JsonField
        id="mcpInputs"
        label="Inputs (JSON)"
        value={(data.inputs as Record<string, unknown>) || {}}
        onChange={(val) => onChange("inputs", val)}
        placeholder='{"channel": "#general", "message": "$.trigger.text"}'
      />
    </>
  );
};
