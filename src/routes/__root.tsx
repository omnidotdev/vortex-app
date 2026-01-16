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
import { useEffect } from "react";
import { Toaster } from "sonner";

import { isDevEnv } from "@/lib/config/env.config";
import { FLAGS, buildFlagContext, getBooleanFlag } from "@/lib/flags";
import appCss from "@/lib/styles/globals.css?url";
import ThemeProvider from "@/providers/ThemeProvider";
import { fetchSession } from "@/server/functions/auth";
import { getTheme } from "@/server/functions/theme";

import type { QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import type { AuthSession } from "@/lib/auth/getAuth";
import type { Theme } from "@/providers/ThemeProvider";

type Session = Awaited<ReturnType<typeof fetchSession>>["session"];

const fetchMaintenanceMode = createServerFn()
  .validator((session: Session) => session)
  .handler(async ({ data: session }) => {
    const flagContext = buildFlagContext(session ?? undefined);
    return getBooleanFlag(FLAGS.MAINTENANCE, false, flagContext);
  });

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
  isMaintenanceMode: boolean;
}>()({
  beforeLoad: async () => {
    const { session } = await fetchSession();
    const isMaintenanceMode = await fetchMaintenanceMode({ data: session });
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

function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
      <div className="text-center">
        <div className="mb-6 text-9xl">🌪️</div>
        <h1 className="mb-4 text-4xl font-bold">Caught in a Whirlwind</h1>
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
