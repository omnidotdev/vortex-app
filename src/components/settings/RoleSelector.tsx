import { Shield, User } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RoleSelectorProps = {
  currentRole: string;
  onChange: (role: string) => void;
  disabled?: boolean;
};

/**
 * Dropdown for changing a member's role.
 */
function RoleSelector({ currentRole, onChange, disabled }: RoleSelectorProps) {
  return (
    <Select
      value={currentRole}
      onValueChange={onChange}
      disabled={disabled || currentRole === "owner"}
    >
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">
          <span className="flex items-center gap-2">
            <Shield className="h-3.5 w-3.5" />
            Admin
          </span>
        </SelectItem>
        <SelectItem value="member">
          <span className="flex items-center gap-2">
            <User className="h-3.5 w-3.5" />
            Member
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default RoleSelector;
