#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { parse as parseFont } from "opentype.js/dist/opentype.mjs";

import { HERO_GLYPH_CHARS } from "../src/lib/heroGlyphChars.js";
import { HERO_STROKE_GUIDES } from "../src/lib/heroStrokeGuides.js";
import metrics from "../src/lib/letterMetrics.json" with { type: "json" };

const FONT_URL = "https://fonts.cdnfonts.com/s/20683/PrintBold_TT.woff";
const OUT_PATH = path.join(process.cwd(), "src/lib/heroGlyphs.json");

const response = await fetch(FONT_URL);
const font = parseFont(await response.arrayBuffer());

const glyphs = {};

for (const char of HERO_GLYPH_CHARS) {
  const guides = HERO_STROKE_GUIDES[char];

  if (!guides) {
    console.warn(`No stroke guides for "${char}", skipping`);
    continue;
  }

  const placement = metrics.solid[char];
  if (!placement) {
    console.warn(`No metrics for "${char}", skipping`);
    continue;
  }

  const letter = font.getPath(char, placement.x, placement.y, placement.fontSize).toPathData(2);
  glyphs[char] = { letter, guides };
}

fs.writeFileSync(OUT_PATH, `${JSON.stringify(glyphs, null, 2)}\n`, "utf8");
console.log(`Wrote ${Object.keys(glyphs).length} hero glyphs to src/lib/heroGlyphs.json`);
