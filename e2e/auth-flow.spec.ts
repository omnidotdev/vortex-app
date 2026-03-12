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

    // Retry once if redirected to landing page (session not yet applied)
    if (page.url().endsWith("/") || !page.url().includes("/workspaces")) {
      await page.waitForTimeout(2_000);
      await page.goto("/workspaces");
      await page.waitForLoadState("networkidle");
    }

    // Verify user info is displayed in the sidebar
    const sidebar = page.getByRole("complementary");

    await expect(
      sidebar.getByText("Claude Test", { exact: true }).first(),
    ).toBeVisible({ timeout: 15_000 });
    await expect(sidebar.getByText("claude@omni.dev")).toBeVisible();
  });

  test("sign out should redirect to landing page", async ({ page }) => {
    await page.goto("/workspaces");
    await page.waitForLoadState("networkidle");

    // Intercept the sign-out API call to prevent server-side session
    // invalidation (other tests share the same session token)
    await page.route("**/api/auth/sign-out", (route) =>
      route.fulfill({ status: 200, body: "{}" }),
    );

    // Click sign out
    await page.getByRole("button", { name: /sign out/i }).click();

    // Should redirect to landing page
    await page.waitForURL(/vortex\.omni\.dev\/?$/, { timeout: 15_000 });

    // Sign In button should be visible
    await expect(
      page
        .getByRole("button", { name: /sign in/i })
        .or(page.getByRole("link", { name: /sign in/i }))
        .first(),
    ).toBeVisible();
  });

  test("unauthenticated access to workspaces should show sign in", async ({
    browser,
  }) => {
    // Create a new context without stored auth (explicitly empty state)
    const context = await browser.newContext({
      storageState: { cookies: [], origins: [] },
    });
    const page = await context.newPage();

    await page.goto("https://vortex.omni.dev/workspaces");
    await page.waitForLoadState("networkidle");

    // Should either redirect to identity provider, show sign in button,
    // or redirect to landing page (unauthenticated users see landing)
    const url = page.url();
    const isOnIdentity = url.includes("identity.omni.dev");
    const isOnLanding =
      url === "https://vortex.omni.dev/" ||
      url === "https://vortex.omni.dev";
    const hasSignIn = await page
      .getByRole("button", { name: /sign in/i })
      .or(page.getByRole("link", { name: /sign in/i }))
      .first()
      .isVisible()
      .catch(() => false);

    expect(isOnIdentity || isOnLanding || hasSignIn).toBeTruthy();

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
    // Create a fresh context without auth
    const context = await browser.newContext({
      storageState: { cookies: [], origins: [] },
    });
    const page = await context.newPage();

    await page.goto("https://vortex.omni.dev/");
    await page.waitForLoadState("networkidle");

    // Click sign in (could be button or link in the header)
    const signIn = page
      .getByRole("button", { name: /sign in/i })
      .or(page.getByRole("link", { name: /sign in/i }));

    await signIn.first().click();

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
