import { MutationCache, QueryClient, matchQuery } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { routeTree } from "./routeTree.gen";

import type { QueryKey } from "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: {
      invalidates?: Array<QueryKey>;
    };
  }
}

export function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
    mutationCache: new MutationCache({
      onSettled: (_data, _error, _variables, _context, mutation) => {
        queryClient.invalidateQueries({
          predicate: (query) => {
            if (
              mutation.meta?.invalidates?.some((queryKey) =>
                queryKey.includes("all"),
              )
            )
              return true;

            return (
              mutation.meta?.invalidates?.some((queryKey) =>
                matchQuery({ queryKey }, query),
              ) ?? false
            );
          },
        });
      },
    }),
  });

  const router = createTanStackRouter({
    routeTree,
    context: { queryClient, session: null, isMaintenanceMode: false },
    defaultPreload: "intent",
    defaultPreloadStaleTime: 30_000,
    // Scroll restoration on navigation
    scrollRestoration: true,
    defaultNotFoundComponent: () => (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
        <div className="text-center">
          <div className="mb-6 text-6xl">🌪️</div>
          <h1 className="font-bold text-2xl text-foreground">Page Not Found</h1>
          <p className="mt-2 max-w-md text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6">
            <a
              href="/workspaces"
              className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
            >
              Go to workspaces
            </a>
          </div>
        </div>
      </div>
    ),
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
}
