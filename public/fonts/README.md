# Fonts

## Practice font — CF Second Son School

File: `second-son-school.ttf`  
Source: [DaFont — CF Second Son School](https://www.dafont.com/cf-second-son-school.font) by Cloutierfontes

**License:** Free for **personal / non-profit** use only.  
Commercial / for-profit use requires buying the commercial version from the author:  
https://www.cloutierfontes.ca/second-son-school.html

Pencil Pals currently uses this under personal/free use. Do not ship a commercial product with this PERSONAL file without a commercial license.

Solid and trace (“dotted”) cells use the **same** glyph; trace cells are shown translucent in CSS.

### Built-in guide lines

Glyphs include midline + baseline bands. Worksheet CSS matches them via:

| Guide | CSS var | Position | Style |
|-------|---------|----------|-------|
| Cap / top | `--guide-top` | 25.2% | dashed |
| Mid | `--guide-mid` | 43.2% | solid |
| Baseline | `--guide-base` | 91.3% | solid |

`npm run measure-fonts` locks letter placement to those mid/base positions.

## Hero arrow font (custom, optional)

Stroke-order arrows for the **hero panel only** — uppercase **A–Z** and digits **0–9**.

When ready, place:

`public/fonts/hero-arrows.woff`

The app loads it automatically for the hero demo letter.

## Remeasure after changing fonts

```bash
npm run measure-fonts
```
