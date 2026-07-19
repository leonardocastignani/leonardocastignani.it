---
title: "How I Optimized This Site's SEO (Case Study)"
description: "A technical SEO case study: how I optimized automatic Sitemap generation, JSON-LD structured data, and Meta Tags on leonardocastignani.it itself."
cardDescription: "How I optimized the technical SEO of this very site: Sitemap, JSON-LD, and Meta Tags."
pubDate: "2026-02-23"
updatedDate: "2026-06-23"
heroImage: "/blog/consulente-seo-tecnica-dati-strutturati-marche.webp"
imageAlt: "Source code analysis for technical and international SEO optimization."
imageTitle: "Technical SEO Case Study"
imageCaption: "XML Sitemaps and JSON-LD Structured Data to dominate global search results."
tags: ["seo-tecnica", "case-study"]
lang: "en"
alternateSlug: "caso-studio-consulente-seo-tecnica-dati-strutturati"
faqs:
  - question: "How does an automated XML Sitemap improve SEO?"
    answer: "A dynamically generated XML sitemap ensures that every time new content is published, Google Search Console is immediately pinged for fast and accurate indexing."
  - question: "What is structured data (JSON-LD) in SEO?"
    answer: "JSON-LD is code injected into the HTML that clearly explains to Google the nature of a site and its identity (e.g. 'Person' or 'Professional Service'), unlocking rich snippets and strengthening semantic SEO."
  - question: "Do you offer technical SEO optimization services in the Marche region?"
    answer: "Yes, I implement advanced SEO architectures (from dynamic XML Sitemaps to custom JSON-LD) for e-commerce and business websites throughout the Marche region, as well as for clients elsewhere in Italy."
---

Having a fast site is the first step, but making it "understandable" to search engines is the second. For my portfolio, I didn't just install a plugin (which doesn't exist in Astro in the "WordPress" sense), but I built a solid technical SEO structure by writing code, also applying what I studied during my Computer Science coursework at the University of Camerino and my technical diploma from IIS "E. Mattei" in Recanati.

Here are the 3 key implementations I deployed for this site.

### 1. Dynamic Sitemap and Robots.txt
Instead of writing the sitemap by hand (risking errors), I used the `@astrojs/sitemap` integration. This script scans my routes (`src/pages`) at build time and automatically generates the final XML file.
This ensures that every time I publish a new post (like this one), Google knows about it immediately via Google Search Console, without manual intervention.

### 2. Structured Data (JSON-LD)
To help Google understand that this is a freelance professional's site, I injected structured data in **JSON-LD** format into the `<head>` of every page.
Here is a real snippet of the code generating the `Person` schema, with a stable `@id` that any other schema on the page can reference instead of redeclaring the same identity over and over:

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.leonardocastignani.it/#person",
  "name": "Leonardo Castignani",
  "url": "https://www.leonardocastignani.it",
  "jobTitle": "Web Developer",
  "sameAs": [
    "https://github.com/leonardocastignani",
    "https://linkedin.com/in/leonardocastignani"
  ]
}
</script>
```

Alongside the `Person` schema, I also generate a `ProfessionalService` schema describing my activity as a Web & Software Developer. Instead of repeating the same personal details, the `founder` field simply points to the `@id` declared above: this way Google receives a consistent signal and can tell the two entities are the same identity, strengthening the page's E-E-A-T.

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.leonardocastignani.it/#organization",
  "name": "Leonardo Castignani - Software & Web Development",
  "url": "https://www.leonardocastignani.it",
  "founder": { "@id": "https://www.leonardocastignani.it/#person" },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Civitanova Marche",
    "addressRegion": "Marche",
    "addressCountry": "IT"
  },
  "priceRange": "$$"
}
</script>
```

### 3. Canonical Meta Tags and Open Graph
Running a multilingual site (IT/EN), avoiding "duplicate content" penalties is crucial. I use a centralized `BaseHead.astro` component that dynamically manages:
* **Canonical URL:** Tells Google which is the "original" version of the current page.
* **Open Graph Image:** The image that appears when you share the link on WhatsApp or LinkedIn. Instead of a generic image for the whole site, each post has its specific cover defined in the Markdown frontmatter.

Technical SEO isn't black magic: it's order, semantics, and adherence to web standards. If you want to dig into every single schema (Person, LocalBusiness, Article, and BreadcrumbList) with the full, commented code, I wrote a [dedicated guide to JSON-LD structured data in Astro](/en/blog/schema-markup-json-ld-astro-seo-italy/).