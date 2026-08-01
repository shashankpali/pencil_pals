export const LETTER_FONT = "fonts/sassoon-primary-regular.otf";
export const DIGIT_FONT = "fonts/primer-print.otf";
/** Sassoon Infant Dotted — trace cells for letters (do not regenerate). */
export const LETTER_DOTTED_FONT = "fonts/sassoon-primary-dotted.otf";
/** Primer Print Dotted — trace cells for digits (generated). */
export const DIGIT_DOTTED_FONT = "fonts/primer-print-dotted.otf";

export const isDigit = (ch) => ch >= "0" && ch <= "9";
export const fontFor = (ch) => (isDigit(ch) ? DIGIT_FONT : LETTER_FONT);
export const dottedFontFor = (ch) => (isDigit(ch) ? DIGIT_DOTTED_FONT : LETTER_DOTTED_FONT);
