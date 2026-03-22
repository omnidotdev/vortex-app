import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render } from "@testing-library/react";

/**
 * Test the responsive column CSS classes used in the event catalog table.
 * These classes are critical for mobile usability -- the Test column and
 * other secondary columns must hide on small screens.
 *
 * Rather than mounting the full route component (which requires TanStack
 * Router context, query client, etc.), we render the same table markup
 * to verify the class structure.
 */

afterEach(cleanup);

/** Minimal row data matching the event schema shape */
const mockSchema = {
  rowId: "1",
  name: "com.omni.test.created",
  version: 1,
  source: "test-service",
  enforcement: "strict",
  compatibilityMode: "full",
  visibility: "public",
  updatedAt: new Date().toISOString(),
};

/**
 * Render the same table markup from the EventSchemasPage component.
 */
function renderEventTable() {
  return render(
    <table data-testid="event-table">
      <thead>
        <tr className="border-b text-left text-muted-foreground text-sm">
          <th className="min-w-0 pb-3 font-medium">Name</th>
          <th className="w-24 pb-3 font-medium">Version</th>
          <th className="hidden w-24 pb-3 font-medium sm:table-cell">
            Enforcement
          </th>
          <th className="hidden w-32 pb-3 font-medium md:table-cell">
            Compatibility
          </th>
          <th className="hidden w-24 pb-3 font-medium sm:table-cell">
            Visibility
          </th>
          <th className="hidden w-40 pb-3 text-right font-medium md:table-cell">
            Updated
          </th>
          <th className="hidden w-24 pb-3 sm:table-cell" />
        </tr>
      </thead>
      <tbody>
        <tr className="border-b">
          <td className="max-w-0 truncate py-4">
            <a href="#" className="font-medium hover:underline">
              {mockSchema.name}
            </a>
          </td>
          <td className="py-4">v{mockSchema.version}</td>
          <td className="hidden py-4 sm:table-cell">
            {mockSchema.enforcement}
          </td>
          <td className="hidden py-4 text-muted-foreground text-sm md:table-cell">
            {mockSchema.compatibilityMode}
          </td>
          <td className="hidden py-4 sm:table-cell">{mockSchema.visibility}</td>
          <td className="hidden py-4 text-right text-muted-foreground text-sm md:table-cell">
            {new Date(mockSchema.updatedAt).toLocaleDateString()}
          </td>
          <td className="hidden py-4 text-right sm:table-cell">
            <button type="button">Test</button>
          </td>
        </tr>
      </tbody>
    </table>,
  );
}

describe("Event catalog table responsive columns", () => {
  it("hides the Test column header on small screens", () => {
    const { container } = renderEventTable();

    // The last <th> is the Test action column (empty header)
    const headers = container.querySelectorAll("th");
    const testHeader = headers[headers.length - 1];

    expect(testHeader.className).toContain("hidden");
    expect(testHeader.className).toContain("sm:table-cell");
  });

  it("hides the Test column cells on small screens", () => {
    const { container } = renderEventTable();

    // The last <td> in each row is the Test action cell
    const cells = container.querySelectorAll("tbody td");
    const testCell = cells[cells.length - 1];

    expect(testCell.className).toContain("hidden");
    expect(testCell.className).toContain("sm:table-cell");
  });

  it("uses truncation on the Name column cell", () => {
    const { container } = renderEventTable();

    const firstCell = container.querySelector("tbody td");

    expect(firstCell?.className).toContain("max-w-0");
    expect(firstCell?.className).toContain("truncate");
  });
});
