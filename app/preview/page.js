import Link from "next/link";

import { parseWorksheetParams, worksheetBackParams } from "@/lib/params.js";
import { loadWorksheetPaths } from "@/lib/renderLetterPath.js";
import { buildWorksheetBatch } from "@/lib/worksheets.js";
import { HeroLetter } from "../ui/HeroLetter.js";
import { LetterGlyph } from "../ui/LetterGlyph.js";
import { PrintButton } from "../ui/PrintButton.js";

function Slot({ kind, paths }) {
  const pathData = kind === "blank" ? null : paths[kind];

  return (
    <div className={`practice-cell ${kind}`}>
      <div className="cell-midline" aria-hidden="true" />
      <LetterGlyph pathData={pathData} />
    </div>
  );
}

async function WorksheetPage({ spec }) {
  const paths = await loadWorksheetPaths(spec.char);

  return (
    <article className="worksheet-page">
      <header className="worksheet-header">
        <section className="hero-panel">
          <HeroLetter pathData={paths.hero} />
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
        {spec.rows.map((row) => (
          <div
            key={row.id}
            className="worksheet-row"
            style={{
              gridTemplateColumns: `repeat(${row.items}, minmax(0, 1fr))`,
              height: `${row.heightMm}mm`
            }}
          >
            {row.pattern.map((kind, index) => (
              <Slot key={`${row.id}-${kind}-${index}`} kind={kind} paths={paths} />
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
