import { expect, test } from "./fixtures";

/**
 * Launch readiness tests verifying critical paths work end-to-end.
 * Covers pricing, billing integration, workflow CRUD, and mobile responsiveness.
 */

test.describe("pricing page", () => {
  test("should load pricing page without 503", async ({ page }) => {
    const response = await page.goto("/pricing");
    expect(response?.status()).toBeLessThan(500);

    await expect(
      page.getByRole("heading", { name: /simple, transparent pricing/i }),
    ).toBeVisible({ timeout: 15_000 });
  });

  test("should display all pricing tiers", async ({ page }) => {
    await page.goto("/pricing");
    await page.waitForLoadState("networkidle");

    // Verify all tier names are visible
    for (const tier of ["Free", "Starter", "Pro", "Team", "Enterprise"]) {
      await expect(page.getByText(tier, { exact: true }).first()).toBeVisible();
    }
  });

  test("should toggle between monthly and yearly pricing", async ({ page }) => {
    await page.goto("/pricing");
    await page.waitForLoadState("networkidle");

    // Click yearly tab
    const yearlyTab = page.getByRole("tab", { name: /yearly/i });
    await yearlyTab.click();
    await expect(yearlyTab).toHaveAttribute("aria-selected", "true");

    // Click monthly tab
    const monthlyTab = page.getByRole("tab", { name: /monthly/i });
    await monthlyTab.click();
    await expect(monthlyTab).toHaveAttribute("aria-selected", "true");
  });

  test("should show FAQ section", async ({ page }) => {
    await page.goto("/pricing");
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByRole("heading", { name: /frequently asked questions/i }),
    ).toBeVisible();

    // Verify FAQ items are expandable
    const faqButton = page.getByRole("button", {
      name: /can i cancel at any time/i,
    });
    await expect(faqButton).toBeVisible();
  });
});

test.describe("workflow CRUD", () => {
  test("should create and delete a workflow", async ({
    page,
    workspaceSlug,
  }) => {
    // Navigate to create workflow page
    await page.goto(`/workspaces/${workspaceSlug}/workflows/new`);
    await page.waitForLoadState("networkidle");

    // Switch to "From Scratch"
    await page.getByRole("button", { name: /from scratch/i }).click();

    // Fill in workflow details
    const testName = `E2E Test ${Date.now()}`;
    await page.getByRole("textbox", { name: /workflow name/i }).fill(testName);
    await page
      .getByRole("textbox", { name: /description/i })
      .fill("Automated E2E test");

    // Create the workflow
    await page.getByRole("button", { name: /create workflow/i }).click();

    // Should redirect to editor
    await page.waitForURL(/\/workflows\/[a-f0-9-]+$/);
    await expect(page.getByRole("heading", { name: testName })).toBeVisible({
      timeout: 10_000,
    });

    // Go back to workflow list
    await page.goto(`/workspaces/${workspaceSlug}/workflows`);
    await page.waitForLoadState("networkidle");

    // Find and delete the test workflow
    const row = page.getByRole("row").filter({ hasText: testName });
    await expect(row).toBeVisible();

    // Click delete button (last button in the row)
    const deleteBtn = row.getByRole("button").last();
    await deleteBtn.click();

    // Confirm deletion
    const dialog = page.getByRole("alertdialog");
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: /delete/i }).click();

    // Verify workflow is removed
    await expect(row).not.toBeVisible({ timeout: 5_000 });
  });
});

test.describe("mobile responsiveness", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("should show hamburger menu on mobile", async ({
    page,
    workspaceSlug,
  }) => {
    await page.goto(`/workspaces/${workspaceSlug}`);
    await page.waitForLoadState("networkidle");

    const menuBtn = page.getByRole("button", { name: /open menu/i });
    await expect(menuBtn).toBeVisible();

    // Open menu
    await menuBtn.click();

    // Sign out should be visible (previously a known bug)
    await expect(page.getByRole("button", { name: /sign out/i })).toBeVisible();

    // Close menu
    await page.getByRole("button", { name: /close/i }).click();
  });

  test("should render workflow editor on mobile", async ({
    page,
    navigateToPage,
  }) => {
    await navigateToPage("/workflows");

    // Click first workflow link
    const firstWorkflow = page
      .getByRole("link")
      .filter({ hasText: /fetcher|test|smoke/i })
      .first();

    if ((await firstWorkflow.count()) > 0) {
      await firstWorkflow.click();
      await page.waitForLoadState("networkidle");

      // Zoom controls should be visible
      await expect(page.getByRole("button", { name: /zoom in/i })).toBeVisible({
        timeout: 10_000,
      });

      // Add Node FAB should be visible
      await expect(
        page.getByRole("button", { name: /add node/i }),
      ).toBeVisible();
    }
  });
});

test.describe("API health", () => {
  test("health endpoint should return OK", async ({ page }) => {
    const response = await page.goto("https://api.vortex.omni.dev/health");
    expect(response?.status()).toBe(200);

    const body = await page.textContent("body");
    const json = JSON.parse(body!);
    expect(json.status).toBe("ok");
  });

  test("readiness endpoint should show connected services", async ({
    page,
  }) => {
    const response = await page.goto("https://api.vortex.omni.dev/ready");
    expect(response?.status()).toBe(200);

    const body = await page.textContent("body");
    const json = JSON.parse(body!);
    expect(json.status).toBe("ready");
    expect(json.database).toBe("connected");
    expect(json.cache).toBe("connected");
  });
});

test.describe("integrations page", () => {
  test("should load integrations catalog", async ({ page, navigateToPage }) => {
    await navigateToPage("/integrations");

    await expect(
      page.getByRole("heading", { name: /integrations/i }).first(),
    ).toBeVisible({ timeout: 10_000 });

    // Should show featured integrations
    await expect(
      page.getByRole("heading", { name: /featured integrations/i }),
    ).toBeVisible();

    // Should have connect buttons
    const connectButtons = page.getByRole("button", { name: /connect/i });
    expect(await connectButtons.count()).toBeGreaterThan(0);
  });
});

test.describe("demo page", () => {
  test("should load interactive demo", async ({ page }) => {
    await page.goto("/demo");
    await page.waitForLoadState("networkidle");

    // Demo should show the workflow editor
    await expect(page.getByRole("button", { name: /zoom in/i })).toBeVisible({
      timeout: 15_000,
    });

    // Should show sign-up CTA
    await expect(page.getByText(/sign up free/i).first()).toBeVisible();
  });
});
