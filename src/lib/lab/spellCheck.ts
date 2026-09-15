import type { LabError } from "./settings";
import { countSpacingErrors, emptyBreakdown, type TypingEvaluation } from "./evaluation";

type SpellChecker = { correct: (word: string) => boolean; suggest: (word: string) => string[] };
let checkerPromise: Promise<SpellChecker> | null = null;

async function getChecker() {
  if (!checkerPromise) {
    checkerPromise = Promise.all([import("nspell"), import("dictionary-en")]).then(([nspellModule, dictionaryModule]) =>
      nspellModule.default(dictionaryModule.default)
    );
  }
  return checkerPromise;
}

const tokenPattern = /[\p{L}\p{M}\p{N}]+(?:['’.-][\p{L}\p{M}\p{N}]+)*/gu;

function shouldSkip(word: string, position: number, custom: Set<string>) {
  const lower = word.toLocaleLowerCase();
  return (
    custom.has(lower) ||
    /\d/.test(word) ||
    /^(?:https?|www)\b/i.test(word) ||
    (/^[A-Z]{2,8}$/.test(word) && word.length > 1) ||
    (position > 0 && /^\p{Lu}[\p{L}\p{M}'’-]+$/u.test(word)) ||
    word.length === 1
  );
}

export async function evaluatePaperSpelling(text: string, customWords: string[], suggestions = true): Promise<TypingEvaluation> {
  const checker = await getChecker();
  const custom = new Set(customWords.map((word) => word.trim().toLocaleLowerCase()).filter(Boolean));
  const tokens = [...text.matchAll(tokenPattern)];
  const errors: LabError[] = [];
  let correctWords = 0;

  tokens.forEach((match) => {
    const word = match[0];
    const position = match.index || 0;
    if (shouldSkip(word, position, custom) || checker.correct(word) || checker.correct(word.toLocaleLowerCase())) {
      correctWords++;
      return;
    }
    const matches = suggestions ? checker.suggest(word).slice(0, 3) : [];
    errors.push({
      word,
      expected: matches[0] || "",
      reason: "Not found in the English dictionary",
      suggestion: matches.length ? matches.join(", ") : "Review spelling or add this valid term to your dictionary",
      type: "spelling",
    });
  });

  const extraSpaces = countSpacingErrors(text);
  if (extraSpaces) errors.push({ word: "multiple spaces", expected: "single space", reason: `${extraSpaces} duplicate space${extraSpaces === 1 ? "" : "s"}`, suggestion: "Use one space between words", type: "spacing" });
  const breakdown = emptyBreakdown();
  breakdown.correctWords = correctWords;
  breakdown.totalWords = tokens.length;
  breakdown.spellingErrors = errors.filter((error) => error.type === "spelling").length;
  breakdown.extraSpaces = extraSpaces;
  const mistakes = breakdown.spellingErrors + extraSpaces;
  const accuracy = tokens.length ? Math.max(0, ((tokens.length - mistakes) / tokens.length) * 100) : 100;
  return {
    accuracy,
    correctCharacters: Math.max(0, text.length - mistakes),
    wrongCharacters: mistakes,
    errors,
    breakdown,
  };
}