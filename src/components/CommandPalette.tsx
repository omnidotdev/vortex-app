import { CommandPalette as CommandPaletteShell } from "@omnidotdev/thornberry/command-palette";
import {
  GLOBAL_HOTKEYS,
  hotkeyLabel,
  useHotkeys,
} from "@omnidotdev/thornberry/use-hotkeys";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import {
  CreditCard,
  HomeIcon,
  LayoutDashboard,
  MoonStar,
  Workflow,
} from "lucide-react";

import { useTheme } from "@/providers/ThemeProvider";

import type { CommandAction } from "@omnidotdev/thornberry/command-palette";

/**
 * Global command palette (⌘/Ctrl+K). Mounted once at the app root so it works on
 * every route. Exposes top-level navigation and the theme toggle. Built on the
 * shared Thornberry palette so every Omni app shares the same behavior; this
 * wrapper only supplies Vortex's own actions. The shell owns the open state and
 * the mod+k hotkey, so no local open state is needed here.
 */
const CommandPalette = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { session } = useRouteContext({ strict: false });

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // App-wide theme shortcut. react-hotkeys-hook ignores form fields by default,
  // so this never fires while typing in the palette input or any other field
  useHotkeys(GLOBAL_HOTKEYS.toggleTheme, toggleTheme);

  const commands: CommandAction[] = [
    {
      id: "home",
      label: "Home",
      group: "Navigation",
      icon: HomeIcon,
      onSelect: () => navigate({ to: "/" }),
    },
    {
      id: "pricing",
      label: "Pricing",
      group: "Navigation",
      icon: CreditCard,
      onSelect: () => navigate({ to: "/pricing" }),
    },
    {
      id: "demo",
      label: "Demo",
      group: "Navigation",
      icon: Workflow,
      keywords: ["playground", "canvas", "flow"],
      onSelect: () => navigate({ to: "/demo" }),
    },
    // Workspaces lives behind the authenticated app shell, so only surface it
    // to signed-in users (the route itself redirects unauthenticated visitors)
    ...(session?.user
      ? [
          {
            id: "workspaces",
            label: "Workspaces",
            group: "Navigation",
            icon: LayoutDashboard,
            keywords: ["dashboard", "org"],
            onSelect: () => navigate({ to: "/workspaces" }),
          } satisfies CommandAction,
        ]
      : []),
    {
      id: "toggle-theme",
      label:
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
      group: "Preferences",
      icon: MoonStar,
      keywords: ["theme", "dark", "light", "appearance"],
      shortcut: hotkeyLabel(GLOBAL_HOTKEYS.toggleTheme),
      onSelect: toggleTheme,
    },
  ];

  return (
    <CommandPaletteShell commands={commands} placeholder="Search actions..." />
  );
};

export default CommandPalette;
