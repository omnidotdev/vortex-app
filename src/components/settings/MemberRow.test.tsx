import { afterEach, describe, expect, it } from "bun:test";

import { act, cleanup, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import MemberRow from "./MemberRow";

import type { GatekeeperMember } from "@omnidotdev/providers/auth";

afterEach(cleanup);

const CURRENT_USER_ID = "user-abc-123";

const mockMember: GatekeeperMember = {
  id: "member-1",
  userId: CURRENT_USER_ID,
  organizationId: "org-1",
  role: "admin",
  createdAt: "2025-06-15T12:00:00Z",
  user: {
    id: CURRENT_USER_ID,
    name: "Alice",
    email: "alice@omni.dev",
    image: null,
  },
};

const noop = async () => {};

function buildRow(currentUserId: string | undefined = CURRENT_USER_ID) {
  return (
    <table>
      <tbody>
        <MemberRow
          member={mockMember}
          currentUserId={currentUserId}
          isOwner={false}
          onRoleChange={noop}
          onRemove={noop}
        />
      </tbody>
    </table>
  );
}

describe("MemberRow hydration safety (SSR)", () => {
  it("does not include '(you)' in server-rendered HTML (useClientValue defers to client)", () => {
    const html = renderToString(buildRow());

    // On the server, useEffect does not run, so useClientValue returns
    // undefined and isCurrentUser is false
    expect(html).not.toContain("(you)");
  });

  it("renders an empty joined-date cell in server-rendered HTML (useFormattedDate defers to client)", () => {
    const html = renderToString(buildRow());

    // useFormattedDate initializes state as "" and only sets the formatted
    // date inside useEffect, which does not run on the server. The date
    // <td> should be present but empty
    expect(html).not.toContain("2025");
    // The date cell should exist (class includes sm:table-cell)
    expect(html).toContain("sm:table-cell");
  });
});

describe("MemberRow client hydration", () => {
  it("renders '(you)' after client-side effects flush", async () => {
    render(buildRow());

    // Effects may already have flushed in the test env, but flush
    // explicitly to be safe
    await act(async () => {});

    expect(screen.getByText("(you)")).toBeTruthy();
  });

  it("does not render '(you)' when currentUserId does not match", async () => {
    render(buildRow("different-user-id"));

    await act(async () => {});

    expect(screen.queryByText("(you)")).toBeNull();
  });

  it("renders a formatted date containing the year after effects flush", async () => {
    render(buildRow());

    await act(async () => {});

    const cells = document.querySelectorAll("td");
    const dateCell = cells[1];

    expect(dateCell).toBeTruthy();
    expect(dateCell!.textContent!.length).toBeGreaterThan(0);
    expect(dateCell!.textContent).toContain("2025");
  });
});
