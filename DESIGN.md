---
name: iankitkumar.in
description: Inspection Report register. Warm paper sheet, ink rules, IBM Plex Sans and Mono, blue for a passed verdict.

colors:
  sheet: "#F8F6EF"
  surface: "#FCFBF5"
  surface-2: "#F1EDE1"
  ink: "#1C1B16"
  ink-soft: "#3A382F"
  ink-muted: "#6E6A5C"
  rule: "#C9C4B6"
  rule-soft: "#E3DED0"
  rule-strong: "#1C1B16"
  verdict-pass: "#1B4B8F"
  verdict-open: "#7C2D12"
  print-canvas: "#FFFFFF"
  print-ink: "#000000"
  sheet-dark: "#171614"
  surface-dark: "#201E1A"
  surface-2-dark: "#2A2823"
  ink-dark: "#EFEBE0"
  ink-soft-dark: "#CBC5B7"
  ink-muted-dark: "#9C9486"
  rule-dark: "#3D3A33"
  rule-soft-dark: "#2E2C27"
  verdict-pass-dark: "#7FB0E3"
  verdict-open-dark: "#E08A6E"

typography:
  display:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.6vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.14
    letterSpacing: "-0.025em"
  page-display:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)"
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: "-0.02em"
  body:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.005em"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.78rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.1em"
  metric-value:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "1.35rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"

rounded:
  sm: "2px"
  md: "2px"
  lg: "3px"

spacing:
  s1: "0.25rem"
  s2: "0.5rem"
  s3: "0.75rem"
  s4: "1rem"
  s5: "1.5rem"
  s6: "2rem"
  s7: "3rem"
  s8: "4rem"
  s9: "6rem"

components:
  report-table:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  ruled-entry:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "1rem 1.25rem"
  verdict-pass:
    textColor: "{colors.verdict-pass}"
    typography: "{typography.label}"
  verdict-open:
    textColor: "{colors.verdict-open}"
    typography: "{typography.label}"
  label:
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
---

# iankitkumar.in — Design System

## Overview

A personal engineering portfolio for an infrastructure engineer moving into software and AI
engineering. The audience is a recruiter skimming for five seconds, then a hiring manager
reading for two minutes. Every visual decision serves that order.

The system is the **Inspection Report** register: a warm paper sheet, ink-black rules, IBM Plex
Sans for reading and IBM Plex Mono for measuring. The page is a Prüfprotokoll — letterhead,
report metadata, a measured-values table with verdicts, ruled entries, a verification stamp.
It was chosen by Ankit from five presented directions and replaced the earlier monochrome Geist
system. It is binding.

The metaphor is structural, not decorative. Every part of it carries content: the metadata block
states what was inspected, the measured-values table states what was found, the verdict column
states whether it passed, and the stamp closes the document. A report with no measurements in it
is decoration, which is why there is no invented tolerance column.

Light and dark are equal citizens. Both ship from the same token names, swapped at
`:root[data-theme='dark']`, with a `prefers-color-scheme` fallback for users who have not chosen.

## Colors

The paper carries the structure; the two accent hues carry verdicts and nothing else.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#F8F6EF` | `#171614` | The sheet |
| `--surface` | `#FCFBF5` | `#201E1A` | A raised block on the sheet |
| `--surface-2` | `#F1EDE1` | `#2A2823` | An inset band, table headers |
| `--fg` | `#1C1B16` | `#EFEBE0` | Headlines, primary text |
| `--fg-soft` | `#3A382F` | `#CBC5B7` | Body copy, summaries |
| `--muted` | `#6E6A5C` | `#9C9486` | Labels, captions, metadata keys |
| `--rule` | `#C9C4B6` | `#3D3A33` | Hairlines, table rules |
| `--rule-soft` | `#E3DED0` | `#2E2C27` | Faint separators |
| `--rule-strong` | `#1C1B16` | `#EFEBE0` | The document edge, heavy rules |
| `--accent` | `#1B4B8F` | `#7FB0E3` | A verdict that passed |
| `--brand` | `#7C2D12` | `#E08A6E` | The doctype, an open verdict |

