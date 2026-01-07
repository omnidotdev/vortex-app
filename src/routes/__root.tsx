import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { Toaster } from "sonner";

import { isDevEnv } from "@/lib/config/env.config";
import appCss from "@/lib/styles/globals.css?url";
import ThemeProvider from "@/providers/ThemeProvider";
import { fetchSession } from "@/server/functions/auth";
import { getTheme } from "@/server/functions/theme";

import type { QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import type { AuthSession } from "@/lib/auth/getAuth";
import type { Theme } from "@/providers/ThemeProvider";

/**
 * Log errors in a structured format for debugging and future Sentry integration.
 *
 * TODO: Integrate Sentry for production error tracking
 * - Install @sentry/react and @sentry/bun
 * - Initialize Sentry in app entry point
 * - Replace console.error with Sentry.captureException(error, { extra: context })
 */
function logError(error: Error, context?: Record<string, unknown>) {
  // TODO: Replace with Sentry.captureException(error, { extra: context })
  // eslint-disable-next-line no-console
  console.error("[App Error]", {
    message: error.message,
    name: error.name,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    url: typeof window !== "undefined" ? window.location.href : "server",
    ...context,
  });
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  session: AuthSession | null;
}>()({
  beforeLoad: async () => {
    // Skip auth in production (coming soon page)
    if (!isDevEnv) return { session: null };
    const { session } = await fetchSession();
    return { session };
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
      {
        title: "Vortex",
      },
      {
        name: "description",
        content: "Coming soon",
      },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/logo.png" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  errorComponent: ErrorComponent,
  component: RootComponent,
});

function ErrorComponent({ error }: { error: Error }) {
  useEffect(() => {
    logError(error, { component: "RootErrorBoundary" });
  }, [error]);

  return (
    <RootDocument theme="system">
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="font-bold text-2xl text-red-600">
            Something went wrong
          </h1>
          <p className="mt-2 text-gray-600">{error.message}</p>
        </div>
      </div>
    </RootDocument>
  );
}

function ComingSoon() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center">
        <div className="text-9xl">🌪️</div>
      </div>
    </div>
  );
}

function RootComponent() {
  const theme = Route.useLoaderData();

  // Show coming soon page in production
  if (!isDevEnv) {
    return (
      <RootDocument theme={theme}>
        <ComingSoon />
      </RootDocument>
    );
  }

  return (
    <RootDocument theme={theme}>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({
  children,
  theme,
}: Readonly<{ children: ReactNode; theme: Theme }>) {
  return (
    <html lang="en" className={theme}>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider theme={theme}>
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>

        {/* dev tools (only included in development) */}
        {isDevEnv && (
          <TanStackDevtools
            plugins={[
              {
                name: "Router",
                render: <TanStackRouterDevtoolsPanel />,
                defaultOpen: true,
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
