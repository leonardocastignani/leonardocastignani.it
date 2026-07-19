// --- MOBILE SPEED-DIAL SCRIPT (WhatsApp + cookie preferences) ---
export function initSpeedDial() {
    const trigger = document.getElementById('speed-dial-trigger');
    const panel = document.getElementById('speed-dial-actions');
    const icon = document.getElementById('speed-dial-icon');
    if (!trigger || !panel) return;

    const mobileQuery = window.matchMedia('(max-width: 767px)');

    const isOpen = () => panel.classList.contains('speed-dial-open');

    const syncInert = () => {
        const collapsed = mobileQuery.matches && !isOpen();
        panel.toggleAttribute('inert', collapsed);
    };

    const setOpen = (open) => {
        panel.classList.toggle('speed-dial-open', open);
        trigger.setAttribute('aria-expanded', String(open));
        trigger.setAttribute('aria-label', open ? trigger.dataset.labelClose : trigger.dataset.labelOpen);
        if (icon) icon.classList.toggle('rotate-45', open);
        syncInert();
    };

    setOpen(false);

    trigger.addEventListener('click', (event) => {
        event.stopPropagation();
        setOpen(!isOpen());
    });

    document.addEventListener('click', (event) => {
        if (!isOpen()) return;
        if (panel.contains(event.target) || trigger.contains(event.target)) return;
        setOpen(false);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isOpen()) {
            setOpen(false);
            trigger.focus();
        }
    });

    mobileQuery.addEventListener('change', syncInert);
}
