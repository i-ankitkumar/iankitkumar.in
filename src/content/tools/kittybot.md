---
name: "kittybot"
tagline: "Split household expenses from Telegram"
status: "beta"
summary: "A Telegram bot that pulls grocery orders from Swiggy Instamart, Zepto, Blinkit and BigBasket, and writes the shared expenses to Kittysplit — but only after you approve every split."
problem: "Splitting a flat's expenses means opening a browser for every entry. Add the grocery app, copy the total, open Kittysplit, pick the split, save. Then remember that half those orders are yours alone, and that a third are split 70/30 because someone else eats more of the milk. The friction is not the arithmetic, it is the ritual — and it is why people let small expenses drift for months."
approach: "An order is never an expense. It becomes a proposal: amount, items, and a suggested split, sent to Telegram with buttons for the common cases (equally, 70/30, all mine) and a text box for anything else. Only an explicit approval writes it to Kittysplit, so an imported order can never silently distort what your flatmate owes you. The marketplace integrations are read-only by construction — each adapter allowlists URL prefixes rather than HTTP methods, because the cart and checkout endpoints are POSTs too, so a GET-only rule would not stop them."
how:
  - "Instamart and Zepto read order history through each company's own MCP server, over OAuth 2.1 with PKCE and dynamic client registration. The bot registers itself as a client and asks for a read-scoped token; there is no browser automation and no scraping."
  - "Blinkit and BigBasket have no public API. The bot opens a real browser once, you log in yourself, and it replays that session from a mode-600 file. Blinkit needs a Chrome TLS fingerprint to get past Cloudflare; BigBasket needs an OTP because it removed passwords in 2021."
  - "Kittysplit has no REST API either. The client speaks its actual protocol: form posts against the Phoenix endpoints, with the identity cookie the Kittysplit widget uses. All four split modes and the settlement maths were verified against a live kitty."
  - "BigBasket orders are reconciled before they are accepted — unit price times quantity against the line total, line totals against the subtotal, subtotal plus fees against the total. An order that does not add up is refused rather than recorded wrong."
  - "An approval can only land once. The proposal is claimed with an atomic database update before the write, so a double-clicked button, a second tab, or a browser retry charges your flatmate once instead of twice. It is a small thing that decides whether people trust a bot with their money."
  - "The dashboard can lock itself behind HTTP Basic auth, so it is safe to point at anything other than localhost."
stack:
  - "Python 3.12"
  - "aiogram 3"
  - "FastAPI"
  - "httpx"
  - "curl_cffi"
  - "SQLite"
  - "MCP"
  - "OAuth 2.1 + PKCE"
links:
  - label: "Source on GitHub"
    href: "https://github.com/i-ankitkumar/kittybot"
    external: true
  - label: "Kittysplit"
    href: "https://kittysplit.com"
    external: true
screenshot: "/tools/kittybot/dashboard.webp"
telegram_card: "/tools/kittybot/telegram-approval.png"
confirm: false
order: 1
---
