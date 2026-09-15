import { describe, expect, it } from "vitest";
import { evaluateReference } from "./evaluation";
import { evaluatePaperSpelling } from "./spellCheck";

describe("word-level typing evaluation", () => {
  it("resynchronizes after one typo", () => {
    const result = evaluateReference("the quick brown fox jumps", "the quik brown fox jumps");
    expect(result.breakdown.correctWords).toBe(4);
    expect(result.breakdown.spellingErrors).toBe(1);
  });

  it("resynchronizes after missing and extra words", () => {
    expect(evaluateReference("one two three four", "one three four").breakdown.omittedWords).toBe(1);
    expect(evaluateReference("one two three", "one bonus two three").breakdown.extraWords).toBe(1);
  });

  it("counts repeated spaces without cascading", () => {
    const result = evaluateReference("one two three", "one   two three");
    expect(result.breakdown.correctWords).toBe(3);
    expect(result.breakdown.extraSpaces).toBe(2);
  });

  it("handles empty and long text", () => {
    expect(evaluateReference("", "").accuracy).toBe(100);
    const text = Array.from({ length: 2000 }, (_, i) => `word${i}`).join(" ");
    expect(evaluateReference(text, text).breakdown.correctWords).toBe(2000);
  });
});

describe("paper spelling", () => {
  it("finds misspellings and suggests corrections", async () => {
    const result = await evaluatePaperSpelling("This sentnce is clear.", []);
    expect(result.errors.some((error) => error.word === "sentnce")).toBe(true);
  });

  it("allows abbreviations, names, technical tokens, and custom words", async () => {
    const result = await evaluatePaperSpelling("Vinkal uses API HTML5 ReactJS fooWidget.", ["ReactJS", "fooWidget"]);
    expect(result.breakdown.spellingErrors).toBe(0);
  });
});