---
title: "Changelog v2.0.0: Tema Light, Astro 7 e Tailwind 4"
description: "Changelog v2.0.0: restyling in tema light, upgrade ad Astro 7 e Tailwind CSS v4, nuovo selettore lingua con bandiere e fix dei 404 multilingua."
cardDescription: "Novità v2.0.0: tema light, upgrade ad Astro 7 e Tailwind v4, selettore lingua con bandiere."
pubDate: "2026-11-09"
updatedDate: "2026-11-09"
heroImage: "/blog/release-2.0.0-tema-light-astro-7-tailwind-4-sito-web-marche.webp"
imageAlt: "Log di rilascio della versione 2.0.0 con restyling del sito in tema light."
imageTitle: "Changelog v2.0.0: Tema Light e Upgrade Tecnologico"
imageCaption: "Nuova identità visiva in tema chiaro su fondamenta tecnologiche aggiornate ad Astro 7 e Tailwind CSS v4."
tags: ["aggiornamenti"]
lang: "it"
alternateSlug: "light-theme-astro-7-tailwind-4-changelog-v2-0-0"
faqs:
  - question: "Cosa cambia con la versione 2.0.0?"
    answer: "È il rilascio più corposo da quando il blog è online: il sito passa dal tema scuro a un tema chiaro fisso, il framework viene aggiornato ad Astro 7 e Tailwind CSS alla versione 4, il selettore di lingua adotta le bandiere al posto delle sigle testuali IT/EN, e viene risolto un problema di indicizzazione sulle pagine 404 multilingua."
  - question: "Perché passare da un tema dark a un tema light?"
    answer: "Il tema chiaro offre un contrasto più leggibile per il pubblico aziendale a cui il sito si rivolge e un'estetica più sobria. Il vecchio toggle dark/light, inoltre, non era mai stato completato lato JavaScript: ho preferito fissare un unico tema solido e ben rifinito piuttosto che lasciare in giro del codice CSS inerte e mai attivabile."
  - question: "Offri anche servizi di aggiornamento e migrazione per siti web aziendali già esistenti nelle Marche?"
    answer: "Sì. Oltre allo sviluppo ex novo, seguo l'aggiornamento di progetti Astro, React e Tailwind già in produzione: migrazioni di major version dei framework (come questa ad Astro 7 e Tailwind 4), audit di accessibilità e SEO tecnica, per aziende di Civitanova Marche e dintorni."
---

Sono felice di annunciare il rilascio della versione **2.0.0** del sito. È l'aggiornamento più corposo da quando il blog è online: non parliamo di un semplice ritocco, ma di un restyling visivo completo affiancato da un ammodernamento strutturale delle fondamenta tecnologiche del progetto.

Ecco il dettaglio delle modifiche introdotte in questa release:

### 🎨 Restyling: Tema Light
* **Passaggio al tema chiaro:** Il sito abbandona la veste scura per un tema light fisso, con palette, ombre, glassmorphism dell'header e stati di scroll ridisegnati da zero per garantire un contrasto pulito e coerente su ogni componente.
* **Selettore di lingua con bandiere:** Le sigle testuali "IT" / "EN" nell'header lasciano spazio a due nuove icone a bandiera (Italia / Regno Unito), per un cambio lingua più immediato e riconoscibile a colpo d'occhio, anche da mobile.

### ⚙️ Aggiornamento del Framework
* **Astro aggiornato a v7:** Il motore del sito passa dalla v5 alla v7, attraversando la v6 in un'unica soluzione: due major version in sequenza, con la migrazione delle collezioni di contenuti alla nuova Content Layer API basata su loader. Lo schema è passato da `src/content/config.ts` a `src/content.config.ts`, con `type: 'content'` sostituito da un vero `loader: glob(...)` - ho aggiornato di conseguenza anche la mia [guida alle Content Collections con Zod](/blog/astro-content-collections-zod-blog-multilingua/), che fino a ieri citava ancora la sintassi precedente.
* **Tailwind CSS alla v4:** Lo stack di stile adotta il nuovo motore CSS-first di Tailwind tramite plugin Vite, eliminando la configurazione storica (`tailwind.config.mjs`, PostCSS e Autoprefixer) a favore di un setup più snello e di build più rapide.
* **Ambiente di build su Node.js 22:** Versione di Node fissata in `.nvmrc`, in Netlify e nella pipeline GitHub Actions, allineando sviluppo locale e produzione ai requisiti dei nuovi major.

### 🐛 Bug Fix e Accessibilità
* **Fix dei 404 multilingua:** Le pagine di errore italiana e inglese erano gestite in modo incoerente dalla sitemap. Ora sono escluse entrambe, anche se con due mezzi diversi: quella italiana (`/404.html`) è un file "nudo" che l'integrazione sitemap di Astro non vede mai come route, mentre quella inglese (`/en/404/`) va esclusa esplicitamente nel filtro - lo stesso meccanismo di filtraggio che racconto nella mia [guida a sitemap XML e robots.txt](/blog/guida-sitemap-xml-robots-txt-seo-tecnica-astro/). Entrambe restano inoltre marcate `noindex`.
* **Link di cambio lingua sulla 404:** Il collegamento per passare dalla 404 inglese a quella italiana puntava a un URL inesistente; ora risolve correttamente verso la pagina giusta.
* **Etichette più accessibili:** Le `aria-label` del selettore di lingua e di altri controlli dell'header sono state rese più esplicite per chi naviga con lettori di schermo - un tassello che si aggiunge a quanto racconto nella mia [guida all'accessibilità dei siti web](/blog/sviluppo-siti-web-accessibili-a11y/).

---

*Il sito è in continua evoluzione: se ti sei perso la [release precedente, la v1.2.0](/blog/changelog-v1-2-0-integrazione-google-tag-manager/), con l'integrazione di Google Tag Manager, recuperala pure. Al prossimo aggiornamento!*
