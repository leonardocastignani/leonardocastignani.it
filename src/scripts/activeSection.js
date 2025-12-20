// --- ACTIVE SECTION SCRIPT ---
export function initActiveSection() {
    const navSections = document.querySelectorAll('section[id]');
    const headerNavLinks = document.querySelectorAll('[data-nav-link]');

    if (navSections.length === 0 || headerNavLinks.length === 0) return;

    const resetLinks = () => {
        headerNavLinks.forEach(link => {
            if (!link.getAttribute('href').includes('#')) return;
            delete link.dataset.active;
            link.classList.remove('text-white');
            link.classList.add('text-gray-400');
        });
    };

    const activateLink = (id) => {
        resetLinks();
        headerNavLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (!linkHref || !linkHref.includes('#')) return;

            const parts = linkHref.split('#');
            const anchor = parts[parts.length - 1];

            if (anchor === id) {
                link.dataset.active = 'true';
                link.classList.remove('text-gray-400');
                link.classList.add('text-white');
            }
        });
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateLink(entry.target.id);
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    });

    navSections.forEach(section => {
        sectionObserver.observe(section);
    });

    if (window.scrollY < 100) {
        activateLink('home');
    }
}