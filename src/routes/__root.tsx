import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

import { isDevEnv } from "@/lib/config/env.config";
import { setAccessToken } from "@/lib/graphql/graphqlClientFactory";
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

/** Parse exp claim from a JWT without verifying signature */
function getTokenExpMs(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return (payload.exp as number) * 1000;
  } catch {
    return null;
  }
}

/** Fetch a fresh access token from the server session */
async function refreshAccessToken(): Promise<string | null> {
  try {
    const { session } = await fetchSession();
    return session?.accessToken ?? null;
  } catch {
    return null;
  }
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  session: AuthSession | null;
  isMaintenanceMode: boolean;
}>()({
  beforeLoad: async () => {
    const { session } = await fetchSession();
    const { isMaintenanceMode } = await fetchMaintenanceMode();

    // Set access token for GraphQL client during SSR
    // Note: This only works server-side. Client-side token is set in RootComponent useEffect
    if (session?.accessToken) {
      setAccessToken(session.accessToken);
    }

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
  const { isMaintenanceMode, session } = Route.useRouteContext();

  const [currentToken, setCurrentToken] = useState(session?.accessToken);

  // Set access token on client-side after hydration
  useEffect(() => {
    const token = currentToken ?? session?.accessToken;
    if (token) {
      setAccessToken(token);
    }
  }, [currentToken, session?.accessToken]);

  // Proactively refresh the token before it expires
  useEffect(() => {
    const token = currentToken ?? session?.accessToken;
    if (!token) return;

    const expMs = getTokenExpMs(token);
    if (!expMs) return;

    // Refresh 60s before expiry
    const refreshAt = expMs - Date.now() - 60_000;
    if (refreshAt <= 0) {
      // Already expired or about to — refresh immediately
      refreshAccessToken().then((t) => setCurrentToken(t ?? undefined));
      return;
    }

    const timer = setTimeout(() => {
      refreshAccessToken().then((t) => setCurrentToken(t ?? undefined));
    }, refreshAt);

    return () => clearTimeout(timer);
  }, [currentToken, session?.accessToken]);

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
    <html lang="en" className={theme} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider theme={theme}>
          {children}
          <Toaster position="top-center" richColors />
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
