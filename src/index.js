import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { buildWorksheetBatch } from "./lib/worksheets.js";

const outputDir = new URL("../output/", import.meta.url);

function parseArgs(argv) {
  const args = { text: "A5", unique: true };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];

    if (token === "--text" && argv[i + 1]) {
      args.text = argv[i + 1];
      i += 1;
      continue;
    }

    if (token === "--keep-duplicates") {
      args.unique = false;
    }
  }

  return args;
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function renderWorksheetHtml(spec) {
  const practiceRows = spec.rows
    .map((row) => {
      const slots = row.pattern
        .map((cell) => {
          const kind = typeof cell === "string" ? cell : cell.kind;
          return `<span class="slot slot-${kind}">${kind === "blank" ? "&nbsp;" : escapeHtml(spec.char)}</span>`;
        })
        .join("");

      return `
        <section class="practice-row" style="margin-bottom:5mm">
          <div class="row-guide" data-ruling="${spec.ruling}" style="position:relative;height:${row.heightMm}mm;margin-bottom:2mm">
            <div class="line top" style="position:absolute;left:0;right:0;top:0;border-top:0.35mm solid #cbd5e1"></div>
            <div class="line mid" style="position:absolute;left:0;right:0;top:50%;border-top:0.35mm dashed #cbd5e1"></div>
            <div class="line base" style="position:absolute;left:0;right:0;bottom:0;border-top:0.35mm solid #cbd5e1"></div>
          </div>
          <div class="slots" style="display:grid;grid-template-columns:repeat(${row.items},1fr);gap:2mm">${slots}</div>
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
      @font-face { font-family: "Sassoon Primary"; src: url("fonts/sassoon-primary-regular.otf") format("opentype"); }
      @font-face { font-family: "Primer Print"; src: url("fonts/primer-print.otf") format("opentype"); unicode-range: U+0030-0039; }
      body { margin: 0; font-family: "Primer Print", "Sassoon Primary", "Segoe UI", sans-serif; color: #1f2937; background: white; }
      .page { width: 210mm; min-height: 297mm; padding: ${spec.page.marginMm}mm; }
      .header { display: grid; grid-template-columns: 1.6fr 1fr; gap: 8mm; margin-bottom: 8mm; }
      .hero { border: 1px solid #d1d5db; border-radius: 6mm; padding: 6mm; min-height: 48mm; }
      .hero-letter { font-size: 54mm; line-height: 1; color: #9ca3af; }
      .hero-meta { margin-top: 4mm; font-size: 4mm; }
      .image-box { border: 1px dashed #cbd5e1; border-radius: 6mm; padding: 6mm; min-height: 48mm; }
      .image-title { font-size: 4.2mm; font-weight: 700; margin-bottom: 3mm; }
      .image-placeholder { min-height: 28mm; display: flex; align-items: center; justify-content: center; border: 1px dashed #d1d5db; color: #94a3b8; font-size: 4mm; }
      .slot { height: 14mm; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 2mm; font-weight: 600; font-size: 10mm; }
      .slot-solid { color: #9ca3af; }
      .slot-dotted { color: transparent; -webkit-text-stroke: 0.25mm #9ca3af; opacity: 0.7; }
      .slot-blank { border-bottom: 0.3mm solid #cbd5e1; }
      .footer { margin-top: 6mm; font-size: 3.7mm; color: #64748b; }
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
          <div class="image-placeholder" aria-hidden="true"></div>
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
  const { chars, specs } = buildWorksheetBatch(args.text, {
    unique: args.unique
  });

  await mkdir(outputDir, { recursive: true });

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
