import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

/**
 * Get the sidebar open state from cookies on the server.
 */
export const getSidebarState = createServerFn().handler(async () => {
  const sidebarState = getCookie("sidebar:state");
  const sidebarWidth = getCookie("sidebar:width");

  const defaultOpen = sidebarState ? sidebarState === "true" : true;

  return { defaultOpen, sidebarWidth: sidebarWidth || undefined };
});
