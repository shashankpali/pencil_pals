export const HERO_GLYPH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function isHeroGlyphChar(char) {
  return HERO_GLYPH_CHARS.includes(char);
}
