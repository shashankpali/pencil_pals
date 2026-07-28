export function HeroLetter({ pathData }) {
  return (
    <div className="hero-letter-box">
      <div className="hero-topline" aria-hidden="true" />
      <div className="hero-midline" aria-hidden="true" />
      <div className="hero-baseline" aria-hidden="true" />
      <svg
        className="hero-letter-glyph"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        overflow="visible"
        aria-hidden="true"
      >
        {pathData ? <path d={pathData} fill="currentColor" className="hero-letter-path" /> : null}
      </svg>
    </div>
  );
}
