import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Link,
  createFileRoute,
  notFound,
  useNavigate,
} from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  Cable,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Info,
  Loader2,
  Settings,
  Shield,
  Trash2,
  Zap,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Cable className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="mt-4 font-semibold text-lg">Integration not found</h2>
          <p className="mt-2 text-muted-foreground">
            This integration may have been deleted.
          </p>
          <Link
            to="/workspaces/$workspaceSlug/integrations"
            params={{ workspaceSlug }}
            className="mt-4 inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to integrations
          </Link>
        </div>
      </div>
    );
  }

  // Type-safe access to docsUrl
  const docsUrl = (definition as { docsUrl?: string } | null)?.docsUrl;

  return (
    <div className="relative min-h-full">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[80px]" />
      </div>

      <div className="relative p-8">
        {/* Header */}
        <div className="animate-fade-up opacity-0">
          <Link
            to="/workspaces/$workspaceSlug/integrations"
            params={{ workspaceSlug }}
            className="inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to integrations
          </Link>

          <div className="mt-6 flex items-start gap-5">
            {definition?.iconUrl ? (
              <img
                src={definition.iconUrl}
                alt={definition.name}
                className="h-16 w-16 rounded-2xl bg-muted p-3 shadow-lg"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted shadow-lg">
                <Cable className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="font-bold text-2xl">{integration.name}</h1>
                <Badge
                  variant={integration.isEnabled ? "default" : "secondary"}
                  className={
                    integration.isEnabled
                      ? "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400"
                      : ""
                  }
                >
                  {integration.isEnabled ? (
                    <>
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Active
                    </>
                  ) : (
                    "Inactive"
                  )}
                </Badge>
              </div>
              <div className="mt-2 flex items-center gap-4 text-muted-foreground text-sm">
                <span>{definition?.name || integration.type}</span>
                {definition?.category && (
                  <>
                    <span className="text-border">•</span>
                    <span className="capitalize">{definition.category}</span>
                  </>
                )}
                {docsUrl && (
                  <>
                    <span className="text-border">•</span>
                    <a
                      href={docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Documentation
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats - placeholder data */}
        <div className="mt-8 grid animate-fade-up grid-cols-2 gap-4 opacity-0 [animation-delay:100ms] lg:grid-cols-4">
          <div className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">API Calls</p>
                <p className="font-semibold text-lg">--</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Zap className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Workflows</p>
                <p className="font-semibold text-lg">--</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Connected</p>
                <p className="font-semibold text-lg">--</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Shield className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Last Sync</p>
                <p className="font-semibold text-lg">--</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Left column - Settings */}
          <div className="animate-fade-up space-y-6 opacity-0 [animation-delay:150ms] lg:col-span-2">
            {/* Configuration Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 border-border/50 border-b px-6 py-4">
                <Settings className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Configuration</h2>
              </div>

              <div className="space-y-6 p-6">
                {/* Name */}
                <form.Field name="name">
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="name">Display Name</Label>
                      <Input
                        id="name"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="bg-background/50"
                        placeholder="My Integration"
                      />
                      <p className="text-muted-foreground text-xs">
                        A friendly name to identify this integration in your
                        workflows.
                      </p>
                    </div>
                  )}
                </form.Field>

                {/* Enabled toggle */}
                <form.Field name="isEnabled">
                  {(field) => (
                    <div className="flex items-center justify-between rounded-xl border border-border/50 bg-background/30 p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg ${field.state.value ? "bg-green-500/10" : "bg-muted"}`}
                        >
                          <Zap
                            className={`h-4 w-4 ${field.state.value ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}
                          />
                        </div>
                        <div>
                          <Label htmlFor="isEnabled" className="text-base">
                            Enable Integration
                          </Label>
                          <p className="text-muted-foreground text-sm">
                            When disabled, this integration won&apos;t be
                            available in workflows.
                          </p>
                        </div>
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
                            field.state.value
                              ? "translate-x-5"
                              : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  )}
                </form.Field>

                {/* Save Button */}
                <div className="flex justify-end pt-2">
                  <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                  >
                    {([canSubmit, isSubmitting]) => (
                      <Button
                        type="submit"
                        disabled={!canSubmit || isSubmitting || isUpdating}
                        className="min-w-[120px]"
                      >
                        {(isSubmitting || isUpdating) && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Save Changes
                      </Button>
                    )}
                  </form.Subscribe>
                </div>
              </div>
            </form>

            {/* Danger Zone */}
            <div className="overflow-hidden rounded-xl border border-destructive/30 bg-destructive/5">
              <div className="flex items-center gap-3 border-destructive/20 border-b px-6 py-4">
                <Trash2 className="h-5 w-5 text-destructive" />
                <h2 className="font-semibold text-destructive">Danger Zone</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">Disconnect Integration</p>
                    <p className="text-muted-foreground text-sm">
                      Remove this integration from your workspace. This action
                      cannot be undone.
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
                        <AlertDialogTitle>
                          Disconnect Integration?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will remove &ldquo;{integration.name}&rdquo; from
                          your workspace. Any workflows using this integration
                          will stop working.
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
            </div>
          </div>

          {/* Right column - Info sidebar */}
          <div className="animate-fade-up space-y-6 opacity-0 [animation-delay:200ms]">
            {/* About card */}
            <div className="overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 border-border/50 border-b px-6 py-4">
                <Info className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">About</h2>
              </div>
              <div className="space-y-4 p-6">
                {definition?.description && (
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {definition.description}
                  </p>
                )}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">
                      {definition?.name || integration.type}
                    </span>
                  </div>
                  {definition?.category && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Category</span>
                      <Badge variant="secondary" className="capitalize">
                        {definition.category}
                      </Badge>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge
                      variant={integration.isEnabled ? "default" : "secondary"}
                      className={
                        integration.isEnabled
                          ? "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400"
                          : ""
                      }
                    >
                      {integration.isEnabled ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 border-border/50 border-b px-6 py-4">
                <Zap className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Quick Actions</h2>
              </div>
              <div className="space-y-2 p-4">
                <Link
                  to="/workspaces/$workspaceSlug/workflows/new"
                  params={{ workspaceSlug }}
                  className="flex items-center gap-3 rounded-lg p-3 text-sm transition-colors hover:bg-accent"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Create Workflow</p>
                    <p className="text-muted-foreground text-xs">
                      Use this integration
                    </p>
                  </div>
                </Link>
                {docsUrl && (
                  <a
                    href={docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg p-3 text-sm transition-colors hover:bg-accent"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">View Documentation</p>
                      <p className="text-muted-foreground text-xs">
                        Learn more about this integration
                      </p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
