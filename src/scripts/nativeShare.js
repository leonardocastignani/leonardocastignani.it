// --- NATIVE SHARE SHEET (Web Share API, progressive enhancement) ---
export function initNativeShare() {
    const btn = document.getElementById('share-native-btn');
    if (!btn || btn.dataset.bound === 'true') return;
    btn.dataset.bound = 'true';

    if (typeof navigator.share !== 'function') return;

    btn.classList.remove('hidden');
    btn.classList.add('flex');

    btn.addEventListener('click', async () => {
        try {
            await navigator.share({
                title: btn.dataset.title || document.title,
                url: btn.dataset.url || window.location.href,
            });
        } catch (err) {
            // AbortError fires when the user simply dismisses the share sheet — not a real error.
            if (err?.name !== 'AbortError') {
                console.warn('Condivisione nativa non riuscita.', err);
            }
        }
    });
}
