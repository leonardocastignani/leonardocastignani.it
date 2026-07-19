// --- SHARED SERVICE DETAIL MODAL SCRIPT ---
import { lockPageScroll, unlockPageScroll } from './scrollLock.js';

export function initServiceModal() {
    const overlay = document.getElementById('service-modal-overlay');
    const closeBtn = document.getElementById('service-modal-close');
    const iconBox = document.getElementById('service-modal-icon');
    const titleEl = document.getElementById('service-modal-title');
    const taglineEl = document.getElementById('service-modal-tagline');
    const descriptionEl = document.getElementById('service-modal-description');
    const idealForEl = document.getElementById('service-modal-idealfor');
    const includesEl = document.getElementById('service-modal-includes');
    const ctaEl = document.getElementById('service-modal-cta');
    const iconTemplates = document.getElementById('service-modal-icon-templates');

    if (!overlay || !titleEl || !descriptionEl || overlay.dataset.bound === 'true') return;
    overlay.dataset.bound = 'true';

    let lastTrigger = null;
    let isOpen = false;

    const buildListItem = (text) => {
        const li = document.createElement('li');
        li.className = 'flex items-start gap-2.5 text-sm text-gray-300';

        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('viewBox', '0 0 24 24');
        icon.setAttribute('fill', 'none');
        icon.setAttribute('stroke', 'currentColor');
        icon.setAttribute('stroke-width', '2');
        icon.setAttribute('class', 'w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400');
        icon.setAttribute('aria-hidden', 'true');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('d', 'M4.5 12.75l6 6 9-13.5');
        icon.appendChild(path);

        const span = document.createElement('span');
        span.textContent = text;

        li.appendChild(icon);
        li.appendChild(span);
        return li;
    };

    const trapFocus = (event) => {
        if (event.key !== 'Tab') return;
        const focusable = Array.from(overlay.querySelectorAll('a[href], button')).filter((el) => el.offsetParent !== null);
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

    function handleEscape(event) {
        if (event.key === 'Escape') closeModal();
    }

    const openModal = (detail, trigger) => {
        lastTrigger = trigger;

        if (iconBox && iconTemplates) {
            const template = iconTemplates.querySelector(`[data-icon-template="${detail.icon}"] svg`);
            iconBox.innerHTML = '';
            if (template) iconBox.appendChild(template.cloneNode(true));
        }

        titleEl.textContent = detail.title || '';
        if (taglineEl) taglineEl.textContent = detail.tagline || '';
        descriptionEl.textContent = detail.description || '';

        if (idealForEl) {
            idealForEl.innerHTML = '';
            (detail.idealFor || []).forEach((text) => idealForEl.appendChild(buildListItem(text)));
        }
        if (includesEl) {
            includesEl.innerHTML = '';
            (detail.includes || []).forEach((text) => includesEl.appendChild(buildListItem(text)));
        }
        if (ctaEl) {
            const isEnglish = document.documentElement.lang === 'en';
            ctaEl.setAttribute('href', isEnglish ? '/en/#contact' : '/#contact');
        }

        // Guard against re-entrant opens (double-click, key repeat, the quiz's
        // programmatic click landing while a manual click is already mid-open):
        // only lock/reveal once per open, no matter how many triggers fire.
        if (!isOpen) {
            isOpen = true;
            lockPageScroll();
            overlay.classList.remove('hidden');
            requestAnimationFrame(() => overlay.classList.add('toc-modal-visible'));
        }
        overlay.addEventListener('keydown', trapFocus);
        document.addEventListener('keydown', handleEscape);
        closeBtn?.focus();
    };

    function closeModal() {
        if (!isOpen) return;
        isOpen = false;
        overlay.classList.remove('toc-modal-visible');
        overlay.removeEventListener('keydown', trapFocus);
        document.removeEventListener('keydown', handleEscape);
        // Unlock only once fully faded out and hidden again (mirrors CookieConsent.astro),
        // so the content shift-back also happens off-screen, not mid-fade.
        window.setTimeout(() => {
            overlay.classList.add('hidden');
            unlockPageScroll();
        }, 250);
        if (lastTrigger) lastTrigger.focus();
    }

    closeBtn?.addEventListener('click', closeModal);
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) closeModal();
    });

    ctaEl?.addEventListener('click', () => {
        sessionStorage.setItem('serviceInquiry', JSON.stringify({ title: titleEl.textContent || '' }));
    });

    document.querySelectorAll('[data-service-detail]').forEach((card) => {
        const open = () => {
            try {
                const detail = JSON.parse(card.dataset.serviceDetail || '{}');
                openModal(detail, card);
            } catch (err) {
                console.warn('Impossibile leggere i dettagli del servizio.', err);
            }
        };

        card.addEventListener('click', open);
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                open();
            }
        });
    });
}
