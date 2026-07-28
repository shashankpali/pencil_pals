// Exterior stroke guides for hero panel (viewBox 0–100, baseline y=92).
// Letter shape comes from Print Bold via opentype; guides sit outside the glyph.

export const HERO_STROKE_GUIDES = {
  A: [
    { num: 1, x1: 50, y1: 9, x2: 8, y2: 90 },
    { num: 2, x1: 50, y1: 9, x2: 92, y2: 90 },
    { num: 3, x1: 40, y1: 48, x2: 60, y2: 48 }
  ],
  B: [
    { num: 1, x1: 14, y1: 10, x2: 14, y2: 90 },
    { num: 2, d: "M 14 10 C 82 10, 82 44, 14 50" },
    { num: 3, d: "M 14 50 C 86 50, 86 90, 14 90" }
  ],
  C: [{ num: 1, d: "M 86 16 C 40 16, 28 50, 28 50 C 28 50, 40 84, 86 84" }],
  D: [
    { num: 1, x1: 12, y1: 10, x2: 12, y2: 90 },
    { num: 2, d: "M 12 10 C 84 10, 90 50, 84 90" }
  ],
  E: [
    { num: 1, x1: 16, y1: 10, x2: 16, y2: 90 },
    { num: 2, x1: 16, y1: 10, x2: 78, y2: 10 },
    { num: 3, x1: 16, y1: 50, x2: 70, y2: 50 },
    { num: 4, x1: 16, y1: 90, x2: 78, y2: 90 }
  ],
  F: [
    { num: 1, x1: 16, y1: 10, x2: 16, y2: 90 },
    { num: 2, x1: 16, y1: 10, x2: 78, y2: 10 },
    { num: 3, x1: 16, y1: 50, x2: 70, y2: 50 }
  ],
  G: [
    { num: 1, d: "M 84 16 C 38 16, 26 50, 26 50 C 26 50, 38 84, 84 84" },
    { num: 2, x1: 52, y1: 50, x2: 84, y2: 50 }
  ],
  H: [
    { num: 1, x1: 12, y1: 10, x2: 12, y2: 90 },
    { num: 2, x1: 88, y1: 10, x2: 88, y2: 90 },
    { num: 3, x1: 40, y1: 30, x2: 60, y2: 30 }
  ],
  I: [{ num: 1, x1: 50, y1: 10, x2: 50, y2: 90 }],
  J: [
    { num: 1, x1: 16, y1: 10, x2: 86, y2: 10 },
    { num: 2, x1: 86, y1: 10, x2: 86, y2: 68 },
    { num: 3, d: "M 86 68 C 86 90, 50 94, 24 86" }
  ],
  K: [
    { num: 1, x1: 14, y1: 10, x2: 14, y2: 90 },
    { num: 2, x1: 14, y1: 50, x2: 86, y2: 10 },
    { num: 3, x1: 14, y1: 50, x2: 86, y2: 90 }
  ],
  L: [
    { num: 1, x1: 16, y1: 10, x2: 16, y2: 90 },
    { num: 2, x1: 16, y1: 90, x2: 78, y2: 90 }
  ],
  M: [
    { num: 1, x1: 8, y1: 10, x2: 8, y2: 90 },
    { num: 2, x1: 8, y1: 10, x2: 50, y2: 50 },
    { num: 3, x1: 50, y1: 50, x2: 92, y2: 90 },
    { num: 4, x1: 92, y1: 90, x2: 92, y2: 10 }
  ],
  N: [
    { num: 1, x1: 14, y1: 10, x2: 14, y2: 90 },
    { num: 2, x1: 14, y1: 10, x2: 86, y2: 90 },
    { num: 3, x1: 86, y1: 90, x2: 86, y2: 10 }
  ],
  O: [{ num: 1, d: "M 50 10 C 84 10, 84 90, 50 90 C 16 90, 16 10, 50 10" }],
  P: [
    { num: 1, x1: 14, y1: 10, x2: 14, y2: 90 },
    { num: 2, d: "M 14 10 C 82 10, 82 44, 14 50" }
  ],
  Q: [
    { num: 1, d: "M 50 10 C 84 10, 84 90, 50 90 C 16 90, 16 10, 50 10" },
    { num: 2, x1: 62, y1: 68, x2: 90, y2: 94 }
  ],
  R: [
    { num: 1, x1: 14, y1: 10, x2: 14, y2: 90 },
    { num: 2, d: "M 14 10 C 82 10, 82 44, 14 50" },
    { num: 3, x1: 14, y1: 50, x2: 86, y2: 90 }
  ],
  S: [{ num: 1, d: "M 78 14 C 24 14, 24 50, 78 50 C 24 50, 24 86, 78 86" }],
  T: [
    { num: 1, x1: 14, y1: 10, x2: 86, y2: 10 },
    { num: 2, x1: 50, y1: 10, x2: 50, y2: 90 }
  ],
  U: [{ num: 1, d: "M 12 10 L 12 68 C 12 92, 88 92, 88 68 L 88 10" }],
  V: [
    { num: 1, x1: 10, y1: 11, x2: 50, y2: 94 },
    { num: 2, x1: 50, y1: 94, x2: 90, y2: 11 }
  ],
  W: [
    { num: 1, x1: 8, y1: 11, x2: 30, y2: 94 },
    { num: 2, x1: 30, y1: 94, x2: 50, y2: 11 },
    { num: 3, x1: 50, y1: 11, x2: 70, y2: 94 },
    { num: 4, x1: 70, y1: 94, x2: 92, y2: 11 }
  ],
  X: [
    { num: 1, x1: 12, y1: 10, x2: 88, y2: 90 },
    { num: 2, x1: 88, y1: 10, x2: 12, y2: 90 }
  ],
  Y: [
    { num: 1, x1: 14, y1: 10, x2: 50, y2: 50 },
    { num: 2, x1: 86, y1: 10, x2: 50, y2: 50 },
    { num: 3, x1: 50, y1: 50, x2: 50, y2: 90 }
  ],
  Z: [
    { num: 1, x1: 14, y1: 10, x2: 86, y2: 10 },
    { num: 2, x1: 86, y1: 10, x2: 14, y2: 90 },
    { num: 3, x1: 14, y1: 90, x2: 86, y2: 90 }
  ],
  0: [{ num: 1, d: "M 50 10 C 84 10, 84 90, 50 90 C 16 90, 16 10, 50 10" }],
  1: [{ num: 1, x1: 52, y1: 10, x2: 46, y2: 90 }],
  2: [{ num: 1, d: "M 26 28 C 26 10, 74 10, 74 28 C 74 48, 24 52, 28 90 L 74 90" }],
  3: [{ num: 1, d: "M 28 20 C 74 20, 74 38, 50 50 C 74 62, 74 82, 28 82" }],
  4: [
    { num: 1, x1: 28, y1: 12, x2: 28, y2: 52 },
    { num: 2, x1: 28, y1: 52, x2: 78, y2: 52 },
    { num: 3, x1: 56, y1: 12, x2: 56, y2: 90 }
  ],
  5: [
    { num: 1, x1: 74, y1: 12, x2: 26, y2: 12 },
    { num: 2, x1: 26, y1: 12, x2: 26, y2: 50 },
    { num: 3, d: "M 26 50 C 26 50, 74 50, 74 68 C 74 90, 26 90, 26 90" }
  ],
  6: [{ num: 1, d: "M 74 24 C 74 10, 26 10, 26 40 C 26 90, 74 90, 74 68 C 74 50, 26 50, 26 68" }],
  7: [
    { num: 1, x1: 26, y1: 12, x2: 74, y2: 12 },
    { num: 2, x1: 74, y1: 12, x2: 40, y2: 90 }
  ],
  8: [
    {
      num: 1,
      d: "M 50 50 C 78 50, 78 14, 50 14 C 22 14, 22 50, 50 50 C 22 50, 22 86, 50 86 C 78 86, 78 50, 50 50"
    }
  ],
  9: [
    { num: 1, d: "M 74 36 C 74 10, 26 10, 26 36 C 26 62, 74 62, 74 36" },
    { num: 2, x1: 74, y1: 36, x2: 74, y2: 90 }
  ]
};

