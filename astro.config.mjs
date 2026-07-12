// --- IMPORTS ---
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- SITEMAP: BLOG POST LASTMOD LOOKUP ---
function readFrontmatterDate(filePath, field) {
  const contents = readFileSync(filePath, 'utf-8');
  const match = contents.match(new RegExp(`^${field}:\\s*"?([\\d-]+)"?`, 'm'));
  return match ? match[1] : undefined;
}

function buildBlogLastmodMap() {
  const map = new Map();
  for (const lang of ['it', 'en']) {
    const dir = path.join(__dirname, 'src/content/blog', lang);
    for (const file of readdirSync(dir)) {
      if (!file.endsWith('.md')) continue;
      const slug = file.replace(/\.md$/, '');
      const filePath = path.join(dir, file);
      const lastmod = readFrontmatterDate(filePath, 'updatedDate') || readFrontmatterDate(filePath, 'pubDate');
      if (lastmod) {
        const urlPath = lang === 'en' ? `/en/blog/${slug}/` : `/blog/${slug}/`;
        map.set(urlPath, lastmod);
      }
    }
  }
  return map;
}

const blogLastmodMap = buildBlogLastmodMap();

// --- SITEMAP: changefreq/priority RULES PER URL TYPE ---
function getSitemapOverrides(pathname) {
  if (pathname === '/' || pathname === '/en/') {
    return { changefreq: 'weekly', priority: 1.0 };
  }
  if (pathname === '/blog/' || pathname === '/en/blog/') {
    return { changefreq: 'weekly', priority: 0.8 };
  }
  if (pathname.includes('/blog/tag/')) {
    return { changefreq: 'monthly', priority: 0.3 };
  }
  if (pathname === '/privacy-policy/' || pathname === '/en/privacy-policy/') {
    return { changefreq: 'yearly', priority: 0.1 };
  }
  if (pathname.startsWith('/blog/') || pathname.startsWith('/en/blog/')) {
    const overrides = { changefreq: 'monthly', priority: 0.6 };
    const lastmod = blogLastmodMap.get(pathname);
    if (lastmod) overrides.lastmod = lastmod;
    return overrides;
  }
  return {};
}

// --- ASTRO CONFIGURATION ---
export default defineConfig({
  site: 'https://www.leonardocastignani.it',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !/\/blog\/tag\/aggiornamenti\/?/.test(new URL(page).pathname),
      serialize(item) {
        const { pathname } = new URL(item.url);
        return { ...item, ...getSitemapOverrides(pathname) };
      }
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"]
      }
    })
  ]
});