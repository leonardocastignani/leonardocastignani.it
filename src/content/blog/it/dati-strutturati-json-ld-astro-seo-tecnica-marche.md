---
title: "Schema Markup e Dati Strutturati: La Guida Completa per Astro"
description: "Come implementare JSON-LD in Astro per Article, BreadcrumbList, Person e LocalBusiness. Snippet pronti e validazione con Rich Results Test."
cardDescription: "Guida pratica al JSON-LD in Astro: Person, LocalBusiness, Article e BreadcrumbList collegati con @id."
pubDate: "2026-07-13"
updatedDate: "2026-07-13"
heroImage: "/blog/implementazione-dati-strutturati-json-ld-astro-seo-italia.webp"
imageAlt: "Codice sorgente per l'implementazione dei dati strutturati JSON-LD su Astro JS."
imageTitle: "Schema Markup e JSON-LD su Astro"
imageCaption: "Sblocca i Rich Snippets di Google e domina la ricerca locale con un markup strutturato perfetto."
tags: ["seo-tecnica", "sviluppo-astro-performance"]
lang: "it"
alternateSlug: "schema-markup-json-ld-astro-seo-italy"
faqs:
  - question: "Cos'è il JSON-LD e perché è vitale per la SEO aziendale?"
    answer: "Il JSON-LD è un formato di dati strutturati che spiega a Google l'esatto contesto dei tuoi contenuti, sbloccando i Rich Snippets (come le recensioni a stella) e aumentando il traffico organico."
  - question: "Quali sono i vantaggi di gestire lo Schema Markup con Astro?"
    answer: "Astro permette di generare e iniettare dinamicamente il JSON-LD in modo pulito e sicuro, eliminando completamente i difetti di idratazione e i cali di performance tipici delle architetture React."
  - question: "Implementi architetture SEO tecniche per le imprese delle Marche?"
    answer: "Assolutamente. Dal mio studio a Civitanova Marche ottimizzo il codice sorgente (incluso lo schema LocalBusiness) per garantire alle PMI del territorio la massima visibilità geolocalizzata."
---

Avere un sito veloce è fantastico, ma se i motori di ricerca non riescono a comprendere a fondo il contesto dei tuoi contenuti, stai perdendo una fetta enorme di traffico organico. È qui che entrano in gioco i **Dati Strutturati** (Schema Markup).

Fornire a Google un file JSON-LD significa letteralmente "imboccarlo col cucchiaino", spiegandogli in modo inequivocabile chi sei, cosa fai e di cosa parla la tua pagina. Questo è il segreto dietro ai *Rich Snippets* (i risultati di ricerca arricchiti con stelline, FAQ, immagini e breadcrumb).

In questo articolo vedremo come implementare in modo dinamico e pulito il markup JSON-LD all'interno di un progetto **Astro**, coprendo i 4 schemi più importanti per un sito aziendale o un portfolio — ed evitando l'errore tecnico più comune, quello di creare entità scollegate che Google non riesce a ricondurre alla stessa identità.

### Come iniettare JSON-LD in Astro
Astro rende la gestione dei dati strutturati incredibilmente elegante. Invece di scrivere stringhe JSON a mano (rischiando errori di sintassi), possiamo definire un normale oggetto JavaScript nel frontmatter e iniettarlo nel tag `<script>` usando la direttiva `set:html` e `JSON.stringify()`.

Ecco la sintassi base da inserire nel tuo layout condiviso (es. `Layout.astro`, se ne usi uno per tutte le pagine):

```astro
---
const schema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Il Mio Sito",
  "url": Astro.site
};
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

Ora passiamo agli schemi avanzati, pronti per il copia-incolla.

### L'errore più comune: entità duplicate senza @id
Prima di passare agli esempi, un avvertimento pratico. L'errore tecnico più diffuso — e uno dei problemi più concreti che ho trovato analizzando il mio stesso sito — è dichiarare più volte lo stesso `Person` (o la stessa organizzazione) in schemi diversi della pagina, ognuno con dati leggermente differenti e senza alcun collegamento esplicito. Il risultato è che Google riceve segnali incoerenti e non può dedurre con certezza che si tratta della stessa identità, indebolendo il segnale E-E-A-T invece di rinforzarlo.

La soluzione è assegnare un **`@id` stabile** a ogni entità (persona, organizzazione, sito) e **referenziarla** da tutti gli altri schemi, invece di ridichiararla da zero ogni volta. È esattamente il pattern che uso su questo stesso sito, e che vedremo negli esempi qui sotto.

### 1. Schema "Person" con @id stabile (ideale per portfolio)
Se sei un libero professionista, Google deve associare il tuo sito alla tua identità. Lo schema `Person` è fondamentale per la SEO del tuo brand personale — il dettaglio chiave è il campo `@id`, che permette a qualsiasi altro schema della pagina di puntare a questa stessa entità invece di duplicarla.

```astro
---
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.leonardocastignani.it/#person",
  "name": "Leonardo Castignani",
  "jobTitle": "Software & Web Developer",
  "url": "https://www.leonardocastignani.it",
  "sameAs": [
    "https://github.com/leonardocastignani",
    "https://www.linkedin.com/in/leonardo-castignani/"
  ]
};
---

