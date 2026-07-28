import fs from "node:fs";
import path from "node:path";

import { parse as parseFont } from "opentype.js/dist/opentype.mjs";

import { PRACTICE_FONT } from "../src/lib/fonts.js";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const VIEW = 100;
const FONT_FILE = path.join(process.cwd(), "public", PRACTICE_FONT);

/** CF Second Son School baked-in guide band centers (font units). */
const GUIDE_MID_FONT_Y = 541;
const GUIDE_BASE_FONT_Y = 8;

/** Target viewBox % for CSS guidelines (must match globals.css). */
const GUIDE_MID_VIEW = 43.2;
const GUIDE_BASE_VIEW = 91.3;

function sharedPlacement(font) {
  const scaleGap = (GUIDE_MID_FONT_Y - GUIDE_BASE_FONT_Y) / font.unitsPerEm;
  const fontSize = (GUIDE_BASE_VIEW - GUIDE_MID_VIEW) / scaleGap;
  const y = GUIDE_BASE_VIEW + (GUIDE_BASE_FONT_Y * fontSize) / font.unitsPerEm;

  return {
    y: +y.toFixed(2),
    fontSize: +fontSize.toFixed(2)
  };
}

function centerX(font, char, fontSize, baselineY) {
  const bbox = font.charToGlyph(char).getPath(0, baselineY, fontSize).getBoundingBox();
  const width = bbox.x2 - bbox.x1;
  if (!width) return VIEW / 2;
  return +((VIEW - width) / 2 - bbox.x1).toFixed(2);
}

const font = parseFont(fs.readFileSync(FONT_FILE).buffer);
const shared = sharedPlacement(font);
const x = {};

for (const char of CHARS) {
  if (font.charToGlyph(char).unicode) {
    x[char] = centerX(font, char, shared.fontSize, shared.y);
  }
}

const outPath = new URL("../src/lib/letterMetrics.json", import.meta.url);
fs.writeFileSync(outPath, `${JSON.stringify({ shared, x }, null, 2)}\n`, "utf8");

console.log(`Wrote metrics for ${Object.keys(x).length} characters`);
console.log(`Shared placement: y=${shared.y}, fontSize=${shared.fontSize}`);
