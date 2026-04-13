import { expect, test } from "./fixtures";

/**
 * Bug #3: React hydration error #418.
 * Console shows "Minified React error #418" on every page load.
 * This is a server/client HTML mismatch.
 */
test.describe("React hydration errors", () => {
  const pagesToCheck = [
    { name: "workspaces", path: "/workspaces" },
    { name: "dashboard", pathKey: "workspacePath" as const },
    { name: "workflows", pathSuffix: "/workflows" },
    { name: "monitoring", pathSuffix: "/monitoring" },
    { name: "settings", pathSuffix: "/settings" },
  ];

  test("should not emit hydration error #418 on workspaces page", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/workspaces");
    await page.waitForLoadState("networkidle");
    // Wait for any deferred hydration
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

  test("should not emit hydration errors on workspace dashboard", async ({
    page,
    workspacePath,
  }) => {
    const consoleErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto(workspacePath);
    await page.waitForLoadState("networkidle");
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

  test("should not emit hydration errors on workflows page", async ({
    page,
    workspacePath,
  }) => {
    const consoleErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto(`${workspacePath}/workflows`);
    await page.waitForLoadState("networkidle");
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

  test("should not emit hydration errors on monitoring page", async ({
    page,
    workspacePath,
  }) => {
    const consoleErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto(`${workspacePath}/monitoring`);
    await page.waitForLoadState("networkidle");
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
