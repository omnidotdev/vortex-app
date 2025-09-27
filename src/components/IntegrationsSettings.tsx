"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Settings,
  MessageCircle,
  Linkedin,
  Slack,
  FileText,
  Check,
  X,
  Eye,
  EyeOff,
  ExternalLink,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { useIntegrations } from "@/contexts/IntegrationsContext";
import { toast } from "sonner";

const integrationIcons = {
  MessageCircle,
  Linkedin,
  Slack,
  FileText,
};

interface IntegrationsSettingsProps {
  trigger?: React.ReactNode;
}

export function IntegrationsSettings({ trigger }: IntegrationsSettingsProps) {
  const {
    integrations,
    updateIntegration,
    isIntegrationEnabled,
    setIntegrationToken,
    removeIntegration,
  } = useIntegrations();

  const [activeIntegration, setActiveIntegration] = useState<string>("discord");
  const [showTokens, setShowTokens] = useState<Record<string, boolean>>({});
  const [pendingTokens, setPendingTokens] = useState<Record<string, string>>(
    {},
  );

  const handleTokenChange = (integrationId: string, value: string) => {
    setPendingTokens((prev) => ({
      ...prev,
      [integrationId]: value,
    }));
  };

  const handleSaveToken = (integrationId: string) => {
    const token = pendingTokens[integrationId];
    if (token?.trim()) {
      setIntegrationToken(integrationId, token.trim());
      setPendingTokens((prev) => {
        const updated = { ...prev };
        delete updated[integrationId];
        return updated;
      });
      toast.success(
        `${integrations.find((i) => i.id === integrationId)?.displayName} token saved successfully`,
      );
    }
  };

  const handleRemoveIntegration = (integrationId: string) => {
    removeIntegration(integrationId);
    setPendingTokens((prev) => {
      const updated = { ...prev };
      delete updated[integrationId];
      return updated;
    });
    toast.success(
      `${integrations.find((i) => i.id === integrationId)?.displayName} integration removed`,
    );
  };

  const toggleTokenVisibility = (integrationId: string) => {
    setShowTokens((prev) => ({
      ...prev,
      [integrationId]: !prev[integrationId],
    }));
  };

  const getTokenValue = (integration: any) => {
    const pendingToken = pendingTokens[integration.id];
    if (pendingToken !== undefined) return pendingToken;

    switch (integration.id) {
      case "discord":
        return integration.config?.botToken || "";
      case "linkedin":
        return integration.config?.accessToken || "";
      case "slack":
        return integration.config?.botToken || "";
      case "notion":
        return integration.config?.token || "";
      default:
        return integration.config?.token || "";
    }
  };

  const getTokenPlaceholder = (integrationId: string) => {
    switch (integrationId) {
      case "discord":
        return "Bot Token (e.g., MTk4NjIyNDgzNDcxOTI1MjQ4.Cl2FMQ.ZnCjm1XVW7vRze4b7Cq4se7kKWs)";
      case "linkedin":
        return "Access Token";
      case "slack":
        return "Bot User OAuth Token (xoxb-...)";
      case "notion":
        return "Integration Token (secret_...)";
      default:
        return "Enter token";
    }
  };

  const getSetupInstructions = (integrationId: string) => {
    switch (integrationId) {
      case "discord":
        return {
          title: "Discord Bot Setup",
          steps: [
            "Go to Discord Developer Portal",
            "Create a new Application",
            "Go to Bot section and create a bot",
            "Copy the Bot Token",
            "Enable required intents (Message Content Intent, etc.)",
          ],
          link: "https://discord.com/developers/applications",
        };
      case "linkedin":
        return {
          title: "LinkedIn API Setup",
          steps: [
            "Create a LinkedIn Developer account",
            "Create a new app",
            "Configure OAuth 2.0 settings",
            "Get your access token",
          ],
          link: "https://developer.linkedin.com/",
        };
      case "slack":
        return {
          title: "Slack App Setup",
          steps: [
            "Go to Slack API dashboard",
            "Create a new Slack app",
            "Add OAuth scopes (chat:write, channels:read, etc.)",
            "Install app to workspace",
            "Copy Bot User OAuth Token",
          ],
          link: "https://api.slack.com/apps",
        };
      case "notion":
        return {
          title: "Notion Integration Setup",
          steps: [
            "Go to Notion Integrations",
            "Create a new integration",
            "Copy the Internal Integration Token",
            "Share your database with the integration",
          ],
          link: "https://www.notion.so/my-integrations",
        };
      default:
        return { title: "", steps: [], link: "" };
    }
  };

  const defaultTrigger = (
    <Button variant="outline" size="sm">
      <Settings className="w-4 h-4 mr-2" />
      Integrations
    </Button>
  );

  const currentIntegration = integrations.find(
    (i) => i.id === activeIntegration,
  );
  const setupInstructions = currentIntegration
    ? getSetupInstructions(currentIntegration.id)
    : null;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Integration Settings</DialogTitle>
          <DialogDescription>
            Connect external services to enhance your workflows
          </DialogDescription>
        </DialogHeader>

        <div className="flex h-[600px] gap-4">
          {/* Sidebar */}
          <div className="w-64 border-r pr-4">
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {integrations.map((integration) => {
                  const IconComponent =
                    integrationIcons[
                      integration.icon as keyof typeof integrationIcons
                    ];
                  const isEnabled = isIntegrationEnabled(integration.id);

                  return (
                    <div
                      key={integration.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        activeIntegration === integration.id
                          ? "bg-primary/10 border-primary/20 border"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => setActiveIntegration(integration.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          {IconComponent && (
                            <IconComponent className="w-5 h-5" />
                          )}
                          <div
                            className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                              isEnabled ? "bg-green-500" : "bg-gray-400"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {integration.displayName}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant={isEnabled ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {isEnabled ? "Connected" : "Not Connected"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {currentIntegration && (
              <div className="h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  {(() => {
                    const IconComponent =
                      integrationIcons[
                        currentIntegration.icon as keyof typeof integrationIcons
                      ];
                    return IconComponent ? (
                      <IconComponent className="w-6 h-6" />
                    ) : null;
                  })()}
                  <div>
                    <h3 className="text-lg font-semibold">
                      {currentIntegration.displayName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {currentIntegration.description}
                    </p>
                  </div>
                </div>

                <ScrollArea className="flex-1">
                  <div className="space-y-6">
                    {/* Configuration Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Configuration
                        </CardTitle>
                        <CardDescription>
                          Configure your {currentIntegration.displayName}{" "}
                          integration
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`${currentIntegration.id}-token`}>
                            Token
                          </Label>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Input
                                id={`${currentIntegration.id}-token`}
                                type={
                                  showTokens[currentIntegration.id]
                                    ? "text"
                                    : "password"
                                }
                                placeholder={getTokenPlaceholder(
                                  currentIntegration.id,
                                )}
                                value={getTokenValue(currentIntegration)}
                                onChange={(e) =>
                                  handleTokenChange(
                                    currentIntegration.id,
                                    e.target.value,
                                  )
                                }
                                className="pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() =>
                                  toggleTokenVisibility(currentIntegration.id)
                                }
                              >
                                {showTokens[currentIntegration.id] ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                            <Button
                              onClick={() =>
                                handleSaveToken(currentIntegration.id)
                              }
                              disabled={
                                !pendingTokens[currentIntegration.id]?.trim()
                              }
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Enable Integration</Label>
                            <div className="text-sm text-muted-foreground">
                              Allow workflows to use this integration
                            </div>
                          </div>
                          <Switch
                            checked={isIntegrationEnabled(
                              currentIntegration.id,
                            )}
                            onCheckedChange={(checked) => {
                              updateIntegration(currentIntegration.id, {
                                isEnabled: checked,
                              });
                            }}
                          />
                        </div>

                        <Separator />

                        <div className="flex gap-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              handleRemoveIntegration(currentIntegration.id)
                            }
                            disabled={
                              !isIntegrationEnabled(currentIntegration.id)
                            }
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove Integration
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Setup Instructions */}
                    {setupInstructions && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {setupInstructions.title}
                          </CardTitle>
                          <CardDescription>
                            Follow these steps to set up your integration
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <ol className="space-y-2">
                            {setupInstructions.steps.map((step, index) => (
                              <li key={index} className="flex gap-2 text-sm">
                                <span className="font-medium text-primary">
                                  {index + 1}.
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                          {setupInstructions.link && (
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={setupInstructions.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Open Developer Portal
                              </a>
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    )}

                    {/* Status Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          {isIntegrationEnabled(currentIntegration.id) ? (
                            <>
                              <Check className="w-4 h-4 text-green-500" />
                              <span className="text-green-700">
                                Connected and ready to use
                              </span>
                            </>
                          ) : (
                            <>
                              <X className="w-4 h-4 text-red-500" />
                              <span className="text-red-700">
                                Not connected
                              </span>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
