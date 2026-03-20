import { useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Eye, EyeOff, Loader2, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
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
import { useCreateIntegrationMutation } from "@/generated/graphql";
import { API_BASE_URL } from "@/lib/config/env.config";
import { integrationsOptions } from "@/lib/options/integrations.options";

import type {
  IntegrationDefinitionsQuery,
  IntegrationsQuery,
} from "@/generated/graphql";

type IntegrationDefinition = NonNullable<
  IntegrationDefinitionsQuery["integrationDefinitions"]
>["nodes"][number];

type Integration = NonNullable<
  IntegrationsQuery["integrations"]
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
  /** Existing integrations of this type for multi-account support */
  existingIntegrations?: Integration[];
  /** URL to return to after successful connection (e.g., workflow editor) */
  returnTo?: string;
  onClose: () => void;
  /** Called when user wants to configure an existing integration */
  onConfigureExisting?: (integration: Integration) => void;
}

export function ConnectIntegrationDialog({
  definition,
  organizationId,
  existingIntegrations = [],
  returnTo,
  onClose,
  onConfigureExisting,
}: ConnectIntegrationDialogProps) {
  const queryClient = useQueryClient();
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [jsonErrors, setJsonErrors] = useState<Record<string, string | null>>(
    {},
  );
  const [connectionName, setConnectionName] = useState("");

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

  const isSubmitting = createIntegration.isPending;

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
      // Generate a name: use custom name, or default with account number for multi-account
      const integrationName =
        connectionName.trim() ||
        (existingIntegrations.length > 0
          ? `${definition.name} (${existingIntegrations.length + 1})`
          : definition.name);

      // Create the integration with credentials stored in config
      // Use rowId (e.g., "twilio") for type, not the Relay Node ID
      await createIntegration.mutateAsync({
        input: {
          integration: {
            organizationId,
            name: integrationName,
            type: definition.rowId,
            isEnabled: true,
            config: credentials as unknown as Record<string, unknown>,
            definitionId: definition.rowId,
          },
        },
      });

      // Invalidate queries to refresh the list
      await queryClient.invalidateQueries({
        queryKey: integrationsOptions({ organizationId }).queryKey,
      });

      // Close dialog and show success toast
      onClose();
      toast.success(`${definition.name} connected`, {
        description: "Your integration is ready to use.",
        action: returnTo
          ? {
              label: "Back to workflow",
              onClick: () => {
                window.location.href = returnTo;
              },
            }
          : undefined,
        duration: 5000,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (
        message.includes("Unauthorized") ||
        message.includes("UNAUTHORIZED")
      ) {
        setError(
          "You don't have permission to create integrations. Admin or owner role is required.",
        );
      } else {
        setError(message || "Failed to connect");
      }
    }
  };

  const toggleShowSecret = (field: string) => {
    setShowSecrets((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <DialogRoot open onOpenChange={(e) => !e.open && onClose()}>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent className="flex max-h-[85vh] max-w-lg flex-col overflow-hidden">
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
              {existingIntegrations.length > 0
                ? `Add another ${definition.name} account or manage existing connections.`
                : "Enter your credentials to connect this integration."}
            </DialogDescription>
          </DialogHeader>
          <DialogCloseTrigger />

          <form
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            <div className="flex-1 space-y-4 overflow-y-auto px-1 pb-4">
              {/* Existing Integrations Section */}
              {existingIntegrations.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                    Connected Accounts
                  </Label>
                  <div className="space-y-2">
                    {existingIntegrations.map((integration) => (
                      <button
                        key={integration.rowId}
                        type="button"
                        onClick={() => onConfigureExisting?.(integration)}
                        className="flex w-full items-center justify-between rounded-md border p-3 text-left transition-colors hover:bg-accent"
                      >
                        <div className="flex items-center gap-3">
                          {definition.iconUrl ? (
                            <img
                              src={definition.iconUrl}
                              alt=""
                              className="h-8 w-8 rounded bg-white p-1 dark:bg-slate-700"
                            />
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-muted font-medium text-muted-foreground text-sm">
                              {integration.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-sm">
                              {integration.name}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {integration.isEnabled ? "Active" : "Inactive"}
                            </p>
                          </div>
                        </div>
                        <span className="text-muted-foreground text-xs">
                          Configure →
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-muted-foreground text-xs">
                      Add another account
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                </div>
              )}

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
                <AccordionRoot
                  defaultValue={
                    existingIntegrations.length === 0 ? ["instructions"] : []
                  }
                  collapsible
                  className="rounded-md border"
                >
                  <AccordionItem value="instructions" className="border-none">
                    <AccordionItemTrigger className="border-b bg-muted/50 px-3 py-3 hover:bg-muted">
                      Setup Instructions
                    </AccordionItemTrigger>
                    <AccordionItemContent className="bg-background p-0">
                      <ol className="ml-4 list-decimal space-y-1.5 p-3 text-muted-foreground text-sm">
                        {setupSteps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                      {docsUrl && (
                        <a
                          href={docsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex cursor-pointer items-center gap-1 px-3 pb-3 text-primary text-sm hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Open {definition.name} Developer Portal
                        </a>
                      )}
                    </AccordionItemContent>
                  </AccordionItem>
                </AccordionRoot>
              )}

              {/* Connection Name (optional, auto-fills) */}
              <div className="space-y-2">
                <Label htmlFor="connectionName">Connection Name</Label>
                <Input
                  id="connectionName"
                  value={connectionName}
                  onChange={(e) => setConnectionName(e.target.value)}
                  placeholder={
                    existingIntegrations.length > 0
                      ? `${definition.name} (${existingIntegrations.length + 1})`
                      : definition.name
                  }
                />
                <p className="text-muted-foreground text-xs">
                  Leave blank to use the default name
                </p>
              </div>

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
                <div className="break-words rounded-md bg-destructive/10 p-3 text-destructive text-sm">
                  {error}
                </div>
              )}
            </div>

            <DialogFooter className="shrink-0 pt-4">
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
