---
title: "Content Security Policy (CSP): Come Proteggere il Tuo Sito dagli Attacchi"
description: "Configurare una CSP robusta in Astro: guida agli header HTTP, le direttive essenziali e come testare la sicurezza senza rompere il sito in produzione."
cardDescription: "Come configurare una CSP robusta in Astro: header HTTP, direttive essenziali e test in produzione senza rotture."
pubDate: "2026-07-20"
updatedDate: "2026-07-20"
heroImage: "/blog/sicurezza-siti-web-csp-astro-aziende-italia.webp"
imageAlt: "Codice di configurazione della Content Security Policy (CSP) su Astro per la sicurezza dei siti web aziendali."
imageTitle: "Guida alla Sicurezza Web: Configurare la CSP su Astro"
imageCaption: "Proteggi la tua infrastruttura digitale dagli attacchi informatici e metti al sicuro i dati dei tuoi clienti."
tags: ["privacy-sicurezza", "sviluppo-astro-performance"]
lang: "it"
alternateSlug: "website-security-csp-astro-guide-italy"
faqs:
  - question: "Cos'è una Content Security Policy e perché protegge le aziende?"
    answer: "La CSP è un livello di sicurezza che funge da 'lista d'invito' per il browser, autorizzando solo il caricamento di risorse fidate. Questo previene vulnerabilità gravissime come il Cross-Site Scripting (XSS), mettendo al sicuro i dati sensibili."
  - question: "Perché è preferibile configurare la CSP tramite header HTTP invece che con un tag meta?"
    answer: "Gli header HTTP coprono anche le risposte non HTML (script, JSON, redirect) e supportano direttive come frame-ancestors che il tag meta ignora. Su un sito statico si impostano a livello di hosting (es. Netlify), su un progetto Astro con SSR si può usare un Middleware per iniettarli dinamicamente in ogni risposta."
  - question: "Offri servizi di sicurezza informatica per i siti aziendali nelle Marche?"
    answer: "Certamente. Da Civitanova Marche ottimizzo e metto in sicurezza le infrastrutture web delle PMI locali, implementando policy restrittive e architetture custom inattaccabili per prevenire qualsiasi tipo di hacking."
---

C'è un incubo ricorrente per ogni titolare di un'azienda digitale: svegliarsi la mattina e scoprire che il proprio sito web è stato bucato per rubare i dati dei clienti o per reindirizzarli verso siti truffaldini. 

La maggior parte di questi attacchi avviene tramite **XSS (Cross-Site Scripting)**: un hacker riesce a iniettare un frammento di codice JavaScript maligno all'interno delle tue pagine. Come ci si difende? Oltre a scrivere codice pulito, l'arma definitiva si chiama **Content Security Policy (CSP)**. 

Oggi vediamo cos'è, come configurarla su un progetto Astro e come implementarla senza far esplodere il sito in produzione.

### Cos'è la Content Security Policy?
Pensa alla CSP come al buttafuori del tuo sito web. È una "lista d'invito" (whitelist) che tu consegni al browser dell'utente. 
Con una CSP attiva, il browser eseguirà o caricherà *solo ed esclusivamente* le risorse (script, immagini, font, fogli di stile) provenienti dai domini presenti in quella lista. Se un hacker riesce a iniettare uno script maligno che cerca di inviare i dati delle carte di credito a `hacker-server.com`, il browser guarderà la CSP, vedrà che quel dominio non è in lista e bloccherà l'esecuzione istantaneamente.

### Implementare una CSP in Astro
In Astro, hai due modi per applicare una CSP: tramite un tag `<meta>` nell'HTML, o (scelta consigliata) tramite gli **Header HTTP**. Il modo corretto di impostarli dipende però da come è renderizzato il tuo sito.

