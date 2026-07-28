import { buildWorksheetSpec } from "./buildWorksheetSpec.js";
import { expandCharacters } from "./expandCharacters.js";

export function buildWorksheetBatch(text, { includeLowercase = true, unique = true } = {}) {
  const chars = expandCharacters(text, includeLowercase, unique);
  const specs = chars.map(buildWorksheetSpec);

  return { chars, specs };
}
