import { expect, test } from "@playwright/test";

/**
 * Public landing page tests (no auth required).
 * Verifies the marketing site renders correctly.
 */
test.describe("landing page", () => {
  // Use empty storage state to ensure unauthenticated view
  test.use({ storageState: { cookies: [], origins: [] } });

  test("should display hero section with CTAs", async ({ page }) => {
    await page.goto("https://vortex.omni.dev/");
    await page.waitForLoadState("networkidle");

    // Hero headline
    await expect(
      page.getByRole("heading", { name: /automate anything/i }),
    ).toBeVisible();
    await expect(page.getByText("with confidence")).toBeVisible();

    // CTAs
    await expect(
      page.getByRole("button", { name: /get started free/i }),
    ).toBeVisible();
    await expect(
      page.getByText("View on GitHub").first(),
    ).toBeVisible();

    // Stats badges
    await expect(page.getByText("100%")).toBeVisible();
    await expect(page.getByText("Open Source").first()).toBeVisible();
  });

  test("should display features section", async ({ page }) => {
    await page.goto("https://vortex.omni.dev/");
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByRole("heading", { name: "Visual Workflow Builder" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Powerful Integrations" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Reliable Execution" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Lightning Fast" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Scheduled Tasks" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Version Control" }),
    ).toBeVisible();
  });

  test("should display use cases section", async ({ page }) => {
    await page.goto("https://vortex.omni.dev/");
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByText("Data pipeline orchestration"),
    ).toBeVisible();
    await expect(page.getByText("CI/CD automation")).toBeVisible();
    await expect(
      page.getByText("Business process automation"),
    ).toBeVisible();
  });

  test("footer should have correct links", async ({ page }) => {
    await page.goto("https://vortex.omni.dev/");
    await page.waitForLoadState("networkidle");

    // Footer
    const footer = page.locator("footer");

    await expect(footer.getByText("Made by")).toBeVisible();
    await expect(footer.getByText("2026")).toBeVisible();

    // Social links exist
    const socialLinks = footer.locator("a");
    const count = await socialLinks.count();

    expect(count).toBeGreaterThanOrEqual(4);
  });

  test("should have proper meta title", async ({ page }) => {
    await page.goto("https://vortex.omni.dev/");

    const title = await page.title();

    expect(title).toBe("Vortex");
  });
});
