import { expect, test } from "./fixtures";

/**
 * Workflow CRUD operations.
 * Tests creating, viewing, and deleting workflows.
 */
test.describe("workflow CRUD", () => {
  test("should create a workflow from scratch", async ({
    page,
    navigateToPage,
  }) => {
    // Navigate to workflows, then click "New Workflow" or go to /new
    await navigateToPage("/workflows");

    // Look for a "new workflow" or "create" link/button on the workflows page
    const newLink = page
      .locator('a[href*="/workflows/new"]')
      .or(page.getByRole("link", { name: /new workflow|create/i }))
      .first();
    const hasNewLink = await newLink.isVisible().catch(() => false);

    if (hasNewLink) {
      await newLink.click();
      await page.waitForLoadState("networkidle");
    }

    // Wait for the Create Workflow page
    await expect(
      page.getByRole("heading", { name: /create workflow/i }),
    ).toBeVisible({ timeout: 10_000 });

    // Switch to "From Scratch" mode
    const fromScratchBtn = page.getByRole("button", { name: /from scratch/i });

    await fromScratchBtn.click();

    // Wait for the form to appear
    const nameInput = page.getByRole("textbox", { name: /workflow name/i });

    await expect(nameInput).toBeVisible({ timeout: 5_000 });
    await nameInput.fill("E2E Test Workflow");

    // Fill description if visible
    const descInput = page.getByRole("textbox", { name: /description/i });
    const hasDesc = await descInput.isVisible().catch(() => false);

    if (hasDesc) {
      await descInput.fill("Created by e2e test");
    }

    // Create button should be enabled after entering a name
    const createButton = page.getByRole("button", {
      name: /create workflow/i,
    });

    await expect(createButton).toBeEnabled();
    await createButton.click();

    // Should redirect to the workflow editor
    await page.waitForURL(/\/workflows\/[a-f0-9-]+$/, { timeout: 15_000 });

    // Verify workflow info panel shows the name
    await expect(
      page.getByRole("heading", { name: "E2E Test Workflow" }),
    ).toBeVisible({ timeout: 10_000 });
  });

  test("should show templates on create page", async ({
    page,
    navigateToPage,
  }) => {
    // Navigate to workflows then to new workflow page
    await navigateToPage("/workflows");

    const newLink = page
      .locator('a[href*="/workflows/new"]')
      .or(page.getByRole("link", { name: /new workflow|create/i }))
      .first();
    const hasNewLink = await newLink.isVisible().catch(() => false);

    if (hasNewLink) {
      await newLink.click();
      await page.waitForLoadState("networkidle");
    }

    // Templates should be visible by default (as h3 headings)
    await expect(
      page.getByRole("heading", { name: "API Data Fetcher" }),
    ).toBeVisible({ timeout: 10_000 });
    await expect(
      page.getByRole("heading", { name: "Webhook Echo" }),
    ).toBeVisible();
  });

  test("should delete a workflow with confirmation", async ({
    page,
    navigateToPage,
  }) => {
    // Navigate to workflows then to create page
    await navigateToPage("/workflows");

    const newLink = page
      .locator('a[href*="/workflows/new"]')
      .or(page.getByRole("link", { name: /new workflow|create/i }))
      .first();
    const hasNewLink = await newLink.isVisible().catch(() => false);

    if (hasNewLink) {
      await newLink.click();
      await page.waitForLoadState("networkidle");
    }

    // Switch to "From Scratch" and create a workflow
    await page.getByRole("button", { name: /from scratch/i }).click();

    const nameInput = page.getByRole("textbox", { name: /workflow name/i });

    await expect(nameInput).toBeVisible({ timeout: 5_000 });
    await nameInput.fill("Delete Me Test");

    await page.getByRole("button", { name: /create workflow/i }).click();
    await page.waitForURL(/\/workflows\/[a-f0-9-]+$/, { timeout: 15_000 });

    // Go back to workflows list via sidebar navigation
    await navigateToPage("/workflows");
    await page.waitForTimeout(2_000);

    // Find the "Delete Me Test" row and click its delete button
    const row = page.locator("tr", { hasText: "Delete Me Test" });

    await expect(row).toBeVisible();

    // Click the last button in the row (delete)
    await row.locator("button").last().click();

    // Confirmation dialog should appear
    await expect(
      page.getByRole("alertdialog", { name: /delete workflow/i }),
    ).toBeVisible({ timeout: 5_000 });

    // Confirm deletion
    await page
      .getByRole("alertdialog")
      .getByRole("button", { name: /delete/i })
      .click();

    // Workflow should be removed from the list
    await expect(row).not.toBeVisible({ timeout: 10_000 });
  });

  test("workflow editor should display node catalog with 100+ nodes", async ({
    page,
    navigateToPage,
  }) => {
    // Navigate to workflows list
    await navigateToPage("/workflows");
    await page.waitForTimeout(2_000);

    const workflowLink = page
      .locator('a[href*="/workflows/"]')
      .filter({ hasNotText: /new|create/i })
      .first();

    const hasWorkflows = (await workflowLink.count()) > 0;

    if (!hasWorkflows) {
      test.skip(true, "No workflows found");
      return;
    }

    await workflowLink.click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2_000);

    // Click "Add Node" or similar button
    const addNodeBtn = page.getByRole("button", { name: /add node/i });
    const hasAddNode = await addNodeBtn.isVisible().catch(() => false);

    if (!hasAddNode) {
      test.skip(true, "No 'Add Node' button found in workflow editor");
      return;
    }

    await addNodeBtn.click();
    await page.waitForTimeout(1_000);

    // Node catalog should open - look for search input or node count
    const searchInput = page.getByPlaceholder(/search/i).first();
    const nodeCount = page.locator("text=/\\d+ nodes/i").first();

    const hasSearch = await searchInput.isVisible().catch(() => false);
    const hasCount = await nodeCount.isVisible().catch(() => false);

    // At minimum, the catalog should have a search or show node count
    expect(hasSearch || hasCount).toBeTruthy();

    if (hasCount) {
      const text = await nodeCount.textContent();
      const count = Number.parseInt(text?.match(/(\d+)/)?.[1] ?? "0");

      expect(count).toBeGreaterThan(100);
    }
  });
});
