---
title: "Come ho ottimizzato la SEO di questo sito (Caso di Studio)"
description: "Analisi tecnica delle implementazioni SEO su leonardocastignani.it: generazione Sitemap automatica, dati strutturati JSON-LD e gestione Meta Tag."
pubDate: "2026-02-23"
heroImage: "/blog/seo-case-study.webp"
tags: ["SEO", "Case Study", "Astro"]
lang: "it"
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