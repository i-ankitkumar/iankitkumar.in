import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ------------------------------------------------------------------
// iankitkumar.in — Content schema
// Source of truth for every fact-bearing piece of copy on the site.
// Anything unverifiable carries data-confirm="true" so it can be
// surfaced in a review pass before publish.
// ------------------------------------------------------------------

const linkShape = z.object({
  label: z.string(),
  // Allow both absolute URLs and internal paths like /work/foo/ or /experience/#anchor.
  // We can't use z.string().url() because internal paths without a scheme fail validation.
  href: z.string().refine(
    (v: string) => v.startsWith('/') || /^https?:\/\//i.test(v),
    'href must be an absolute URL or an internal path starting with /'
  ),
  external: z.boolean().default(true),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experiences' }),
  schema: ({ image }) =>
    z.object({
      company: z.string(),
      role: z.string(),
      period: z.string(),
      duration: z.string().optional(),
      location: z.string(),
      current: z.boolean().default(false),
      summary: z.string(),
      bullets: z.array(z.string()),
      stack: z.array(z.string()).default([]),
      confirm: z.boolean().default(false),
      order: z.number().default(100),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    type: z.string(),
    status: z.enum(['live', 'shipped', 'in-progress', 'archived', 'research']),
    period: z.string().optional(),
    summary: z.string(),
    problem: z.string().optional(),
    architecture: z.string().optional(),
    implementation: z.string().optional(),
    results: z.string().optional(),
    stack: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    links: z.array(linkShape).default([]),
    featured: z.boolean().default(false),
    confirm: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

const certs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/certs' }),
  schema: z.object({
    name: z.string(),
    issuer: z.string(),
    issued: z.string().optional(),
    status: z.enum(['active', 'expired', 'in-progress']),
    verifyUrl: z.string().url().optional(),
    confirm: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

const experiments = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experiments' }),
  schema: z.object({
    name: z.string(),
    category: z.enum(['ai-agent', 'mcp', 'security-tooling', 'ml-security', 'other']),
    status: z.enum(['live', 'shipped', 'in-progress', 'experimental', 'archived']),
    summary: z.string(),
    problem: z.string().optional(),
    approach: z.string().optional(),
    stack: z.array(z.string()).default([]),
    links: z.array(linkShape).default([]),
    confirm: z.boolean().default(true), // experiments are usually new — default to needing review
    order: z.number().default(100),
  }),
});

export const collections = {
  experience,
  projects,
  certs,
  experiments,
};