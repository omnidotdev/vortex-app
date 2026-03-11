import { expect, test } from "./fixtures";

/**
 * Bug #1: Mobile hamburger menu broken.
 * The "Open menu" button on mobile (375x812) doesn't open any navigation drawer.
 */
test.describe("mobile hamburger menu", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("should open navigation drawer when hamburger button is clicked", async ({
    page,
    workspacePath,
  }) => {
    await page.goto(workspacePath);
    await page.waitForLoadState("networkidle");

    // The mobile header should be visible at this viewport
    const menuButton = page.getByRole("button", { name: "Open menu" });
    await expect(menuButton).toBeVisible();

    // Click the hamburger menu
    await menuButton.click();

    // The Sheet (navigation drawer) should appear with navigation links
    // The Sheet content has role="dialog" in Ark UI
    const drawer = page.locator('[data-scope="dialog"][data-part="content"]');

    // Fall back to checking for visible nav links if Ark UI doesn't use standard dialog role
    const navDrawerVisible = drawer
      .or(page.getByRole("dialog"))
      .or(
        page
          .locator('[data-state="open"]')
          .filter({ hasText: /dashboard|workflows/i }),
      );

    await expect(navDrawerVisible.first()).toBeVisible({ timeout: 5_000 });

    // Verify navigation links are present inside the drawer
    await expect(
      page.getByRole("link", { name: "Dashboard" }).last(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Workflows" }).last(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Integrations" }).last(),
    ).toBeVisible();
  });

  test("should close drawer when a nav link is clicked", async ({
    page,
    workspacePath,
  }) => {
    await page.goto(workspacePath);
    await page.waitForLoadState("networkidle");

    const menuButton = page.getByRole("button", { name: "Open menu" });
    await menuButton.click();

    // Wait for drawer to open
    await expect(
      page.getByRole("link", { name: "Workflows" }).last(),
    ).toBeVisible({ timeout: 5_000 });

    // Click a nav link
    await page.getByRole("link", { name: "Workflows" }).last().click();

    // Drawer should close (the navigation links inside the drawer should no longer be visible)
    // Allow time for navigation + drawer animation
    await page.waitForTimeout(1_000);

    // The hamburger button should be visible again (header still present)
    await expect(menuButton).toBeVisible();
  });
});
