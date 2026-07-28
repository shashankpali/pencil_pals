import Link from "next/link";

import { parseWorksheetParams, worksheetBackParams } from "@/lib/params.js";
import { getHeroLetterPath, getLetterPath } from "@/lib/renderLetterPath.js";
import { buildWorksheetBatch } from "@/lib/worksheets.js";
import { HeroLetter } from "../ui/HeroLetter.js";
import { PrintButton } from "../ui/PrintButton.js";

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

function Slot({ kind, pathData }) {
  return (
    <div className={`practice-cell ${kind}`}>
      <div className="cell-midline" aria-hidden="true" />
      <LetterGlyph pathData={pathData} />
    </div>
  );
}

async function WorksheetPage({ spec }) {
  const { pathData: heroPathData } = await getHeroLetterPath(spec.char);
  const rows = await Promise.all(
    spec.rows.map(async (row) => ({
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
          <HeroLetter pathData={heroPathData} />
          <div className="hero-copy">
            <strong>{spec.heroTitle}</strong>
            <span>{spec.heroSubtitle}</span>
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
  const { text, includeLowercase } = parseWorksheetParams(await searchParams);
  const { chars, specs } = buildWorksheetBatch(text, { includeLowercase });
  const backParams = worksheetBackParams({ text, includeLowercase });

  return (
    <main className="preview-root">
      <section className="preview-toolbar">
        <div>
          <p className="eyebrow">Pencil Pals</p>
          <h1>{chars.length ? `${chars.length} worksheet${chars.length > 1 ? "s" : ""}` : "No supported characters"}</h1>
          <p>
            Input: <code>{text}</code>
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
            <WorksheetPage key={`${spec.type}-${spec.char}`} spec={spec} />
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
