# Pencil Pals — Brainstorming

> A screen-free printable handwriting project that helps children build letter and number formation through guided paper practice.

---

## 1. Problem Statement

Many kids struggle with handwriting: letter formation, spacing, sizing, grip, and consistency. Parents and teachers often need materials that are:

- **Simple** to print and use right away
- **Instructional** without feeling strict or overwhelming
- **Age-appropriate** for early writers with developing fine motor skills
- **Reusable** across letters, numbers, and later words
- **Screen-free** so practice happens on paper, not on a device

**Core question:** How might we make handwriting practice feel structured, calm, and playful while keeping children away from screens?

---

## 2. Phase 1 Direction

### Core decision

Phase 1 is **not** a kid-facing app.

The child experience is:

- print an A4 worksheet
- trace and write on paper
- optionally color one related image

The software experience is:

- visit a simple website
- input letters/numbers
- generate printable A4 worksheets
- export print-ready PDF/PNG files

### Product shape

This is best thought of as a **parent/teacher worksheet generator website**, not a kid handwriting app.

---

## 3. Target Users

| User | Needs |
|------|-------|
| **Kids (ages 4–8)** | Big clear guides, short sessions, encouragement, low clutter |
| **Parents** | Ready-to-print sheets, no setup friction, visible progress |
| **Teachers / tutors** | Reusable worksheets, customizable character sets, easy batch generation |

### Age bands (initial focus)

- **Pre-K / K (4–6):** Large tracing, basic strokes, uppercase/lowercase familiarity
- **Early elementary (6–8):** More independent writing, number practice, spacing control

---

## 4. Product Vision

**One-liner:** Generate calm, print-ready handwriting worksheets that move kids from tracing to confident independent writing.

**Success looks like:**

- A parent can print and use a sheet immediately
- A child can complete a session in 5–10 minutes
- The page feels clear, not cluttered
- Support fades row by row: trace -> dotted -> blank
- Kids build muscle memory on paper, not on screens

---

## 5. Learning & Pedagogy

### Principles

1. **Stroke order matters** — teach correct formation early
2. **Scaffold then fade** — heavy guidance first, independence later
3. **Short bursts** — 5–10 minute sessions work best
4. **Low visual clutter** — kids should focus on the letter, not the page design
5. **Large to standard size** — begin bigger, then reduce gradually
6. **Positive reinforcement** — celebrate effort, not perfection
7. **Multisensory support** — trace, say the stroke cue, write, color

### Worksheet learning flow

```text
See big model -> Follow arrows -> Trace solid -> Trace dotted -> Write from memory -> Finish with confidence
```

---

## 6. Worksheet Design System

### A4 structure

Each printable sheet is a single **A4 page** designed for home printing with generous safe margins.

### Top section

- One **hero/title letter or number**
- **Stroke arrows** and optional stroke numbers
- Short cue like `A is for Apple`
- One **small outline image** related to the character

### Practice section

- Primary handwriting ruling:
  - top line
  - dashed midline
  - baseline
  - descender space when needed
- Row sizes start large and reduce gradually
- Row support fades from **solid -> dotted -> blank**

### Visual rules

- Keep the page calm and uncluttered
- Use one relevant image only
- Avoid decorative borders
- Use light guides and strong readability

---

## 7. Recommended Row Structure

### Row count

- **1 hero/demo row**
- **5 practice rows**

### Row sizing

Recommended beginner progression:

- Hero row: about **20 mm**
- Practice row 1: **18 mm**
- Practice row 2: **16 mm**
- Practice row 3: **15 mm**
- Practice row 4: **15 mm**
- Practice row 5: **15 mm**

Do **not** reduce below standard beginner size in Phase 1.

### Item count per row

Item count should grow slightly as the letters get smaller so space does not feel wasted:

| Row | Height | Item count | Pattern |
|-----|--------|------------|---------|
| Hero | ~20 mm | 1 | demo with arrows |
| Practice 1 | 18 mm | 6 | 2 solid, 2 dotted, 2 blank |
| Practice 2 | 16 mm | 7 | 2 solid, 2 dotted, 3 blank |
| Practice 3 | 15 mm | 8 | 2 solid, 2 dotted, 4 blank |
| Practice 4 | 15 mm | 8 | 2 solid, 2 dotted, 4 blank |
| Practice 5 | 15 mm | 8 | 2 solid, 2 dotted, 4 blank |

