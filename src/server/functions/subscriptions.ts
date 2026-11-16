import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import billing from "@/lib/providers/billing";
import { authMiddleware } from "@/server/middleware";

const organizationSchema = z.object({
  organizationId: z.string().min(1),
});

/**
 * Validate access token or throw.
 */
const requireAccessToken = (accessToken: string | undefined): string => {
  if (!accessToken) {
    throw new Error("Access token required");
  }
  return accessToken;
};

/**
 * Get subscription details for an organization. Buying, changing, and
 * canceling a plan happen on the Omni account hub (see `lib/billing/hubLinks`),
 * not here.
 */
export const getSubscription = createServerFn()
  .middleware([authMiddleware])
  .inputValidator((data) => organizationSchema.parse(data))
  .handler(async ({ data, context }) => {
    return billing.getSubscription(
      "organization",
      data.organizationId,
      requireAccessToken(context.session.accessToken),
    );
  });
