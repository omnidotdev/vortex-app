import { JSDOM } from "jsdom";

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  url: "http://localhost",
  pretendToBeVisual: true,
});

// Register DOM globals for @testing-library/react
Object.defineProperty(globalThis, "window", { value: dom.window });
Object.defineProperty(globalThis, "document", { value: dom.window.document });
Object.defineProperty(globalThis, "navigator", { value: dom.window.navigator });
Object.defineProperty(globalThis, "HTMLElement", {
  value: dom.window.HTMLElement,
});
Object.defineProperty(globalThis, "Element", { value: dom.window.Element });
Object.defineProperty(globalThis, "Node", { value: dom.window.Node });
Object.defineProperty(globalThis, "Text", { value: dom.window.Text });
Object.defineProperty(globalThis, "DocumentFragment", {
  value: dom.window.DocumentFragment,
});
Object.defineProperty(globalThis, "MutationObserver", {
  value: dom.window.MutationObserver,
});
Object.defineProperty(globalThis, "getComputedStyle", {
  value: dom.window.getComputedStyle,
});
Object.defineProperty(globalThis, "requestAnimationFrame", {
  value: (cb: FrameRequestCallback) => setTimeout(cb, 0),
});
Object.defineProperty(globalThis, "cancelAnimationFrame", {
  value: clearTimeout,
});
Object.defineProperty(globalThis, "Event", { value: dom.window.Event });
Object.defineProperty(globalThis, "CustomEvent", {
  value: dom.window.CustomEvent,
});
Object.defineProperty(globalThis, "MouseEvent", {
  value: dom.window.MouseEvent,
});
Object.defineProperty(globalThis, "KeyboardEvent", {
  value: dom.window.KeyboardEvent,
});
Object.defineProperty(globalThis, "HTMLButtonElement", {
  value: dom.window.HTMLButtonElement,
});
Object.defineProperty(globalThis, "HTMLAnchorElement", {
  value: dom.window.HTMLAnchorElement,
});
Object.defineProperty(globalThis, "SVGElement", {
  value: dom.window.SVGElement,
});
Object.defineProperty(globalThis, "HTMLInputElement", {
  value: dom.window.HTMLInputElement,
});
Object.defineProperty(globalThis, "HTMLTextAreaElement", {
  value: dom.window.HTMLTextAreaElement,
});
Object.defineProperty(globalThis, "HTMLSelectElement", {
  value: dom.window.HTMLSelectElement,
});
