import { Dialog as ArkDialog } from "@ark-ui/react/dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ComponentProps } from "react";

const SheetRoot = ArkDialog.Root;
const SheetTrigger = ArkDialog.Trigger;
const SheetContext = ArkDialog.Context;

const SheetBackdrop = ({
  className,
  ...rest
}: ComponentProps<typeof ArkDialog.Backdrop>) => (
  <ArkDialog.Backdrop
    className={cn(
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in",
      className,
    )}
    {...rest}
  />
);

const SheetPositioner = ({
  className,
  side = "left",
  ...rest
}: ComponentProps<typeof ArkDialog.Positioner> & {
  side?: "left" | "right" | "top" | "bottom";
}) => (
  <ArkDialog.Positioner
    className={cn(
      "fixed inset-0 z-50",
      side === "left" && "flex justify-start",
      side === "right" && "flex justify-end",
      side === "top" && "flex items-start",
      side === "bottom" && "flex items-end",
      className,
    )}
    {...rest}
  />
);

const SheetContent = ({
  className,
  side = "left",
  children,
  ...rest
}: ComponentProps<typeof ArkDialog.Content> & {
  side?: "left" | "right" | "top" | "bottom";
}) => (
  <ArkDialog.Content
    className={cn(
      "fixed z-50 gap-4 border bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:duration-300 data-[state=open]:duration-500",
      side === "left" &&
        "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 max-w-sm border-r",
      side === "right" &&
        "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 max-w-sm border-l",
      side === "top" &&
        "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 border-b",
      side === "bottom" &&
        "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 border-t",
      className,
    )}
    {...rest}
  >
    {children}
  </ArkDialog.Content>
);

const SheetCloseTrigger = ({
  className,
  children,
  ...rest
}: ComponentProps<typeof ArkDialog.CloseTrigger>) => {
  if (!children) {
    return (
      <ArkDialog.CloseTrigger
        className={cn(
          "absolute top-4 right-4 cursor-pointer rounded opacity-70 outline-none ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none",
          className,
        )}
        {...rest}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </ArkDialog.CloseTrigger>
    );
  }

  return (
    <ArkDialog.CloseTrigger className={className} {...rest}>
      {children}
    </ArkDialog.CloseTrigger>
  );
};

const SheetTitle = ({
  className,
  ...rest
}: ComponentProps<typeof ArkDialog.Title>) => (
  <ArkDialog.Title
    className={cn(
      "font-semibold text-lg leading-none tracking-tight",
      className,
    )}
    {...rest}
  />
);

export {
  SheetBackdrop,
  SheetCloseTrigger,
  SheetContent,
  SheetContext,
  SheetPositioner,
  SheetRoot,
  SheetTitle,
  SheetTrigger,
};
