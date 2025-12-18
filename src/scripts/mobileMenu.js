export function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuBtn || !mobileMenu) return;

    // Pulisci eventuali listener precedenti per evitare duplicati nelle navigazioni SPA
    const newMenuBtn = menuBtn.cloneNode(true);
    menuBtn.parentNode.replaceChild(newMenuBtn, menuBtn);
    
    // Riassegna le variabili dopo il clone
    const activeMenuBtn = document.getElementById('menu-btn');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden');
        const isExpanded = activeMenuBtn.getAttribute('aria-expanded') === 'true';
        activeMenuBtn.setAttribute('aria-expanded', String(!isExpanded));
        
        const labelOpen = activeMenuBtn.dataset.labelOpen || 'Open Menu';
        const labelClose = activeMenuBtn.dataset.labelClose || 'Close Menu';
        
        activeMenuBtn.setAttribute('aria-label', !isExpanded ? labelClose : labelOpen);
    };

    activeMenuBtn.addEventListener('click', toggleMenu);
    
    // Chiudi il menu quando si clicca su un link
    const navLinks = mobileMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMenu();
            }
        });
    });
}