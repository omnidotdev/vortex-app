import { Portal } from "@ark-ui/react/portal";
import {
  Select,
  SelectContent,
  SelectControl,
  SelectHiddenSelect,
  SelectIndicator,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
  createListCollection,
} from "@omnidotdev/thornberry/select";
import { ChevronDown } from "lucide-react";
import { useMemo } from "react";

import { cn } from "@/lib/utils";

export interface DropdownOption {
  value: string;
  label: string;
  /** Secondary line shown in the list only, never in the trigger */
  hint?: string | null;
}

interface DropdownProps {
  value: string;
  options: DropdownOption[];
  onValueChange: (value: string) => void;
  /** Shown in the trigger while no option is selected */
  placeholder?: string;
  /** Trigger id, so a `<Label htmlFor>` names the field */
  id?: string;
  /** Accessible name when there is no visible label */
  ariaLabel?: string;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Sizes the field (e.g. `w-48`); it fills its container by default */
  className?: string;
}

/**
 * Single-choice form field built on the thornberry select: pass `options`
 * instead of composing the collection, trigger, and list at every call site
 */
const Dropdown = ({
  value,
  options,
  onValueChange,
  placeholder,
  id,
  ariaLabel,
  disabled,
  open,
  onOpenChange,
  className,
}: DropdownProps) => {
  const collection = useMemo(
    () => createListCollection({ items: options }),
    [options],
  );

  return (
    <Select
      collection={collection}
      value={value ? [value] : []}
      onValueChange={(details) => {
        const next = details.value[0];

        if (next !== undefined) onValueChange(next);
      }}
      open={open}
      onOpenChange={
        onOpenChange ? (details) => onOpenChange(details.open) : undefined
      }
      ids={id ? { trigger: id } : undefined}
      positioning={{ sameWidth: true }}
      disabled={disabled}
      loopFocus
      className={cn("w-full min-w-0", className)}
    >
      <SelectControl>
        <SelectTrigger
          aria-label={ariaLabel}
          className="h-9 w-full border border-input bg-transparent shadow-sm focus-visible:ring-2 focus-visible:ring-primary data-placeholder-shown:text-muted-foreground"
        >
          <SelectValueText
            placeholder={placeholder}
            className="min-w-0 truncate"
          />
          <SelectIndicator className="text-muted-foreground">
            <ChevronDown aria-hidden="true" />
          </SelectIndicator>
        </SelectTrigger>
      </SelectControl>

      <Portal>
        <SelectPositioner>
          <SelectContent className="w-full p-1">
            {options.map((option) => (
              <SelectItem key={option.value} item={option}>
                <span className="flex min-w-0 flex-col">
                  <SelectItemText>{option.label}</SelectItemText>
                  {option.hint && (
                    <span className="text-muted-foreground text-xs">
                      {option.hint}
                    </span>
                  )}
                </span>
                <SelectItemIndicator />
              </SelectItem>
            ))}
          </SelectContent>
        </SelectPositioner>
      </Portal>

      <SelectHiddenSelect />
    </Select>
  );
};

export default Dropdown;
