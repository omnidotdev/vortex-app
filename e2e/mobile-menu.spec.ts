import { expect, test } from "./fixtures";

/**
 * Bug #1: Mobile hamburger menu broken.
 * The "Open menu" button on mobile (375x812) doesn't open any navigation drawer.
 */
test.describe("mobile hamburger menu", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("should open navigation drawer when hamburger button is clicked", async ({
    page,
    navigateToPage,
  }) => {
    // Use settings page — it loads without API-dependent content that could error
    await navigateToPage("/settings");

    // The mobile header should be visible at this viewport
    const menuButton = page.getByRole("button", { name: "Open menu" });
    await expect(menuButton).toBeVisible({ timeout: 10_000 });

    // Click the hamburger menu
    await menuButton.click();

    // The Sheet (navigation drawer) should appear as a dialog
    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible({ timeout: 5_000 });

    // Verify navigation links are present inside the drawer
    const nav = drawer.locator("nav");
    await expect(nav.getByRole("link", { name: "Dashboard" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Workflows" })).toBeVisible();
    await expect(
      nav.getByRole("link", { name: "Integrations" }),
    ).toBeVisible();
  });

  test("should close drawer when a nav link is clicked", async ({
    page,
    navigateToPage,
  }) => {
    // Use settings page — it loads without API-dependent content that could error
    await navigateToPage("/settings");

    const menuButton = page.getByRole("button", { name: "Open menu" });
    await expect(menuButton).toBeVisible({ timeout: 10_000 });
    await menuButton.click();

    // Wait for drawer to open
    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible({ timeout: 5_000 });

    // Click a nav link inside the drawer
    await drawer
      .locator("nav")
      .getByRole("link", { name: "Settings" })
      .click();

    // Drawer should close (dialog should no longer be visible)
    await expect(drawer).toBeHidden({ timeout: 5_000 });

    // The hamburger button should be visible again (header still present)
    await expect(menuButton).toBeVisible();
  });
});
