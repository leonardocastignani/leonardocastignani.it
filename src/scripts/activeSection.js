// --- ACTIVE SECTION SCRIPT ---
export function initActiveSection() {
    const navSections = document.querySelectorAll('section[id]');
    const headerNavLinks = document.querySelectorAll('[data-nav-link]');

    if (navSections.length === 0 || headerNavLinks.length === 0) return;

    const isTracked = (link) => {
        const linkHref = link.getAttribute('href');
        return Boolean(link.dataset.section) || Boolean(linkHref && linkHref.includes('#'));
    };

    const sectionIdsForLink = (link) => {
        const ids = [];
        const linkHref = link.getAttribute('href');
        if (linkHref && linkHref.includes('#')) {
            ids.push(linkHref.split('#').pop());
        }
        if (link.dataset.section) {
            ids.push(link.dataset.section);
        }
        return ids;
    };

    const resetLinks = () => {
        headerNavLinks.forEach(link => {
            if (!isTracked(link)) return;
            delete link.dataset.active;
            link.classList.remove('text-white');
            link.classList.add('text-gray-400');
        });
    };

    const activateLink = (id) => {
        const matchingLinks = Array.from(headerNavLinks).filter(link => sectionIdsForLink(link).includes(id));

        if (matchingLinks.length === 0) return;

        resetLinks();
        matchingLinks.forEach(link => {
            link.dataset.active = 'true';
            link.classList.remove('text-gray-400');
            link.classList.add('text-white');
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