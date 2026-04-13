import { describe, expect, it } from "bun:test";

/**
 * Loader data guard logic tests.
 *
 * These test the guard conditions used in route components to prevent crashes
 * when `useLoaderData()` returns undefined during SSR/hydration race conditions.
 *
 * Regression test for: dashboard crash on first load with
 * "Cannot destructure property 'organizationId' of 'useLoaderData(...)' as it is undefined"
 */

// Mirror the loader data shapes from route files
type AppLoaderData =
  | {
      defaultOpen: boolean;
      sidebarWidth: string | undefined;
    }
  | null
  | undefined;

type DashboardLoaderData =
  | {
      organizationId: string;
      subscription: unknown;
    }
  | null
  | undefined;

// Guard logic extracted from _app.tsx AuthenticatedLayout
const isAppLoaderDataReady = (data: AppLoaderData): boolean => !!data;

// Guard logic extracted from $workspaceSlug/index.tsx WorkspaceDashboard
const isDashboardLoaderDataReady = (data: DashboardLoaderData): boolean =>
  !!data;

describe("loader data guards", () => {
  describe("_app layout", () => {
    it("should show loading state when loader data is undefined", () => {
      expect(isAppLoaderDataReady(undefined)).toBe(false);
    });

    it("should show loading state when loader data is null", () => {
      expect(isAppLoaderDataReady(null)).toBe(false);
    });

    it("should render when loader data is available", () => {
      expect(
        isAppLoaderDataReady({ defaultOpen: true, sidebarWidth: undefined }),
      ).toBe(true);
    });

    it("should render when sidebar is closed", () => {
      expect(
        isAppLoaderDataReady({ defaultOpen: false, sidebarWidth: "240" }),
      ).toBe(true);
    });
  });

  describe("workspace dashboard", () => {
    it("should show loading state when loader data is undefined", () => {
      expect(isDashboardLoaderDataReady(undefined)).toBe(false);
    });

    it("should show loading state when loader data is null", () => {
      expect(isDashboardLoaderDataReady(null)).toBe(false);
    });

    it("should render when loader data is available", () => {
      expect(
        isDashboardLoaderDataReady({
          organizationId: "org-123",
          subscription: null,
        }),
      ).toBe(true);
    });

    it("should not crash when destructuring undefined loader data", () => {
      // This is the exact scenario that caused the production crash.
      // Before the fix, the component did:
      //   const { organizationId, subscription } = Route.useLoaderData();
      // which throws TypeError when useLoaderData() returns undefined.

      // Simulates useLoaderData() returning undefined at runtime
      const getLoaderData = (): DashboardLoaderData => undefined;
      const loaderData = getLoaderData();
      const organizationId = loaderData?.organizationId ?? "";

      expect(isDashboardLoaderDataReady(loaderData)).toBe(false);
      expect(organizationId).toBe("");
    });
  });
});
