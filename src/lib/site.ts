/**
 * iankitkumar.in — Site configuration
 * Single source of truth for identity, links, and metadata.
 * Anything you can verify lives here; anything still under review is flagged with `confirm: true`.
 */

export const SITE = {
  name: 'Ankit Kumar',
  // Lead headline on the hero — matches the user's new brief
  role: 'Infrastructure Engineer → Software & AI Engineering',
  tagline: 'Splunk · Azure · AWS · Terraform · MCP',
  description:
    'Ankit Kumar is an infrastructure engineer at Wolters Kluwer transitioning into software and AI engineering. Splunk multi-site clusters, Azure, AWS, Terraform, MCP, and AI-powered security tooling. Based in Pune, India; relocating to Heidelberg.',

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
  resumeUrl: '/resume.pdf',
  photoUrl: '/photo.jpg',
  ogImageUrl: '/og-preview.png',
  faviconUrl: '/favicon.svg',

  // Hosting
  siteUrl: 'https://iankitkumar.in',
  hosting: 'Cloudflare Pages · project iankitkumar-in',

  // Public positioning strings — verified against CV
  location: 'Pune, India — relocating to Heidelberg',
  locationShort: 'Pune → Heidelberg',
  status: 'Open to software & AI engineering roles in Germany',
  languages: 'English (C1, fluent) · Hindi (native) · German (A2, basic)',
  eligibility: 'EU Blue Card eligible',

  // Primary social handles (used in JSON-LD sameAs)
  sameAs: [
    'https://github.com/i-ankitkumar',
    'https://www.linkedin.com/in/i-ankitkumar',
    'https://blog.iankitkumar.in',
  ],

  // Confirms — set true on claims still pending user verification
  confirm: {
    aws: false, // CV shows deep AWS production use (EC2/SSM/S3/IAM/VPC/etc.)
    mcp: false, // AI-assisted automation initiative at WK validates MCP direction
    aiSecurityTooling: false, // AI-assisted pipeline/log/release initiative at WK validates this
    relocateHeidelberg: false, // Confirmed in cv.md (Pune → Heidelberg, partner in Heidelberg)
    relocateWindow: true, // No specific window has been confirmed
  },
};

export type SiteConfig = typeof SITE;