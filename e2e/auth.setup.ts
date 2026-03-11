import { test as setup, expect } from "@playwright/test";

import path from "node:path";

const AUTH_FILE = path.join(import.meta.dirname, ".auth/session.json");

/**
 * Authenticate via HIDRA OAuth2 and persist session storage.
 * Runs once before all test projects.
 */
setup("authenticate", async ({ page }) => {
  // Navigate to the app -- unauthenticated users land on the public landing page
  await page.goto("/");

  // Click the "Sign In" button to initiate OAuth2 flow
  await page.getByRole("button", { name: "Sign In" }).click();

  // Wait for redirect to the HIDRA identity provider (identity.omni.dev)
  await page.waitForURL(/identity\.omni\.dev/, { timeout: 30_000 });

  // Fill in credentials on the identity provider login form
  await page.getByLabel(/email|username/i).fill("claude@omni.dev");
  await page.getByLabel(/password/i).fill("Kx9$mVz!4wQpL2nR");

  // Submit the login form
  await page.getByRole("button", { name: /sign in|log in|continue/i }).click();

  // Wait for redirect back to vortex.omni.dev after successful auth
  await page.waitForURL(/vortex\.omni\.dev/, { timeout: 30_000 });

  // Verify we landed on an authenticated page (workspaces or workspace dashboard)
  await expect(
    page.getByText(/workspaces|dashboard|workflows/i).first(),
  ).toBeVisible({ timeout: 15_000 });

  // Save the authenticated session state
  await page.context().storageState({ path: AUTH_FILE });
});
