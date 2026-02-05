import { createServerFn } from "@tanstack/react-start";

import { isEnabled } from "./client";

const FLAGS = {
  MAINTENANCE_MODE: "vortex-app-maintenance-mode",
} as const;

/**
 * Fetch the value of the maintenance mode feature flag.
 */
export const fetchMaintenanceMode = createServerFn({ method: "GET" }).handler(
  async () => {
    const isMaintenanceMode = await isEnabled(FLAGS.MAINTENANCE_MODE, false);
    return { isMaintenanceMode };
  },
);
