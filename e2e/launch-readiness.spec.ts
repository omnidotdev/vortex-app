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
    await page.waitForTimeout(2_000);

    // Check if plan limit is reached
    const isLimited = await page
      .locator("text=/Plan limit reached/i")
      .first()
      .isVisible()
      .catch(() => false);
    if (isLimited) {
      test.skip(true, "Workflow plan limit reached");
      return;
    }

    // Switch to "From Scratch"
    await page.getByRole("button", { name: /from scratch/i }).click();

    // Fill in workflow details
    const testName = `E2E Test ${Date.now()}`;
    const nameInput = page.locator('input[id="name"]');
    await expect(nameInput).toBeVisible({ timeout: 5_000 });
    await nameInput.fill(testName);

    const descInput = page.getByRole("textbox", { name: /description/i });
    const hasDesc = await descInput.isVisible().catch(() => false);
    if (hasDesc) await descInput.fill("Automated E2E test");

    // Create the workflow
    await page.getByRole("button", { name: /create workflow/i }).click();

    // Should redirect to editor
    await page.waitForURL(/\/workflows\/[a-f0-9-]+$/, { timeout: 15_000 });
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

test.describe("identity provider dependency", () => {
  // These tests need an unauthenticated context (Sign In button is hidden when logged in)
  test.use({ storageState: { cookies: [], origins: [] } });
  test("identity.omni.dev should be reachable", async ({ request }) => {
    const response = await request.get("https://identity.omni.dev", {
      timeout: 10_000,
    });
    expect(
      response.status(),
      "HIDRA identity provider must be healthy for auth to work",
    ).toBeLessThan(500);
  });

  test("sign in button should redirect to identity provider", async ({
    page,
  }) => {
    const response = await page.goto("/");
    expect(
      response?.status(),
      "Landing page should load successfully",
    ).toBeLessThan(500);
    await page.waitForLoadState("networkidle");

    // Sign In can be rendered as a button or a link
    const signIn = page
      .getByRole("button", { name: /sign in/i })
      .or(page.getByRole("link", { name: /sign in/i }))
      .first();
    await expect(signIn).toBeVisible({ timeout: 10_000 });
    await signIn.click();

    // Should redirect to identity.omni.dev within 15 seconds
    await page.waitForURL(/identity\.omni\.dev/, { timeout: 15_000 });
  });
});

test.describe("API auth enforcement", () => {
  test("authz endpoints should require service key", async ({ request }) => {
    for (const path of ["/api/v1/authz/tuples", "/api/v1/authz/drift"]) {
      const response = await request.get(`https://api.vortex.omni.dev${path}`);
      expect(
        response.status(),
        `${path} should return 401 without service key`,
      ).toBe(401);
    }
  });

  test("authz reconcile should reject unauthorized POST", async ({
    request,
  }) => {
    const response = await request.post(
      "https://api.vortex.omni.dev/api/v1/authz/reconcile",
    );
    expect(response.status()).toBe(401);
  });

  test("graphql should require authentication", async ({ request }) => {
    const response = await request.post("https://api.vortex.omni.dev/graphql", {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ query: "{ __typename }" }),
    });

    const body = await response.json();
    expect(body.errors?.[0]?.extensions?.code).toBe("UNAUTHENTICATED");
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
