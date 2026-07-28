const ITEMS = 8;

/** Rows 1–3 translucent ink; also row 4’s first cell (continues from row 3’s last). */
const TRACE_OPACITY = 0.45;

/** Rows 4–10: start at TRACE_OPACITY → 0; each later row drops the leading step. */
const FADE_LADDER = Array.from({ length: ITEMS }, (_, i) =>
  +((TRACE_OPACITY * (1 - i / (ITEMS - 1))).toFixed(2))
);

const ROW_DEFS = [
  { id: "practice-1", heightMm: 18, items: 6, solid: 2, dotted: 4 },
  { id: "practice-2", heightMm: 16, items: 7, solid: 1, dotted: 6 },
  { id: "practice-3", heightMm: 15, items: 8, solid: 0, dotted: 8 },
  ...Array.from({ length: 7 }, (_, index) => ({
    id: `practice-${index + 4}`,
    heightMm: 15,
    items: ITEMS,
    fadeFrom: index
  }))
];

function slot(kind, opacity) {
  return opacity == null ? { kind } : { kind, opacity };
}

function practicePattern({ items, solid = 0, dotted = 0, fadeFrom }) {
  if (fadeFrom != null) {
    const opacities = FADE_LADDER.slice(fadeFrom);
    const blank = items - opacities.length;
    return [
      ...opacities.map((opacity) => slot("dotted", opacity)),
      ...Array.from({ length: blank }, () => slot("blank"))
    ];
  }

  const blank = items - solid - dotted;
  return [
    ...Array.from({ length: solid }, () => slot("solid", 1)),
    ...Array.from({ length: dotted }, () => slot("dotted", TRACE_OPACITY)),
    ...Array.from({ length: blank }, () => slot("blank"))
  ];
}

const PRACTICE_ROWS = ROW_DEFS.map((def) => ({
  id: def.id,
  heightMm: def.heightMm,
  items: def.items,
  pattern: practicePattern(def)
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
