import { test as base, expect } from "@playwright/test";

import type { Page } from "@playwright/test";

/**
 * Resolve the first workspace slug from the workspaces page.
 * Most test accounts have at least one workspace.
 */
async function resolveWorkspaceSlug(page: Page): Promise<string> {
  await page.goto("/workspaces");
  await page.waitForLoadState("networkidle");

  // Click the first workspace card/link to navigate into it
  const workspaceLink = page
    .locator('a[href*="/workspaces/"]')
    .filter({ hasNotText: /pricing|docs/i })
    .first();
  const href = await workspaceLink.getAttribute("href");

  if (!href) throw new Error("No workspace link found");

  // Extract slug from /workspaces/<slug> or /workspaces/<slug>/...
  const match = href.match(/\/workspaces\/([^/]+)/);

  if (!match?.[1]) throw new Error(`Could not parse workspace slug from ${href}`);

  return match[1];
}

type Fixtures = {
  workspaceSlug: string;
  workspacePath: string;
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
});

export { test, expect };
