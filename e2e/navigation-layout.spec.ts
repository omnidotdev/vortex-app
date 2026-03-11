import { expect, test } from "./fixtures";

/**
 * Bug #4: Sidebar inconsistency.
 * Dashboard, Workflows, and Integrations pages use hamburger menu layout.
 * Events, Plugins, DLQ, Monitoring, Members, Settings use sidebar layout.
 * All pages should have a consistent navigation pattern.
 */
test.describe("navigation layout consistency", () => {
  // Pages that are reported to use hamburger layout
  const hamburgerPages = [
    { name: "Dashboard", suffix: "" },
    { name: "Workflows", suffix: "/workflows" },
    { name: "Integrations", suffix: "/integrations" },
  ];

  // Pages that are reported to use sidebar layout
  const sidebarPages = [
    { name: "Events", suffix: "/events" },
    { name: "Plugins", suffix: "/plugins" },
    { name: "DLQ", suffix: "/dlq" },
    { name: "Monitoring", suffix: "/monitoring" },
    { name: "Members", suffix: "/members" },
    { name: "Settings", suffix: "/settings" },
  ];

  test.describe("desktop (sidebar should be visible on all pages)", () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    for (const page of [...hamburgerPages, ...sidebarPages]) {
      test(`${page.name} page should show desktop sidebar`, async ({
        page: pw,
        workspacePath,
      }) => {
        await pw.goto(`${workspacePath}${page.suffix}`);
        await pw.waitForLoadState("networkidle");

        // Desktop sidebar: <aside> element with navigation links
        const sidebar = pw.locator("aside").filter({
          hasText: /dashboard|workflows/i,
        });

        await expect(sidebar).toBeVisible({ timeout: 10_000 });
      });
    }
  });

  test.describe("mobile (hamburger menu should work on all pages)", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    for (const page of [...hamburgerPages, ...sidebarPages]) {
      test(`${page.name} page should show mobile header with hamburger`, async ({
        page: pw,
        workspacePath,
      }) => {
        await pw.goto(`${workspacePath}${page.suffix}`);
        await pw.waitForLoadState("networkidle");

        // Mobile header should be present
        const header = pw.locator("header").filter({
          has: pw.getByRole("button", { name: "Open menu" }),
        });

        await expect(header).toBeVisible({ timeout: 10_000 });

        // Desktop sidebar should be hidden at this viewport
        const sidebar = pw.locator("aside").filter({
          hasText: /dashboard|workflows/i,
        });

        await expect(sidebar).not.toBeVisible();
      });
    }

    test("all pages should use the same navigation component", async ({
      page: pw,
      workspacePath,
    }) => {
      // Collect the mobile header HTML structure for two different page groups
      // to verify consistency
      const headerSnapshots: string[] = [];

      for (const suffix of ["", "/events", "/monitoring", "/settings"]) {
        await pw.goto(`${workspacePath}${suffix}`);
        await pw.waitForLoadState("networkidle");

        const header = pw.locator("header").first();
        const isVisible = await header.isVisible();

        if (isVisible) {
          // Check that the hamburger button is present (not a different nav pattern)
          const hasHamburger = await pw
            .getByRole("button", { name: "Open menu" })
            .isVisible();

          headerSnapshots.push(hasHamburger ? "hamburger" : "other");
        } else {
          headerSnapshots.push("no-header");
        }
      }

      // All pages should have the same navigation pattern
      const uniquePatterns = [...new Set(headerSnapshots)];

      expect(uniquePatterns).toHaveLength(1);
      expect(uniquePatterns[0]).toBe("hamburger");
    });
  });
});
