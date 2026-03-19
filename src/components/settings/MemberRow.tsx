import { Loader2, UserMinus } from "lucide-react";
import { useState } from "react";

import RoleSelector from "@/components/settings/RoleSelector";
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

import type { GatekeeperMember } from "@omnidotdev/providers/auth";

type MemberRowProps = {
  member: GatekeeperMember;
  currentUserId: string | undefined;
  isOwner: boolean;
  onRoleChange: (memberId: string, role: string) => Promise<void>;
  onRemove: (memberId: string) => Promise<void>;
};

/**
 * Render role-specific badge with appropriate color
 */
function RoleBadge({ role }: { role: GatekeeperMember["role"] }) {
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
 * Individual member row with avatar, name, email, role badge, and actions
 */
function MemberRow({
  member,
  currentUserId,
  isOwner,
  onRoleChange,
  onRemove,
}: MemberRowProps) {
  const [busy, setBusy] = useState<"role" | "remove" | null>(null);
  const isCurrentUser = member.userId === currentUserId;

  const handleRoleChange = async (role: string) => {
    setBusy("role");
    try {
      await onRoleChange(member.id, role);
    } finally {
      setBusy(null);
    }
  };

  const handleRemove = async () => {
    setBusy("remove");
    try {
      await onRemove(member.id);
    } finally {
      setBusy(null);
    }
  };

  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      {/* Member info */}
      <td className="py-3">
        <div className="flex items-center gap-3">
          {member.user.image ? (
            <img
              src={member.user.image}
              alt={member.user.name}
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-medium text-sm">
              {member.user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 font-medium text-sm">
              <span className="truncate">{member.user.name}</span>
              <RoleBadge role={member.role} />
              {isCurrentUser && (
                <span className="shrink-0 font-normal text-muted-foreground text-xs">
                  (you)
                </span>
              )}
            </p>
            <p className="truncate text-muted-foreground text-xs">
              {member.user.email}
            </p>
          </div>
        </div>
      </td>

      {/* Joined */}
      <td
        className="hidden py-3 text-muted-foreground text-sm sm:table-cell"
        suppressHydrationWarning
      >
        {new Date(member.createdAt).toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="py-3">
        {isOwner && !isCurrentUser && member.role !== "owner" && (
          <div className="flex items-center gap-1">
            <RoleSelector
              currentRole={member.role}
              onChange={handleRoleChange}
              disabled={busy !== null}
            />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={busy !== null}
                  aria-label={`Remove ${member.user.name}`}
                >
                  {busy === "remove" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <UserMinus className="h-4 w-4 text-destructive" />
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove member</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to remove {member.user.name} from this
                    workspace? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRemove}>
                    Remove
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </td>
    </tr>
  );
}

export default MemberRow;
