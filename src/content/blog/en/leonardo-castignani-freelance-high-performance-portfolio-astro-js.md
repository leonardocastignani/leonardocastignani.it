---
title: "My new portfolio built with Astro"
description: "How I designed my portfolio as a freelance web developer based in Civitanova Marche, Italy: performance, islands architecture, and multilingual setup."
cardDescription: "How I designed this portfolio: performance, Astro, and multilingual setup."
pubDate: "2025-12-19"
updatedDate: "2026-06-23"
heroImage: "/blog/leonardo-castignani-portfolio-sviluppatore-web-freelance-civitanova-marche.webp"
imageAlt: "The new digital portfolio of Leonardo Castignani, developer in Italy."
imageTitle: "Freelance Web Developer Portfolio"
imageCaption: "Built with Astro JS and Tailwind for extreme speed and global SEO performance."
tags: ["sviluppo-astro-performance", "case-study"]
lang: "en"
alternateSlug: "leonardo-castignani-portfolio-sviluppatore-web-freelance-marche"
faqs:
  - question: "Why did you build your portfolio with Astro?"
    answer: "Astro provided the perfect balance of blazing fast loading times, excellent out-of-the-box SEO optimization, and a highly maintainable component-based workflow."
  - question: "What is your professional background as a developer?"
    answer: "I've been a freelance developer since 2021. I'm completing a Bachelor's Degree in Computer Science (L-31) at the University of Camerino, and I hold an IT Technical High School Diploma from IIS \"E. Mattei\" in Recanati (94/100), along with ICDL and COMAU Industrial Robotics certifications."
  - question: "Do you build business websites with Astro in the Marche region?"
    answer: "Yes, I use Astro's power to build high-converting platforms with instant load times for businesses, professionals, and SMEs in Civitanova Marche and across Italy."
---

## Finally Live! 🚀

Welcome to my new digital space. After evaluating several technologies like Next.js, pure React, or simple static generators, I decided to go all-in on **Astro**.

The goal was simple: I wanted a portfolio that was **blazing fast**, easy to maintain, and SEO-optimized.

### The Tech Stack

To build this project, I didn't just stop at the framework; I built a modern ecosystem:

*   **Astro 5.0**: The beating heart of the site.
*   **Tailwind CSS**: For rapid, responsive, and clean styling.
*   **TypeScript**: To ensure code robustness and prevent bugs.
*   **Netlify**: For hosting and automated CI/CD.

### Why Astro?

Astro isn't your typical JavaScript framework. It has a unique approach that made all the difference for this project:

#### 1. Zero JavaScript by Default
Unlike Single Page Applications (SPAs) that load huge JS bundles, Astro ships **only HTML and CSS** to the browser. JavaScript is loaded only when strictly necessary (e.g., for the mobile menu or contact form).

> Less JavaScript means faster load times and happier users.

#### 2. Islands Architecture
This is the real magic. I can have a completely static page and "hydrate" only small islands of interactivity.

Here is an example of how I handle conditional logic directly in the component frontmatter:

```astro
---
// Example of server-side logic in Astro
const { title, lang } = Astro.props;
const isEnglish = lang === 'en';

const formattedDate = new Date().toLocaleDateString(
  isEnglish ? 'en-US' : 'it-IT', 
  { year: 'numeric', month: 'long' }
);
---

<h1>{title}</h1>
<p>{isEnglish ? 'Published on' : 'Pubblicato il'}: {formattedDate}</p>
```

This pattern, repeated across components, lets me handle localization without shipping a client-side i18n framework: all the logic runs at build time, on the server, and the browser only ever receives ready-made HTML.

### Multilingual Setup (i18n)

The site is available in Italian (no prefix, default locale) and English (with an `/en` prefix), with "twin" URLs between the two languages linked via hreflang. It's the same approach I documented in more detail in my article on [building multilingual websites with i18n and Astro](/en/blog/multilingual-website-development-i18n-astro-js/).

### Technical SEO and Structured Data

Beyond performance, I also paid close attention to technical SEO: JSON-LD markup where the Person, Organization, and WebSite entities are linked via `@id` instead of being duplicated, a sitemap with per-page priority and changefreq values, and a `/llms-full.json` endpoint built for generative search engines (GEO). I walked through this exact pattern in my guide on [Schema Markup and JSON-LD structured data in Astro](/en/blog/schema-markup-json-ld-astro-seo-italy/).

### Performance as a Priority

The result of these architectural choices shows up in the numbers: Lighthouse scores close to 100 across Performance, Accessibility, Best Practices, and SEO, without chasing last-minute optimizations. If you're curious about the technical reasoning behind Core Web Vitals, I wrote a dedicated guide on [technical SEO and Core Web Vitals optimization](/en/blog/technical-seo-core-web-vitals-optimization-2026/).

### About Me

I've been a freelance developer since 2021, based in Civitanova Marche, Italy. I'm completing a Bachelor's Degree in Computer Science (L-31) at the University of Camerino, and I hold an IT Technical High School Diploma from IIS "E. Mattei" in Recanati with a 94/100 grade, along with ICDL and COMAU Industrial Robotics certifications. This portfolio is also where I collect everything I learn along the way — if you have a project in mind or just want to talk about Astro, feel free to reach out through the [contact form](/en/#contact) on this site.