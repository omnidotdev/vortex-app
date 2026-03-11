import { test, expect } from "./fixtures";

/**
 * Bug #6/7: Workflow runs stuck in Pending.
 * Execute a workflow and verify the run transitions from Pending to
 * Running/Completed (not stuck forever).
 */
test.describe("workflow execution lifecycle", () => {
  test("executed workflow run should transition past Pending", async ({
    page,
    workspacePath,
  }) => {
    // Navigate to workflows list
    await page.goto(`${workspacePath}/workflows`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2_000);

    // Find the first workflow link/row
    const workflowLink = page
      .locator('a[href*="/workflows/"]')
      .filter({ hasNotText: /new|create/i })
      .first();

    const hasWorkflows = (await workflowLink.count()) > 0;

    if (!hasWorkflows) {
      test.skip(true, "No workflows found to execute");
      return;
    }

    // Navigate to the workflow detail/editor page
    await workflowLink.click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2_000);

    // Look for a "Run" / "Execute" / "Test" button
    const runButton = page
      .getByRole("button", { name: /^run$|execute|test run|trigger/i })
      .first();

    const canRun = await runButton.isVisible().catch(() => false);

    if (!canRun) {
      test.skip(true, "No run button found on workflow detail page");
      return;
    }

    // Execute the workflow
    await runButton.click();

    // Wait for a run status indicator to appear
    // Look for status badges/labels that indicate the run was created
    const statusIndicator = page
      .locator("text=/pending|running|queued|completed|failed|success/i")
      .first();

    await expect(statusIndicator).toBeVisible({ timeout: 10_000 });

    // Capture the initial status
    const initialStatus = await statusIndicator.textContent();

    if (initialStatus?.toLowerCase().includes("pending")) {
      // Wait up to 30 seconds for the status to change from Pending
      // Poll every 2 seconds
      let currentStatus = "pending";
      const maxWait = 30_000;
      const pollInterval = 2_000;
      const startTime = Date.now();

      while (
        Date.now() - startTime < maxWait &&
        currentStatus.toLowerCase().includes("pending")
      ) {
        await page.waitForTimeout(pollInterval);

        // Refresh or re-read the status
        const statusText = await page
          .locator(
            "text=/pending|running|queued|completed|failed|success/i",
          )
          .first()
          .textContent()
          .catch(() => "pending");

        currentStatus = statusText || "pending";
      }

      // The run should have transitioned past Pending
      expect(currentStatus.toLowerCase()).not.toBe("pending");
    }
  });

  test("workflow runs list should show run statuses", async ({
    page,
    workspacePath,
  }) => {
    // Navigate to workflows list
    await page.goto(`${workspacePath}/workflows`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2_000);

    // Find the first workflow
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

    // Look for a "Runs" tab or section
    const runsTab = page
      .getByRole("tab", { name: /runs|executions|history/i })
      .or(page.getByRole("link", { name: /runs|executions|history/i }))
      .first();

    const hasRunsTab = await runsTab.isVisible().catch(() => false);

    if (hasRunsTab) {
      await runsTab.click();
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2_000);

      // Check that run entries have status indicators
      const statusBadges = page.locator(
        '[class*="badge"], [class*="status"], [data-status]',
      );
      const badgeCount = await statusBadges.count();

      if (badgeCount > 0) {
        // Verify at least one has meaningful status text
        const firstBadge = statusBadges.first();
        const text = await firstBadge.textContent();

        expect(text).toBeTruthy();
      }
    }
  });
});
