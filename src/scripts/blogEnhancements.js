// --- BLOG ARTICLE ENHANCEMENTS SCRIPT ---
import { lockPageScroll, unlockPageScroll } from './scrollLock.js';

const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- READING PROGRESS BAR ---
export function initReadingProgress() {
    const article = document.querySelector('article');
    if (!article) return;

    let bar = document.getElementById('reading-progress-bar');
    if (!bar) {
        bar = document.createElement('div');
        bar.id = 'reading-progress-bar';
        document.body.appendChild(bar);
    }

    const update = () => {
        const rect = article.getBoundingClientRect();
        const articleHeight = article.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(articleHeight, 1));
        const progress = articleHeight > 0 ? (scrolled / articleHeight) * 100 : 0;
        bar.style.width = `${progress}%`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
}

// --- PARAGRAPH / CONTENT REVEAL (prose children) ---
export function initProseReveal() {
    const prose = document.querySelector('.prose');
    if (!prose) return;

    prose.classList.add('prose-reveal');
    const children = Array.from(prose.children);

    if (prefersReducedMotion()) {
        children.forEach(child => child.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    children.forEach((child, index) => {
        child.style.transitionDelay = `${Math.min(index, 6) * 40}ms`;
        observer.observe(child);
    });
}

// --- LIGHTBOX FOR CONTENT IMAGES + HERO IMAGE ---
export function initLightbox() {
    const prose = document.querySelector('.prose');
    const heroImg = document.querySelector('.hero-image-lightbox img');
    if (!prose && !heroImg) return;

    let overlay = document.getElementById('image-lightbox');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'image-lightbox';
        overlay.className = 'lightbox-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        const closeLabel = document.documentElement.lang === 'en' ? 'Close' : 'Chiudi';
        overlay.innerHTML = `
            <button type="button" class="lightbox-close" aria-label="${closeLabel}">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <img alt="" />
        `;
        document.body.appendChild(overlay);

        let isOpen = false;
        const closeLightbox = () => {
            if (!isOpen) return;
            isOpen = false;
            overlay.classList.remove('is-open');
            unlockPageScroll();
        };

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target.closest('.lightbox-close')) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });

        overlay.openLightbox = () => {
            isOpen = true;
            lockPageScroll();
            overlay.classList.add('is-open');
        };
    }

    const overlayImg = overlay.querySelector('img');

    const bindLightbox = (img) => {
        if (img.dataset.lightboxBound) return;
        img.dataset.lightboxBound = 'true';

        img.addEventListener('click', () => {
            overlayImg.src = img.currentSrc || img.src;
            overlayImg.alt = img.alt || '';
            overlay.openLightbox();
        });
    };

    prose?.querySelectorAll('img').forEach(bindLightbox);
    if (heroImg) bindLightbox(heroImg);
}

export function initBlogEnhancements() {
    initReadingProgress();
    initProseReveal();
    initLightbox();
}