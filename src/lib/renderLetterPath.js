import { parse as parseFont } from "opentype.js/dist/opentype.mjs";

import { FONT_URLS } from "./fonts.js";
import metrics from "./letterMetrics.json" with { type: "json" };

const DEFAULT_PLACEMENT = { x: 50, y: 92, fontSize: 84 };
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

let fontsPromise;
let heroArrowFont;
let heroArrowFontPromise;

async function loadHeroArrowFont() {
  if (heroArrowFont !== undefined) {
    return heroArrowFont;
  }

  if (!heroArrowFontPromise) {
    heroArrowFontPromise = (async () => {
      try {
        const response = await fetch(`${BASE_PATH}/fonts/hero-arrows.woff`);

        if (!response.ok) {
          throw new Error("Hero arrow font not found");
        }

        heroArrowFont = parseFont(await response.arrayBuffer());
      } catch {
        heroArrowFont = null;
      }

      return heroArrowFont;
    })();
  }

  return heroArrowFontPromise;
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
  const arrowFont = await loadHeroArrowFont();
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
