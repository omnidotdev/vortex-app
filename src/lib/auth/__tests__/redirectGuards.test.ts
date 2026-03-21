import { describe, expect, it } from "bun:test";

/**
 * Auth redirect guard logic tests.
 *
 * These test the conditions used in route guards to prevent redirect loops.
 * The _app route rejects sessions missing `rowId` (user not in Vortex DB).
 * The _public/index route must use the same condition to avoid loops.
 *
 * Regression test for: redirect loop when user exists in IdP but not in Vortex DB
 */

// Mirrors the session shape from getAuth
type Session = {
  user?: {
    id?: string;
    email?: string;
    name?: string;
    rowId?: string | null;
    identityProviderId?: string | null;
  } | null;
} | null;

// Condition from _app.tsx beforeLoad: redirect to "/" when this is true
const appGuardShouldReject = (session: Session) => !session?.user?.rowId;

// Condition from _public/index.tsx beforeLoad: redirect to "/workspaces" when this is true
const publicGuardShouldRedirect = (session: Session) => !!session?.user?.rowId;

// Condition from _public/index.tsx beforeLoad: clear zombie session when this is true
const publicGuardShouldClearSession = (session: Session) =>
  !!session?.user && !session.user.rowId;

// Condition from _public.tsx layout: show "Sign Out" when this is true
const publicLayoutShowsSignOut = (session: Session) => !!session?.user?.rowId;

describe("redirect guards", () => {
  it("should not create a redirect loop for IdP-only users (no rowId)", () => {
    // User authenticated in IdP but not provisioned in Vortex DB
    const session: Session = {
      user: {
        id: "better-auth-id",
        email: "test@example.com",
        name: "Test User",
        rowId: null,
        identityProviderId: "idp-sub-123",
      },
    };

    // _app rejects (redirects to /)
    expect(appGuardShouldReject(session)).toBe(true);

    // _public/index must NOT redirect to /workspaces (would cause loop)
    expect(publicGuardShouldRedirect(session)).toBe(false);
  });

  it("should not create a redirect loop for sessions with undefined rowId", () => {
    const session: Session = {
      user: {
        id: "better-auth-id",
        email: "test@example.com",
        rowId: undefined,
      },
    };

    expect(appGuardShouldReject(session)).toBe(true);
    expect(publicGuardShouldRedirect(session)).toBe(false);
  });

  it("should redirect fully provisioned users to workspaces", () => {
    const session: Session = {
      user: {
        id: "better-auth-id",
        email: "test@example.com",
        name: "Test User",
        rowId: "vortex-db-uuid",
        identityProviderId: "idp-sub-123",
      },
    };

    // _app allows (has rowId)
    expect(appGuardShouldReject(session)).toBe(false);

    // _public/index redirects to /workspaces
    expect(publicGuardShouldRedirect(session)).toBe(true);
  });

  it("should show landing page for unauthenticated users", () => {
    // No session at all
    expect(appGuardShouldReject(null)).toBe(true);
    expect(publicGuardShouldRedirect(null)).toBe(false);

    // Session with null user
    const emptySession: Session = { user: null };
    expect(appGuardShouldReject(emptySession)).toBe(true);
    expect(publicGuardShouldRedirect(emptySession)).toBe(false);
  });

  it("guards must be symmetric: if _app rejects, _public must not redirect", () => {
    // Exhaustive: every session state that _app rejects must also be
    // a state where _public does NOT redirect, otherwise redirect loop
    const rejectedSessions: Session[] = [
      null,
      { user: null },
      { user: { id: "a", rowId: null } },
      { user: { id: "a", rowId: undefined } },
      { user: { id: "a" } },
    ];

    for (const session of rejectedSessions) {
      expect(appGuardShouldReject(session)).toBe(true);
      expect(publicGuardShouldRedirect(session)).toBe(false);
    }
  });

  it("should clear zombie sessions (session exists but no rowId)", () => {
    // User in IdP but not provisioned in Vortex DB
    const zombieSession: Session = {
      user: {
        id: "better-auth-id",
        email: "test@example.com",
        rowId: null,
      },
    };

    // Should clear session (prevent confusing "Sign Out" dead-end)
    expect(publicGuardShouldClearSession(zombieSession)).toBe(true);

    // Layout should NOT show "Sign Out" for zombie sessions
    expect(publicLayoutShowsSignOut(zombieSession)).toBe(false);
  });

  it("should not clear session for unauthenticated users", () => {
    expect(publicGuardShouldClearSession(null)).toBe(false);
    expect(publicGuardShouldClearSession({ user: null })).toBe(false);
  });

  it("should not clear session for fully provisioned users", () => {
    const session: Session = {
      user: {
        id: "better-auth-id",
        rowId: "vortex-db-uuid",
      },
    };

    expect(publicGuardShouldClearSession(session)).toBe(false);
    expect(publicLayoutShowsSignOut(session)).toBe(true);
  });
});
