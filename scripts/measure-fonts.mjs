import fs from "node:fs";

import opentype from "opentype.js";

import { FONT_URLS } from "../src/lib/fonts.js";

const parseFont = opentype.parse;
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const VIEW = 100;
const PAD = 0.08;

async function loadFont(url) {
  const response = await fetch(url);
  return parseFont(await response.arrayBuffer());
}

function measure(font, char) {
  const glyph = font.charToGlyph(char);
  if (!glyph.unicode) {
    return null;
  }

  const topTarget = VIEW * PAD;
  let baselineY = VIEW * (1 - PAD);
  const targetHeight = baselineY - topTarget;

  let fontSize = targetHeight;
  let path = glyph.getPath(0, baselineY, fontSize);
  let bbox = path.getBoundingBox();

  for (let i = 0; i < 8; i += 1) {
    const height = bbox.y2 - bbox.y1;
    if (!height) break;
    fontSize *= targetHeight / height;
    path = glyph.getPath(0, baselineY, fontSize);
    bbox = path.getBoundingBox();
  }

  if (bbox.y1 < topTarget) {
    baselineY += topTarget - bbox.y1;
    path = glyph.getPath(0, baselineY, fontSize);
    bbox = path.getBoundingBox();
  }

  const width = bbox.x2 - bbox.x1;
  const x = (VIEW - width) / 2 - bbox.x1;

  return {
    x: +x.toFixed(2),
    y: +baselineY.toFixed(2),
    fontSize: +fontSize.toFixed(2)
  };
}

const [solidFont, dashedFont] = await Promise.all([
  loadFont(FONT_URLS.solid),
  loadFont(FONT_URLS.dashed)
]);

const metrics = { solid: {}, dashed: {} };

for (const char of CHARS) {
  const solid = measure(solidFont, char);
  const dashed = measure(dashedFont, char);
  if (solid) metrics.solid[char] = solid;
  if (dashed) metrics.dashed[char] = dashed;
}

const outPath = new URL("../src/lib/letterMetrics.json", import.meta.url);
fs.writeFileSync(outPath, `${JSON.stringify(metrics, null, 2)}\n`, "utf8");
console.log(`Wrote metrics for ${Object.keys(metrics.solid).length} characters`);
