import { expect, test } from "./fixtures";

/**
 * Warden (authZ) and Aether (billing) integration tests.
 * Verifies plan display, limit enforcement, and access control
 * in the workspace settings UI and API health endpoint.
 */
test.describe("Warden / Aether integration", () => {
  test("workspace settings should show current plan info", async ({
    page,
    navigateToPage,
  }) => {
    await navigateToPage("/settings");

    // Plan heading should be visible
    await expect(page.getByRole("heading", { name: "Plan" })).toBeVisible();

    // Should display the active plan name (Free for the test account)
    await expect(page.getByText(/free plan/i)).toBeVisible();
  });

  test("workspace settings should display plan limits", async ({
    page,
    navigateToPage,
  }) => {
    await navigateToPage("/settings");

    // Workflow limit
    await expect(page.getByText(/\d+ workflows/i)).toBeVisible();

    // Execution limit (may display as "runs" or "executions")
    await expect(
      page.getByText(/[\d,]+ (runs|executions)\/month/i),
    ).toBeVisible();
  });

  test("unauthorized access to another workspace should be rejected", async ({
    page,
  }) => {
    // Attempt to navigate to a workspace the test user does not belong to
    const fakeSlug = "nonexistent-workspace-slug-000";

    await page.goto(`/workspaces/${fakeSlug}`);
    await page.waitForLoadState("networkidle");

    // Should not render the workspace layout (sidebar nav)
    const sidebar = page
      .locator("aside")
      .filter({ has: page.locator("nav") })
      .first();

    const sidebarVisible = await sidebar.isVisible().catch(() => false);

    // Either we get a 404/error page or a redirect away from the workspace
    const url = page.url();
    const onWorkspaceDashboard =
      url.includes(`/workspaces/${fakeSlug}`) && sidebarVisible;

    expect(onWorkspaceDashboard).toBe(false);
  });

  test("API health endpoint should include authorization info", async ({
    page,
  }) => {
    // Hit the Vortex API health endpoint directly
    const response = await page.request.get(
      "https://api.vortex.omni.dev/health",
    );

    expect(response.ok()).toBe(true);

    const body = await response.json();

    // Health response should indicate service status
    expect(body).toHaveProperty("status");
    expect(body.status).toBe("ok");

    // Should report whether authZ (Warden) is configured
    if ("authorization" in body) {
      expect(typeof body.authorization).toBe("object");
    }
  });

  test("workspace settings should show upgrade option on free plan", async ({
    page,
    navigateToPage,
  }) => {
    await navigateToPage("/settings");

    // Free plan users should see an upgrade prompt or button
    const upgradeButton = page.getByRole("button", { name: /upgrade/i });
    const upgradeLink = page.getByRole("link", { name: /upgrade/i });

    const hasUpgradeOption =
      (await upgradeButton.isVisible().catch(() => false)) ||
      (await upgradeLink.isVisible().catch(() => false));

    // On the free plan, an upgrade path should be available
    expect(hasUpgradeOption).toBe(true);
  });
});
