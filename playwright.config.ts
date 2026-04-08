import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for Vortex App e2e tests.
 * Tests run against production (https://vortex.omni.dev).
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "html",
  timeout: 60_000,
  expect: {
    timeout: 15_000,
  },
  use: {
    baseURL: "https://vortex.omni.dev",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    storageState: "./e2e/.auth/session.json",
  },
  projects: [
    // Auth setup (runs first, no storageState dependency)
    // Uses Desktop Chrome viewport so the header Sign In button is visible
    // (mobile viewports hide it behind a hamburger menu)
    {
      name: "setup",
      testMatch: /auth\.setup\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: undefined,
      },
    },

    // Desktop tests
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["setup"],
    },

    // Mobile tests
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
      dependencies: ["setup"],
    },

    // iPhone tests (for specific mobile viewport bugs)
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 13"] },
      dependencies: ["setup"],
    },
  ],
});
