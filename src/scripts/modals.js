export function initModals() {
    const openModalButtons = document.querySelectorAll('[data-modal-open]');
    const closeModalButtons = document.querySelectorAll('[data-modal-close]');
    const backToTopBtn = document.getElementById('back-to-top-btn');
    
    if (openModalButtons.length === 0) return;

    let lastFocusedElement;
    let activeModal = null;
    let trapFocusHandler = null;

    const trapFocus = (e) => {
        if (!activeModal || e.key !== 'Tab') return;

        const focusableElements = activeModal.querySelectorAll(
            'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
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

    // Pulisci e riassegna listener
    openModalButtons.forEach(button => {
        // Clone per rimuovere vecchi listener
        const newBtn = button.cloneNode(true);
        button.parentNode.replaceChild(newBtn, button);
        
        newBtn.addEventListener('click', () => {
            const modalId = newBtn.getAttribute('data-modal-open');
            openModal(modalId);
        });
    });

    closeModalButtons.forEach(button => {
        const newBtn = button.cloneNode(true);
        button.parentNode.replaceChild(newBtn, button);

        newBtn.addEventListener('click', () => {
            const modal = newBtn.closest('[role="dialog"]');
            closeModal(modal);
        });
    });

    // Listener globali (gestiti con flag o rimozione per evitare duplicati)
    // Per semplicità qui usiamo una funzione handler nominata per poterla rimuovere
    const clickOutsideHandler = (event) => {
        if (activeModal && event.target === activeModal) {
            closeModal(activeModal);
        }
    };
    
    const escapeHandler = (event) => {
        if (event.key === 'Escape' && activeModal) {
            closeModal(activeModal);
        }
    };

    document.removeEventListener('click', clickOutsideHandler); // Non funziona con funz anonime, ma ok per ora
    document.addEventListener('click', clickOutsideHandler);
    
    document.removeEventListener('keydown', escapeHandler);
    document.addEventListener('keydown', escapeHandler);
}