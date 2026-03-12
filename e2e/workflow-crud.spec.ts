import { expect, test } from "./fixtures";

/**
 * Workflow CRUD operations.
 * Tests creating, viewing, and deleting workflows.
 */
test.describe("workflow CRUD", () => {
  test("should create a workflow from scratch", async ({
    page,
    workspacePath,
  }) => {
    await page.goto(`${workspacePath}/workflows/new`);
    await page.waitForLoadState("networkidle");

    // Switch to "From Scratch" mode
    await page.getByRole("button", { name: /from scratch/i }).click();

    // Fill in workflow details
    const nameInput = page.getByRole("textbox", { name: /workflow name/i });

    await nameInput.fill("E2E Test Workflow");

    const descInput = page.getByRole("textbox", { name: /description/i });

    await descInput.fill("Created by e2e test");

    // Create button should be enabled
    const createButton = page.getByRole("button", {
      name: /create workflow/i,
    });

    await expect(createButton).toBeEnabled();
    await createButton.click();

    // Should redirect to the workflow editor
    await page.waitForURL(/\/workflows\/[a-f0-9-]+$/, { timeout: 15_000 });

    // Verify workflow info panel shows the name
    await expect(page.getByText("E2E Test Workflow")).toBeVisible({
      timeout: 10_000,
    });
  });

  test("should show templates on create page", async ({
    page,
    workspacePath,
  }) => {
    await page.goto(`${workspacePath}/workflows/new`);
    await page.waitForLoadState("networkidle");

    // Templates should be visible by default
    await expect(page.getByText("API Data Fetcher")).toBeVisible();
    await expect(page.getByText("Webhook Echo")).toBeVisible();
  });

  test("should delete a workflow with confirmation", async ({
    page,
    workspacePath,
  }) => {
    // First create a workflow to delete
    await page.goto(`${workspacePath}/workflows/new`);
    await page.waitForLoadState("networkidle");

    await page.getByRole("button", { name: /from scratch/i }).click();
    await page
      .getByRole("textbox", { name: /workflow name/i })
      .fill("Delete Me Test");
    await page.getByRole("button", { name: /create workflow/i }).click();
    await page.waitForURL(/\/workflows\/[a-f0-9-]+$/, { timeout: 15_000 });

    // Go back to workflows list
    await page.goto(`${workspacePath}/workflows`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2_000);

    // Find the "Delete Me Test" row and click its delete button
    const row = page.locator("tr", { hasText: "Delete Me Test" });

    await expect(row).toBeVisible();

    // Click the second button in the row (delete)
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
    workspacePath,
  }) => {
    // Navigate to any existing workflow
    await page.goto(`${workspacePath}/workflows`);
    await page.waitForLoadState("networkidle");
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

    // Click "Add Node"
    await page.getByRole("button", { name: /add node/i }).click();

    // Node catalog should open
    await expect(page.getByText(/search nodes/i)).toBeVisible({
      timeout: 5_000,
    });

    // Should show a significant number of nodes
    const nodeCountText = page.locator("text=/\\d+ nodes/i").first();

    await expect(nodeCountText).toBeVisible();

    const text = await nodeCountText.textContent();
    const count = Number.parseInt(text?.match(/(\d+)/)?.[1] ?? "0");

    expect(count).toBeGreaterThan(100);
  });
});
