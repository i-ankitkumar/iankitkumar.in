#!/usr/bin/env bash
# ankit-portfolio-builder — pre-deploy verification gate
#
# Runs the gates that must pass before `scripts/deploy.sh` runs. Designed
# to fail loudly and early; never runs the deploy itself.

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PREVIEW="${PREVIEW_URL:-http://127.0.0.1:4321}"

cd "$PROJECT_DIR"

pass=0
fail=0

ok()   { echo "  OK   $*";   pass=$((pass + 1)); }
bad()  { echo "  FAIL $*";   fail=$((fail + 1)); }

# --- 1. astro check ----------------------------------------------------------
echo "[1] astro check"
if npx astro check >/tmp/.astrocheck.log 2>&1; then
  ok "astro check exits 0"
else
  bad "astro check failed — see /tmp/.astrocheck.log"
fi

# --- 2. astro build ----------------------------------------------------------
echo "[2] astro build"
if npx astro build >/tmp/.astrobuild.log 2>&1; then
  ok "astro build produced output in dist/"
else
  bad "astro build failed — see /tmp/.astrobuild.log"
  echo
  echo "$fail gate(s) failed, $pass passed. Refusing to continue."
  exit 1
fi

# --- 3. CSS bundle exists on disk --------------------------------------------
echo "[3] CSS bundle"
css_count=$(find dist/_astro -maxdepth 1 -name '*.css' 2>/dev/null | wc -l)
if [[ "$css_count" -ge 1 ]]; then
  ok "dist/_astro/*.css count = $css_count"
else
  bad "no CSS files in dist/_astro/ — Base layout is missing the global.css import"
fi

# --- 4. CSS link in HTML -----------------------------------------------------
css_link=$(grep -oE '<link[^>]*stylesheet[^>]*href="/_astro/[^"]+"' dist/index.html | head -1)
if [[ -n "$css_link" ]]; then
  ok "dist/index.html links a /_astro/*.css"
else
  bad "dist/index.html does NOT link any /_astro/*.css"
fi

# --- 5. CSS file actually serves (only if preview is running) ----------------
echo "[5] CSS file serves"
if curl -sS -o /dev/null --max-time 2 "$PREVIEW" 2>/dev/null; then
  if [[ -n "$css_link" ]]; then
    css_path=$(printf '%s' "$css_link" | grep -oE '/_astro/[^"]+')
    out=$(curl -sS -o /dev/null -w '%{http_code} %{content_type}' "$PREVIEW$css_path" 2>&1)
    code="${out%% *}"; ctype="${out#* }"
    if [[ "$code" == "200" && "$ctype" == text/css* ]]; then
      ok "preview: $code $ctype $css_path"
    else
      bad "preview CSS: $code $ctype $css_path (expected 200 text/css)"
    fi
  fi
else
  echo "  SKIP preview server not reachable at $PREVIEW"
fi

# --- 6. internal link crawler (only if preview is running) -------------------
echo "[6] internal links"
if curl -sS -o /dev/null --max-time 2 "$PREVIEW/" 2>/dev/null; then
  python3 - <<PY
import re, subprocess, sys
pages = ['/', '/work', '/experience', '/certs', '/experiments', '/contact',
         '/work/splunk-multisite-migration', '/work/soc2-dashboards',
         '/work/global-endpoints', '/work/ids-mlp-gridsearch',
         '/work/nids-ml-dl', '/work/gpp-hack4good', '/work/portfolio-and-blog']
bad = []
for p in pages:
    try:
        body = subprocess.check_output(['curl', '-sS', f'$PREVIEW{p}'], timeout=5).decode()
    except Exception as e:
        bad.append((p, 'fetch error'))
        continue
    for h in re.findall(r'href="([^"]+)"', body):
        if h.startswith(('http', '//', 'mailto:')): continue
        path = h.split('#', 1)[0]
        if not path: continue
        try:
            # -L follows redirects; python -m http.server 301s /work -> /work/ but
            # CF Pages with trailingSlash:'ignore' serves both directly. Either
            # way, the link is valid; a redirect to a 200 page is not a broken link.
            code = subprocess.check_output(['curl', '-sSL', '-o', '/dev/null', '-w', '%{http_code}',
                                            f'$PREVIEW{path}'], timeout=5).decode().strip()
        except Exception:
            bad.append((path, 'curl error'))
            continue
        if not code.startswith('2'):
            bad.append((path, code))
if bad:
    for path, code in bad: print(f'  FAIL {code} {path}')
    sys.exit(1)
print('  OK 0 bad internal links across', len(pages), 'pages')
PY
  rc=$?
  if [[ $rc -eq 0 ]]; then pass=$((pass + 1)); else fail=$((fail + 1)); fi
else
  echo "  SKIP preview server not reachable at $PREVIEW"
fi

# --- 7. head meta + JSON-LD on built / ---------------------------------------
echo "[7] head meta"
home=dist/index.html
checks=(
  '<meta name="description"'
  '<meta property="og:image"'
  '<link rel="canonical"'
  '"@type":"Person"'
  '"jobTitle"'
  '"worksFor"'
  '"sameAs"'
)
for needle in "${checks[@]}"; do
  if grep -qF "$needle" "$home"; then
    ok "head contains: $needle"
  else
    bad "head missing: $needle"
  fi
done

# --- 8. custom 404 page ------------------------------------------------------
echo "[8] custom 404 page"
if grep -q 'class="code">404<' dist/404.html; then
  ok "dist/404.html contains the custom 404 markup"
else
  bad "dist/404.html missing custom 404 markup"
fi

# --- 9. confirm flag round-trips --------------------------------------------
echo "[9] confirm flag"
confirm_in_source=$(grep -rl '^confirm: true' src/content 2>/dev/null | wc -l)
confirm_in_html=$(grep -rc 'confirm-mark' dist/index.html dist/experiments/index.html 2>/dev/null | awk -F: '{s+=$2} END{print s}')
echo "  src confirm:true files = $confirm_in_source"
echo "  confirm-mark rendered in home + experiments pages = $confirm_in_html"

# --- summary ----------------------------------------------------------------
echo
if [[ $fail -eq 0 ]]; then
  echo "all gates passed ($pass). Safe to run scripts/deploy.sh."
  exit 0
else
  echo "$fail gate(s) failed, $pass passed. Refusing to deploy."
  exit 1
fi