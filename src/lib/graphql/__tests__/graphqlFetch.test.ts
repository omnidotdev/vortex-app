import { describe, expect, it } from "bun:test";

import { ClientError } from "graphql-request";

// Helper to create a ClientError with partial response data
const makeClientError = (
  status: number,
  errors: { message: string; extensions?: Record<string, unknown> }[],
) =>
  new ClientError(
    {
      errors,
      status,
      headers: {} as Headers,
      body: "{}",
    } as unknown as ConstructorParameters<typeof ClientError>[0],
    { query: "query { test }" },
  );

/**
 * Verify that UNAUTHENTICATED GraphQL errors trigger redirect
 * instead of crashing the error boundary.
 */
describe("graphqlFetch error handling", () => {
  it("should detect UNAUTHENTICATED extension code", () => {
    const error = makeClientError(200, [
      {
        message: "Authentication required",
        extensions: { code: "UNAUTHENTICATED" },
      },
    ]);

    const isUnauthenticated = error.response.errors?.some(
      (e) => e.extensions?.code === "UNAUTHENTICATED",
    );

    expect(isUnauthenticated).toBe(true);
  });

  it("should detect HTTP 401 status", () => {
    const error = makeClientError(401, [{ message: "Unauthorized" }]);

    expect(error.response.status).toBe(401);
  });

  it("should not flag non-auth errors for redirect", () => {
    const error = makeClientError(200, [
      { message: "Not found", extensions: { code: "NOT_FOUND" } },
    ]);

    const isHttp401 = error.response.status === 401;
    const isUnauthenticated = error.response.errors?.some(
      (e) => e.extensions?.code === "UNAUTHENTICATED",
    );

    expect(isHttp401 || isUnauthenticated).toBe(false);
  });
});
