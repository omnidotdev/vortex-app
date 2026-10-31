import { EditorView, placeholder as placeholderExt } from "@codemirror/view";
import { CodeEditor } from "@omnidotdev/thornberry/code-editor";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { useEffect, useMemo, useState } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import type { Extension } from "@codemirror/state";

interface ExpressionFieldProps {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  rows?: number;
}

export const ExpressionField = ({
  id,
  label,
  value,
  onChange,
  placeholder = "$.trigger.data.value",
  hint,
  rows = 2,
}: ExpressionFieldProps) => {
  const [isDark, setIsDark] = useState(false);

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

  // Layout theme matching the former mono textarea, sized from rows
  const theme = useMemo<Extension>(() => {
    const minHeight = rows * 24;
    const layoutTheme = EditorView.theme({
      "&": {
        fontSize: "14px",
        minHeight: `${minHeight}px`,
      },
      ".cm-scroller": {
        overflow: "auto",
        fontFamily:
          'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
      },
      ".cm-content": {
        minHeight: `${minHeight}px`,
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
  }, [isDark, rows]);

  const extensions = useMemo<Extension[]>(
    () => [placeholderExt(placeholder)],
    [placeholder],
  );

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <CodeEditor
        value={value || ""}
        onChange={onChange}
        theme={theme}
        extensions={extensions}
        className={cn(
          "overflow-hidden rounded-md border bg-background",
          "focus-within:ring-1 focus-within:ring-ring",
        )}
      />
      {hint && <p className="text-muted-foreground text-xs">{hint}</p>}
    </div>
  );
};
