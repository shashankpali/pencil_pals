# Pencil Pals

Screen-free printable handwriting worksheets for kids.

Parents and teachers enter letters or numbers and print A4 practice sheets. Kids practice on paper — not on a screen.

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
| `npm run build` | Static production build |
| `npm run build:pages` | Static export with GitHub Pages `basePath` |
| `npm run generate` | CLI text-preview HTML worksheets → `output/` |
| `npm run measure-fonts` | Regenerate `letterMetrics.json` from local practice font |

## GitHub Pages

Deploys from `main` via `.github/workflows/deploy.yml`.

1. **Settings → Pages → Source:** GitHub Actions  
2. Push/merge to `main`

Local check: `npm run build:pages && npx serve out` → open `/pencil_pals/`.

## Tech stack

| Layer | Choice |
|-------|--------|
| App | Next.js 16 (static export), React 19 |
| Language | JavaScript (ESM) |
| Layout | CSS mm-based A4 + `@media print` |
| Letters / digits | Sassoon Primary + Primer Print → SVG via opentype.js |
| Trace | Sassoon Infant Dotted (letters) + Primer Print Dotted (digits) |
| Hosting | GitHub Pages |

Shared logic: `src/lib/` via `@/lib/*`.

## Project layout

```
app/           UI (form, preview, print)
src/lib/       Spec, fonts, SVG paths
src/index.js   Optional CLI HTML stub
scripts/       Font metrics
public/fonts/  Sassoon Primary + Infant Dotted + Primer Print (+ Dotted)
data/          Future per-character metadata
```

## How it works

1. Enter text (e.g. `AB12` or `AaBb`) — characters used as typed.
2. Each character gets one A4 sheet: hero + draw panel + 10 practice rows.
3. Browser preview; print / save PDF.

### Worksheet rows

| Row | Height | Items | Pattern |
|-----|--------|-------|---------|
| 1 | 18 mm | 6 | 2 solid, 4 dotted |
| 2 | 16 mm | 7 | 1 solid, 6 dotted |
| 3 | 15 mm | 8 | 8 dotted |
| 4 | 15 mm | 8 | 8 dotted |
| 5–10 | 15 mm | 8 | one fewer dotted each row; rest blank |

Guide lines: four-line ruler (solid top & bottom, dashed middle two), equally spaced. Capitals scale to top→baseline; small letters scale to upper mid→baseline.

## Product direction

**Phase 1:** parent/teacher worksheet generator — not a kid-facing app.

| User | Need |
|------|------|
| Kids (4–8) | Clear guides, short sessions, low clutter |
| Parents | Print-ready sheets, no setup |
| Teachers | Reusable worksheets, batch generation |

**Learning flow:** see big model → trace solid → dotted support → write from memory.

**Principles:** stroke order matters, scaffold then release, 5–10 minute sessions, screen-free practice.

**Fonts:** Sassoon Primary Regular (solid letters), Primer Print (solid digits), Sassoon Infant Dotted (letter traces), Primer Print Dotted (digit traces). Only `primer-print-dotted.otf` is generated locally; other font files are used as provided.

## MVP status

| Done | Planned |
|------|---------|
| Form + preview + print | PDF/PNG export |
| A4 layout + guide sync | Per-character JSON in `data/` |
| Typed letters/numbers | Words, cursive, themed packs |
| Dotted trace rows | Classroom batch generation |

## Roadmap

- Print-test layout with kids
- Character metadata (cues, images, strokes)
- Classroom batch generation

---

*Pencil Pals — calm, print-ready handwriting practice.*
