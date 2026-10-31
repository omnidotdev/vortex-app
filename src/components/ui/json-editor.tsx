import { json, jsonParseLinter } from "@codemirror/lang-json";
import { lintGutter, linter } from "@codemirror/lint";
import { EditorView, placeholder as placeholderExt } from "@codemirror/view";
import { CodeEditor } from "@omnidotdev/thornberry/code-editor";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { useCallback, useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import type { Extension } from "@codemirror/state";

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: number;
  maxHeight?: number;
  readOnly?: boolean;
}

/**
 * JSON editor with syntax highlighting, validation, and auto-formatting.
 * Built on the shared `@omnidotdev/thornberry/code-editor`, injecting the JSON
 * language, lint, and theme through its extension and theme props
 */
export function JsonEditor({
  value,
  onChange,
  placeholder,
  className,
  minHeight = 100,
  maxHeight = 300,
  readOnly = false,
}: JsonEditorProps) {
  const [isDark, setIsDark] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Validate JSON
  useEffect(() => {
    // Allow template variables in JSON - skip validation if templates present
    if (value.includes("{{") && value.includes("}}")) {
      setError(null);
      return;
    }

    try {
      if (value.trim()) {
        JSON.parse(value);
      }
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }, [value]);

  // Layout theme preserving the editor's font size, height bounds, gutter, and
  // placeholder styling; reconfigured live alongside the light/dark theme
  const theme = useMemo<Extension>(() => {
    const layoutTheme = EditorView.theme({
      "&": {
        fontSize: "16px",
        minHeight: `${minHeight}px`,
        maxHeight: `${maxHeight}px`,
      },
      ".cm-scroller": {
        overflow: "auto",
        fontFamily:
          'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
      },
      ".cm-content": {
        minHeight: `${minHeight - 16}px`,
        padding: "8px 0",
      },
      ".cm-gutters": {
        borderRight: "none",
        backgroundColor: "transparent",
      },
      ".cm-placeholder": {
        color: "hsl(var(--muted-foreground))",
        fontStyle: "italic",
      },
      "&.cm-focused": {
        outline: "none",
      },
    });

    return [isDark ? githubDark : githubLight, layoutTheme];
  }, [isDark, minHeight, maxHeight]);

  const extensions = useMemo<Extension[]>(() => {
    const exts: Extension[] = [linter(jsonParseLinter()), lintGutter()];
    if (placeholder) exts.push(placeholderExt(placeholder));
    return exts;
  }, [placeholder]);

  // Format JSON
  const handleFormat = useCallback(() => {
    try {
      const parsed = JSON.parse(value);
      const formatted = JSON.stringify(parsed, null, 2);
      onChange(formatted);
    } catch {
      // Can't format invalid JSON
    }
  }, [value, onChange]);

  // Minify JSON
  const handleMinify = useCallback(() => {
    try {
      const parsed = JSON.parse(value);
      const minified = JSON.stringify(parsed);
      onChange(minified);
    } catch {
      // Can't minify invalid JSON
    }
  }, [value, onChange]);

  return (
    <div className={cn("relative", className)}>
      <CodeEditor
        value={value}
        onChange={onChange}
        language={json()}
        theme={theme}
        extensions={extensions}
        readOnly={readOnly}
        className={cn(
          "overflow-hidden rounded-md border bg-background",
          error && "border-destructive",
          "focus-within:ring-1 focus-within:ring-ring",
        )}
      />
      {!readOnly && (
        <div className="absolute top-1 right-1 z-10 flex gap-1">
          <button
            type="button"
            onClick={handleFormat}
            className="rounded bg-muted/80 px-1.5 py-0.5 text-muted-foreground text-xs backdrop-blur-sm transition-colors hover:bg-muted hover:text-foreground"
            title="Format JSON (Ctrl+Shift+F)"
          >
            Format
          </button>
          <button
            type="button"
            onClick={handleMinify}
            className="rounded bg-muted/80 px-1.5 py-0.5 text-muted-foreground text-xs backdrop-blur-sm transition-colors hover:bg-muted hover:text-foreground"
            title="Minify JSON"
          >
            Minify
          </button>
        </div>
      )}
      {error && <p className="mt-1 text-destructive text-xs">{error}</p>}
    </div>
  );
}
