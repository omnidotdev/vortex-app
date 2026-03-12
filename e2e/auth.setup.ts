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
    .locator('a[href^="/workspaces/"]')
    .first()
    .isVisible()
    .catch(() => false);

  if (!hasWorkspaces) {
    // Navigate to landing and initiate OAuth2 flow
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // "Sign In" on the landing page is a link in the header
    const signIn = page
      .getByRole("link", { name: "Sign In" })
      .or(page.getByRole("button", { name: "Sign In" }));

    await signIn.first().click();

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

    // Wait for the OAuth callback to complete and redirect back to vortex.
    // The callback URL is /api/auth/oauth2/callback/omni which processes the
    // auth code, sets session cookies, and redirects to the app.
    await page.waitForURL(/vortex\.omni\.dev/, { timeout: 30_000 });
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2_000);

    // After callback, navigate to workspaces to verify session is active.
    // Retry a few times to handle slow session establishment.
    let authenticated = false;

    for (let attempt = 0; attempt < 3; attempt++) {
      await page.goto("/workspaces");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2_000);

      const hasLinks = await page
        .locator('a[href^="/workspaces/"]')
        .first()
        .isVisible()
        .catch(() => false);

      if (hasLinks) {
        authenticated = true;
        break;
      }

      // Session may not be ready yet, wait and retry
      await page.waitForTimeout(3_000);
    }

    if (!authenticated) {
      const url = page.url();
      const title = await page.title();

      throw new Error(
        `Auth setup failed: workspace links not visible after login.\n` +
          `URL: ${url}\nTitle: ${title}`,
      );
    }
  }

  // Save the authenticated session state
  await page.context().storageState({ path: AUTH_FILE });
});
