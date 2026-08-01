const ITEMS = 8;

const ROW_DEFS = [
  { id: "practice-1", heightMm: 18, items: 6, solid: 2, dotted: 4 },
  { id: "practice-2", heightMm: 16, items: 7, solid: 1, dotted: 6 },
  { id: "practice-3", heightMm: 15, items: ITEMS, dotted: ITEMS },
  /** Rows 4–10: full dotted row, then one fewer dotted each row. */
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `practice-${i + 4}`,
    heightMm: 15,
    items: ITEMS,
    dotted: ITEMS - i
  }))
];

function slot(kind) {
  return { kind };
}

function practicePattern({ items, solid = 0, dotted = 0 }) {
  return [
    ...Array.from({ length: solid }, () => slot("solid")),
    ...Array.from({ length: dotted }, () => slot("dotted")),
    ...Array.from({ length: items - solid - dotted }, () => slot("blank"))
  ];
}

const PRACTICE_ROWS = ROW_DEFS.map((def) => ({
  id: def.id,
  heightMm: def.heightMm,
  items: def.items,
  pattern: practicePattern(def)
}));

function classify(char) {
  if (/[0-9]/.test(char)) return { type: "number", ruling: "number" };
  if (/[A-Z]/.test(char)) return { type: "uppercase", ruling: "uppercase" };
  if (/[a-z]/.test(char)) {
    return { type: "lowercase", ruling: /[gjpqy]/.test(char) ? "descender" : "lowercase" };
  }
  return { type: "unknown", ruling: "lowercase" };
}

export function buildWorksheetSpec(char) {
  const { type, ruling } = classify(char);

  return {
    page: { size: "A4", marginMm: 20 },
    char,
    type,
    ruling,
    heroTitle: `Practice writing ${char}`,
    heroSubtitle: "Trace each row from top to bottom.",
    imagePrompt: "Draw & color",
    rows: PRACTICE_ROWS
  };
}