This gives a good balance of breathing room, repetition, and independent writing.

---

## 8. Input Model

The generator should accept a string of characters and expand them into printable sheets.

Example:

```js
let toBePrint = "ABCD1234"
let needSmallCase = true
```

Expected behavior:

- generate one sheet for each supported character
- if `needSmallCase` is `true`, expand letters into both uppercase and lowercase versions
- keep numbers as-is
- skip unsupported punctuation for now

Example expansion:

```js
"ABCD1234" + needSmallCase: true
=> ["A", "a", "B", "b", "C", "c", "D", "d", "1", "2", "3", "4"]
```

---

## 9. Content Model

Each printable character will eventually need:

- the character itself (`A`, `a`, `3`)
- type (`uppercase`, `lowercase`, `number`)
- cue text (`A is for Apple`)
- a simple image reference (`apple`)
- stroke-order metadata
- SVG or vector path data for trace and demo rendering
- ruling style (`uppercase`, `lowercase`, `descender`)

Example shape:

```json
{
  "char": "A",
  "type": "uppercase",
  "label": "A is for Apple",
  "image": "apple",
  "ruling": "uppercase",
  "strokes": []
}
```

---

## 10. Technical Approach

### Recommended Phase 1 stack

- **App framework:** Next.js
- **UI:** React
- **Generator logic:** plain JavaScript
- **Page layout:** HTML + CSS sized for A4
- **Vector content:** SVG for letters, arrows, and simple illustrations
- **Server-side export:** Playwright or Puppeteer for PDF/PNG output
- **Content source:** JSON files per character

### Why this stack

- easy to iterate on printable layout
- HTML/CSS is the fastest way to tune spacing visually
- SVG scales cleanly for printing
- Next.js gives a simple website for parents and teachers
- HTML/CSS is still the fastest way to tune spacing visually
- later PDF/PNG export can be automated without redesigning the content model

### Phase 1 technical goal

Start by generating:

1. expanded character list
2. worksheet spec per character
3. printable HTML preview per sheet
4. PDF/PNG export from the same page template

---

## 11. MVP Scope Proposal

**Goal:** Validate that parents can generate and print a worksheet quickly, and that kids can complete a 5-minute page comfortably.

**In scope**

- parent/teacher website with one-page input flow
- printable A4 worksheets
- letters and numbers
- uppercase/lowercase expansion
- one hero letter with arrows
- guided practice rows with primary ruling
- small related image
- HTML preview output
- PDF export
- PNG export

**Out of scope for MVP**

- kid-facing app
- real-time scoring
- accounts / cloud sync
- camera scanning
- classroom dashboards
- cursive
- full curriculum progression

---

## 12. Validation Checklist

When testing with 1–2 kids, observe:

- Do they understand the arrowed demo letter?
- Are the rows clear without verbal explanation?
- Does the standard size feel too big, too small, or right?
- Do they complete the page without fatigue?
- Does the image increase engagement without distraction?
- Do parents print it without confusion?

---

## 13. Next Steps

- [ ] Lock the A4 worksheet layout spec
- [ ] Create website input form
- [ ] Create a generator that expands input characters
- [ ] Create one sample sheet for `A`
- [ ] Create one sample sheet for `5`
- [ ] Add character metadata format
- [ ] Add HTML preview output
- [ ] Add PDF export
- [ ] Add PNG export
- [ ] Print test with 1–2 kids
- [ ] Tune row heights and spacing from real usage

---

## 14. Future Directions

Possible later phases:

- custom word sheets (`MOM`, names, spelling lists)
- themed worksheet packs
- progress packs / workbook bundles
- cursive pathway
- classroom batch generation

---

## 15. Project Name Candidates

- WriteRight Kids
- Trace & Shine
- Pencil Pals
- Handwriting Heroes
- Scribble School
- *(add more)*

---

*Last updated: July 28, 2026*