**Se il progetto usa SSR** (con un adapter come Node o Netlify Functions), puoi usare un Middleware per iniettare l'header dinamicamente in ogni risposta. Un dettaglio che manda in crisi molti sviluppatori: `next()` restituisce una `Promise`, va sempre atteso con `await` prima di poter leggere o modificare gli header della risposta. Se scrivi il tuo middleware in TypeScript (scelta che consiglio sempre, per i motivi che spiego nel mio [approfondimento su TypeScript nel 2026](/blog/sviluppo-web-typescript-codice-scalabile-2026/)), ottieni anche l'autocompletamento e il controllo dei tipi su `context` e `response.headers`, evitando errori banali come nomi di header scritti male.

Ecco un esempio pratico di Middleware in Astro (`src/middleware.ts`):

```typescript
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Costruiamo la nostra Policy
  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https://images.unsplash.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://api.tuo-dominio.com;
  `.replace(/\s+/g, ' ').trim();

  response.headers.set("Content-Security-Policy", csp);

  return response;
});
```

**Se invece il sito è statico** (output di default di Astro, senza adapter SSR), il Middleware non serve a nulla sulle pagine pre-renderizzate: quelle pagine vengono generate in fase di build e servite come file HTML statici, senza che nessuna funzione Node giri più a runtime. In questo caso gli header vanno dichiarati a livello di hosting. Su Netlify, ad esempio, basta un blocco nel `netlify.toml` (o un file `public/_headers`):

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy-Report-Only = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; connect-src 'self' https://www.googletagmanager.com;"
```

Questo è esattamente l'approccio che uso su questo stesso sito, che è generato staticamente da Astro e distribuito su Netlify. Questa distinzione tra rendering statico e dinamico non riguarda solo la CSP: è la stessa ragione per cui, quando ho dovuto scegliere l'architettura giusta, ho scritto un intero articolo su [performance e Island Architecture con Astro](/blog/performance-siti-web-astro-js-islands/).

### Le Direttive Essenziali (Il Vocabolario della CSP)
Analizziamo le direttive che ho inserito nello snippet precedente, più altre che è bene conoscere:

