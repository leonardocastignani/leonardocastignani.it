// @ts-nocheck
// --- COOKIE PREFERENCES BUTTON SCRIPT ---
export function initCookiePreferencesBtn() {
    const btn = document.getElementById('cookie-preferences-btn');
    if (!btn) return;

    function updateBtnVisibility() {
        const consent = document.cookie.match(/(?:^|; )cookieconsent_status=([^;]*)/);
        if (consent) {
            btn.classList.remove('opacity-0');
            btn.classList.add('opacity-100');
            btn.removeAttribute('tabindex');
        } else {
            btn.classList.add('opacity-0');
            btn.classList.remove('opacity-100');
            btn.setAttribute('tabindex', '-1');
        }
    }

    updateBtnVisibility();

    btn.addEventListener('click', () => {
        if (typeof window.openCookieModal === 'function') {
            window.openCookieModal();
        }
    });

    document.addEventListener('cookieConsentChanged', updateBtnVisibility);
}