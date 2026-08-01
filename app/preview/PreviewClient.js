"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { parseWorksheetSearchParams, worksheetBackParams } from "@/lib/params.js";
import metrics from "@/lib/letterMetrics.json";
import { loadWorksheetPaths } from "@/lib/renderLetterPath.js";
import { buildWorksheetBatch } from "@/lib/worksheets.js";
import { GuideLines } from "../ui/GuideLines.js";
import { HeroLetter } from "../ui/HeroLetter.js";
import { LetterGlyph } from "../ui/LetterGlyph.js";
import { PrintButton } from "../ui/PrintButton.js";

const guideStyle = {
  "--guide-top": `${metrics.shared.guideTop}%`,
  "--guide-upper": `${metrics.shared.guideUpper}%`,
  "--guide-lower": `${metrics.shared.guideLower}%`,
  "--guide-bottom": `${metrics.shared.guideBottom}%`
};

function Slot({ kind, letter, dotted }) {
  const path =
    kind === "blank" ? null : kind === "dotted" ? dotted : letter;
  return (
    <div className={`practice-cell ${kind}`}>
      <div className="practice-letter-frame">
        <LetterGlyph pathData={path} preserveAspectRatio="none" />
      </div>
    </div>
  );
}

function WorksheetPage({ spec, paths }) {
  return (
    <article className="worksheet-page" style={guideStyle}>
      <header className="worksheet-header">
        <section className="hero-panel">
          <HeroLetter pathData={paths.letter} />
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
            <div className="worksheet-row-guides">
              <GuideLines />
            </div>
            {row.pattern.map((cell, index) => (
              <Slot
                key={`${row.id}-${cell.kind}-${index}`}
                kind={cell.kind}
                letter={paths.letter}
                dotted={paths.dotted}
              />
            ))}
          </div>
        ))}
      </section>
    </article>
  );
}

export function PreviewClient() {
  const searchParams = useSearchParams();
  const { text } = parseWorksheetSearchParams(searchParams);
  const { chars, specs } = buildWorksheetBatch(text);
  const backHref = `/?${worksheetBackParams({ text })}`;

  const [worksheets, setWorksheets] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!specs.length) {
        setWorksheets([]);
        setError(null);
        return;
      }

      setWorksheets(null);
      setError(null);

      try {
        const loaded = await Promise.all(
          specs.map(async (spec) => ({
            spec,
            paths: await loadWorksheetPaths(spec.char)
          }))
        );
        if (!cancelled) setWorksheets(loaded);
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load worksheets.");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [text]);

  const title = chars.length
    ? `${chars.length} worksheet${chars.length > 1 ? "s" : ""}`
    : "No supported characters";

  return (
    <main className="preview-root">
      <section className="preview-toolbar">
        <div>
          <p className="eyebrow">Pencil Pals</p>
          <h1>{title}</h1>
          <p>
            Input: <code>{text}</code>
          </p>
        </div>
        <div className="toolbar-actions">
          <PrintButton />
          <Link href={backHref}>Back</Link>
        </div>
      </section>

      {error ? (
        <section className="empty-state cardish">
          <p>{error}</p>
        </section>
      ) : null}

      {!error && worksheets === null && specs.length ? (
        <section className="empty-state cardish">
          <p>Loading worksheets…</p>
        </section>
      ) : null}

      {!error && worksheets?.length ? (
        <section className="preview-stack">
          {worksheets.map(({ spec, paths }) => (
            <WorksheetPage key={spec.char} spec={spec} paths={paths} />
          ))}
        </section>
      ) : null}

      {!error && worksheets && !worksheets.length ? (
        <section className="empty-state cardish">
          <p>No supported letters or numbers were found in the input.</p>
          <p>
            Try something like <code>AB12</code>.
          </p>
        </section>
      ) : null}
    </main>
  );
}
