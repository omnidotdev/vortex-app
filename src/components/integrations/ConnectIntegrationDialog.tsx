import { useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2 } from "lucide-react";
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
}

interface ConnectIntegrationDialogProps {
  definition: IntegrationDefinition;
  workspaceId: string;
  onClose: () => void;
}

export function ConnectIntegrationDialog({
  definition,
  workspaceId,
  onClose,
}: ConnectIntegrationDialogProps) {
  const queryClient = useQueryClient();
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  const createMcpServer = useCreateMcpServerMutation();
  const createIntegration = useCreateIntegrationMutation();

  const authFields = (definition.authFields || {}) as Record<
    string,
    AuthFieldSchema
  >;

  const isSubmitting = createMcpServer.isPending || createIntegration.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // First create the MCP server
      const mcpResult = await createMcpServer.mutateAsync({
        input: {
          mcpServer: {
            workspaceId,
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
            workspaceId,
            name: definition.name,
            type: definition.id,
            isEnabled: true,
            config: {}, // Credentials are stored in MCP server env
            mcpServerId,
            definitionId: definition.id,
          },
        },
      });

      // Invalidate queries to refresh the list
      await queryClient.invalidateQueries({
        queryKey: integrationsOptions({ workspaceId }).queryKey,
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Connect {definition.name}</DialogTitle>
            <DialogDescription>
              Enter your credentials to connect this integration.
            </DialogDescription>
          </DialogHeader>
          <DialogCloseTrigger />

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
                  <Textarea
                    id={fieldName}
                    value={credentials[fieldName] || ""}
                    onChange={(e) =>
                      setCredentials((prev) => ({
                        ...prev,
                        [fieldName]: e.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={4}
                    className="w-full font-mono text-sm"
                  />
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
              <div className="overflow-hidden rounded-md bg-destructive/10 p-3 text-destructive text-sm break-words">
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
