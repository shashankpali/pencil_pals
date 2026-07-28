# Hero arrow font (custom)

Stroke-order arrows for the **hero panel only** — uppercase **A–Z** and digits **0–9** (36 glyphs).

Practice rows keep using Print Bold / Print Dashed from CDN.

## Two ways to add glyphs

### 1. SVG paths in JSON (good while designing)

Add one glyph at a time to `src/lib/heroGlyphs.json`:

```json
{
  "H": "M27 10 L27 90 M73 10 L73 90 M40 30 L60 30 ...",
  "A": "M50 8 L24 90 ..."
}
```

- Draw in Inkscape / Figma on a **100×100** canvas
- Baseline at **y = 92**, midline at **y = 50**, cap height near **y = 8**
- Export as a single combined path (`d` attribute)
- Check progress: `node scripts/check-hero-glyphs.mjs`

### 2. Compiled font (final deliverable)

When all 36 glyphs are ready, build one font file:

`public/fonts/hero-arrows.woff`

The app loads this automatically. JSON entries override the font for that character (useful for testing one letter at a time).

## Design rules

| Line | Y position | Style |
|------|------------|--------|
| Top | ~8 | solid (drawn in worksheet CSS, not in glyph) |
| Mid | 50 | dashed (worksheet CSS) |
| Baseline | 92 | solid (worksheet CSS) |

Each glyph should include:

- Letter shape (match Print Bold proportions)
- Numbered stroke arrows
- Arrows **inside** the glyph art, not as a separate overlay

## Suggested build order

1. **H** — template (3 strokes)
2. **E, F, L, T, I** — mostly straight strokes
3. **O, C, D, G, Q** — curves
4. **A, B, K, M, N, P, R, S, U, V, W, X, Y, Z**
5. **0–9**

## Tools

- [FontForge](https://fontforge.org/) (free) — compile JSON/SVG work into `.woff`
- [Inkscape](https://inkscape.org/) — draw and export paths

## License

This is your own font — no third-party license needed for the hero arrow glyphs you create.
