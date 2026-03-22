import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

import { isDevEnv } from "@/lib/config/env.config";
import useSessionRefresh from "@/lib/hooks/useSessionRefresh";
import { fetchMaintenanceMode } from "@/lib/providers";
import appCss from "@/lib/styles/globals.css?url";
import createMetaTags from "@/lib/util/createMetaTags";
import ThemeProvider from "@/providers/ThemeProvider";
import { fetchSession } from "@/server/functions/auth";
import { getTheme } from "@/server/functions/theme";

import type { QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import type { AuthSession } from "@/lib/auth/getAuth";
import type { Theme } from "@/providers/ThemeProvider";

/**
 * Fetch session and maintenance mode flag in a single server function.
 */
const fetchSessionAndMaintenanceMode = createServerFn({
  method: "GET",
}).handler(async () => {
  let session = null;
  let isMaintenanceMode = false;

  try {
    const result = await fetchSession();
    session = result.session;
  } catch (err) {
    console.error("[root] Failed to fetch session:", err);
  }

  try {
    const result = await fetchMaintenanceMode();
    isMaintenanceMode = result.isMaintenanceMode;
  } catch (err) {
    console.error("[root] Failed to fetch maintenance mode:", err);
  }

  return { session, isMaintenanceMode };
});

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  session: AuthSession | null;
  isMaintenanceMode: boolean;
}>()({
  beforeLoad: async () => {
    const { session, isMaintenanceMode } =
      await fetchSessionAndMaintenanceMode();

    // Skip auth when maintenance page is shown
    if (isMaintenanceMode) return { session: null, isMaintenanceMode };

    return { session, isMaintenanceMode };
  },
  loader: () => getTheme(),
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...createMetaTags(),
    ],
    links: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  errorComponent: ErrorComponent,
  component: RootComponent,
});

function ErrorComponent({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <RootDocument theme="system">
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
        <div className="text-center">
          <div className="mb-6 text-6xl">🌪️</div>
          <h1 className="font-bold text-2xl text-destructive">
            Something went wrong
          </h1>
          <p className="mt-2 max-w-md text-muted-foreground">
            An unexpected error occurred. Please try again or return to the home
            page.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-lg border border-border bg-card px-4 py-2 font-medium text-foreground text-sm transition-colors hover:bg-accent"
            >
              Try again
            </button>
            <a
              href="/workspaces"
              className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
            >
              Go to workspaces
            </a>
          </div>
        </div>
      </div>
    </RootDocument>
  );
}

function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-slate-900 to-slate-800 p-8 text-white">
      <div className="text-center">
        <div className="mb-6 text-9xl">🌪️</div>
        <h1 className="mb-4 font-bold text-4xl">Caught in a Whirlwind</h1>
        <p className="max-w-md text-lg text-slate-300">
          We're spinning up some improvements. Vortex will be back shortly.
        </p>
      </div>
    </div>
  );
}

function RootComponent() {
  const theme = Route.useLoaderData();
  const { isMaintenanceMode } = Route.useRouteContext();

  // Keep the OAuth access token fresh by periodically re-running the
  // root `beforeLoad` which calls `ensureFreshAccessToken` server-side
  useSessionRefresh();

  if (isMaintenanceMode) {
    return (
      <RootDocument theme={theme}>
        <MaintenancePage />
      </RootDocument>
    );
  }

  return (
    <RootDocument theme={theme}>
      <Outlet />
    </RootDocument>
  );
}

/**
 * Toaster wrapper that avoids hydration mismatch. Sonner resolves
 * `theme="system"` via `window.matchMedia` during `useState` init,
 * producing a different value on server (always "light") vs client
 * (depends on OS preference). Deferring to a `useEffect` keeps the
 * server and initial client render in sync.
 */
function ThemedToaster({ theme }: { theme: Theme }) {
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (theme !== "system") {
      setResolved(theme);
      return;
    }

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    setResolved(mql.matches ? "dark" : "light");

    const handler = (e: MediaQueryListEvent) =>
      setResolved(e.matches ? "dark" : "light");
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [theme]);

  return <Toaster theme={resolved} position="top-center" richColors />;
}

function RootDocument({
  children,
  theme,
}: Readonly<{ children: ReactNode; theme: Theme }>) {
  return (
    <html lang="en" className={theme} suppressHydrationWarning>
      <head suppressHydrationWarning>
        <HeadContent />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider theme={theme}>
          {children}
          <ThemedToaster theme={theme} />
        </ThemeProvider>

        {/* dev tools (only included in development) */}
        {isDevEnv && (
          <TanStackDevtools
            config={{
              position: "bottom-left",
              defaultOpen: false,
            }}
            plugins={[
              {
                name: "Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
              {
                name: "Query",
                render: <ReactQueryDevtoolsPanel />,
              },
            ]}
          />
        )}

        <Scripts />
      </body>
    </html>
  );
}
