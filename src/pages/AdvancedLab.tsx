import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FileDown, FileSpreadsheet, Award, Printer, FlaskConical } from "lucide-react";
import { toast } from "sonner";

import LabToolbar from "@/components/lab/LabToolbar";
import LabEditor from "@/components/lab/LabEditor";
import ReferencePanel from "@/components/lab/ReferencePanel";
import LabSettingsDialog from "@/components/lab/LabSettingsDialog";
import LabStatsPanel from "@/components/lab/LabStatsPanel";
import ErrorPanel from "@/components/lab/ErrorPanel";
import CoachPanel from "@/components/lab/CoachPanel";
import TeacherPanel from "@/components/lab/TeacherPanel";

import {
  DEFAULT_LAYOUT,
  DEFAULT_SETTINGS,
  PRACTICE_MODES,
  loadDraft,
  loadLayout,
  loadSettings,
  saveDraft,
  saveLayout,
  saveSettings,
  type CoachReport,
  type LabError,
  type LabSettings,
  type PanelPosition,
} from "@/lib/lab/settings";
import {
  EMPTY_STATS,
  charAccuracy,
  compareWords,
  consistencyFrom,
  countStructures,
  keyStats,
  rhythmFrom,
  type LiveStats,
} from "@/lib/lab/stats";
import { aiAnalyze, aiCoach, aiPaperCheck } from "@/lib/lab/aiClient";
import { exportCertificate, exportCsv, exportExcel, exportPdfReport, printReport } from "@/lib/lab/exporters";
import { saveSession } from "@/lib/lab/records";
import { randomParagraph } from "@/lib/lab/paragraphs";
import { splitPages } from "@/lib/lab/importers";

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export default function AdvancedLab() {
  const [settings, setSettings] = useState<LabSettings>(() => loadSettings() || DEFAULT_SETTINGS);
  const [layout, setLayout] = useState(() => loadLayout() || DEFAULT_LAYOUT);
  const [mode, setMode] = useState<string>("Free Practice");
  const [studentName, setStudentName] = useState(() => localStorage.getItem("lab.student") || "");

  const [pages, setPages] = useState<string[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [docName, setDocName] = useState("");
  const reference = pages[pageIndex] || "";

  const [typed, setTyped] = useState("");
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [stats, setStats] = useState<LiveStats>(EMPTY_STATS);
  const [samples, setSamples] = useState<{ t: number; wpm: number; errors: number }[]>([]);
  const [keyMap, setKeyMap] = useState<Record<string, { hit: number; miss: number }>>({});
  const [errors, setErrors] = useState<LabError[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<CoachReport | null>(null);
  const [coaching, setCoaching] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const startRef = useRef<number | null>(null);
  const pausedMsRef = useRef(0);
  const pauseStartRef = useRef<number | null>(null);
  const lastKeyRef = useRef<number>(0);
  const intervalsRef = useRef<number[]>([]);
  const idleRef = useRef(0);
  const backspacesRef = useRef(0);
  const keystrokesRef = useRef(0);
  const typedRef = useRef("");
  const dragRef = useRef<{ dx: number; dy: number } | null>(null);

  // Paper mode: no on-screen reference — user types from a printed page, AI grades spelling/grammar.
  const paperMode = layout.panel === "hidden";
  const [paperAccuracy, setPaperAccuracy] = useState<number | null>(null);
  const [paperChecking, setPaperChecking] = useState(false);
  const paperModeRef = useRef(paperMode);
  const paperAccuracyRef = useRef<number | null>(null);
  paperModeRef.current = paperMode;
  paperAccuracyRef.current = paperAccuracy;

  typedRef.current = typed;


  useEffect(() => saveSettings(settings), [settings]);
  useEffect(() => saveLayout(layout), [layout]);
  useEffect(() => localStorage.setItem("lab.student", studentName), [studentName]);

  const patch = (p: Partial<LabSettings>) => setSettings((s) => ({ ...s, ...p }));

  // Load a starter paragraph + restore draft
  useEffect(() => {
    const draft = loadDraft();
    if (draft?.reference) {
      setPages(splitPages(draft.reference));
      setDocName("Restored draft");
      setTyped(draft.typed);
    } else {
      setPages(splitPages(randomParagraph("Medium")));
      setDocName("Medium paragraph");
    }
  }, []);

  // Autosave
  useEffect(() => {
    if (!settings.autoSave) return;
    const id = setInterval(() => {
      if (typedRef.current) saveDraft({ typed: typedRef.current, reference, savedAt: Date.now() });
    }, 8000);
    return () => clearInterval(id);
  }, [settings.autoSave, reference]);

  const recompute = useCallback(() => {
    const now = Date.now();
    const start = startRef.current;
    const elapsed = start ? (now - start - pausedMsRef.current) / 1000 : 0;
    const minutes = elapsed / 60;
    const chars = typedRef.current.length;
    const ca = charAccuracy(reference, typedRef.current);
    const cw = compareWords(reference, typedRef.current);
    const struct = countStructures(typedRef.current);
    const paper = paperModeRef.current;
    const paperAcc = paperAccuracyRef.current;
    const typedWords = typedRef.current.trim().split(/\s+/).filter(Boolean).length;
    const wpm = minutes > 0 ? Math.round((paper ? typedWords : cw.correctWords) / minutes) : 0;
    const cpm = minutes > 0 ? Math.round((paper ? chars : ca.correct) / minutes) : 0;
    const total = settings.durationMin * 60;
    const wpmSamples = samples.map((s) => s.wpm).concat(wpm);
    return {
      elapsed,
      remaining: settings.timerMode === "countdown" ? Math.max(0, total - elapsed) : 0,
      wpm,
      cpm,
      accuracy: paper ? (paperAcc ?? 100) : ca.accuracy,
      charsTyped: chars,
      correctChars: paper ? chars : ca.correct,
      wrongChars: paper ? 0 : ca.wrong,
      wordsTyped: paper ? typedWords : cw.totalTypedWords,
      sentences: struct.sentences,
      paragraphs: struct.paragraphs,
      backspaces: backspacesRef.current,
      keystrokes: keystrokesRef.current,
      idleTime: idleRef.current,
      consistency: consistencyFrom(wpmSamples),
      rhythm: rhythmFrom(intervalsRef.current),
    } as LiveStats;
  }, [reference, samples, settings.durationMin, settings.timerMode]);


  // Ticker
  useEffect(() => {
    if (!running || paused || finished) return;
    const id = setInterval(() => {
      const s = recompute();
      setStats(s);
      setSamples((prev) => [...prev, { t: Math.round(s.elapsed), wpm: s.wpm, errors: s.wrongChars }].slice(-400));
      if (settings.timerEnabled && settings.timerMode === "countdown" && s.remaining <= 0) finish(s);
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, paused, finished, recompute, settings.timerEnabled, settings.timerMode]);

  const finish = useCallback(
    (final?: LiveStats) => {
      const s = final || recompute();
      setStats(s);
      setRunning(false);
      setFinished(true);
      saveSession(s, mode, studentName || "Guest");
      setSessionKey((k) => k + 1);
      toast.success(`Session complete — ${s.wpm} WPM at ${Math.round(s.accuracy)}% accuracy`);
      if (!(settings.aiAnalysis && typedRef.current.trim().length > 30)) return;

      if (paperModeRef.current) {
        // No reference on screen — grade purely on spelling/grammar quality.
        setPaperChecking(true);
        setAnalyzing(true);
        aiPaperCheck(typedRef.current).then(({ data, error }) => {
          setPaperChecking(false);
          setAnalyzing(false);
          if (error || !data) {
            toast.error(error?.includes("429") ? "AI rate limit reached" : error?.includes("402") ? "AI credits exhausted" : "AI paper check failed");
            return;
          }
          setErrors(data.errors || []);
          const acc = Math.max(0, Math.min(100, Number(data.accuracy) || 0));
          setPaperAccuracy(acc);
          paperAccuracyRef.current = acc;
          setStats((prev) => ({ ...prev, accuracy: acc, wrongChars: 0 }));
          toast.success(`AI paper accuracy: ${acc.toFixed(1)}% (${data.wrongWords ?? 0} issues)`);
        });
        return;
      }

      setAnalyzing(true);
      aiAnalyze(reference, typedRef.current).then(({ data, error }) => {
        setAnalyzing(false);
        if (error) {
          toast.error(error.includes("429") ? "AI rate limit reached" : error.includes("402") ? "AI credits exhausted" : "AI analysis failed");
          return;
        }
        setErrors(data?.errors || []);
      });
    },
    [mode, recompute, reference, settings.aiAnalysis, studentName]
  );

  const restart = () => {
    setTyped("");
    setStats(EMPTY_STATS);
    setSamples([]);
    setKeyMap({});
    setErrors([]);
    setReport(null);
    setRunning(false);
    setPaused(false);
    setFinished(false);
    setPaperAccuracy(null);
    paperAccuracyRef.current = null;
    startRef.current = null;
    pausedMsRef.current = 0;
    pauseStartRef.current = null;
    intervalsRef.current = [];
    idleRef.current = 0;
    backspacesRef.current = 0;
    keystrokesRef.current = 0;
    editorRef.current?.focus();
  };


  const setPagesAndReset = (p: string[], name: string) => {
    setPages(p);
    setPageIndex(0);
    setDocName(name);
    restart();
  };

  const togglePause = () => {
    if (!running) return;
    setPaused((p) => {
      if (!p) pauseStartRef.current = Date.now();
      else if (pauseStartRef.current) {
        pausedMsRef.current += Date.now() - pauseStartRef.current;
        pauseStartRef.current = null;
      }
      return !p;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (finished) {
      e.preventDefault();
      return;
    }
    const el = e.currentTarget;
    const isDelete = e.key === "Backspace" || e.key === "Delete";
    if (isDelete) {
      const m = settings.backspace;
      if (m === "disabled" || m === "competition") {
        e.preventDefault();
        return;
      }
      if (m === "word") {
        const before = el.value.slice(0, el.selectionStart);
        if (/\s$/.test(before) || !before.split(/\s+/).pop()) {
          e.preventDefault();
          return;
        }
      }
      if (m === "line") {
        const before = el.value.slice(0, el.selectionStart);
        if (before.endsWith("\n")) {
          e.preventDefault();
          return;
        }
      }
      backspacesRef.current++;
    }

    if (e.key.length === 1 || isDelete) {
      keystrokesRef.current++;
      const now = Date.now();
      if (lastKeyRef.current) {
        const gap = now - lastKeyRef.current;
        if (gap > 3000) idleRef.current += gap / 1000;
        else intervalsRef.current.push(gap);
      }
      lastKeyRef.current = now;
    }

    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      const idx = el.selectionStart;
      const expected = reference[idx];
      if (expected) {
        const k = expected.toLowerCase();
        const hit = e.key === expected;
        setKeyMap((prev) => {
          const cur = prev[k] || { hit: 0, miss: 0 };
          return { ...prev, [k]: { hit: cur.hit + (hit ? 1 : 0), miss: cur.miss + (hit ? 0 : 1) } };
        });
      }
    }

    if (!running && !finished) {
      startRef.current = Date.now();
      setRunning(true);
    }
  };

  const handleChange = (v: string) => {
    if (finished || paused) return;
    setTyped(v);
  };

  // Shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setLayout((l) => ({ ...l, panel: l.panel === "hidden" ? "right" : "hidden" }));
      }
      if (e.altKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        patch({ focusMode: !settings.focusMode });
      }
      if (e.altKey && e.key.toLowerCase() === "r") {
        e.preventDefault();
        restart();
      }
      if (e.key === "Escape") setLayout((l) => ({ ...l, panel: l.panel === "hidden" ? "right" : l.panel }));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.focusMode]);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen().catch(() => {});
      setFullscreen(true);
    } else {
      await document.exitFullscreen().catch(() => {});
      setFullscreen(false);
    }
  };

  const generateCoach = async () => {
    setCoaching(true);
    const { weak } = keyStats(keyMap);
    const { data, error } = await aiCoach(stats, errors, weak.map((w) => w.key));
    setCoaching(false);
    if (error || !data) {
      toast.error(error?.includes("429") ? "AI rate limit reached" : error?.includes("402") ? "AI credits exhausted" : "Coach report failed");
      return;
    }
    setReport(data);
  };

  const progress = useMemo(() => {
    if (settings.timerEnabled && settings.timerMode === "countdown") {
      const total = settings.durationMin * 60;
      return Math.min(100, (stats.elapsed / total) * 100);
    }
    if (paperMode) return Math.min(100, (typed.trim().split(/\s+/).filter(Boolean).length / 300) * 100);
    return reference ? Math.min(100, (typed.length / reference.length) * 100) : 0;
  }, [settings, stats.elapsed, typed, reference, paperMode]);


  const timerLabel = settings.timerEnabled
    ? settings.timerMode === "countdown"
      ? fmt(stats.remaining)
      : fmt(stats.elapsed)
    : "∞";

  const startFloatDrag = (e: React.PointerEvent) => {
    dragRef.current = { dx: e.clientX - layout.floatPos.x, dy: e.clientY - layout.floatPos.y };
    const move = (ev: PointerEvent) => {
      if (!dragRef.current) return;
      setLayout((l) => ({
        ...l,
        floatPos: {
          x: Math.max(0, Math.min(window.innerWidth - 320, ev.clientX - dragRef.current!.dx)),
          y: Math.max(0, Math.min(window.innerHeight - 120, ev.clientY - dragRef.current!.dy)),
        },
      }));
    };
    const up = () => {
      dragRef.current = null;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const panelNode = (
    <ReferencePanel
      pages={pages}
      pageIndex={pageIndex}
      zoom={layout.zoom}
      docName={docName}
      onSetPages={setPagesAndReset}
      onPageChange={setPageIndex}
      onZoom={(z) => setLayout((l) => ({ ...l, zoom: z }))}
      onClose={() => setLayout((l) => ({ ...l, panel: "hidden" }))}
      floating={layout.panel === "floating"}
      onDragStart={startFloatDrag}
    />
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Advanced Typing Lab — AI Typing Practice & Analysis"
        description="Professional AI typing laboratory: A4 editor, PDF/DOCX/OCR practice, live WPM, heatmaps, AI error analysis, coach reports and certificates."
        keywords="advanced typing lab, ai typing practice, typing analysis, pdf typing practice"
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Advanced Lab", path: "/advanced-lab" }]}
      />
      {!settings.focusMode && <Navbar />}

      <main className="flex-1">
        <LabToolbar
          stats={stats}
          progress={progress}
          running={running}
          paused={paused}
          timerLabel={timerLabel}
          fullscreen={fullscreen}
          onPause={togglePause}
          onRestart={restart}
          onFinish={() => finish()}
          onFullscreen={toggleFullscreen}
          onSettings={() => setSettingsOpen(true)}
          onTogglePanel={() => setLayout((l) => ({ ...l, panel: l.panel === "hidden" ? "right" : "hidden" }))}
          onToggleFocus={() => patch({ focusMode: !settings.focusMode })}
        />

        {!settings.focusMode && (
          <div className="flex flex-wrap items-center gap-2 border-b bg-card/40 px-3 py-2">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Advanced Typing Lab</span>
            </div>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger className="h-8 w-[180px]"><SelectValue /></SelectTrigger>
              <SelectContent className="z-50 bg-popover">
                {PRACTICE_MODES.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Your name (for reports)"
              className="h-8 w-[190px]"
            />
            <Button
              size="sm"
              variant={paperMode ? "default" : "outline"}
              className="h-8"
              onClick={() => setLayout((l) => ({ ...l, panel: l.panel === "hidden" ? "right" : "hidden" }))}
              title="Hide the reference panel to type from a printed page — AI grades spelling & grammar"
            >
              <BookOpenCheck className="mr-1 h-3 w-3" />
              {paperMode ? "Paper Mode ON" : "Paper Mode"}
            </Button>
            {paperMode && (
              <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs text-primary">
                {paperChecking
                  ? "AI checking..."
                  : paperAccuracy !== null
                    ? `AI accuracy ${paperAccuracy.toFixed(1)}%`
                    : "AI spell & grammar accuracy on finish"}
              </span>
            )}

            <div className="ml-auto flex flex-wrap gap-1">
              <Button size="sm" variant="outline" onClick={() => exportPdfReport(stats, errors, report, studentName || "Guest")}>
                <FileDown className="mr-1 h-3 w-3" /> PDF
              </Button>
              <Button size="sm" variant="outline" onClick={() => exportExcel(stats, errors)}>
                <FileSpreadsheet className="mr-1 h-3 w-3" /> Excel
              </Button>
              <Button size="sm" variant="outline" onClick={() => exportCsv(stats, errors)}>CSV</Button>
              <Button size="sm" variant="outline" onClick={() => exportCertificate(stats, studentName || "Guest")}>
                <Award className="mr-1 h-3 w-3" /> Certificate
              </Button>
              <Button size="sm" variant="ghost" onClick={printReport}>
                <Printer className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        <div className={`flex w-full gap-3 px-2 lg:px-4 ${layout.panel === "left" ? "flex-row-reverse" : "flex-row"}`}>
          <div className="min-w-0 flex-1">
            <LabEditor
              ref={editorRef}
              value={typed}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              settings={settings}
              blind={mode === "Blind Typing"}
              disabled={finished}
            />
          </div>

          {(layout.panel === "left" || layout.panel === "right") && (
            <aside className="hidden shrink-0 py-6 lg:block" style={{ width: layout.panelWidth }}>
              <div className="sticky top-24 h-[calc(100vh-8rem)]">{panelNode}</div>
            </aside>
          )}
        </div>

        {/* Mobile / floating panel */}
        {layout.panel !== "hidden" && (
          <div className="px-2 pb-4 lg:hidden">
            <div className="h-[420px]">{panelNode}</div>
          </div>
        )}
        {layout.panel === "floating" && (
          <div
            className="fixed z-40 hidden h-[440px] w-[380px] lg:block"
            style={{ left: layout.floatPos.x, top: layout.floatPos.y }}
          >
            {panelNode}
          </div>
        )}

        {!settings.focusMode && (
          <section className="container mx-auto px-3 pb-10">
            <Tabs defaultValue="stats">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="stats">Statistics</TabsTrigger>
                <TabsTrigger value="errors">Errors</TabsTrigger>
                <TabsTrigger value="coach">AI Coach</TabsTrigger>
                <TabsTrigger value="teacher">Teacher</TabsTrigger>
              </TabsList>
              <TabsContent value="stats" className="mt-4">
                <LabStatsPanel stats={stats} samples={samples} keyMap={keyMap} />
              </TabsContent>
              <TabsContent value="errors" className="mt-4">
                <ErrorPanel errors={errors} analyzing={analyzing} />
              </TabsContent>
              <TabsContent value="coach" className="mt-4">
                <CoachPanel report={report} loading={coaching} onGenerate={generateCoach} />
              </TabsContent>
              <TabsContent value="teacher" className="mt-4">
                <TeacherPanel refreshKey={sessionKey} />
              </TabsContent>
            </Tabs>

            <Card className="mt-6 p-4 text-sm text-muted-foreground">
              <strong className="text-foreground">Shortcuts:</strong> Alt+P toggle panel · Alt+F focus mode · Alt+R restart · F11 fullscreen
            </Card>
          </section>
        )}
      </main>

      <LabSettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        settings={settings}
        onChange={patch}
        panel={layout.panel}
        onPanelChange={(p: PanelPosition) => setLayout((l) => ({ ...l, panel: p }))}
      />

      {!settings.focusMode && <Footer />}
    </div>
  );
}
