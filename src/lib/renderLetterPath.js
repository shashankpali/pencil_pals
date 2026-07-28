import { parse as parseFont } from "opentype.js/dist/opentype.mjs";

import { HERO_ARROW_FONT, PRACTICE_FONT } from "./fonts.js";
import metrics from "./letterMetrics.json" with { type: "json" };

const DEFAULT_PLACEMENT = { x: 50, y: 92, fontSize: 84 };
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

let practiceFontPromise;
let heroArrowFont;
let heroArrowFontPromise;

function fontUrl(relativePath) {
  return `${BASE_PATH}/${relativePath}`;
}

async function loadPracticeFont() {
  if (!practiceFontPromise) {
    practiceFontPromise = (async () => {
      const response = await fetch(fontUrl(PRACTICE_FONT));

      if (!response.ok) {
        throw new Error(`Failed to load practice font (${response.status})`);
      }

      return parseFont(await response.arrayBuffer());
    })();
  }

  return practiceFontPromise;
}

async function loadHeroArrowFont() {
  if (heroArrowFont !== undefined) {
    return heroArrowFont;
  }

  if (!heroArrowFontPromise) {
    heroArrowFontPromise = (async () => {
      try {
        const response = await fetch(fontUrl(HERO_ARROW_FONT));

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

function getPlacement(char) {
  return metrics[char] ?? DEFAULT_PLACEMENT;
}

function toPathData(font, char, placement) {
  return font.getPath(char, placement.x, placement.y, placement.fontSize).toPathData(2);
}

export async function getLetterPath(char) {
  const font = await loadPracticeFont();
  return toPathData(font, char, getPlacement(char));
}

export async function getHeroLetterPath(char) {
  const arrowFont = await loadHeroArrowFont();
  const placement = getPlacement(char);

  if (arrowFont) {
    return { pathData: toPathData(arrowFont, char, placement) };
  }

  return { pathData: await getLetterPath(char) };
}

export async function loadWorksheetPaths(char) {
  const [hero, letter] = await Promise.all([getHeroLetterPath(char), getLetterPath(char)]);

  return {
    hero: hero.pathData,
    solid: letter,
    dotted: letter
  };
}
