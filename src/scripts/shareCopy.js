// --- COPY-LINK SHARE BUTTON SCRIPT ---
export function initShareCopy() {
    const btn = document.getElementById('share-copy-btn');
    if (!btn || btn.dataset.bound === 'true') return;
    btn.dataset.bound = 'true';

    const icon = btn.querySelector('svg');
    let resetTimer = null;

    btn.addEventListener('click', async () => {
        const url = btn.dataset.url;
        if (!url) return;

        try {
            await navigator.clipboard.writeText(url);
        } catch (err) {
            // Fallback for browsers/contexts without Clipboard API permission.
            const textarea = document.createElement('textarea');
            textarea.value = url;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
            } catch (fallbackErr) {
                console.warn('Copia link non riuscita.', fallbackErr);
            }
            document.body.removeChild(textarea);
        }

        btn.setAttribute('aria-label', btn.dataset.copiedLabel || '');
        btn.setAttribute('title', btn.dataset.copiedLabel || '');
        icon?.classList.add('text-green-400');
        icon?.classList.remove('text-gray-300');

        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => {
            btn.setAttribute('aria-label', btn.dataset.defaultLabel || '');
            btn.setAttribute('title', btn.dataset.defaultLabel || '');
            icon?.classList.remove('text-green-400');
        }, 2000);
    });
}
