import { beforeEach, describe, expect, mock, test } from "bun:test";

import { checkIdentity } from "@omnidotdev/providers/react";

const calls: string[] = [];

const signOutLocal = mock(async () => {
  calls.push("signOutLocal");
  // A federated logout URL the follow helpers must never navigate to
  return { idpLogoutUrl: "https://identity.test.local/oauth2/end-session" };
});

const signInSocial = mock(
  async (_params: { provider: string; callbackURL: string }) => {
    calls.push("signIn");
  },
);

mock.module("@/server/functions/auth", () => ({ signOutLocal }));
mock.module("@/lib/auth/authClient", () => ({
  default: { signIn: { social: signInSocial } },
}));

const { followSignOut, followSwitch } = await import(
  "@/lib/auth/followIdentity"
);

const respond = (status: number, body?: unknown) =>
  (async () =>
    new Response(body ? JSON.stringify(body) : null, {
      status,
    })) as unknown as typeof fetch;

beforeEach(() => {
  calls.length = 0;
  signOutLocal.mockClear();
  signInSocial.mockClear();
});

describe("followIdentity", () => {
  test("a switched Omni account signs out locally, then signs in again to the same page", async () => {
    window.history.replaceState(null, "", "/workspaces?tab=all");

    await followSwitch();

    expect(calls).toEqual(["signOutLocal", "signIn"]);
    expect(signInSocial).toHaveBeenCalledWith({
      provider: "omni",
      callbackURL: "/workspaces?tab=all",
    });
  });

  test("an Omni sign-out ends only the local session", async () => {
    await followSignOut();

    expect(calls).toEqual(["signOutLocal"]);
    expect(signInSocial).not.toHaveBeenCalled();
  });

  test("the identity check reports a changed sub as switched and a 401 as signed out", async () => {
    expect(
      await checkIdentity(
        "https://identity.test.local",
        "user-a",
        respond(200, { data: { sub: "user-b" } }),
      ),
    ).toBe("switched");
    expect(
      await checkIdentity(
        "https://identity.test.local",
        "user-a",
        respond(401),
      ),
    ).toBe("signed-out");
    expect(
      await checkIdentity(
        "https://identity.test.local",
        "user-a",
        respond(200, { data: { sub: "user-a" } }),
      ),
    ).toBe("same");
  });
});
