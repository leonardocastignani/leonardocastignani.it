---
title: "Il mio nuovo portfolio costruito con Astro"
description: "Come ho progettato il mio portfolio da sviluppatore web freelance a Civitanova Marche: performance, architettura a isole e gestione multilingua."
cardDescription: "Come ho progettato questo portfolio: performance, Astro e multilingua."
pubDate: "2025-12-19"
updatedDate: "2026-06-23"
heroImage: "/blog/leonardo-castignani-portfolio-sviluppatore-web-freelance-civitanova-marche.webp"
imageAlt: "Il nuovo sito portfolio di Leonardo Castignani, sviluppatore a Civitanova."
imageTitle: "Portfolio Web Developer Freelance"
imageCaption: "Costruito con Astro JS e Tailwind per massime prestazioni SEO e velocità."
tags: ["sviluppo-astro-performance", "case-study"]
lang: "it"
alternateSlug: "leonardo-castignani-freelance-high-performance-portfolio-astro-js"
faqs:
  - question: "Perché Astro è il miglior framework per siti vetrina e portfolio?"
    answer: "Astro spedisce di default zero JavaScript al client, renderizzando pagine HTML iper-veloci e offrendo punteggi ottimali per la SEO."
  - question: "Qual è il tuo percorso professionale come sviluppatore?"
    answer: "Sono sviluppatore freelance dal 2021. Sto completando la laurea in Informatica (L-31) all'Università di Camerino e ho conseguito il diploma di Perito Informatico presso l'IIS \"E. Mattei\" di Recanati (94/100), oltre alle certificazioni ICDL e in Robotica Industriale COMAU."
  - question: "Realizzi siti web aziendali con Astro nelle Marche?"
    answer: "Sì, utilizzo la potenza di Astro per costruire piattaforme ad alte conversioni e tempi di caricamento istantanei per aziende, professionisti e PMI a Civitanova Marche e in Italia."
---

## Finalmente online! 🚀

Benvenuti nel mio nuovo spazio digitale. Dopo aver valutato diverse tecnologie come Next.js, React puro o semplici generatori statici, ho deciso di puntare tutto su **Astro**.

L'obiettivo era semplice: volevo un sito vetrina che fosse **velocissimo**, facile da mantenere e ottimizzato per la SEO.

### Lo Stack Tecnologico

Per realizzare questo progetto non mi sono limitato al framework, ma ho costruito un ecosistema moderno:

*   **Astro 5.0**: Il cuore pulsante del sito.
*   **Tailwind CSS**: Per uno styling rapido, responsivo e pulito.
*   **TypeScript**: Per garantire la robustezza del codice e prevenire bug.
*   **Netlify**: Per l'hosting e la CI/CD automatizzata.

### Perché ho scelto Astro?

Astro non è il solito framework JavaScript. Ha un approccio unico che ha fatto la differenza per questo progetto:

#### 1. Zero JavaScript di Default
A differenza delle Single Page Application (SPA) che caricano enormi bundle JS, Astro spedisce al browser **solo HTML e CSS**. Il JavaScript viene caricato solo se strettamente necessario (es. per il menu mobile o il form di contatto).

> Meno JavaScript significa tempi di caricamento più rapidi e utenti più felici.

#### 2. Architettura a Isole (Islands Architecture)
Questa è la vera magia. Posso avere una pagina completamente statica e "idratare" solo piccole isole di interattività.

Ecco un esempio di come gestisco la logica condizionale direttamente nel frontmatter dei componenti:

```astro
---
// Esempio di logica lato server in Astro
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

Questo pattern, ripetuto in ogni componente, mi permette di gestire la localizzazione senza montare un intero framework i18n lato client: tutta la logica gira a build-time, sul server, e al browser arriva solo l'HTML già pronto.

### Gestione Multilingua (i18n)

Il sito è disponibile in italiano (senza prefisso, lingua predefinita) e in inglese (con prefisso `/en`), con URL "gemelli" tra le due lingue collegati tramite hreflang. È lo stesso approccio che ho documentato più nel dettaglio nell'articolo su [come creare siti web multilingua con i18n e Astro](/blog/creare-siti-web-multilingua-i18n-astro-js/).

### SEO Tecnica e Dati Strutturati

Oltre alle performance, ho curato nel dettaglio anche la SEO tecnica: markup JSON-LD con le entità Person, Organization e WebSite collegate tramite `@id` invece di essere duplicate, una sitemap con priorità e changefreq personalizzati per ogni pagina, e un endpoint `/llms-full.json` pensato per i motori di ricerca generativi (GEO). Ho raccontato questo pattern nel dettaglio nella guida su [Schema Markup e Dati Strutturati JSON-LD in Astro](/blog/dati-strutturati-json-ld-astro-seo-tecnica-marche/).

### Performance Come Priorità

Il risultato di queste scelte architetturali si vede nei numeri: punteggi Lighthouse vicini a 100 su Performance, Accessibilità, Best Practices e SEO, senza dover rincorrere ottimizzazioni last-minute. Se ti interessa il ragionamento tecnico dietro ai Core Web Vitals, ho scritto una guida dedicata all'[ottimizzazione SEO tecnica e Core Web Vitals](/blog/ottimizzazione-seo-tecnica-core-web-vitals-2026/).

### Chi sono

Sono sviluppatore freelance dal 2021, con base a Civitanova Marche. Sto completando la laurea in Informatica (L-31) all'Università di Camerino e ho conseguito il diploma di Perito Informatico presso l'IIS "E. Mattei" di Recanati con votazione 94/100, oltre alle certificazioni ICDL e in Robotica Industriale rilasciata da COMAU. Questo portfolio è anche il posto dove raccolgo tutto ciò che imparo lungo il percorso: se hai un progetto in mente o vuoi semplicemente scambiare due parole su Astro, puoi scrivermi dal [modulo di contatto](/#contact) qui sul sito.