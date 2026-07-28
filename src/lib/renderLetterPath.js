import fs from "node:fs";
import path from "node:path";

import { parse as parseFont } from "opentype.js/dist/opentype.mjs";

import metrics from "./letterMetrics.json" with { type: "json" };

const FONT_URLS = {
  solid: "https://fonts.cdnfonts.com/s/20683/PrintBold_TT.woff",
  dashed: "https://fonts.cdnfonts.com/s/20683/PrintDashed_TT.woff"
};

const HERO_ARROW_FONT_FILE = path.join(process.cwd(), "public/fonts/hero-arrows.woff");

const DEFAULT = { x: 50, y: 92, fontSize: 84 };

let fontsPromise = null;
let heroArrowFont = undefined;

function loadHeroArrowFontFromDisk() {
  if (heroArrowFont !== undefined) {
    return heroArrowFont;
  }

  try {
    const buffer = fs.readFileSync(HERO_ARROW_FONT_FILE);
    heroArrowFont = parseFont(buffer);
  } catch {
    heroArrowFont = null;
  }

  return heroArrowFont;
}

export function hasHeroArrowFont() {
  return Boolean(loadHeroArrowFontFromDisk());
}

async function loadFonts() {
  if (!fontsPromise) {
    fontsPromise = Promise.all(
      Object.entries(FONT_URLS).map(async ([key, url]) => {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        return [key, parseFont(buffer)];
      })
    ).then((entries) => Object.fromEntries(entries));
  }

  return fontsPromise;
}

export function getLetterPlacement(char, kind) {
  const style = kind === "solid" ? "solid" : "dashed";
  return metrics[style]?.[char] ?? DEFAULT;
}

export async function getLetterPath(char, kind) {
  const fonts = await loadFonts();
  const style = kind === "solid" ? "solid" : "dashed";
  const font = fonts[style];
  const placement = getLetterPlacement(char, kind);

  return font.getPath(char, placement.x, placement.y, placement.fontSize).toPathData(2);
}

export async function getHeroLetterPath(char) {
  const arrowFont = loadHeroArrowFontFromDisk();

  if (arrowFont) {
    const placement = getLetterPlacement(char, "solid");

    return {
      pathData: arrowFont.getPath(char, placement.x, placement.y, placement.fontSize).toPathData(2)
    };
  }

  return {
    pathData: await getLetterPath(char, "solid")
  };
}
