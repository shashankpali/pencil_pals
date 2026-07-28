function practicePattern(items, { solid = 0, dotted = 0 } = {}) {
  const blank = items - solid - dotted;

  return [
    ...Array(solid).fill("solid"),
    ...Array(dotted).fill("dotted"),
    ...Array(blank).fill("blank")
  ];
}

function buildPracticeRows() {
  const rows = [
    { id: "practice-1", heightMm: 18, items: 6, solid: 2, dotted: 4 },
    { id: "practice-2", heightMm: 16, items: 7, solid: 1, dotted: 6 }
  ];

  for (let i = 3; i <= 10; i++) {
    rows.push({
      id: `practice-${i}`,
      heightMm: 15,
      items: 8,
      dotted: 11 - i
    });
  }

  return rows.map(({ id, heightMm, items, solid = 0, dotted }) => ({
    id,
    heightMm,
    items,
    pattern: practicePattern(items, { solid, dotted })
  }));
}

const DEFAULT_ROWS = [
  { id: "hero", heightMm: 20, items: 1, pattern: ["demo"] },
  ...buildPracticeRows()
];

function getCharacterType(char) {
  if (/^[A-Z]$/.test(char)) return "uppercase";
  if (/^[a-z]$/.test(char)) return "lowercase";
  if (/^[0-9]$/.test(char)) return "number";
  return "unknown";
}

function getHeroTitle(char) {
  return `Practice writing ${char}`;
}

function getHeroSubtitle() {
  return "Trace each row from top to bottom.";
}

function getImagePrompt(char) {
  return `${char} is for… draw & color!`;
}

function getImageKey(char) {
  const defaults = {
    A: "apple",
    a: "apple",
    "5": "stars"
  };

  return defaults[char] ?? null;
}

function getRuling(char) {
  if (/^[0-9]$/.test(char)) return "number";
  if (/^[A-Z]$/.test(char)) return "uppercase";

  if (/^[gjpqy]$/.test(char)) {
    return "descender";
  }

  return "lowercase";
}

export function buildWorksheetSpec(char) {
  return {
    page: {
      size: "A4",
      marginMm: 20
    },
    char,
    type: getCharacterType(char),
    heroTitle: getHeroTitle(char),
    heroSubtitle: getHeroSubtitle(),
    imageKey: getImageKey(char),
    imagePrompt: getImagePrompt(char),
    ruling: getRuling(char),
    rows: DEFAULT_ROWS
  };
}
