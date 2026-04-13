import { createServerFn } from "@tanstack/react-start";

import app from "@/lib/config/app.config";
import billing from "@/lib/providers/billing";

import type { Price } from "@/lib/providers/billing";

/**
 * Fetch all prices for this app.
 * Prices are filtered by app name metadata and sorted by unit amount (ascending).
 */
export const getPrices = createServerFn().handler(
  async (): Promise<Price[]> => {
    try {
      return await billing.getPrices(app.name.toLowerCase());
    } catch {
      console.warn(
        "[prices] Billing service unavailable, returning empty prices",
      );
      return [];
    }
  },
);
