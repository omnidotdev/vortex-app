import path from "node:path";

import { test as setup } from "@playwright/test";

const AUTH_FILE = path.join(import.meta.dirname, ".auth/session.json");

/**
 * Authenticate via HIDRA OAuth2 and persist session storage.
 * Runs once before all test projects. Skips login if already authenticated.
 */
setup("authenticate", async ({ page }) => {
  // Navigate to the app
  await page.goto("/workspaces");
  await page.waitForLoadState("networkidle");

  // Check if already authenticated by looking for workspace content
  const hasWorkspaces = await page
    .locator('a[href*="/workspaces/"]')
    .first()
    .isVisible()
    .catch(() => false);

  if (!hasWorkspaces) {
    // Navigate to landing and initiate OAuth2 flow
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Wait for the Sign In button to be visible and stable before clicking
    const signIn = page.getByRole("button", { name: "Sign In" }).first();
    await signIn.waitFor({ state: "visible", timeout: 10_000 });
    await signIn.click();

    // Wait for redirect to HIDRA identity provider
    await page.waitForURL(/identity\.omni\.dev/, { timeout: 30_000 });
    await page.waitForLoadState("networkidle");

    // Fill in credentials
    const emailInput = page.getByLabel("Email or Username");
    await emailInput.waitFor({ state: "visible", timeout: 10_000 });
    await emailInput.clear();
    await emailInput.fill("claude@omni.dev");

    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.clear();
    await passwordInput.fill("Kx9$mVz!4wQpL2nR");

    // Submit login form
    await page.getByRole("button", { name: "Sign In", exact: true }).click();

    // Wait for the full OAuth redirect chain to settle:
    // HIDRA -> vortex callback -> /workspaces (the callback 302s to /workspaces).
    // Don't use waitForURL with a partial match, since it resolves on the
    // intermediate callback URL before cookies are fully set. Instead, wait
    // for the final destination by checking for workspace content.
    let authenticated = false;

    for (let attempt = 0; attempt < 6; attempt++) {
      // Wait for redirects to settle
      await page.waitForTimeout(3_000);

      // Force a full page load to ensure server-side session check
      await page.goto("/workspaces", { waitUntil: "networkidle" });
      await page.waitForTimeout(1_000);

      const hasLinks = await page
        .locator('a[href*="/workspaces/"]')
        .first()
        .isVisible()
        .catch(() => false);

      if (hasLinks) {
        authenticated = true;
        break;
      }
    }

    if (!authenticated) {
      const url = page.url();
      const title = await page.title();
      const cookies = await page.context().cookies();
      const vortexCookies = cookies
        .filter((c) => c.name.includes("vortex"))
        .map((c) => c.name)
        .join(", ");

      throw new Error(
        `Auth setup failed: workspace links not visible after login.\n` +
          `URL: ${url}\nTitle: ${title}\n` +
          `Vortex cookies: ${vortexCookies || "(none)"}`,
      );
    }
  }

  // Save the authenticated session state
  await page.context().storageState({ path: AUTH_FILE });
});
