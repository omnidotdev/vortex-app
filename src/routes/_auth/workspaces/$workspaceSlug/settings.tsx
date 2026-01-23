import { Link, createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  Bell,
  ChevronRight,
  CreditCard,
  Globe,
  Key,
  Loader2,
  Settings,
  Shield,
  Trash2,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

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

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/settings",
)({
  component: WorkspaceSettingsPage,
});

// Setting section component
function SettingSection({
  icon: Icon,
  title,
  description,
  children,
  variant = "default",
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  children: React.ReactNode;
  variant?: "default" | "danger";
}) {
  const isDanger = variant === "danger";

  return (
    <div
      className={`overflow-hidden rounded-xl border backdrop-blur-sm ${
        isDanger
          ? "border-destructive/30 bg-destructive/5"
          : "border-border/50 bg-card/50"
      }`}
    >
      <div
        className={`flex items-center gap-3 border-b px-6 py-4 ${
          isDanger ? "border-destructive/20" : "border-border/50"
        }`}
      >
        <Icon
          className={`h-5 w-5 ${isDanger ? "text-destructive" : "text-primary"}`}
        />
        <div>
          <h2 className={`font-semibold ${isDanger ? "text-destructive" : ""}`}>
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// Usage bar component
function UsageBar({
  label,
  used,
  limit,
  unit = "",
}: {
  label: string;
  used: number;
  limit: number;
  unit?: string;
}) {
  const percentage = Math.min((used / limit) * 100, 100);
  const isNearLimit = percentage >= 80;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className={isNearLimit ? "font-medium text-amber-500" : ""}>
          {used.toLocaleString()}
          {unit} / {limit.toLocaleString()}
          {unit}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isNearLimit ? "bg-amber-500" : "bg-primary"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Navigation item for settings menu
function SettingsNavItem({
  icon: Icon,
  label,
  description,
  href,
  badge,
  disabled = false,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  href?: string;
  badge?: string;
  disabled?: boolean;
}) {
  const content = (
    <div
      className={`group flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4 transition-all duration-300 ${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer hover:border-primary/30 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
      }`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
        <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium">{label}</p>
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
        <p className="truncate text-muted-foreground text-sm">{description}</p>
      </div>
      {!disabled && (
        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
      )}
    </div>
  );

  if (disabled || !href) {
    return content;
  }

  return <Link to={href}>{content}</Link>;
}

/**
 * Workspace settings page.
 */
function WorkspaceSettingsPage() {
  const { workspaceSlug } = Route.useParams();
  const [workspaceName, setWorkspaceName] = useState(workspaceSlug);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Placeholder data - would come from API
  const plan = {
    name: "Free",
    workflows: { used: 3, limit: 5 },
    runs: { used: 67, limit: 100 },
    integrations: { used: 2, limit: 5 },
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="relative min-h-full">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-primary/3 blur-[80px]" />
      </div>

      <div className="relative p-8">
        {/* Header */}
        <div className="animate-fade-up opacity-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-2xl">Workspace Settings</h1>
              <p className="text-muted-foreground">
                Manage your workspace configuration and preferences
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Main settings column */}
          <div className="space-y-6 lg:col-span-2">
            {/* General Settings */}
            <div className="animate-fade-up opacity-0 [animation-delay:100ms]">
              <SettingSection
                icon={Globe}
                title="General"
                description="Basic workspace information"
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="workspaceName">Workspace Name</Label>
                    <Input
                      id="workspaceName"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      className="max-w-md bg-background/50"
                      placeholder="My Workspace"
                    />
                    <p className="text-muted-foreground text-xs">
                      This is the display name for your workspace.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Workspace Slug</Label>
                    <div className="flex items-center gap-2">
                      <code className="rounded-lg bg-muted px-3 py-2 font-mono text-sm">
                        {workspaceSlug}
                      </code>
                      <Badge variant="secondary">Read-only</Badge>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Used in URLs and API references. Cannot be changed.
                    </p>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      onClick={handleSave}
                      disabled={isSaving || workspaceName === workspaceSlug}
                      className="min-w-[120px]"
                    >
                      {isSaving && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Save Changes
                    </Button>
                  </div>
                </div>
              </SettingSection>
            </div>

            {/* Plan & Usage */}
            <div className="animate-fade-up opacity-0 [animation-delay:150ms]">
              <SettingSection
                icon={CreditCard}
                title="Plan & Usage"
                description="Your current plan and resource usage"
              >
                <div className="space-y-6">
                  {/* Current plan */}
                  <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-transparent p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Zap className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-lg">
                            {plan.name} Plan
                          </p>
                          <Badge className="border-primary/20 bg-primary/10 text-primary">
                            Current
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          Perfect for getting started with automation
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="group">
                      Upgrade
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </div>

                  {/* Usage stats */}
                  <div className="space-y-4">
                    <UsageBar
                      label="Workflows"
                      used={plan.workflows.used}
                      limit={plan.workflows.limit}
                    />
                    <UsageBar
                      label="Runs (today)"
                      used={plan.runs.used}
                      limit={plan.runs.limit}
                    />
                    <UsageBar
                      label="Integrations"
                      used={plan.integrations.used}
                      limit={plan.integrations.limit}
                    />
                  </div>

                  {/* Usage note */}
                  <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                    <div className="text-sm">
                      <p className="font-medium">Approaching limits</p>
                      <p className="text-muted-foreground">
                        You&apos;re using {plan.runs.used}% of your daily runs.
                        Consider upgrading for more capacity.
                      </p>
                    </div>
                  </div>
                </div>
              </SettingSection>
            </div>

            {/* Danger Zone */}
            <div className="animate-fade-up opacity-0 [animation-delay:200ms]">
              <SettingSection
                icon={Trash2}
                title="Danger Zone"
                variant="danger"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">Delete Workspace</p>
                    <p className="text-muted-foreground text-sm">
                      Permanently delete this workspace and all its data. This
                      action cannot be undone.
                    </p>
                  </div>
                  <AlertDialog
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                  >
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Workspace?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete &ldquo;{workspaceSlug}
                          &rdquo; and all associated workflows, integrations,
                          and run history. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete Workspace
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </SettingSection>
            </div>
          </div>

          {/* Right sidebar - Quick navigation */}
          <div className="animate-fade-up space-y-6 opacity-0 [animation-delay:250ms]">
            <div className="overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 border-border/50 border-b px-6 py-4">
                <Settings className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">More Settings</h2>
              </div>
              <div className="space-y-3 p-4">
                <SettingsNavItem
                  icon={Users}
                  label="Team Members"
                  description="Manage workspace access"
                  badge="Coming Soon"
                  disabled
                />
                <SettingsNavItem
                  icon={Key}
                  label="API Keys"
                  description="Manage API credentials"
                  badge="Coming Soon"
                  disabled
                />
                <SettingsNavItem
                  icon={Bell}
                  label="Notifications"
                  description="Configure alerts and emails"
                  badge="Coming Soon"
                  disabled
                />
                <SettingsNavItem
                  icon={Shield}
                  label="Security"
                  description="Authentication and access"
                  badge="Coming Soon"
                  disabled
                />
              </div>
            </div>

            {/* Help card */}
            <div className="rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 via-card/50 to-card/50 p-6 backdrop-blur-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">Need help?</h3>
              <p className="mt-2 text-muted-foreground text-sm">
                Check out our documentation or reach out to support for
                assistance with your workspace configuration.
              </p>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
