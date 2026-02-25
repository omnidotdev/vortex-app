/**
 * Billing provider for Vortex.
 *
 * Thin wrapper around @omnidotdev/providers.
 */

import { createBillingProvider } from "@omnidotdev/providers";

import { BILLING_BASE_URL } from "@/lib/config/env.config";

export type {
  BillingProvider,
  CheckoutParams,
  Entitlement,
  EntitlementsResponse,
  Price,
  Subscription,
} from "@omnidotdev/providers";

const billing = createBillingProvider({
  baseUrl: BILLING_BASE_URL,
  appId: "vortex",
});

export default billing;
