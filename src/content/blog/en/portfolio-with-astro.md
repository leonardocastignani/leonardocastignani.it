---
title: "My new portfolio built with Astro"
description: "A deep dive into how I designed this site: performance, islands architecture, and multilingual management."
pubDate: "2025-12-19"
tags: ["Astro", "Portfolio", "Performance"]
lang: "en"
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