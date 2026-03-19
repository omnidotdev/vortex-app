import {
  Link,
  createFileRoute,
  notFound,
  useRouteContext,
} from "@tanstack/react-router";
import {
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  Key,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isSelfHosted } from "@/lib/config/env.config";
import {
  FREE_TIER_FEATURES,
  SELF_HOSTED_FEATURES,
} from "@/lib/constants/tiers";
import {
  getBillingPortalUrl,
  getSubscription,
} from "@/server/functions/subscriptions";

import type { OrganizationClaim } from "@/lib/auth/getAuth";
import type { Subscription } from "@/lib/providers/billing";

/** Shape returned by the Gatekeeper API key list endpoint */
interface ListedApiKey {
  id: string;
  name: string;
  start: string;
  prefix: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
  lastRequest: string | null;
  metadata: Record<string, unknown> | null;
}

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/settings",
)({
  loader: async ({ context: { organizationId } }) => {
    if (!organizationId) throw notFound();

    let subscription: Subscription | null = null;

    if (!isSelfHosted) {
      try {
        subscription = await getSubscription({
          data: { organizationId },
        });
      } catch {
        // Fall back to null (shows free tier)
      }
    }

    return { organizationId, subscription };
  },
  component: WorkspaceSettingsPage,
});

type NewKeyResult = {
  key: string;
  name: string | null;
};

/**
 * Copy text to clipboard and show a toast.
 */
function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    toast.success("Copied to clipboard");
  });
}

/**
 * API key list item.
 */
function ApiKeyItem({
  apiKey,
  onRevoke,
  isRevoking,
}: {
  apiKey: ListedApiKey;
  onRevoke: (keyId: string) => void;
  isRevoking: boolean;
}) {
  const createdAt = new Date(apiKey.createdAt).toLocaleDateString();
  const lastUsed = apiKey.lastRequest
    ? new Date(apiKey.lastRequest).toLocaleDateString()
    : "Never";

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Key className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="font-medium text-sm">
            {apiKey.name ?? "Unnamed key"}
          </span>
          {apiKey.start && (
            <span className="font-mono text-muted-foreground text-xs">
              {apiKey.start}...
            </span>
          )}
        </div>
        <div className="mt-1 flex gap-4 text-muted-foreground text-xs">
          <span suppressHydrationWarning>Created: {createdAt}</span>
          <span suppressHydrationWarning>Last used: {lastUsed}</span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRevoke(apiKey.id)}
        disabled={isRevoking}
        className="text-destructive hover:text-destructive"
        aria-label={`Revoke ${apiKey.name ?? "key"}`}
      >
        {isRevoking ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
        Revoke
      </Button>
    </div>
  );
}

/**
 * Dialog that shows the newly created API key — displayed only once.
 */
function NewKeyDialog({
  result,
  onClose,
}: {
  result: NewKeyResult;
  onClose: () => void;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <DialogRoot open onOpenChange={({ open }) => !open && onClose()}>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>API Key Created</DialogTitle>
            <DialogDescription>
              Copy this key now — it will not be shown again.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <p className="text-sm">
              <span className="font-medium">Name:</span>{" "}
              {result.name ?? "Unnamed key"}
            </p>

            <div>
              <Label className="text-sm">Key</Label>
              <div className="mt-1 flex gap-2">
                <div className="relative flex-1">
                  <Input
                    readOnly
                    type={revealed ? "text" : "password"}
                    value={result.key}
                    className="font-mono text-sm"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setRevealed((v) => !v)}
                  aria-label={revealed ? "Hide key" : "Reveal key"}
                >
                  {revealed ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(result.key)}
                  aria-label="Copy key"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="text-muted-foreground text-xs">
              Store this key securely. You can use it to authenticate with the
              Vortex API.
            </p>
          </div>

          <DialogFooter>
            <DialogCloseTrigger asChild>
              <Button onClick={onClose}>Done</Button>
            </DialogCloseTrigger>
          </DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}

/**
 * API keys management section.
 */
