#!/usr/bin/env bash
# Regenerate public/og-preview.png from design/og-preview.svg.
#
# Why this script exists (two bugs it prevents):
#
#  1. The SVG source lives in design/, NOT public/. Astro copies everything in
#     public/ verbatim into dist/, so an editable source SVG there would be
#     published and would add a dead request path.
#
#  2. rsvg-convert resolves a relative <image href="..."> against the SVG's OWN
#     directory, not the shell's CWD. With the source in design/, a reference of
#     ../public/photo.jpg resolves to a nonexistent path and rsvg renders an EMPTY
#     CIRCLE with no error and exit 0. That is a silent failure — it bit once
#     already, and the naive version of this script reported "OK" for a blank card.
#
#     Fix: rasterize a temp copy of the SVG from inside public/, where the photo
#     sits beside it. Then GATE on output size — a card with no photo rasterizes
#     to roughly half the byte size, so a minimum-size floor reliably catches
#     "the portrait did not embed".
#
# Usage: bash scripts/build-og-image.sh
# Then:  npx astro build && bash scripts/deploy.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SRC="$PROJECT_DIR/design/og-preview.svg"
PHOTO="$PROJECT_DIR/public/photo.jpg"
OUT="$PROJECT_DIR/public/og-preview.png"

# Output below this size means the portrait did not embed (silent empty circle).
# The good card with photo is ~160 KB; the broken one is ~61 KB. 120 KB sits
# cleanly between. If the photo changes, re-check both numbers before moving this.
MIN_BYTES=120000

for f in "$SRC" "$PHOTO"; do
  [[ -f "$f" ]] || { echo "ERROR: missing $f" >&2; exit 2; }
done

cd "$PROJECT_DIR/public"

TMP_SVG=".og-build-tmp.svg"
trap 'rm -f "$TMP_SVG"' EXIT

# Rasterize from public/ so the relative photo href resolves.
sed 's|href="../public/photo.jpg"|href="photo.jpg"|' "$SRC" > "$TMP_SVG"
rsvg-convert -w 1200 -h 630 "$TMP_SVG" -o "$OUT"

echo "=== verifying ==="
identify "$OUT"
file "$OUT"

fail() { echo "ERROR: $1" >&2; exit "$2"; }

# Hard gates: real PNG (the template fork shipped a JPEG named .png), exact OG
# dimensions, and a byte floor that catches a silently missing portrait.
mime=$(file -b "$OUT")
[[ "$mime" == PNG* ]] || fail "output is not a PNG: $mime" 3

dims=$(identify -format '%wx%h' "$OUT")
[[ "$dims" == "1200x630" ]] || fail "expected 1200x630, got $dims" 4

bytes=$(stat -c '%s' "$OUT")
if (( bytes < MIN_BYTES )); then
  fail "output is only ${bytes}B (< ${MIN_BYTES}B) — the portrait almost certainly failed to embed and rendered as an empty circle. Check the <image href> in design/og-preview.svg." 5
fi

echo "OK: public/og-preview.png regenerated (PNG 1200x630, ${bytes}B, portrait embedded)"
echo "Next: npx astro build && bash scripts/deploy.sh"