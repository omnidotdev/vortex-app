import { test as baseTest } from "@playwright/test";

import { expect, test } from "./fixtures";

/**
 * Production smoke tests for known bugs found during manual testing.
 * Each test documents a specific issue and verifies the expected behavior.
 */

// ─── Bug 1: Landing page inaccessible when authenticated ─────────────────────
// Root URL `/` redirects authenticated users to `/workspaces`, making the
// marketing/landing page invisible. Authenticated users should still be able
// to view the landing page content at `/`.

test.describe("landing page accessibility when authenticated", () => {
  test("root URL should not force-redirect authenticated users away from landing content", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const url = page.url();

    // Document the bug: authenticated users get redirected to /workspaces
    const wasRedirected = url.includes("/workspaces");

    if (wasRedirected) {
      // Bug confirmed: the root URL redirected to /workspaces.
      // Authenticated users should still be able to see the landing page.
      test.fail(
        true,
        "Bug: root URL `/` redirects authenticated users to `/workspaces` instead of showing landing page",
      );
    }

    // Expected: landing page hero content is visible
    await expect(
      page.getByRole("heading", { name: /automate anything/i }),
    ).toBeVisible({ timeout: 10_000 });
  });

  test("landing page hero and CTAs should render at root URL", async ({
    page,
  }) => {
    // Navigate directly, bypassing any client-side redirect logic
    await page.goto("/", { waitUntil: "networkidle" });

    // Verify the response itself is not a server-side redirect
    const finalUrl = page.url();

    // If we landed on /workspaces, the landing page content won't exist
    if (finalUrl.includes("/workspaces")) {
      test.fail(
        true,
        "Bug: server or client redirected `/` to `/workspaces` for authenticated session",
      );
    }

    await expect(
      page.getByRole("button", { name: /get started free/i }),
    ).toBeVisible();
    await expect(page.getByText("View on GitHub").first()).toBeVisible();
  });
});

// ─── Bug 2: Workspace dashboard crash ────────────────────────────────────────
// Clicking into a workspace causes:
//   TypeError: Cannot destructure property 'organizationId' of useLoaderData()
// The error boundary fires, leaving users unable to access their workspace.

test.describe("workspace dashboard crash", () => {
  test("navigating into a workspace should render the dashboard without error boundary", async ({
    page,
    workspaceSlug,
  }) => {
    await page.goto(`/workspaces/${workspaceSlug}`);
    await page.waitForLoadState("networkidle");

    // Check for the error boundary that fires on useLoaderData() crash
    const errorBoundary = page.locator("text=Something went wrong").first();
    const typeError = page.locator("text=Cannot destructure property").first();

    const hasErrorBoundary = await errorBoundary.isVisible().catch(() => false);
    const hasTypeError = await typeError.isVisible().catch(() => false);

    if (hasErrorBoundary || hasTypeError) {
      test.fail(
        true,
        "Bug: workspace dashboard crashes with TypeError on useLoaderData() - organizationId destructure fails",
      );
    }

    // Expected: dashboard content loads successfully
    // Look for typical dashboard elements (heading, stats, or nav)
    const dashboardHeading = page
      .getByRole("heading", { name: /dashboard/i })
      .first();
    const workflowsLink = page
      .getByRole("link", { name: /workflows/i })
      .first();
    const sidebarNav = page.locator("aside nav").first();

    // At least one of these should be visible for a functioning dashboard
    const hasDashboard = await dashboardHeading.isVisible().catch(() => false);
    const hasNav = await workflowsLink.isVisible().catch(() => false);
    const hasSidebar = await sidebarNav.isVisible().catch(() => false);

    expect(
      hasDashboard || hasNav || hasSidebar,
      "Workspace dashboard should render content (heading, nav links, or sidebar)",
    ).toBeTruthy();
  });

  test("workspace dashboard should not show TypeError in console", async ({
    page,
    workspaceSlug,
  }) => {
    const consoleErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    page.on("pageerror", (error) => {
      consoleErrors.push(error.message);
    });

    await page.goto(`/workspaces/${workspaceSlug}`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2_000);

    const destructureErrors = consoleErrors.filter(
      (msg) =>
        msg.includes("Cannot destructure") ||
        msg.includes("organizationId") ||
        msg.includes("useLoaderData"),
    );

    if (destructureErrors.length > 0) {
      test.fail(
        true,
        `Bug: console contains useLoaderData destructure error: ${destructureErrors[0]}`,
      );
    }

    expect(destructureErrors).toHaveLength(0);
  });
});