Measured contrast on the sheet ground: light fg 15.95, fg-soft 10.87, muted 5.01, accent 7.93,
rust 8.67; dark fg 15.18, fg-soft 10.51, muted 6.02, accent 7.94, rust 6.91. Every text role
clears AA 4.5:1 on the sheet, the raised surface, and the inset band.

The rules are hairlines, not text. `--rule` measures 1.61:1 on the sheet and `--rule-soft`
1.24:1. They are decorative separators and never the only thing carrying meaning.

`--accent` and `--brand` are verdict colours, used as verdicts. Blue means the check passed,
rust means it is still open. Each is always paired with the word, so colour never carries the
meaning alone.

## Typography

IBM Plex Sans for everything a reader reads, IBM Plex Mono for anything a reader scans or a
machine parses.

**Three weights only.** 400 reads, 500 interacts, 600 announces. Nothing else. A fourth weight
reads as an accident.

Display sizes run slightly negative (`-0.025em` at `--t-display`); mono labels run wide at
`0.1em` in uppercase, which is what makes them scan as labels rather than sentences.

The measure is `--measure: 68ch`. Note that `ch` is the width of `0`, which is narrower than the
average glyph in IBM Plex Sans, so 68ch renders noticeably more than 68 characters. Do not set a
measure in `ch` by eyeballing the number.

**Fonts are self-hosted.** `src/styles/fonts.css` loads 18 local WOFF2 files: Latin and Latin
Extended for IBM Plex Sans and Mono at 400/500/600, plus six symbol subsets carrying `U+2192`
and `U+2197`. The ordinary Latin subsets do not contain the arrow, which is why the symbol files
exist. Do not reintroduce a Google Fonts request and do not drop the symbol subsets.

## Layout

Container is `1180px` with a `clamp(1.25rem, 4vw, 2.5rem)` gutter. Sections separate by
whitespace and a hairline, never by alternating background colours.

The homepage sheet is a two-column grid: the letterhead and measured values on the left, the
report metadata and stamp on the right. It collapses to one column on narrow screens.

Page structure on detail pages is a report header (furniture row, title, optional subtitle, lead)
above a metadata rail and the prose column. Prose caps at the measure.

The nav is a hamburger below `56rem`. A plain inline nav overflows at 390px.

**Mobile menu.** Below `56rem` the open menu is a full-height overlay panel, not a dropdown that
hovers over the content. It is `position: fixed`, runs from the bottom of the sticky header to
the bottom of the viewport, and takes `--nav-panel-top` (the measured header height) as its top
offset. While it is open the page behind it must not scroll: the lock is `overflow: hidden` on
the root element, not on `<body>`, because overflow on `<body>` makes `<body>` its own scroll
container and silently un-sticks the sticky header. The previous inline overflow and the body
padding are captured on open and restored on close, and the scroll position is put back where
the reader left it. The panel scrolls inside itself with `overscroll-behavior: contain` so a long
menu scrolls without chaining back to the document. A non-passive `touchmove` guard swallows
gestures outside the panel, because `overflow: hidden` alone does not stop iOS Safari
rubber-banding the document behind it.

**Theme toggle.** The button shows the CURRENT theme as a single word, `Light` or `Dark`. The
word is chosen by CSS from `:root[data-theme]`, so it is right before the first paint and cannot
drift from the page the way a script-written label did. The accessible name names that same
current theme and states the action the button performs: `Light mode, on. Switch to dark mode.`
and `Dark mode, on. Switch to light mode.`. There is deliberately no `aria-pressed`: the button
describes the current theme and the next action, which is not the state a pressed toggle
expresses. The theme attribute, the accessible name, and the stored preference are written by
one function so they cannot disagree.

## Elevation & Depth

The report is ruled, not stacked. Depth comes from ink rules and tonal bands on the sheet, not
from shadows. `--ring` is a hairline inset border. Cards are separated by a rule and a change
of surface, not by a drop shadow.

## Shapes

Radii are minimal and consistent: 2px for tags and table cells, 3px for panels. The document
edge is square. Nothing is fully round; there are no pills in this register, because a report
does not use them.

## Components

