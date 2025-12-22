import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  component: PublicLayout,
});

/**
 * Public layout for unauthenticated pages (landing, pricing, etc.)
 */
function PublicLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
}
