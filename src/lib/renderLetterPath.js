import { parse as parseFont } from "opentype.js/dist/opentype.mjs";

import { dottedFontFor, fontFor } from "./fonts.js";
import metrics from "./letterMetrics.json" with { type: "json" };

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const VIEW = 100;
const { shared } = metrics;
const cache = new Map();

function loadFont(path) {
  if (!cache.has(path)) {
    cache.set(
      path,
      fetch(`${BASE}/${path}`).then(async (res) => {
        if (!res.ok) throw new Error(`Font ${res.status}: ${path}`);
        return parseFont(await res.arrayBuffer());
      })
    );
  }
  return cache.get(path);
}

/** Serialize path commands without opentype's toPathData (NaN on some dotted glyphs). */
function toSvgPath(path, decimals = 2) {
  const r = (n) => {
    const v = Number(n);
    return Number.isFinite(v) ? +v.toFixed(decimals) : 0;
  };
  let d = "";
  for (const c of path.commands) {
    switch (c.type) {
      case "M":
        d += `M${r(c.x)} ${r(c.y)}`;
        break;
      case "L":
        d += `L${r(c.x)} ${r(c.y)}`;
        break;
      case "C":
        d += `C${r(c.x1)} ${r(c.y1)} ${r(c.x2)} ${r(c.y2)} ${r(c.x)} ${r(c.y)}`;
        break;
      case "Q":
        d += `Q${r(c.x1)} ${r(c.y1)} ${r(c.x)} ${r(c.y)}`;
        break;
      case "Z":
        d += "Z";
        break;
      default:
        break;
    }
  }
  return d;
}

/** Font size: caps/digits fill top→baseline; lowercase body fills upper→baseline. */
function fontSizeFor(char) {
  if (char >= "a" && char <= "z") return shared?.fontSizeX ?? shared?.fontSize ?? 84;
  return shared?.fontSizeCap ?? shared?.fontSize ?? 84;
}

/** Center glyph in the 100×100 practice viewBox. */
function pathData(font, char) {
  const y = shared?.y ?? 92;
  const fontSize = fontSizeFor(char);
  const { x1, x2 } = font.getPath(char, 0, y, fontSize).getBoundingBox();
  const w = x2 - x1;
  const x = w ? (VIEW - w) / 2 - x1 : 50;
  return toSvgPath(font.getPath(char, x, y, fontSize));
}

export async function loadWorksheetPaths(char) {
  const [solid, dotted] = await Promise.all([
    loadFont(fontFor(char)),
    loadFont(dottedFontFor(char))
  ]);
  return {
    letter: pathData(solid, char),
    dotted: pathData(dotted, char)
  };
}
