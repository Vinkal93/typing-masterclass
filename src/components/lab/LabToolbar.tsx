import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  RotateCcw,
  Flag,
  Maximize,
  Minimize,
  Settings as SettingsIcon,
  PanelRight,
  Focus,
} from "lucide-react";
import type { LiveStats } from "@/lib/lab/stats";

interface Props {
  stats: LiveStats;
  progress: number;
  running: boolean;
  paused: boolean;
  timerLabel: string;
  fullscreen: boolean;
  onPause: () => void;
  onRestart: () => void;
  onFinish: () => void;
  onFullscreen: () => void;
  onSettings: () => void;
  onTogglePanel: () => void;
  onToggleFocus: () => void;
}

const Stat = ({ label, value, tone }: { label: string; value: string | number; tone?: string }) => (
  <div className="px-3 py-1 text-center min-w-[64px]">
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className={`text-base font-bold tabular-nums ${tone ?? "text-foreground"}`}>{value}</div>
  </div>
);

export default function LabToolbar({
  stats,
  progress,
  running,
  paused,
  timerLabel,
  fullscreen,
  onPause,
  onRestart,
  onFinish,
  onFullscreen,
  onSettings,
  onTogglePanel,
  onToggleFocus,
}: Props) {
  return (
    <div className="sticky top-0 z-30 border-b bg-card/85 backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-1 px-3 py-2">
        <div className="flex items-center divide-x divide-border/60 rounded-lg border bg-background/60 mr-auto overflow-x-auto">
          <Stat label="Timer" value={timerLabel} tone="text-primary" />
          <Stat label="WPM" value={stats.wpm} tone="text-primary" />
          <Stat label="CPM" value={stats.cpm} />
          <Stat label="Acc" value={`${Math.round(stats.accuracy)}%`} tone="text-success" />
          <Stat label="Errors" value={stats.wrongChars} tone="text-destructive" />
          <Stat label="Chars" value={stats.charsTyped} />
        </div>

        <div className="flex items-center gap-1">
          <Button size="sm" variant={paused ? "default" : "outline"} onClick={onPause} disabled={!running}>
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            <span className="ml-1 hidden sm:inline">{paused ? "Resume" : "Pause"}</span>
          </Button>
          <Button size="sm" variant="outline" onClick={onRestart}>
            <RotateCcw className="h-4 w-4" />
            <span className="ml-1 hidden sm:inline">Restart</span>
          </Button>
          <Button size="sm" onClick={onFinish}>
            <Flag className="h-4 w-4" />
            <span className="ml-1 hidden sm:inline">Finish</span>
          </Button>
          <Button size="icon" variant="ghost" onClick={onTogglePanel} title="Toggle panel (Alt+P)">
            <PanelRight className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={onToggleFocus} title="Focus mode (Alt+F)">
            <Focus className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={onFullscreen} title="Fullscreen (F11)">
            {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
          <Button size="icon" variant="ghost" onClick={onSettings} title="Settings">
            <SettingsIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Progress value={progress} className="h-1 rounded-none" />
    </div>
  );
}
