import { forwardRef } from "react";
import type { LabSettings } from "@/lib/lab/settings";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  settings: LabSettings;
  blind?: boolean;
  disabled?: boolean;
}

const paperWidth: Record<string, string> = {
  a4: "max-w-[794px]",
  letter: "max-w-[816px]",
  wide: "max-w-[1100px]",
};

const caretClass: Record<string, string> = {
  thin: "lab-caret-thin",
  block: "lab-caret-block",
  underline: "lab-caret-underline",
  animated: "lab-caret-animated",
};

const LabEditor = forwardRef<HTMLTextAreaElement, Props>(
  ({ value, onChange, onKeyDown, settings, blind, disabled }, ref) => {
    return (
      <div className="flex justify-center px-2 py-6 sm:px-6">
        <div
          className={`w-full ${paperWidth[settings.paperSize]} rounded-md bg-[hsl(var(--lab-paper))] text-[hsl(var(--lab-paper-foreground))] shadow-[0_10px_40px_-12px_hsl(var(--foreground)/0.35)] ring-1 ring-border/60`}
        >
          <textarea
            ref={ref}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Start typing here..."
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            autoComplete="off"
            data-gramm="false"
            data-gramm_editor="false"
            data-enable-grammarly="false"
            className={`lab-editor ${caretClass[settings.cursor]} w-full resize-none bg-transparent px-8 py-10 sm:px-14 sm:py-16 outline-none placeholder:text-muted-foreground/50 ${
              blind ? "text-transparent selection:bg-transparent" : ""
            }`}
            style={{
              fontFamily: `"${settings.fontFamily}", system-ui, sans-serif`,
              fontSize: settings.fontSize,
              lineHeight: settings.lineHeight,
              minHeight: settings.paperSize === "a4" ? 1123 : 1000,
              caretColor: settings.cursor === "block" ? "transparent" : undefined,
            }}
          />
        </div>
      </div>
    );
  }
);

LabEditor.displayName = "LabEditor";
export default LabEditor;
