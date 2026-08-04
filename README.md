# iankitkumar.in

Gamified personal portfolio for **[iankitkumar.in](https://iankitkumar.in)** — cloud, automation, security, and MLOps framed as an infrastructure expedition.

| | |
|---|---|
| **Live site** | https://iankitkumar.in |
| **WWW** | https://www.iankitkumar.in |
| **Blog (sibling)** | https://blog.iankitkumar.in |
| **Pages alias** | https://iankitkumar-in.pages.dev |
| **Contact** | [mail@iankitkumar.in](mailto:mail@iankitkumar.in) |

---

## Why this project (hiring narrative)

This repo is not only a resume page — it is a **working production system** that demonstrates:

1. **End-to-end ownership** — domain registration → DNS → TLS → static hosting → custom email → sibling blog subdomain → GitHub as source of truth.
2. **Infrastructure judgment** — Cloudflare as edge + DNS authority; apex + `www` + `blog` split cleanly; **email MX/SPF/DKIM left untouched** while shipping websites.
3. **Product / design taste** — a gamified UX without turning into badge spam; brand-first hero, restrained motion, accessible markup.
4. **Ops hygiene** — reproducible deploys with Wrangler, cache-aware headers, reduced-motion support, no secrets in the repo.

**Interview soundbite:** *“I bought a domain, moved DNS to Cloudflare, protected email routing, split portfolio and blog onto separate Pages projects, and shipped a gamified static front end with a deliberate design system — then documented the whole path so it can be re-run or handed off.”*

---

## Architecture

```text
┌─────────────────────┐     git push      ┌──────────────────────────┐
│  This repo (main)   │ ───────────────►  │  GitHub                  │
│  static HTML/CSS/JS │                   │  i-ankitkumar/iankitkumar.in
└─────────┬───────────┘                   └──────────────────────────┘
          │ wrangler pages deploy
          ▼
┌─────────────────────┐     custom domains     ┌──────────────────────────┐
│  Cloudflare Pages   │ ◄───────────────────── │  Cloudflare DNS zone     │
│  project:           │                        │  iankitkumar.in          │
│  iankitkumar-in     │                        │                          │
└─────────────────────┘                        │  @ / www → Pages (CNAME) │
                                               │  blog    → blog Pages    │
                                               │  MX/TXT  → Email Routing │
                                               └──────────────────────────┘
          │
          ▼
   https://iankitkumar.in
```

### Related systems (same domain, separate repos)

| Surface | Repo | Hosting |
|---|---|---|
| Portfolio (this) | [i-ankitkumar/iankitkumar.in](https://github.com/i-ankitkumar/iankitkumar.in) | Cloudflare Pages `iankitkumar-in` |
| Blog | [i-ankitkumar/blog.iankitkumar.in](https://github.com/i-ankitkumar/blog.iankitkumar.in) | Cloudflare Pages `blog-iankitkumar-in` (Astro) |
| GitHub profile card | [i-ankitkumar/i-ankitkumar](https://github.com/i-ankitkumar/i-ankitkumar) | GitHub README + Actions |

Splitting portfolio and blog into **two Pages projects** keeps deploy blast radius small and lets each site use the right toolchain (static vs Astro).

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Front end | Static HTML, CSS, vanilla JS | Zero build step, fast TTFB, trivial to host on Pages |
| Typography | [Syne](https://fonts.google.com/specimen/Syne) + [Figtree](https://fonts.google.com/specimen/Figtree) | Expressive display + readable body (avoid generic Inter/system stacks) |
| Edge / CDN | Cloudflare Pages | Free TLS, global cache, native custom domains on the same DNS zone |
| DNS | Cloudflare (authoritative) | Registrar can stay Hostinger; **nameservers** point to Cloudflare |
| Email | Cloudflare Email Routing | `mail@iankitkumar.in` + catch-all; coexists with site CNAMEs |
| Deploy CLI | [Wrangler](https://developers.cloudflare.com/workers/wrangler/) | `wrangler pages deploy` for production uploads |
| Source control | GitHub `main` | Reviewable history; local working copy is this repo |

**Not used (intentionally):** React/Next, a CMS, client-side routing, purple neon “AI portfolio” kits, or dark-mode-by-default chrome.

---

## Design system

### Concept

**“Systems expedition.”** Infrastructure work is presented as a map with routes, checkpoints, and quests — gamified language with editorial restraint.

### Hero composition (first viewport)

Hard constraints applied on purpose:

- Brand (`Ankit Kumar`) is the dominant signal — not an eyebrow.
- One headline, one supporting sentence, one CTA group.
- One dominant visual (SVG expedition map) — full-bleed panel, not a card collage.
- No floating badges / promo chips over the hero media.

### Visual tokens

| Token | Role |
|---|---|
| Mist green / cool paper background | Light atmospheric base (not default dark UI) |
| Deep ink `#14201a` | Type + primary actions |
| Teal `#0f766e` | Progress / cleared quests |
| Signal orange `#c2410c` | Active quest + hover emphasis |
| Soft grid mask | Depth without heavy illustration assets |

### Interaction / motion

Three intentional motions (disabled under `prefers-reduced-motion`):

1. Hero copy + map **rise-in** on load  
2. XP bar **fill + count-up** on scroll into view  
3. Skill bars **animate width**; map route **dash** + light pointer parallax  

### Information architecture

1. **Hero** — who + promise + CTAs  
2. **Player status** — level / XP / focus / stack  
3. **Quests** — selected projects as cleared / in-progress missions  
4. **Skill tree** — ranked capability bars  
5. **Contact** — email first, then socials + blog  

### Accessibility

- Skip link, semantic landmarks, labeled progressbar  
- Sticky header with readable contrast  
- Keyboard-focusable controls  
- Motion reduced when the OS requests it  

---

## Infrastructure & DNS (production)

Registrar: Hostinger · DNS authority: **Cloudflare** · Zone status: active.

### Web records (proxied)

| Type | Name | Target | Purpose |
|---|---|---|---|
| CNAME | `@` (apex) | `iankitkumar-in.pages.dev` | Portfolio (CNAME flattening) |
| CNAME | `www` | `iankitkumar-in.pages.dev` | WWW alias |
| CNAME | `blog` | `blog-iankitkumar-in.pages.dev` | Sibling Astro blog |

### Email records (do not modify when shipping site changes)

| Type | Name | Purpose |
|---|---|---|
| MX | `@` → `route{1,2,3}.mx.cloudflare.net` | Cloudflare Email Routing |
| TXT | `@` SPF (`include:_spf.mx.cloudflare.net`) | Sender policy |
| TXT | `cf2024-1._domainkey` | DKIM |

**Ops rule:** add web CNAMEs freely; never delete or overwrite MX / SPF / DKIM while deploying Pages.

### TLS / edge

- Certificates issued by Cloudflare for apex, `www`, and `blog`
- Pages serves HTTPS; HTML shipped with `_headers` for `nosniff` + referrer policy

---

## Repository layout

```text
.
├── index.html      # Structure + content
├── styles.css      # Design tokens, layout, motion
├── script.js       # XP / skill observers, year, parallax
├── _headers        # Cloudflare Pages response headers
├── README.md       # This document
└── .gitignore      # .wrangler/, local vault notes
```

No bundler. Deploy the directory as-is.

---

## Local development

```bash
git clone https://github.com/i-ankitkumar/iankitkumar.in.git
cd iankitkumar.in
python3 -m http.server 5173
# → http://127.0.0.1:5173
```

Or open `index.html` directly in a browser (map/fonts still load).

---

## Deployment runbook

### Prerequisites

- Cloudflare account owning zone `iankitkumar.in`
- Pages project named **`iankitkumar-in`** (production branch: `main`)
- Wrangler authenticated (`wrangler login`) or `CLOUDFLARE_API_TOKEN` with Pages write

### Ship a change

```bash
# 1) Commit to GitHub (source of truth)
git add -A
git commit -m "feat: describe the change"
git push origin main

# 2) Deploy to Cloudflare Pages (current workflow)
wrangler pages deploy . --project-name=iankitkumar-in --branch=main
```

Verify:

- https://iankitkumar-in.pages.dev  
- https://iankitkumar.in (hard-refresh if CDN looks stale)  
- https://www.iankitkumar.in  

### First-time domain attach (already done in prod)

1. Create Pages project `iankitkumar-in`  
2. Deploy once to get `*.pages.dev`  
3. Custom domains → add `iankitkumar.in` + `www.iankitkumar.in`  
4. Ensure DNS CNAMEs exist (Cloudflare usually proposes them)  
5. Wait until domain status is **Active**  

### Optional next ops improvement

Connect this GitHub repo to the Pages project for **push-to-deploy** (removes the manual Wrangler step). Until then: **push ≠ live** — always run `wrangler pages deploy` after merge.

---

## Security & privacy notes

- No API keys, Cloudflare tokens, or mailbox credentials in this repository  
- Contact uses `mailto:` only (no form backend yet)  
- `_headers` sets `X-Content-Type-Options: nosniff` and a strict-ish referrer policy  
- Third-party: Google Fonts (consider self-hosting later for stricter privacy / uptime)

---

## How to talk about this in interviews

| Theme | Evidence in this project |
|---|---|
| Cloud / DNS | Apex CNAME flattening, subdomain split, proxied records |
| Reliability mindset | Email kept working while websites were attached |
| Separation of concerns | Portfolio vs blog as independent deployables |
| Front-end craft | Design constraints, a11y, reduced motion |
| Delivery | Git history + Wrangler production deploys + live custom domain |
| Documentation | This README as an operable runbook, not just marketing |

Suggested demo path (2–3 minutes): open the live hero → scroll XP/skills → open a quest GitHub link → show `blog.iankitkumar.in` → walk this README’s architecture section.

---

## Roadmap

- [x] Domain + Cloudflare DNS + Email Routing  
- [x] Pages project + custom domains  
- [x] Gamified static portfolio UI  
- [ ] GitHub-connected auto-deploy on `main`  
- [ ] Richer quest content / case-study pages  
- [ ] Optional self-hosted fonts + contact form (Workers / Forms)  
- [ ] Performance pass (Lighthouse) + OG images  

---

## License

Personal portfolio code. Content and branding © Ankit Kumar. Reuse the structure freely with attribution; do not impersonate the personal brand.
