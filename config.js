/**
 * Operator Portfolio — Ankit Kumar
 * Based on https://github.com/LucidAkshay/operator-portfolio (MIT)
 * Edit this file to update resume content on the site.
 */

const CONFIG = {

  googleAnalyticsId: "", // leave empty to disable

  name: "Ankit Kumar",
  handle: "i-ankitkumar",
  tagline: "DevOps & Cloud Infrastructure Engineer",
  headline: "DevOps & Cloud Infrastructure | Splunk · Azure · Terraform · CI/CD",
  pronouns: "He/Him",
  location: "Mumbai — targeting Germany",
  locationFull: "Mumbai, India",
  country: "IN",

  email: "mail@iankitkumar.in",
  emailHire: "mail@iankitkumar.in",
  linkedin: "https://www.linkedin.com/in/i-ankitkumar",
  github: "https://github.com/i-ankitkumar",
  blog: "https://blog.iankitkumar.in",
  sponsor: "",
  templateRepo: "https://github.com/LucidAkshay/operator-portfolio",
  resumeUrl: "./assets/resume.pdf",

  photo: "./assets/photo.jpg",
  ogImage: "./assets/og-preview.png",

  siteUrl: "https://iankitkumar.in",
  siteTitle: "Ankit Kumar — DevOps & Cloud Infrastructure",
  siteDesc: "Ankit Kumar — DevOps & Cloud Infrastructure Engineer. Splunk multi-site ops, Azure, Terraform, CI/CD. Open to DevOps/SRE roles in Germany. EU Blue Card eligible · German A1 · English C1.",
  twitterHandle: "",

  company: "Wolters Kluwer",
  companyUrl: "https://www.wolterskluwer.com",

  stats: {
    years: { value: "4+", label: "Years Experience" },
    toil: { value: "35–70%", label: "Toil Reduced" },
    uptime: { value: "99.9%+", label: "Availability Focus" },
    certs: { value: "5+", label: "Cloud Certs" },
  },

  heroTags: ["Splunk", "Azure", "Terraform", "CI/CD", "Germany"],

  heroDesc: `<strong>IT Infra &amp; Ops Analyst at Wolters Kluwer</strong> — running platforms that have to stay up: <strong>Splunk</strong> multi-site clusters, <strong>Azure</strong> foundations, and <strong>IaC / CI/CD</strong> that remove BAU toil. Previously Colgate GBS (global endpoints &amp; patching). Open to <strong>DevOps / SRE roles in Germany</strong>.`,

  pageSections: [
    { id: "services", num: "01", title: "How I Can Help", tmpl: "tmpl-services" },
    { id: "work", num: "02", title: "Projects", containerId: "projects-grid", containerClass: "pgrid" },
    { id: "about", num: "03", title: "About", tmpl: "tmpl-about", bg: "var(--s1)" },
    { id: "certs", num: "04", title: "Certifications & Recognition", containerId: "certs-grid", containerClass: "certs-grid", extraHtml: '<div class="awards-row" id="awards-row" style="margin-top:2px"></div>' },
    { id: "exp", num: "05", title: "Experience", containerId: "timeline", containerClass: "tl" },
    { id: "contact", num: "06", title: "Let us Work Together", tmpl: "tmpl-contact", bg: "var(--s1)" }
  ],

  navLinks: [
    { href: "#work", label: "WORK" },
    { href: "#about", label: "ABOUT" },
    { href: "#certs", label: "CERTS" },
    { href: "#exp", label: "EXPERIENCE" },
    { href: "#contact", label: "CONTACT" },
    { href: "https://blog.iankitkumar.in", label: "BLOG" }
  ],

  bootSequence: [
    "$ initializing iankitkumar.in <span class=\"inf\">v1.0</span>",
    "&gt; identity verified: devops &amp; cloud infrastructure <span class=\"ok\">[✓]</span>",
    "&gt; wolters kluwer — splunk · azure · iac <span class=\"ok\">[ACTIVE]</span>",
    "&gt; terraform · azure devops · github actions <span class=\"ok\">[READY]</span>",
    "&gt; targeting: germany devops / sre <span class=\"ok\">[OPEN]</span>",
    "&gt; german a1 · english c1 · blue card eligible <span class=\"ok\">[✓]</span>",
    "&gt; rendering operator interface <span class=\"inf\">standby...</span>"
  ],

  aiChips: [],

  terminalHints: [
    "hire", "experience", "skills", "cv", "blog", "splunk"
  ],

  ticker: [
    "4+ years enterprise ops ◆ wolters kluwer · colgate gbs",
    "splunk multi-site ◆ ha · dr · arc certification",
    "azure · entra id · key vault · cyberark",
    "terraform · azure devops · github actions ◆ iac / ci/cd",
    "toil −35–70% via automation ◆ 99.9%+ availability focus",
    "open to devops / sre roles in germany ◆ blue card eligible",
  ],

  services: [
    {
      cardClass: "enterprise",
      icon: "⚙️",
      audience: "For Hiring Managers",
      title: "DevOps / SRE",
      desc: "You need someone who has owned production platforms — Splunk clusters, Azure foundations, incidents — and can prove impact with metrics, not buzzwords.",
      offers: [
        "Splunk multi-site HA / DR operations",
        "Azure foundations, Entra ID, Key Vault",
        "Terraform + Azure DevOps / GitHub Actions",
        "Incident ownership toward 99.9%+ availability",
      ],
      ctaText: "Talk roles →",
      ctaLink: "#contact",
    },
    {
      cardClass: "founders",
      icon: "🏗️",
      audience: "For Platform Teams",
      title: "Infra & Automation",
      desc: "I cut BAU toil with runbooks and pipelines — patch cycles, monitoring, and provisioning that stop surprise incidents.",
      offers: [
        "BAU / toil reduction via automation",
        "CI/CD for infra provisioning",
        "Observability & patch-cycle monitoring",
        "Runbooks that teams actually use",
      ],
      ctaText: "See experience →",
      ctaLink: "#exp",
    },
    {
      cardClass: "developers",
      icon: "🔐",
      audience: "For Security-adjacent Work",
      title: "Ops × Security",
      desc: "Background in endpoint fleets, SOC2 visibility, and zero-day patch response — useful when DevOps sits next to SecOps.",
      offers: [
        "SOC2-oriented Splunk dashboards",
        "Global patch ops (SCCM / Tanium)",
        "Identity & secrets (Entra, Key Vault, CyberArk)",
      ],
      ctaText: "GitHub →",
      ctaLink: "https://github.com/i-ankitkumar",
      ctaExternal: true,
    },
    {
      cardClass: "collab",
      icon: "🇩🇪",
      audience: "For Germany / EU Roles",
      title: "Relocation-ready",
      desc: "Mumbai-based, actively targeting DevOps / SRE roles in Germany. EU Blue Card eligible · German A1 · English C1.",
      offers: [
        "Lebenslauf (CV) ready to download",
        "Enterprise ops narrative recruiters can scan",
        "Open to hybrid / on-site in Germany",
      ],
      ctaText: "Download CV →",
      ctaLink: "./assets/resume.pdf",
      ctaExternal: true,
    },
  ],

  aboutCards: [
    {
      label: "Primary Stack",
      title: "Cloud & Observability",
      desc: "Azure · Splunk · Entra ID · Key Vault · CyberArk · Grafana · RHEL",
      tag: "Enterprise"
    },
    {
      label: "DevOps & Automation",
      title: "IaC & Pipelines",
      desc: "Terraform · Azure DevOps · GitHub Actions · Docker · Python · PowerShell · Bash",
      tag: "Day-to-day"
    }
  ],

  projects: [
    {
      id: "portfolio",
      type: "Personal Site — Production",
      name: "iankitkumar.in",
      status: "live",
      statusLabel: "● Live",
      template: "terminal",
      cardClass: "portfolio-card",
      desc: "Personal domain on Cloudflare: DNS, Email Routing, Pages for portfolio + sibling blog. End-to-end ownership from registrar to TLS to deploy — the portfolio is also an ops demo.",
      tags: ["Cloudflare", "DNS", "Pages", "HTML/CSS/JS"],
      link: "https://github.com/i-ankitkumar/iankitkumar.in",
      linkText: "View on GitHub",
      linkStyle: "lime",
    },
    {
      id: "blog",
      type: "Learning Blog",
      name: "blog.iankitkumar.in",
      status: "live",
      statusLabel: "● Live",
      desc: "Astro + Brutal theme on Cloudflare Pages. Short write-ups on cloud, DevOps, Splunk, Azure, and Terraform from real work.",
      tags: ["Astro", "Cloudflare Pages", "Brutal"],
      link: "https://blog.iankitkumar.in",
      linkText: "Read the blog",
      linkStyle: "lime",
    },
    {
      id: "ids",
      type: "ML / Security — Open Source",
      name: "IDS using MLP + GridSearchCV",
      status: "live",
      statusLabel: "● GitHub",
      desc: "Intrusion detection experiments with multilayer perceptron and hyperparameter search — academic / research side of security ops interest.",
      tags: ["Python", "ML", "Security"],
      link: "https://github.com/i-ankitkumar/IDS_using_MLP-GridSearchCV",
      linkText: "View on GitHub",
      linkStyle: "default",
    },
    {
      id: "nids",
      type: "ML / Security — Open Source",
      name: "NIDS using ML and DL",
      status: "live",
      statusLabel: "● GitHub",
      desc: "Network intrusion detection with classical ML and deep learning approaches.",
      tags: ["Python", "Deep Learning", "NIDS"],
      link: "https://github.com/i-ankitkumar/NIDS_using_MLandDL",
      linkText: "View on GitHub",
      linkStyle: "default",
    },
    {
      id: "hack4good",
      type: "Hackathon",
      name: "GPP Hack4Good",
      status: "live",
      statusLabel: "● GitHub",
      desc: "Hackathon project work — collaborative build under time pressure.",
      tags: ["Hackathon", "Team"],
      link: "https://github.com/i-ankitkumar/GPP_Hack4Good",
      linkText: "View on GitHub",
      linkStyle: "default",
    },
  ],

  experience: [
    {
      company: "Wolters Kluwer",
      role: "IT Infra & Ops Analyst — DevOps & Cloud",
      sub: "IT Infrastructure & Operations",
      period: "Apr 2024 — Present",
      duration: "current",
      location: "Mumbai · Hybrid",
      current: true,
      bullets: [
        "Led <strong>Splunk multi-site cluster migration</strong>; WK ARC certification — HA, DR, stronger search performance",
        "DR plans with <strong>RPO/RTO</strong> across data centers for mission-critical Splunk",
        "~<strong>35% BAU reduction</strong> via automation; patch-cycle monitoring cut incident surprises",
        "P1/P2 ownership toward <strong>99.9%+</strong> availability; mentored 3+ engineers; CI/CD for infra provisioning",
      ],
      tags: ["Splunk", "Azure", "Terraform", "CI/CD", "Incidents"],
    },
    {
      company: "Wolters Kluwer",
      role: "Associate IT Infra & Ops Analyst",
      sub: "IT Infrastructure & Operations",
      period: "Aug 2022 — Mar 2024",
      duration: "1 yr 8 mos",
      location: "Mumbai · Hybrid",
      current: false,
      bullets: [
        "Splunk dashboards for financial reporting + <strong>SOC2</strong> visibility",
        "Azure dev/test Splunk cluster; <strong>Entra ID SSO</strong>; Key Vault / CyberArk / Jira",
        "Runbooks cut manual effort ~<strong>70%</strong>; Star Performer Q1 2023",
      ],
      tags: ["Splunk", "Azure", "Entra ID", "SOC2", "Runbooks"],
    },
    {
      company: "Colgate GBS",
      role: "Executive Associate",
      sub: "Global endpoints & patching",
      period: "Aug 2021 — Jul 2022",
      duration: "1 yr",
      location: "India",
      current: false,
      bullets: [
        "<strong>20,000+</strong> Windows endpoints (SCCM/MECM, Workspace One, Tanium)",
        "Patch ops across <strong>79 factories / 70 countries</strong>; zero-day response with Security",
      ],
      tags: ["SCCM/MECM", "Tanium", "Patch Ops", "Endpoints"],
    },
  ],

  certifications: [
    { type: "microsoft", issuer: "HashiCorp", name: "Terraform Associate", date: "Active", active: true },
    { type: "microsoft", issuer: "Microsoft", name: "AZ-104 Azure Administrator", date: "Active", active: true },
    { type: "microsoft", issuer: "Red Hat", name: "RHCSA", date: "Active", active: true },
    { type: "microsoft", issuer: "Microsoft", name: "AZ-900 Azure Fundamentals", date: "Active", active: false },
    { type: "microsoft", issuer: "Microsoft", name: "AI-900 Azure AI Fundamentals", date: "Active", active: false },
    { type: "microsoft", issuer: "Microsoft", name: "AZ-400 (in progress)", date: "In progress", active: true },
  ],

  awards: [
    { icon: "⭐", name: "Star Performer", by: "Wolters Kluwer · Q1 2023", note: "Ops excellence" },
    { icon: "✅", name: "WK ARC Certification", by: "Wolters Kluwer", note: "Splunk multi-site migration" },
  ],

  bio: [
    `At <em>Wolters Kluwer</em> I run platforms that have to stay up — especially <em>Splunk</em> multi-site clusters, <em>Azure</em> foundations, and IaC / CI/CD that remove BAU toil. Before that, <em>Colgate GBS</em>: global Windows endpoint and patch operations across dozens of countries.`,
    `Certifications: <em>Terraform Associate</em>, <em>AZ-104</em>, <em>RHCSA</em>, plus Azure fundamentals. AZ-400 in progress. I care about measurable outcomes — toil down, availability up, fewer surprise incidents.`,
    `Based in Mumbai and targeting <em>DevOps / SRE roles in Germany</em>. EU Blue Card eligible · German A1 · English C1. Learning notes live on <a href="https://blog.iankitkumar.in" target="_blank" rel="noopener">blog.iankitkumar.in</a>.`,
  ],

  aboutStats: [
    { value: "4+", label: "Years Experience" },
    { value: "35%", label: "BAU Cut (WK)" },
    { value: "70%", label: "Manual Effort Cut" },
    { value: "20K+", label: "Endpoints (Colgate)" },
  ],

  awardChips: [
    { text: "⭐ Star Performer — WK Q1 2023", hot: true },
    { text: "✅ WK ARC — Splunk multi-site", hot: false },
    { text: "📜 Terraform Associate", hot: false },
    { text: "📜 AZ-104", hot: false },
    { text: "📜 RHCSA", hot: false },
  ],

  relocationTargets: [
    { flag: "🇩🇪", country: "Germany" },
    { flag: "🇳🇱", country: "Netherlands" },
    { flag: "🇪🇺", country: "EU (open)" },
  ],

  colors: {
    accent: "#FF3B1F",
    lime: "#B8FF26",
    gold: "#F4C73E",
    blue: "#4F8EF7",
  },
};

if (typeof module !== "undefined") module.exports = CONFIG;
