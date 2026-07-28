import { LetterGlyph } from "./LetterGlyph.js";

export function HeroLetter({ pathData }) {
  return (
    <div className="hero-letter-box">
      <div className="hero-topline" aria-hidden="true" />
      <div className="hero-midline" aria-hidden="true" />
      <div className="hero-baseline" aria-hidden="true" />
      <LetterGlyph pathData={pathData} className="hero-letter-glyph" />
    </div>
  );
}
