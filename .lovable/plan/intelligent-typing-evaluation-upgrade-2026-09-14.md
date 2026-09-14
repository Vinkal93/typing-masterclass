# Intelligent Typing Evaluation Upgrade

## Goal
Upgrade the existing Advanced Lab without changing its overall workflow or visual style. Paper Mode will gain local dictionary-based spelling analysis, reference-based sessions will use resilient word alignment, and results will clearly explain each error type. The Keyboard Guide will also receive a complete responsive desktop keyboard.

## Implementation
1. **Evaluation engine**
   - Add a fast local English spell checker backed by a maintained dictionary.
   - Normalize words safely while preserving names, acronyms, technical tokens, URLs, numbers, contractions, and user-approved custom words.
   - Add bounded word-level alignment so insertions, omissions, extra spaces, and single-character mistakes resynchronize instead of shifting every later character.
   - Calculate correct words/chars, spelling errors, missing characters, extra characters, spacing errors, WPM, CPM, and accuracy from the aligned result.

2. **Paper Mode intelligence**
   - Run local spelling and spacing checks while typing, with a subtle status indicator that does not interrupt input.
   - Keep AI grammar/context review at completion, then merge it with deterministic local spelling results without duplicate errors.
   - Add optional suggestions and a persistent custom dictionary editor in Lab Settings.

3. **Results and accessibility**
   - Extend the report popup and below-page report with categorized totals: correct words, spelling, extra spaces, missing characters, and other issues.
   - Show clear error labels and suggestions using semantic, screen-reader-friendly status text.
   - Keep long reports scrollable without visible scrollbars and ensure mobile layouts do not overflow.

4. **Keyboard Guide**
   - Add a complete responsive desktop keyboard section using the project’s existing design tokens and button-free key visuals.
   - Include function, navigation, modifier, arrow, and full-size space keys with horizontal containment on small screens.

5. **Verification**
   - Add focused automated tests for typo recovery, inserted/deleted words, repeated spaces, punctuation, valid acronyms/names/custom words, empty input, and long text.
   - Run the tests, check the preview build diagnostics, and visually verify Advanced Lab and Keyboard Guide on desktop and mobile widths.

## Technical Details
- Dictionary work stays client-side and lazy-loads only in Paper Mode to avoid slowing initial page load.
- Alignment uses a bounded dynamic window rather than full-document character comparison, preventing quadratic work on long passages.
- Existing saved settings remain compatible through defaults added during settings hydration.
