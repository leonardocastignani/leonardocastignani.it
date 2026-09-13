---
title: "hreflang e SEO Multilingua: Come evitare gli errori più comuni"
description: "I problemi tipici che affossano il posizionamento dei siti multi-lingua e come gestire i tag hreflang alla perfezione con l'i18n nativo di Astro."
cardDescription: "Gli errori più comuni con hreflang: tag auto-referenziale, bidirezionalità e x-default, con esempi reali in Astro."
pubDate: "2026-09-14"
updatedDate: "2026-09-14"
heroImage: "/blog/configurazione-hreflang-seo-tecnica-multilingua-astro-italia.webp"
imageAlt: "Snippet di codice Astro per la generazione dinamica dei tag hreflang in un sito web multilingua."
imageTitle: "SEO Multilingua: Configurazione Hreflang su Astro"
imageCaption: "Evita contenuti duplicati e posiziona il tuo sito sui mercati globali gestendo i tag hreflang direttamente a build-time."
tags: ["seo-tecnica", "sviluppo-astro-performance"]
lang: "it"
alternateSlug: "hreflang-technical-seo-multilingual-websites-astro-italy"
faqs:
  - question: "Cos'è il tag hreflang e perché è importante per la SEO?"
    answer: "Il tag hreflang è un attributo HTML che comunica ai motori di ricerca la lingua e l'area geografica a cui è destinata una pagina web. È fondamentale per i siti multilingua perché impedisce a Google di segnalare contenuti tradotti come duplicati e garantisce che l'utente veda la versione corretta per la sua lingua."
  - question: "Perché il tag hreflang deve essere bidirezionale?"
    answer: "Google richiede la bidirezionalità per prevenire manipolazioni SEO. Se la pagina in italiano dichiara che la sua variante inglese si trova a un determinato URL, l'URL inglese deve necessariamente avere un tag hreflang che punta indietro alla versione italiana. Se il collegamento si interrompe, Google ignora i tag di entrambe le pagine."
  - question: "Offri servizi di sviluppo SEO per siti multilingua nelle Marche?"
    answer: "Sì. Dal mio studio a Civitanova Marche, sviluppo piattaforme web internazionali con Astro. Configuro nativamente l'infrastruttura i18n, inclusi hreflang, sitemap dinamiche e routing, garantendo alle PMI locali un'eccellente scalabilità sui mercati esteri."
---

Quando si traduce un sito web in più lingue, l'aspettativa è quella di raddoppiare istantaneamente il traffico organico. La realtà, molto spesso, è un crollo del posizionamento dovuto alla confusione dell'algoritmo di Google, che finisce per etichettare le nuove pagine come "contenuto duplicato" o per servire la lingua sbagliata all'utente sbagliato.

Il responsabile di questo disastro è quasi sempre una configurazione errata o mancante dell'attributo **hreflang**. Questo piccolo frammento di codice HTML comunica a Google l'esatta architettura delle lingue del tuo sito, dicendogli: *"Questa pagina è per chi cerca in italiano, mentre quest'altra è per chi cerca in inglese"* - lo stesso principio di architettura pulita che guida anche la mia [guida a sitemap XML e robots.txt](/blog/guida-sitemap-xml-robots-txt-seo-tecnica-astro/).

### L'Anatomia dell'hreflang perfetto
Per far capire ai motori di ricerca la relazione tra le varianti linguistiche di una pagina, dobbiamo inserire dei tag `<link>` nella sezione `<head>` del documento HTML.

