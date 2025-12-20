// --- IMPORTS ---
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from '@astrojs/sitemap';

// --- ASTRO CONFIGURATION ---
export default defineConfig({
  site: 'https://www.leonardocastignani.it',
  integrations: [
    tailwind(),
    sitemap()
  ]
});