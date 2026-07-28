export function LetterGlyph({ pathData, className = "letter-glyph" }) {
  if (!pathData) {
    return null;
  }

  return (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path d={pathData} fill="currentColor" />
    </svg>
  );
}
