---
title: "Il mio nuovo portfolio costruito con Astro"
description: "Un deep-dive su come ho progettato questo sito: performance, architettura a isole e gestione multilingua."
pubDate: "2025-12-19"
tags: ["astro", "portfolio", "webdev", "performance"]
lang: "it"
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

> "Meno JavaScript significa tempi di caricamento più rapidi e utenti più felici."

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