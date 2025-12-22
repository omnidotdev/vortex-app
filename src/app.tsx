import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import { Suspense } from "react";

import { Toaster } from "@/components/ui/sonner";
import { queryClient } from "@/lib/query-client";
import { getRouter } from "./router";

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
