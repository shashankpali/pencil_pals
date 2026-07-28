export function LetterGlyph({ pathData, className = "letter-glyph", preserveAspectRatio = "xMidYMid meet", style }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio={preserveAspectRatio}
      style={style}
      aria-hidden="true"
    >
      {pathData ? <path d={pathData} fill="currentColor" /> : null}
    </svg>
  );
}
