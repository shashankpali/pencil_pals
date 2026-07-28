import { GuideLines } from "./GuideLines.js";
import { LetterGlyph } from "./LetterGlyph.js";

export function HeroLetter({ pathData }) {
  return (
    <div className="hero-letter-box">
      <GuideLines />
      <LetterGlyph pathData={pathData} className="hero-letter-glyph" />
    </div>
  );
}
