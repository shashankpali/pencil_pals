"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { parseWorksheetSearchParams, worksheetBackParams } from "@/lib/params.js";
import { loadWorksheetPaths } from "@/lib/renderLetterPath.js";
import { buildWorksheetBatch } from "@/lib/worksheets.js";
import { HeroLetter } from "../ui/HeroLetter.js";
import { LetterGlyph } from "../ui/LetterGlyph.js";
import { PrintButton } from "../ui/PrintButton.js";

function Slot({ kind, opacity, paths }) {
  const pathData = kind === "blank" ? null : paths[kind];

  return (
    <div className={`practice-cell ${kind}`}>
      <div className="practice-letter-frame">
        <div className="cell-topline" aria-hidden="true" />
        <div className="cell-midline" aria-hidden="true" />
        <div className="cell-baseline" aria-hidden="true" />
        <LetterGlyph
          pathData={pathData}
          preserveAspectRatio="none"
          style={opacity == null ? undefined : { opacity }}
        />
      </div>
    </div>
  );
}

function WorksheetPage({ spec, paths }) {
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
            {row.pattern.map((cell, index) => (
              <Slot
                key={`${row.id}-${cell.kind}-${index}`}
                kind={cell.kind}
                opacity={cell.opacity}
                paths={paths}
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
  const backParams = worksheetBackParams({ text });

  const [worksheets, setWorksheets] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
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

        if (!cancelled) {
          setWorksheets(loaded);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load worksheets.");
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [text]);

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
            <WorksheetPage key={`${spec.type}-${spec.char}`} spec={spec} paths={paths} />
          ))}
        </section>
      ) : null}

      {!error && worksheets && !worksheets.length ? (
        <section className="empty-state cardish">
          <p>No supported letters or numbers were found in the input.</p>
          <p>Try something like <code>AB12</code>.</p>
        </section>
      ) : null}
    </main>
  );
}
