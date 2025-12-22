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
    context: { queryClient, session: null },
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: () => (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Page Not Found</h1>
          <p className="mt-2 text-gray-600">
            The page you're looking for doesn't exist.
          </p>
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

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
