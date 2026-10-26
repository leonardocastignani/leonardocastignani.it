---
title: "Critical CSS e Render-Blocking Resources: Come Velocizzare il First Paint"
description: "Come identificare ed eliminare le risorse che rallentano il First Paint: Critical CSS, inlineStylesheets e script differiti su un progetto Astro reale."
cardDescription: "Come velocizzare il First Paint eliminando CSS e script render-blocking su un progetto Astro reale."
pubDate: "2026-10-26"
updatedDate: "2026-10-26"
heroImage: "/blog/critical-css-render-blocking-first-paint-astro-italia.webp"
imageAlt: "Schema tecnico che illustra l'inlining del Critical CSS nell'head HTML per sbloccare il First Paint e accelerare le performance web."
imageTitle: "Critical CSS e Ottimizzazione First Paint"
imageCaption: "L'estrazione e l'inlining del Critical CSS prevengono il render-blocking, garantendo un caricamento visivo istantaneo per l'utente."
tags: ["sviluppo-astro-performance"]
lang: "it"
alternateSlug: "critical-css-render-blocking-first-paint-astro-performance"
faqs:
  - question: "Cosa sono le risorse render-blocking?"
    answer: "Le risorse render-blocking sono file CSS o JavaScript sincroni, caricati nell'<head> del documento, che obbligano il browser a mettere in pausa il disegno della pagina (rendering) finché non sono stati completamente scaricati e analizzati."
  - question: "Cos'è il Critical CSS e come velocizza il First Paint?"
    answer: "Il Critical CSS è l'insieme minimo di stili necessari a visualizzare la parte superiore della pagina (above-the-fold). Iniettandolo direttamente nell'HTML, il browser renderizza immediatamente i contenuti visibili senza attendere il download di file CSS esterni pesanti."
  - question: "Come implementi il Critical CSS sui siti web aziendali?"
    answer: "Uso l'architettura nativa di Astro: il framework esegue lo scoping del CSS a livello di componente e, con la direttiva `inlineStylesheets: 'auto'` attiva in `astro.config.mjs`, inietta automaticamente a build-time gli stili sotto i 4KB nell'head, lasciando esterni solo i bundle più grandi e davvero cacheable - esattamente la configurazione che gira in produzione su questo sito."
---

C'è un momento di altissima tensione psicologica quando un utente clicca sul tuo sito: la frazione di secondo in cui lo schermo è completamente bianco. Se questa schermata bianca dura troppo a lungo, l'utente chiuderà la scheda prima ancora di aver visto il tuo logo.

Questo momento si chiama **First Paint** (o First Contentful Paint, FCP) - la metrica che segue immediatamente il TTFB di cui parlo nella mia [guida all'Edge Computing](/blog/edge-computing-cdn-astro-ttfb-performance/): un TTFB basso non serve a molto se poi il browser resta bloccato prima di disegnare qualcosa. Il nemico numero uno del First Paint ha un nome ben preciso: le **Render-Blocking Resources** (risorse che bloccano il rendering).

Vediamo cosa sono, perché distruggono le conversioni del tuo business e come le elimino chirurgicamente utilizzando l'architettura di Astro.

### Il Problema: Il Browser è un Lavoratore Sequenziale
Quando un browser inizia a leggere il codice HTML del tuo sito dall'alto verso il basso e incontra un tag `<link rel="stylesheet" href="style.css">` o un tag `<script src="app.js">` nell'`<head>`, va in panico.
Sospende immediatamente la costruzione grafica della pagina (il rendering), scarica il file, lo analizza e solo dopo riprende a disegnare lo schermo.

Se hai un file CSS da 200KB e uno script JavaScript pesante bloccanti nell'head, l'utente fisserà uno schermo bianco per secondi preziosi, specialmente su connessioni mobili lente.

### La Soluzione: Il Critical CSS
Il concetto di **Critical CSS** è geniale nella sua semplicità: invece di costringere il browser a scaricare l'intero foglio di stile prima di mostrare qualsiasi cosa, estraiamo *solo* il CSS necessario a formattare la parte della pagina immediatamente visibile (l'**above-the-fold**, ovvero header, menu e hero section).

Questo CSS "critico" viene iniettato (inlined) direttamente all'interno del tag `<head>` dell'HTML. Tutto il resto del CSS (il footer, le modali, i layout delle sezioni inferiori) viene caricato in modo asincrono, senza bloccare la visualizzazione iniziale.

