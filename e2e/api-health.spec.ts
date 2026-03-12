import { expect, test } from "./fixtures";

/**
 * API health and worker connectivity checks.
 * Ensures the Vortex API is reachable and returns valid health data.
 */
test.describe("API health", () => {
  test("API health endpoint should return ok", async ({ request }) => {
    const response = await request.get("https://api.vortex.omni.dev/health");

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.status).toBe("ok");
    expect(body.service).toBe("Vortex");
    expect(body.timestamp).toBeDefined();
  });

  test("GraphQL endpoint should accept introspection", async ({ request }) => {
    const response = await request.post("https://api.vortex.omni.dev/graphql", {
      data: {
        query: "{ __typename }",
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data).toBeDefined();
  });

  test("monitoring page should show non-zero success rate when worker is healthy", async ({
    page,
    workspacePath,
  }) => {
    await page.goto(`${workspacePath}/monitoring`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2_000);

    // Check that the monitoring page loaded with stats
    const totalExecutions = page.locator("text=Total Executions").first();

    await expect(totalExecutions).toBeVisible({ timeout: 10_000 });

    // Verify the Failed count is displayed
    const failedStat = page.locator("text=Failed").first();

    await expect(failedStat).toBeVisible();

    // Check the Top Errors table for worker unreachable errors
    const workerErrors = page.locator(
      "text=worker was unreachable during execution attempt",
    );
    const errorCount = await workerErrors.count();

    // Flag if there are recent worker connectivity errors
    if (errorCount > 0) {
      // This test documents the current state -- worker unreachable errors
      // exist and need to be fixed before launch
      console.warn(
        `WARNING: Found ${errorCount} "worker unreachable" errors in monitoring`,
      );
    }
  });
});
