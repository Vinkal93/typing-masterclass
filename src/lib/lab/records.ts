import type { LiveStats } from "./stats";

export interface LabSession {
  id: string;
  student: string;
  date: number;
  mode: string;
  wpm: number;
  accuracy: number;
  errors: number;
  duration: number;
  consistency: number;
  words: number;
}

const KEY = "lab.sessions.v1";

export function loadSessions(): LabSession[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as LabSession[];
  } catch {
    return [];
  }
}

export function saveSession(stats: LiveStats, mode: string, student: string): LabSession {
  const s: LabSession = {
    id: `${Date.now()}`,
    student: student || "Guest",
    date: Date.now(),
    mode,
    wpm: stats.wpm,
    accuracy: Math.round(stats.accuracy),
    errors: stats.wrongChars,
    duration: Math.round(stats.elapsed),
    consistency: stats.consistency,
    words: stats.wordsTyped,
  };
  const all = [s, ...loadSessions()].slice(0, 300);
  localStorage.setItem(KEY, JSON.stringify(all));
  return s;
}

export function clearSessions() {
  localStorage.removeItem(KEY);
}

export function leaderboard(sessions: LabSession[]) {
  const map = new Map<string, { student: string; best: number; avgAcc: number; tests: number; totalWords: number }>();
  sessions.forEach((s) => {
    const e = map.get(s.student) || { student: s.student, best: 0, avgAcc: 0, tests: 0, totalWords: 0 };
    e.best = Math.max(e.best, s.wpm);
    e.avgAcc = (e.avgAcc * e.tests + s.accuracy) / (e.tests + 1);
    e.tests += 1;
    e.totalWords += s.words;
    map.set(s.student, e);
  });
  return [...map.values()].sort((a, b) => b.best - a.best);
}
