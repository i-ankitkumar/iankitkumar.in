---
name: iankitkumar.in
description: Vercel-inspired monochrome portfolio. Geist type, one blue accent, shadow-as-border.

colors:
  canvas: "#FFFFFF"
  surface: "#FAFAFA"
  ink: "#171717"
  ink-soft: "#4D4D4D"
  ink-muted: "#666666"
  rule: "#EBEBEB"
  accent: "#0068D6"
  accent-soft: "#0057C0"
  accent-tint: "#EBF5FF"
  brand: "#0072F5"
  print-canvas: "#FFFFFF"
  print-ink: "#000000"
  status-ship: "#C4362B"
  status-preview: "#C2187A"
  status-develop: "#0A5FCC"
  canvas-dark: "#0A0A0A"
  surface-dark: "#111111"
  surface-2-dark: "#171717"
  ink-dark: "#EDEDED"
  ink-soft-dark: "#A1A1A1"
  ink-muted-dark: "#8F8F8F"
  accent-dark: "#3291FF"

typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.2vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.055em"
  heading:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.04em"
  page-heading:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.055em"
  metric-value:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  oversize:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(5rem, 12vw, 9rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.06em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.008em"
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.1em"

rounded:
  xs: "1px"
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  pill: "9999px"

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
  s10: "8rem"

components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1rem"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1rem"
  card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
  tag:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.sm}"
    padding: "0.15rem 0.5rem"
  eyebrow:
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
---

# iankitkumar.in — Design System

## Overview

A personal engineering portfolio for an infrastructure engineer moving into software and AI
engineering. The audience is a recruiter skimming for five seconds, then a hiring manager
reading for two minutes. Every visual decision serves that order.

The system is **Vercel-inspired**: a monochrome canvas, one blue accent, Geist and Geist Mono,
hairline rules instead of heavy borders, and shadow-as-border for depth. It replaced an earlier
warm-serif identity and is binding.

Light and dark are equal citizens. Both ship from the same token names, swapped at
`:root[data-theme='dark']`, with a `prefers-color-scheme` fallback for users who have not chosen.

## Colors

Monochrome does the structural work; the accent only ever marks something actionable or
identifying.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` / `--surface` | `#FFFFFF` | `#0A0A0A` | Canvas, cards |
| `--surface-2` | `#FAFAFA` | `#171717` | Subtle raised areas, metric cells |
| `--fg` | `#171717` | `#EDEDED` | Headlines, primary text |
| `--fg-soft` | `#4D4D4D` | `#A1A1A1` | Body copy, summaries |
| `--muted` | `#666666` | `#8F8F8F` | Labels, eyebrows, captions |
| `--rule` | `#EBEBEB` | `#262626` | Hairlines, section dividers |
| `--accent` | `#0068D6` | `#3291FF` | Links, focus rings, the arrow |
| `--brand` | `#0072F5` | `#3291FF` | Decorative brand marks only |

`--accent` is the link colour and is measured for WCAG AA on its background (5.31:1 on white).
`--brand` is the brighter Vercel blue and is **decorative only** - the favicon, the logo mark, the
OG card. It is not a text colour; at 4.44:1 on white it fails AA for body text.

Status colours (`--ship` `#C4362B`, `--preview` `#C2187A`, `--develop` `#0A5FCC`) label project
states. They never carry meaning alone; each is paired with a text label. All three clear AA on
white (`--ship` 5.37, `--preview` 5.67, `--develop` 5.96) and on the dark canvas (`--ship` 6.23,
`--preview` 5.93, `--develop` 6.77). `--ship` was `#FF5B4F` and failed AA at 3.06:1 - it is
darkened, because a token nobody uses is still a trap for the next person who reaches for it.

## Typography

Geist for everything a reader reads, Geist Mono for anything a reader scans or a machine parses.

**Three weights only.** 400 reads, 500 interacts, 600 announces. Nothing else. A fourth weight
reads as an accident.

Headlines are aggressively tracked tight, down to `-0.055em` at display size. Body copy runs
`-0.008em`. Mono labels run wide at `0.1em` in uppercase, which is what makes them scan as labels
rather than sentences.

The measure is `--measure: 54ch`. Note that `ch` is the width of `0`, which is roughly 1.45x the
average glyph in Geist, so 54ch renders about 78 characters. Do not set a measure in `ch` by
eyeballing the number.

## Layout

Container is `75rem` with a `clamp(1.25rem, 4vw, 2rem)` gutter. Sections separate by whitespace
and a `1px` hairline, never by alternating background colours.

Spacing is an 8px base with Vercel's gaps: the scale skips 20px and 24px in the primary range.

