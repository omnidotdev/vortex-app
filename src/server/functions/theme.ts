import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { z } from "zod";

const themeValidator = z.union([
  z.literal("light"),
  z.literal("dark"),
  z.literal("system"),
]);

export type Theme = z.infer<typeof themeValidator>;

const THEME_COOKIE = "vortex:theme";

/**
 * Get the current theme from cookies.
 */
export const getTheme = createServerFn().handler(
  async (): Promise<Theme> => (getCookie(THEME_COOKIE) || "system") as Theme,
);

/**
 * Set the theme in cookies.
 */
export const setTheme = createServerFn({ method: "POST" })
  .inputValidator(themeValidator)
  .handler(async ({ data }) => {
    setCookie(THEME_COOKIE, data, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });
    return { success: true };
  });
