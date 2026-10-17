# iankitkumar.in — v2

Premium typographic personal portfolio for **[iankitkumar.in](https://iankitkumar.in)**. Infrastructure engineer transitioning into software engineering and AI engineering. Based in Pune, India; relocating to Heidelberg, Germany.

This is a **from-scratch rebuild** of the live site at `iankitkumar.in`. The previous version (terminal/gamified, plain HTML/CSS/JS, forked from [`LucidAkshay/operator-portfolio`](https://github.com/LucidAkshay/operator-portfolio) MIT) lives at [`github.com/i-ankitkumar/iankitkumar.in`](https://github.com/i-ankitkumar/iankitkumar.in) and continues to serve the live domain until this build is approved and promoted.

## Stack

- [Astro 5+](https://astro.build) — static site, content collections, zero JS by default
- TypeScript (strict)
- [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — sitemap.xml
- Plain CSS with CSS variables — design tokens, no framework
- Self-hosted via Cloudflare Pages (project `iankitkumar-in`)

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build to dist/
npm run preview   # serve dist/ locally
npm run check     # astro check (type + content validation)
```

## Deploy

The deploy credential lives at `~/services/iankitkumar-deploy/.env` (mode 600). Direct upload via wrangler:

```bash
set -a; source ~/services/iankitkumar-deploy/.env; set +a
npm run build
npx wrangler pages deploy dist --project-name=iankitkumar-in --branch=main --commit-dirty=true
```

Git push to the GitHub remote also works because the CF Pages project has a Git integration, but direct upload is faster and more deterministic.

## Conventions

- All factual content lives in `src/content/` collections (experiences, projects, certs, experiments). The schema is the source of truth; nothing is duplicated in pages.
- Anything not yet verifiable is marked `[confirm]` in the source. The rendered site hides that annotation unless a query parameter reveals it.
- Site URL is `https://iankitkumar.in`. Change `astro.config.mjs` `site` if you fork.
- No analytics, no trackers, no third-party fonts beyond Google Fonts (Source Serif 4, Inter, JetBrains Mono).

## License

Source code: MIT. Content (CV-derived copy): © Ankit Kumar.