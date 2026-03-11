import { expect, test } from "./fixtures";

/**
 * Bug #5: Success rate calculation wrong.
 * Monitoring page shows 0.0% success rate with 5 total executions and 0 failures.
 * If there are 0 failures out of 5 executions, success rate should be 100%.
 */
test.describe("monitoring success rate", () => {
  test("success rate should be logically consistent with execution stats", async ({
    page,
    workspacePath,
  }) => {
    await page.goto(`${workspacePath}/monitoring`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3_000);

    // Grab all stat card text content
    const pageText = await page.locator("main").textContent();

    if (!pageText) {
      test.skip(true, "No content on monitoring page");
      return;
    }

    // Extract numeric stats from the page
    // Look for patterns like "Total Executions: 5" or stat cards with numbers
    const totalMatch = pageText.match(
      /total\s*(?:executions?|runs?)[\s:]*(\d+)/i,
    );
    const failedMatch = pageText.match(/failed[\s:]*(\d+)/i);
    const successRateMatch = pageText.match(
      /success\s*rate[\s:]*(\d+(?:\.\d+)?)\s*%/i,
    );

    // If we can find both total and failed counts, verify the math
    if (totalMatch && failedMatch && successRateMatch) {
      const total = Number.parseInt(totalMatch[1], 10);
      const failed = Number.parseInt(failedMatch[1], 10);
      const displayedRate = Number.parseFloat(successRateMatch[1]);

      if (total > 0) {
        const expectedRate = ((total - failed) / total) * 100;

        // The displayed success rate should match the expected calculation
        // Allow 0.1% tolerance for rounding
        expect(Math.abs(displayedRate - expectedRate)).toBeLessThanOrEqual(0.1);
      }
    }

    // Alternative: check for the specific known-bad state
    // 0 failures + non-zero total should never show 0.0%
    if (totalMatch && failedMatch) {
      const total = Number.parseInt(totalMatch[1], 10);
      const failed = Number.parseInt(failedMatch[1], 10);

      if (total > 0 && failed === 0) {
        // With 0 failures and >0 total, success rate must not be 0.0%
        if (successRateMatch) {
          const rate = Number.parseFloat(successRateMatch[1]);
          expect(rate).toBeGreaterThan(0);
        }
      }
    }
  });

  test("stat cards should display numeric values", async ({
    page,
    workspacePath,
  }) => {
    await page.goto(`${workspacePath}/monitoring`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3_000);

    // Look for stat cards or metric displays
    // These are typically rendered as large numbers with labels
    const statValues = page.locator(
      '[class*="stat"] [class*="value"], [class*="metric"], [class*="card"] h2, [class*="card"] .text-2xl, [class*="card"] .text-3xl, [class*="card"] .font-bold',
    );

    const count = await statValues.count();

    if (count > 0) {
      // At least some stat values should contain numbers or percentage signs
      let hasNumericContent = false;

      for (let i = 0; i < count; i++) {
        const text = await statValues.nth(i).textContent();

        if (text && /\d/.test(text)) {
          hasNumericContent = true;
          break;
        }
      }

      expect(hasNumericContent).toBe(true);
    }
  });
});
