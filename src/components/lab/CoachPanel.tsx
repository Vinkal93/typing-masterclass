import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Loader2, Sparkles } from "lucide-react";
import type { CoachReport } from "@/lib/lab/settings";

interface Props {
  report: CoachReport | null;
  loading: boolean;
  onGenerate: () => void;
}

const Score = ({ label, value }: { label: string; value: number }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold tabular-nums">{Math.round(value)}%</span>
    </div>
    <Progress value={value} className="h-1.5" />
  </div>
);

export default function CoachPanel({ report, loading, onGenerate }: Props) {
  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center gap-2">
        <Brain className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">AI Typing Coach</h3>
        <Button size="sm" className="ml-auto" onClick={onGenerate} disabled={loading}>
          {loading ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Sparkles className="mr-1 h-3 w-3" />}
          Generate report
        </Button>
      </div>

      {!report ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          Finish a session and generate a personalised coaching report with strengths, weaknesses and a practice plan.
        </p>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4 rounded-lg border bg-card/50 p-3">
            <div className="text-center">
              <div className="text-3xl font-black text-primary tabular-nums">{Math.round(report.overallScore)}</div>
              <div className="text-[10px] uppercase text-muted-foreground">Overall</div>
            </div>
            <div className="flex-1 space-y-2">
              <Score label="Typing" value={report.typingScore} />
              <Score label="Grammar" value={report.grammarScore} />
              <Score label="Readability" value={report.readability} />
              <Score label="Sentence quality" value={report.sentenceQuality} />
              <Score label="Professional writing" value={report.professionalScore} />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { t: "Weak keys", v: report.weakKeys },
              { t: "Weak words", v: report.weakWords },
              { t: "Grammar topics", v: report.weakGrammarTopics },
            ].map((g) => (
              <div key={g.t}>
                <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">{g.t}</p>
                <div className="flex flex-wrap gap-1">
                  {(g.v || []).length ? g.v.map((x) => <Badge key={x} variant="secondary">{x}</Badge>) : <span className="text-xs text-muted-foreground">—</span>}
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">Suggestions</p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-foreground/85">
              {(report.suggestions || []).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-lg border bg-primary/5 p-3 text-sm">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Daily practice plan</p>
              <p>{report.dailyPractice}</p>
            </div>
            <div className="rounded-lg border bg-success/5 p-3 text-sm">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Estimated improvement time</p>
              <p>{report.estimatedImprovementTime}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
