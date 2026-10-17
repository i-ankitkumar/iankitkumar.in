# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The portfolio serves three layered audiences. A visitor should self-select into the right depth within five seconds, then get richer content if they stay.

- **Primary: technical recruiters and hiring managers in Germany and the EU.** Scanning a GitHub profile README or landing on iankitkumar.in during a sourcing pass. They want a fast yes/no on fit: location, eligibility, stack, seniority, contact.
- **Secondary: software and AI engineering hiring managers.** Dig past the first fold for evidence of scope, scale, and recent work. Want credible claims, easy access to deeper material, and a sense of whether the candidate can ship.
- **Tertiary: peers in DevOps, SRE, MLOps, and AI-engineering communities.** Visiting for reasons other than hiring: project interest, voice, taste, conversation starters.

Decision shape the design must protect: the first five seconds answer the recruiter's question; the rest serves managers and peers without contradicting the first impression.

## Product Purpose

Ankit Kumar's personal site and GitHub profile presence. It communicates an **infrastructure engineer transitioning into software and AI engineering**, anchored in real Splunk, Azure, AWS, Terraform, MCP, and AI-powered security work, and routes interested visitors to the right follow-up surface (resume, GitHub, LinkedIn, blog).

Success looks like: a recruiter or manager can confirm fit (Pune → Heidelberg, EU Blue Card eligible, Splunk multi-site + Azure + AWS + Terraform + MCP, comfortable with software and AI engineering crossover) from the profile alone, without needing to ask. Failure looks like: a visitor leaves unsure of location, eligibility, or how to make contact.

## Positioning

Layered, with a deliberate order:

1. **Infrastructure engineer → software & AI engineering.** This is the lead. The "becoming" arrow is the brand. Built on real production ownership at Wolters Kluwer (Splunk multi-site, Azure, Terraform, CI/CD) and real software/AI work in the open (MCP servers, AI-assisted Splunk tooling, ML security research).
2. **Reliability + operability in the bones.** Defined RPO/RTO, audit-ready telemetry, change control that doesn't fight the team. These are the boring skills that matter in production and that the new direction inherits, not replaces.
3. **Premium typographic visual identity.** Editorial typography, restrained motion, generous whitespace. The combination of (1) + (2) dressed in a credible European-technical-recruiter visual is the actual position. Distinct from the previous terminal/gamified identity.

Mechanism: the visible artifact is a long-form profile page with editorial typography, a quiet color palette, and one accent. The format implies a writer/builder, which is the brand.

## Operating Context

- Visitor path: search or LinkedIn → iankitkumar.in (deeper) → GitHub / LinkedIn / email contact. The portfolio is the routing surface, not the destination.
- Three products serve the same identity. They are designed to read as one person across GitHub, the personal domain, and the blog.
- Static, content-driven, no backend. Every fact lives in a content collection; any unverifiable claim carries a `confirm: true` flag rendered as a `verify` badge.

## Surfaces

The product ships across three repos. They share the audience, positioning, evidence, principles, and brand commitments above. They differ in stack, output, and operating constraints. The durable product truth lives in this file; the per-surface detail lives in each repo's PRODUCT.md so each surface can stay in lockstep without duplication.

### Surface 1 — GitHub profile cards (neofetch SVGs)

- **Repo**: `github.com/i-ankitkumar/i-ankitkumar`
- **Stack**: Python 3.12 + Pillow + chafa (chafa is CI-only)
- **Output**: `dark_mode.svg` and `light_mode.svg`, ~120 KB each, well under GitHub's 250 KB profile-image cap
- **Where it renders**: GitHub profile README (img tag), and as a fallback art element on iankitkumar.in
- **CI**: GitHub Actions cron `30 6 * * *` and on push of `config.json`, `scripts/**`, `assets/portrait.png`, or the workflow file. Generated artifacts are committed back to the repo
- **Local override**: `assets/portrait.png` overrides the GitHub avatar for the ASCII side. The auto-refresh must not silently replace it
- **Customization point**: `config.json` (bio, contact, ascii source). The generator and SVGs are derived; edit the generator and the config, not the SVGs
- **What this surface does NOT do**: it does not host the portfolio, host a CV PDF, or run an interactive terminal. It is the static identity card

### Surface 2 — Live site at iankitkumar.in (this repo)

- **Repo**: `github.com/i-ankitkumar/iankitkumar.in`
- **Stack**: Astro 5 + TypeScript + plain CSS. No framework runtime shipped; content collections drive every fact
- **Output**: static HTML/CSS, one bundle of inline theme/IO JS, no analytics
- **Hosting**: Cloudflare Pages, project name `iankitkumar-in`, branch `main`
- **Deploy**: `npx wrangler pages deploy dist --project-name=iankitkumar-in --branch=main --commit-dirty=true` (CF Pages Git integration also wired)
- **Local dev**: `npm install && npm run dev` (Astro at `localhost:4321`); `npm run build` produces `dist/`; `npm run preview` serves the built site
- **Customization point**: `src/content/` collections (`experiences/`, `projects/`, `certs/`, `experiments/`). Every visible fact has frontmatter; the schema is the source of truth
- **What this surface does NOT do**: it does not host the blog (separate repo), generate the SVG cards (Surface 1), or run a backend. All interactivity is client-side JS (theme toggle, scroll-reveal)

### Surface 3 — Blog at blog.iankitkumar.in (separate repo, not in this workspace)

