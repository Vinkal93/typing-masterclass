import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Loader2 } from "lucide-react";
import type { LabError } from "@/lib/lab/settings";

interface Props {
  errors: LabError[];
  analyzing: boolean;
}

const typeTone: Record<string, string> = {
  grammar: "bg-destructive/10 text-destructive border-destructive/30",
  spelling: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  capitalization: "bg-primary/10 text-primary border-primary/30",
  spacing: "bg-muted text-muted-foreground",
  punctuation: "bg-accent text-accent-foreground",
};

export default function ErrorPanel({ errors, analyzing }: Props) {
  const grouped = errors.reduce<Record<string, LabError[]>>((acc, e) => {
    const k = e.type || "other";
    (acc[k] ||= []).push(e);
    return acc;
  }, {});

  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-500" />
        <h3 className="text-sm font-semibold">Error Panel</h3>
        {analyzing && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
        <Badge variant="secondary" className="ml-auto">{errors.length} found</Badge>
      </div>

      {!errors.length ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          {analyzing ? "Analyzing your text..." : "No issues detected yet. Keep typing — analysis runs quietly in the background."}
        </p>
      ) : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([type, list]) => (
            <div key={type}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {type} ({list.length})
              </p>
              <div className="space-y-2">
                {list.map((e, i) => (
                  <div key={i} className={`rounded-lg border p-2 text-sm ${typeTone[type] || "bg-card"}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded bg-destructive/15 px-1.5 py-0.5 font-mono text-destructive line-through">
                        {e.word || "—"}
                      </span>
                      <span className="text-muted-foreground">→</span>
                      <span className="rounded bg-success/15 px-1.5 py-0.5 font-mono text-success">{e.expected || "—"}</span>
                    </div>
                    {e.reason && <p className="mt-1 text-xs text-foreground/80"><strong>Reason:</strong> {e.reason}</p>}
                    {e.suggestion && <p className="text-xs text-foreground/70"><strong>Suggestion:</strong> {e.suggestion}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
