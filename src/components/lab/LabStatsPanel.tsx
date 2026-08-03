import { Card } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { LiveStats } from "@/lib/lab/stats";
import { keyStats } from "@/lib/lab/stats";

interface Props {
  stats: LiveStats;
  samples: { t: number; wpm: number; errors: number }[];
  keyMap: Record<string, { hit: number; miss: number }>;
}

const ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

const Metric = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-lg border bg-card/50 px-3 py-2">
    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    <div className="text-lg font-bold tabular-nums">{value}</div>
  </div>
);

export default function LabStatsPanel({ stats, samples, keyMap }: Props) {
  const { weak, strong } = keyStats(keyMap);
  const heat = (k: string) => {
    const v = keyMap[k];
    if (!v || v.hit + v.miss === 0) return "bg-muted/40 text-muted-foreground";
    const acc = v.hit / (v.hit + v.miss);
    if (acc > 0.97) return "bg-success/70 text-success-foreground";
    if (acc > 0.9) return "bg-success/40";
    if (acc > 0.8) return "bg-amber-500/50";
    return "bg-destructive/70 text-destructive-foreground";
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Metric label="Elapsed" value={`${Math.round(stats.elapsed)}s`} />
        <Metric label="Remaining" value={`${Math.max(0, Math.round(stats.remaining))}s`} />
        <Metric label="WPM" value={stats.wpm} />
        <Metric label="CPM" value={stats.cpm} />
        <Metric label="Accuracy" value={`${Math.round(stats.accuracy)}%`} />
        <Metric label="Characters" value={stats.charsTyped} />
        <Metric label="Correct" value={stats.correctChars} />
        <Metric label="Wrong" value={stats.wrongChars} />
        <Metric label="Words" value={stats.wordsTyped} />
        <Metric label="Sentences" value={stats.sentences} />
        <Metric label="Paragraphs" value={stats.paragraphs} />
        <Metric label="Backspaces" value={stats.backspaces} />
        <Metric label="Keystrokes" value={stats.keystrokes} />
        <Metric label="Idle Time" value={`${Math.round(stats.idleTime)}s`} />
        <Metric label="Consistency" value={`${stats.consistency}%`} />
        <Metric label="Rhythm" value={`${stats.rhythm}%`} />
      </div>

      <Card className="p-3">
        <h4 className="mb-2 text-sm font-semibold">Typing speed & mistake trend</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={samples}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="t" tick={{ fontSize: 10 }} unit="s" />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }} />
              <Line type="monotone" dataKey="wpm" stroke="hsl(var(--primary))" dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey="errors" stroke="hsl(var(--destructive))" dot={false} strokeWidth={1.5} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-3">
        <h4 className="mb-3 text-sm font-semibold">Keyboard heatmap</h4>
        <div className="space-y-1">
          {ROWS.map((row, i) => (
            <div key={i} className="flex justify-center gap-1" style={{ paddingLeft: i * 14 }}>
              {row.split("").map((k) => (
                <div
                  key={k}
                  className={`flex h-8 w-8 items-center justify-center rounded text-xs font-semibold uppercase ${heat(k)}`}
                  title={`${k}: ${keyMap[k]?.hit ?? 0} correct / ${keyMap[k]?.miss ?? 0} wrong`}
                >
                  {k}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold text-destructive">Weak keys</p>
            <p className="text-xs text-muted-foreground">
              {weak.length ? weak.map((w) => `${w.key} (${Math.round(w.acc * 100)}%)`).join(", ") : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-success">Strong keys</p>
            <p className="text-xs text-muted-foreground">
              {strong.length ? strong.map((w) => `${w.key} (${Math.round(w.acc * 100)}%)`).join(", ") : "—"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
