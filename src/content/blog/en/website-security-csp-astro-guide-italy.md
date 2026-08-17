---
title: "Content Security Policy (CSP): How to Protect Your Site from Attacks"
description: "Configuring a robust CSP in Astro: a guide to HTTP headers, essential directives, and how to test security without breaking production."
cardDescription: "How to configure a robust CSP in Astro: HTTP headers, essential directives, and testing safely in production."
pubDate: "2026-07-20"
updatedDate: "2026-07-20"
heroImage: "/blog/sicurezza-siti-web-csp-astro-aziende-italia.webp"
imageAlt: "Content Security Policy (CSP) configuration code in Astro for corporate website security."
imageTitle: "Web Security Guide: Configuring CSP in Astro"
imageCaption: "Protect your digital infrastructure from XSS attacks and keep your corporate data strictly secure."
tags: ["privacy-sicurezza", "sviluppo-astro-performance"]
lang: "en"
alternateSlug: "sicurezza-siti-web-csp-astro-marche"
faqs:
  - question: "What is a Content Security Policy and why does a business need it?"
    answer: "A CSP is an 'invite list' that tells the browser to execute only strictly approved resources. It fundamentally prevents malicious XSS attacks and safeguards your corporate reputation and user data."
  - question: "Why is it better to configure a CSP via HTTP headers instead of a meta tag?"
    answer: "HTTP headers also cover non-HTML responses (scripts, JSON, redirects) and support directives like frame-ancestors that a meta tag ignores. On a static site, you set them at the hosting level (e.g. Netlify); on an SSR Astro project, a Middleware can inject them dynamically into every response."
  - question: "Do you engineer secure web architectures for international clients?"
    answer: "Absolutely. Operating from Italy, I build highly secure, custom Astro web applications for global brands, ensuring rigorous HTTP headers and server-side security protocols are deployed flawlessly."
---

There is a recurring nightmare for every digital business owner: waking up in the morning to find out that their website has been breached to steal customer data or redirect them to scam sites.

Most of these attacks happen via **XSS (Cross-Site Scripting)**: a hacker manages to inject a malicious JavaScript snippet into your pages. How do you defend yourself? Besides writing clean code, the ultimate weapon is called the **Content Security Policy (CSP)**.

Today we will look at what it is, how to configure it on an Astro project, and how to implement it without blowing up your site in production.

### What is a Content Security Policy?
Think of CSP as your website's bouncer. It is an "invite list" (whitelist) that you hand over to the user's browser.
With an active CSP, the browser will execute or load *only and exclusively* the resources (scripts, images, fonts, stylesheets) coming from the domains on that list. If a hacker manages to inject a malicious script trying to send credit card data to `hacker-server.com`, the browser will check the CSP, see that the domain is not on the list, and block the execution instantly.

### Implementing a CSP in Astro
In Astro, you have two ways to apply a CSP: via a `<meta>` tag in your HTML, or (the recommended choice) via **HTTP Headers**. The correct way to set them, though, depends on how your site is rendered.

**If your project uses SSR** (with an adapter like Node or Netlify Functions), you can use a Middleware to inject the header dynamically into every response. One detail that trips up a lot of developers: `next()` returns a `Promise` and must always be `await`-ed before you can read or modify the response headers. If you write your middleware in TypeScript (a choice I always recommend, for the reasons covered in my [deep dive on TypeScript in 2026](/en/blog/typescript-scalable-software-development-2026/)), you also get autocompletion and type-checking on `context` and `response.headers`, avoiding silly mistakes like misspelled header names.

Here is a practical example of Astro Middleware (`src/middleware.ts`):

```typescript
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Let's build our Policy
  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https://images.unsplash.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://api.your-domain.com;
  `.replace(/\s+/g, ' ').trim();

  response.headers.set("Content-Security-Policy", csp);

  return response;
});
```

**If your site is static** (Astro's default output, with no SSR adapter), Middleware does nothing on pre-rendered pages: those are generated at build time and served as plain HTML files, with no Node function running at request time. In that case, headers need to be declared at the hosting level. On Netlify, for example, a block in `netlify.toml` (or a `public/_headers` file) is enough:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy-Report-Only = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; connect-src 'self' https://www.googletagmanager.com;"
```

This is exactly the approach I use on this very site, which is statically generated by Astro and deployed on Netlify. This distinction between static and dynamic rendering isn't just about CSP: it's the same reason I wrote a whole article about [performance and Islands Architecture with Astro](/en/blog/astro-js-islands-architecture-performance/).

