# Checklist: prima di aggiungere una funzionalità IA-facing al sito

Documento interno (non pubblicato sul sito). Da consultare **prima** di
progettare o rilasciare qualsiasi funzionalità che espone i visitatori a
un sistema di intelligenza artificiale — es. un chatbot, un assistente
virtuale, un tool generativo (testo/immagini), un motore di
raccomandazione basato su IA.

Al 2026-08-10 il sito non ha nessuna funzionalità di questo tipo: questa
checklist governa solo eventuali sviluppi futuri.

## 1. Verifica preliminare del rischio (art. 5 AI Act)

- [ ] Il sistema non rientra tra le pratiche vietate: manipolazione
      subliminale, sfruttamento di vulnerabilità (età, disabilità,
      situazione economica/sociale), social scoring, riconoscimento
      delle emozioni, categorizzazione biometrica, identificazione
      biometrica remota in tempo reale.
- [ ] Se il sistema profila o segmenta utenti in base a dati sensibili,
      valutare con attenzione prima di procedere (rischio elevato).

## 2. Trasparenza verso l'utente (art. 50 §1 — chatbot/assistenti)

- [ ] L'utente viene informato **esplicitamente, al primo contatto**, che
      sta interagendo con un sistema di IA (a meno che non sia già ovvio
      dal contesto).
- [ ] La dichiarazione è implementata in UI (es. label visibile, messaggio
      di apertura), non solo in un testo legale nascosto.

## 3. Etichettatura dei contenuti generati (art. 50 §2/4)

- [ ] Se il sistema genera contenuti (testo/immagini/audio/video) mostrati
      pubblicamente su temi di interesse generale, valutare se serve
      un'etichetta "generato da IA".
- [ ] Se si applica la revisione editoriale umana con responsabile
      identificato (come per gli articoli del blog, vedi
      `docs/ai-policy.md`), l'esenzione può coprire anche questo caso —
      ma va documentata la revisione, non solo dichiarata.

## 4. Aggiornamento della documentazione pubblica

- [ ] Aggiornare la sezione "Trasparenza sui Contenuti e Intelligenza
      Artificiale" nella Privacy Policy (`src/i18n/it.json` e `en.json`,
      chiavi `aiTransparencyText1`/`aiTransparencyText2`) per descrivere
      la nuova funzionalità, sia in IT che in EN.

## 5. Implicazioni GDPR

- [ ] Individuare la nuova finalità di trattamento e la base giuridica
      (consenso? legittimo interesse?).
- [ ] Verificare se il fornitore del sistema IA tratta dati fuori
      dall'UE/SEE e se serve un meccanismo di trasferimento adeguato
      (Clausole Contrattuali Standard, adequacy decision, ecc.).
- [ ] Valutare se serve una DPIA (valutazione d'impatto sulla protezione
      dei dati) — probabile se il sistema tratta dati su larga scala o è
      classificabile ad alto rischio.
- [ ] Aggiornare cookie banner / cookie policy se il sistema imposta
      cookie o tracker aggiuntivi.

## 6. Aggiornamento della policy interna

- [ ] Aggiungere il nuovo strumento/fornitore IA a `docs/ai-policy.md`,
      con scopo d'uso e note sui limiti noti.
