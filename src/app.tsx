import { Suspense } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getRouter } from "./router";
import { Toaster } from "@/components/ui/sonner";
import { queryClient } from "@/lib/query-client";

const router = getRouter();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
        <Toaster />
      </Suspense>
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-right"
        position="bottom"
      />
    </QueryClientProvider>
  );
}

export default App;
