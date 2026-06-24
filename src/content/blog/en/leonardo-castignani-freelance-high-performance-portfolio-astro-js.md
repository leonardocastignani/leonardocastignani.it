---
title: "My new portfolio built with Astro"
description: "A deep dive into how I designed this site: performance, islands architecture, and multilingual management."
pubDate: "2025-12-19"
updatedDate: "2026-06-23"
heroImage: "/blog/leonardo-castignani-portfolio-sviluppatore-web-freelance-civitanova-marche.webp"
imageAlt: "The new digital portfolio of Leonardo Castignani, developer in Italy."
imageTitle: "Freelance Web Developer Portfolio"
imageCaption: "Built with Astro JS and Tailwind for extreme speed and global SEO performance."
tags: ["Astro", "Portfolio", "Performance"]
lang: "en"
alternateSlug: "leonardo-castignani-portfolio-sviluppatore-web-freelance-marche"
faqs:
  - question: "Why did you build your portfolio with Astro?"
    answer: "Astro provided the perfect balance of blazing fast loading times, excellent out-of-the-box SEO optimization, and a highly maintainable component-based workflow."
  - question: "What is the benefit of a Zero JavaScript approach?"
    answer: "By omitting heavy JS bundles for static content, the Time to Interactive (TTI) plummets, providing users with instant page renders and improving Core Web Vitals."
  - question: "How do you handle dynamic components within Astro?"
    answer: "Using Astro's Islands Architecture, I can hydrate isolated interactive components (like navigation menus) while the rest of the layout remains perfectly static pure HTML."
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

> "Less JavaScript means faster load times and happier users."

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