function ApiKeysSection({
  organizationId,
  workspaceSlug,
}: {
  organizationId: string;
  workspaceSlug: string;
}) {
  const [keys, setKeys] = useState<ListedApiKey[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyResult, setNewKeyResult] = useState<NewKeyResult | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const loadKeys = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/api-key/list", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        setKeys([]);
        return;
      }
      const data: ListedApiKey[] = await res.json();
      // Filter to keys belonging to this organization via metadata
      const orgKeys = data.filter((k) => {
        if (!k.metadata) return false;
        try {
          const meta = k.metadata as { organizationId?: string };
          return meta.organizationId === organizationId;
        } catch {
          return false;
        }
      });
      setKeys(orgKeys);
    } catch {
      // API key management may not be available (e.g. Gatekeeper plugin not enabled)
      setKeys([]);
    } finally {
      setIsLoading(false);
    }
  }, [organizationId]);

  // Load keys on mount
  useEffect(() => {
    loadKeys();
  }, [loadKeys]);

  const handleCreate = async () => {
    if (!newKeyName.trim()) return;

    setIsCreating(true);
    try {
      const res = await fetch("/api/auth/api-key/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newKeyName.trim(),
          metadata: { organizationId, workspaceSlug },
        }),
      });

      if (!res.ok) {
        toast.error("Failed to create API key");
        return;
      }

      const data = await res.json();
      setNewKeyResult({ key: data.key, name: data.name });
      setNewKeyName("");
      setCreateOpen(false);
      await loadKeys();
    } catch {
      toast.error("Failed to create API key");
    } finally {
      setIsCreating(false);
    }
  };

  const handleRevoke = async (keyId: string) => {
    setRevokingId(keyId);
    try {
      const res = await fetch("/api/auth/api-key/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyId }),
      });
      if (!res.ok) {
        toast.error("Failed to revoke API key");
        return;
      }
      toast.success("API key revoked");
      setKeys((prev) => prev?.filter((k) => k.id !== keyId) ?? null);
    } catch {
      toast.error("Failed to revoke API key");
    } finally {
      setRevokingId(null);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">API Keys</h2>

        <DialogRoot
          open={createOpen}
          onOpenChange={({ open }) => setCreateOpen(open)}
        >
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Plus className="mr-1 h-4 w-4" />
              Create key
            </Button>
          </DialogTrigger>
          <DialogBackdrop />
          <DialogPositioner>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create API Key</DialogTitle>
                <DialogDescription>
                  Give your key a descriptive name so you can identify it later.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-2">
                <Label htmlFor="key-name">Name</Label>
                <Input
                  id="key-name"
                  placeholder="e.g. Production key"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                />
              </div>

              <DialogFooter>
                <DialogCloseTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogCloseTrigger>
                <Button
                  onClick={handleCreate}
                  disabled={isCreating || !newKeyName.trim()}
                >
                  {isCreating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </DialogPositioner>
        </DialogRoot>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading keys...
          </div>
        ) : keys === null || keys.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-center text-muted-foreground text-sm">
            No API keys yet. Create one to authenticate with the Vortex API.
          </div>
        ) : (
          <div className="space-y-2">
            {keys.map((k) => (
              <ApiKeyItem
                key={k.id}
                apiKey={k}
                onRevoke={handleRevoke}
                isRevoking={revokingId === k.id}
              />
            ))}
          </div>
        )}
      </div>

      {newKeyResult && (
        <NewKeyDialog
          result={newKeyResult}
          onClose={() => setNewKeyResult(null)}
        />
      )}
    </section>
  );
}

/**
 * Plan section with dynamic subscription display.
 */
function PlanSection({
  subscription,
  organizationId,
}: {
  subscription: Subscription | null;
  organizationId: string;
}) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  if (isSelfHosted) {
    return (
      <section>
        <h2 className="font-semibold text-lg">Plan</h2>
        <div className="mt-4 rounded-lg border p-4">
          <p className="font-medium">Self-Hosted</p>
          <p className="mt-1 text-muted-foreground text-sm">
            All features included with your self-hosted deployment
          </p>
          <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {SELF_HOSTED_FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  const product = subscription?.product;

  const handleManageBilling = async () => {
    setIsRedirecting(true);
    try {
      const url = await getBillingPortalUrl({
        data: {
          organizationId,
          returnUrl: window.location.href,
        },
      });
      window.location.href = url;
    } catch {
      toast.error("Failed to open billing portal");
      setIsRedirecting(false);
    }
  };

  if (product) {
    const features =
      product.marketing_features?.map((f: { name: string }) => f.name) ?? [];

    return (
      <section>
        <h2 className="font-semibold text-lg">Plan</h2>
        <div className="mt-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{product.name} Plan</p>
              {features.length > 0 && (
                <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                  {features.map((feature: string) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
              {subscription.cancelAt && (
                <p
                  className="mt-2 text-destructive text-sm"
                  suppressHydrationWarning
                >
                  Cancels on{" "}
                  {new Date(subscription.cancelAt * 1000).toLocaleDateString()}
                </p>
              )}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleManageBilling}
              disabled={isRedirecting}
            >
              {isRedirecting && (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              )}
              Manage Billing
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Free tier / no subscription
  return (
    <section>
      <h2 className="font-semibold text-lg">Plan</h2>
      <div className="mt-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Free Plan</p>
            <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {FREE_TIER_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <Button size="sm" asChild>
            <Link to="/pricing">Upgrade</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * Derive the highest role from an organization claim's roles array.
 */
function deriveDisplayRole(organization?: OrganizationClaim): string | null {
  if (!organization?.roles?.length) return null;

  const roles = organization.roles;
  if (roles.includes("owner")) return "owner";
  if (roles.includes("admin")) return "admin";
  if (roles.includes("member")) return "member";

  return roles[0] ?? null;
}

/**
 * Role badge with color matching the MemberRow convention.
 */
function UserRoleBadge({ role }: { role: string }) {
  if (role === "owner") {
    return (
      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
        Owner
      </Badge>
    );
  }

  if (role === "admin") {
    return (
      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
        Admin
      </Badge>
    );
  }

  return <Badge variant="secondary">Member</Badge>;
}

/**
 * Workspace settings page.
 */
function WorkspaceSettingsPage() {
  const { workspaceSlug } = Route.useParams();
  const { organizationId, subscription } = Route.useLoaderData();
  const { organization } = useRouteContext({ from: "/_app" });
  const displayRole = deriveDisplayRole(organization as OrganizationClaim);

  return (
    <div className="p-8">
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-2xl">Workspace Settings</h1>
        {displayRole && <UserRoleBadge role={displayRole} />}
      </div>

      <div className="mt-8 max-w-2xl space-y-8">
        {/* General */}
        <section>
          <h2 className="font-semibold text-lg">General</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="font-medium text-sm">Workspace Name</label>
              <p className="mt-1 text-foreground">{workspaceSlug}</p>
            </div>
            <div>
              <label className="font-medium text-sm">Slug</label>
              <p className="mt-1 font-mono text-muted-foreground text-sm">
                {workspaceSlug}
              </p>
            </div>
          </div>
        </section>

        {/* Plan */}
        <PlanSection
          subscription={subscription}
          organizationId={organizationId}
        />

        {/* API Keys */}
        <ApiKeysSection
          organizationId={organizationId}
          workspaceSlug={workspaceSlug}
        />
      </div>
    </div>
  );
}
