export type PanelPosition = "left" | "right" | "floating" | "hidden";
export type CursorStyle = "thin" | "block" | "underline" | "animated";
export type TimerMode = "countup" | "countdown" | "unlimited";
export type BackspaceMode = "unlimited" | "disabled" | "word" | "line" | "competition";
export type PaperSize = "a4" | "letter" | "wide";
export type ThemeMode = "light" | "dark" | "system";

export interface LabSettings {
  timerEnabled: boolean;
  timerMode: TimerMode;
  durationMin: number;
  backspace: BackspaceMode;
  cursor: CursorStyle;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  paperSize: PaperSize;
  theme: ThemeMode;
  focusMode: boolean;
  autoSave: boolean;
  autoBackup: boolean;
  aiAnalysis: boolean;
}

export interface LabLayout {
  panel: PanelPosition;
  panelWidth: number;
  collapsed: boolean;
  floatPos: { x: number; y: number };
  zoom: number;
}

export interface LabError {
  word: string;
  expected: string;
  reason: string;
  suggestion: string;
  type: string;
}

export interface CoachReport {
  overallScore: number;
  typingScore: number;
  grammarScore: number;
  readability: number;
  sentenceQuality: number;
  professionalScore: number;
  weakKeys: string[];
  weakWords: string[];
  weakGrammarTopics: string[];
  suggestions: string[];
  dailyPractice: string;
  estimatedImprovementTime: string;
}

export const DEFAULT_SETTINGS: LabSettings = {
  timerEnabled: true,
  timerMode: "countup",
  durationMin: 10,
  backspace: "unlimited",
  cursor: "thin",
  fontFamily: "Roboto",
  fontSize: 18,
  lineHeight: 1.9,
  paperSize: "a4",
  theme: "system",
  focusMode: false,
  autoSave: true,
  autoBackup: true,
  aiAnalysis: true,
};

export const DEFAULT_LAYOUT: LabLayout = {
  panel: "right",
  panelWidth: 460,
  collapsed: false,
  floatPos: { x: 80, y: 120 },
  zoom: 100,
};

const S_KEY = "lab.settings.v1";
const L_KEY = "lab.layout.v1";
const D_KEY = "lab.draft.v1";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) } as T;
  } catch {
    return fallback;
  }
}

export const loadSettings = () => read<LabSettings>(S_KEY, DEFAULT_SETTINGS);
export const saveSettings = (s: LabSettings) => localStorage.setItem(S_KEY, JSON.stringify(s));
export const loadLayout = () => read<LabLayout>(L_KEY, DEFAULT_LAYOUT);
export const saveLayout = (l: LabLayout) => localStorage.setItem(L_KEY, JSON.stringify(l));

export interface LabDraft {
  typed: string;
  reference: string;
  savedAt: number;
}
export const loadDraft = (): LabDraft | null => {
  try {
    const raw = localStorage.getItem(D_KEY);
    return raw ? (JSON.parse(raw) as LabDraft) : null;
  } catch {
    return null;
  }
};
export const saveDraft = (d: LabDraft) => {
  localStorage.setItem(D_KEY, JSON.stringify(d));
  localStorage.setItem(D_KEY + ".backup." + new Date().toISOString().slice(0, 10), JSON.stringify(d));
};

export const FONT_OPTIONS = [
  "Arial",
  "Calibri",
  "Roboto",
  "Courier New",
  "Times New Roman",
  "Mangal",
  "Kruti Dev 010",
  "Noto Sans",
];

export const PRACTICE_MODES = [
  "Free Practice",
  "Exam Mode",
  "Blind Typing",
  "PDF Typing",
  "Office Typing",
  "Government Typing",
  "Coding Practice",
  "Speed Test",
  "Accuracy Test",
  "AI Challenge",
  "Custom Practice",
] as const;
export type PracticeMode = (typeof PRACTICE_MODES)[number];
