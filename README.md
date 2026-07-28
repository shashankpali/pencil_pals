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
| `npm run generate-hero-glyphs` | Regenerate hero letter + arrow data |
| `npm run check-hero-glyphs` | Show hero glyph coverage (A–Z, 0–9) |

## Project layout

- `app/` — Next.js website (form, preview, print)
- `src/lib/` — Worksheet logic, fonts, hero glyphs
- `public/fonts/` — Custom hero arrow font (optional)
- `BRAINSTORMING.md` — Product notes and roadmap
