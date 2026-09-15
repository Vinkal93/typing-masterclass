import type { LabError } from "./settings";

export interface EvaluationBreakdown {
  correctWords: number;
  totalWords: number;
  spellingErrors: number;
  extraSpaces: number;
  missingSpaces: number;
  missingCharacters: number;
  extraCharacters: number;
  omittedWords: number;
  extraWords: number;
}

export interface TypingEvaluation {
  accuracy: number;
  correctCharacters: number;
  wrongCharacters: number;
  errors: LabError[];
  breakdown: EvaluationBreakdown;
}

type Token = { raw: string; normalized: string };

const words = (text: string): Token[] =>
  (text.match(/[\p{L}\p{M}\p{N}]+(?:['’.-][\p{L}\p{M}\p{N}]+)*/gu) || []).map((raw) => ({
    raw,
    normalized: raw.toLocaleLowerCase(),
  }));

export const countSpacingErrors = (text: string) => {
  const duplicate: string[] = text.match(/ {2,}|\t+/g) ?? [];
  return duplicate.reduce<number>((total, run) => total + Math.max(1, run.length - 1), 0);
};

function editDistance(a: string, b: string) {
  const previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diagonal = previous[0];
    previous[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const above = previous[j];
      previous[j] = Math.min(previous[j] + 1, previous[j - 1] + 1, diagonal + (a[i - 1] === b[j - 1] ? 0 : 1));
      diagonal = above;
    }
  }
  return previous[b.length];
}

/** Fast word alignment with bounded look-ahead so one omission never shifts the rest of a passage. */
export function evaluateReference(reference: string, typed: string): TypingEvaluation {
  const expected = words(reference);
  const actual = words(typed);
  const errors: LabError[] = [];
  let i = 0;
  let j = 0;
  let correctWords = 0;
  let correctCharacters = 0;
  let missingCharacters = 0;
  let extraCharacters = 0;
  let omittedWords = 0;
  let extraWords = 0;

  while (i < expected.length && j < actual.length) {
    if (expected[i].normalized === actual[j].normalized) {
      correctWords++;
      correctCharacters += expected[i].raw.length;
      i++;
      j++;
      continue;
    }

    const nextActual = actual.slice(j + 1, j + 4).findIndex((token) => token.normalized === expected[i].normalized);
    const nextExpected = expected.slice(i + 1, i + 4).findIndex((token) => token.normalized === actual[j].normalized);
    if (nextActual >= 0 && (nextExpected < 0 || nextActual <= nextExpected)) {
      const count = nextActual + 1;
      actual.slice(j, j + count).forEach((token) => errors.push({ word: token.raw, expected: "", reason: "Extra word", suggestion: "Remove this word", type: "extra" }));
      extraWords += count;
      extraCharacters += actual.slice(j, j + count).reduce((sum, token) => sum + token.raw.length, 0);
      j += count;
      continue;
    }
    if (nextExpected >= 0) {
      const count = nextExpected + 1;
      expected.slice(i, i + count).forEach((token) => errors.push({ word: "", expected: token.raw, reason: "Missing word", suggestion: `Type “${token.raw}”`, type: "missing" }));
      omittedWords += count;
      missingCharacters += expected.slice(i, i + count).reduce((sum, token) => sum + token.raw.length, 0);
      i += count;
      continue;
    }

    const distance = editDistance(expected[i].normalized, actual[j].normalized);
    const lengthDelta = expected[i].raw.length - actual[j].raw.length;
    missingCharacters += Math.max(0, lengthDelta);
    extraCharacters += Math.max(0, -lengthDelta);
    correctCharacters += Math.max(0, expected[i].raw.length - distance);
    errors.push({
      word: actual[j].raw,
      expected: expected[i].raw,
      reason: distance === 1 ? "One-character typing mistake" : "Word does not match",
      suggestion: `Use “${expected[i].raw}”`,
      type: "spelling",
    });
    i++;
    j++;
  }

  while (i < expected.length) {
    const token = expected[i++];
    omittedWords++;
    missingCharacters += token.raw.length;
    errors.push({ word: "", expected: token.raw, reason: "Missing word", suggestion: `Type “${token.raw}”`, type: "missing" });
  }
  while (j < actual.length) {
    const token = actual[j++];
    extraWords++;
    extraCharacters += token.raw.length;
    errors.push({ word: token.raw, expected: "", reason: "Extra word", suggestion: "Remove this word", type: "extra" });
  }

  const extraSpaces = countSpacingErrors(typed);
  if (extraSpaces) errors.push({ word: "multiple spaces", expected: "single space", reason: `${extraSpaces} duplicate space${extraSpaces === 1 ? "" : "s"}`, suggestion: "Use one space between words", type: "spacing" });
  const wrongCharacters = missingCharacters + extraCharacters + errors.filter((error) => error.type === "spelling").length + extraSpaces;
  const denominator = Math.max(1, reference.length);
  const accuracy = typed.length ? Math.max(0, Math.min(100, ((denominator - wrongCharacters) / denominator) * 100)) : 100;
  return {
    accuracy,
    correctCharacters,
    wrongCharacters,
    errors,
    breakdown: {
      correctWords,
      totalWords: actual.length,
      spellingErrors: errors.filter((error) => error.type === "spelling").length,
      extraSpaces,
      missingSpaces: 0,
      missingCharacters,
      extraCharacters,
      omittedWords,
      extraWords,
    },
  };
}

export const emptyBreakdown = (): EvaluationBreakdown => ({
  correctWords: 0,
  totalWords: 0,
  spellingErrors: 0,
  extraSpaces: 0,
  missingSpaces: 0,
  missingCharacters: 0,
  extraCharacters: 0,
  omittedWords: 0,
  extraWords: 0,
});