<script type="application/ld+json" set:html={JSON.stringify(personSchema)} />
```

### 2. Schema "LocalBusiness" (per la SEO Locale)
Se offri servizi su base locale, questo schema è il tuo miglior alleato. Indica a Google esattamente dove ti trovi, aiutandoti a comparire nelle ricerche "vicino a me". Nel mio caso, che opero da Civitanova Marche per clienti in tutta la regione, questo schema è ciò che uso realmente su questo sito per rafforzare la mia SEO locale.

```astro
---
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.leonardocastignani.it/#organization",
  "name": "Leonardo Castignani - Sviluppo Software & Web",
  "image": "https://www.leonardocastignani.it/logo.png",
  "url": "https://www.leonardocastignani.it",
  "founder": { "@id": "https://www.leonardocastignani.it/#person" },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Civitanova Marche",
    "addressRegion": "Marche",
    "addressCountry": "IT"
  },
  "priceRange": "$$"
};
---

<script type="application/ld+json" set:html={JSON.stringify(localBusinessSchema)} />
```

Nota il campo `founder`: invece di ripetere i dati della persona, punta semplicemente all'`@id` dichiarato nello schema precedente. Google ora sa con certezza che le due entità coincidono.

### 3. Schema "Article" (per il Blog)
Per ogni post del tuo blog, dovresti generare dinamicamente lo schema `Article`. Questo aumenta drasticamente le probabilità di apparire in Google Discover o nei caroselli delle notizie. Anche qui, l'`author` referenzia l'`@id` della persona invece di ridichiararla — evitando esattamente l'incoerenza descritta sopra.

```astro
---
// Nel tuo layout BlogPost.astro
const { title, description, pubDate, heroImage } = Astro.props;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": title,
  "description": description,
  "image": new URL(heroImage, Astro.site),
  "datePublished": new Date(pubDate).toISOString(),
  "author": { "@id": "https://www.leonardocastignani.it/#person" }
};
---

<script type="application/ld+json" set:html={JSON.stringify(articleSchema)} />
```

### 4. Schema "BreadcrumbList"
Questo schema aiuta Google a comprendere la gerarchia del tuo sito e genera quei bellissimi percorsi cliccabili nei risultati di ricerca (es. *Home > Blog > Nome Articolo*).

```astro
---
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.leonardocastignani.it"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://www.leonardocastignani.it/blog"
    }
  ]
};
---

<script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />
```

### Validazione: Il test decisivo
Dopo aver implementato questi schemi, non fidarti ciecamente del codice. Avvia la build del tuo progetto Astro locale (`npm run build` seguito da `npm run preview`) e ispeziona il codice sorgente per assicurarti che il JSON sia formattato correttamente e non sia stato "escapato" male.

Una volta in produzione, incolla l'URL della tua pagina nel **Test dei Risultati Multimediali di Google (Rich Results Test)**. Questo strumento gratuito ti confermerà immediatamente se la sintassi è corretta e quali snippet sei idoneo a ricevere.

### Conclusione
L'implementazione dei dati strutturati è una di quelle attività che separa uno sviluppatore "amatoriale" da un professionista. Con Astro, integrare e automatizzare la generazione del markup JSON-LD è un processo pulito, basato sui componenti, e privo di difetti di idratazione che spesso affliggono le tradizionali applicazioni React — a patto di collegare le entità con `@id` invece di duplicarle.

Se vuoi vedere questo esatto approccio applicato a un caso reale, con tanto di sitemap e dati strutturati generati dinamicamente per ogni articolo, ho documentato l'intero processo nel [caso studio SEO tecnica di questo sito](/blog/caso-studio-consulente-seo-tecnica-dati-strutturati/).
