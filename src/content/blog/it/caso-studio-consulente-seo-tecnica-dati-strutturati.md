---
title: "Come ho ottimizzato la SEO di questo sito (Caso Studio)"
description: "Caso studio di SEO tecnica: come ho ottimizzato Sitemap automatica, dati strutturati JSON-LD e Meta Tag su questo stesso sito, leonardocastignani.it."
cardDescription: "Come ho ottimizzato la SEO tecnica di questo sito: Sitemap, JSON-LD e Meta Tag reali."
pubDate: "2026-02-23"
updatedDate: "2026-06-23"
heroImage: "/blog/consulente-seo-tecnica-dati-strutturati-marche.webp"
imageAlt: "Analisi del codice sorgente per l'ottimizzazione tecnica della SEO locale."
imageTitle: "Caso di Studio SEO Tecnica"
imageCaption: "Sitemap XML e Dati Strutturati JSON-LD per dominare la ricerca Google."
tags: ["seo-tecnica", "case-study"]
lang: "it"
alternateSlug: "technical-seo-json-ld-structured-data-case-study"
faqs:
  - question: "Come migliora la SEO una Sitemap XML generata automaticamente?"
    answer: "Una sitemap XML generata dinamicamente ad ogni build garantisce che, quando pubblico un nuovo contenuto, Google Search Console ne venga informata subito, per un'indicizzazione rapida e accurata."
  - question: "Cosa sono i Dati Strutturati (JSON-LD) nella SEO?"
    answer: "I JSON-LD sono stringhe di codice inserite nell'HTML che spiegano chiaramente a Google la natura del sito e la sua identità (es. 'Persona' o 'Servizio Professionale'), sbloccando i rich snippet e potenziando la SEO semantica."
  - question: "Offri servizi di ottimizzazione SEO Tecnica nelle Marche?"
    answer: "Sì, implemento architetture SEO avanzate (da Sitemap XML dinamiche a JSON-LD custom) per siti e-commerce e aziendali in tutto il territorio marchigiano."
---

Avere un sito veloce è il primo passo, ma renderlo "comprensibile" ai motori di ricerca è il secondo. Per il mio portfolio, non mi sono limitato a installare un plugin (che su Astro non esiste nel senso "WordPressiano" del termine), ma ho costruito una struttura SEO tecnica solida scrivendo codice, applicando anche quanto approfondito durante il mio percorso di studi in Informatica all'Università di Camerino e il diploma tecnico conseguito all'IIS "E. Mattei" di Recanati.

Ecco le 3 implementazioni chiave che ho realizzato per questo sito.

### 1. Sitemap Dinamica e Robots.txt
Invece di scrivere la sitemap a mano (rischiando errori), ho utilizzato l'integrazione `@astrojs/sitemap`. Questo script scansiona le mie rotte (`src/pages`) durante la compilazione (build time) e genera automaticamente il file XML finale.
Questo garantisce che ogni volta che pubblico un nuovo post (come questo), Google ne venga a conoscenza immediatamente tramite la Google Search Console, senza il mio intervento manuale.

### 2. Dati Strutturati (JSON-LD)
Per aiutare Google a capire che questo è il sito di un professionista freelance, ho iniettato dei dati strutturati in formato **JSON-LD** nel `<head>` di ogni pagina.
Ecco un estratto reale del codice che genera lo schema `Person`, con un `@id` stabile a cui posso far riferimento da qualsiasi altro schema della pagina invece di ridichiarare la stessa identità più volte:

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

Accanto allo schema `Person`, genero anche uno schema `ProfessionalService` che descrive la mia attività come Sviluppatore Web & Software. Invece di ripetere da capo i dati anagrafici, il campo `founder` punta semplicemente all'`@id` dichiarato sopra: in questo modo Google riceve un segnale coerente e può ricondurre le due entità alla stessa identità, rafforzando l'E-E-A-T della pagina.

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.leonardocastignani.it/#organization",
  "name": "Leonardo Castignani - Sviluppo Software & Web",
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

### 3. Meta Tag Canonici e Open Graph
Gestendo un sito multilingua (IT/EN), è cruciale evitare la penalizzazione per "contenuti duplicati". Utilizzo un componente `BaseHead.astro` centralizzato che gestisce dinamicamente:
* **Canonical URL:** Indica a Google quale è la versione "originale" della pagina corrente.
* **Open Graph Image:** L'immagine che appare quando condividi il link su WhatsApp o LinkedIn. Invece di un'immagine generica uguale per tutto il sito, ogni post ha la sua cover specifica definita nel frontmatter Markdown.

La SEO tecnica non è magia nera: è ordine, semantica e rispetto degli standard web. Se vuoi approfondire ogni singolo schema (Person, LocalBusiness, Article e BreadcrumbList) con il codice completo e commentato, ho scritto una [guida dedicata ai dati strutturati JSON-LD su Astro](/blog/dati-strutturati-json-ld-astro-seo-tecnica-marche/).