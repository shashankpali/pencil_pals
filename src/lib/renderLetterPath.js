import fs from "node:fs";
import path from "node:path";

import { parse as parseFont } from "opentype.js/dist/opentype.mjs";

import { FONT_URLS, HERO_ARROW_FONT } from "./fonts.js";
import metrics from "./letterMetrics.json" with { type: "json" };

const DEFAULT_PLACEMENT = { x: 50, y: 92, fontSize: 84 };
const HERO_ARROW_FONT_FILE = path.join(process.cwd(), HERO_ARROW_FONT);

let fontsPromise;
let heroArrowFont;

function loadHeroArrowFont() {
  if (heroArrowFont !== undefined) {
    return heroArrowFont;
  }

  try {
    heroArrowFont = parseFont(fs.readFileSync(HERO_ARROW_FONT_FILE));
  } catch {
    heroArrowFont = null;
  }

  return heroArrowFont;
}

async function loadFonts() {
  if (!fontsPromise) {
    fontsPromise = Promise.all(
      Object.entries(FONT_URLS).map(async ([key, url]) => {
        const response = await fetch(url);
        return [key, parseFont(await response.arrayBuffer())];
      })
    ).then(Object.fromEntries);
  }

  return fontsPromise;
}

function getPlacement(char, kind) {
  const style = kind === "solid" ? "solid" : "dashed";
  return metrics[style]?.[char] ?? DEFAULT_PLACEMENT;
}

function toPathData(font, char, placement) {
  return font.getPath(char, placement.x, placement.y, placement.fontSize).toPathData(2);
}

export async function getLetterPath(char, kind) {
  const fonts = await loadFonts();
  return toPathData(fonts[kind === "solid" ? "solid" : "dashed"], char, getPlacement(char, kind));
}

export async function getHeroLetterPath(char) {
  const arrowFont = loadHeroArrowFont();
  const placement = getPlacement(char, "solid");

  if (arrowFont) {
    return { pathData: toPathData(arrowFont, char, placement) };
  }

  return { pathData: await getLetterPath(char, "solid") };
}

export async function loadWorksheetPaths(char) {
  const [hero, solid, dotted] = await Promise.all([
    getHeroLetterPath(char),
    getLetterPath(char, "solid"),
    getLetterPath(char, "dotted")
  ]);

  return {
    hero: hero.pathData,
    solid,
    dotted
  };
}
