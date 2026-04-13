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

const billing = createBillingProvider({
  provider: "aether",
  baseUrl: BILLING_INTERNAL_URL,
  appId: "vortex",
});

export default billing;
