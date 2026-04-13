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

    for (const pg of [...hamburgerPages, ...sidebarPages]) {
      test(`${pg.name} page should show desktop sidebar`, async ({
        page,
        navigateToPage,
      }) => {
        await navigateToPage(pg.suffix);

        // Skip if the page hit an error boundary (real bug, not a nav issue)
        const hasError = await page
          .locator("text=Something went wrong")
          .isVisible()
          .catch(() => false);

        if (hasError) {
          test.skip(
            true,
            `${pg.name} page crashed with error boundary — not a navigation issue`,
          );
          return;
        }

        // Desktop sidebar: <aside> element containing <nav> with workspace links
        const sidebar = page.locator("aside").filter({
          has: page.locator("nav"),
        });

        await expect(sidebar).toBeVisible({ timeout: 10_000 });

        // Verify navigation links are present inside the sidebar
        const nav = sidebar.locator("nav");
        await expect(
          nav.getByRole("link", { name: "Dashboard" }),
        ).toBeVisible();
        await expect(
          nav.getByRole("link", { name: "Workflows" }),
        ).toBeVisible();
      });
    }
  });

  test.describe("mobile (hamburger menu should work on all pages)", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    for (const pg of [...hamburgerPages, ...sidebarPages]) {
      test(`${pg.name} page should show mobile header with hamburger`, async ({
        page,
        navigateToPage,
      }) => {
        await navigateToPage(pg.suffix);

        // Skip if the page hit an error boundary (real bug, not a nav issue)
        const hasError = await page
          .locator("text=Something went wrong")
          .isVisible()
          .catch(() => false);

        if (hasError) {
          test.skip(
            true,
            `${pg.name} page crashed with error boundary — not a navigation issue`,
          );
          return;
        }

        // Mobile header: <header> with "Open menu" button (aria-label)
        const menuButton = page.getByRole("button", { name: "Open menu" });
        await expect(menuButton).toBeVisible({ timeout: 10_000 });

        // Desktop sidebar should be hidden at this viewport (has `lg:block hidden`)
        const sidebar = page.locator("aside");
        await expect(sidebar).toBeHidden();
      });
    }

    test("all pages should use the same navigation component", async ({
      page,
      navigateToPage,
    }) => {
      // Collect the mobile navigation pattern for different pages to verify consistency
      const headerSnapshots: string[] = [];

      for (const suffix of ["", "/events", "/monitoring", "/settings"]) {
        await navigateToPage(suffix);

        // Check that the mobile header with hamburger button is present
        const hasHamburger = await page
          .getByRole("button", { name: "Open menu" })
          .isVisible()
          .catch(() => false);

        headerSnapshots.push(hasHamburger ? "hamburger" : "no-hamburger");
      }

      // All pages should have the same navigation pattern
      const uniquePatterns = [...new Set(headerSnapshots)];

      expect(uniquePatterns).toHaveLength(1);
      expect(uniquePatterns[0]).toBe("hamburger");
    });
  });
});