Su questo stesso sito, ad esempio (che non usa un prefisso `/it/` per la lingua predefinita, solo `/en/` per l'inglese), il codice iniettato in **entrambe** le pagine di questo articolo è questo:

```html
<link rel="alternate" hreflang="it" href="https://www.leonardocastignani.it/blog/hreflang-seo-tecnica-siti-multilingua-astro-marche/" />
<link rel="alternate" hreflang="en" href="https://www.leonardocastignani.it/en/blog/hreflang-technical-seo-multilingual-websites-astro-italy/" />
<link rel="alternate" hreflang="x-default" href="https://www.leonardocastignani.it/blog/hreflang-seo-tecnica-siti-multilingua-astro-marche/" />
```

### I 3 Errori Fatali da Evitare
Analizzando i siti dei miei clienti, riscontro regolarmente tre errori di implementazione che invalidano l'intero setup:

* **Mancanza del tag auto-referenziale:** La regola d'oro di Google è che *ogni pagina deve linkare a se stessa*. La pagina italiana non deve solo linkare alla versione inglese, ma deve avere anche un tag `hreflang="it"` che punta alla propria URL.
* **Link non bidirezionali:** Se la pagina A (Italiano) dichiara che la sua traduzione è la pagina B (Inglese), la pagina B **deve** restituire il favore puntando alla pagina A. Se manca questo ritorno, Google ignorerà l'attributo per prevenire manipolazioni esterne.
* **`x-default` scelto senza criterio:** Molte guide generiche consigliano di puntare sempre l'`x-default` alla versione inglese "perché è la lingua universale". Non è una regola fissa: va puntato alla lingua predefinita del *tuo* sito. Su questo stesso sito, ad esempio, punta alla versione italiana, perché l'italiano è la `defaultLocale` configurata nell'i18n di Astro e il pubblico primario è quello nazionale - non un default cieco copiato da un tutorial.

### La Soluzione Concreta in Astro (non solo teoria)
Nei CMS tradizionali gestire questi tag, specialmente quando gli slug (le URL) cambiano da lingua a lingua - come capita quasi sempre su un blog, dove il titolo tradotto cambia lo slug - è un incubo che richiede plugin pesanti. Su questo sito la gestione è centralizzata in un unico punto, il layout condiviso da ogni pagina, senza duplicare la logica altrove.

Ogni articolo del blog dichiara nel proprio frontmatter un campo `alternateSlug`, che punta allo slug della sua traduzione:

```yaml
# Frontmatter di questo stesso articolo
lang: "it"
alternateSlug: "hreflang-technical-seo-multilingual-websites-astro-italy"
```

Il layout condiviso legge questo valore e, se presente, lo usa per costruire l'URL esatto della pagina tradotta; altrimenti ricade su uno scambio generico del prefisso `/en`, che funziona bene per le pagine con lo stesso slug in entrambe le lingue (come la home o le pagine tag):

```astro
---
// Layout.astro (semplificato)
const itPath = currentLang === 'en' ? (currentPath.replace(/^\/en/, '') || '/') : currentPath;
const enPath = currentLang === 'it' ? (`/en${currentPath === '/' ? '/' : currentPath}`) : currentPath;

// alternateIt/alternateEn arrivano dalla pagina (calcolati da alternateSlug se presente)
const hreflangIt = alternateIt || new URL(itPath, Astro.site);
const hreflangEn = alternateEn || new URL(enPath, Astro.site);
---

<link rel="alternate" hreflang="it" href={hreflangIt} />
<link rel="alternate" hreflang="en" href={hreflangEn} />
<link rel="alternate" hreflang="x-default" href={hreflangIt} />
```

Questo stesso valore (`alternateSlug`) non serve solo per l'hreflang: è anche quello che ho usato di recente per correggere un bug reale nel selettore di lingua nell'header del sito. Prima del fix, cliccando "EN" da un articolo del blog si atterrava sulla lista generica degli articoli invece che sulla traduzione specifica - perché quel componente ricalcolava il link da sé, ignorando il valore già disponibile e corretto. Un promemoria pratico: se calcoli lo stesso dato in due punti diversi del codice, prima o poi i due punti si disallineano.

Investire tempo nel mappare accuratamente i tag hreflang non è un vezzo tecnico, ma una mossa strategica per la protezione del brand. Impedisce la cannibalizzazione tra le tue stesse pagine, garantisce che i clienti internazionali atterrino sulla versione a loro dedicata - un tassello che si somma alla [strategia di SEO locale](/blog/ottimizzazione-seo-locale-2026-civitanova-marche/) e a quanto già raccontato nella mia [guida ai siti multilingua con i18n in Astro](/blog/creare-siti-web-multilingua-i18n-astro-js/) - e segnala ai motori di ricerca che il tuo non è un sito amatoriale, ma un ecosistema digitale progettato per scalare sui mercati globali.
