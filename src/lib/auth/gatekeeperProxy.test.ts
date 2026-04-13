import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";

import { proxyToGatekeeper } from "./gatekeeperProxy";

// Capture fetch calls for assertions
let fetchCalls: Array<{ url: string; init: RequestInit }> = [];
const mockFetchResponse = new Response(JSON.stringify({ ok: true }), {
  status: 200,
  headers: { "Content-Type": "application/json" },
});

// Mock getAuth to return a valid session with an access token
mock.module("@/lib/auth/getAuth", () => ({
  getAuth: () =>
    Promise.resolve({
      accessToken: "test-access-token",
      user: { id: "user-1" },
    }),
}));

// Mock env config
mock.module("@/lib/config/env.config", () => ({
  SERVER_AUTH_BASE_URL: "https://auth.test.local",
}));

// Intercept global fetch
const originalFetch = globalThis.fetch;

beforeEach(() => {
  fetchCalls = [];
  globalThis.fetch = mock((url: string, init: RequestInit) => {
    fetchCalls.push({ url, init });
    return Promise.resolve(mockFetchResponse.clone());
  }) as unknown as typeof fetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

// -- helpers --

/** Build a minimal Request with the given method and optional JSON body */
function makeRequest(method: string, body?: Record<string, unknown>): Request {
  const init: RequestInit = { method };
  if (body) {
    init.body = JSON.stringify(body);
    init.headers = { "Content-Type": "application/json" };
  }
  return new Request("https://vortex.test/api/auth/api-key/create", init);
}

// -- tests --

describe("proxyToGatekeeper", () => {
  describe("body handling", () => {
    test("GET requests do NOT include a body property in fetch init", async () => {
      const req = makeRequest("GET");
      await proxyToGatekeeper(req, "/api/auth/api-key/list");

      expect(fetchCalls).toHaveLength(1);
      const { init } = fetchCalls[0];
      expect(init.method).toBe("GET");
      expect("body" in init).toBe(false);
    });

    test("DELETE requests do NOT include a body", async () => {
      const req = makeRequest("DELETE");
      await proxyToGatekeeper(req, "/api/auth/api-key/delete");

      expect(fetchCalls).toHaveLength(1);
      const { init } = fetchCalls[0];
      expect(init.method).toBe("DELETE");
      expect("body" in init).toBe(false);
    });

    test("POST requests include the body from the original request", async () => {
      const payload = { name: "my-key" };
      const req = makeRequest("POST", payload);
      await proxyToGatekeeper(req, "/api/auth/api-key/create");

      expect(fetchCalls).toHaveLength(1);
      const { init } = fetchCalls[0];
      expect(init.method).toBe("POST");
      expect(init.body).toBe(JSON.stringify(payload));
    });

    test("PUT requests include the body", async () => {
      const payload = { name: "updated-key" };
      const req = makeRequest("PUT", payload);
      await proxyToGatekeeper(req, "/api/auth/api-key/update");

      expect(fetchCalls).toHaveLength(1);
      const { init } = fetchCalls[0];
      expect(init.method).toBe("PUT");
      expect(init.body).toBe(JSON.stringify(payload));
    });

    test("PATCH requests include the body", async () => {
      const payload = { enabled: false };
      const req = makeRequest("PATCH", payload);
      await proxyToGatekeeper(req, "/api/auth/api-key/toggle");

      expect(fetchCalls).toHaveLength(1);
      const { init } = fetchCalls[0];
      expect(init.method).toBe("PATCH");
      expect(init.body).toBe(JSON.stringify(payload));
    });
  });

  describe("auth headers", () => {
    test("forwards Bearer token in Authorization header", async () => {
      const req = makeRequest("GET");
      await proxyToGatekeeper(req, "/api/auth/api-key/list");

      expect(fetchCalls).toHaveLength(1);
      const headers = fetchCalls[0].init.headers as Record<string, string>;
      expect(headers.Authorization).toBe("Bearer test-access-token");
    });

    test("sets Origin to SERVER_AUTH_BASE_URL", async () => {
      const req = makeRequest("GET");
      await proxyToGatekeeper(req, "/api/auth/api-key/list");

      const headers = fetchCalls[0].init.headers as Record<string, string>;
      expect(headers.Origin).toBe("https://auth.test.local");
    });

    test("sets Content-Type for POST requests", async () => {
      const req = makeRequest("POST", { name: "key" });
      await proxyToGatekeeper(req, "/api/auth/api-key/create");

      const headers = fetchCalls[0].init.headers as Record<string, string>;
      expect(headers["Content-Type"]).toBe("application/json");
    });

    test("does not set Content-Type for GET requests", async () => {
      const req = makeRequest("GET");
      await proxyToGatekeeper(req, "/api/auth/api-key/list");

      const headers = fetchCalls[0].init.headers as Record<string, string>;
      expect(headers["Content-Type"]).toBeUndefined();
    });
  });

  describe("URL forwarding", () => {
    test("forwards full path to Gatekeeper", async () => {
      const req = makeRequest("GET");
      await proxyToGatekeeper(req, "/api/auth/api-key/list");

      expect(fetchCalls[0].url).toBe(
        "https://auth.test.local/api/auth/api-key/list",
      );
    });
  });

  describe("error handling", () => {
    test("returns 502 when fetch throws", async () => {
      globalThis.fetch = mock(() => {
        throw new Error("network failure");
      }) as unknown as typeof fetch;

      const req = makeRequest("GET");
      const res = await proxyToGatekeeper(req, "/api/auth/api-key/list");

      expect(res.status).toBe(502);
      const body = await res.json();
      expect(body.error).toBe("Failed to reach authentication service");
    });
  });

  describe("unauthorized access", () => {
    test("returns 401 when session has no access token", async () => {
      // Override getAuth to return no token
      mock.module("@/lib/auth/getAuth", () => ({
        getAuth: () => Promise.resolve(null),
      }));

      // Re-import to pick up the new mock
      const { proxyToGatekeeper: freshProxy } = await import(
        "./gatekeeperProxy"
      );

      const req = makeRequest("GET");
      const res = await freshProxy(req, "/api/auth/api-key/list");

      expect(res.status).toBe(401);
      const body = await res.json();
      expect(body.error).toBe("Unauthorized");
    });
  });
});
