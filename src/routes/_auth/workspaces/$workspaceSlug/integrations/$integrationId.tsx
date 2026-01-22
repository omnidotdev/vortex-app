import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Link,
  createFileRoute,
  notFound,
  useNavigate,
} from "@tanstack/react-router";
import { ArrowLeft, Cable, ExternalLink, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useDeleteIntegrationMutation,
  useUpdateIntegrationMutation,
} from "@/generated/graphql";
import useForm from "@/lib/hooks/useForm";
import {
  integrationDefinitionsOptions,
  integrationOptions,
  integrationsOptions,
} from "@/lib/options/integrations.options";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/integrations/$integrationId",
)({
  loader: async ({ context: { queryClient, organizationId }, params }) => {
    if (!organizationId) throw notFound();

    await queryClient.ensureQueryData(
      integrationOptions({ id: params.integrationId }),
    );

    return { organizationId };
  },
  component: IntegrationDetailPage,
});

function IntegrationDetailPage() {
  const { workspaceSlug, integrationId } = Route.useParams();
  const { organizationId } = Route.useLoaderData();
  const navigate = useNavigate();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data: integration } = useSuspenseQuery({
    ...integrationOptions({ id: integrationId }),
    select: (data) => data?.integration,
  });

  // Fetch all definitions and find the matching one by type
  const { data: definitions } = useSuspenseQuery({
    ...integrationDefinitionsOptions({}),
    select: (data) => data?.integrationDefinitions?.nodes ?? [],
  });
  const definition = definitions.find((d) => d.id === integration?.type);

  const { mutateAsync: updateIntegration, isPending: isUpdating } =
    useUpdateIntegrationMutation({
      meta: {
        invalidates: [
          integrationOptions({ id: integrationId }).queryKey,
          integrationsOptions({ organizationId }).queryKey,
        ],
      },
    });

  const { mutateAsync: deleteIntegration, isPending: isDeleting } =
    useDeleteIntegrationMutation({
      meta: {
        invalidates: [integrationsOptions({ organizationId }).queryKey],
      },
    });

  const form = useForm({
    defaultValues: {
      name: integration?.name || "",
      isEnabled: integration?.isEnabled || false,
    },
    onSubmit: async ({ value }) => {
      if (!integration) return;

      try {
        await updateIntegration({
          input: {
            rowId: integrationId,
            patch: {
              name: value.name,
              isEnabled: value.isEnabled,
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

  // Type-safe access to docsUrl
  const docsUrl = (definition as { docsUrl?: string } | null)?.docsUrl;

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
          {definition?.iconUrl ? (
            <img
              src={definition.iconUrl}
              alt={definition.name}
              className="h-12 w-12 rounded-lg bg-muted p-2"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <Cable className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
          <div>
            <h1 className="font-bold text-2xl">{integration.name}</h1>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">
                {definition?.name || integration.type}
              </span>
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-xs ${
                  integration.isEnabled
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                {integration.isEnabled ? "Active" : "Inactive"}
              </span>
              {docsUrl && (
                <a
                  href={docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 inline-flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground"
                >
                  <ExternalLink className="h-3 w-3" />
                  Docs
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

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
                  <button
                    id="isEnabled"
                    type="button"
                    role="switch"
                    aria-checked={field.state.value}
                    onClick={() => field.handleChange(!field.state.value)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      field.state.value ? "bg-primary" : "bg-input"
                    }`}
                  >
                    <span
                      className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                        field.state.value ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              )}
            </form.Field>
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
            <AlertDialog
              open={deleteDialogOpen}
              onOpenChange={(open: boolean) => setDeleteDialogOpen(open)}
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
            </AlertDialog>
          </div>
        </div>
      </section>
    </div>
  );
}
