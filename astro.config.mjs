import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.leonardocastignani.it',
  integrations: [tailwind(), sitemap()],
  trailingSlash: 'always'
  // i18n: {
  //   defaultLocale: 'it',
  //   locales: ['it', 'en'],
  //   routing: {
  //     prefixDefaultLocale: false,
  //   },
  // }
});