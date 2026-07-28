import { buildWorksheetSpec } from "./buildWorksheetSpec.js";
import { expandCharacters } from "./expandCharacters.js";

export function buildWorksheetBatch(text, { unique = true } = {}) {
  const chars = expandCharacters(text, unique);
  return { chars, specs: chars.map(buildWorksheetSpec) };
}
