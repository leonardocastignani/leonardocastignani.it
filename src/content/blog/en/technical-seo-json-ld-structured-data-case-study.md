---
title: "How I Optimized This Site's SEO (Case Study)"
description: "Technical analysis of SEO implementations on leonardocastignani.it: automatic Sitemap generation, JSON-LD structured data, and Meta Tag management."
pubDate: "2026-02-23"
updatedDate: "2026-06-23"
heroImage: "/blog/consulente-seo-tecnica-dati-strutturati-marche.webp"
imageAlt: "Source code analysis for technical and international SEO optimization."
imageTitle: "Technical SEO Case Study"
imageCaption: "XML Sitemaps and JSON-LD Structured Data to dominate global search results."
tags: ["SEO", "Case Study", "Astro"]
lang: "en"
alternateSlug: "caso-studio-consulente-seo-tecnica-dati-strutturati"
faqs:
  - question: "How does an automated XML Sitemap improve SEO?"
    answer: "A dynamically generated XML sitemap ensures that every time new content is published, Google Search Console is immediately pinged for fast and accurate indexing."
  - question: "Why is JSON-LD structured data important for search engines?"
    answer: "JSON-LD provides search bots with explicit contextual definitions (like 'LocalBusiness' or 'Person'), guaranteeing your site qualifies for rich snippets in Google searches."
  - question: "How do you manage duplicate content on multilingual websites?"
    answer: "I systematically inject localized Canonical Meta Tags within the `<head>` of each page, providing search engines the strict language and region relationships necessary to avoid penalties."
---

Having a fast site is the first step, but making it "understandable" to search engines is the second. For my portfolio, I didn't just install a plugin (which doesn't exist in Astro in the "WordPress" sense), but I built a solid technical SEO structure by writing code.

Here are the 3 key implementations I deployed for this site.

### 1. Dynamic Sitemap and Robots.txt
Instead of writing the sitemap by hand (risking errors), I used the `@astrojs/sitemap` integration. This script scans my routes (`src/pages`) at build time and automatically generates the final XML file.
This ensures that every time I publish a new post (like this one), Google knows about it immediately via Google Search Console, without manual intervention.

### 2. Structured Data (JSON-LD)
To help Google understand that this is a freelance professional's site, I injected structured data in **JSON-LD** format into the `<head>` of every page.
Here is a real snippet of the code generating the `Person` and `ProfessionalService` schema:

```json
<script type="application/ld+json">
{
  "@context": "[https://schema.org](https://schema.org)",
  "@type": "Person",
  "name": "Leonardo Castignani",
  "url": "[https://www.leonardocastignani.it](https://www.leonardocastignani.it)",
  "jobTitle": "Web Developer",
  "sameAs": [
    "[https://github.com/leonardocastignani](https://github.com/leonardocastignani)",
    "[https://linkedin.com/in/leonardocastignani](https://linkedin.com/in/leonardocastignani)"
  ]
}
</script>
```

### 3. Canonical Meta Tags and Open Graph
Running a multilingual site (IT/EN), avoiding "duplicate content" penalties is crucial. I use a centralized `BaseHead.astro` component that dynamically manages:
* **Canonical URL:** Tells Google which is the "original" version of the current page.
* **Open Graph Image:** The image that appears when you share the link on WhatsApp or LinkedIn. Instead of a generic image for the whole site, each post has its specific cover defined in the Markdown frontmatter.

Technical SEO isn't black magic: it's order, semantics, and adherence to web standards.