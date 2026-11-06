#!/usr/bin/env bash
# ankit-portfolio-builder — removal verification
#
# Proves a string is genuinely absent from the built site, and reports
# substring hits with enough context to judge false positives.
#
# Usage:
#   bash scripts/verify-removal.sh "Heidelberg" "EU Blue Card"
#   bash scripts/verify-removal.sh --live "Heidelberg"     # also scans the live domain
#
# Why: the same claim lives in src/lib/site.ts, the page component, the meta
# description, the JSON-LD, and llms.txt. Reading one page proves nothing.
# Exit 0 = string absent everywhere. Exit 1 = still present.

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
DIST="$PROJECT_DIR/dist"

LIVE=0
if [[ "${1:-}" == "--live" ]]; then
  LIVE=1
  shift
fi

if [[ $# -eq 0 ]]; then
  echo "usage: bash scripts/verify-removal.sh [--live] <string> [<string> ...]" >&2
  exit 2
fi

if [[ ! -d "$DIST" ]]; then
  echo "ERROR: $DIST not found — run 'npx astro build' first." >&2
  exit 2
fi

fail=0

for needle in "$@"; do
  echo "[$needle]"

  # --- built output -----------------------------------------------------------
  hits=$(grep -ril -- "$needle" "$DIST" 2>/dev/null)
  if [[ -n "$hits" ]]; then
    echo "  FAIL still present in dist:"
    while IFS= read -r f; do echo "        ${f#"$DIST"/}"; done <<< "$hits"
    fail=1
  else
    echo "  OK   absent from dist/"
  fi

  # --- substring context ------------------------------------------------------
  # A case-insensitive substring hit may be an unrelated word ('partner' inside
  # 'partnered with security'). Print context so it can be judged, don't assume.
  ctx=$(grep -roiE ".{60}${needle}.{60}" "$DIST" 2>/dev/null | head -3)
  if [[ -n "$ctx" ]]; then
    echo "  note near-matches (may be unrelated wording):"
    while IFS= read -r line; do echo "        ...${line}..."; done <<< "$ctx"
  fi

  # --- live domain ------------------------------------------------------------
  if [[ $LIVE -eq 1 ]]; then
    pages=(/ /work/ /experience/ /certs/ /experiments/ /contact/ /404)
    found_on=()
    for p in "${pages[@]}"; do
      body=$(curl -sS --max-time 10 "https://iankitkumar.in${p}?bust=$RANDOM" 2>/dev/null)
      if printf '%s' "$body" | grep -qi -- "$needle"; then
        found_on+=("$p")
      fi
    done
    if [[ ${#found_on[@]} -gt 0 ]]; then
      echo "  FAIL live on: ${found_on[*]}"
      fail=1
    else
      echo "  OK   absent from all ${#pages[@]} live pages"
    fi
  fi

  echo
done

if [[ $fail -eq 0 ]]; then
  echo "all strings absent — safe to ship."
  exit 0
fi
echo "one or more strings still present — do not deploy."
exit 1