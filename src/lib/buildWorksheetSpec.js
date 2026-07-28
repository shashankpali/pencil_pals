const ROW_DEFS = [
  { id: "practice-1", heightMm: 18, items: 6, solid: 2, dotted: 4 },
  { id: "practice-2", heightMm: 16, items: 7, solid: 1, dotted: 6 },
  ...Array.from({ length: 8 }, (_, index) => ({
    id: `practice-${index + 3}`,
    heightMm: 15,
    items: 8,
    dotted: 8 - index
  }))
];

function practicePattern(items, solid, dotted) {
  const blank = items - solid - dotted;
  return [
    ...Array(solid).fill("solid"),
    ...Array(dotted).fill("dotted"),
    ...Array(blank).fill("blank")
  ];
}

const PRACTICE_ROWS = ROW_DEFS.map(({ id, heightMm, items, solid = 0, dotted }) => ({
  id,
  heightMm,
  items,
  pattern: practicePattern(items, solid, dotted)
}));

function getCharacterType(char) {
  if (/[A-Z]/.test(char)) return "uppercase";
  if (/[a-z]/.test(char)) return "lowercase";
  if (/[0-9]/.test(char)) return "number";
  return "unknown";
}

function getRuling(char) {
  if (/[0-9]/.test(char)) return "number";
  if (/[A-Z]/.test(char)) return "uppercase";
  if (/[gjpqy]/.test(char)) return "descender";
  return "lowercase";
}

export function buildWorksheetSpec(char) {
  return {
    page: { size: "A4", marginMm: 20 },
    char,
    type: getCharacterType(char),
    heroTitle: `Practice writing ${char}`,
    heroSubtitle: "Trace each row from top to bottom.",
    imagePrompt: "Draw & color",
    ruling: getRuling(char),
    rows: PRACTICE_ROWS
  };
}
