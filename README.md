# iankitkumar.in

Personal portfolio for **[iankitkumar.in](https://iankitkumar.in)** — DevOps & Cloud Infrastructure.

Based on [Operator Portfolio](https://github.com/LucidAkshay/operator-portfolio) (MIT) by Akshay Sharma. Adapted for Cloudflare Pages (static; AI chat / Vercel API not enabled).

| | |
|---|---|
| **Live** | https://iankitkumar.in |
| **Blog** | https://blog.iankitkumar.in |
| **Email** | [mail@iankitkumar.in](mailto:mail@iankitkumar.in) |
| **CV** | [`assets/resume.pdf`](./assets/resume.pdf) |

## Stack

Static HTML / CSS / JS · config-driven (`config.js`) · Cloudflare Pages

## Customize

Edit **`config.js`** for bio, experience, projects, certs, and links. Most page content renders from that file.

## Local

```bash
python3 -m http.server 5173
# open http://localhost:5173
```

## Deploy

```bash
wrangler pages deploy . --project-name=iankitkumar-in --branch=main --commit-dirty=true
```

## Notes

- Do not commit secrets. Email MX/SPF/DKIM on the domain is Cloudflare Email Routing — leave DNS mail records alone.
- Template credit retained in footer (MIT license).
