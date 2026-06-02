---
title: "Perché ho scelto Astro: Island Architecture e Performance Reali"
description: "Non è solo hype. Analisi tecnica dell'Architettura a Isole e di come spedire Zero JavaScript al browser cambi radicalmente le prestazioni e il TTI."
pubDate: "2026-02-16"
heroImage: "/blog/astro-tech-deep-dive.webp"
tags: ["Astro", "JavaScript", "Performance"]
lang: "it"
alternateSlug: "astro-tech"
---

Quando ho deciso di ricostruire il mio portfolio, la tentazione di usare una Single Page Application (SPA) con Next.js o React puro era forte. Sono tecnologie che uso quotidianamente. Tuttavia, per un sito di contenuti e presentazione, l'approccio SPA porta con sé un peso inutile (overhead).

Ecco perché ho scelto **Astro** e perché, tecnicamente, è superiore per questo caso d'uso.

### Il problema dell'Idratazione (Hydration)
In una tipica applicazione React (o Next.js), il browser scarica un file HTML quasi vuoto e poi un enorme bundle JavaScript che deve essere analizzato ed eseguito per "disegnare" la pagina. Questo processo si chiama **idratazione**.
Il problema?
1.  **TTI (Time to Interactive) alto:** L'utente vede la pagina, ma non può cliccare nulla finché il JS non ha finito di caricare.
2.  **CPU Mobile sotto stress:** Sugli smartphone economici, l'esecuzione di tutto quel JS blocca il browser, creando lag nello scroll.

### La Soluzione: Island Architecture 🏝️
Astro ribalta il paradigma (MPA - Multi Page App). Di default, spedisce **0kb di JavaScript**. È solo HTML e CSS puri renderizzati lato server.
Ma se mi serve un componente interattivo, come il menu mobile o un form di contatto?

Qui entrano in gioco le **Isole**.
Posso dire ad Astro: *"Questa pagina è statica, ma questo singolo componente deve essere interattivo (idratato)"*.

```astro
---
// Il resto della pagina è statico HTML puro
import MobileMenu from '../components/MobileMenu.jsx';
import ThemeToggle from '../components/ThemeToggle.svelte';
---

<MobileMenu client:visible />

<ThemeToggle client:load />
```

### I Risultati
Grazie a questo approccio, il mio portfolio ottiene costantemente **100/100 su Lighthouse**. Non sto caricando l'intera libreria React per mostrare un testo statico "Chi Sono". Sto caricando React (o Preact, o Svelte) solo per quel piccolo pezzo di interfaccia che ne ha bisogno.

Questa è l'efficienza che cerco di portare in ogni progetto cliente: usare la tecnologia per risolvere problemi di performance, non per crearne di nuovi.