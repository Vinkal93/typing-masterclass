import { useCallback, useEffect, useState } from "react";

/**
 * Optional exam-style "5-in-1" word counting.
 * 5 typed characters = 1 word, remaining characters carried forward.
 * Completely opt-in — when disabled nothing in the app changes.
 */
export const FIVE_IN_ONE_KEY = "fiveInOneWordCount";
export const CHARS_PER_WORD = 5;

export function isFiveInOneEnabled(): boolean {
  try {
    return localStorage.getItem(FIVE_IN_ONE_KEY) === "true";
  } catch {
    return false;
  }
}

export function setFiveInOneEnabled(v: boolean) {
  localStorage.setItem(FIVE_IN_ONE_KEY, String(v));
  window.dispatchEvent(new Event("typingSettingsChanged"));
}

export interface FiveInOneResult {
  words: number;
  remainder: number;
  /** fractional words, useful for WPM-style math */
  exact: number;
}

export function fiveInOneWords(chars: number): FiveInOneResult {
  const c = Math.max(0, Math.floor(chars || 0));
  return { words: Math.floor(c / CHARS_PER_WORD), remainder: c % CHARS_PER_WORD, exact: c / CHARS_PER_WORD };
}

/** Reactive flag — updates on the same tab and across tabs. */
export function useFiveInOne(): [boolean, (v: boolean) => void] {
  const [enabled, setEnabled] = useState(isFiveInOneEnabled);

  useEffect(() => {
    const sync = () => setEnabled(isFiveInOneEnabled());
    window.addEventListener("storage", sync);
    window.addEventListener("typingSettingsChanged", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("typingSettingsChanged", sync);
    };
  }, []);

  const set = useCallback((v: boolean) => {
    setFiveInOneEnabled(v);
    setEnabled(v);
  }, []);

  return [enabled, set];
}
