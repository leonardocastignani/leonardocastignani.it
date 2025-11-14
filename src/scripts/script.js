function runScripts() {
    // --- Script per il fade-in delle sezioni ---
    const sections = document.querySelectorAll('.fade-in-section');

    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle('is-visible', entry.isIntersecting);
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // --- Script per il menu mobile ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        const navLinks = mobileMenu.querySelectorAll('a');
        const toggleMenu = () => {
            mobileMenu.classList.toggle('hidden');
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', String(!isExpanded));
            if (!isExpanded) {
                menuBtn.setAttribute('aria-label', menuBtn.dataset.labelClose);
            } else {
                menuBtn.setAttribute('aria-label', menuBtn.dataset.labelOpen);
            }
        };

        menuBtn.addEventListener('click', toggleMenu);
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('hidden')) {
                    toggleMenu();
                }
            });
        });
    }

    // --- Script per l'indicatore di sezione attiva ---
    const navSections = document.querySelectorAll('section[id]');
    const headerNavLinks = document.querySelectorAll('[data-nav-link]');

    if (navSections.length > 0 && headerNavLinks.length > 0) {
        const activateLink = (id) => {
            headerNavLinks.forEach(link => {
                const linkHref = link.getAttribute('href');

                // Definisci "Home" come qualsiasi link di navigazione che NON inizia con '#'
                const isHomeLink = !linkHref.startsWith('#');
                const isHomeLinkActive = (id === 'home' && isHomeLink);
                // Controlla se un altro link di sezione è attivo (es: id='about' e href='#about')
                const isSectionLinkActive = (id !== 'home' && linkHref === '#' + id);

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

            if (!isIntersecting && window.scrollY < window.innerHeight / 2) {
                 activateLink('home');
            } else if (currentSectionId) {
                activateLink(currentSectionId);
            }

        }, {
            rootMargin: '-40% 0px -50% 0px',
            threshold: 0
        });

        activateLink('home');

        navSections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // --- Script per il pulsante "Torna Su" ---
    const backToTopBtn = document.getElementById('back-to-top-btn');

    if (backToTopBtn) {
        const handleScroll = () => {
            if (document.body.classList.contains('overflow-hidden')) {
                return;
            }
            if (window.scrollY > window.innerHeight * 0.8) {
                backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                backToTopBtn.classList.add('opacity-100');
            } else {
                backToTopBtn.classList.remove('opacity-100');
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus();
            }
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Script per i modali dei progetti ---
    const openModalButtons = document.querySelectorAll('[data-modal-open]');
    const closeModalButtons = document.querySelectorAll('[data-modal-close]');
    let lastFocusedElement;
    let activeModal = null;
    let trapFocusHandler = null;

    const trapFocus = (e) => {
        if (!activeModal || e.key !== 'Tab') return;

        const focusableElements = activeModal.querySelectorAll(
            'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else { // Tab
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    };

    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            activeModal = modal;
            lastFocusedElement = document.activeElement;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
            if (backToTopBtn) {
                backToTopBtn.classList.remove('opacity-100');
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            }
            
            const firstFocusable = modal.querySelector('[data-modal-close]');
            if (firstFocusable) firstFocusable.focus();
            
            trapFocusHandler = trapFocus;
            document.addEventListener('keydown', trapFocusHandler);
        }
    };

    const closeModal = (modal) => {
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
            
            if (trapFocusHandler) {
                document.removeEventListener('keydown', trapFocusHandler);
                trapFocusHandler = null;
            }

            if (lastFocusedElement) {
                lastFocusedElement.focus();
            }
            activeModal = null;

            if (backToTopBtn) {
                if (window.scrollY > window.innerHeight * 0.8) {
                    backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                    backToTopBtn.classList.add('opacity-100');
                }
            }
        }
    };

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-open');
            openModal(modalId);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('[role="dialog"]');
            closeModal(modal);
        });
    });

    // Chiudi il modale cliccando sull'overlay o premendo ESC
    document.addEventListener('click', (event) => {
        if (activeModal && event.target === activeModal) {
            closeModal(activeModal);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && activeModal) {
            closeModal(activeModal);
        }
    });
}

document.addEventListener('DOMContentLoaded', runScripts);
document.addEventListener('astro:after-swap', runScripts);