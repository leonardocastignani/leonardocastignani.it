export function init404() {
    const path = window.location.pathname;

    // Controlla se l'URL inizia con /en o /en/
    if (path.startsWith('/en/') || path === '/en') {
        
        // Seleziona gli elementi
        const titleEl = document.getElementById('error-title');
        const subtitleEl = document.getElementById('error-subtitle');
        const buttonEl = document.getElementById('error-button');

        // Sostituisce i testi usando i dati salvati negli attributi data-en
        if (titleEl && titleEl.dataset.en) {
            titleEl.textContent = titleEl.dataset.en;
        }

        if (subtitleEl && subtitleEl.dataset.en) {
            subtitleEl.textContent = subtitleEl.dataset.en;
        }

        if (buttonEl && buttonEl.dataset.enText) {
            buttonEl.textContent = buttonEl.dataset.enText;
            // Aggiorna anche il link per puntare alla home inglese
            buttonEl.setAttribute('href', buttonEl.dataset.enLink);
        }
    }
}

// Eseguiamo subito la funzione
init404();