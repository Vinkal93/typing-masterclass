export interface LiveStats {
  elapsed: number;
  remaining: number;
  wpm: number;
  cpm: number;
  accuracy: number;
  charsTyped: number;
  correctChars: number;
  wrongChars: number;
  wordsTyped: number;
  sentences: number;
  paragraphs: number;
  backspaces: number;
  keystrokes: number;
  idleTime: number;
  consistency: number;
  rhythm: number;
}

export const EMPTY_STATS: LiveStats = {
  elapsed: 0,
  remaining: 0,
  wpm: 0,
  cpm: 0,
  accuracy: 100,
  charsTyped: 0,
  correctChars: 0,
  wrongChars: 0,
  wordsTyped: 0,
  sentences: 0,
  paragraphs: 0,
  backspaces: 0,
  keystrokes: 0,
  idleTime: 0,
  consistency: 100,
  rhythm: 0,
};

/** Word-level comparison that tolerates insertions/deletions (LCS based). */
export function compareWords(reference: string, typed: string) {
  const ref = reference.trim().split(/\s+/).filter(Boolean);
  const typ = typed.trim().split(/\s+/).filter(Boolean);
  const n = ref.length;
  const m = typ.length;
  const cap = 1200;
  const R = ref.slice(0, cap);
  const T = typ.slice(0, cap);
  const dp: number[][] = Array.from({ length: R.length + 1 }, () => new Array(T.length + 1).fill(0));
  for (let i = R.length - 1; i >= 0; i--) {
    for (let j = T.length - 1; j >= 0; j--) {
      dp[i][j] = R[i] === T[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  let i = 0;
  let j = 0;
  let correct = 0;
  const wrong: { index: number; typed: string; expected: string }[] = [];
  while (i < R.length && j < T.length) {
    if (R[i] === T[j]) {
      correct++;
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      wrong.push({ index: j, typed: T[j] ?? "", expected: R[i] });
      i++;
      if (j < T.length) j++;
    } else {
      wrong.push({ index: j, typed: T[j], expected: R[i] ?? "" });
      j++;
    }
  }
  while (j < T.length) wrong.push({ index: j, typed: T[j++], expected: "" });
  return { correctWords: correct, wrongWords: wrong, totalRefWords: n, totalTypedWords: m };
}

export function charAccuracy(reference: string, typed: string) {
  let correct = 0;
  const len = typed.length;
  for (let i = 0; i < len; i++) if (typed[i] === reference[i]) correct++;
  return { correct, wrong: len - correct, accuracy: len ? (correct / len) * 100 : 100 };
}

export function countStructures(text: string) {
  const sentences = (text.match(/[^.!?।]+[.!?।]/g) || []).length;
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length).length;
  return { sentences, paragraphs };
}

/** consistency = 100 - normalized std deviation of per-second wpm samples */
export function consistencyFrom(samples: number[]) {
  if (samples.length < 3) return 100;
  const mean = samples.reduce((a, b) => a + b, 0) / samples.length;
  if (!mean) return 100;
  const variance = samples.reduce((a, b) => a + (b - mean) ** 2, 0) / samples.length;
  const cv = Math.sqrt(variance) / mean;
  return Math.max(0, Math.min(100, Math.round((1 - cv) * 100)));
}

/** rhythm score from inter-keystroke intervals (lower deviation = better rhythm) */
export function rhythmFrom(intervals: number[]) {
  if (intervals.length < 5) return 0;
  const recent = intervals.slice(-200);
  const mean = recent.reduce((a, b) => a + b, 0) / recent.length;
  const variance = recent.reduce((a, b) => a + (b - mean) ** 2, 0) / recent.length;
  const cv = Math.sqrt(variance) / (mean || 1);
  return Math.max(0, Math.min(100, Math.round((1 - Math.min(cv, 1)) * 100)));
}

export function keyStats(keyMap: Record<string, { hit: number; miss: number }>) {
  const entries = Object.entries(keyMap).filter(([, v]) => v.hit + v.miss >= 3);
  const scored = entries.map(([k, v]) => ({ key: k, total: v.hit + v.miss, acc: v.hit / (v.hit + v.miss) }));
  const weak = [...scored].sort((a, b) => a.acc - b.acc).slice(0, 8);
  const strong = [...scored].sort((a, b) => b.acc - a.acc).slice(0, 8);
  return { weak, strong, all: scored };
}
