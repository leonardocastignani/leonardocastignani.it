---
title: "Vibe Coding: What Really Works and Where Human Insight is Irreplaceable"
description: "Vibe Coding: what AI actually gets right in software development, where it breaks down, and why human review still decides architecture and security."
cardDescription: "The real limits of Vibe Coding on corporate projects: where AI excels and where human experience still matters."
pubDate: "2026-08-31"
updatedDate: "2026-08-31"
heroImage: "/blog/vibe-coding-ai-limiti-sviluppo-software-architettura-italia.webp"
imageAlt: "Visual comparison between AI-generated Vibe Coding and human-reviewed software architecture."
imageTitle: "Vibe Coding: The Limits of AI in Development"
imageCaption: "Artificial Intelligence speeds up coding, but architecture and security demand human expertise."
tags: ["ai-innovazione", "sviluppo-software-qualita"]
lang: "en"
alternateSlug: "vibe-coding-ai-limiti-sviluppo-software-marche"
faqs:
  - question: "What is Vibe Coding in web development?"
    answer: "Vibe Coding is the practice of building software by describing desired features in natural language to an AI (like GitHub Copilot, Cursor, or Claude Code), which then generates the underlying code automatically, while the developer stays in charge of the architectural decisions."
  - question: "Why can't AI fully replace human web developers?"
    answer: "While AI excels at prototyping and boilerplate code, it struggles with the critical final 10%: it cannot question business logic, ensure flawless accessibility (A11y), or reliably catch silent bugs and security vulnerabilities that slip past surface-level testing without an experienced reviewer in the loop."
  - question: "Do you build robust, human-reviewed web applications for global businesses?"
    answer: "Absolutely. Based in Civitanova Marche, Italy, I leverage AI to accelerate routine development while applying rigorous engineering standards to deliver secure, scalable, and high-converting custom software for international clients."
---

There is a new buzzword sweeping the software development world: **Vibe Coding**. It essentially means "programming by feeling." Instead of writing syntax line-by-line, the developer (or user) verbally or textually describes what they want to an Artificial Intelligence (like GitHub Copilot, Cursor, or Claude Code), and the AI generates the code in seconds.

It sounds like magic, and in some ways, it is. YouTube and LinkedIn are full of videos showing people "building Spotify clones in 10 minutes" using only text prompts.
But what happens when we take Vibe Coding out of the tutorials and apply it to a **real, client-facing project with actual money on the line**?

This is where the magic ends and engineering begins. Here is what really works and where "Vibe Coding" crashes into reality.

### The Superpower: Where AI Shines
Don't get me wrong, AI has forever changed the way I work. As a developer, I use it daily to:
* **Generate Boilerplate:** Write those repetitive and boring portions of code (initial setups, basic typings) that take up hours.
* **Lightning-fast Prototyping:** If a client wants to see what a contact form would look like on a page, I can get them a working preview in minutes.
* **Explaining Errors:** Pasting an incomprehensible error message into the AI to have it point out the exact file where the problem lies.

In these phases, the AI is like a tireless, blazing-fast *Junior* programmer sitting right next to me. Even the articles on this blog are born this way: a first draft generated with AI, then combed through - a process that, as I explain in the [dedicated section of my Privacy Policy](/en/privacy-policy/#ai-transparency), always goes through human editorial review before publication.

### The Wall of Reality: The "Remaining 10%"
There is an old adage in computer science: *"The first 90% of the code accounts for the first 90% of the development time. The remaining 10% of the code accounts for the other 90% of the development time."*
AI is phenomenal at getting you quickly to the first 90%. It is an absolute disaster at completing the last 10%.

Here is where a project generated exclusively with "Vibe Coding" falls apart:
1.  **Accessibility (A11y):** AI generates interfaces that *look* beautiful but often forgets semantic tags, keyboard navigation, and screen reader labels. The result? A non-compliant site that excludes a real share of users - the topic I dig into in my [guide to building accessible websites](/en/blog/accessible-web-development-a11y-standards/).
2.  **Architecture and Scalability:** Asking an AI to "add a function" in a file works. Asking it to structure an entire database that will need to scale to handle thousands of simultaneous orders without crashing? It will generate unsustainable "spaghetti" code in the long run - the same planning discipline I cover in my article on the [phases of a corporate software project](/en/blog/custom-software-development-lifecycle/).
3.  **Invisible Security:** AI copies patterns found online, including vulnerable ones. It might generate a database query that works perfectly but leaves the site wide open to attacks like SQL Injection - a risk to guard against with the same security policies I cover in my [guide to Content Security Policy on Astro](/en/blog/website-security-csp-astro-guide-italy/).

### A Real Bug, Not a Textbook Example
To keep this grounded, not theoretical: a few weeks ago, on this very site, a mobile widget (the small "speed-dial" menu with the WhatsApp and cookie-preferences buttons) stopped responding to taps. The AI-generated code was syntactically flawless, passed linting, and appeared to work locally. The problem? An initialization function was being called twice on every page load, attaching two identical click listeners that canceled each other out - a bug the AI couldn't have caught on its own, because it required actually *testing* the interaction on a mobile viewport, not just re-reading the code. We only found and fixed it through targeted testing with a real browser in mobile emulation, not by re-reading the snippet one more time.

This is exactly the "remaining 10%": a bug that compiles, throws no console errors, and looks correct - until someone actually tries it.

### The Biggest Problem: AI Doesn't Ask "Why?"
The ultimate limitation of Vibe Coding in the real world is business communication.
When a client tells me: *"I want a giant pop-up asking for an email as soon as the user opens the site"*, the AI will code it instantly.

As a human consultant, I don't write the code right away. First, I ask: *"Why? What is the goal?"*.
If the goal is to increase conversions, I explain to the client that an instant mobile pop-up will be penalized by Google and will drive users away. Instead, I propose an elegant *Call to Action* at the end of the article - the same test-and-validate logic I apply in my [software testing and debugging process](/en/blog/software-testing-debugging-business-stability/).

AI follows orders blindly. Humans question the requirement to protect the client's business.

### Conclusion: From Typists to Architects
Vibe Coding will not replace professional web developers, but it will eliminate "code typists" - those who merely paste snippets without understanding the logic.
Today, my role is no longer just writing code, but acting as a **Reviewer and Architect**. I use AI to speed up the manual labor, and I use my experience to ensure the infrastructure is secure, accessible, SEO-optimized, and above all, aligned with the client's true business goals.