Page structure is two columns on detail pages: a `14rem` metadata rail and the prose column.
Prose caps at 54ch. Cards sit in a responsive grid that collapses to one column below `56rem`.

The nav is a hamburger below `56rem`. A plain inline nav overflows at 390px.

## Elevation & Depth

Shadow-as-border is the signature technique: `rgba(0,0,0,0.08) 0px 0px 0px 1px` draws a hairline
without a border, so it sits inside the element's box and never shifts layout.

Two depths: `--ring` (hairline only) and `--card-stack` (hairline, 2px lift, and an 8px ambient
shadow). Dark theme inverts the ring to `rgb(235,235,235)` at the same 8% alpha.

## Shapes

Radii are small and consistent: 4px for tags, 6px for buttons, 8px for cards, 12px for large
panels, 9999px for pills. Nothing is fully round except pills.

## Components

**Buttons.** Primary is ink-on-canvas inverted. Secondary is canvas with a hairline. Both use
`--r-md` and the same padding. The arrow glyph in a button slides 3px right on hover.

**Cards.** Surface canvas with a shadow-as-border. The type label and status pill sit above the
title, both in mono uppercase. A card title is a heading (`h2` on listing pages, `h3` inside a
`Section`), so the document outline stays flat and valid.

The type label holds a **category** ("Infrastructure", "AI Engineering", "Open Source", "Hackathon")
and the status chip holds the **state** ("Live", "Shipped", "Research"). A card states its status
exactly once.

**Tags.** Mono, sentence case, `--r-sm`, on `--surface`. They list tools, never categories of people.
Sentence case, not uppercase: an uppercase tag row reads as noise next to an uppercase eyebrow.

**Eyebrows.** Mono uppercase with a count, not a section number: `6 credentials`,
`3 roles - 2021 to present`. They give the reader a quantity before the headline. Editorial
section numbers (`§ Work`) are retired.

**Metric cells.** `--surface-2`, `--r-lg`, a monospace tabular-figure value and a mono label.
They carry a real production number, never a vanity metric. The value is monospace so the four
figures lock to a grid; the label is mono because it is a caption, not prose. The grid is one
column below `30rem` and only reaches four columns at `68rem` - at 390px a two-up metric cell
held a 7-line label.

**Portrait.** A pre-cropped 384px WebP (`/photo.webp`, 14 KB) framed by a plain
`object-fit: cover` circle. The full-size `/photo.jpg` is kept only as the JSON-LD
`Person.image`, where a crawler wants more than a 96px display crop.

## Do's and Don'ts

**Reveal-on-scroll.** `.reveal` elements start at `opacity: 0` and are revealed by an
`IntersectionObserver`. Three things keep this safe: the observer is constructed before anything
that can throw, a 1.5s failsafe reveals everything regardless, and `@media print` forces
`opacity: 1` because print has no scrolling. Without the print rule, printing the homepage emits
section headings with none of the evidence.

**Experiments.** `/experiments/` lists the AI/MCP work and each card opens a detail page at
`/experiments/<slug>/` with the same rail-plus-prose shape as a project. The depth mechanism
serves the software work too, not only the infrastructure work. The experiments collection's
schema declares every field its entries author; an undeclared key is stripped before it reaches
a template, so a field that is written but not declared silently disappears.

**The `verify` badge.** A claim still pending verification carries `confirm: true` in its content
entry and renders a `verify` badge. The badge renders **zero** times today, and that is correct:
every published claim is verified. A badge on a verified claim would be a lie, so the badge is
never decorative. When a claim does become unverified, the flag belongs on the content entry
that makes the claim, not on a site-wide config object.

**Do**

- Keep the canvas monochrome. Colour marks one thing at a time.
- Use `--accent` for anything clickable. `--brand` is for the logo and the OG card only.
- Measure contrast after any palette change. The numbers live in PRODUCT.md.
- Cap prose at `--measure`. Long lines break the eye's return path.
- Put the count in the eyebrow.
- Give every page a single `h1` and never skip a heading level.
- Run `npx impeccable detect` before deploying.

**Don't**

- Do not introduce a second accent hue, a gradient, or a glassmorphism panel.
- Do not use `--brand` as a text colour.
- Do not add a fourth font weight.
- Do not reintroduce the retired Source Serif 4 / Inter / burgundy identity. Changing the
  typeface is a rebrand and needs Ankit's explicit sign-off.
- Do not reintroduce editorial section numbers.
- Do not put a tracked-caps chip above the `h1` unless it carries a real count.
- Do not publish a relocation city. Germany only.
- Do not let a PDF or a text block run wider than the measure.
