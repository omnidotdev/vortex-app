import { describe, expect, mock, test } from "bun:test";

const signInSocial = mock(
  async (_params: { provider: string; callbackURL: string }) => {},
);

mock.module("@/lib/auth/authClient", () => ({
  default: { signIn: { social: signInSocial } },
}));

const { default: signIn } = await import("@/lib/auth/signIn");

describe("signIn", () => {
  test("starts an Omni sign-in in the browser, where server config is absent", async () => {
    await signIn({ redirectUrl: "/workspaces" });

    expect(signInSocial).toHaveBeenCalledWith({
      provider: "omni",
      callbackURL: "/workspaces",
    });
  });
});
