const ITEMS = 8;

/** Rows 1–3 translucent ink; row 4 first cell continues from row 3’s last. */
const TRACE_OPACITY = 0.45;

/** Rows 4–10: TRACE_OPACITY → 0; each later row drops the leading step. */
const FADE_LADDER = Array.from({ length: ITEMS }, (_, i) =>
  +((TRACE_OPACITY * (1 - i / (ITEMS - 1))).toFixed(2))
);

const ROW_DEFS = [
  { id: "practice-1", heightMm: 18, items: 6, solid: 2, dotted: 4 },
  { id: "practice-2", heightMm: 16, items: 7, solid: 1, dotted: 6 },
  { id: "practice-3", heightMm: 15, items: ITEMS, dotted: ITEMS },
  ...Array.from({ length: 7 }, (_, fadeFrom) => ({
    id: `practice-${fadeFrom + 4}`,
    heightMm: 15,
    items: ITEMS,
    fadeFrom
  }))
];

function slot(kind, opacity) {
  return opacity == null ? { kind } : { kind, opacity };
}

function practicePattern({ items, solid = 0, dotted = 0, fadeFrom }) {
  if (fadeFrom != null) {
    const opacities = FADE_LADDER.slice(fadeFrom);
    return [
      ...opacities.map((opacity) => slot("dotted", opacity)),
      ...Array.from({ length: items - opacities.length }, () => slot("blank"))
    ];
  }

  return [
    ...Array.from({ length: solid }, () => slot("solid", 1)),
    ...Array.from({ length: dotted }, () => slot("dotted", TRACE_OPACITY)),
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
