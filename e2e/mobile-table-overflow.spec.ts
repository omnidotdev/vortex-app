import { test, expect } from "./fixtures";

/**
 * Bug #2: Workflow table overflow on mobile.
 * At 375px width, the workflows table dates are truncated and action buttons
 * are cut off. Verify the table is usable on mobile.
 */
test.describe("workflow table mobile overflow", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("should not have horizontal overflow cutting off content", async ({
    page,
    workspacePath,
  }) => {
    await page.goto(`${workspacePath}/workflows`);
    await page.waitForLoadState("networkidle");

    // Wait for workflow list to render (table or card layout)
    await page.waitForTimeout(2_000);

    // Check if the page body has horizontal overflow
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    // The page should not have horizontal scrolling at mobile width
    expect(hasOverflow).toBe(false);
  });

  test("action buttons should be visible and clickable", async ({
    page,
    workspacePath,
  }) => {
    await page.goto(`${workspacePath}/workflows`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2_000);

    // Look for any action buttons (edit, delete, run, etc.) in the workflow list
    // These could be in a table row or card layout
    const actionButtons = page.locator(
      'table button, table a[role="button"], [data-testid*="action"], .workflow-actions button',
    );

    const count = await actionButtons.count();

    if (count > 0) {
      // Verify the first action button is within the viewport
      const firstButton = actionButtons.first();
      const box = await firstButton.boundingBox();

      expect(box).not.toBeNull();

      if (box) {
        // Button should not extend past the viewport width
        expect(box.x + box.width).toBeLessThanOrEqual(375);
        // Button should not be zero-width (clipped)
        expect(box.width).toBeGreaterThan(0);
        expect(box.height).toBeGreaterThan(0);
      }
    }
  });

  test("date columns should not be clipped", async ({
    page,
    workspacePath,
  }) => {
    await page.goto(`${workspacePath}/workflows`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2_000);

    // Find date cells (usually contain patterns like "Mar 10" or "2026-03-10")
    const dateCells = page.locator("td, [role='cell']").filter({
      hasText: /\d{4}[-/]\d{2}|[A-Z][a-z]{2}\s+\d{1,2}|ago|yesterday|today/i,
    });

    const count = await dateCells.count();

    if (count > 0) {
      for (let i = 0; i < Math.min(count, 3); i++) {
        const cell = dateCells.nth(i);
        const box = await cell.boundingBox();

        if (box) {
          // Cell should be within viewport
          expect(box.x).toBeGreaterThanOrEqual(0);
          expect(box.x + box.width).toBeLessThanOrEqual(375 + 1); // 1px tolerance
        }
      }
    }
  });
});
