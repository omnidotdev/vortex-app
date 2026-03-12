import { expect, test } from "./fixtures";

/**
 * Auth (Gatekeeper/HIDRA) and authorization (Warden) integration tests.
 * Verifies OIDC flow, session management, and workspace access control.
 */
test.describe("auth and authorization", () => {
  test("authenticated user should see their profile in sidebar", async ({
    page,
  }) => {
    await page.goto("/workspaces");
    await page.waitForLoadState("networkidle");

    // Verify user info is displayed
    await expect(page.getByText("Claude Test")).toBeVisible();
    await expect(page.getByText("claude@omni.dev")).toBeVisible();
  });

  test("sign out should redirect to landing page", async ({ page }) => {
    await page.goto("/workspaces");
    await page.waitForLoadState("networkidle");

    // Click sign out
    await page.getByRole("button", { name: /sign out/i }).click();

    // Should redirect to landing page
    await page.waitForURL(/vortex\.omni\.dev\/?$/, { timeout: 15_000 });

    // Sign In button should be visible
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });

  test("unauthenticated access to workspaces should show sign in", async ({
    browser,
  }) => {
    // Create a new context without stored auth
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://vortex.omni.dev/workspaces");
    await page.waitForLoadState("networkidle");

    // Should either redirect to sign in or show sign in button
    const isOnIdentity = page.url().includes("identity.omni.dev");
    const hasSignIn = await page
      .getByRole("button", { name: /sign in/i })
      .isVisible()
      .catch(() => false);

    expect(isOnIdentity || hasSignIn).toBeTruthy();

    await context.close();
  });

  test("accessing nonexistent workspace should show not found", async ({
    page,
  }) => {
    const response = await page.goto("/workspaces/nonexistent-workspace-12345");

    await page.waitForLoadState("networkidle");

    // Should show workspace not found message
    await expect(
      page.getByText(/not found|doesn't exist|no access/i).first(),
    ).toBeVisible({ timeout: 10_000 });
  });

  test("sign in flow should use PKCE with HIDRA", async ({ browser }) => {
    // Create a fresh context
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://vortex.omni.dev/");
    await page.waitForLoadState("networkidle");

    // Click sign in
    await page.getByRole("button", { name: /sign in/i }).click();

    // Wait for HIDRA redirect
    await page.waitForURL(/identity\.omni\.dev/, { timeout: 15_000 });

    // Verify PKCE parameters in the URL
    const url = new URL(page.url());

    expect(url.searchParams.get("code_challenge_method")).toBe("S256");
    expect(url.searchParams.get("code_challenge")).toBeTruthy();
    expect(url.searchParams.get("response_type")).toBe("code");
    expect(url.searchParams.get("scope")).toContain("openid");

    await context.close();
  });
});
