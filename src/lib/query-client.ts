import { QueryClient } from "@tanstack/react-query";

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time in milliseconds after data becomes stale
      staleTime: 1000 * 60 * 5, // 5 minutes
      // Time in milliseconds that unused/inactive cache data remains in memory
      gcTime: 1000 * 60 * 30, // 30 minutes (was cacheTime in v4)
      // Retry failed requests
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      // Background refetch settings
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      // Retry failed mutations
      retry: 1,
      // Show loading states for mutations
      networkMode: "online",
    },
  },
});

export default queryClient;
