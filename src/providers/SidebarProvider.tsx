import { createContext, useCallback, useState } from "react";

import type { PropsWithChildren } from "react";

interface SidebarContextValue {
  isOpen: boolean;
  width?: string;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

interface SidebarProviderProps {
  /** Initial open state, resolved on the server from cookies */
  defaultOpen?: boolean;
  /** Initial sidebar width, resolved on the server from cookies */
  defaultWidth?: string;
}

/**
 * Sidebar state provider. Accepts server-resolved defaults to avoid
 * hydration mismatch from client-side cookie parsing.
 */
const SidebarProvider = ({
  children,
  defaultOpen = true,
  defaultWidth,
}: PropsWithChildren<SidebarProviderProps>) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      document.cookie = `sidebar:state=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
      return next;
    });
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
    document.cookie = `sidebar:state=true; path=/; max-age=${60 * 60 * 24 * 365}`;
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.cookie = `sidebar:state=false; path=/; max-age=${60 * 60 * 24 * 365}`;
  }, []);

  return (
    <SidebarContext
      value={{ isOpen, width: defaultWidth, toggle, open, close }}
    >
      {children}
    </SidebarContext>
  );
};

export default SidebarProvider;
