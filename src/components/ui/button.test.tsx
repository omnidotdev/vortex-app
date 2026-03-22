import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { Button } from "./button";

afterEach(cleanup);

describe("Button", () => {
  it("renders with type='button' by default", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });

    expect(button.getAttribute("type")).toBe("button");
  });

  it("allows explicit type='submit' override", () => {
    render(<Button type="submit">Submit</Button>);

    const button = screen.getByRole("button", { name: "Submit" });

    expect(button.getAttribute("type")).toBe("submit");
  });

  it("does not apply type attribute when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link</a>
      </Button>,
    );

    const link = screen.getByRole("link", { name: "Link" });

    expect(link.getAttribute("type")).toBeNull();
  });
});
