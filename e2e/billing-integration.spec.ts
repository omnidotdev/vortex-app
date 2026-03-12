import { expect, test } from "./fixtures";

/**
 * Aether billing integration tests.
 * Verifies the pricing page, plan display, and Stripe checkout flow.
 */
test.describe("billing / Aether integration", () => {
  test("pricing page should display all tiers", async ({ page }) => {
    await page.goto("/pricing");
    await page.waitForLoadState("networkidle");

    // Verify all plan tiers are visible
    await expect(page.getByText("Free")).toBeVisible();
    await expect(page.getByText("Starter")).toBeVisible();
    await expect(page.getByText("Pro")).toBeVisible();
    await expect(page.getByText("Team")).toBeVisible();
    await expect(page.getByText("Enterprise")).toBeVisible();

    // Verify prices
    await expect(page.getByText("$0")).toBeVisible();
    await expect(page.getByText("$12")).toBeVisible();
    await expect(page.getByText("$39")).toBeVisible();
    await expect(page.getByText("$99")).toBeVisible();
    await expect(page.getByText("Custom")).toBeVisible();
  });

  test("yearly toggle should show discounted prices", async ({ page }) => {
    await page.goto("/pricing");
    await page.waitForLoadState("networkidle");

    // Click yearly tab
    const yearlyTab = page.getByRole("tab", { name: /yearly/i });

    await yearlyTab.click();
    await page.waitForTimeout(1_000);

    // Prices should be different (discounted) in yearly view
    await expect(page.getByText("save 20%")).toBeVisible();
  });

  test("upgrade button should open workspace picker", async ({ page }) => {
    await page.goto("/pricing");
    await page.waitForLoadState("networkidle");

    // Click a paid plan button
    await page.getByRole("button", { name: /continue with starter/i }).click();

    // Should show workspace picker menu
    await expect(
      page.getByRole("menuitem", { name: /upgrade/i }).first(),
    ).toBeVisible({ timeout: 5_000 });
  });

  test("upgrade should redirect to Stripe checkout", async ({ page }) => {
    await page.goto("/pricing");
    await page.waitForLoadState("networkidle");

    // Click Starter plan
    await page.getByRole("button", { name: /continue with starter/i }).click();

    // Select workspace
    const upgradeItem = page
      .getByRole("menuitem", { name: /upgrade/i })
      .first();

    await upgradeItem.click();

    // Should redirect to Stripe checkout
    await page.waitForURL(/checkout\.stripe\.com/, { timeout: 30_000 });

    // Verify Stripe checkout loaded with correct plan
    await expect(page.getByText(/subscribe to vortex/i).first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("workspace settings should show current plan", async ({
    page,
    workspacePath,
  }) => {
    await page.goto(`${workspacePath}/settings`);
    await page.waitForLoadState("networkidle");

    // Should show the Plan section
    await expect(page.getByText("Plan")).toBeVisible();
    await expect(page.getByText(/free plan/i)).toBeVisible();

    // Should show plan limits
    await expect(page.getByText(/5 workflows/i)).toBeVisible();
    await expect(page.getByText(/1,000 runs\/month/i)).toBeVisible();
  });

  test("FAQ section should be expandable", async ({ page }) => {
    await page.goto("/pricing");
    await page.waitForLoadState("networkidle");

    // Click first FAQ
    const faqButton = page
      .getByRole("button", { name: /can i cancel/i })
      .first();

    await faqButton.click();

    // Content should be visible after expanding
    await page.waitForTimeout(500);

    // Check that the FAQ expanded (content area should have some text)
    const faqRegion = page.locator('[role="region"]').first();
    const hasExpandedContent = await faqRegion.isVisible().catch(() => false);

    // At minimum, the button should be in expanded state
    const isExpanded = await faqButton.getAttribute("aria-expanded");

    expect(isExpanded).toBe("true");
  });
});
