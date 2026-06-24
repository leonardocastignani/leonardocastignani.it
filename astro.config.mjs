// --- IMPORTS ---
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// --- ASTRO CONFIGURATION ---
export default defineConfig({
  site: 'https://www.leonardocastignani.it',
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [
    tailwind(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"]
      }
    })
  ]
});