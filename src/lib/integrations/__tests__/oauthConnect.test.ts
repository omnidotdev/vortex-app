import { describe, expect, it } from "bun:test";

import { getOAuthAuthorizationUrl } from "@/lib/integrations/oauthConnect";

const request = {
  provider: "github",
  organizationId: "org-1",
  definitionId: "github",
  returnUrl: "/@acme/integrations",
};

/**
 * Build a fake fetch that records its call and answers with a JSON body.
 */
const fakeFetch = (status: number, body: unknown) => {
  const calls: { url: string; init?: RequestInit }[] = [];
  const fn = (async (url: string, init?: RequestInit) => {
    calls.push({ url, init });
    return new Response(JSON.stringify(body), { status });
  }) as unknown as typeof fetch;

  return { fn, calls };
};

const deps = (fetchFn: typeof fetch) => ({
  fetch: fetchFn,
  getAuthHeaders: async () => ({ Authorization: "Bearer session-token" }),
  apiBaseUrl: "https://api.test",
});

describe("getOAuthAuthorizationUrl", () => {
  it("posts with the session in the header and returns the provider URL", async () => {
    const { fn, calls } = fakeFetch(200, {
      url: "https://github.com/login/oauth/authorize?state=abc",
    });

    const url = await getOAuthAuthorizationUrl(request, deps(fn));

    expect(url).toBe("https://github.com/login/oauth/authorize?state=abc");
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(
      "https://api.test/api/v1/oauth/github/authorize-url",
    );
    expect(calls[0].init?.method).toBe("POST");
    expect(
      (calls[0].init?.headers as Record<string, string>).Authorization,
    ).toBe("Bearer session-token");
    // The token travels only in the header, never in the URL or body
    expect(calls[0].url).not.toContain("session-token");
    expect(String(calls[0].init?.body)).not.toContain("session-token");
    expect(JSON.parse(String(calls[0].init?.body))).toEqual({
      organizationId: "org-1",
      definitionId: "github",
      returnUrl: "/@acme/integrations",
    });
  });

  it("explains the connected-account limit on a plan-limit 403", async () => {
    const { fn } = fakeFetch(403, {
      error:
        "Plan limit reached: connected accounts (10/10). Upgrade your plan to continue.",
    });

    await expect(getOAuthAuthorizationUrl(request, deps(fn))).rejects.toThrow(
      "connected-account limit",
    );
  });

  it("explains the admin requirement on any other 403", async () => {
    const { fn } = fakeFetch(403, {
      error: "Only workspace admins can connect integrations",
    });

    await expect(getOAuthAuthorizationUrl(request, deps(fn))).rejects.toThrow(
      "Only workspace admins",
    );
  });

  it("never surfaces raw server errors", async () => {
    const { fn } = fakeFetch(500, { error: "connection refused db:5432" });

    await expect(getOAuthAuthorizationUrl(request, deps(fn))).rejects.toThrow(
      "Could not start the connection. Try again.",
    );
  });
});
