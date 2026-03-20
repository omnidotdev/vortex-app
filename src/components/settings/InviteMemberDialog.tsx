import { Loader2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type InviteMemberDialogProps = {
  onSubmit: (email: string, role: "admin" | "member") => Promise<void>;
  onClose: () => void;
};

/**
 * Dialog for inviting a new member to the workspace via email
 */
function InviteMemberDialog({ onSubmit, onClose }: InviteMemberDialogProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "member">("member");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();

    if (!trimmed) {
      setError("Email is required");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(trimmed, role);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send invite");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogRoot open onOpenChange={(e) => !e.open && onClose()}>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Member</DialogTitle>
            <DialogDescription>
              Send an invitation to join this workspace
            </DialogDescription>
          </DialogHeader>
          <DialogCloseTrigger />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="invite-email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="invite-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="colleague@example.com"
                required
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="invite-role">Role</Label>
              <Select
                value={role}
                onValueChange={(v) => setRole(v as "admin" | "member")}
              >
                <SelectTrigger id="invite-role" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-muted-foreground text-xs">
                Admins can manage members, workflows, and workspace settings
              </p>
            </div>

            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-destructive text-sm">
                {error}
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Send Invite
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}

export default InviteMemberDialog;
