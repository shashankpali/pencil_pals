import Link from "next/link";

import { buildWorksheetSpec } from "../../src/lib/buildWorksheetSpec.js";
import { expandCharacters } from "../../src/lib/expandCharacters.js";
import { getStrokeLabelPosition } from "../../src/lib/heroStrokeGuides.js";
import { getHeroLetterPath, getLetterPath } from "../../src/lib/renderLetterPath.js";
import { PrintButton } from "../ui/PrintButton.js";

function getQueryValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

function getPrintableRows(spec) {
  return spec.rows.filter((row) => row.id !== "hero");
}

function LetterGlyph({ pathData }) {
  if (!pathData) {
    return null;
  }

  return (
    <svg className="letter-glyph" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path d={pathData} fill="currentColor" />
    </svg>
  );
}

function HeroLetter({ pathData, guides, markerId }) {
  const arrowMarker = `url(#${markerId})`;

  return (
    <div className="hero-letter-box">
      <div className="hero-topline" aria-hidden="true" />
      <div className="hero-midline" aria-hidden="true" />
      <div className="hero-baseline" aria-hidden="true" />
      <svg className="hero-letter-glyph" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <marker id={markerId} markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L5,2.5 L0,5 Z" fill="currentColor" />
          </marker>
        </defs>

        {pathData ? <path d={pathData} fill="currentColor" className="hero-letter-path" /> : null}

        {guides.map((stroke) => {
          const label = getStrokeLabelPosition(stroke);

          return (
            <g key={stroke.num} className="stroke-guide">
              {stroke.d ? (
                <path
                  d={stroke.d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  markerEnd={arrowMarker}
                />
              ) : (
                <line
                  x1={stroke.x1}
                  y1={stroke.y1}
                  x2={stroke.x2}
                  y2={stroke.y2}
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  markerEnd={arrowMarker}
                />
              )}
              <text x={label.x} y={label.y} className="stroke-number" textAnchor="middle">
                {stroke.num}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Slot({ kind, pathData }) {
  return (
    <div className={`practice-cell ${kind}`}>
      <div className="cell-midline" aria-hidden="true" />
      <LetterGlyph pathData={pathData} />
    </div>
  );
}

async function WorksheetPage({ spec, showArrows }) {
  const { pathData: heroPathData, guides: heroGuides, hasArrows } = await getHeroLetterPath(spec.char, {
    includeArrows: showArrows
  });
  const practiceRows = getPrintableRows(spec);
  const rows = await Promise.all(
    practiceRows.map(async (row) => ({
      ...row,
      slots: await Promise.all(
        row.pattern.map(async (kind, index) => ({
          key: `${row.id}-${kind}-${index}`,
          kind,
          pathData: kind === "blank" ? null : await getLetterPath(spec.char, kind)
        }))
      )
    }))
  );

  return (
    <article className="worksheet-page">
      <header className="worksheet-header">
        <section className="hero-panel">
          <HeroLetter
            pathData={heroPathData}
            guides={heroGuides}
            markerId={`stroke-arrow-${spec.type}-${spec.char}`}
          />
          <div className="hero-copy">
            <strong>{spec.heroTitle}</strong>
            <span>{hasArrows ? "Follow the numbered arrows." : spec.heroSubtitle}</span>
          </div>
        </section>

        <aside className="image-panel">
          <div className="image-label">{spec.imagePrompt}</div>
          <div className="image-placeholder" aria-label="Drawing area" />
        </aside>
      </header>

      <section className="worksheet-rows">
        {rows.map((row) => (
          <div
            key={row.id}
            className="worksheet-row"
            style={{
              gridTemplateColumns: `repeat(${row.items}, minmax(0, 1fr))`,
              height: `${row.heightMm}mm`
            }}
          >
            {row.slots.map((slot) => (
              <Slot key={slot.key} kind={slot.kind} pathData={slot.pathData} />
            ))}
          </div>
        ))}
      </section>
    </article>
  );
}

export default async function PreviewPage({ searchParams }) {
  const params = await searchParams;
  const text = getQueryValue(params?.text) ?? "A5";
  const includeLowercase = getQueryValue(params?.lowercase) === "1";
  const showArrows = getQueryValue(params?.arrows) === "1";

  const chars = expandCharacters(text, includeLowercase, true);
  const specs = chars.map(buildWorksheetSpec);

  const backParams = new URLSearchParams({ text });
  if (includeLowercase) backParams.set("lowercase", "1");
  else backParams.set("lowercase", "0");
  if (showArrows) backParams.set("arrows", "1");
  else backParams.set("arrows", "0");

  return (
    <main className="preview-root">
      <section className="preview-toolbar">
        <div>
          <p className="eyebrow">Pencil Pals</p>
          <h1>{chars.length ? `${chars.length} worksheet${chars.length > 1 ? "s" : ""}` : "No supported characters"}</h1>
          <p>
            Input: <code>{text}</code>
          </p>
          <p>
            Guiding arrows: <code>{showArrows ? "on" : "off"}</code>
          </p>
        </div>

        <div className="toolbar-actions">
          <PrintButton />
          <Link href={`/?${backParams.toString()}`}>Back</Link>
        </div>
      </section>

      {specs.length ? (
        <section className="preview-stack">
          {specs.map((spec) => (
            <WorksheetPage key={`${spec.type}-${spec.char}`} spec={spec} showArrows={showArrows} />
          ))}
        </section>
      ) : (
        <section className="empty-state cardish">
          <p>No supported letters or numbers were found in the input.</p>
          <p>Try something like <code>AB12</code>.</p>
        </section>
      )}
    </main>
  );
}
