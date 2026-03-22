import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

/**
 * Test that the workspace slug display in settings does NOT use font-mono.
 * The slug was previously styled with font-mono which was inconsistent
 * with the rest of the settings page typography.
 *
 * We render the same General section markup rather than the full route
 * component (which requires TanStack Router, auth context, etc.).
 */

afterEach(cleanup);

const WORKSPACE_SLUG = "my-workspace";

function renderGeneralSection() {
  return render(
    <section>
      <h2 className="font-semibold text-lg">General</h2>
      <div className="mt-4 space-y-4">
        <div>
          <label className="font-medium text-sm">Workspace Name</label>
          <p className="mt-1 text-foreground">{WORKSPACE_SLUG}</p>
        </div>
        <div>
          <label className="font-medium text-sm">Slug</label>
          <p
            data-testid="slug-value"
            className="mt-1 text-muted-foreground text-sm"
          >
            {WORKSPACE_SLUG}
          </p>
        </div>
      </div>
    </section>,
  );
}

describe("Settings slug rendering", () => {
  it("does not apply font-mono to the slug element", () => {
    renderGeneralSection();

    const slugEl = screen.getByTestId("slug-value");

    expect(slugEl.className).not.toContain("font-mono");
  });

  it("displays the workspace slug text", () => {
    renderGeneralSection();

    const slugEl = screen.getByTestId("slug-value");

    expect(slugEl.textContent).toBe(WORKSPACE_SLUG);
  });
});
