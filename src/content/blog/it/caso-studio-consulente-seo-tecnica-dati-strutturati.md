---
title: "Come ho ottimizzato la SEO di questo sito (Caso di Studio)"
description: "Analisi tecnica delle implementazioni SEO su leonardocastignani.it: generazione Sitemap automatica, dati strutturati JSON-LD e gestione Meta Tag."
pubDate: "2026-02-23"
updatedDate: "2026-06-23"
heroImage: "/blog/consulente-seo-tecnica-dati-strutturati-marche.webp"
imageAlt: "Analisi del codice sorgente per l'ottimizzazione tecnica della SEO locale."
imageTitle: "Caso di Studio SEO Tecnica"
imageCaption: "Sitemap XML e Dati Strutturati JSON-LD per dominare la ricerca Google."
tags: ["SEO", "Case Study", "Astro"]
lang: "it"
alternateSlug: "technical-seo-json-ld-structured-data-case-study"
faqs:
  - question: "Cosa sono i Dati Strutturati (JSON-LD) nella SEO?"
    answer: "I JSON-LD sono stringhe di codice inserite nell'HTML che spiegano chiaramente a Google la natura del sito (es. 'Azienda Locale' o 'Servizio Professionale'), potenziando la SEO semantica."
  - question: "Come i meta tag canonical prevengono i contenuti duplicati?"
    answer: "In siti multilingua come questo, i meta tag canonical evitano penalizzazioni da parte di Google indicando la versione corretta o originale per ogni rispettiva zona e lingua."
  - question: "Offri servizi di ottimizzazione SEO Tecnica nelle Marche?"
    answer: "Sì, implemento architetture SEO avanzate (da Sitemap XML dinamiche a JSON-LD custom) per siti e-commerce e aziendali in tutto il territorio marchigiano."
---

Avere un sito veloce è il primo passo, ma renderlo "comprensibile" ai motori di ricerca è il secondo. Per il mio portfolio, non mi sono limitato a installare un plugin (che su Astro non esiste nel senso "WordPressiano" del termine), ma ho costruito una struttura SEO tecnica solida scrivendo codice.

Ecco le 3 implementazioni chiave che ho realizzato per questo sito.

### 1. Sitemap Dinamica e Robots.txt
Invece di scrivere la sitemap a mano (rischiando errori), ho utilizzato l'integrazione `@astrojs/sitemap`. Questo script scansiona le mie rotte (`src/pages`) durante la compilazione (build time) e genera automaticamente il file XML finale.
Questo garantisce che ogni volta che pubblico un nuovo post (come questo), Google ne venga a conoscenza immediatamente tramite la Google Search Console, senza il mio intervento manuale.

### 2. Dati Strutturati (JSON-LD)
Per aiutare Google a capire che questo è il sito di un professionista freelance, ho iniettato dei dati strutturati in formato **JSON-LD** nel `<head>` di ogni pagina.
Ecco un estratto reale del codice che genera lo schema `Person` e `ProfessionalService`:

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

### 3. Meta Tag Canonici e Open Graph
Gestendo un sito multilingua (IT/EN), è cruciale evitare la penalizzazione per "contenuti duplicati". Utilizzo un componente `BaseHead.astro` centralizzato che gestisce dinamicamente:
* **Canonical URL:** Indica a Google quale è la versione "originale" della pagina corrente.
* **Open Graph Image:** L'immagine che appare quando condividi il link su WhatsApp o LinkedIn. Invece di un'immagine generica uguale per tutto il sito, ogni post ha la sua cover specifica definita nel frontmatter Markdown.

La SEO tecnica non è magia nera: è ordine, semantica e rispetto degli standard web.