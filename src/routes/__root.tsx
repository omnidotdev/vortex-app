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
import { fetchMaintenanceMode } from "@/lib/providers";
import { setAccessToken } from "@/lib/graphql/graphqlClientFactory";
import appCss from "@/lib/styles/globals.css?url";
import ThemeProvider from "@/providers/ThemeProvider";
import { fetchSession } from "@/server/functions/auth";
import { getTheme } from "@/server/functions/theme";

import type { QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import type { AuthSession } from "@/lib/auth/getAuth";
import type { Theme } from "@/providers/ThemeProvider";

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
      {
        title: "Vortex",
      },
      {
        name: "description",
        content: "Workflow automation for the decentralized web",
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
    console.error(error);
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

  // Set access token on client-side after hydration
  // The beforeLoad sets it during SSR, but the client needs it too
  useEffect(() => {
    if (session?.accessToken) {
      setAccessToken(session.accessToken);
    }
  }, [session?.accessToken]);

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
