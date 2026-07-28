#!/usr/bin/env node

import heroGlyphs from "../src/lib/heroGlyphs.json" with { type: "json" };
import { HERO_GLYPH_CHARS } from "../src/lib/heroGlyphChars.js";
import fs from "node:fs";
import path from "node:path";

const fontPath = path.join(process.cwd(), "public/fonts/hero-arrows.woff");
const hasFont = fs.existsSync(fontPath);
const jsonGlyphs = Object.keys(heroGlyphs);
const withGuides = jsonGlyphs.filter((char) => heroGlyphs[char]?.guides?.length);
const missing = [...HERO_GLYPH_CHARS].filter((char) => !heroGlyphs[char]);

console.log("Hero arrow glyph status");
console.log("=======================");
console.log(`Target:  ${HERO_GLYPH_CHARS.length} glyphs (A–Z, 0–9)`);
console.log(`JSON:    ${jsonGlyphs.length} in src/lib/heroGlyphs.json (${withGuides.length} with arrows)`);
console.log(`Font:    ${hasFont ? "public/fonts/hero-arrows.woff found" : "not found"}`);
console.log("");

if (jsonGlyphs.length) {
  console.log("In JSON:", jsonGlyphs.join(" "));
}

if (missing.length) {
  console.log(`\nMissing (${missing.length}):`, missing.join(" "));
} else if (jsonGlyphs.length === HERO_GLYPH_CHARS.length) {
  console.log("\nAll 36 glyphs present in JSON.");
}
