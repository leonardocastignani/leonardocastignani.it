// --- 404 PAGE HANDLER SCRIPT ---
export function init404() {
    const path = window.location.pathname;

    if (path.startsWith('/en/') || path === '/en') {
        const titleEl = document.getElementById('error-title');
        const subtitleEl = document.getElementById('error-subtitle');
        const buttonEl = document.getElementById('error-button');

        if (titleEl && titleEl.dataset.en) {
            titleEl.textContent = titleEl.dataset.en;
        }

        if (subtitleEl && subtitleEl.dataset.en) {
            subtitleEl.textContent = subtitleEl.dataset.en;
        }

        if (buttonEl && buttonEl.dataset.enText) {
            buttonEl.textContent = buttonEl.dataset.enText;
            buttonEl.setAttribute('href', buttonEl.dataset.enLink);
        }
    }
}

init404();