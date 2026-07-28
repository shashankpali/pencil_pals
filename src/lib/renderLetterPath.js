import { parse as parseFont } from "opentype.js/dist/opentype.mjs";

import { HERO_ARROW_FONT, PRACTICE_FONT } from "./fonts.js";
import metrics from "./letterMetrics.json" with { type: "json" };

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const DEFAULT_PLACEMENT = { x: 50, y: metrics.shared?.y ?? 92, fontSize: metrics.shared?.fontSize ?? 84 };

let practiceFontPromise;
let heroArrowFontPromise;

function fontUrl(relativePath) {
  return `${BASE_PATH}/${relativePath}`;
}

async function fetchFont(relativePath, required) {
  const response = await fetch(fontUrl(relativePath));

  if (!response.ok) {
    if (!required) return null;
    throw new Error(`Failed to load font (${response.status}): ${relativePath}`);
  }

  return parseFont(await response.arrayBuffer());
}

function loadPracticeFont() {
  if (!practiceFontPromise) {
    practiceFontPromise = fetchFont(PRACTICE_FONT, true);
  }
  return practiceFontPromise;
}

function loadHeroArrowFont() {
  if (!heroArrowFontPromise) {
    heroArrowFontPromise = fetchFont(HERO_ARROW_FONT, false).catch(() => null);
  }
  return heroArrowFontPromise;
}

function getPlacement(char) {
  const x = metrics.x?.[char];
  if (x == null) return DEFAULT_PLACEMENT;
  return { x, y: metrics.shared.y, fontSize: metrics.shared.fontSize };
}

function toPathData(font, char, placement) {
  return font.getPath(char, placement.x, placement.y, placement.fontSize).toPathData(2);
}

export async function loadWorksheetPaths(char) {
  const [practiceFont, arrowFont] = await Promise.all([loadPracticeFont(), loadHeroArrowFont()]);
  const placement = getPlacement(char);
  const letter = toPathData(practiceFont, char, placement);

  return {
    hero: arrowFont ? toPathData(arrowFont, char, placement) : letter,
    letter
  };
}