### Come Astro Risolve Nativamente il Problema
Implementare il Critical CSS a mano o tramite script Node (come *critical.js*) su stack tradizionali è un processo macchinoso e prono a errori. In **Astro**, l'approccio orientato ai componenti e la fase di build intelligente risolvono il problema quasi magicamente.

### 1. CSS Scoped di Default
In Astro, il CSS scritto all'interno di un componente (nel tag `<style>`) è automaticamente "scopato" e processato in fase di build. Astro analizza quali componenti sono effettivamente presenti nella pagina e crea un pacchetto CSS ottimizzato solo con gli stili strettamente necessari per quella specifica rotta. Niente file monolitici da 500KB caricati inutilmente.

### 2. La direttiva `inlineStylesheets`
Per massimizzare il First Paint, puoi dire ad Astro di non creare affatto file CSS esterni per i fogli di stile di piccole dimensioni, ma di iniettarli direttamente nell'HTML come Critical CSS.

Basta aggiungere questa regola nel file `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  build: {
    // 'auto' inietta i CSS sotto i 4KB.
    // 'always' inietta tutto il CSS direttamente nell'HTML.
    inlineStylesheets: 'auto'
  }
});
```

Selezionando `'auto'`, Astro inietterà automaticamente i file CSS più piccoli nell'`<head>`, garantendo un rendering istantaneo della struttura base, senza richiedere al browser di aprire nuove connessioni HTTP. Sulla build di produzione di questo sito, con questa direttiva attiva, la home finisce con 3 blocchi `<style>` inlined e solo i due bundle CSS del blog (quelli sopra i 4KB, dove vive il grosso degli stili delle pagine articolo) restano file esterni linkati - e per questi ultimi è corretto così: restando esterni, il browser li mette in cache una sola volta e non li riscarica a ogni articolo.

### 3. Gestione del JavaScript Bloccante
Astro è famoso per spedire zero JavaScript di default. Ma quando serve, i tag `<script>` scritti all'interno dei componenti Astro vengono automaticamente processati come `<script type="module">`.

Questo è un dettaglio fondamentale: i moduli JavaScript **non bloccano il rendering per natura** (vengono automaticamente deferiti). Il browser continua a disegnare la pagina mentre scarica lo script in background.

Se devi includere uno script di terze parti (come un tracciamento analitico), assicurati di usare gli attributi `defer` o `async`:

```html
<!-- Sbagliato: Blocca il rendering -->
<script src="https://cdn.esempio.com/analytics.js"></script>

<!-- Corretto: Il browser non si ferma -->
<script src="https://cdn.esempio.com/analytics.js" defer></script>
```

Su questo sito spingo il concetto oltre il semplice `defer`: Google Tag Manager viene caricato con `type="text/partytown"`, che lo sposta interamente su un Web Worker, fuori dal thread principale. Non si limita a non bloccare il rendering: non compete nemmeno con il resto del JavaScript della pagina per il tempo di CPU sul thread principale.

### Il Preload dei Font Critici
I web font sono spesso risorse bloccanti subdole: il browser aspetta di scaricare il font prima di mostrare il testo, causando il temuto effetto testo invisibile (FOIT). Se il tuo progetto carica un font personalizzato, la soluzione è un link di precaricamento per i font *above-the-fold* combinato con `font-display: swap` nel CSS:

```html
<!-- Diciamo al browser di scaricarlo immediatamente, a massima priorità -->
<link rel="preload" href="/fonts/inter-bold.woff2" as="font" type="font/woff2" crossorigin>
```

Su questo stesso sito, però, il problema non si pone nemmeno: non carico alcun font personalizzato, ma lo stack di font di sistema di Tailwind. Zero richieste di rete, zero rischio di FOIT, zero byte da precaricare - la soluzione più veloce a un problema di performance resta spesso non introdurlo affatto, lo stesso principio che applico scegliendo [quando un progetto non ha davvero bisogno di un backend](/blog/firebase-vs-backend-custom-architettura-software/).

Eliminare le risorse bloccanti e gestire il Critical CSS non è una finezza tecnica per perfezionisti, ma una metrica di sopravvivenza commerciale - è lo stesso tipo di guadagno che descrivo nella mia [guida ai Core Web Vitals 2026](/blog/ottimizzazione-seo-tecnica-core-web-vitals-2026/). Abbattere i tempi di rendering iniziale del 50% significa trattenere sul sito una fetta enorme di traffico mobile che, altrimenti, sarebbe letteralmente fuggita davanti a una schermata bianca.
