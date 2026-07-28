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
  // baselineY such that fontY=GUIDE_BASE_FONT_Y lands on GUIDE_BASE_VIEW
  const baselineY = GUIDE_BASE_VIEW + (GUIDE_BASE_FONT_Y * fontSize) / font.unitsPerEm;

  return {
    y: +baselineY.toFixed(2),
    fontSize: +fontSize.toFixed(2)
  };
}

function centerX(font, char, fontSize, baselineY) {
  const path = font.charToGlyph(char).getPath(0, baselineY, fontSize);
  const bbox = path.getBoundingBox();
  const width = bbox.x2 - bbox.x1;
  if (!width) return VIEW / 2;
  return +((VIEW - width) / 2 - bbox.x1).toFixed(2);
}

const font = parseFont(fs.readFileSync(FONT_FILE).buffer);
const { y, fontSize } = sharedPlacement(font);
const metrics = {};

for (const char of CHARS) {
  const glyph = font.charToGlyph(char);
  if (!glyph.unicode) continue;

  metrics[char] = {
    x: centerX(font, char, fontSize, y),
    y,
    fontSize
  };
}

const outPath = new URL("../src/lib/letterMetrics.json", import.meta.url);
fs.writeFileSync(outPath, `${JSON.stringify(metrics, null, 2)}\n`, "utf8");

console.log(`Wrote metrics for ${Object.keys(metrics).length} characters`);
console.log(`Shared placement: y=${y}, fontSize=${fontSize}`);
console.log(`Guides → mid ${GUIDE_MID_VIEW}%, base ${GUIDE_BASE_VIEW}%`);
