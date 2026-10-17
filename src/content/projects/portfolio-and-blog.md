---
name: "iankitkumar.in + blog.iankitkumar.in"
type: "Personal Site · Production"
status: "live"
period: "2024 – ongoing"
summary: "This site (Astro, Cloudflare Pages) and the sibling blog (Astro + Brutal theme, Cloudflare Pages). End-to-end ownership from DNS to deploy."
problem: "A single identity, three surfaces (GitHub profile, iankitkumar.in, blog.iankitkumar.in) that need to read as one person without duplicating content."
architecture: "Three repos, one PRODUCT.md per repo with a shared `## Surfaces` block. Cloudflare DNS with proxy + Email Routing for `mail@`. CF Pages for both web surfaces; GitHub Actions cron for the profile-card SVG generator."
implementation: "Astro + TypeScript + plain CSS. Content collections drive every fact; anything still under review carries a `confirm` flag. Sitemap, JSON-LD, OG, security headers, custom 404."
results: "Single source of product truth across surfaces; trivial to add a new project without touching pages."
stack:
  - "Astro"
  - "TypeScript"
  - "Cloudflare Pages"
  - "Cloudflare DNS"
  - "Cloudflare Email Routing"
tags:
  - "DNS"
  - "Pages"
  - "Email Routing"
links:
  - label: "View source on GitHub"
    href: "https://github.com/i-ankitkumar/iankitkumar.in"
    external: true
  - label: "Visit the blog"
    href: "https://blog.iankitkumar.in"
    external: true
featured: false
order: 70
confirm: false
---