---
title: "Sopravvivere all'i18n: Come gestire un sito Multilingua in Astro"
description: "Un caso di studio pratico su come ho implementato il multilingua (IT/EN) su questo portfolio usando il routing nativo di Astro e dizionari custom."
pubDate: "2026-03-02"
heroImage: "/blog/astro-i18n-case-study.webp"
tags: ["Astro", "i18n", "Case Study"]
lang: "it"
---

Chiunque abbia mai dovuto trasformare un sito web da singola lingua a multilingua lo sa: gestire l'**i18n** (internazionalizzazione) è spesso un incubo. Tra librerie pesanti da installare, context React infiniti e problemi di SEO, è facile perdersi.

Quando ho progettato questo portfolio, sapevo di volerlo nativamente bilingue (Italiano e Inglese) per raggiungere clienti internazionali. Ecco come ho risolto il problema in **Astro** in modo pulito, senza appesantire il sito di 1 solo KB di JavaScript.

### 1. Il Routing basato su Cartelle
Astro utilizza una logica di routing basata su file (File-based routing). Per separare le lingue, ho optato per la struttura a sottocartelle fisiche (Sub-directory approach), che è anche la preferita da Google per la SEO.

La struttura del mio progetto appare così:

```text
src/
├── pages/
│   ├── index.astro     // Fa un redirect automatico a /it/ o /en/
│   ├── it/
│   │   ├── index.astro
│   │   └── blog/
│   └── en/
│       ├── index.astro
│       └── blog/
```

In questo modo, ho la massima flessibilità: posso avere pagine in italiano che non esistono in inglese e viceversa, senza impazzire con configurazioni complesse.

### 2. Gestione dei Dizionari (UI Strings)
Per le parti dell'interfaccia condivise tra le due versioni (come la navbar, il footer o i pulsanti di "Leggi di più"), non volevo duplicare il codice. Ho creato un semplice file TypeScript che funge da dizionario:

```typescript
// src/i18n/ui.ts
export const languages = {
  it: 'Italiano',
  en: 'English',
};

export const defaultLang = 'it';

export const ui = {
  it: {
    'nav.home': 'Home',
    'nav.about': 'Chi Sono',
    'nav.portfolio': 'Progetti',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Me',
    'nav.portfolio': 'Projects',
  },
} as const;
```

### 3. La Funzione Helper per le Traduzioni
Per estrarre la stringa corretta in base all'URL in cui si trova l'utente, ho scritto una piccola funzione di utilità. Astro mi permette di leggere l'URL corrente lato server e capire in quale lingua ci troviamo:

```astro
---
// Dentro un componente Astro (es. Navbar.astro)
import { getLangFromUrl, useTranslations } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<ul>
  <li><a href={`/${lang}/`}>{t('nav.home')}</a></li>
  <li><a href={`/${lang}/about`}>{t('nav.about')}</a></li>
</ul>
```

### Conclusione: Meno magia, più controllo
La vera forza di questo approccio in Astro è l'assenza di "magia nera". Non c'è un provider di stato globale che appesantisce il client, non ci sono librerie esterne da mantenere. Tutto viene risolto al **build time**. Il risultato finale è puro HTML inviato al browser, tradotto perfettamente e con i tag `<html lang="it">` e `hreflang` configurati alla perfezione per la SEO.