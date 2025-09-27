import React, { memo } from "react";
import {
  MessageCircle,
  Users,
  UserPlus,
  Shield,
  Hash,
  Crown,
  Ban,
  Send,
  Webhook,
} from "lucide-react";
import { Handle, Position } from "reactflow";
import { Badge } from "@/components/ui/badge";
import { useDiscordIntegration } from "@/contexts/IntegrationsContext";

const Icons = {
  MessageCircle,
  Users,
  UserPlus,
  Shield,
  Hash,
  Crown,
  Ban,
  Send,
  Webhook,
};

interface DiscordNodeProps {
  data: {
    label: string;
    description?: string;
    iconName: string;
    integrationId: string;
    config?: Record<string, any>;
    onNodeSelect?: (node: any) => void;
  };
  id: string;
  type: string;
}

export const DiscordNode = memo(({ data, id, type }: DiscordNodeProps) => {
  const { isEnabled } = useDiscordIntegration();
  const IconComponent = data.iconName
    ? (Icons[data.iconName as keyof typeof Icons] as React.ComponentType<{
        className?: string;
      }>)
    : null;

  const handleDiscordAction = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (!isEnabled) {
      console.warn("Discord integration is not enabled");
      return;
    }

    // Here we would execute the Discord action
    console.log(`Executing Discord action: ${data.label}`, data.config);

    // Example action execution (would integrate with your Discord service)
    switch (data.label) {
      case "Send Message":
        console.log("Sending Discord message:", data.config);
        break;
      case "Add Role":
        console.log("Adding Discord role:", data.config);
        break;
      case "Create Channel":
        console.log("Creating Discord channel:", data.config);
        break;
      default:
        console.log("Unknown Discord action:", data.label);
    }
  };

  const handleNodeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (data.onNodeSelect) {
      data.onNodeSelect({ id, data, type });
    }
  };

  const getNodeColor = () => {
    if (!isEnabled) return "bg-gray-100 border-gray-300";

    switch (type) {
      case "triggerNode":
        return "bg-green-50 border-green-200";
      case "actionNode":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-purple-50 border-purple-200";
    }
  };

  const getHandleColor = () => {
    if (!isEnabled) return "#9ca3af";

    switch (type) {
      case "triggerNode":
        return "#10b981";
      case "actionNode":
        return "#3b82f6";
      default:
        return "#8b5cf6";
    }
  };

  const isActionNode = type === "actionNode";
  const isTriggerNode = type === "triggerNode";

  return (
    <div
      className={`relative min-w-[200px] rounded-lg border-2 p-4 shadow-sm transition-all hover:shadow-md ${getNodeColor()}`}
      onClick={handleNodeClick}
    >
      {/* Input handle for action nodes */}
      {isActionNode && (
        <Handle
          type="target"
          position={Position.Left}
          className="!bg-gray-400 !border-2 !border-white !w-3 !h-3"
          style={{ backgroundColor: getHandleColor() }}
        />
      )}

      {/* Output handle for trigger and action nodes */}
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-gray-400 !border-2 !border-white !w-3 !h-3"
        style={{ backgroundColor: getHandleColor() }}
      />

      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              isEnabled
                ? "bg-discord-blurple text-white"
                : "bg-gray-200 text-gray-500"
            }`}
            style={{ backgroundColor: isEnabled ? "#5865F2" : undefined }}
          >
            {IconComponent && <IconComponent className="h-5 w-5" />}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3
              className={`text-sm font-semibold truncate ${
                isEnabled ? "text-gray-900" : "text-gray-500"
              }`}
            >
              {data.label}
            </h3>
            <div className="flex items-center space-x-1 ml-2">
              <Badge variant="outline" className="text-xs">
                Discord
              </Badge>
              {!isEnabled && (
                <Badge variant="secondary" className="text-xs">
                  Disabled
                </Badge>
              )}
            </div>
          </div>

          {data.description && (
            <p
              className={`text-xs mt-1 ${
                isEnabled ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {data.description}
            </p>
          )}

          {/* Configuration preview */}
          {data.config && Object.keys(data.config).length > 0 && (
            <div className="mt-2 space-y-1">
              {Object.entries(data.config)
                .filter(([_, value]) => value && value !== "")
                .slice(0, 2)
                .map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <span
                      className={`text-xs font-medium ${
                        isEnabled ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {key}:
                    </span>
                    <span
                      className={`text-xs truncate max-w-[100px] ${
                        isEnabled ? "text-gray-700" : "text-gray-400"
                      }`}
                    >
                      {String(value)}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Action button for immediate execution */}
      {isActionNode && isEnabled && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={handleDiscordAction}
            className="px-3 py-1 text-xs bg-discord-blurple text-white rounded hover:bg-discord-blurple-dark transition-colors"
            style={{ backgroundColor: "#5865F2" }}
          >
            Execute
          </button>
        </div>
      )}

      {/* Trigger status indicator */}
      {isTriggerNode && (
        <div className="mt-3 flex justify-between items-center">
          <span
            className={`text-xs ${
              isEnabled ? "text-gray-600" : "text-gray-400"
            }`}
          >
            {isEnabled ? "Listening..." : "Inactive"}
          </span>
          <div
            className={`w-2 h-2 rounded-full ${
              isEnabled ? "bg-green-400" : "bg-gray-300"
            }`}
          />
        </div>
      )}

      {/* Warning overlay when disabled */}
      {!isEnabled && (
        <div className="absolute inset-0 bg-gray-100/50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs text-gray-600 font-medium">
              Discord integration disabled
            </p>
            <p className="text-xs text-gray-500 mt-1">Enable in settings</p>
          </div>
        </div>
      )}
    </div>
  );
});

DiscordNode.displayName = "DiscordNode";
