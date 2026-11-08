---
title: "Changelog v2.0.0: Light Theme, Astro 7 and Tailwind 4"
description: "Changelog v2.0.0: full light theme restyling, upgrade to Astro 7 and Tailwind CSS v4, new flag-based language switcher, and multilingual 404 fixes."
cardDescription: "What's new in v2.0.0: light theme, Astro 7 and Tailwind v4 upgrade, flag-based language switcher."
pubDate: "2026-11-09"
updatedDate: "2026-11-09"
heroImage: "/blog/release-2.0.0-tema-light-astro-7-tailwind-4-sito-web-marche.webp"
imageAlt: "Release notes for version 2.0.0 featuring the site's light theme restyling."
imageTitle: "Changelog v2.0.0: Light Theme and Technical Upgrade"
imageCaption: "A new light visual identity built on an updated technical foundation: Astro 7 and Tailwind CSS v4."
tags: ["aggiornamenti"]
lang: "en"
alternateSlug: "changelog-v2-0-0-tema-light-upgrade-astro-7-tailwind-4"
faqs:
  - question: "What changes in version 2.0.0?"
    answer: "This is the biggest release since the blog went live: the site moves from a dark theme to a fixed light theme, the framework is upgraded to Astro 7 and Tailwind CSS to version 4, the language switcher now uses flag icons instead of text labels, and an indexing issue on the multilingual 404 pages has been fixed."
  - question: "Why switch from a dark theme to a light one?"
    answer: "A light theme gives more readable contrast for the business audience this site targets, along with a cleaner, more professional look. The old dark/light toggle was also never fully wired up on the JavaScript side, so I chose to settle on one solid, well-polished theme instead of keeping dead, never-activated CSS around."
  - question: "Do you also offer update and migration services for existing business websites in the Marche region?"
    answer: "Yes. Besides building from scratch, I also take care of updating Astro, React, and Tailwind projects already in production: framework major-version migrations (like this one to Astro 7 and Tailwind 4), accessibility audits, and technical SEO, for businesses in and around Civitanova Marche."
---

I'm happy to announce the release of version **2.0.0** of the site. It's the biggest update since the blog went live: not a small tweak, but a full visual restyling paired with a structural modernization of the project's technical foundations.

Here are the details of the changes introduced in this release:

### 🎨 Restyling: Light Theme
* **Switch to a light theme:** The site drops its dark look for a fixed light theme, with palette, shadows, header glassmorphism, and scroll states redesigned from scratch for clean, consistent contrast across every component.
* **Flag-based language switcher:** The "IT" / "EN" text labels in the header are replaced by two new flag icons (Italy / United Kingdom), making the language switch more immediate and recognizable at a glance, on mobile too.

### ⚙️ Framework Upgrade
* **Astro upgraded to v7:** The site's engine jumps from v5 to v7, passing through v6 in one go: two major versions in sequence, including the migration of content collections to the new loader-based Content Layer API. The schema moved from `src/content/config.ts` to `src/content.config.ts`, with `type: 'content'` replaced by a real `loader: glob(...)` - I've updated my [guide to Content Collections with Zod](/en/blog/astro-content-collections-zod-multilingual-blog/) to match, since until yesterday it still quoted the old syntax.
* **Tailwind CSS to v4:** The styling stack adopts Tailwind's new CSS-first engine via its Vite plugin, dropping the legacy setup (`tailwind.config.mjs`, PostCSS, and Autoprefixer) in favor of a leaner configuration and faster builds.
* **Build environment on Node.js 22:** The Node version is now pinned in `.nvmrc`, on Netlify, and in the GitHub Actions pipeline, keeping local development and production aligned with the new majors' requirements.

### 🐛 Bug Fixes and Accessibility
* **Multilingual 404 fixes:** The Italian and English error pages were handled inconsistently by the sitemap. Both are now excluded, though through two different mechanisms: the Italian one (`/404.html`) is a "bare" file that Astro's sitemap integration never sees as a route in the first place, while the English one (`/en/404/`) needs to be excluded explicitly in the filter - the same filtering mechanism I cover in my [guide to XML sitemaps and robots.txt](/en/blog/xml-sitemap-robots-txt-technical-seo-guide-astro/). Both also remain marked `noindex`.
* **Language-switch link on the 404 page:** The link from the English 404 page to its Italian counterpart pointed to a URL that didn't exist; it now resolves to the correct page.
* **More accessible labels:** The `aria-label`s on the language switcher and other header controls are now more explicit for screen reader users - adding to what I cover in my [guide to building accessible websites](/en/blog/accessible-web-development-a11y-standards/).

---

*The site is constantly evolving: if you missed the [previous release, v1.2.0](/en/blog/google-tag-manager-integration-update-v1-2-0/), with the Google Tag Manager integration, feel free to catch up on it. See you in the next update!*
