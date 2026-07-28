import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { buildWorksheetSpec } from "./lib/buildWorksheetSpec.js";
import { expandCharacters } from "./lib/expandCharacters.js";

const outputDir = new URL("../output/", import.meta.url);

function parseArgs(argv) {
  const args = {
    toBePrint: "A5",
    needSmallCase: true,
    unique: true
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];

    if (token === "--text" && argv[i + 1]) {
      args.toBePrint = argv[i + 1];
      i += 1;
      continue;
    }

    if (token === "--no-small-case") {
      args.needSmallCase = false;
      continue;
    }

    if (token === "--keep-duplicates") {
      args.unique = false;
    }
  }

  return args;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderWorksheetHtml(spec) {
  const practiceRows = spec.rows
    .filter((row) => row.id !== "hero")
    .map((row) => {
      const slots = row.pattern
        .map((kind) => `<span class="slot slot-${kind}">${kind === "blank" ? "&nbsp;" : escapeHtml(spec.char)}</span>`)
        .join("");

      return `
        <section class="practice-row row-${row.id}">
          <div class="row-guide" data-ruling="${spec.ruling}">
            <div class="line top"></div>
            <div class="line mid"></div>
            <div class="line base"></div>
          </div>
          <div class="slots">${slots}</div>
        </section>
      `;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(spec.char)} worksheet</title>
    <style>
      @page { size: A4; margin: 0; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        color: #1f2937;
        background: white;
      }
      .page {
        width: 210mm;
        min-height: 297mm;
        padding: ${spec.page.marginMm}mm;
      }
      .header {
        display: grid;
        grid-template-columns: 1.6fr 1fr;
        gap: 8mm;
        margin-bottom: 8mm;
      }
      .hero {
        border: 1px solid #d1d5db;
        border-radius: 6mm;
        padding: 6mm;
        min-height: 48mm;
      }
      .hero-letter {
        font-size: 54mm;
        line-height: 1;
        color: #9ca3af;
      }
      .hero-meta {
        margin-top: 4mm;
        font-size: 4mm;
      }
      .image-box {
        border: 1px dashed #cbd5e1;
        border-radius: 6mm;
        padding: 6mm;
        min-height: 48mm;
      }
      .image-title {
        font-size: 4.2mm;
        font-weight: 700;
        margin-bottom: 3mm;
      }
      .image-placeholder {
        min-height: 28mm;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px dashed #d1d5db;
        color: #94a3b8;
        font-size: 4mm;
      }
      .practice-row {
        margin-bottom: 5mm;
      }
      .row-guide {
        position: relative;
        height: 18mm;
        margin-bottom: 2mm;
      }
      .row-practice-2 .row-guide { height: 16mm; }
      .row-practice-3 .row-guide,
      .row-practice-4 .row-guide,
      .row-practice-5 .row-guide { height: 15mm; }
      .line {
        position: absolute;
        left: 0;
        right: 0;
        border-top: 0.35mm solid #cbd5e1;
      }
      .line.top { top: 0; }
      .line.mid {
        top: 50%;
        border-top-style: dashed;
      }
      .line.base { bottom: 0; }
      .slots {
        display: grid;
        gap: 2mm;
      }
      .row-practice-1 .slots { grid-template-columns: repeat(6, 1fr); }
      .row-practice-2 .slots { grid-template-columns: repeat(7, 1fr); }
      .row-practice-3 .slots,
      .row-practice-4 .slots,
      .row-practice-5 .slots { grid-template-columns: repeat(8, 1fr); }
      .slot {
        height: 14mm;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding-bottom: 2mm;
        font-weight: 600;
      }
      .row-practice-1 .slot { font-size: 12mm; }
      .row-practice-2 .slot { font-size: 10.5mm; }
      .row-practice-3 .slot,
      .row-practice-4 .slot,
      .row-practice-5 .slot { font-size: 9.5mm; }
      .slot-solid { color: #9ca3af; }
      .slot-dotted {
        color: transparent;
        -webkit-text-stroke: 0.25mm #9ca3af;
        opacity: 0.7;
      }
      .slot-blank {
        border-bottom: 0.3mm solid #cbd5e1;
      }
      .footer {
        margin-top: 6mm;
        font-size: 3.7mm;
        color: #64748b;
      }
    </style>
  </head>
  <body>
    <main class="page">
      <section class="header">
        <div class="hero">
          <div class="hero-letter">${escapeHtml(spec.char)}</div>
          <div class="hero-meta">${escapeHtml(spec.heroTitle)} · ${escapeHtml(spec.heroSubtitle)}</div>
        </div>
        <div class="image-box">
          <div class="image-title">${escapeHtml(spec.imagePrompt)}</div>
          <div class="image-placeholder">${escapeHtml(spec.imageKey ?? "image")}</div>
        </div>
      </section>
      ${practiceRows}
      <footer class="footer">Pencil Pals — printable handwriting worksheet</footer>
    </main>
  </body>
</html>`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const chars = expandCharacters(args.toBePrint, args.needSmallCase, args.unique);

  await mkdir(outputDir, { recursive: true });

  const specs = chars.map(buildWorksheetSpec);
  const manifestPath = join(outputDir.pathname, "manifest.json");
  await writeFile(manifestPath, `${JSON.stringify({ input: args, chars, specs }, null, 2)}\n`, "utf8");

  for (const spec of specs) {
    const filePath = join(outputDir.pathname, `${spec.char}.html`);
    await writeFile(filePath, renderWorksheetHtml(spec), "utf8");
  }

  console.log(`Generated ${specs.length} worksheet previews in output/`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
