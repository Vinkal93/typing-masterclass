import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Award, FileDown, Loader2 } from "lucide-react";
import type { LiveStats } from "@/lib/lab/stats";
import { keyStats } from "@/lib/lab/stats";
import type { LabError } from "@/lib/lab/settings";
import { fiveInOneWords, useFiveInOne } from "@/lib/lab/wordCount";
import type { EvaluationBreakdown } from "@/lib/lab/evaluation";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  stats: LiveStats;
  errors: LabError[];
  keyMap: Record<string, { hit: number; miss: number }>;
  paperMode: boolean;
  analyzing?: boolean;
  studentName: string;
  mode: string;
  onExportPdf: () => void;
  onCertificate: () => void;
  breakdown?: EvaluationBreakdown;
}

const Stat = ({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) => (
  <div className={`rounded-lg border px-3 py-2 ${accent ? "border-primary/40 bg-primary/5" : "bg-card/50"}`}>
    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    <div className="text-lg font-bold tabular-nums">{value}</div>
  </div>
);

export function ResultBody({ stats, errors, keyMap, paperMode, analyzing, breakdown }: Omit<Props, "open" | "onOpenChange" | "studentName" | "mode" | "onExportPdf" | "onCertificate">) {
  const [fiveInOne] = useFiveInOne();
  const five = fiveInOneWords(stats.charsTyped);
  const { weak, strong } = keyStats(keyMap);
  const minutes = stats.elapsed / 60;
  const fiveWpm = minutes > 0 ? Math.round(five.exact / minutes) : 0;

  const grade =
    stats.accuracy >= 97 && stats.wpm >= 40
      ? "Excellent"
      : stats.accuracy >= 92
        ? "Good"
        : stats.accuracy >= 85
          ? "Average"
          : "Needs practice";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="WPM" value={stats.wpm} accent />
        <Stat label="Accuracy" value={`${Math.round(stats.accuracy)}%`} accent />
        <Stat label="CPM" value={stats.cpm} />
        <Stat label="Time" value={`${Math.round(stats.elapsed)}s`} />
        <Stat label="Characters" value={stats.charsTyped} />
        <Stat label="Correct" value={stats.correctChars} />
        <Stat label="Wrong" value={stats.wrongChars} />
        <Stat label="Words" value={stats.wordsTyped} />
        <Stat label="Keystrokes" value={stats.keystrokes} />
        <Stat label="Backspaces" value={stats.backspaces} />
        <Stat label="Consistency" value={`${stats.consistency}%`} />
        <Stat label="Rhythm" value={`${stats.rhythm}%`} />
      </div>

      {fiveInOne && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
          <p className="mb-2 text-sm font-semibold">Exam word count (5-in-1)</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <Stat label="Words (5 chars = 1)" value={five.words} />
            <Stat label="Remaining chars" value={five.remainder} />
            <Stat label="Exam WPM" value={fiveWpm} />
          </div>
        </div>
      )}

      <div className="rounded-lg border p-3">
        <p className="text-sm">
          <span className="font-semibold">Result:</span> {grade}
          {paperMode && <span className="ml-2 text-xs text-muted-foreground">(Paper Mode — AI spelling &amp; grammar accuracy)</span>}
        </p>
      </div>

      {breakdown && (
        <div className="rounded-lg border p-3" aria-label="Accuracy breakdown">
          <p className="mb-2 text-sm font-semibold">Accuracy breakdown</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat label="Correct words" value={breakdown.correctWords} accent />
            <Stat label="Spelling" value={breakdown.spellingErrors} />
            <Stat label="Extra spaces" value={breakdown.extraSpaces} />
            <Stat label="Missing chars" value={breakdown.missingCharacters} />
            <Stat label="Extra chars" value={breakdown.extraCharacters} />
            <Stat label="Missing words" value={breakdown.omittedWords} />
            <Stat label="Extra words" value={breakdown.extraWords} />
          </div>
        </div>
      )}

      <div className="rounded-lg border p-3">
        <p className="mb-1 text-sm font-semibold">Keyboard heatmap summary</p>
        <p className="text-xs text-destructive">
          Weak keys: {weak.length ? weak.map((w) => `${w.key} (${Math.round(w.acc * 100)}%)`).join(", ") : "—"}
        </p>
        <p className="text-xs text-success">
          Strong keys: {strong.length ? strong.map((w) => `${w.key} (${Math.round(w.acc * 100)}%)`).join(", ") : "—"}
        </p>
      </div>

      <div className="rounded-lg border p-3">
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
          Mistakes {analyzing && <Loader2 className="h-3 w-3 animate-spin" />}
          <span className="text-xs font-normal text-muted-foreground">({errors.length} found)</span>
        </p>
        {errors.length === 0 ? (
          <p className="text-xs text-muted-foreground">{analyzing ? "AI is analysing your text…" : "No mistakes detected."}</p>
        ) : (
          <ul className="space-y-1 text-xs">
            {errors.slice(0, 12).map((e, i) => (
              <li key={i} className="rounded border bg-muted/30 px-2 py-1">
                <span className="font-semibold text-destructive">{e.word}</span>
                {e.expected && <span className="text-muted-foreground"> → {e.expected}</span>}
                {e.reason && <span className="block text-muted-foreground">{e.reason}</span>}
                {e.suggestion && <span className="block text-success">Suggestion: {e.suggestion}</span>}
              </li>
            ))}
            {errors.length > 12 && <li className="text-muted-foreground">+ {errors.length - 12} more in the Errors tab below</li>}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function ResultDialog(props: Props) {
  const { open, onOpenChange, studentName, mode, onExportPdf, onCertificate } = props;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Session report — {mode}</DialogTitle>
          <DialogDescription>
            {studentName || "Guest"} · Close this popup to review the same report in the section below.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[65vh] pr-3 [&_[data-radix-scroll-area-scrollbar]]:hidden">
          <ResultBody {...props} />
        </ScrollArea>
        <div className="flex flex-wrap justify-end gap-2 pt-2">
          <Button size="sm" variant="outline" onClick={onExportPdf}>
            <FileDown className="mr-1 h-3 w-3" /> PDF report
          </Button>
          <Button size="sm" variant="outline" onClick={onCertificate}>
            <Award className="mr-1 h-3 w-3" /> Certificate
          </Button>
          <Button size="sm" onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