**Report table.** A ruled table with a mono header row on `--surface-2`. Columns are
`ITEM`, `MEASURED VALUE`, `EVIDENCE`, `VERDICT`. The verdict cell is mono and coloured by
verdict. Rows are the site homepage's evidence, and every measured value links to the record
that carries the number.

**Inspection report sheet.** The measured-values section is a `.report-sheet` grid:
`minmax(0, 1fr) 280px`. The left column carries the table and a whitespace band under it; the
right column is the `.rail`, separated from the table by a 2px `--rule-strong` left border. The
rail holds `QUALIFIKATIONEN` and `SPRACHEN` blocks, then the signature block pinned to the
rail's bottom by `margin-top: auto`. Below `48rem` the sheet becomes one column, the rail's
left border becomes a top rule, and the seal drops out of absolute positioning.

**Qualifications rail.** Every row is derived from `src/content/certs/*.md`; the rail never
authors its own list. States are visible and distinct: `active` rows carry an accent bullet,
`in-progress` rows carry a `--brand` bullet and the suffix `in progress`, `expired` rows carry a
muted bullet and the suffix `expired`. A rail that flattens those states into one list is
lying about the record. The language rows come from `SITE.languages` in `src/lib/site.ts`, one
language per row, never retyped by hand.

**Approval seal.** A circular, rotated `GEPRÜFT / ABGENOMMEN` mark in the whitespace under the
table's lower right corner. It is report furniture and a self-inspection cue, not an external
certification and not an attestation that anyone signed anything, so it keeps the same honest
`aria-label` semantics as the existing self-inspected stamp. It must never cover readable table
text: the selected sketch overlapped the last rows, which is not reproduced. In the dark theme
the multiply blend is dropped, because multiply would sink the seal into the background.

**Signature line.** A ruled line with the mono caption `UNTERSCHRIFT PRÜFER`, pinned to the
bottom of the rail. It means "a signature belongs here", not "someone signed this".

**Letterhead hierarchy.** The homepage name is a mono uppercase letterhead line above the
recruiter sentence, with the role line beneath it. The recruiter sentence stays the page's
single `h1`; the name is a `<p>`, so there is exactly one `h1` on the page.

**Measured values.** A real production number, never a vanity metric. The value is monospace so
figures lock to a grid; the label is mono because it is a caption, not prose. The grid is one
column on narrow screens.

**Value strip.** The homepage carries a four-value strip between the letterhead block and the
Measured values table. It is a ruled band across the sheet, not a row of floating cards: each
cell is a mono number over an uppercase mono caption, separated by hairlines, with a rule above
and below. It spans the full content width, aligned to the same left and right edges as the
report header and the section heads.

The strip reinforces the lede; it does not replace it. The lede stays the recruiter sentence and
the `h1` stays the recruiter sentence. The strip is report furniture, so it is ruled, not boxed.

Every figure in the strip is a measured value from the record and every cell links to the page
that carries the evidence. The record counts are computed from the content collections, never
typed in, so adding a project cannot desync the strip. The labels carry a fixed two-line box so
the four numbers sit on one baseline regardless of label length.

**Fact grid.** Identity facts live in a ruled grid of labelled cells, never in a paragraph:
Location, Status, Languages, Focus. The English label leads and the German follows in the `.de`
span, which carries `--muted` (5.01:1 light, 6.02:1 dark), never `--rule` — the rule is a
decorative hairline at 1.61:1 and fails AA as text.

The column count is fixed rather than `auto-fit`, so the cell count divides evenly and the
vertical hairline lands only on the cells that have a left neighbour. Six facts use three
columns; four use the `is-2col` variant; below 40rem everything is one column with no vertical
rules.

**Employer mark.** Each role carries a mono lettermark in the sheet's own ink and rule colours:
a hairline-framed block with the initials in `--fg`. Not the employer's colour logo — a
saturated raster mark reads as pasted-in clipart on a ruled paper sheet, and hotlinking a brand
asset from a corporate CDN is fragile and a licensing question. The mark is decorative and
`aria-hidden`; the employer name is always rendered as text beside it.

