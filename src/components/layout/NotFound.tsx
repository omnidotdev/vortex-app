import { NotFoundPage } from "@omnidotdev/thornberry/not-found";

import app from "@/lib/config/app.config";

/**
 * 404 not found. Renders the shared Omni `<NotFoundPage>` (in-shell,
 * theme-aware, prominent "404"), branded with Vortex's wordmark; the app brands
 * by wordmark only. Home points at the workspaces landing.
 */
const NotFound = () => (
  <NotFoundPage appName={app.name} homeHref="/workspaces" />
);

export default NotFound;
