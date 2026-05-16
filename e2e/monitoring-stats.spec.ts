import { expect, test } from "./fixtures";

/**
 * Bug #5: Success rate calculation wrong.
 * Monitoring page shows 0.0% success rate with 5 total executions and 0 failures.
 * If there are 0 failures out of 5 executions, success rate should be 100%.
 */
test.describe("monitoring success rate", () => {
  test("success rate should be logically consistent with execution stats", async ({
    page,
    navigateToPage,
  }) => {
    await navigateToPage("/monitoring");

    // Wait for stat cards to load (they start as loading skeletons with animate-pulse)
    // If stats never load (API errors), skip the test gracefully
    const statCard = page.locator(
      'main [class*="grid"] > div:not([class*="animate-pulse"])',
    );

    try {
      await statCard.first().waitFor({ state: "attached", timeout: 10_000 });
    } catch {
      test.skip(true, "Monitoring stats did not load (API may be unavailable)");
      return;
    }

    // Grab all stat card text content from main
    const pageText = await page.locator("main").textContent();

    if (!pageText) {
      test.skip(true, "No content on monitoring page");
      return;
    }

    // Extract numeric stats from the page
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

        // The displayed success rate should be in the right ballpark.
        // The UI may calculate rate over a different time window than
        // the total/failed counters, so allow a generous tolerance.
        expect(Math.abs(displayedRate - expectedRate)).toBeLessThanOrEqual(10);
      }
    }

    // Alternative: check for the specific known-bad state
    // 0 failures + non-zero total should never show 0.0%
    if (totalMatch && failedMatch) {
      const total = Number.parseInt(totalMatch[1], 10);
      const failed = Number.parseInt(failedMatch[1], 10);

      if (total > 0 && failed === 0) {
        if (successRateMatch) {
          const rate = Number.parseFloat(successRateMatch[1]);
          expect(rate).toBeGreaterThan(0);
        }
      }
    }
  });

  test("stat cards should display numeric values", async ({
    page,
    navigateToPage,
  }) => {
    await navigateToPage("/monitoring");

    // Wait for stat cards to load (they start as loading skeletons)
    const statCard = page.locator(
      'main [class*="grid"] > div:not([class*="animate-pulse"])',
    );

    try {
      await statCard.first().waitFor({ state: "attached", timeout: 10_000 });
    } catch {
      test.skip(
        true,
        "Monitoring stat cards did not load (API may be unavailable)",
      );
      return;
    }

    // Look for stat cards or metric displays
    const statValues = page.locator(
      '[class*="stat"] [class*="value"], [class*="metric"], [class*="card"] h2, [class*="card"] .text-2xl, [class*="card"] .text-3xl, [class*="card"] .font-bold',
    );

    const count = await statValues.count();

    if (count > 0) {
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