### Essential Directives (The CSP Vocabulary)
Let's analyze the directives I included in the snippet above, plus a few more worth knowing:

1. `default-src 'self'`: The golden rule. It declares that, by default, anything not explicitly authorized must come *only* from your own domain (`'self'`).
2. `script-src`: The most critical directive. Here we authorize our scripts, Google Analytics, and, unfortunately often necessary for some UI libraries or Astro inline scripts, `'unsafe-inline'`. (Note: in high-security projects, `'unsafe-inline'` should be removed and replaced with cryptographic *nonces or hashes*).
3. `img-src`: Defines where we can load images from. Authorizing `data:` is useful if you use base64 SVG placeholders.
4. `connect-src`: Limits the domains your site can send requests to (e.g., via `fetch` or AJAX). Fundamental for preventing malicious scripts from exfiltrating data.
5. `frame-ancestors 'self'`: Prevents your site from being embedded in an `<iframe>` on external domains, the primary defense against *clickjacking*. It's the only real equivalent of the old `X-Frame-Options` header, and it only works when set via an HTTP header (the `<meta>` tag ignores it entirely).
6. `object-src 'none'`: Blocks legacy plugins like Flash or Java applets, historically a frequent attack vector. On most modern sites it can safely stay disabled with zero impact.
7. `base-uri 'self'`: Prevents an injected script from rewriting the page's `<base>` tag to hijack every relative link toward a malicious domain.
8. `form-action 'self'`: Restricts which URLs a form can submit to. It blocks a lesser-known but real attack: a legitimate form on your site, tampered with via XSS, silently sending user credentials to an external server.

### The Trick to Not Breaking Production: Report-Only
Adding a CSP from scratch to an existing site is like walking through a minefield: you will almost certainly block a legitimate resource you forgot about, breaking the layout or functionality.

To avoid this disaster, browsers support a magic header: `Content-Security-Policy-Report-Only`.

If you use this header instead of the standard one, the browser **will not block anything**, but it will evaluate your policy. If it finds a violation, it will flag it in the browser console (and can send a report to a monitoring server, via the `report-to` directive or the older `report-uri`).
This allows you to test your CSP on real traffic for a few weeks, fix the "false positives" (adding missing domains to the whitelist) and, only when you are 100% sure, switch to the final restrictive mode.

Before going live, it's also worth running your policy through automated tools like [Google's CSP Evaluator](https://csp-evaluator.withgoogle.com/) or an online scanner like [securityheaders.com](https://securityheaders.com), which flag overly permissive configurations or forgotten directives. It's the same "verify before you trust it" approach I cover in my article on [testing and debugging in software development](/en/blog/software-testing-debugging-business-stability/): a CSP that's never been properly tested is just a config file giving you a false sense of security.

### Other Security Headers to Pair with a CSP
A CSP is the most effective defense against XSS, but on its own it doesn't cover a website's entire attack surface. In a serious project it should always be paired with other HTTP headers, just as easy to set in the same `netlify.toml` file or Middleware:

- **`Strict-Transport-Security` (HSTS)**: forces the browser to only ever talk to your domain over HTTPS for a defined period, even if the user types `http://` by mistake or clicks an old insecure link.
- **`X-Content-Type-Options: nosniff`**: stops the browser from "guessing" a file's type and ignoring the server's declared `Content-Type` - a behavior that has historically allowed files uploaded as plain images to be executed as scripts.
- **`Referrer-Policy`**: controls how much information about the originating URL is shared when a user clicks a link to another site, reducing the accidental leak of data (e.g., tokens or sensitive parameters in the URL).
- **`Permissions-Policy`**: selectively disables browser features (camera, microphone, geolocation) your site doesn't use, restricting what a script can do even if it managed to bypass the CSP.

These headers, alongside the CSP, are part of the technical maintenance that goes well beyond launch day: I cover this in more depth in my article on [what happens after a website's "Go Live"](/en/blog/enterprise-website-security-maintenance/).

### Conclusion
Configuring a solid CSP takes time, patience, and a deep understanding of your site's architecture. However, it is a non-negotiable effort. A corporate website is not just a commercial storefront; it is a container for sensitive data - often personal data subject to GDPR too, which is why I'd also recommend my [GDPR 2026 compliance guide](/en/blog/gdpr-2026-website-compliance-guide-italy/) and my [practical guide to cookie banners and consent](/en/blog/gdpr-cookie-banner-compliance-guide/), two pieces that round out the picture on security and legal compliance. Protecting the infrastructure with modern tools like Astro and an ironclad CSP is tangible proof of the respect you have for your business and your clients.