import { createServerFn } from "@tanstack/react-start";

import { flags } from "@/lib/providers";

const FLAGS = {
  MAINTENANCE_MODE: "vortex-app-maintenance-mode",
} as const;

/**
 * Fetch the value of the maintenance mode feature flag.
 */
export const fetchMaintenanceMode = createServerFn({ method: "GET" }).handler(
  async () => {
    const isMaintenanceMode = await flags.isEnabled(FLAGS.MAINTENANCE_MODE);
    return { isMaintenanceMode };
  },
);
