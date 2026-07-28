# Pencil Pals

Screen-free printable handwriting worksheets for kids.

Parents and teachers enter letters or numbers, customize options, and print A4 practice sheets. Kids practice on paper — not on a screen.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Live demo:** [https://shashankpali.github.io/pencil_pals/](https://shashankpali.github.io/pencil_pals/)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build (local) |
| `npm run build:pages` | Static export for GitHub Pages |
| `npm run generate` | Write static HTML worksheets to `output/` |
| `npm run measure-fonts` | Regenerate `src/lib/letterMetrics.json` from CDN fonts |

## GitHub Pages

The site deploys automatically from `main` via GitHub Actions (`.github/workflows/deploy.yml`).

**One-time setup in your repo settings:**

1. Go to **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Merge to `main` — the workflow builds `out/` and publishes it

Local Pages preview:

```bash
npm run build:pages
npx serve out
```

Then open `http://localhost:3000/pencil_pals/` (use the `/pencil_pals/` path to match production).

## Tech stack

| Layer | Choice |
|-------|--------|
| App | Next.js 16 (App Router), React 19 |
| Language | JavaScript (ESM) |
| Layout | CSS with mm-based A4 sizing, `@media print` |
| Letter rendering | opentype.js → SVG paths (CF Second Son School; translucent for tracing) |
| Hero arrows (future) | Custom `public/fonts/hero-arrows.woff` |

Shared logic lives in `src/lib/` and is imported via `@/lib/*`.

## Project layout

```
app/           Next.js UI (form, preview, print)
src/lib/       Worksheet spec, character expansion, font paths
src/index.js   CLI static HTML generator
scripts/       Font measurement tooling
public/fonts/  Custom hero arrow font (when ready)
data/          Future per-character metadata
```

## How it works

1. User enters text (e.g. `AB12` or `AaBb`).
2. Input expands to supported characters as typed: `A, B, 1, 2` or `A, a, B, b`.
3. Each character gets one A4 worksheet spec with a hero letter and 10 practice rows.
4. Preview renders SVG letter paths; print uses the browser's save-as-PDF.

### Worksheet layout

Each sheet has:

- **Hero panel** — large demo letter (stroke arrows come from custom font when added)
- **Image panel** — draw & color prompt
- **10 practice rows** — solid → translucent fade → blank

| Row | Height | Items | Pattern |
|-----|--------|-------|---------|
| 1 | 18 mm | 6 | 2 solid, 4 translucent (0.35) |
| 2 | 16 mm | 7 | 1 solid, 6 translucent (0.35) |
| 3 | 15 mm | 8 | 8 translucent (0.35) |
| 4 | 15 mm | 8 | fade `0.35 → 0.00` |
| 5 | 15 mm | 8 | fade `0.30 → 0.00`, then 1 blank |
| 6–10 | 15 mm | 8 | continue ladder, rest blank |

## Product direction

**Phase 1** is a parent/teacher worksheet generator — not a kid-facing app.

| User | Need |
|------|------|
| Kids (4–8) | Clear guides, short sessions, low clutter |
| Parents | Print-ready sheets, no setup |
| Teachers | Reusable worksheets, batch generation |

**Learning flow:** see big model → trace solid → trace dotted → write from memory.

**Principles:** stroke order matters, scaffold then fade, 5–10 minute sessions, screen-free practice.

## MVP status

| Done | Planned |
|------|---------|
| Input form + preview | PDF/PNG export (Playwright) |
| A4 print layout | Per-character JSON in `data/characters/` |
| Typed letter/number sheets | Hero arrow font |
| SVG letter rendering | Themed packs, words, cursive |

## Hero arrow font

When ready, add `public/fonts/hero-arrows.woff` — the app loads it automatically for the hero demo letter. See `public/fonts/README.md` for glyph design rules and the practice-font license note.

## Roadmap

- Lock layout from real print tests with kids
- Add character metadata (cue text, images, stroke data)
- PDF/PNG export pipeline
- Custom word sheets and classroom batch generation

---

*Pencil Pals — calm, print-ready handwriting practice.*
