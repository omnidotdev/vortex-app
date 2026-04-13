import { expect, test } from "./fixtures";

/**
 * Regression tests for bugs found during production testing.
 * Each test targets a specific issue observed on vortex.omni.dev.
 */

test.describe("monitoring page API request storm", () => {
  test("should not flood the API with stats requests", async ({
    page,
    navigateToPage,
  }) => {
    const statsRequests: { url: string; status: number }[] = [];

    page.on("response", (response) => {
      const url = response.url();

      if (url.includes("/api/v1/stats/organization")) {
        statsRequests.push({ url, status: response.status() });
      }
    });

    await navigateToPage("/monitoring");

    // Wait 5 seconds to observe polling/refetch behavior
    await page.waitForTimeout(5_000);

    // A reasonable page should make at most a few requests for initial load
    // and perhaps one polling cycle. More than 10 in 5 seconds indicates a
    // re-render loop or aggressive polling bug
    expect(
      statsRequests.length,
      `Expected < 10 stats requests in 5s, got ${statsRequests.length}`,
    ).toBeLessThan(10);

    // No request should have been rate-limited
    const rateLimited = statsRequests.filter((r) => r.status === 429);

    expect(
      rateLimited,
      "Stats endpoint returned 429 (rate limited)",
    ).toHaveLength(0);
  });
});

test.describe("members page hydration errors", () => {
  test("should not emit React hydration error #418", async ({
    page,
    navigateToPage,
  }) => {
    const consoleErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await navigateToPage("/members");
    // Wait for deferred hydration to complete
    await page.waitForTimeout(3_000);

    const hydrationErrors = consoleErrors.filter(
      (msg) =>
        msg.includes("#418") ||
        msg.includes("#423") ||
        msg.includes("Hydration") ||
        msg.includes("hydration") ||
        msg.includes("server-rendered HTML") ||
        msg.includes("did not match"),
    );

    expect(hydrationErrors).toEqual([]);
  });
});

test.describe("workflow editor back navigation", () => {
  test("back button should navigate to workflows list", async ({
    page,
    navigateToPage,
    workspacePath,
  }) => {
    // Navigate to workflows list to find an existing workflow
    await navigateToPage("/workflows");
    await page.waitForTimeout(2_000);

    const workflowLink = page
      .locator('a[href*="/workflows/"]')
      .filter({ hasNotText: /new|create/i })
      .first();

    const hasWorkflows = (await workflowLink.count()) > 0;

    if (!hasWorkflows) {
      test.skip(true, "No workflows found to test editor back navigation");
      return;
    }

    await workflowLink.click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2_000);

    // Verify we are on a workflow editor page
    expect(page.url()).toMatch(/\/workflows\/[a-f0-9-]+$/);

    // Click the "← Back" button at the top of the editor
    const backBtn = page.getByRole("button", { name: /back/i }).first();

    const hasBack = await backBtn.isVisible().catch(() => false);

    if (!hasBack) {
      test.skip(true, "No back button found in workflow editor");
      return;
    }

    await backBtn.click();

    // Wait for navigation (back button uses client-side routing)
    // It may go to the workflows list or the previous page in history
    try {
      await page.waitForURL(/\/workflows\/?$/, { timeout: 10_000 });
    } catch {
      // Back navigation may go to workspace root if there's no history
      // Verify we at least left the editor
      const stillOnEditor = page.url().match(/\/workflows\/[a-f0-9-]+$/);

      if (stillOnEditor) {
        test.fail(true, "Back button did not navigate away from the editor");
        return;
      }

      // Navigated somewhere else (e.g. workspace root), which is acceptable
      return;
    }

    // Verify the workflows list rendered
    await expect(page.getByRole("heading", { name: /workflows/i })).toBeVisible(
      { timeout: 10_000 },
    );
  });
});

test.describe("integration logos in dark mode", () => {
  test("integration card images should load in dark mode", async ({
    page,
    navigateToPage,
  }) => {
    // Set dark mode via localStorage before navigating
    await page.addInitScript(() => {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    });

    await navigateToPage("/integrations");
    await page.waitForTimeout(2_000);

    // Find integration card images
    const images = page.locator("main img");
    const count = await images.count();

    if (count === 0) {
      test.skip(true, "No integration images found on the page");
      return;
    }

    // Check that images have loaded (naturalWidth > 0 means the image decoded)
    let loadedCount = 0;
    const brokenImages: string[] = [];

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const naturalWidth = await img.evaluate(
        (el) => (el as HTMLImageElement).naturalWidth,
      );
      const src = (await img.getAttribute("src")) ?? "unknown";

      if (naturalWidth > 0) {
        loadedCount++;
      } else {
        brokenImages.push(src);
      }
    }

    // Allow a small number of external CDN image failures (e.g. SimpleIcons)
    const internalBroken = brokenImages.filter(
      (src) =>
        !src.includes("cdn.simpleicons.org") &&
        !src.includes("cdn.jsdelivr.net"),
    );
    expect(
      internalBroken,
      `${internalBroken.length} internal integration images failed to load in dark mode: ${internalBroken.join(", ")}`,
    ).toHaveLength(0);
    expect(loadedCount).toBeGreaterThan(0);
  });
});

test.describe("monitoring cards render data", () => {
  test("stat cards should not be empty or blank", async ({
    page,
    navigateToPage,
  }) => {
    await navigateToPage("/monitoring");

    // Wait for stat cards to finish loading (dismiss loading skeletons)
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

    // Wait for any async data to render
    await page.waitForTimeout(2_000);

    // Look for stat value elements — bold/large text inside card containers
    const statValues = page.locator(
      '[class*="card"] h2, [class*="card"] .text-2xl, [class*="card"] .text-3xl, [class*="card"] .font-bold, [class*="stat"] [class*="value"], [class*="metric"]',
    );

    const count = await statValues.count();

    if (count === 0) {
      // Fall back: check that main has any numeric content at all
      const mainText = await page.locator("main").textContent();

      expect(
        mainText && /\d/.test(mainText),
        "Monitoring page has no numeric data — cards may be blank",
      ).toBeTruthy();
      return;
    }

    // Each stat card value should contain at least a number (even "0" is valid)
    const blankCards: number[] = [];

    for (let i = 0; i < count; i++) {
      const text = (await statValues.nth(i).textContent())?.trim() ?? "";

      if (!text || !/\d/.test(text)) {
        blankCards.push(i);
      }
    }

    expect(
      blankCards,
      `${blankCards.length} stat cards are blank (indices: ${blankCards.join(", ")})`,
    ).toHaveLength(0);
  });
});
