// --- MOBILE MENU SCRIPT ---
export function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuBtn || !mobileMenu) return;

    const newMenuBtn = menuBtn.cloneNode(true);
    menuBtn.parentNode.replaceChild(newMenuBtn, menuBtn);

    const activeMenuBtn = document.getElementById('menu-btn');

    const isOpen = () => !mobileMenu.classList.contains('hidden');

    const setMenuState = (open) => {
        mobileMenu.classList.toggle('hidden', !open);
        activeMenuBtn.setAttribute('aria-expanded', String(open));

        const labelOpen = activeMenuBtn.dataset.labelOpen || 'Open Menu';
        const labelClose = activeMenuBtn.dataset.labelClose || 'Close Menu';
        activeMenuBtn.setAttribute('aria-label', open ? labelClose : labelOpen);
    };

    const toggleMenu = () => setMenuState(!isOpen());

    activeMenuBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    const navLinks = mobileMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isOpen()) setMenuState(false);
        });
    });

    document.addEventListener('click', (event) => {
        if (!isOpen()) return;
        if (mobileMenu.contains(event.target) || activeMenuBtn.contains(event.target)) return;
        setMenuState(false);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isOpen()) {
            setMenuState(false);
            activeMenuBtn.focus();
        }
    });
}