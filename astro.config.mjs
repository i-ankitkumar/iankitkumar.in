// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://iankitkumar.in',
  // 'ignore' lets both /work and /work/ resolve; CF Pages prefers /work/ + index.html,
  // search engines see whatever canonical we emit in <link rel="canonical">.
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});