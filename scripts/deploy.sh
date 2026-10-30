#!/usr/bin/env bash
# ankit-portfolio-builder — safe deploy
#
# Sources the CF Pages deploy token (~/services/iankitkumar-deploy/.env),
# runs the build, deploys via wrangler, captures the preview URL, and
# verifies the deploy end-to-end on the preview URL before reporting.
#
# Do NOT run with `bash -x` or `set -x`. The .env file contains
# CLOUDFLARE_API_TOKEN; tracing would dump it to scrollback and stdout.

set -euo pipefail

# --- paths -------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$HOME/services/iankitkumar-deploy/.env"
PROJECT_NAME="iankitkumar-in"
BRANCH="main"

cd "$PROJECT_DIR"

# --- guard: env file present and mode 600 -----------------------------------
if [[ ! -f "$ENV_FILE" ]]; then
  echo "ERROR: deploy env file missing at $ENV_FILE" >&2
  exit 2
fi
mode=$(stat -c '%a' "$ENV_FILE")
if [[ "$mode" != "600" ]]; then
  echo "ERROR: $ENV_FILE has mode $mode, expected 600" >&2
  exit 2
fi

# --- source env safely -------------------------------------------------------
# set -a auto-exports every variable assignment; set +a reverts. Wrangler reads
# CLOUDFLARE_API_TOKEN from the environment. We unset at the end so values
# don't leak into subsequent shells.
set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

# --- build -------------------------------------------------------------------
echo "[1/3] building..."
npm run build

# --- deploy ------------------------------------------------------------------
echo "[2/3] deploying to CF Pages ($PROJECT_NAME / $BRANCH)..."
DEPLOY_OUT="$(npx --yes wrangler pages deploy dist \
  --project-name="$PROJECT_NAME" \
  --branch="$BRANCH" \
  --commit-dirty=true 2>&1)"

# extract the preview URL from wrangler's output ("https://<hash>.<project>.pages.dev")
PREVIEW_URL="$(printf '%s\n' "$DEPLOY_OUT" | grep -oE 'https://[a-f0-9]+\.'"$PROJECT_NAME"'\.pages\.dev' | head -1)"
if [[ -z "$PREVIEW_URL" ]]; then
  echo "ERROR: could not extract preview URL from wrangler output:" >&2
  echo "$DEPLOY_OUT" >&2
  unset CLOUDFLARE_API_TOKEN CLOUDFLARE_ACCOUNT_ID WRANGLER_LOG_LEVEL
  exit 3
fi

echo "    preview: $PREVIEW_URL"

# --- verify on the preview URL ----------------------------------------------
echo "[3/3] verifying preview URL..."
fail=0
check() {
  local path="$1" expected="$2" extra="${3:-}"
  local out
  out=$(curl -sS -o /dev/null -w '%{http_code} %{content_type}' "$PREVIEW_URL$path" 2>&1)
  local code="${out%% *}"
  local ctype="${out#* }"
  if [[ "$code" == "$expected" ]] && [[ -z "$extra" || "$ctype" == *"$extra"* ]]; then
    echo "  OK   $code  $ctype  $path"
  else
    echo "  FAIL $code  $ctype  $path  (expected $expected $extra)"
    fail=1
  fi
}

check "/"                  200  text/html
check "/work/"             200  text/html
check "/work/splunk-multisite-migration/" 200  text/html
check "/experience/"       200  text/html
check "/certs/"            200  text/html
check "/experiments/"      200  text/html
check "/tools/"            200  text/html
check "/tools/kittybot/"   200  text/html
check "/contact/"          200  text/html
check "/tools/kittybot/dashboard.webp"      200  image/webp
check "/tools/kittybot/pending.webp"        200  image/webp
check "/tools/kittybot/telegram-approval.png" 200  image/png
check "/sitemap-index.xml" 200  application/xml
check "/resume.pdf"        200  application/pdf
check "/robots.txt"        200  text/plain
check "/this-does-not-exist" 404 text/html

# CSS bundle check
css_path=$(curl -sS "$PREVIEW_URL/" | grep -oE '/_astro/[^"]+\.css' | head -1)
if [[ -n "$css_path" ]]; then
  check "$css_path" 200 text/css
else
  echo "  FAIL no /_astro/*.css link found in HTML"
  fail=1
fi

# --- unset secrets before returning -----------------------------------------
unset CLOUDFLARE_API_TOKEN CLOUDFLARE_ACCOUNT_ID WRANGLER_LOG_LEVEL

echo
if [[ $fail -eq 0 ]]; then
  echo "deploy complete + verified: $PREVIEW_URL"
  echo "custom domain: https://iankitkumar.in/  (propagates in seconds; use cache-buster ?bust=<token>)"
  exit 0
else
  echo "deploy shipped but verification FAILED on $PREVIEW_URL" >&2
  echo "inspect the preview URL before pointing the custom domain at it" >&2
  exit 4
fi