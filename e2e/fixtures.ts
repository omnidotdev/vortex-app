import { test as base, expect } from "@playwright/test";

import type { Page } from "@playwright/test";

/**
 * Wait for the workspace layout to load.
 * On desktop (lg+), the aside sidebar with nav is visible.
 * On mobile, the header with "Open menu" button is visible.
 */
async function waitForWorkspaceLayout(
  page: Page,
  timeout = 10_000,
): Promise<boolean> {
  const desktopNav = page
    .locator("aside")
    .filter({ has: page.locator("nav") })
    .first();
  const mobileMenu = page.getByRole("button", { name: "Open menu" });

  try {
    await desktopNav.or(mobileMenu).first().waitFor({
      state: "visible",
      timeout,
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Resolve the first accessible workspace slug from the workspaces page.
 */
async function resolveWorkspaceSlug(page: Page): Promise<string> {
  await page.goto("/workspaces");
  await page.waitForLoadState("networkidle");

  const cards = page.locator('main a[href^="/workspaces/"]');
  const count = await cards.count();

  if (count === 0) throw new Error("No workspace links found on /workspaces");

  const slugs: string[] = [];

  for (let i = 0; i < count; i++) {
    const href = await cards.nth(i).getAttribute("href");

    if (!href) continue;

    const match = href.match(/\/workspaces\/([^/]+)/);

    if (match?.[1] && !slugs.includes(match[1])) {
      slugs.push(match[1]);
    }
  }

  if (slugs.length === 0) {
    throw new Error("Could not parse any workspace slugs");
  }

  for (const slug of slugs) {
    await page.goto(`/workspaces/${slug}`);
    await page.waitForLoadState("networkidle");

    const loaded = await waitForWorkspaceLayout(page);

    if (loaded) return slug;
  }

  throw new Error(
    `None of the workspaces [${slugs.join(", ")}] loaded. The API may be down.`,
  );
}

/**
 * Navigate to a workspace page via direct URL.
 * Uses page.goto since SSR session resolution works with saved auth state.
 */
async function navigateToWorkspacePage(
  page: Page,
  workspaceSlug: string,
  pageSuffix: string,
): Promise<void> {
  const basePath = `/workspaces/${workspaceSlug}`;
  const targetPath = pageSuffix ? `${basePath}${pageSuffix}` : basePath;

  await page.goto(targetPath);
  await page.waitForLoadState("networkidle");

  // Check for error boundary and retry once
  const hasError = await page
    .locator("text=Something went wrong")
    .first()
    .isVisible()
    .catch(() => false);

  if (hasError) {
    await page.reload();
    await page.waitForLoadState("networkidle");
  }

  await page.waitForTimeout(500);
}

type Fixtures = {
  workspaceSlug: string;
  workspacePath: string;
  navigateToPage: (pageSuffix: string) => Promise<void>;
};

/**
 * Extended test fixture that resolves the workspace slug once per test.
 */
const test = base.extend<Fixtures>({
  workspaceSlug: async ({ page }, use) => {
    const slug = await resolveWorkspaceSlug(page);
    await use(slug);
  },
  workspacePath: async ({ workspaceSlug }, use) => {
    await use(`/workspaces/${workspaceSlug}`);
  },
  navigateToPage: async ({ page, workspaceSlug }, use) => {
    await use(async (pageSuffix: string) => {
      await navigateToWorkspacePage(page, workspaceSlug, pageSuffix);
    });
  },
});

export { expect, test };
