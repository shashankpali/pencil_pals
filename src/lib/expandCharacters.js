const LETTER_RE = /^[A-Za-z]$/;
const DIGIT_RE = /^[0-9]$/;

export function expandCharacters(toBePrint, needSmallCase = true, unique = true) {
  if (typeof toBePrint !== "string") {
    throw new TypeError("toBePrint must be a string.");
  }

  const expanded = [];

  for (const char of toBePrint) {
    if (LETTER_RE.test(char)) {
      const upper = char.toUpperCase();
      const lower = char.toLowerCase();

      expanded.push(upper);

      if (needSmallCase) {
        expanded.push(lower);
      }

      continue;
    }

    if (DIGIT_RE.test(char)) {
      expanded.push(char);
    }
  }

  return unique ? [...new Set(expanded)] : expanded;
}
