# Pencil Pals

Screen-free printable handwriting worksheets for kids.

Parents and teachers enter letters or numbers, customize options, and print A4 practice sheets. Kids practice on paper — not on a screen.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run generate` | Generate static HTML worksheets in `output/` |

## Project layout

- `app/` — Next.js website (form, preview, print)
- `src/lib/` — Worksheet logic and fonts
- `public/fonts/` — Custom hero arrow font (add `hero-arrows.woff` when ready)
- `BRAINSTORMING.md` — Product notes and roadmap

## Hero arrow font (future)

Stroke-order arrows for the hero panel will come from a custom font at `public/fonts/hero-arrows.woff`. Once added, the app loads it automatically for the demo letter. See `public/fonts/README.md`.