- **Repo**: `github.com/i-ankitkumar/blog.iankitkumar.in`
- **Stack**: Astro + Tailwind + Content Collections, theme `Brutal` (ElianCodes)
- **Hosting**: Cloudflare Pages, project name `blog-iankitkumar-in`
- **Customization point**: Markdown in `src/data/blog/`
- **What this surface does NOT do**: it is a writing surface, not an identity surface. It carries no bio, no contact, no certs. The portfolio typographic aesthetic does not apply to the blog theme; the blog is allowed to feel like a blog. PRODUCT.md applies only in the parts that don't conflict (audience, voice, evidence)

## Capabilities and Constraints

**Capabilities (confirmed):**

- Renders a single, identity-coherent profile page from typed content collections.
- Every fact on the page traces to a content entry; nothing is hard-coded in page templates.
- Anything still under review carries a `confirm: true` flag surfaced as a `verify` badge in the UI.
- Dark/light theme toggle, system preference respected on first paint.
- Sitemap, JSON-LD Person schema, Open Graph, Twitter card, security headers, custom 404.

**Constraints (binding):**

- Every claim is verifiable and must remain so. Cert list (Terraform Associate, AZ-104, RHCSA, AZ-900, AI-900, AZ-400 in progress), language levels (English C1, Hindi Native, German A1), and EU Blue Card eligibility are factual. Future design work must not invent additional certs, client logos, testimonials, employers, or metrics.
- AWS, MCP, AI-powered security tooling, and "relocating to Heidelberg" are **newer claims** added during the v2 rewrite. They carry `confirm: true` until the user signs off on them.
- Location is **Pune** for the v2 site (matches the work entries on the CV and the recent memory note about CV/LinkedIn being updated). The CV header still says Mumbai; that is a separate live document.
- Generated artifacts in content collections are committed and tracked; the public assets in `public/` are copied from the existing live repo and are also committed.
- Editorial typographic aesthetic is the only product direction. A pivot to a SaaS-template or terminal-gamified look would be a rebrand, not a redesign.

**Deliberately undecided (do not invent in future work):**

- A second person (partner) in the bio; the CV mentions relocating with partner, but the site stays single-subject.
- Conference talks, awards, press, named clients beyond Wolters Kluwer and Colgate GBS.
- Testimonials, case studies with real screenshots, or quantified impact claims not already on the CV.
- Pricing / availability windows / response-time SLAs.
- A native iOS or Android app.

## Brand Commitments

- **Editorial typographic aesthetic is binding.** Premium type, generous whitespace, restrained motion, warm neutrals + a single accent. Future work preserves this form factor unless the user explicitly reopens the brand.
- **Real name and identity.** "Ankit Kumar", handle `i-ankitkumar`, host label `ankit@ops`. These are the brand; fictional personas are not.
- **Honest voice.** No marketing copy. If a statement is a fact (cert, level, eligibility), it is stated as a fact. If it is a value claim, it is softened or omitted. Anything still under review carries a `verify` badge.
- **Premium dark + light themes.** Dark is the default; light is co-equal. Both pass WCAG AA contrast.

## Evidence on Hand

- `src/content/experiences/*.md` — three roles, derived from the CV.
- `src/content/projects/*.md` — seven projects, four with problem/architecture/impl/results blocks.
- `src/content/certs/*.md` — six certifications, statuses derived from CV.
- `src/content/experiments/*.md` — two AI/MCP experiments, all `confirm: true`.
- `public/resume.pdf` — the CV (copied from the live repo).
- `public/photo.jpg` — the photo (copied from the live repo).
- Live surfaces: `github.com/i-ankitkumar` (profile README), `iankitkumar.in` (deeper site), `blog.iankitkumar.in` (writing).

**Absences future work must not fabricate:** case studies with screenshots, named employers beyond Wolters Kluwer and Colgate GBS, named clients, named scale (requests/sec, user counts, cost savings) beyond what the CV already states, awards beyond `Star Performer (Q1 2023)` and `WK ARC certification`, conference talks, press.

## Product Principles

1. **Factual over flattering.** Every claim is verifiable. The design's job is to surface real evidence, not to persuade with invented detail.
2. **Skim-first, depth-on-demand.** The first five seconds must answer the recruiter's question. Richer content only appears when the visitor wants more, and never contradicts the first impression.
3. **One identity, three surfaces.** GitHub profile, iankitkumar.in, and blog must read as the same person. The product truth above the `## Surfaces` line is byte-identical across repos; per-surface detail is intentionally different.
4. **Generated from content, not hand-edited.** Every visible fact traces to a typed content collection. Editing pages directly is wrong; editing content entries and the schema is right. The discipline is what makes the work feel real instead of faked.
5. **Quiet wins on the noise floor.** This is a personal profile, not a marketing site. Restraint is the move; the editorial typographic aesthetic reads as intentional precisely because it doesn't shout.

## Accessibility & Inclusion

- Light theme: bg `#FAFAF7`, fg `#1A1A1F`, accent `#9B1C30`. Dark theme: bg `#0F0F12`, fg `#E8E6E1`, accent `#D85A6E`. All key/value text pairs meet WCAG AA (4.5:1 body, 3:1 large).
- Skip link to `#main`. Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`). `aria-current="page"` on the active nav link. `aria-pressed` on the theme toggle.
- `@media (prefers-reduced-motion: reduce)` disables transitions and animations.
- `@media (prefers-color-scheme: dark)` controls the default theme; explicit user choice persists in `localStorage`.
- Copy is in English at a C1 register. Avoid marketing superlatives; favor plain, factual phrasing. Visitors whose first language is not English should not need to fight the copy.
- The `verify` badge on unverified claims is decorative; the underlying text is still readable.
- No flashing or motion in the cards themselves. Reveal-on-scroll uses a single 8px translate and `opacity`; both are disabled under reduced motion.