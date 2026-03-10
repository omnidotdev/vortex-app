import { createFileRoute, notFound } from "@tanstack/react-router";
import { Copy, Eye, EyeOff, Key, Loader2, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

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
import authClient from "@/lib/auth/authClient";

import type { ApiKey } from "better-auth/client/plugins";

// The list endpoint omits the plaintext `key` field (only returned at creation)
type ListedApiKey = Omit<ApiKey, "key">;

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/settings",
)({
  loader: async ({ context: { organizationId } }) => {
    if (!organizationId) throw notFound();
    return { organizationId };
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
          <span>Created: {createdAt}</span>
          <span>Last used: {lastUsed}</span>
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
      const result = await authClient.apiKey.list();
      if (result.error) {
        toast.error("Failed to load API keys");
        setKeys([]);
        return;
      }
      // Filter to keys belonging to this organization via metadata
      const orgKeys = (result.data ?? []).filter((k) => {
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
      const result = await authClient.apiKey.create({
        name: newKeyName.trim(),
        metadata: { organizationId, workspaceSlug },
      });

      if (result.error || !result.data) {
        toast.error("Failed to create API key");
        return;
      }

      setNewKeyResult({ key: result.data.key, name: result.data.name });
      setNewKeyName("");
      setCreateOpen(false);
      // Reload the key list
      await loadKeys();
    } finally {
      setIsCreating(false);
    }
  };

  const handleRevoke = async (keyId: string) => {
    setRevokingId(keyId);
    try {
      const result = await authClient.apiKey.delete({ keyId });
      if (result.error) {
        toast.error("Failed to revoke API key");
        return;
      }
      toast.success("API key revoked");
      setKeys((prev) => prev?.filter((k) => k.id !== keyId) ?? null);
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
 * Workspace settings page.
 */
function WorkspaceSettingsPage() {
  const { workspaceSlug } = Route.useParams();
  const { organizationId } = Route.useLoaderData();

  return (
    <div className="p-8">
      <h1 className="font-bold text-2xl">Workspace Settings</h1>

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
        <section>
          <h2 className="font-semibold text-lg">Plan</h2>
          <div className="mt-4 rounded-lg border p-4">
            <div>
              <p className="font-medium">Free Plan</p>
              <p className="text-muted-foreground text-sm">
                5 workflows, 1,000 runs/month
              </p>
            </div>
          </div>
        </section>

        {/* API Keys */}
        <ApiKeysSection
          organizationId={organizationId}
          workspaceSlug={workspaceSlug}
        />
      </div>
    </div>
  );
}
