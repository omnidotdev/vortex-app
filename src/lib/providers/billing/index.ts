/**
 * Billing provider for Vortex.
 *
 * Thin wrapper around @omnidotdev/providers.
 */

import { createBillingProvider } from "@omnidotdev/providers/billing";

import { BILLING_INTERNAL_URL } from "@/lib/config/env.config";

export type {
  BillingProvider,
  CheckoutParams,
  Entitlement,
  EntitlementsResponse,
  Price,
  Subscription,
} from "@omnidotdev/providers/billing";

// Degrade to a noop provider when no billing URL is configured, matching the
// other products. Otherwise an unset URL builds the Aether provider with an
// undefined baseUrl and every billing call silently fetches "undefined/...".
const billing = createBillingProvider(
  BILLING_INTERNAL_URL
    ? { provider: "aether", baseUrl: BILLING_INTERNAL_URL, appId: "vortex" }
    : { provider: "noop" },
);

export default billing;
