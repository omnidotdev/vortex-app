import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import {
  bracketMatching,
  foldGutter,
  indentOnInput,
} from "@codemirror/language";
import { lintGutter, linter } from "@codemirror/lint";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  drawSelection,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
} from "@codemirror/view";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

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
 * Uses CodeMirror 6 for a rich editing experience.
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
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
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

  // Initialize editor
  useEffect(() => {
    if (!containerRef.current) return;

    const theme = EditorView.theme({
      "&": {
        fontSize: "13px",
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

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChange(update.state.doc.toString());
      }
    });

    const state = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        history(),
        foldGutter(),
        drawSelection(),
        indentOnInput(),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        highlightActiveLine(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        json(),
        linter(jsonParseLinter()),
        lintGutter(),
        isDark ? githubDark : githubLight,
        theme,
        updateListener,
        EditorState.readOnly.of(readOnly),
        placeholder
          ? EditorView.contentAttributes.of({ "data-placeholder": placeholder })
          : [],
      ],
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [isDark, minHeight, maxHeight, readOnly]);

  // Update content when value changes externally
  useEffect(() => {
    const view = viewRef.current;
    if (view && value !== view.state.doc.toString()) {
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: value,
        },
      });
    }
  }, [value]);

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
      <div
        ref={containerRef}
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
