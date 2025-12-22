import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

import type { PropsWithChildren } from "react";

// Simplified sidebar provider - will use Ark UI sidebar component
const getSidebarCookies = createIsomorphicFn()
  .server(() => {
    const sidebarState = getCookie("sidebar:state");
    const sidebarWidth = getCookie("sidebar:width");

    let defaultOpen = true;

    if (sidebarState) {
      defaultOpen = sidebarState === "true";
    }

    return { defaultOpen, sidebarWidth };
  })
  .client(() => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const sidebarState = cookies
      .find((cookie) => cookie.startsWith("sidebar:state="))
      ?.split("=")[1];

    const sidebarWidth = cookies
      .find((cookie) => cookie.startsWith("sidebar:width="))
      ?.split("=")[1];

    let defaultOpen = true;

    if (sidebarState) {
      defaultOpen = sidebarState === "true";
    }

    return { defaultOpen, sidebarWidth };
  });

interface SidebarContextValue {
  isOpen: boolean;
  width?: string;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

import { createContext, use, useState, useCallback } from "react";

const SidebarContext = createContext<SidebarContextValue | null>(null);

const SidebarProvider = ({ children }: PropsWithChildren) => {
  const { defaultOpen, sidebarWidth } = getSidebarCookies();
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
      value={{ isOpen, width: sidebarWidth, toggle, open, close }}
    >
      {children}
    </SidebarContext>
  );
};

export const useSidebar = () => {
  const val = use(SidebarContext);

  if (!val)
    throw new Error("`useSidebar` called outside of `<SidebarProvider />`");

  return val;
};

export default SidebarProvider;