**The single-page record.** `/cv` holds the whole record in one scroll, with six anchored
sections and a ruled anchor index under the letterhead. It is an additional view over the same
content collections, not a replacement for the multi-route structure: the deep pages, the
sitemap, and llms.txt are untouched, and every entry on `/cv` links to its own page.

**Ruled entries.** Work items and experiments are ruled entries on `--surface`, separated by a
hairline rather than boxed in cards with shadows.

**Report header.** `ReportHead.astro` renders the furniture row, the title, an optional subtitle,
the lead, and an optional metadata block. Every inner page uses it so the letterhead is consistent.
The prop is `reportType`, not `doctype` — `doctype` is a reserved word in Astro's attribute
parser and fails the build.

The furniture row is one block holding the document type, the optional category, and the optional
back link, separated by a rule. They used to be separate stacked blocks, which put a tracked
uppercase label directly above the title; the design audit reads that as a kicker label, and
splitting the row also left the back link floating loose above the title. Merging them keeps the
information and removes the kicker shape. A short descriptive line that is a sentence rather than a
category — the tool tagline — belongs under the title as `subtitle`, not in the furniture row.

**Current direction.** `ProjectCard.astro` takes an `isCurrent` prop that renders the
`current-flag` label and the `is-current` state. This is a presentation-layer marker for the
AI/software pivot. It does not change authored project data; the flag lives in the component,
not in the content collection.

**Labels.** Mono uppercase, not a section number. They carry a count on an index page
(`11 projects`, `6 credentials`), a category on a detail page (`Infrastructure`,
`Security Tooling`), or the report doctype in a page header.

**Portrait.** A pre-cropped 384px WebP (`/photo.webp`) framed by `object-fit: cover` at
`object-position: 50% 50%`. The source is a 768x1024 environmental shot whose face sits in the
lower-left, so the crop is a 360x360 window at `+200+245` taken from the original. The
full-size `/photo.jpg` is kept only as the JSON-LD `Person.image`, where a crawler wants more
than a 96px display crop.

## Do's and Don'ts

**Reveal-on-scroll.** `.reveal` elements start at `opacity: 0` and are revealed by an
`IntersectionObserver`. Three things keep this safe: the observer is constructed before anything
that can throw, a 1.5s failsafe reveals everything regardless, and `@media print` forces
`opacity: 1` because print has no scrolling. Without the print rule, printing the homepage emits
section headings with none of the evidence.

**Experiments.** `/experiments/` lists the AI/MCP work and each card opens a detail page at
`/experiments/<slug>/` with the same rail-plus-prose shape as a project. The experiments
collection's schema declares every field its entries author; an undeclared key is stripped
before it reaches a template, so a field that is written but not declared silently disappears.

**The `verify` badge.** A claim still pending verification carries `confirm: true` in its
content entry and renders a `verify` badge. The badge renders **zero** times today, and that is
correct: every published claim is verified. A badge on a verified claim would be a lie, so the
badge is never decorative. When a claim does become unverified, the flag belongs on the content
entry that makes the claim, not on a site-wide config object.

**Do**

- Keep the sheet warm and the rules inked. The paper is the brand.
- Use `--accent` for a passed verdict and `--brand` for an open one. Nothing else.
- Pair every verdict colour with the verdict word.
- Measure contrast after any palette change. The numbers live in PRODUCT.md.
- Cap prose at `--measure`.
- Give every page a single `h1` and never skip a heading level.
- Run `npx impeccable detect` before deploying.

**Don't**

- Do not introduce a third accent hue, a gradient, or a glassmorphism panel.
- Do not add shadows to create depth. The report is ruled, not stacked.
- Do not add a fourth font weight.
- Do not reintroduce the Geist / Geist Mono identity, nor the retired Source Serif 4 / Inter /
  burgundy identity. Changing the typeface is a rebrand and needs Ankit's explicit sign-off.
- Do not add a numeric tolerance or `Grenzwert` column. No source backs one.
- Do not publish a relocation city. Germany only.
- Do not publish "EU Blue Card eligible" on site pages without Ankit's explicit approval. It is
  a legal-status claim, and it is true on the CV but not cleared for the site.
- Do not let a PDF or a text block run wider than the measure.
- Do not reintroduce pills or large radii. The document edge is square.
