import fs from "node:fs";
import path from "node:path";

import { parse as parseFont } from "opentype.js/dist/opentype.mjs";

import { FONT_URLS, HERO_ARROW_FONT } from "./fonts.js";
import metrics from "./letterMetrics.json" with { type: "json" };

const DEFAULT_PLACEMENT = { x: 50, y: 92, fontSize: 84 };
const HERO_ARROW_FONT_FILE = path.join(process.cwd(), HERO_ARROW_FONT);

let fontsPromise = null;
let heroArrowFont;

function loadHeroArrowFontFromDisk() {
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
    ).then((entries) => Object.fromEntries(entries));
  }

  return fontsPromise;
}

export function getLetterPlacement(char, kind) {
  const style = kind === "solid" ? "solid" : "dashed";
  return metrics[style]?.[char] ?? DEFAULT_PLACEMENT;
}

export async function getLetterPath(char, kind) {
  const fonts = await loadFonts();
  const style = kind === "solid" ? "solid" : "dashed";
  const placement = getLetterPlacement(char, kind);

  return fonts[style].getPath(char, placement.x, placement.y, placement.fontSize).toPathData(2);
}

export async function getHeroLetterPath(char) {
  const arrowFont = loadHeroArrowFontFromDisk();

  if (arrowFont) {
    const placement = getLetterPlacement(char, "solid");
    return {
      pathData: arrowFont.getPath(char, placement.x, placement.y, placement.fontSize).toPathData(2)
    };
  }

  return { pathData: await getLetterPath(char, "solid") };
}
