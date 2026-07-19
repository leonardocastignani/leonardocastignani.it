// --- TABLE OF CONTENTS (popup panel) SCRIPT ---
export function initTableOfContents() {
    const trigger = document.getElementById('toc-trigger');
    const overlay = document.getElementById('toc-overlay');
    const closeBtn = document.getElementById('toc-close');
    if (!trigger || !overlay || trigger.dataset.bound === 'true') return;
    trigger.dataset.bound = 'true';

    const panel = overlay.querySelector('.toc-modal-panel');

    const trapFocus = (event) => {
        if (event.key !== 'Tab') return;
        const focusable = Array.from(
            overlay.querySelectorAll('a[href], button')
        ).filter((el) => el.offsetParent !== null);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    };

    const openPanel = () => {
        overlay.classList.remove('hidden');
        requestAnimationFrame(() => overlay.classList.add('toc-modal-visible'));
        trigger.setAttribute('aria-expanded', 'true');
        trigger.setAttribute('aria-label', trigger.dataset.labelClose || '');
        overlay.addEventListener('keydown', trapFocus);
        document.addEventListener('keydown', handleEscape);
        if (closeBtn) closeBtn.focus();
    };

    const closePanel = () => {
        overlay.classList.remove('toc-modal-visible');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-label', trigger.dataset.labelOpen || '');
        overlay.removeEventListener('keydown', trapFocus);
        document.removeEventListener('keydown', handleEscape);
        setTimeout(() => overlay.classList.add('hidden'), 250);
        trigger.focus();
    };

    function handleEscape(event) {
        if (event.key === 'Escape') closePanel();
    }

    // Takes the back-to-top button's bottom-8 spot until it appears (same
    // scroll threshold as backToTop.js), then slides up to bottom-24.
    // Back-to-top sits at bottom-6 (24px) and is 36px tall (top edge at 60px).
    // A plain 12px match (WhatsApp/cookie's gap-3) reads as tighter here since
    // ToC and back-to-top are the same size (no small/large asymmetry to
    // visually pad it out), so this uses a slightly larger 16px gap instead.
    const updatePosition = () => {
        if (window.scrollY > 300) {
            trigger.classList.remove('bottom-6');
            trigger.classList.add('bottom-[76px]');
        } else {
            trigger.classList.remove('bottom-[76px]');
            trigger.classList.add('bottom-6');
        }
    };
    window.addEventListener('scroll', updatePosition, { passive: true });
    updatePosition();

    trigger.addEventListener('click', openPanel);
    if (closeBtn) closeBtn.addEventListener('click', closePanel);

    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) closePanel();
    });

    overlay.querySelectorAll('.toc-link').forEach((link) => {
        link.addEventListener('click', closePanel);
    });
}
