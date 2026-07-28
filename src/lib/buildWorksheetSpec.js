function practicePattern(items, { solid = 0, dotted = 0 } = {}) {
  const blank = items - solid - dotted;

  return [
    ...Array(solid).fill("solid"),
    ...Array(dotted).fill("dotted"),
    ...Array(blank).fill("blank")
  ];
}

const PRACTICE_ROWS = [
  { id: "practice-1", heightMm: 18, items: 6, solid: 2, dotted: 2 },
  { id: "practice-2", heightMm: 16, items: 7, solid: 2, dotted: 2 },
  { id: "practice-3", heightMm: 15, items: 8, solid: 2, dotted: 2 },
  { id: "practice-4", heightMm: 15, items: 8, solid: 2, dotted: 2 },
  { id: "practice-5", heightMm: 15, items: 8, solid: 2, dotted: 2 }
].map(({ id, heightMm, items, solid, dotted }) => ({
  id,
  heightMm,
  items,
  pattern: practicePattern(items, { solid, dotted })
}));

function getCharacterType(char) {
  if (/^[A-Z]$/.test(char)) return "uppercase";
  if (/^[a-z]$/.test(char)) return "lowercase";
  if (/^[0-9]$/.test(char)) return "number";
  return "unknown";
}

function getImageKey(char) {
  const defaults = { A: "apple", a: "apple", "5": "stars" };
  return defaults[char] ?? null;
}

function getRuling(char) {
  if (/^[0-9]$/.test(char)) return "number";
  if (/^[A-Z]$/.test(char)) return "uppercase";
  if (/^[gjpqy]$/.test(char)) return "descender";
  return "lowercase";
}

export function buildWorksheetSpec(char) {
  return {
    page: { size: "A4", marginMm: 20 },
    char,
    type: getCharacterType(char),
    heroTitle: `Practice writing ${char}`,
    heroSubtitle: "Trace each row from top to bottom.",
    imageKey: getImageKey(char),
    imagePrompt: `${char} is for… draw & color!`,
    ruling: getRuling(char),
    rows: PRACTICE_ROWS
  };
}