1. `default-src 'self'`: La regola d'oro. Dichiara che, di base, tutto ciò che non è esplicitamente autorizzato deve provenire *solo* dal tuo stesso dominio (`'self'`).
2. `script-src`: La direttiva più critica. Qui autorizziamo i nostri script, Google Analytics e, purtroppo spesso necessario per alcune librerie UI o script inline di Astro, `'unsafe-inline'`. (Nota: in progetti ad altissima sicurezza, `'unsafe-inline'` andrebbe rimosso sostituendolo con l'uso di *nonce o hash* crittografici).
3. `img-src`: Definisce da dove possiamo caricare le immagini. Autorizzare `data:` è utile se si usano placeholder SVG in base64.
4. `connect-src`: Limita i domini a cui il tuo sito può inviare richieste (es. tramite `fetch` o AJAX). Fondamentale per impedire agli script malevoli di esfiltrare dati.
5. `frame-ancestors 'self'`: Impedisce che il tuo sito venga incorporato in un `<iframe>` su domini esterni, la difesa principale contro il *clickjacking*. È l'unica direttiva realmente equivalente al vecchio header `X-Frame-Options`, e funziona solo se impostata via header HTTP (il tag `<meta>` la ignora completamente).
6. `object-src 'none'`: Blocca plugin ormai obsoleti come Flash o Java applet, storicamente un vettore di attacco frequente. Nella stragrande maggioranza dei siti moderni può restare sempre disattivato senza alcun impatto.
7. `base-uri 'self'`: Impedisce a uno script iniettato di modificare il tag `<base>` della pagina per dirottare tutti i link relativi verso un dominio malevolo.
8. `form-action 'self'`: Limita a quali URL può essere inviato un form. Blocca un attacco poco noto ma reale: un form legittimo del tuo sito, manomesso via XSS, che invia le credenziali dell'utente verso un server esterno.

### Il trucco per non rompere la Produzione: Report-Only
Inserire una CSP da zero su un sito già esistente è come camminare in un campo minato: quasi sicuramente bloccherai una risorsa legittima di cui ti eri dimenticato, rompendo il layout o le funzionalità.

Per evitare questo disastro, i browser supportano un header magico: `Content-Security-Policy-Report-Only`.

Se usi questo header invece di quello standard, il browser **non bloccherà nulla**, ma valuterà la tua policy. Se trova una violazione, la segnalerà nella console del browser (e può inviare un report a un server di monitoraggio, tramite la direttiva `report-to` o la più datata `report-uri`).
Questo ti permette di testare la tua CSP sul traffico reale per qualche settimana, correggere i "falsi positivi" (aggiungendo i domini mancanti alla whitelist) e, solo quando sei sicuro al 100%, passare alla modalità restrittiva definitiva.

Prima di andare in produzione, vale la pena affidarsi anche a strumenti automatici come il [CSP Evaluator di Google](https://csp-evaluator.withgoogle.com/) o scanner online come [securityheaders.com](https://securityheaders.com), che analizzano la policy e segnalano configurazioni troppo permissive o direttive dimenticate. È lo stesso approccio "verifica prima di fidarti" di cui parlo nel mio articolo su [testing e debugging nello sviluppo software](/blog/testing-debugging-sviluppo-software-sicuro/): una CSP mai testata sul serio è solo un file di configurazione che dà una falsa sensazione di sicurezza.

### Altri Header di Sicurezza da Abbinare alla CSP
La CSP è la difesa più efficace contro l'XSS, ma da sola non copre tutta la superficie d'attacco di un sito web. In un progetto serio va sempre accompagnata da altri header HTTP, altrettanto semplici da impostare nello stesso file `netlify.toml` o Middleware:

- **`Strict-Transport-Security` (HSTS)**: obbliga il browser a comunicare col tuo dominio solo via HTTPS per un periodo di tempo definito, anche se l'utente digita `http://` per errore o clicca un vecchio link non sicuro.
- **`X-Content-Type-Options: nosniff`**: impedisce al browser di "indovinare" il tipo di un file ignorando l'header `Content-Type` dichiarato dal server, un comportamento che in passato ha permesso di eseguire come script file caricati come semplici immagini.
- **`Referrer-Policy`**: controlla quante informazioni sull'URL di provenienza vengono condivise quando un utente clicca un link verso un altro sito, riducendo la fuga involontaria di dati (es. token o parametri sensibili nell'URL).
- **`Permissions-Policy`**: disattiva selettivamente funzionalità del browser (fotocamera, microfono, geolocalizzazione) che il tuo sito non usa, restringendo cosa può fare uno script anche se riuscisse a bypassare la CSP.

Questi header, insieme alla CSP, fanno parte di quella manutenzione tecnica che va oltre il giorno del lancio: ne parlo più diffusamente nel mio articolo su [cosa succede dopo il "Go Live" di un sito web](/blog/manutenzione-sicurezza-siti-web-aziendali/).

### Conclusione
Configurare una CSP solida richiede tempo, pazienza e una profonda comprensione dell'architettura del tuo sito. Tuttavia, è uno sforzo non negoziabile. Un sito web aziendale non è solo una vetrina commerciale, è un contenitore di dati sensibili - spesso anche dati personali soggetti al GDPR, motivo per cui consiglio di leggere anche la mia [guida all'adeguamento GDPR 2026](/blog/adeguamento-gdpr-2026-siti-web-pmi-marche/) e la mia [guida pratica a cookie banner e consenso](/blog/guida-cookie-banner-gdpr-siti-web/), due tasselli che completano il quadro della sicurezza e della conformità legale. Proteggere l'infrastruttura con strumenti moderni come Astro e una CSP ferrea è la dimostrazione tangibile del rispetto che hai verso il tuo business e i tuoi clienti.