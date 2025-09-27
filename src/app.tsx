import { Suspense } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import { Toaster } from "@/components/ui/sonner";

const router = getRouter();

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
      <Toaster />
    </Suspense>
  );
}

export default App;
