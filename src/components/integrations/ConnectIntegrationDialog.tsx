import { Collapsible } from "@ark-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Eye,
  EyeOff,
  Info,
  Loader2,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateIntegrationMutation,
  useCreateMcpServerMutation,
} from "@/generated/graphql";
import { API_BASE_URL } from "@/lib/config/env.config";
import { integrationsOptions } from "@/lib/options/integrations.options";

import type { IntegrationDefinitionsQuery } from "@/generated/graphql";

type IntegrationDefinition = NonNullable<
  IntegrationDefinitionsQuery["integrationDefinitions"]
>["nodes"][number];

interface AuthFieldSchema {
  type: "string" | "text" | "json";
  label: string;
  description?: string;
  placeholder?: string;
  secret?: boolean;
  required?: boolean;
  helpUrl?: string;
}

interface ConnectIntegrationDialogProps {
  definition: IntegrationDefinition;
  organizationId: string;
  onClose: () => void;
}

export function ConnectIntegrationDialog({
  definition,
  organizationId,
  onClose,
}: ConnectIntegrationDialogProps) {
  const queryClient = useQueryClient();
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [jsonErrors, setJsonErrors] = useState<Record<string, string | null>>(
    {},
  );
  const [instructionsOpen, setInstructionsOpen] = useState(true);

  const createMcpServer = useCreateMcpServerMutation();
  const createIntegration = useCreateIntegrationMutation();

  const authFields = (definition.authFields || {}) as Record<
    string,
    AuthFieldSchema
  >;

  // Type-safe access to new fields (may be undefined until types are regenerated)
  const setupSteps = (definition as { setupSteps?: string[] }).setupSteps;
  const docsUrl = (definition as { docsUrl?: string }).docsUrl;
  const supportsOAuth = (definition as { supportsOauth?: boolean })
    .supportsOauth;

  const isSubmitting = createMcpServer.isPending || createIntegration.isPending;

  const validateJson = (value: string): string | null => {
    if (!value.trim()) return null;
    try {
      JSON.parse(value);
      return null;
    } catch {
      return "Invalid JSON format";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate all JSON fields before submission
    const jsonFieldErrors: Record<string, string | null> = {};
    for (const [fieldName, field] of Object.entries(authFields)) {
      if (field.type === "json" && credentials[fieldName]) {
        const error = validateJson(credentials[fieldName]);
        if (error) {
          jsonFieldErrors[fieldName] = error;
        }
      }
    }

    if (Object.values(jsonFieldErrors).some((err) => err !== null)) {
      setJsonErrors(jsonFieldErrors);
      setError("Please fix the JSON errors before submitting");
      return;
    }

    try {
      // First create the MCP server
      const mcpResult = await createMcpServer.mutateAsync({
        input: {
          mcpServer: {
            organizationId,
            name: definition.name,
            type: definition.id,
            command: "npx",
            args: ["-y", definition.id] as unknown as Record<string, unknown>, // MCP args
            env: credentials as unknown as Record<string, unknown>, // Pass credentials as env vars
            isEnabled: true,
          },
        },
      });

      const mcpServerId = mcpResult.createMcpServer?.mcpServer?.rowId;
      if (!mcpServerId) {
        throw new Error("Failed to create MCP server");
      }

      // Then create the integration linked to the MCP server
      await createIntegration.mutateAsync({
        input: {
          integration: {
            organizationId,
            name: definition.name,
            type: definition.rowId,
            isEnabled: true,
            config: {}, // Credentials are stored in MCP server env
            mcpServerId,
            definitionId: definition.rowId,
          },
        },
      });

      // Invalidate queries to refresh the list
      await queryClient.invalidateQueries({
        queryKey: integrationsOptions({ organizationId }).queryKey,
      });

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect");
    }
  };

  const toggleShowSecret = (field: string) => {
    setShowSecrets((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <DialogRoot open onOpenChange={(e) => !e.open && onClose()}>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {definition.iconUrl && (
                <img
                  src={definition.iconUrl}
                  alt=""
                  className="h-6 w-6"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
              Connect {definition.name}
            </DialogTitle>
            <DialogDescription>
              Enter your credentials to connect this integration.
            </DialogDescription>
          </DialogHeader>
          <DialogCloseTrigger />

          {/* OAuth Connect Section */}
          {supportsOAuth && (
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-md border bg-muted/30 p-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">Quick Connect</span>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    // Get provider ID from definition
                    const provider = definition.rowId;
                    const params = new URLSearchParams({
                      organizationId,
                      definitionId: definition.rowId,
                      returnUrl: window.location.href,
                    });
                    window.location.href = `${API_BASE_URL}/api/v1/oauth/${provider}/authorize?${params}`;
                  }}
                >
                  Connect with OAuth
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-border" />
                <span className="text-muted-foreground text-xs">
                  or enter credentials manually
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
            </div>
          )}

          {/* Setup Instructions */}
          {setupSteps && setupSteps.length > 0 && (
            <Collapsible.Root
              open={instructionsOpen}
              onOpenChange={(details) => setInstructionsOpen(details.open)}
            >
              <Collapsible.Trigger className="flex w-full cursor-pointer items-center gap-2 rounded-md bg-muted/50 p-3 text-left font-medium text-sm hover:bg-muted">
                {instructionsOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                Setup Instructions
              </Collapsible.Trigger>
              <Collapsible.Content>
                <div className="rounded-b-md border border-t-0 bg-background p-3">
                  <ol className="ml-4 list-decimal space-y-1.5 text-muted-foreground text-sm">
                    {setupSteps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                  {docsUrl && (
                    <a
                      href={docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex cursor-pointer items-center gap-1 text-primary text-sm hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Open {definition.name} Developer Portal
                    </a>
                  )}
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 overflow-hidden">
            {Object.entries(authFields).map(([fieldName, field]) => (
              <div key={fieldName} className="space-y-2">
                <Label htmlFor={fieldName}>
                  {field.label}
                  {field.required && (
                    <span className="ml-1 text-destructive">*</span>
                  )}
                </Label>

                {field.type === "json" || field.type === "text" ? (
                  <>
                    <Textarea
                      id={fieldName}
                      value={credentials[fieldName] || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        setCredentials((prev) => ({
                          ...prev,
                          [fieldName]: value,
                        }));
                        // Validate JSON on change for json fields
                        if (field.type === "json") {
                          setJsonErrors((prev) => ({
                            ...prev,
                            [fieldName]: validateJson(value),
                          }));
                        }
                      }}
                      onBlur={(e) => {
                        // Re-validate on blur for json fields
                        if (field.type === "json") {
                          setJsonErrors((prev) => ({
                            ...prev,
                            [fieldName]: validateJson(e.target.value),
                          }));
                        }
                      }}
                      placeholder={field.placeholder}
                      required={field.required}
                      rows={6}
                      className={`w-full font-mono text-sm ${
                        jsonErrors[fieldName]
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }`}
                    />
                    {jsonErrors[fieldName] && (
                      <p className="text-destructive text-xs">
                        {jsonErrors[fieldName]}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="relative w-full">
                    <Input
                      id={fieldName}
                      type={
                        field.secret && !showSecrets[fieldName]
                          ? "password"
                          : "text"
                      }
                      value={credentials[fieldName] || ""}
                      onChange={(e) =>
                        setCredentials((prev) => ({
                          ...prev,
                          [fieldName]: e.target.value,
                        }))
                      }
                      placeholder={field.placeholder}
                      required={field.required}
                      className={`w-full ${field.secret ? "pr-10" : ""}`}
                    />
                    {field.secret && (
                      <button
                        type="button"
                        onClick={() => toggleShowSecret(fieldName)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showSecrets[fieldName] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>
                )}

                {field.description && (
                  <p className="text-muted-foreground text-xs">
                    {field.description}
                  </p>
                )}
              </div>
            ))}

            {error && (
              <div className="wrap-break-word overflow-hidden rounded-md bg-destructive/10 p-3 text-destructive text-sm">
                {error}
              </div>
            )}

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Connect
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}
