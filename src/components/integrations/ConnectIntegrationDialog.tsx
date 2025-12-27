import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateIntegrationMutation } from "@/generated/graphql";
import useForm from "@/lib/hooks/useForm";
import { integrationsOptions } from "@/lib/options/integrations.options";
import { IntegrationCategoryBadge } from "./IntegrationCategoryBadge";

interface AuthField {
  type: "string" | "text" | "json";
  label: string;
  description?: string;
  placeholder?: string;
  secret?: boolean;
  required?: boolean;
}

interface IntegrationDefinition {
  id: string;
  name: string;
  description?: string | null;
  iconUrl?: string | null;
  category: string;
  authType: string;
  authFields: Record<string, AuthField>;
  keepAlive: boolean;
}

interface ConnectIntegrationDialogProps {
  definition: IntegrationDefinition | null;
  workspaceId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ConnectIntegrationDialog({
  definition,
  workspaceId,
  isOpen,
  onClose,
  onSuccess,
}: ConnectIntegrationDialogProps) {
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

  const { mutateAsync: createIntegration, isPending } =
    useCreateIntegrationMutation({
      meta: {
        invalidates: [integrationsOptions({ workspaceId }).queryKey],
      },
    });

  const authFields = definition?.authFields || {};
  const fieldNames = Object.keys(authFields);

  // Build default values from auth fields
  const defaultValues = fieldNames.reduce(
    (acc, name) => {
      acc[name] = "";
      return acc;
    },
    {} as Record<string, string>,
  );

  const form = useForm({
    defaultValues: {
      name: definition?.name || "",
      ...defaultValues,
    },
    validators: {
      onSubmit: ({ value }) => {
        const errors: Record<string, string> = {};

        if (!value.name?.trim()) {
          errors.name = "Name is required";
        }

        // Validate required fields
        for (const [fieldName, fieldConfig] of Object.entries(authFields)) {
          if (fieldConfig.required && !value[fieldName]?.trim()) {
            errors[fieldName] = `${fieldConfig.label} is required`;
          }
        }

        if (Object.keys(errors).length > 0) {
          return { fields: errors };
        }

        return null;
      },
    },
    onSubmit: async ({ value, formApi }) => {
      if (!definition) return;

      // Build config object from auth field values
      const config: Record<string, string> = {};
      for (const fieldName of fieldNames) {
        if (value[fieldName]) {
          config[fieldName] = value[fieldName];
        }
      }

      try {
        await createIntegration({
          input: {
            integration: {
              workspaceId,
              definitionId: definition.id,
              type: definition.id,
              name: value.name,
              config,
              isEnabled: true,
            },
          },
        });

        toast.success(`${definition.name} connected successfully!`);
        formApi.reset();
        onClose();
        onSuccess?.();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to connect integration",
        );
      }
    },
  });

  const toggleSecretVisibility = (fieldName: string) => {
    setShowSecrets((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  if (!definition) return null;

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={({ open }) => {
        if (!open) {
          form.reset();
          setShowSecrets({});
          onClose();
        }
      }}
    >
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent className="max-w-md">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
              {definition.iconUrl ? (
                <img
                  src={definition.iconUrl}
                  alt={definition.name}
                  className="h-8 w-8"
                />
              ) : (
                <span className="font-bold text-lg text-muted-foreground">
                  {definition.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <DialogTitle>Connect {definition.name}</DialogTitle>
              <IntegrationCategoryBadge category={definition.category} />
            </div>
          </div>

          <DialogCloseTrigger />

          <DialogDescription className="mt-2">
            {definition.description ||
              "Configure your integration credentials."}
          </DialogDescription>

          {/* OAuth coming soon notice */}
          {definition.authType === "oauth2" && (
            <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-3 text-blue-800 text-sm dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
              Direct OAuth connection coming soon. For now, please enter your
              tokens manually.
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="mt-6 space-y-4"
          >
            {/* Integration name */}
            <form.Field name="name">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="name">Integration Name</Label>
                  <Input
                    id="name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={`My ${definition.name}`}
                  />
                  {field.state.meta.errors.map((error, i) => (
                    <p key={i} className="text-destructive text-xs">
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </form.Field>

            {/* Dynamic auth fields */}
            {fieldNames.map((fieldName) => {
              const fieldConfig = authFields[fieldName];
              const isSecret = fieldConfig.secret;
              const showValue = showSecrets[fieldName];

              return (
                <form.Field key={fieldName} name={fieldName}>
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={fieldName}>
                        {fieldConfig.label}
                        {fieldConfig.required && (
                          <span className="text-destructive"> *</span>
                        )}
                      </Label>

                      {fieldConfig.type === "text" ||
                      fieldConfig.type === "json" ? (
                        <Textarea
                          id={fieldName}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder={fieldConfig.placeholder}
                          rows={fieldConfig.type === "json" ? 6 : 3}
                          className="font-mono text-sm"
                        />
                      ) : (
                        <div className="relative">
                          <Input
                            id={fieldName}
                            type={isSecret && !showValue ? "password" : "text"}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder={fieldConfig.placeholder}
                            className={isSecret ? "pr-10" : ""}
                          />
                          {isSecret && (
                            <button
                              type="button"
                              onClick={() => toggleSecretVisibility(fieldName)}
                              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showValue ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          )}
                        </div>
                      )}

                      {fieldConfig.description && (
                        <p className="text-muted-foreground text-xs">
                          {fieldConfig.description}
                        </p>
                      )}

                      {field.state.meta.errors.map((error, i) => (
                        <p key={i} className="text-destructive text-xs">
                          {error}
                        </p>
                      ))}
                    </div>
                  )}
                </form.Field>
              );
            })}

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4">
              <DialogCloseTrigger asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogCloseTrigger>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting || isPending}
                  >
                    {(isSubmitting || isPending) && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Connect
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}
