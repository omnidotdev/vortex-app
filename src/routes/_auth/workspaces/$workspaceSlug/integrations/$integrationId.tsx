import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Link,
  createFileRoute,
  notFound,
  useNavigate,
} from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { IntegrationCategoryBadge } from "@/components/integrations/IntegrationCategoryBadge";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useDeleteIntegrationMutation,
  useUpdateIntegrationMutation,
} from "@/generated/graphql";
import useForm from "@/lib/hooks/useForm";
import {
  integrationOptions,
  integrationsOptions,
} from "@/lib/options/integrations.options";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/integrations/$integrationId",
)({
  loader: async ({ context: { queryClient, workspaceBySlug }, params }) => {
    if (!workspaceBySlug) throw notFound();

    await queryClient.ensureQueryData(
      integrationOptions({ id: params.integrationId }),
    );

    return { workspaceId: workspaceBySlug.rowId };
  },
  component: IntegrationDetailPage,
});

function IntegrationDetailPage() {
  const { workspaceSlug, integrationId } = Route.useParams();
  const { workspaceId } = Route.useLoaderData();
  const navigate = useNavigate();

  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data: integration } = useSuspenseQuery({
    ...integrationOptions({ id: integrationId }),
    select: (data) => data?.integration,
  });

  const { mutateAsync: updateIntegration, isPending: isUpdating } =
    useUpdateIntegrationMutation({
      meta: {
        invalidates: [
          integrationOptions({ id: integrationId }).queryKey,
          integrationsOptions({ workspaceId }).queryKey,
        ],
      },
    });

  const { mutateAsync: deleteIntegration, isPending: isDeleting } =
    useDeleteIntegrationMutation({
      meta: {
        invalidates: [integrationsOptions({ workspaceId }).queryKey],
      },
    });

  // Compute these before hooks to avoid conditional hook calls
  const definition = integration?.integrationDefinition;
  const authFields = (definition?.authFields || {}) as Record<
    string,
    {
      type: "string" | "text" | "json";
      label: string;
      description?: string;
      placeholder?: string;
      secret?: boolean;
      required?: boolean;
    }
  >;
  const fieldNames = Object.keys(authFields);

  // Parse existing config (may be encrypted string or object)
  const existingConfig =
    typeof integration?.config === "string"
      ? {} // Encrypted, don't show
      : (integration?.config as Record<string, string>) || {};

  const form = useForm({
    defaultValues: {
      name: integration?.name || "",
      isEnabled: integration?.isEnabled || false,
      ...fieldNames.reduce(
        (acc, name) => {
          // Show placeholder for encrypted values
          acc[name] = existingConfig[name] || "";
          return acc;
        },
        {} as Record<string, string>,
      ),
    },
    onSubmit: async ({ value }) => {
      if (!integration) return;

      // Build config from field values (only include non-empty)
      const config: Record<string, string> = {};
      for (const fieldName of fieldNames) {
        if (value[fieldName]) {
          config[fieldName] = value[fieldName];
        }
      }

      try {
        await updateIntegration({
          input: {
            rowId: integrationId,
            patch: {
              name: value.name,
              isEnabled: value.isEnabled,
              ...(Object.keys(config).length > 0 ? { config } : {}),
            },
          },
        });

        toast.success("Integration updated successfully!");
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update integration",
        );
      }
    },
  });

  const handleDelete = async () => {
    if (!integration) return;
    try {
      await deleteIntegration({
        input: { rowId: integrationId },
      });

      toast.success("Integration disconnected");
      navigate({
        to: "/workspaces/$workspaceSlug/integrations",
        params: { workspaceSlug },
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to disconnect integration",
      );
    }
  };

  const toggleSecretVisibility = (fieldName: string) => {
    setShowSecrets((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  // Handle case where integration is not found
  if (!integration) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <h2 className="font-semibold text-lg">Integration not found</h2>
          <p className="mt-2 text-muted-foreground">
            This integration may have been deleted.
          </p>
          <Link
            to="/workspaces/$workspaceSlug/integrations"
            params={{ workspaceSlug }}
            className="mt-4 inline-block text-primary underline"
          >
            Back to integrations
          </Link>
        </div>
      </div>
    );
  }

  const isConfigEncrypted = typeof integration.config === "string";

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/workspaces/$workspaceSlug/integrations"
          params={{ workspaceSlug }}
          className="rounded-md p-2 hover:bg-accent"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
            {definition?.iconUrl ? (
              <img
                src={definition.iconUrl}
                alt={integration.name}
                className="h-8 w-8"
              />
            ) : (
              <span className="font-bold text-lg text-muted-foreground">
                {integration.name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h1 className="font-bold text-2xl">{integration.name}</h1>
            <div className="flex items-center gap-2">
              {definition && (
                <IntegrationCategoryBadge category={definition.category} />
              )}
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-xs ${
                  integration.isEnabled
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                {integration.isEnabled ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {definition?.description && (
        <p className="mt-4 max-w-2xl text-muted-foreground">
          {definition.description}
        </p>
      )}

      {/* Configuration Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="mt-8 max-w-xl space-y-6"
      >
        <section>
          <h2 className="font-semibold text-lg">Settings</h2>

          <div className="mt-4 space-y-4">
            {/* Name */}
            <form.Field name="name">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            {/* Enabled toggle */}
            <form.Field name="isEnabled">
              {(field) => (
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label htmlFor="isEnabled">Enabled</Label>
                    <p className="text-muted-foreground text-sm">
                      When disabled, this integration won&apos;t be used in
                      workflows.
                    </p>
                  </div>
                  <input
                    id="isEnabled"
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                    className="h-5 w-5"
                  />
                </div>
              )}
            </form.Field>
          </div>
        </section>

        {/* Credentials Section */}
        <section>
          <h2 className="font-semibold text-lg">Credentials</h2>

          {isConfigEncrypted && (
            <div className="mt-2 flex items-start gap-2 rounded-md border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Credentials are encrypted. Enter new values to update them, or
                leave blank to keep existing.
              </p>
            </div>
          )}

          <div className="mt-4 space-y-4">
            {fieldNames.map((fieldName) => {
              const fieldConfig = authFields[fieldName];
              const isSecret = fieldConfig.secret;
              const showValue = showSecrets[fieldName];

              return (
                <form.Field key={fieldName} name={fieldName}>
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={fieldName}>{fieldConfig.label}</Label>

                      {fieldConfig.type === "text" ||
                      fieldConfig.type === "json" ? (
                        <Textarea
                          id={fieldName}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder={
                            isConfigEncrypted
                              ? "Enter new value to update..."
                              : fieldConfig.placeholder
                          }
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
                            placeholder={
                              isConfigEncrypted
                                ? "Enter new value to update..."
                                : fieldConfig.placeholder
                            }
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
                    </div>
                  )}
                </form.Field>
              );
            })}
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting || isUpdating}
              >
                {(isSubmitting || isUpdating) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Changes
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>

      {/* Danger Zone */}
      <section className="mt-12 max-w-xl">
        <h2 className="font-semibold text-destructive text-lg">Danger Zone</h2>
        <div className="mt-4 rounded-lg border border-destructive/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Disconnect Integration</p>
              <p className="text-muted-foreground text-sm">
                Remove this integration from your workspace. This cannot be
                undone.
              </p>
            </div>
            <AlertDialogRoot
              open={deleteDialogOpen}
              onOpenChange={({ open }) => setDeleteDialogOpen(open)}
            >
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Disconnect
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Disconnect Integration?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove &ldquo;{integration.name}&rdquo; from your
                    workspace. Any workflows using this integration will stop
                    working.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeleting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Disconnect
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogRoot>
          </div>
        </div>
      </section>
    </div>
  );
}
