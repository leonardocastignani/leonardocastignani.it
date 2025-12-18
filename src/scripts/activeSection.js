export function initActiveSection() {
    const navSections = document.querySelectorAll('section[id]');
    const headerNavLinks = document.querySelectorAll('[data-nav-link]');

    if (navSections.length === 0 || headerNavLinks.length === 0) return;

    const activateLink = (id) => {
        headerNavLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            // Gestione sicura per evitare errori su href nulli
            if (!linkHref) return;

            const isHomeLink = !linkHref.startsWith('#') || linkHref === '#home';
            // Logica: se siamo su home (top pagina) o se l'href corrisponde all'ID sezione
            const isHomeLinkActive = (id === 'home' && isHomeLink);
            const isSectionLinkActive = (id !== 'home' && linkHref.includes('#' + id));

            if (isHomeLinkActive || isSectionLinkActive) {
                link.dataset.active = 'true'; 
            } else {
                delete link.dataset.active;
            }
        });
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        let currentSectionId = '';
        let isIntersecting = false;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentSectionId = entry.target.id;
                isIntersecting = true;
            }
        });

        // Se siamo in cima alla pagina, attiva home
        if (!isIntersecting && window.scrollY < window.innerHeight / 2) {
             activateLink('home');
        } else if (currentSectionId) {
            activateLink(currentSectionId);
        }

    }, {
        rootMargin: '-40% 0px -50% 0px',
        threshold: 0
    });

    // Attiva home di default
    activateLink('home');

    navSections.forEach(section => {
        sectionObserver.observe(section);
    });
}