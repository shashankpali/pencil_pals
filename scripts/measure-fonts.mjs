import fs from "node:fs";
import path from "node:path";

import { parse as parseFont } from "opentype.js/dist/opentype.mjs";

import { DIGIT_FONT, LETTER_FONT, fontFor } from "../src/lib/fonts.js";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const VIEW = 100;

/**
 * Four-line ruler — equal spacing:
 *   top solid → upper dashed → lower dashed (baseline) → bottom solid
 *
 * Capitals and small letters use different sizes so each fits its bands:
 *   caps     → top → baseline
 *   lowercase body → upper → baseline
 */
const GUIDE_TOP = 0;
const GUIDE_UPPER = VIEW / 3;
const GUIDE_LOWER = (2 * VIEW) / 3;
const GUIDE_BOTTOM = VIEW;

const read = (rel) => parseFont(fs.readFileSync(path.join("public", rel)).buffer);
const letters = read(LETTER_FONT);
const digits = read(DIGIT_FONT);
const fonts = { [LETTER_FONT]: letters, [DIGIT_FONT]: digits };

const units = letters.unitsPerEm;

/** True ink extents (round caps like O/Q overshoot OS/2 sCapHeight). */
let capHeight = letters.tables?.os2?.sCapHeight || letters.ascender;
let xHeight = letters.tables?.os2?.sxHeight || Math.round(capHeight * 0.5);
for (const ch of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
  if (!letters.charToGlyph(ch).unicode) continue;
  const b = letters.getPath(ch, 0, 0, units).getBoundingBox();
  capHeight = Math.max(capHeight, -b.y1);
}
{
  const b = letters.getPath("x", 0, 0, units).getBoundingBox();
  if (Number.isFinite(b.y1)) xHeight = Math.max(xHeight, -b.y1);
}

const fontSizeCap = +(((GUIDE_LOWER - GUIDE_TOP) * units) / capHeight).toFixed(2);
const fontSizeX = +(((GUIDE_LOWER - GUIDE_UPPER) * units) / xHeight).toFixed(2);
const y = +GUIDE_LOWER.toFixed(2);

const shared = {
  y,
  fontSizeCap,
  fontSizeX,
  /** @deprecated use fontSizeCap / fontSizeX */
  fontSize: fontSizeX,
  guideTop: +GUIDE_TOP.toFixed(2),
  guideUpper: +GUIDE_UPPER.toFixed(2),
  guideLower: +GUIDE_LOWER.toFixed(2),
  guideBottom: +GUIDE_BOTTOM.toFixed(2)
};

function sizeFor(ch) {
  if (ch >= "a" && ch <= "z") return fontSizeX;
  return fontSizeCap;
}

let maxY2 = 0;
let minY1 = VIEW;
for (const ch of CHARS) {
  const font = fonts[fontFor(ch)];
  if (!font.charToGlyph(ch).unicode) continue;
  const b = font.getPath(ch, 0, shared.y, sizeFor(ch)).getBoundingBox();
  maxY2 = Math.max(maxY2, b.y2);
  minY1 = Math.min(minY1, b.y1);
}

fs.writeFileSync(
  new URL("../src/lib/letterMetrics.json", import.meta.url),
  `${JSON.stringify({ shared }, null, 2)}\n`
);
console.log(
  `metrics: y=${shared.y}, cap=${fontSizeCap}, x=${fontSizeX}, ` +
    `guides ${shared.guideTop}/${shared.guideUpper}/${shared.guideLower}/${shared.guideBottom}, ` +
    `yRange=${minY1.toFixed(1)}..${maxY2.toFixed(1)}`
);
