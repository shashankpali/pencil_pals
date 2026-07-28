# Hero arrow font (custom)

Stroke-order arrows for the **hero panel only** — uppercase **A–Z** and digits **0–9** (36 glyphs).

Practice rows keep using Print Bold / Print Dashed from CDN.

## How to add

When the font is ready, place it here:

`public/fonts/hero-arrows.woff`

The app will load it automatically for the hero demo letter. No extra code changes needed.

## Design rules

| Line | Y position | Style |
|------|------------|--------|
| Top | ~8 | solid (drawn in worksheet CSS, not in glyph) |
| Mid | 50 | dashed (worksheet CSS) |
| Baseline | 92 | solid (worksheet CSS) |

Each glyph should include:

- Letter shape (match Print Bold proportions)
- Numbered stroke arrows baked into the glyph art

## Suggested build order

1. **H** — template (3 strokes)
2. **E, F, L, T, I** — mostly straight strokes
3. **O, C, D, G, Q** — curves
4. **A, B, K, M, N, P, R, S, U, V, W, X, Y, Z**
5. **0–9**

## Tools

- [FontForge](https://fontforge.org/) (free)
- [Inkscape](https://inkscape.org/) — draw and export paths
