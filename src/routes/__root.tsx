import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { Toaster } from "sonner";
import ThemeProvider from "@/providers/ThemeProvider";
import { fetchSession } from "@/server/functions/auth";
import { getTheme } from "@/server/functions/theme";
import appCss from "@/lib/styles/globals.css?url";

import type { QueryClient } from "@tanstack/react-query";
import type { AuthSession } from "@/lib/auth/getAuth";
import type { ReactNode } from "react";
import type { Theme } from "@/providers/ThemeProvider";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  session: AuthSession | null;
}>()({
  beforeLoad: async () => {
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
        title: "Vortex - Workflow Automation Platform",
      },
      {
        name: "description",
        content:
          "A powerful open-source workflow automation engine. Dev-first, JSON-first.",
      },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/logo.png" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  errorComponent: ({ error }) => (
    <RootDocument theme="system">
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Something went wrong
          </h1>
          <p className="mt-2 text-gray-600">{error.message}</p>
        </div>
      </div>
    </RootDocument>
  ),
  component: RootComponent,
});

function RootComponent() {
  const theme = Route.useLoaderData();

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

        <Scripts />
      </body>
    </html>
  );
}