// ─── Bug 3: GraphQL API returns UNAUTHENTICATED ──────────────────────────────
// After OAuth login, GraphQL calls fail with UNAUTHENTICATED error. Session
// cookies may not be forwarded correctly or the API session validation is broken.

test.describe("GraphQL API authentication", () => {
  test("authenticated GraphQL request should return data, not UNAUTHENTICATED", async ({
    page,
    workspaceSlug,
  }) => {
    // Navigate to workspace so cookies are attached to the domain
    await page.goto(`/workspaces/${workspaceSlug}`);
    await page.waitForLoadState("networkidle");

    // Execute a GraphQL query using the page context (carries cookies)
    const result = await page.evaluate(async () => {
      const response = await fetch("https://api.vortex.omni.dev/graphql", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: "{ __typename }",
        }),
      });

      return {
        status: response.status,
        body: await response.json(),
      };
    });

    // Check for UNAUTHENTICATED error in the response
    const errors = result.body?.errors ?? [];
    const unauthErrors = errors.filter(
      (e: { message: string }) =>
        e.message?.includes("UNAUTHENTICATED") ||
        e.message?.includes("Not authenticated") ||
        e.message?.includes("Unauthorized"),
    );

    if (unauthErrors.length > 0) {
      test.fail(
        true,
        `Bug: GraphQL returns UNAUTHENTICATED despite valid OAuth session: ${unauthErrors[0].message}`,
      );
    }

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });

  test("GraphQL should return valid workspace data for authenticated user", async ({
    page,
    workspaceSlug,
  }) => {
    await page.goto(`/workspaces/${workspaceSlug}`);
    await page.waitForLoadState("networkidle");

    const result = await page.evaluate(async () => {
      const response = await fetch("https://api.vortex.omni.dev/graphql", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{ workspaces { id name slug } }`,
        }),
      });

      return {
        status: response.status,
        body: await response.json(),
      };
    });

    if (result.body?.errors?.length > 0) {
      const firstError = result.body.errors[0].message;

      if (
        firstError.includes("UNAUTHENTICATED") ||
        firstError.includes("Unauthorized")
      ) {
        test.fail(
          true,
          `Bug: workspace query returns auth error: ${firstError}`,
        );
      }
    }

    expect(result.status).toBe(200);
    expect(result.body.data?.workspaces).toBeDefined();
    expect(result.body.data.workspaces.length).toBeGreaterThan(0);
  });
});

// ─── Bug 4: Sign out button outside viewport on mobile ───────────────────────
// At 375px width, the sign out button in the mobile sheet sidebar is outside
// the viewport and cannot be clicked or scrolled to.

test.describe("sign out button accessibility on mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("sign out button should be visible and clickable in mobile sidebar", async ({
    page,
    navigateToPage,
  }) => {
    await navigateToPage("/settings");

    // Open the mobile hamburger menu
    const menuButton = page.getByRole("button", { name: "Open menu" });
    await expect(menuButton).toBeVisible({ timeout: 10_000 });
    await menuButton.click();

    // Wait for the sheet/drawer to open
    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible({ timeout: 5_000 });

    // Look for the sign out button inside the drawer
    const signOutButton = drawer
      .getByRole("button", { name: /sign out/i })
      .or(drawer.getByText(/sign out/i));

    const isVisible = await signOutButton
      .first()
      .isVisible()
      .catch(() => false);

    if (!isVisible) {
      test.fail(
        true,
        "Bug: sign out button is not visible in mobile sidebar - likely overflowing the viewport",
      );
    }

    // Verify it is within the viewport bounds
    const box = await signOutButton.first().boundingBox();

    if (box) {
      const viewportHeight = 812;
      const viewportWidth = 375;
      const isWithinViewport =
        box.y + box.height <= viewportHeight &&
        box.x + box.width <= viewportWidth;

      if (!isWithinViewport) {
        test.fail(
          true,
          `Bug: sign out button is outside viewport (y: ${box.y}, height: ${box.height}, viewport: ${viewportHeight}px)`,
        );
      }
    }

    // Intercept sign-out to avoid invalidating the shared session
    await page.route("**/api/auth/sign-out", (route) =>
      route.fulfill({ status: 200, body: "{}" }),
    );

    // Attempt to click the sign out button
    await signOutButton.first().click({ timeout: 5_000 });
  });

  test("mobile sidebar should be scrollable when content overflows", async ({
    page,
    navigateToPage,
  }) => {
    await navigateToPage("/settings");

    const menuButton = page.getByRole("button", { name: "Open menu" });
    await expect(menuButton).toBeVisible({ timeout: 10_000 });
    await menuButton.click();

    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible({ timeout: 5_000 });

    // Check whether the drawer content is scrollable
    const isScrollable = await drawer.evaluate((el) => {
      // Find the scrollable container inside the drawer
      const scrollable =
        el.querySelector("[data-radix-scroll-area-viewport]") ??
        el.querySelector('[style*="overflow"]') ??
        el;

      return scrollable.scrollHeight > scrollable.clientHeight;
    });

    // If sign out is outside viewport, the container must be scrollable
    const signOutButton = drawer.getByText(/sign out/i).first();
    const signOutVisible = await signOutButton.isVisible().catch(() => false);

    if (!signOutVisible && !isScrollable) {
      test.fail(
        true,
        "Bug: mobile sidebar overflows but is not scrollable - sign out button unreachable",
      );
    }
  });
});

// ─── Bug 5: Pricing page loads and toggles correctly ─────────────────────────

test.describe("pricing page", () => {
  // Pricing page should be accessible without auth
  test.use({ storageState: { cookies: [], origins: [] } });

  test("should display pricing tiers", async ({ page }) => {
    await page.goto("https://vortex.omni.dev/pricing");
    await page.waitForLoadState("networkidle");

    // Verify pricing tier cards render
    const tiers = page
      .locator('[data-testid="pricing-card"]')
      .or(page.locator("article").filter({ hasText: /\$\d+/ }));

    // Fallback: look for price amounts if no test IDs or articles
    const priceAmounts = page.locator("text=/\\$\\d+/");
    const tierCount = await tiers.count();
    const priceCount = await priceAmounts.count();

    expect(
      tierCount > 0 || priceCount > 0,
      "Pricing page should display at least one tier with a price",
    ).toBeTruthy();
  });

  test("yearly toggle should update displayed prices", async ({ page }) => {
    await page.goto("https://vortex.omni.dev/pricing");
    await page.waitForLoadState("networkidle");

    // Collect initial prices visible on the page
    const getPriceTexts = async () => {
      return page.evaluate(() => {
        const priceElements = document.querySelectorAll(
          '[class*="price"], [data-testid*="price"]',
        );

        if (priceElements.length === 0) {
          // Fallback: grab all elements containing dollar amounts
          const all = Array.from(document.querySelectorAll("*"));

          return all
            .filter((el) => /^\$\d+/.test(el.textContent?.trim() ?? ""))
            .map((el) => el.textContent?.trim() ?? "");
        }

        return Array.from(priceElements).map(
          (el) => el.textContent?.trim() ?? "",
        );
      });
    };

    const monthlyPrices = await getPriceTexts();

    // Find and click the yearly toggle
    const yearlyToggle = page
      .getByRole("switch")
      .or(page.getByRole("button", { name: /yearly|annual/i }))
      .or(page.getByText(/yearly|annual/i).first());

    const toggleExists = await yearlyToggle
      .first()
      .isVisible()
      .catch(() => false);

    if (!toggleExists) {
      test.skip(true, "No yearly/annual toggle found on pricing page");
      return;
    }

    await yearlyToggle.first().click();
    await page.waitForTimeout(500);

    const yearlyPrices = await getPriceTexts();

    // Prices should change after toggling (yearly is typically discounted)
    if (monthlyPrices.length > 0 && yearlyPrices.length > 0) {
      const pricesChanged =
        JSON.stringify(monthlyPrices) !== JSON.stringify(yearlyPrices);

      expect(
        pricesChanged,
        "Prices should update when toggling between monthly and yearly billing",
      ).toBeTruthy();
    }
  });
});

// ─── Bug 6: Mobile responsiveness ────────────────────────────────────────────

test.describe("mobile responsiveness", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("pricing cards should stack vertically at mobile width", async ({
    page,
  }) => {
    await page.goto("https://vortex.omni.dev/pricing");
    await page.waitForLoadState("networkidle");

    // Find pricing cards/tiers
    const cards = page
      .locator('[data-testid="pricing-card"]')
      .or(page.locator("article").filter({ hasText: /\$\d+/ }));

    const count = await cards.count();

    if (count < 2) {
      test.skip(true, "Not enough pricing cards to verify stacking");
      return;
    }

    // Verify cards are stacked (each card's top is below the previous card's bottom)
    const firstBox = await cards.nth(0).boundingBox();
    const secondBox = await cards.nth(1).boundingBox();

    if (firstBox && secondBox) {
      expect(
        secondBox.y,
        "Second pricing card should be below the first (vertically stacked)",
      ).toBeGreaterThan(firstBox.y + firstBox.height * 0.5);
    }
  });

  test("header should show hamburger menu at mobile width", async ({
    page,
    navigateToPage,
  }) => {
    await navigateToPage("/settings");

    const menuButton = page.getByRole("button", { name: "Open menu" });

    await expect(menuButton).toBeVisible({ timeout: 10_000 });

    // Desktop nav should be hidden at mobile width
    const desktopAside = page
      .locator("aside")
      .filter({ has: page.locator("nav") })
      .first();
    const asideVisible = await desktopAside.isVisible().catch(() => false);

    expect(
      asideVisible,
      "Desktop sidebar should be hidden at 375px width",
    ).toBeFalsy();
  });

  test("workspace card should be tappable at mobile width", async ({
    page,
  }) => {
    await page.goto("/workspaces");
    await page.waitForLoadState("networkidle");

    const workspaceLink = page.locator('a[href^="/workspaces/"]').first();

    await expect(workspaceLink).toBeVisible({ timeout: 10_000 });

    // Verify the link has a reasonable tap target size (>= 44x44 per WCAG)
    const box = await workspaceLink.boundingBox();

    if (box) {
      expect(
        box.width,
        "Workspace card should have a minimum tappable width",
      ).toBeGreaterThanOrEqual(44);
      expect(
        box.height,
        "Workspace card should have a minimum tappable height",
      ).toBeGreaterThanOrEqual(44);
    }

    // Verify the card is within the viewport
    if (box) {
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(375);
    }
  });
});

// ─── Bug 7: Aether health check ──────────────────────────────────────────────
// Aether's health endpoint fails with a DNS resolution error, indicating the
// service may not be deployed or its DNS record is misconfigured.

baseTest.describe("Aether health check", () => {
  baseTest(
    "aether health endpoint should resolve and respond",
    async ({ request }) => {
      let response: Awaited<ReturnType<typeof request.get>> | undefined;

      try {
        response = await request.get("https://aether.omni.dev/health", {
          timeout: 15_000,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        // DNS or connection errors indicate the service is unreachable
        if (
          message.includes("ENOTFOUND") ||
          message.includes("DNS") ||
          message.includes("ECONNREFUSED") ||
          message.includes("getaddrinfo")
        ) {
          baseTest.fail(
            true,
            `Bug: aether.omni.dev DNS resolution failed - service may not be deployed: ${message}`,
          );
        }

        throw error;
      }

      expect(response.status()).toBeLessThan(500);

      // If the endpoint returns JSON, verify the health status
      const contentType = response.headers()["content-type"] ?? "";

      if (contentType.includes("application/json")) {
        const body = await response.json();

        expect(body.status ?? body.healthy ?? body.ok).toBeTruthy();
      }
    },
  );
});

// ─── Bug 8: API health ───────────────────────────────────────────────────────

baseTest.describe("Vortex API health", () => {
  baseTest(
    "API health endpoint should return ok status",
    async ({ request }) => {
      const response = await request.get("https://api.vortex.omni.dev/health");

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body.status).toBe("ok");
      expect(body.service).toBe("Vortex");
      expect(body.timestamp).toBeDefined();
    },
  );

  baseTest(
    "API should respond within acceptable latency",
    async ({ request }) => {
      const start = Date.now();
      const response = await request.get("https://api.vortex.omni.dev/health");
      const latency = Date.now() - start;

      expect(response.status()).toBe(200);

      // Health check should respond within 5 seconds
      expect(
        latency,
        `API health check latency was ${latency}ms, expected < 5000ms`,
      ).toBeLessThan(5_000);
    },
  );
});