export function getStrokeLabelPosition(stroke) {
  const start = getStrokeStart(stroke);
  const end = getStrokeEnd(stroke);
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  if (Math.abs(dx) > Math.abs(dy) * 1.4) {
    return { x: start.x + (dx > 0 ? 4 : -4), y: start.y - 7 };
  }

  if (Math.abs(dy) > Math.abs(dx) * 1.4) {
    if (start.x < 50) {
      return { x: start.x - 7, y: start.y + (dy > 0 ? 8 : -4) };
    }

    return { x: start.x + 7, y: start.y + (dy > 0 ? 8 : -4) };
  }

  if (dx < 0) {
    return { x: start.x + 7, y: start.y + 4 };
  }

  if (dx > 0) {
    return { x: start.x - 7, y: start.y + 4 };
  }

  return { x: start.x - 7, y: start.y + 8 };
}

function getStrokeEnd(stroke) {
  if (stroke.d) {
    const numbers = stroke.d.match(/-?\d+(\.\d+)?/g).map(Number);
    return { x: numbers[numbers.length - 2], y: numbers[numbers.length - 1] };
  }

  return { x: stroke.x2, y: stroke.y2 };
}

function getStrokeStart(stroke) {
  if (stroke.d) {
    const match = stroke.d.match(/M\s*(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)/);
    return { x: Number(match[1]), y: Number(match[3]) };
  }

  return { x: stroke.x1, y: stroke.y1 };
}
