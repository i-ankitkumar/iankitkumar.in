/**
 * iankitkumar.in — Site configuration
 * Single source of truth for identity, links, and metadata.
 * Anything you can verify lives here; anything still under review is flagged with `confirm: true`.
 */

import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Content-address the resume PDF.
 *
 * The PDF is served from a stable path (/resume.pdf) so the link never
 * breaks, but Cloudflare's zone-level cache rule pins PDFs at a 4-hour
 * TTL and overrides the origin's Cache-Control. A visitor who fetched the
 * old PDF kept seeing it after a rebuild. Appending the file's hash turns
 * the URL into a new cache key whenever the content changes, so a rebuild
 * is visible immediately without touching the zone rules.
 *
 * Build-time only: this module is imported exclusively from Astro
 * frontmatter, never from a client script.
 */
function resumeUrl(): string {
  // Astro rewrites import.meta.url when it bundles this module, so resolve
  // the PDF from the project root instead. `astro build` runs there.
  const candidates = [
    join(process.cwd(), 'public', 'resume.pdf'),
    join(process.cwd(), '..', 'public', 'resume.pdf'),
  ];
  for (const path of candidates) {
    try {
      if (!existsSync(path)) continue;
      const hash = createHash('sha256')
        .update(readFileSync(path))
        .digest('hex')
        .slice(0, 8);
      return `/resume.pdf?v=${hash}`;
    } catch {
      // try the next candidate
    }
  }
  // No PDF yet (fresh clone) - fall back to the bare path.
  return '/resume.pdf';
}

export const SITE = {
  name: 'Ankit Kumar',
  // Lead headline on the hero — matches the user's new brief
  role: 'Infrastructure Engineer → Software & AI Engineering',
  tagline: 'Splunk · Azure · AWS · Terraform · MCP',
  description:
    'Infrastructure engineer in Pune, relocating to Germany. Turns three-day infrastructure work into fifteen-minute button presses — Splunk, Terraform, Python, AI tooling.',

  // Public contact (routed via Cloudflare Email Routing → real inbox)
  email: 'mail@iankitkumar.in',
  emailDirect: 'iankitkumar.work@gmail.com',
  phone: '+91 9422070543',

  // Verified URLs (handle is i-ankitkumar across surfaces)
  github: 'https://github.com/i-ankitkumar',
  linkedin: 'https://www.linkedin.com/in/i-ankitkumar',
  blog: 'https://blog.iankitkumar.in',
  twitter: '', // intentionally empty — not used publicly
  youtube: '', // not used in this surface

  // Static assets
  resumeUrl: resumeUrl(),
  // The rendered portrait: pre-cropped to the face, 384px WebP, 14 KB.
  photoUrl: '/photo.webp',
  // The full-size source, kept for the JSON-LD Person image where a
  // crawler wants something larger than a 96px display crop.
  photoSourceUrl: '/photo.jpg',
  ogImageUrl: '/og-preview.png',
  faviconUrl: '/favicon.svg',
  faviconDarkUrl: '/favicon-dark.svg',
  appleTouchIconUrl: '/apple-touch-icon.png',

  // Hosting
  siteUrl: 'https://iankitkumar.in',
  hosting: 'Cloudflare Pages · project iankitkumar-in',

  // Public positioning strings — verified against CV
  location: 'Pune, India — relocating to Germany',
  locationShort: 'Pune to Germany',
  status: 'Open to software & AI engineering roles in Germany',
  languages: 'English (C1, fluent) · Hindi (native) · German (A2, basic)',

  // Primary social handles (used in JSON-LD sameAs)
  sameAs: [
    'https://github.com/i-ankitkumar',
    'https://www.linkedin.com/in/i-ankitkumar',
    'https://blog.iankitkumar.in',
  ],

  // Confirms — set true on claims still pending user verification.
  //
  // These are the site-level claims that do not belong to a single
  // content entry. Every one of them is currently confirmed, so none of
  // them renders a `verify` badge: a badge on a verified claim would be
  // a lie. relocateWindow stays true because no window is published —
  // the site says "relocating to Germany" and never claims a date, so
  // there is no unverified claim on the page to mark.
  confirm: {
    aws: false, // CV shows deep AWS production use (EC2/SSM/S3/IAM/VPC/etc.)
    mcp: false, // AI-assisted automation initiative at WK validates MCP direction
    aiSecurityTooling: false, // AI-assisted pipeline/log/release initiative at WK validates this
    relocateGermany: false, // Confirmed in cv.md (Pune → Germany)
    relocateWindow: true, // No specific window has been confirmed
  },
};

export type SiteConfig = typeof SITE;